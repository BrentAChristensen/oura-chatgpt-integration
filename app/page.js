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
        <div className="integration-list">
          <a className="integration-card" href="/oura">
            <div className="integration-logo oura-logo" aria-label="Oura">ŌURA</div>
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

          <a className="integration-card" href="/pine-ai">
            <div className="integration-logo pine-logo" aria-label="Pine AI">PINE AI</div>
            <div>
              <div className="card-topline">
                <h3>Pine AI</h3>
                <span className="status planned">Planned</span>
              </div>
              <p>
                A future Pine AI connection. Features, permissions, and data handling
                will be defined after the API documentation is available.
              </p>
              <span className="text-link">View integration details →</span>
            </div>
          </a>


          <a className="integration-card" href="/anthem">
            <div className="integration-logo anthem-logo" aria-label="Anthem Blue Cross Blue Shield">
              <span>ANTHEM<small>BLUE CROSS BLUE SHIELD</small></span>
            </div>
            <div>
              <div className="card-topline">
                <h3>Anthem Blue Cross Blue Shield</h3>
                <span className="status">In development</span>
              </div>
              <p>
                A secure, permission-based connection for selected plan information
                and member workflows.
              </p>
              <span className="text-link">View integration details →</span>
            </div>
          </a>
        </div>
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
