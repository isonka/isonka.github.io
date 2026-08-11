const GTM_ID = 'GTM-KB25PGXB';
const GA_ID = 'G-JYKY1GMV9Z';
const GOOGLE_TAG_ID = 'GT-TWM74JTS';
const GOOGLE_ADS_ID = 'AW-17684932205';
const META_PIXEL_ID = '1197758608916828';

export const CONSENT_STORAGE_KEY = 'pt7_cookie_consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'pt7-open-cookie-settings';

export type Pt7Consent = {
  necessary: true;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  updatedAt: string;
};

type TrackingState = {
  gtm: boolean;
  gtag: boolean;
  meta: boolean;
};

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    __pt7GaReady?: boolean;
  }
}

let lastGaPageKey = '';
let lastGaPageAt = 0;

function getTrackingState(): TrackingState {
  const win = window as Window & { __pt7TrackingLoaded?: TrackingState };
  win.__pt7TrackingLoaded ??= { gtm: false, gtag: false, meta: false };
  return win.__pt7TrackingLoaded;
}

function getGtag(): GtagFn | undefined {
  return (window as Window & { gtag?: GtagFn }).gtag;
}

export function getStoredConsent(): Pt7Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Pt7Consent>;
    if (typeof parsed.statistics !== 'boolean' || typeof parsed.marketing !== 'boolean') {
      return null;
    }
    return {
      necessary: true,
      preferences: Boolean(parsed.preferences),
      statistics: parsed.statistics,
      marketing: parsed.marketing,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveConsent(consent: Omit<Pt7Consent, 'necessary' | 'updatedAt'> & Partial<Pick<Pt7Consent, 'preferences'>>): Pt7Consent {
  const next: Pt7Consent = {
    necessary: true,
    preferences: Boolean(consent.preferences),
    statistics: Boolean(consent.statistics),
    marketing: Boolean(consent.marketing),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

/** Map PT7 consent → Google Consent Mode v2 update. */
export function updateGoogleConsent(consent: Pt7Consent) {
  const gtag = getGtag();
  if (!gtag) return;

  const analytics = consent.statistics ? 'granted' : 'denied';
  const ads = consent.marketing ? 'granted' : 'denied';
  const preferences = consent.preferences ? 'granted' : 'denied';

  gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    functionality_storage: preferences,
    personalization_storage: preferences,
  });
}

/** Send GA4 SPA page_view (deduped briefly to avoid consent/React race doubles). */
export function sendGaPageView(pagePath: string, pageTitle: string) {
  const gtag = getGtag();
  if (!window.__pt7GaReady || !gtag) return;

  const now = Date.now();
  if (lastGaPageKey === pagePath && now - lastGaPageAt < 2000) return;
  lastGaPageKey = pagePath;
  lastGaPageAt = now;

  gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: `${window.location.origin}${pagePath}`,
    send_to: GA_ID,
  });
}

function markGaReadyAndSendCurrentPage() {
  window.__pt7GaReady = true;
  sendGaPageView(
    `${window.location.pathname}${window.location.search}`,
    document.title,
  );
}

export function loadGTM() {
  const loaded = getTrackingState();
  if (loaded.gtm) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  loaded.gtm = true;
}

/**
 * Load Google tag (GT), Ads (AW), and GA4 after consent.
 * Consent Mode defaults stay in index.html; this is the first network fetch of gtag.js.
 */
export function loadGoogleTag() {
  const loaded = getTrackingState();
  if (loaded.gtag) return;

  const win = window as Window & { gtag?: GtagFn };
  window.dataLayer = window.dataLayer || [];
  if (!win.gtag) {
    win.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
  }

  const configure = () => {
    win.gtag!('js', new Date());
    win.gtag!('config', GOOGLE_TAG_ID);
    win.gtag!('config', GOOGLE_ADS_ID);
    win.gtag!('config', GA_ID, { send_page_view: false });
    markGaReadyAndSendCurrentPage();
  };

  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    configure();
    loaded.gtag = true;
    return;
  }

  const script = document.createElement('script');
  script.id = 'pt7-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
  script.onload = configure;
  document.head.appendChild(script);

  loaded.gtag = true;
}

export function loadMetaPixel() {
  const loaded = getTrackingState();
  if (loaded.meta || window.fbq) return;

  const script = document.createElement('script');
  script.text = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  loaded.meta = true;
}

/** Apply saved consent: Consent Mode update + load allowed tags. */
export function applyConsent(consent: Pt7Consent) {
  updateGoogleConsent(consent);

  if (consent.statistics || consent.marketing) {
    loadGTM();
    loadGoogleTag();
  }

  if (consent.marketing) {
    loadMetaPixel();
  }
}

export function loadTrackingIfConsented() {
  const consent = getStoredConsent();
  if (!consent) return;
  applyConsent(consent);
}
