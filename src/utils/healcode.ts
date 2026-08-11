/**
 * MindBody Healcode (widgets.mindbodyonline.com/javascripts/healcode.js).
 * Load on demand — not from index.html — so Home/LCP are not competing with it.
 * Navbar Login | Register still needs it site-wide; callers should idle-defer
 * when the widget is non-critical for first paint.
 */

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

/** Inject healcode.js once; re-init widgets after load (and when already present). */
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

/** Schedule ensureHealcodeLoaded after first paint / idle (Navbar login). */
export function loadHealcodeWhenIdle(timeoutMs = 3000): () => void {
  let idleId: number | undefined;
  let timerId: ReturnType<typeof setTimeout> | undefined;

  const run = () => {
    void ensureHealcodeLoaded().catch(() => {
      /* Login/buy widgets stay as inert custom elements until retry navigation */
    });
  };

  const ric = window.requestIdleCallback?.bind(window);
  if (ric) {
    idleId = ric(run, { timeout: timeoutMs });
    return () => {
      window.cancelIdleCallback?.(idleId!);
    };
  }

  timerId = setTimeout(run, 1);
  return () => {
    if (timerId !== undefined) clearTimeout(timerId);
  };
}
