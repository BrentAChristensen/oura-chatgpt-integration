// Registration-stage endpoint. Keep authorization disabled until Anthem issues
// sandbox credentials and a validated, single-use PKCE flow is configured.
export const dynamic = "force-dynamic";

export function GET() {
  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Anthem connection setup</title></head>
<body><main><h1>Anthem connection setup is pending</h1>
<p>The Anthem sandbox application is being configured. Your Anthem account has not been connected.</p>
<p>Please return to your assistant to continue setup.</p>
<a href="/anthem">About the Anthem integration</a></main></body></html>`, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
