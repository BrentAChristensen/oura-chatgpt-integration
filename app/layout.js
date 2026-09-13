import "./globals.css";

export const metadata = {
  title: {
    default: "Christensen Capital Integrations",
    template: "%s | Christensen Capital Integrations"
  },
  description:
    "Secure software integrations and AI-assisted workflows for connected services."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a className="brand" href="/">
            <span className="brand-mark">CC</span>
            <span>Christensen Capital Integrations</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="/#integrations-title">Integrations</a>
            <a href="/privacy">Privacy</a>
            <a href="/support">Support</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <span>© 2026 Christensen Capital</span>
          <span className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/support">Support</a>
          </span>
        </footer>
      </body>
    </html>
  );
}
