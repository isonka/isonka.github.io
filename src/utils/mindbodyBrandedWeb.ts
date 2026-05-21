/**
 * MindBody Branded Web embed (brandedweb.mindbodyonline.com/embed/widget.js).
 *
 * The vendor script only auto-inits once per full page load (global flag
 * `bw-widget-unique-identifier`). React Router visits need a controlled reload
 * so `.mindbody-widget` placeholders are scanned again.
 */

const MINDBODY_BW_SCRIPT_ID = 'mindbody-branded-web-widget';
const MINDBODY_BW_INIT_FLAG = 'bw-widget-unique-identifier';
const MINDBODY_BW_SCRIPT_SRC = 'https://brandedweb.mindbodyonline.com/embed/widget.js';

/** Remove iframes/loaders so a fresh embed can attach. */
export function clearMindBodyWidgetContainers(): void {
  document.querySelectorAll('.mindbody-widget').forEach((el) => {
    el.innerHTML = '';
  });
}

/** Wait until React has committed widget placeholder nodes. */
export function waitForWidgetDom(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

/**
 * Reload MindBody Branded Web script and mount widgets into current
 * `.mindbody-widget` elements. Call after placeholders are in the DOM.
 */
export function loadMindBodyBrandedWebWidgets(): Promise<void> {
  return new Promise((resolve, reject) => {
    clearMindBodyWidgetContainers();

    delete (window as unknown as Record<string, unknown>)[MINDBODY_BW_INIT_FLAG];

    document.getElementById(MINDBODY_BW_SCRIPT_ID)?.remove();

    const script = document.createElement('script');
    script.id = MINDBODY_BW_SCRIPT_ID;
    script.src = MINDBODY_BW_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error('Failed to load MindBody Branded Web widget script'));
    document.body.appendChild(script);
  });
}

export async function initScheduleMindBodyWidgets(): Promise<void> {
  await waitForWidgetDom();
  await loadMindBodyBrandedWebWidgets();
}
