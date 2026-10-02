import { PatientAccessDenied } from "./client.js";
import { array, benefitDetails, clinicalTypes, IntegrationError, pharmacyHistory } from "./details.js";
import { loadSandboxToken } from "./token-store.js";
export const ANTHEM_SANDBOX = {
    authorize: "https://sbx.totalview.healthos.elevancehealth.com/oauth2.code/registered/api/v1/authorize",
    token: "https://sbx.totalview.healthos.elevancehealth.com/client.oauth2/registered/api/v1/token",
    fhir: "https://sbx.totalview.healthos.elevancehealth.com/resources/registered/Sandbox/api/v1/fhir",
    redirectUri: "https://integrations.christensencap.com/auth/anthem/callback",
};
function required(name) {
    const value = process.env[name];
    if (!value)
        throw new Error(`Missing required Anthem configuration: ${name}`);
    return value;
}
async function parseJson(response) {
    const body = await response.text();
    if (!response.ok)
        throw new Error(`Anthem request failed (${response.status})`);
    try {
        return JSON.parse(body);
    }
    catch {
        throw new Error("Anthem returned an invalid response.");
    }
}
export function authorizationUrl(state, codeChallenge) {
    const url = new URL(ANTHEM_SANDBOX.authorize);
    url.search = new URLSearchParams({ response_type: "code", scope: "launch/patient offline_access openid fhirUser patient/*.read", client_id: required("ANTHEM_CLIENT_ID"), redirect_uri: ANTHEM_SANDBOX.redirectUri, aud: ANTHEM_SANDBOX.fhir, state, code_challenge: codeChallenge, code_challenge_method: "S256" }).toString();
    return url.toString();
}
export async function exchangeAuthorizationCode(code, verifier) {
    const body = new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: ANTHEM_SANDBOX.redirectUri, client_id: required("ANTHEM_CLIENT_ID"), code_verifier: verifier });
    const response = await fetch(ANTHEM_SANDBOX.token, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body, cache: "no-store" });
    const json = await parseJson(response);
    const accessToken = typeof json.access_token === "string" ? json.access_token : undefined;
    if (!accessToken)
        throw new Error("Anthem did not return an access token.");
    return { accessToken, refreshToken: typeof json.refresh_token === "string" ? json.refresh_token : undefined, patientId: typeof json.patient === "string" ? json.patient : undefined, expiresAt: Date.now() + (typeof json.expires_in === "number" ? json.expires_in * 1000 : 3_600_000) };
}
export async function refreshAccessToken(refreshToken) {
    const basic = Buffer.from(`${required("ANTHEM_CLIENT_ID")}:${required("ANTHEM_CLIENT_SECRET")}`).toString("base64");
    const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken });
    const response = await fetch(ANTHEM_SANDBOX.token, { method: "POST", headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" }, body, cache: "no-store" });
    const json = await parseJson(response);
    const accessToken = typeof json.access_token === "string" ? json.access_token : undefined;
    if (!accessToken)
        throw new Error("Anthem did not return a refreshed access token.");
    return { accessToken, refreshToken: typeof json.refresh_token === "string" ? json.refresh_token : refreshToken, patientId: typeof json.patient === "string" ? json.patient : undefined, expiresAt: Date.now() + (typeof json.expires_in === "number" ? json.expires_in * 1000 : 3_600_000) };
}
export class SandboxPatientClient {
    mode = "sandbox";
    token;
    patientId;
    constructor(patientId, token) {
        const stored = token ?? loadSandboxToken();
        this.token = stored ?? { accessToken: process.env.ANTHEM_ACCESS_TOKEN ?? "", refreshToken: process.env.ANTHEM_REFRESH_TOKEN, patientId: process.env.ANTHEM_PATIENT_ID, expiresAt: process.env.ANTHEM_ACCESS_TOKEN ? Date.now() + 300_000 : 0 };
        if (!this.token.accessToken && !this.token.refreshToken)
            throw new Error("Missing Anthem access or refresh token.");
        this.patientId = patientId ?? this.token.patientId ?? required("ANTHEM_PATIENT_ID");
    }
    async request(path) {
        if (this.token.expiresAt <= Date.now() + 30_000 && this.token.refreshToken)
            this.token = await refreshAccessToken(this.token.refreshToken);
        const url = new URL(path, `${ANTHEM_SANDBOX.fhir}/`);
        const base = new URL(ANTHEM_SANDBOX.fhir);
        if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname + "/") || url.username || url.password || url.hash)
            throw new IntegrationError("Unsafe Anthem resource URL rejected.");
        const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(30_000), headers: { Accept: "application/fhir+json", Authorization: `Bearer ${this.token.accessToken}` }, cache: "no-store" });
        if (response.status === 401)
            throw new IntegrationError("Anthem authorization expired; reconnect the sandbox account.");
        if (response.status === 403)
            throw new IntegrationError("Anthem denied access to this resource; additional authorization may be required.");
        if (response.status === 404 || response.status === 405)
            throw new IntegrationError("This resource is unavailable on the connected Anthem endpoint.");
        return await parseJson(response);
    }
    check(id) { if (id !== this.patientId)
        throw new PatientAccessDenied("Patient is not available in this connected session."); }
    async patient() { return await this.request(`Patient/${this.patientId}`); }
    async search(type, query, id) {
        const resources = [];
        const visited = new Set();
        let next = `${type}?${query}`;
        for (let page = 0; next; page++) {
            if (page >= 50 || visited.has(next))
                throw new IntegrationError("Anthem pagination was incomplete; narrow the request before using totals.");
            visited.add(next);
            const bundle = await this.request(next);
            if (bundle.resourceType !== "Bundle")
                throw new IntegrationError("Anthem did not return a FHIR search bundle.");
            for (const entry of bundle.entry ?? []) {
                const r = entry.resource;
                if (!r || entry.search?.mode === "include")
                    continue;
                if (r.resourceType === "OperationOutcome")
                    throw new IntegrationError("Anthem returned a search warning or error; results may be incomplete.");
                if (r.resourceType !== type)
                    continue;
                const owner = (r.patient ?? r.subject ?? r.beneficiary);
                if (owner?.reference && owner.reference !== `Patient/${id}` && owner.reference !== `${ANTHEM_SANDBOX.fhir}/Patient/${id}`)
                    throw new PatientAccessDenied();
                resources.push(r);
            }
            const link = bundle.link?.find(x => x.relation === "next")?.url;
            next = link ? new URL(link, new URL(next, `${ANTHEM_SANDBOX.fhir}/`)).href : undefined;
        }
        return resources;
    }
    async coverage(id) { this.check(id); return this.search("Coverage", new URLSearchParams({ patient: id }), id); }
    async claims(id, since) { this.check(id); const query = new URLSearchParams({ patient: id }); if (since)
        query.set("date", `ge${since}`); return this.search("ExplanationOfBenefit", query, id); }
    async observations(id) { this.check(id); return this.search("Observation", new URLSearchParams({ patient: id }), id); }
    async capabilities() {
        const metadata = await this.request("metadata");
        if (metadata.resourceType !== "CapabilityStatement")
            throw new IntegrationError("Anthem capability discovery is unavailable.");
        return { resourceType: metadata.resourceType, fhirVersion: metadata.fhirVersion,
            resources: array(metadata.rest).filter(r => r.mode === "server").flatMap(r => array(r.resource)).map(r => ({ type: r.type, interactions: array(r.interaction).map(i => i.code), searchParameters: array(r.searchParam).map(p => p.name) })) };
    }
    async clinical(id, type) {
        this.check(id);
        if (!clinicalTypes.includes(type))
            throw new IntegrationError("Resource type is not allowed.");
        const capability = (await this.capabilities()).resources.find(r => r.type === type);
        const parameter = capability?.searchParameters.includes("patient") ? "patient" : capability?.searchParameters.includes("subject") ? "subject" : undefined;
        if (!capability?.interactions.includes("search-type") || !parameter)
            return { availability: "not-advertised", resourceType: type, records: [], explanation: "The server does not advertise a supported patient-scoped search. This does not mean the patient has no records." };
        const records = await this.search(type, new URLSearchParams({ [parameter]: parameter === "subject" ? `Patient/${id}` : id }), id);
        return { availability: records.length ? "returned" : "no-records-returned", resourceType: type, records };
    }
    async benefits(id) {
        this.check(id);
        const [coverage, claims] = await Promise.all([this.coverage(id), this.claims(id)]);
        return benefitDetails(coverage, claims);
    }
    async medications(id) { return pharmacyHistory(await this.claims(id)); }
    async plans(id) {
        this.check(id);
        const coverage = await this.coverage(id);
        const references = [...new Set(coverage.flatMap(c => array(c.extension).map(e => e.valueReference?.reference).filter((r) => typeof r === "string" && /^InsurancePlan\/[A-Za-z0-9.-]{1,64}$/.test(r))))];
        if (!references.length)
            return { availability: "not-referenced", plans: [] };
        const supported = (await this.capabilities()).resources.some(r => r.type === "InsurancePlan" && r.interactions.includes("read"));
        if (!supported)
            return { availability: "not-advertised", references, plans: [], explanation: "Linked InsurancePlan reads are not advertised by this sandbox. The separate Provider Directory service requires its own registration." };
        const plans = [];
        for (const reference of references) {
            const plan = await this.request(reference);
            if (plan.resourceType !== "InsurancePlan" || `InsurancePlan/${plan.id}` !== reference)
                throw new IntegrationError("Anthem returned an unexpected plan resource.");
            plans.push(plan);
        }
        return { availability: "returned", plans, interpretation: "Plan definitions are not member-specific accumulated benefits or current eligibility." };
    }
}
export function createSandboxClientFromEnv() { return new SandboxPatientClient(); }
