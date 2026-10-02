export const metadata = {
  title: "Anthem Privacy and Data Use",
  description:
    "Privacy and data-use information for the Anthem Personal Health Assistant integration."
};

export default function AnthemPrivacy() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <p className="eyebrow">Anthem Personal Health Assistant</p>
        <h1>Privacy and data use</h1>
        <p className="muted">Last updated: October 2, 2026</p>
        <p>
          Anthem Personal Health Assistant is a read-only assistant designed to help a
          member review health-plan information made available through Anthem Patient
          Access APIs after the member signs in with Anthem and gives consent.
        </p>

        <h2>Current status</h2>
        <p>
          The current implementation is connected only to Anthem sandbox data. It does
          not access production Anthem member records. Production use requires Anthem
          approval, production OAuth credentials, and member consent through Anthem.
        </p>

        <h2>Information the assistant may access</h2>
        <p>With member consent, the assistant may read information returned by Anthem, including:</p>
        <ul>
          <li>Member profile information needed to identify the connected record.</li>
          <li>Coverage and plan-related records.</li>
          <li>Claims and ExplanationOfBenefit records.</li>
          <li>
            Claim payment fields, such as submitted amount, benefit amount,
            paid-to-provider amount, copay, coinsurance, deductible, noncovered amount,
            discount, member liability, and payment date or amount when returned.
          </li>
          <li>
            Pharmacy claim history, including drug code, quantity, days supply, refill
            fields, and payment fields when returned.
          </li>
          <li>
            Supported clinical records returned by Anthem Patient Access APIs, such as
            observations, conditions, procedures, encounters, diagnostic reports,
            immunizations, care plans, medication records, and document references.
          </li>
        </ul>

        <h2>How information is used</h2>
        <p>
          The assistant uses connected Anthem information to answer the member&apos;s
          questions and summarize available records in plain language. Examples include
          summarizing claims, explaining payment fields, listing pharmacy claims, and
          showing what coverage or clinical records are available.
        </p>

        <h2>What the assistant does not do</h2>
        <ul>
          <li>It does not write data back to Anthem.</li>
          <li>It does not submit or modify claims.</li>
          <li>It does not create eligibility requests.</li>
          <li>It does not initiate payments.</li>
          <li>It does not sell member data or use Anthem data for advertising.</li>
          <li>It does not diagnose medical conditions.</li>
          <li>
            It does not infer annual deductible, out-of-pocket maximum, stop-loss,
            current medication use, or patient balances when those values are not
            directly returned by Anthem.
          </li>
        </ul>

        <h2>Token and credential handling</h2>
        <p>
          The assistant connects through Anthem&apos;s OAuth consent flow. Access and
          refresh tokens are stored privately and are used only to retrieve the
          consenting member&apos;s records. Tokens are not stored in the plugin source
          code repository.
        </p>

        <h2>Member control</h2>
        <p>
          The member controls whether to connect Anthem data. The member can revoke
          access through Anthem&apos;s consent or revocation process, or request that the
          application delete stored connection tokens.
        </p>

        <h2>Important limits</h2>
        <p>
          Information shown by the assistant depends on what Anthem returns through the
          connected API. Missing fields are treated as unavailable, not zero. Submitted
          claim amounts are not necessarily amounts owed by the member. Historical
          pharmacy claims are not proof that a medication is currently being taken.
        </p>

        <h2>Support</h2>
        <p>
          For access, deletion, privacy, or support questions, use the{" "}
          <a href="/support">support page</a>.
        </p>
      </article>
    </main>
  );
}
