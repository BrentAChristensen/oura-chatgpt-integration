export default function Home() {
  return (
    <main>
      <section className="card">
        <p className="muted">Oura API Integration</p>
        <h1>Connect Oura to ChatGPT</h1>
        <p>
          This service is being developed to let users securely authorize access to
          selected Oura health and wellness data for analysis in ChatGPT.
        </p>
        <p>
          Access is permission-based through Oura OAuth. Oura credentials are never
          requested directly by this site.
        </p>
        <div className="actions">
          <a className="button" href="/api/oura/authorize">Connect Oura</a>
          <a className="button secondary" href="/privacy">Privacy</a>
          <a className="button secondary" href="/terms">Terms</a>
        </div>
      </section>
      <footer>Independent integration. Oura trademarks belong to Ōura Health Oy.</footer>
    </main>
  );
}
