export const metadata = {
  title: "Anthem Blue Cross Blue Shield Integration",
  description:
    "Planning information for a future Anthem Blue Cross Blue Shield integration."
};

export default function AnthemIntegration() {
  return (
    <main>
      <section className="detail-hero">
        <a className="back-link" href="/#integrations-title">← All integrations</a>
        <p className="eyebrow">Health insurance integration</p>
        <h1>Anthem</h1>
        <p className="lede">
          A secure, permission-based connection for selected Anthem Blue Cross Blue
          Shield plan information and member workflows.
        </p>
        <div className="actions">
          <span className="button disabled" aria-disabled="true">
            Planned
          </span>
          <a className="button secondary" href="/privacy">Review privacy policy</a>
        </div>
      </section>

      <section className="detail-grid">
        <article className="info-card">
          <p className="eyebrow">Current status</p>
          <h2>Planning, not connected</h2>
          <p>
            No Anthem account connection or member-data exchange has been enabled on
            this site.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Privacy first</p>
          <h2>Minimum necessary access</h2>
          <p>
            Any future connection will use provider authorization, clearly disclose
            requested permissions, and limit access to the approved workflow.
          </p>
        </article>
      </section>

      <p className="disclaimer">
        Planned independent integration. Anthem, Blue Cross, and Blue Shield
        names and marks belong to their respective owners. This integration does not
        provide medical advice.
      </p>
    </main>
  );
}
