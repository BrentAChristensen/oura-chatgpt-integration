export const metadata = {
  title: "Oura Integration",
  description: "Secure, permission-based Oura data integration for AI-assisted analysis."
};

export default function OuraIntegration() {
  return (
    <main>
      <section className="detail-hero">
        <a className="back-link" href="/">← All integrations</a>
        <p className="eyebrow">Health data integration</p>
        <h1>Oura</h1>
        <p className="lede">
          Securely authorize access to selected Oura health and wellness data for
          personal analysis in AI-assisted workflows.
        </p>
        <div className="actions">
          <a className="button" href="/api/oura/authorize">Connect Oura</a>
          <a className="button secondary" href="/privacy">Review privacy policy</a>
        </div>
      </section>

      <section className="detail-grid">
        <article className="info-card">
          <p className="eyebrow">Authorization</p>
          <h2>Your password stays with Oura</h2>
          <p>
            Authorization takes place on Oura's website through OAuth. This site
            never asks for or receives your Oura password.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Data access</p>
          <h2>You choose the permissions</h2>
          <p>
            The integration can access only the categories approved during the
            authorization process. Access can be revoked through Oura where supported.
          </p>
        </article>
      </section>

      <p className="disclaimer">
        Independent integration. Oura trademarks belong to Ōura Health Oy. Information
        produced through this integration is not medical advice.
      </p>
    </main>
  );
}
