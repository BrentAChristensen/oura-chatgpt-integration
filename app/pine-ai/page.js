export const metadata = {
  title: "Pine AI Integration",
  description:
    "Privacy and capability information for the private Pine Voice and Assistant integration."
};

export default function PineAiIntegration() {
  return (
    <main>
      <section className="detail-hero">
        <a className="back-link" href="/#integrations-title">← All integrations</a>
        <p className="eyebrow">Private AI assistant integration</p>
        <h1>Pine AI</h1>
        <p className="lede">
          A privately operated connection to Pine Voice and Pine Assistant for
          owner-authorized calls, research, and multi-step tasks. It is not offered as
          a public ChatGPT plugin or public account connection.
        </p>
        <div className="actions">
          <span className="button disabled" aria-disabled="true">
            Private integration active
          </span>
          <a className="button secondary" href="/privacy">Review privacy policy</a>
        </div>
      </section>

      <section className="detail-grid">
        <article className="info-card">
          <p className="eyebrow">Current status</p>
          <h2>Connected privately</h2>
          <p>
            The local integration is complete and connected to its owner's Pine
            account. It is maintained in a private repository and is not published in
            a public plugin catalog.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Capabilities</p>
          <h2>Voice and Assistant workflows</h2>
          <p>
            The integration can prepare and place authorized calls, read call results,
            manage Assistant sessions and attachments, and start, stop, or delete
            Assistant tasks within the owner's instructions.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Authorization</p>
          <h2>Confirmation before action</h2>
          <p>
            Calls and Assistant task execution use separate preparation and execution
            steps. File sharing, task starts, stops, and permanent deletion require
            explicit authorization for the exact action.
          </p>
        </article>
        <article className="info-card">
          <p className="eyebrow">Data handling</p>
          <h2>Local credentials</h2>
          <p>
            Pine credentials are stored locally with owner-only file permissions and
            are never published on this site. The integration does not persist call
            transcripts or Assistant histories; Pine processes information sent to its
            services for the requested workflow.
          </p>
        </article>
      </section>

      <p className="disclaimer">
        Independent private integration using Pine's official Voice and Assistant
        interfaces. Pine AI names and marks belong to their respective owner.
        Availability depends on the connected Pine account, subscription, credits,
        region, and provider support.
      </p>
    </main>
  );
}
