import "./globals.css";

export const metadata = {
  title: "Oura ChatGPT Integration",
  description: "Secure Oura data integration for use with ChatGPT."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
