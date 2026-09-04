/**
 * Build-time prerender detection.
 *
 * scripts/prerender-static-html.js sets window.__PT7_PRERENDER__ before any page
 * script runs, so components can tell they are being captured into static HTML.
 *
 * The contract: a snapshot must show the page's FIRST PAINT, not its settled state.
 * Effect-driven changes (cookie banner, third-party widgets, idle-loaded images,
 * scroll reveals) stay inert, because:
 *   1. the snapshot is what crawlers read, and a page that has waited for a blocked
 *      third-party script shows an error state that is untrue for real visitors, and
 *   2. hydration requires the saved HTML to match the client's first render exactly.
 */

declare global {
  interface Window {
    __PT7_PRERENDER__?: boolean;
  }
}

export function isPrerender(): boolean {
  return typeof window !== 'undefined' && window.__PT7_PRERENDER__ === true;
}
