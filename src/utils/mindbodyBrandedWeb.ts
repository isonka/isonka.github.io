const MINDBODY_BW_SCRIPT_ID = 'mindbody-branded-web-widget';
const MINDBODY_BW_INIT_FLAG = 'bw-widget-unique-identifier';
const MINDBODY_BW_SCRIPT_SRC = 'https://brandedweb.mindbodyonline.com/embed/widget.js';

export function clearMindBodyWidgetContainers(): void {
  document.querySelectorAll('.mindbody-widget').forEach((el) => {
    el.innerHTML = '';
  });
}

export function waitForWidgetDom(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

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
