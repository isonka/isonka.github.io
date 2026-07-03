import { useEffect } from 'react';
import { loadTrackingIfConsented } from '../utils/consentTracking';

const COOKIEBOT_ID = 'b7046d56-8fa7-4aff-9789-7c95656f78f5';

export const CookieConsent: React.FC = () => {
  useEffect(() => {
    const onConsentReady = () => {
      loadTrackingIfConsented();
    };

    window.addEventListener('CookiebotOnLoad', onConsentReady);
    window.addEventListener('CookiebotOnAccept', onConsentReady);
    window.addEventListener('CookiebotOnDecline', onConsentReady);

    const existingScript = document.getElementById('Cookiebot');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'Cookiebot';
      script.src = 'https://consent.cookiebot.com/uc.js';
      script.setAttribute('data-cbid', COOKIEBOT_ID);
      script.setAttribute('data-blockingmode', 'auto');
      script.type = 'text/javascript';
      document.head.appendChild(script);
    } else if (window.Cookiebot?.consent) {
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
