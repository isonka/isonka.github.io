const GTM_ID = 'GTM-KB25PGXB';
const GA_ID = 'G-J7K4DF0N40';
const GOOGLE_ADS_ID = 'AW-17684932205';
const META_PIXEL_ID = '1197758608916828';

type TrackingState = {
  gtm: boolean;
  gtag: boolean;
  meta: boolean;
};

type GtagFn = (...args: unknown[]) => void;

function getTrackingState(): TrackingState {
  const win = window as Window & { __pt7TrackingLoaded?: TrackingState };
  win.__pt7TrackingLoaded ??= { gtm: false, gtag: false, meta: false };
  return win.__pt7TrackingLoaded;
}

function getGtag(): GtagFn | undefined {
  return (window as Window & { gtag?: GtagFn }).gtag;
}

function getCookiebotConsent() {
  const cookiebot = (window as Window & { Cookiebot?: { consent?: {
    necessary: boolean;
    preferences: boolean;
    statistics: boolean;
    marketing: boolean;
  } } }).Cookiebot;
  return cookiebot?.consent;
}

/** Map Cookiebot categories → Google Consent Mode v2 update. */
export function updateGoogleConsentFromCookiebot() {
  const consent = getCookiebotConsent();
  const gtag = getGtag();
  if (!consent || !gtag) return;

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
 * AW gtag loads from index.html for Ads detection.
 * Here we only attach GA4 after statistics/marketing consent.
 */
export function loadGoogleTag() {
  const loaded = getTrackingState();
  if (loaded.gtag) return;

  const win = window as Window & { gtag?: GtagFn };
  const ensureGtag = () => {
    if (!win.gtag) {
      window.dataLayer = window.dataLayer || [];
      win.gtag = (...args: unknown[]) => {
        window.dataLayer!.push(args);
      };
      win.gtag('js', new Date());
      win.gtag('config', GOOGLE_ADS_ID);
    }
    win.gtag('config', GA_ID, { send_page_view: false });
  };

  if (document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`)) {
    ensureGtag();
    loaded.gtag = true;
    return;
  }

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  gaScript.onload = ensureGtag;
  document.head.appendChild(gaScript);

  // If AW script somehow missing (old HTML cache), load it once.
  if (!document.querySelector(`script[src*="gtag/js?id=${GOOGLE_ADS_ID}"]`)) {
    const adsScript = document.createElement('script');
    adsScript.async = true;
    adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(adsScript);
  }

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

export function loadTrackingIfConsented() {
  const consent = getCookiebotConsent();
  if (!consent) return;

  updateGoogleConsentFromCookiebot();

  if (consent.statistics || consent.marketing) {
    loadGTM();
    loadGoogleTag();
  }

  if (consent.marketing) {
    loadMetaPixel();
  }
}
