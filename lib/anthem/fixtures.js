// Invented test records. No records were copied from Anthem or a real patient.
export const DEMO_PATIENT_ID = "synthetic-member-001";
export const patient = {
    resourceType: "Patient", id: DEMO_PATIENT_ID,
    name: [{ use: "official", given: ["Synthetic"], family: "Member" }],
    birthDate: "1980-01-01",
};
export const coverage = [{
        resourceType: "Coverage", id: "synthetic-coverage-001", status: "active",
        beneficiary: { reference: `Patient/${DEMO_PATIENT_ID}` },
        payor: [{ display: "Synthetic test insurer — not a real Anthem plan" }],
        period: { start: "2026-01-01", end: "2026-12-31" },
    }];
export const claims = [
    { id: "synthetic-claim-001", start: "2026-09-01", end: "2026-09-01", amount: 125 },
    { id: "synthetic-claim-002", start: "2026-09-10", end: "2026-09-10", amount: 75 },
].map(({ id, start, end, amount }) => ({
    resourceType: "ExplanationOfBenefit", id, status: "active", use: "claim",
    type: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/claim-type", code: "professional" }] },
    patient: { reference: `Patient/${DEMO_PATIENT_ID}` }, created: end,
    insurer: { display: "Synthetic test insurer" }, provider: { display: "Synthetic test clinic" },
    outcome: "complete", billablePeriod: { start, end },
    insurance: [{ focal: true, coverage: { reference: "Coverage/synthetic-coverage-001" } }],
    total: [{ category: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/adjudication", code: "submitted" }] }, amount: { value: amount, currency: "USD" } }],
}));
export const observations = [{
        resourceType: "Observation", id: "synthetic-observation-001", status: "final",
        code: { coding: [{ system: "http://loinc.org", code: "8867-4", display: "Heart rate" }] },
        subject: { reference: `Patient/${DEMO_PATIENT_ID}` }, effectiveDateTime: "2026-09-01T14:00:00Z",
        valueQuantity: { value: 72, unit: "beats/minute", system: "http://unitsofmeasure.org", code: "/min" },
    }];
