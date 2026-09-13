export const metadata = {
  title: "Pine AI Integration",
  description: "Planning information for a future Pine AI integration."
};

export default function PineAiIntegration() {
  return (
    <main>
      <section className="detail-hero">
        <a className="back-link" href="/#integrations-title">← All integrations</a>
        <p className="eyebrow">Planned integration</p>
        <h1>Pine AI</h1>
        <p className="lede">
          This integration is being evaluated. Its capabilities, authorization flow,
          and data requirements will be defined when Pine AI API documentation becomes
          available.
        </p>
        <div className="actions">
          <span className="button disabled" aria-disabled="true">
            API documentation pending
          </span>
          <a className="button secondary" href="/privacy">Review privacy policy</a>
        </div>
      </section>

      <section className="detail-grid">
        <article className="info-card">
          <p className="eyebrow">Current status</p>
          <h2>Planning, not connected</h2>
          <p>
            No Pine AI account connection or data exchange has been implemented on
            this site.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Next step</p>
          <h2>Review the official API</h2>
          <p>
            Before development begins, the available endpoints, authentication method,
            permissions, data retention, and provider requirements will be reviewed.
          </p>
        </article>
      </section>
    </main>
  );
}
