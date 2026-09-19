export const metadata = {
  title: "Tesla Fleet API Integration",
  description:
    "Setup information for a secure, permission-based Tesla Fleet API integration."
};

export default function TeslaIntegration() {
  return (
    <main>
      <section className="detail-hero">
        <a className="back-link" href="/#integrations-title">← All integrations</a>
        <p className="eyebrow">Connected vehicle integration</p>
        <h1>Tesla</h1>
        <p className="lede">
          A secure, permission-based connection to selected Tesla vehicle data and
          commands for personal automations and AI-assisted workflows.
        </p>
        <div className="actions">
          <span className="button disabled" aria-disabled="true">
            Setup in progress
          </span>
          <a className="button secondary" href="/privacy">Review privacy policy</a>
        </div>
      </section>

      <section className="detail-grid">
        <article className="info-card">
          <p className="eyebrow">Current status</p>
          <h2>Developer access setup</h2>
          <p>
            Tesla developer application setup is in progress. No Tesla account,
            vehicle, or energy product is connected to this site yet.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Permission first</p>
          <h2>Owner-controlled access</h2>
          <p>
            Any connection will use Tesla authorization and request only the
            permissions needed for approved vehicle data, location, charging, or
            command workflows.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Planned uses</p>
          <h2>Useful vehicle workflows</h2>
          <p>
            Planned capabilities include checking battery and charging state,
            sending destinations, and supporting owner-approved charging or climate
            automations.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Security</p>
          <h2>Signed vehicle commands</h2>
          <p>
            Remote commands will use Tesla's required virtual-key and signed-command
            protections. Credentials and private keys will never be published here.
          </p>
        </article>
      </section>

      <p className="disclaimer">
        Independent integration using Tesla Fleet API. Tesla names and marks belong
        to Tesla, Inc. Availability depends on Tesla approval, compatible vehicles,
        owner authorization, and regional support.
      </p>
    </main>
  );
}
