export const metadata = { title: "Terms of Service" };

export default function Terms() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <p className="eyebrow">Christensen Capital Integrations</p>
        <h1>Terms of Service</h1>
        <p className="muted">Last updated: September 17, 2026</p>
        <p>
          These terms apply to development-stage integrations operated by Christensen
          Capital for authorized users and testing participants.
        </p>
        <h2>Authorized use</h2>
        <p>
          You must connect only accounts you are authorized to use and grant only the
          permissions you choose to provide. You are responsible for complying with the
          connected service's terms and account requirements.
        </p>
        <h2>Third-party services</h2>
        <p>
          Connected services are operated by independent providers. Their availability,
          terms, privacy practices, and API rules continue to apply.
        </p>
        <h2>Development-stage availability</h2>
        <p>
          Integrations may change, be unavailable, or be discontinued during development.
          No uninterrupted or error-free operation is guaranteed.
        </p>
        <h2>Informational outputs</h2>
        <p>
          Integration and AI-assisted outputs are provided for informational and
          administrative purposes. They are not a substitute for professional medical,
          legal, tax, accounting, financial, or other professional advice. Do not rely
          on an integration for emergency services or time-critical decisions.
        </p>
        <h2>User responsibility</h2>
        <p>
          You are responsible for reviewing outputs before acting on them and for the
          accuracy of information you provide. Do not use an integration to violate law,
          another person's rights, or a connected provider's rules.
        </p>
        <h2>Support</h2>
        <p>
          Questions about an integration, account connection, or data handling can be
          submitted through the <a href="/support">support page</a>.
        </p>
      </article>
    </main>
  );
}
