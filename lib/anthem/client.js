import { benefitDetails, pharmacyHistory } from "./details.js";
import { claims, coverage, DEMO_PATIENT_ID, observations, patient } from "./fixtures.js";
import { hasSandboxToken } from "./token-store.js";
export class PatientAccessDenied extends Error {
}
export function validateMode(mode) {
    if (mode !== undefined && mode !== "mock" && mode !== "sandbox")
        throw new Error("ANTHEM_MODE must be mock or sandbox.");
    if (mode === "sandbox" && !process.env.ANTHEM_ACCESS_TOKEN && !process.env.ANTHEM_REFRESH_TOKEN && !hasSandboxToken())
        throw new Error("Sandbox mode requires a connected Anthem sandbox token.");
}
export class MockPatientClient {
    check(id) {
        if (id !== DEMO_PATIENT_ID)
            throw new PatientAccessDenied("Patient is not available in this synthetic session.");
    }
    capabilities() { return { resources: [], explanation: "Mock mode has no connected server capabilities." }; }
    benefits(id) { this.check(id); return benefitDetails(this.coverage(id), this.claims(id)); }
    medications(id) { return pharmacyHistory(this.claims(id)); }
    plans(id) { this.check(id); return { availability: "not-referenced", plans: [] }; }
    clinical(id, type) { this.check(id); return { availability: "not-advertised", resourceType: type, records: [], explanation: "No invented fixtures are configured for this resource." }; }
    patient() { return structuredClone(patient); }
    coverage(id) { this.check(id); return structuredClone(coverage); }
    claims(id, since) {
        this.check(id);
        return structuredClone(claims.filter(claim => !since || claim.billablePeriod.end >= since));
    }
    observations(id) { this.check(id); return structuredClone(observations); }
}
