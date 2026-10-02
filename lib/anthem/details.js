export const clinicalTypes = ["MedicationRequest", "MedicationStatement", "MedicationDispense", "AllergyIntolerance", "Condition", "Procedure", "Encounter", "DiagnosticReport", "Immunization", "CarePlan", "DocumentReference", "CoverageEligibilityResponse"];
export class IntegrationError extends Error {
}
export function array(value) { return Array.isArray(value) ? value.filter(x => x && typeof x === "object") : []; }
export function benefitDetails(coverage, claims, today = new Date().toISOString().slice(0, 10)) {
    return {
        asOf: today,
        interpretation: "Only reported fields are shown. Missing is not zero. Coverage costs and EOB benefit balances are separate from claim totals. Do not sum snapshots, infer annual limits, or treat these records as current eligibility. Preserve network, individual/family, service and period context. Stop loss must not be assumed to mean an out-of-pocket maximum unless the source says so.",
        coverage: coverage.map(c => ({ resourceId: c.id, status: c.status, period: c.period, type: c.type, class: c.class, network: c.network,
            periodEnded: typeof c.period?.end === "string" ? c.period.end.slice(0, 10) < today : null,
            costToBeneficiary: array(c.costToBeneficiary), costDetailAvailability: array(c.costToBeneficiary).length ? "reported" : "not-returned",
            extension: c.extension, modifierExtension: c.modifierExtension })),
        benefitBalanceSnapshots: claims.filter(c => array(c.benefitBalance).length).map(c => ({ resourceId: c.id, status: c.status, created: c.created, insurance: c.insurance, benefitPeriod: c.benefitPeriod, billablePeriod: c.billablePeriod, benefitBalance: c.benefitBalance, modifierExtension: c.modifierExtension })),
        balanceAvailability: claims.some(c => array(c.benefitBalance).length) ? "reported-snapshots-not-current-balance" : "not-returned",
    };
}
export function pharmacyHistory(claims) {
    return { interpretation: "Historical pharmacy claims, not a current medication list. Codes are not resolved to drug names. No dosing or adherence inference.", claims: claims.filter(c => array(c.type?.coding).some(x => x.code === "pharmacy")).map(c => ({ resourceId: c.id, status: c.status, disposition: c.disposition, billablePeriod: c.billablePeriod, supportingInfo: c.supportingInfo, item: c.item, payment: c.payment })) };
}
