import { NextResponse } from "next/server";

function html(title, message) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f7f7f5;color:#171717;margin:0}
main{max-width:760px;margin:0 auto;padding:64px 24px}
section{background:#fff;border:1px solid #e6e6e2;border-radius:24px;padding:32px;box-shadow:0 8px 30px rgba(0,0,0,.04)}
h1{font-size:clamp(2rem,6vw,4rem);line-height:1;margin:0 0 18px}
p{line-height:1.65}
a{display:inline-block;margin-top:18px;padding:12px 18px;border-radius:999px;background:#171717;color:#fff;text-decoration:none;font-weight:600}
</style>
</head>
<body><main><section><h1>${title}</h1><p>${message}</p><a href="/">Return home</a></section></main></body>
</html>`;
}

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const returnedState = requestUrl.searchParams.get("state");
  const storedState = request.cookies.get("oura_oauth_state")?.value;

  if (error) {
    return new NextResponse(
      html("Authorization not completed", `Oura returned: ${String(error)}`),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  if (!code || !returnedState || !storedState || returnedState !== storedState) {
    return new NextResponse(
      html("Authorization failed", "The OAuth callback was invalid or the security state did not match."),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const clientId = process.env.OURA_CLIENT_ID;
  const clientSecret = process.env.OURA_CLIENT_SECRET;
  const redirectUri = process.env.OURA_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return new NextResponse(
      html("Configuration incomplete", "Oura OAuth credentials have not yet been configured on the server."),
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret
  });

  const tokenResponse = await fetch("https://api.ouraring.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store"
  });

  if (!tokenResponse.ok) {
    console.error("Oura token exchange failed with status", tokenResponse.status);
    return new NextResponse(
      html("Connection failed", "Oura did not accept the authorization-code exchange."),
      { status: 502, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Deliberately parse but do not log, expose, or persist token values in this starter.
  await tokenResponse.json();

  const response = new NextResponse(
    html("Oura connected", "OAuth completed successfully. This development build does not persist access or refresh tokens yet."),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
  response.cookies.set("oura_oauth_state", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(0),
    path: "/"
  });
  return response;
}
