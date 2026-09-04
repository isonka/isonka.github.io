import { isPrerender } from './prerender';

const GTM_ID = 'GTM-KB25PGXB';
const GA_ID = 'G-JYKY1GMV9Z';
const GOOGLE_TAG_ID = 'GT-TWM74JTS';
const GOOGLE_ADS_ID = 'AW-17684932205';
const META_PIXEL_ID = '1671589834538679';

export const CONSENT_STORAGE_KEY = 'pt7_cookie_consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'pt7-open-cookie-settings';
export const CONSENT_UPDATED_EVENT = 'pt7-consent-updated';

export type Pt7Consent = {
  necessary: true;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  updatedAt: string;
};

type TrackingState = {
  gtm: boolean;
  gtagScript: boolean;
  ga: boolean;
  ads: boolean;
  meta: boolean;
};

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    __pt7GaReady?: boolean;
    gtag?: GtagFn;
  }
}

let lastGaPageKey = '';
let lastGaPageAt = 0;

function getTrackingState(): TrackingState {
  const win = window as Window & { __pt7TrackingLoaded?: Partial<TrackingState> };
  const current = win.__pt7TrackingLoaded;
  if (
    current?.gtagScript === undefined ||
    current.ga === undefined ||
    current.ads === undefined
  ) {
    win.__pt7TrackingLoaded = {
      gtm: Boolean(current?.gtm),
      gtagScript: false,
      ga: false,
      ads: false,
      meta: Boolean(current?.meta),
    };
  }
  return win.__pt7TrackingLoaded as TrackingState;
}

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
  }
}

function getGtag(): GtagFn | undefined {
  return window.gtag;
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

let gtagScriptPromise: Promise<void> | null = null;

function ensureGtagScript(id: string): Promise<void> {
  ensureGtagStub();
  const loaded = getTrackingState();

  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    loaded.gtagScript = true;
    return Promise.resolve();
  }

  if (gtagScriptPromise) return gtagScriptPromise;

  gtagScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = 'pt7-gtag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.onload = () => {
      loaded.gtagScript = true;
      getGtag()?.('js', new Date());
      resolve();
    };
    script.onerror = () => {
      gtagScriptPromise = null;
      reject(new Error('Failed to load gtag.js'));
    };
    document.head.appendChild(script);
  });

  return gtagScriptPromise;
}

function configureGa() {
  const loaded = getTrackingState();
  if (loaded.ga) return;
  const gtag = getGtag();
  if (!gtag) return;
  gtag('config', GA_ID, { send_page_view: false });
  loaded.ga = true;
  markGaReadyAndSendCurrentPage();
}

function configureAds() {
  const loaded = getTrackingState();
  if (loaded.ads) return;
  const gtag = getGtag();
  if (!gtag) return;
  gtag('config', GOOGLE_TAG_ID);
  gtag('config', GOOGLE_ADS_ID);
  loaded.ads = true;
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

export function applyConsent(consent: Pt7Consent) {
  ensureGtagStub();
  updateGoogleConsent(consent);

  if (consent.statistics || consent.marketing) {
    const scriptId = consent.marketing ? GOOGLE_TAG_ID : GA_ID;
    void ensureGtagScript(scriptId)
      .then(() => {
        const latest = getStoredConsent();
        if (!latest) return;
        if (latest.statistics) configureGa();
        if (latest.marketing) configureAds();
      })
      .catch(() => {});
  }

  if (consent.marketing) {
    loadGTM();
    loadMetaPixel();
  }

  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: consent }));
}

export function loadTrackingIfConsented() {
  const consent = getStoredConsent();
  if (!consent) return;
  applyConsent(consent);
}

export function hasMarketingConsent(): boolean {
  return getStoredConsent()?.marketing === true;
}

const ADS_CONVERSION_TTL_MS = 30 * 60 * 1000;
const ADS_CONVERSION_KEY = 'pt7_ads_conversions';
const ADS_CONVERSION_SESSION_PREFIX = 'pt7_ads_conversion_';

type ConversionRecord = { key: string; id: string; at: number };

export type AdsConversionEvent = {
  name: string;
  sendTo?: string;
};

export type AdsConversionConfig = {
  key: string;
  events: AdsConversionEvent[];
};

function newConversionId(): string {
  const uuid = window.crypto?.randomUUID?.();
  if (uuid) return uuid;
  return `pt7-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readConversionRecords(): ConversionRecord[] {
  try {
    const raw = localStorage.getItem(ADS_CONVERSION_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (record): record is ConversionRecord =>
        typeof record === 'object' &&
        record !== null &&
        typeof (record as ConversionRecord).key === 'string' &&
        typeof (record as ConversionRecord).id === 'string' &&
        typeof (record as ConversionRecord).at === 'number',
    );
  } catch {
    return [];
  }
}

function writeConversionRecords(records: ConversionRecord[]) {
  try {
    localStorage.setItem(ADS_CONVERSION_KEY, JSON.stringify(records));
  } catch {
  }
}

function claimConversionId(key: string): string | null {
  const sessionKey = `${ADS_CONVERSION_SESSION_PREFIX}${key}`;

  try {
    if (sessionStorage.getItem(sessionKey)) return null;
  } catch {
  }

  const now = Date.now();
  const records = readConversionRecords().filter((record) => now - record.at < ADS_CONVERSION_TTL_MS);
  if (records.some((record) => record.key === key)) return null;

  const id = newConversionId();
  writeConversionRecords([...records, { key, id, at: now }]);
  try {
    sessionStorage.setItem(sessionKey, id);
  } catch {
  }

  return id;
}

function releaseConversionId(key: string) {
  try {
    sessionStorage.removeItem(`${ADS_CONVERSION_SESSION_PREFIX}${key}`);
  } catch {
  }
  writeConversionRecords(readConversionRecords().filter((record) => record.key !== key));
}

export function trackAdsConversion(config: AdsConversionConfig): () => void {
  if (isPrerender()) return () => {};

  let settled = false;

  const attempt = () => {
    if (settled || !hasMarketingConsent()) return;

    const transactionId = claimConversionId(config.key);
    if (!transactionId) {
      settled = true;
      return;
    }

    settled = true;

    void ensureGtagScript(GOOGLE_TAG_ID)
      .then(() => {
        configureAds();
        const gtag = getGtag();
        if (!gtag) {
          releaseConversionId(config.key);
          settled = false;
          return;
        }

        for (const event of config.events) {
          gtag('event', event.name, {
            ...(event.sendTo ? { send_to: event.sendTo } : {}),
            transaction_id: transactionId,
          });
        }
      })
      .catch(() => {
        releaseConversionId(config.key);
        settled = false;
      });
  };

  attempt();
  if (settled) return () => {};

  const onConsentUpdated = () => {
    attempt();
    if (settled) window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
  };

  window.addEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
  return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
}
