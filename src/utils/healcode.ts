import { isPrerender } from './prerender';

const HEALCODE_SCRIPT_ID = 'mindbody-healcode';
const HEALCODE_SRC = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';

declare global {
  interface Window {
    hcInitialized?: boolean;
  }
}

type HealcodeWidgetElement = HTMLElement & {
  getAndInjectWidgetContent?: () => void;
};

let loadPromise: Promise<void> | null = null;
let watchStarted = false;

type CachedLink = {
  className: string;
  attrs: [string, string][];
};

const linkCache = new Map<string, CachedLink>();

function widgetKey(widget: Element): string {
  return [
    widget.getAttribute('data-type') ?? '',
    widget.getAttribute('data-service-id') ?? widget.getAttribute('data-contract-id') ?? '',
  ].join(':');
}

function rememberResolvedLinks(): void {
  document.querySelectorAll('healcode-widget').forEach((widget) => {
    const anchor = widget.querySelector('a[data-url]');
    if (!anchor) return;
    const key = widgetKey(widget);
    if (linkCache.has(key)) return;
    linkCache.set(key, {
      className: anchor.className,
      attrs: [...anchor.attributes].map((attr) => [attr.name, attr.value]),
    });
  });
}

function paintCachedLink(widget: Element): boolean {
  const cached = linkCache.get(widgetKey(widget));
  if (!cached || widget.querySelector('a, iframe')) return false;
  const anchor = document.createElement('a');
  for (const [name, value] of cached.attrs) anchor.setAttribute(name, value);
  const label = widget.getAttribute('data-inner-html');
  if (label) anchor.textContent = label;
  widget.appendChild(anchor);
  return true;
}

function watchResolvedLinks(): void {
  if (watchStarted || isPrerender()) return;
  watchStarted = true;
  rememberResolvedLinks();
  const observer = new MutationObserver(() => {
    rememberResolvedLinks();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function reinitHealcodeWidgets(): void {
  rememberResolvedLinks();
  // After the first boot, Healcode's createdCallback no longer builds widgets
  // inserted by client-side navigation. Reuse a link we already resolved, or
  // ask Healcode to build one.
  document.querySelectorAll('healcode-widget').forEach((widget) => {
    if (paintCachedLink(widget)) return;
    if (!window.hcInitialized) return;
    const node = widget as HealcodeWidgetElement;
    if (node.querySelector('a, iframe')) return;
    node.getAndInjectWidgetContent?.();
  });
}

export function ensureHealcodeLoaded(): Promise<void> {
  if (isPrerender()) return Promise.resolve();

  const existing =
    document.getElementById(HEALCODE_SCRIPT_ID) ||
    document.querySelector<HTMLScriptElement>('script[src*="healcode.js"]');

  if (existing) {
    watchResolvedLinks();
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
      watchResolvedLinks();
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

