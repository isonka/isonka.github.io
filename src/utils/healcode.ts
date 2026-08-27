const HEALCODE_SCRIPT_ID = 'mindbody-healcode';
const HEALCODE_SRC = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';

declare global {
  interface Window {
    HealcodeWidget?: {
      init: () => void;
    };
  }
}

let loadPromise: Promise<void> | null = null;

export function reinitHealcodeWidgets(): void {
  window.HealcodeWidget?.init?.();
}

export function ensureHealcodeLoaded(): Promise<void> {
  const existing =
    document.getElementById(HEALCODE_SCRIPT_ID) ||
    document.querySelector<HTMLScriptElement>('script[src*="healcode.js"]');

  if (existing) {
    reinitHealcodeWidgets();
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = HEALCODE_SCRIPT_ID;
    script.src = HEALCODE_SRC;
    script.async = true;
    script.onload = () => {
      reinitHealcodeWidgets();
      resolve();
    };
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Failed to load MindBody Healcode script'));
    };
    document.body.appendChild(script);
  });

  return loadPromise;
}

export function loadHealcodeWhenIdle(timeoutMs = 3000): () => void {
  const run = () => {
    void ensureHealcodeLoaded().catch(() => {});
  };

  const ric = window.requestIdleCallback?.bind(window);
  if (ric) {
    const idleId = ric(run, { timeout: timeoutMs });
    return () => {
      window.cancelIdleCallback?.(idleId);
    };
  }

  const timeoutId = setTimeout(run, 1);
  return () => {
    clearTimeout(timeoutId);
  };
}
