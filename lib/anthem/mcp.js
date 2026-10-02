import { clinicalTypes, IntegrationError } from "./details.js";
// Adapted from the Tesla plugin's McpServer factory, validated inputs, and controlled-error boundary.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MockPatientClient, PatientAccessDenied } from "./client.js";
import { SandboxPatientClient } from "./anthem-api.js";
const patientId = z.string().regex(/^[A-Za-z0-9.-]{1,64}$/).describe("Use the exact ID returned by get_anthem_patient.");
const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
function result(data, live = false) {
    const envelope = { source: live ? "anthem-sandbox-fhir" : "local-synthetic-fixtures", synthetic: !live, connectedToAnthem: live, data };
    return { content: [{ type: "text", text: JSON.stringify(envelope) }], structuredContent: envelope };
}
async function guarded(read, live = false) {
    try {
        return result(await read(), live);
    }
    catch (error) {
        return { isError: true, content: [{ type: "text", text: error instanceof PatientAccessDenied
                        ? "Patient is not available in this connected session. Call get_anthem_patient first."
                        : error instanceof IntegrationError ? error.message : "The integration could not complete this request." }] };
    }
}
export function createAnthemMcpServer(client = new MockPatientClient()) {
    const live = client instanceof SandboxPatientClient;
    const server = new McpServer({ name: "anthem-insurance-plugin", version: "0.1.0" }, {
        instructions: "This plugin is read-only. In mock mode, label results as invented demo data. In sandbox mode, label results as Anthem sandbox FHIR data, not production health records. Call get_anthem_patient before patient-specific tools. Claims submitted totals are not patient balances. Preserve resource IDs when explaining records. Do not diagnose or infer missing coverage or clinical facts. No production data, writes, or Oura integration is available.",
    });
    server.registerTool("get_anthem_connection_status", {
        description: "Report whether the plugin is using local mock fixtures or the connected Anthem sandbox token.",
        inputSchema: {}, annotations,
    }, async () => result({ mode: live ? "sandbox" : "mock", registrationCompleted: live, oauthImplemented: live,
        sandboxRegistrationUrl: "https://sbx.totalview.healthos.elevancehealth.com/registration/sandbox/login",
        nextStep: live ? "Use get_anthem_patient, then read sandbox Coverage, ExplanationOfBenefit and Observation resources." : "Run the local setup server, open /auth/anthem/start, complete Anthem login, then restart with ANTHEM_MODE=sandbox." }, live));
    server.registerTool("get_anthem_patient", {
        description: live ? "Return the connected Anthem sandbox Patient resource." : "Return the invented demo patient, not the user's real identity or health records.", inputSchema: {}, annotations,
    }, async () => guarded(() => client.patient(), live));
    server.registerTool("list_anthem_coverage", {
        description: live ? "Read Anthem sandbox Coverage records. This is not a production benefits or eligibility determination." : "Read synthetic coverage records. This is not a real benefits or eligibility determination.",
        inputSchema: { patientId }, annotations,
    }, async ({ patientId }) => guarded(() => client.coverage(patientId), live));
    server.registerTool("list_anthem_claims", {
        description: live ? "Read Anthem sandbox ExplanationOfBenefit records. Submitted amounts are not amounts the patient owes." : "Read invented ExplanationOfBenefit records. Submitted amounts are not amounts the patient owes.",
        inputSchema: { patientId, since: z.iso.date().optional().describe("Optional inclusive service-period end date, YYYY-MM-DD.") }, annotations,
    }, async ({ patientId, since }) => guarded(() => client.claims(patientId, since), live));
    server.registerTool("list_anthem_observations", {
        description: live ? "Read Anthem sandbox Observation records with original codes, units and dates; not medical advice." : "Read invented clinical observations with original codes, units and dates; not medical advice.",
        inputSchema: { patientId }, annotations,
    }, async ({ patientId }) => guarded(() => client.observations(patientId), live));
    server.registerTool("get_anthem_capabilities", {
        description: "Read the connected sandbox CapabilityStatement to discover advertised resources, read operations and search parameters. Advertising support does not guarantee access or data.", inputSchema: {}, annotations,
    }, async () => guarded(() => client.capabilities(), live));
    server.registerTool("get_anthem_benefit_details", {
        description: "Read reported coverage cost sharing and EOB benefit balance snapshots with network, period and source IDs. Missing values are not zero. Do not derive annual deductibles, out-of-pocket maximums or remaining balances from claim totals. Not current eligibility.", inputSchema: { patientId }, annotations,
    }, async ({ patientId }) => guarded(() => client.benefits(patientId), live));
    server.registerTool("get_anthem_linked_plans", {
        description: "Read InsurancePlan records referenced by the patient's coverage, only when the sandbox advertises support. Plan definitions are not member balances. Separate directory credentials are not configured.", inputSchema: { patientId }, annotations,
    }, async ({ patientId }) => guarded(() => client.plans(patientId), live));
    server.registerTool("list_anthem_medication_claims", {
        description: "Extract historical pharmacy claims with drug codes, quantities, days supply and refill information when present. This is not a current medication list; drug names and dosing must not be inferred.", inputSchema: { patientId }, annotations,
    }, async ({ patientId }) => guarded(() => client.medications(patientId), live));
    server.registerTool("list_anthem_clinical_records", {
        description: "Read an allowed clinical resource or existing CoverageEligibilityResponse using a patient-scoped search advertised by the sandbox. Does not create an eligibility request. Unsupported is distinguished from no records. Medication records do not prove actual use. Document links are returned without downloading attachments.", inputSchema: { patientId, resourceType: z.enum(clinicalTypes) }, annotations,
    }, async ({ patientId, resourceType }) => guarded(() => client.clinical(patientId, resourceType), live));
    return server;
}
