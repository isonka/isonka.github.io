// The per-login proof of the website session (pt7-academy docs/DECISIONS_LOG.md, "Session protection for the trainee
// area"). The API needs the HttpOnly cookie and this value, which the login returns and a password change replaces. It
// lives in this address's own storage, so every tab shares it and other addresses (pt7.nl) can't read it.

const KEY = 'trainee-session-proof';
const FORMAT = /^[A-Za-z0-9_-]{43}$/; // 32 random bytes, base64url, as the API checks it

// Only when the browser refuses storage (some private modes): the login then lasts until this page is reloaded
let unsaved: string | null = null;

function removeStored() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // storage is refused: nothing is stored either
  }
}

/** The proof to send, or null when there is none in the right format. */
export function readProof(): string | null {
  if (unsaved !== null) return unsaved;
  try {
    const value = localStorage.getItem(KEY);
    return value !== null && FORMAT.test(value) ? value : null;
  } catch {
    return null;
  }
}

/** Keeps the proof a login or password change returned; anything else leaves the current one in place. */
export function keepProof(proof: unknown): void {
  if (typeof proof !== 'string' || !FORMAT.test(proof)) return;
  try {
    localStorage.setItem(KEY, proof);
    unsaved = null;
  } catch {
    unsaved = proof;
    removeStored(); // an older proof must not outlive this one
  }
}

/**
 * Forgets the proof, only if it is still the one that request sent: another tab may have signed in or changed the
 * password while the request was under way.
 */
export function dropProofIfSent(sent: string | null): void {
  if (sent === null || readProof() !== sent) return;
  unsaved = null;
  removeStored();
}
