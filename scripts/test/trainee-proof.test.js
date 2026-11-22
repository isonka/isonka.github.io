import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';

// The rules the API's website session depends on (pt7-academy docs/DECISIONS_LOG.md): one proof for all tabs, replaced
// by a password change, dropped only if it is still the one the request sent.

const A = 'a'.repeat(43);
const B = 'b'.repeat(43);
const KEY = 'trainee-session-proof';

let store;
let refuseWrites;
let refuseAll;

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    getItem(key) {
      if (refuseAll) throw new Error('refused');
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      if (refuseAll || refuseWrites) throw new Error('refused');
      store.set(key, value);
    },
    removeItem(key) {
      if (refuseAll) throw new Error('refused');
      store.delete(key);
    },
  },
});

const { dropProofIfSent, keepProof, readProof } = await import('../../src/trainee/proof.ts');

beforeEach(() => {
  refuseWrites = false;
  refuseAll = false;
  store = new Map();
  dropProofIfSent(readProof()); // clears a value held in memory by the previous test
  store = new Map();
});

test('a proof is kept where every tab reads it, and a new one replaces it', () => {
  keepProof(A);
  assert.equal(store.get(KEY), A);
  assert.equal(readProof(), A);
  keepProof(B);
  assert.equal(readProof(), B);
});

test('a value in the wrong format is never kept or sent', () => {
  keepProof(A);
  for (const bad of [undefined, null, 42, '', 'short', `${'a'.repeat(42)}\n`, 'a'.repeat(44)]) keepProof(bad);
  assert.equal(readProof(), A);
  store.set(KEY, 'not a proof\r\nX-Other: 1');
  assert.equal(readProof(), null);
});

test('a sign-out answer drops the proof that request sent', () => {
  keepProof(A);
  dropProofIfSent(A);
  assert.equal(readProof(), null);
  assert.equal(store.has(KEY), false);
});

test('a slow answer never drops a proof another tab stored meanwhile', () => {
  keepProof(A);
  store.set(KEY, B); // the other tab signed in again
  dropProofIfSent(A);
  assert.equal(readProof(), B);
});

test('a request sent without a proof drops nothing', () => {
  keepProof(A);
  dropProofIfSent(null);
  assert.equal(readProof(), A);
});

test('when storage refuses, the login still works until the page reloads and no older proof survives', () => {
  keepProof(A);
  refuseWrites = true;
  keepProof(B);
  assert.equal(readProof(), B);
  assert.equal(store.has(KEY), false);
  dropProofIfSent(B);
  assert.equal(readProof(), null);
});

test('with storage fully blocked nothing throws', () => {
  refuseAll = true;
  assert.equal(readProof(), null);
  keepProof(A);
  assert.equal(readProof(), A);
  dropProofIfSent(A);
  assert.equal(readProof(), null);
});
