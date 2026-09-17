export const metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <p className="eyebrow">Christensen Capital Integrations</p>
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: September 17, 2026</p>
        <p>
          This policy describes how Christensen Capital integrations handle information
          when a user connects a supported third-party service. Each integration may
          provide additional, service-specific disclosures on its integration page.
        </p>
        <h2>Information we access</h2>
        <p>
          We access only information authorized by the user through the third-party
          provider's permission process. The exact categories depend on the integration
          and the permissions granted, and may include account, business, financial,
          property, communication, or health-related information.
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
          Storage and retention depend on the integration and its authorized purpose.
          Development-stage integrations may process information without retaining it.
          If an integration stores connected-service data or authorization tokens, its
          integration page will describe that handling before persistent storage is
          enabled. Information is retained only as long as reasonably necessary for the
          authorized purpose, security, legal obligations, or account administration.
        </p>
        <h2>Sensitive information</h2>
        <p>
          Some integrations may handle sensitive information, including health or
          financial information. We limit access to the permissions needed for the
          user-authorized workflow and do not use connected-service information for
          unrelated purposes.
        </p>
        <h2>Security</h2>
        <p>
          We use reasonable administrative and technical safeguards appropriate to the
          development stage and sensitivity of the information. No method of electronic
          transmission or storage can be guaranteed to be completely secure.
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
