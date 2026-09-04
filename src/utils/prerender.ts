declare global {
  interface Window {
    __PT7_PRERENDER__?: boolean;
  }
}

export function isPrerender(): boolean {
  return typeof window !== 'undefined' && window.__PT7_PRERENDER__ === true;
}
