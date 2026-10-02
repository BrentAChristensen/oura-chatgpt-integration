export const dynamic = "force-dynamic";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function html(title, body, status = 200) {
  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body><main><h1>${escapeHtml(title)}</h1>${body}</main></body></html>`, {
    status,
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

export function GET(request) {
  const requestUrl = new URL(request.url);
  const error = requestUrl.searchParams.get("error");
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");

  if (error) {
    return html("Anthem authorization was not completed", "<p>Please return to your assistant and start a new sandbox connection.</p>", 400);
  }

  if (!code || !state) {
    return html("Anthem callback is incomplete", "<p>The authorization response was missing required values. Please return to your assistant and try again.</p>", 400);
  }

  const local = new URL("http://127.0.0.1:8787/auth/anthem/callback");
  local.searchParams.set("code", code);
  local.searchParams.set("state", state);
  return html("Finish Anthem setup", `<p>Anthem sent the one-time authorization response. Complete setup on this computer to save the sandbox connection privately.</p><p><a href="${escapeHtml(local.toString())}" rel="noreferrer">Finish local setup</a></p>`);
}
