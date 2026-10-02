// Adapted from Tesla's PKCE and one-use OAuth state patterns. Not yet wired to an Anthem login.
import { createHash, randomBytes } from "node:crypto";
export class PendingAuthorizationStore {
    now;
    pending = new Map();
    constructor(now = Date.now) {
        this.now = now;
    }
    create() {
        for (const [state, item] of this.pending)
            if (item.expiresAt <= this.now())
                this.pending.delete(state);
        if (this.pending.size >= 100)
            throw new Error("Too many pending authorizations.");
        const state = randomBytes(32).toString("base64url");
        const verifier = randomBytes(64).toString("base64url");
        this.pending.set(state, { verifier, expiresAt: this.now() + 600_000 });
        return { state, codeChallenge: createHash("sha256").update(verifier).digest("base64url"), codeChallengeMethod: "S256" };
    }
    consume(state) {
        const item = this.pending.get(state);
        this.pending.delete(state);
        if (!item || item.expiresAt <= this.now())
            throw new Error("Invalid or expired authorization.");
        return item.verifier;
    }
}
