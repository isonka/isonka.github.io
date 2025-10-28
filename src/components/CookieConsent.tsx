import { useEffect } from 'react';

declare global {
  interface Window {
    Cookiebot?: any;
  }
}

export const CookieConsent: React.FC = () => {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.getElementById('Cookiebot');
    if (existingScript) {
      return;
    }
    
    // Load Cookiebot script dynamically
    const script = document.createElement('script');
    script.id = 'Cookiebot';
    script.src = 'https://consent.cookiebot.com/uc.js';
    script.setAttribute('data-cbid', 'b7046d56-8fa7-4aff-9789-7c95656f78f5');
    script.setAttribute('data-blockingmode', 'auto');
    script.type = 'text/javascript';

    // Add script to document head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById('Cookiebot');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

