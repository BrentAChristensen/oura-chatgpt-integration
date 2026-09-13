export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Secure integrations · Responsible automation</p>
        <h1>Connected services, made useful.</h1>
        <p className="lede">
          Christensen Capital develops focused software integrations and AI-assisted
          workflows for business operations, health data, property management, and
          connected services.
        </p>
      </section>

      <section className="section" aria-labelledby="integrations-title">
        <div className="section-heading">
          <p className="eyebrow">Current work</p>
          <h2 id="integrations-title">Integrations</h2>
        </div>
        <a className="integration-card" href="/oura">
          <div className="integration-icon" aria-hidden="true">O</div>
          <div>
            <div className="card-topline">
              <h3>Oura health data</h3>
              <span className="status">In development</span>
            </div>
            <p>
              Permission-based access to selected Oura data for personal analysis
              and AI-assisted health insights.
            </p>
            <span className="text-link">View integration details →</span>
          </div>
        </a>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="section-heading">
          <p className="eyebrow">How we build</p>
          <h2 id="principles-title">Designed around trust</h2>
        </div>
        <div className="principle-grid">
          <article>
            <span>01</span>
            <h3>Permission first</h3>
            <p>Connections use provider authorization and request only the access needed.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Purpose limited</h3>
            <p>Connected data is used only to deliver the workflow a user authorizes.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Clear by design</h3>
            <p>Each integration explains its purpose, permissions, and data practices.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
