export const metadata = {
  title: "Anthem Blue Cross Blue Shield Integration",
  description:
    "Planning and privacy information for the Anthem Personal Health Assistant integration."
};

export default function AnthemIntegration() {
  return (
    <main>
      <section className="detail-hero">
        <a className="back-link" href="/#integrations-title">← All integrations</a>
        <p className="eyebrow">Health insurance integration</p>
        <h1>Anthem</h1>
        <p className="lede">
          A member-controlled, read-only assistant for Anthem Patient Access records,
          currently verified against sandbox data while production approval is pending.
        </p>
        <div className="actions">
          <span className="button disabled" aria-disabled="true">
            Sandbox verified
          </span>
          <a className="button secondary" href="/anthem/privacy">
            Review Anthem data use
          </a>
        </div>
      </section>

      <section className="detail-grid">
        <article className="info-card">
          <p className="eyebrow">Current status</p>
          <h2>Sandbox connected</h2>
          <p>
            The local plugin can read synthetic Anthem sandbox Patient Access data.
            Production member access is not configured or approved yet.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Read-only scope</p>
          <h2>Member controlled</h2>
          <p>
            The intended production flow uses Anthem OAuth consent and read-only access
            to records returned by Anthem. The assistant does not write claims,
            initiate payments, or diagnose conditions.
          </p>
        </article>
      </section>

      <p className="disclaimer">
        Independent integration planning. Anthem, Blue Cross, and Blue Shield names and
        marks belong to their respective owners. This integration does not provide
        medical advice.
      </p>
    </main>
  );
}
