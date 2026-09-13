export const metadata = { title: "Terms of Service" };

export default function Terms() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <p className="eyebrow">Christensen Capital Integrations</p>
        <h1>Terms of Service</h1>
        <p className="muted">Last updated: September 13, 2026</p>
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
        <h2>Health information</h2>
        <p>
          Health-related outputs are informational only and are not a substitute for
          professional medical diagnosis, treatment, or emergency care.
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
