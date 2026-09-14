const MINDBODY_BW_SCRIPT_ID = 'mindbody-branded-web-widget';
const MINDBODY_BW_INIT_FLAG = 'bw-widget-unique-identifier';
const MINDBODY_BW_SCRIPT_SRC = 'https://brandedweb.mindbodyonline.com/embed/widget.js';

let loadGeneration = 0;

function resetMindBodyGlobalState(): void {
  delete (window as unknown as Record<string, unknown>)[MINDBODY_BW_INIT_FLAG];
  document.getElementById(MINDBODY_BW_SCRIPT_ID)?.remove();
}

export function clearMindBodyWidgetContainers(): void {
  document.querySelectorAll('.mindbody-widget').forEach((el) => {
    el.innerHTML = '';
  });
}

export function teardownMindBodyWidgets(): void {
  loadGeneration += 1;
  clearMindBodyWidgetContainers();
  resetMindBodyGlobalState();
}

export function waitForWidgetDom(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function loadMindBodyBrandedWebWidgets(): Promise<void> {
  const generation = ++loadGeneration;

  return new Promise((resolve, reject) => {
    if (generation !== loadGeneration) {
      resolve();
      return;
    }

    clearMindBodyWidgetContainers();
    resetMindBodyGlobalState();

    const script = document.createElement('script');
    script.id = MINDBODY_BW_SCRIPT_ID;
    script.src = `${MINDBODY_BW_SCRIPT_SRC}?pt7=${generation}`;
    script.async = true;
    script.onload = () => {
      if (generation !== loadGeneration) {
        resolve();
        return;
      }
      resolve();
    };
    script.onerror = () => {
      if (generation !== loadGeneration) {
        resolve();
        return;
      }
      reject(new Error('Failed to load MindBody Branded Web widget script'));
    };
    document.body.appendChild(script);
  });
}

export async function initScheduleMindBodyWidgets(): Promise<void> {
  const generation = loadGeneration;
  await waitForWidgetDom();
  if (generation !== loadGeneration) return;
  await loadMindBodyBrandedWebWidgets();
}
