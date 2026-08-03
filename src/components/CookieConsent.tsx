import { useEffect } from 'react';
import { loadTrackingIfConsented } from '../utils/consentTracking';

/** Cookiebot script lives in index.html (before React). This only syncs consent → tags. */
export const CookieConsent: React.FC = () => {
  useEffect(() => {
    const onConsentReady = () => {
      loadTrackingIfConsented();
    };

    window.addEventListener('CookiebotOnLoad', onConsentReady);
    window.addEventListener('CookiebotOnAccept', onConsentReady);
    window.addEventListener('CookiebotOnDecline', onConsentReady);

    if (window.Cookiebot?.consent) {
      onConsentReady();
    }

    return () => {
      window.removeEventListener('CookiebotOnLoad', onConsentReady);
      window.removeEventListener('CookiebotOnAccept', onConsentReady);
      window.removeEventListener('CookiebotOnDecline', onConsentReady);
    };
  }, []);

  return null;
};
