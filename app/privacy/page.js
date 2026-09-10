export const metadata = { title: "Privacy Policy | Oura ChatGPT Integration" };

export default function Privacy() {
  return (
    <main>
      <article className="card">
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: September 10, 2026</p>
        <p>
          This integration is designed to let a user authorize access to selected
          Oura data through Oura's OAuth authorization process.
        </p>
        <h2>Data we may access</h2>
        <p>
          Depending on the permissions a user grants, the service may access Oura
          profile information, daily summaries, heart-rate data, workouts, tags,
          sessions, and daily SpO₂ data.
        </p>
        <h2>Credentials</h2>
        <p>
          We do not collect an Oura account password. Authorization is performed on
          Oura's website. Application secrets are stored only in server-side
          environment configuration and are not exposed to the browser.
        </p>
        <h2>Token storage</h2>
        <p>
          The current development version does not persist Oura access or refresh
          tokens. If persistent authorization is added later, this policy will be
          updated before that functionality is enabled.
        </p>
        <h2>Use of data</h2>
        <p>
          Authorized Oura data will be used only to provide the integration's
          requested functionality, such as retrieval and analysis of the user's Oura
          information.
        </p>
        <h2>Contact</h2>
        <p>
          Contact information for the application operator will be published before
          the integration is made available beyond development/testing users.
        </p>
      </article>
    </main>
  );
}
