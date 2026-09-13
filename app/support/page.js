export const metadata = { title: "Support" };

export default function Support() {
  return (
    <main className="legal-page">
      <article className="legal-card">
        <p className="eyebrow">Help and data requests</p>
        <h1>Integration support</h1>
        <p>
          For help connecting an account, revoking access, or asking about information
          handled by an integration, contact the application operator using the contact
          details included with your access invitation.
        </p>
        <h2>Include with your request</h2>
        <ul>
          <li>The integration name, such as Oura</li>
          <li>A short description of the issue or request</li>
          <li>The email address associated with your invitation</li>
        </ul>
        <p>
          Do not send passwords, access tokens, medical records, or other sensitive
          credentials in a support request.
        </p>
        <div className="actions">
          <a className="button secondary" href="/privacy">Privacy policy</a>
          <a className="button secondary" href="/terms">Terms of service</a>
        </div>
      </article>
    </main>
  );
}
