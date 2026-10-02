import { createServer } from "node:http";
import { authorizationUrl, exchangeAuthorizationCode } from "./anthem-api.js";
import { PendingAuthorizationStore } from "./oauth-state.js";
import { saveSandboxToken, sandboxTokenPath } from "./token-store.js";
export const SETUP_HOST = "127.0.0.1";
export const SETUP_PORT = 8787;
export const REDIRECT_URI = `http://${SETUP_HOST}:${SETUP_PORT}/auth/anthem/callback`;
const pending = new PendingAuthorizationStore();
function plain(res, status, message) {
    res.writeHead(status).end(message);
}
// Local setup listener. PKCE state stays on 127.0.0.1; the public callback only relays the one-time code back here.
export function createSetupServer() {
    return createServer(async (req, res) => {
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Referrer-Policy", "no-referrer");
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
        if (req.headers.host !== `${SETUP_HOST}:${SETUP_PORT}`) {
            plain(res, 403, "Invalid host.");
            return;
        }
        if (req.method !== "GET") {
            res.writeHead(405, { Allow: "GET" }).end("Method not allowed.");
            return;
        }
        const url = new URL(req.url ?? "/", `http://${SETUP_HOST}:${SETUP_PORT}`);
        const path = url.pathname;
        if (path === "/") {
            res.end("Anthem Personal Health Assistant sandbox setup. Visit /auth/anthem/start to connect the approved Anthem sandbox app.");
        }
        else if (path === "/auth/anthem/start") {
            try {
                const auth = pending.create();
                res.writeHead(302, { Location: authorizationUrl(auth.state, auth.codeChallenge) }).end();
            }
            catch {
                plain(res, 503, "Anthem sandbox authorization is not configured yet.");
            }
        }
        else if (path === "/auth/anthem/callback") {
            const error = url.searchParams.get("error");
            const code = url.searchParams.get("code");
            const state = url.searchParams.get("state");
            if (error) {
                plain(res, 400, "Anthem authorization was not completed.");
                return;
            }
            if (!code || !state) {
                plain(res, 400, "The Anthem authorization response was missing required values.");
                return;
            }
            try {
                const verifier = pending.consume(state);
                const token = await exchangeAuthorizationCode(code, verifier);
                saveSandboxToken(token);
                res.end(`Anthem sandbox connected. The token was saved privately at ${sandboxTokenPath()}. Return to your assistant and use ANTHEM_MODE=sandbox.`);
            }
            catch {
                plain(res, 400, "The Anthem authorization could not be completed. Start a new sandbox connection and try again.");
            }
        }
        else {
            res.writeHead(404).end("Not found.");
        }
    });
}
