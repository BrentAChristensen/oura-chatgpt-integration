export const metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <p className="eyebrow">Christensen Capital Integrations</p>
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: September 13, 2026</p>
        <p>
          This policy describes how Christensen Capital integrations handle information
          when a user connects a supported third-party service. Each integration may
          also provide additional, service-specific details.
        </p>
        <h2>Information we access</h2>
        <p>
          We access only information authorized by the user through the third-party
          provider's permission process. The exact categories depend on the integration
          and the permissions granted.
        </p>
        <h2>How information is used</h2>
        <p>
          Authorized information is used only to provide the requested integration,
          including retrieval, analysis, and user-directed automation. We do not sell
          connected-service data.
        </p>
        <h2>Credentials and authorization</h2>
        <p>
          We do not request third-party account passwords. Supported connections use
          the provider's authorization process. Application secrets remain in
          server-side configuration and are not exposed to the browser.
        </p>
        <h2>Storage and retention</h2>
        <p>
          Retention depends on the integration. The current Oura development version
          does not persist Oura access tokens, refresh tokens, or retrieved Oura data.
          This policy will be updated before persistent storage is enabled.
        </p>
        <h2>Oura integration</h2>
        <p>
          Depending on the permissions granted, the Oura integration may access profile
          information, daily summaries, heart-rate data, workouts, tags, sessions, and
          daily SpO₂ data. That information is used only for the user-authorized workflow.
        </p>
        <h2>Your choices</h2>
        <p>
          You may decline requested permissions or revoke a connection through the
          third-party provider where supported. See the <a href="/support">support page</a>
          for assistance with access or deletion questions.
        </p>
      </article>
    </main>
  );
}
