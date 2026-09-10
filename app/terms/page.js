export const metadata = { title: "Terms of Service | Oura ChatGPT Integration" };

export default function Terms() {
  return (
    <main>
      <article className="card">
        <h1>Terms of Service</h1>
        <p className="muted">Last updated: September 10, 2026</p>
        <p>
          This service is currently a development-stage integration for connecting
          authorized Oura data with ChatGPT-related workflows.
        </p>
        <h2>Authorization</h2>
        <p>
          You must use your own Oura account and grant only the permissions you wish
          to provide. You may revoke access through Oura where supported.
        </p>
        <h2>No medical diagnosis</h2>
        <p>
          Information produced through the integration is informational and is not a
          substitute for professional medical diagnosis, treatment, or emergency care.
        </p>
        <h2>Availability</h2>
        <p>
          The service may change, be unavailable, or be discontinued while it is in
          development.
        </p>
        <h2>Third-party services</h2>
        <p>
          Use of Oura data remains subject to Oura's own terms, policies, API rules,
          and account requirements.
        </p>
      </article>
    </main>
  );
}
