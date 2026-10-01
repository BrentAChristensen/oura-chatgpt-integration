import assert from "node:assert/strict";
import test from "node:test";
import { GET } from "../app/auth/anthem/callback/route.js";

test("unconfigured Anthem callback rejects authorization without exposing inputs", async () => {
  const response = GET(new Request("https://integrations.christensencap.com/auth/anthem/callback?code=private-code&state=private-state&error=%3Cscript%3E"));
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  const body = await response.text();
  assert.match(body, /has not been connected/);
  assert.doesNotMatch(body, /private-code|private-state|<script>/);
});
