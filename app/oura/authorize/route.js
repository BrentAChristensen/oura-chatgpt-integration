import { NextResponse } from "next/server";
import crypto from "crypto";

const scopes = [
  "email",
  "personal",
  "daily",
  "heartrate",
  "workout",
  "tag",
  "session",
  "spo2Daily"
];

export async function GET() {
  const clientId = process.env.OURA_CLIENT_ID;
  const redirectUri = process.env.OURA_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Oura OAuth is not configured yet." },
      { status: 503 }
    );
  }

  const state = crypto.randomBytes(24).toString("hex");
  const url = new URL("https://cloud.ouraring.com/oauth/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scopes.join(" "));
  url.searchParams.set("state", state);

  const response = NextResponse.redirect(url);
  response.cookies.set("oura_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/"
  });
  return response;
}
