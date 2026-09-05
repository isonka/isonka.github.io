import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  applyConsent,
  getStoredConsent,
  saveConsent,
  type Pt7Consent,
} from '../utils/consentTracking';
import { isPrerender } from '../utils/prerender';
import '../styles/CookieConsent.css';

type PanelMode = 'hidden' | 'banner' | 'settings';

export const CookieConsent= () => {
  const [mode, setMode] = useState<PanelMode>('hidden');
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (isPrerender()) return;

    const stored = getStoredConsent();
    if (stored) {
      setStatistics(stored.statistics);
      setMarketing(stored.marketing);
      applyConsent(stored);
      setMode('hidden');
    } else {
      setMode('banner');
    }

    const onOpenSettings = () => {
      const current = getStoredConsent();
      setStatistics(current?.statistics ?? false);
      setMarketing(current?.marketing ?? false);
      setMode('settings');
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
  }, []);

  const persist = (next: Pick<Pt7Consent, 'statistics' | 'marketing' | 'preferences'>) => {
    const consent = saveConsent(next);
    applyConsent(consent);
    setMode('hidden');
  };

  const acceptAll = () => {
    setStatistics(true);
    setMarketing(true);
    persist({ preferences: true, statistics: true, marketing: true });
  };

  const rejectNonEssential = () => {
    setStatistics(false);
    setMarketing(false);
    persist({ preferences: false, statistics: false, marketing: false });
  };

  const saveCustom = () => {
    persist({
      preferences: false,
      statistics,
      marketing,
    });
  };

  if (mode === 'hidden') return null;

  return (
    <div className="pt7-consent" role="dialog" aria-modal="true" aria-labelledby="pt7-consent-title">
      <div className="pt7-consent-panel">
        <h2 id="pt7-consent-title" className="pt7-consent-title">
          Cookie preferences
        </h2>
        <p className="pt7-consent-text">
          We use necessary cookies to run the site. With your OK we also use statistics (Google Analytics)
          and marketing cookies (Google Ads, Meta) to measure visits and improve ads. Details in our{' '}
          <Link to="/privacy/">privacy policy</Link>. Change this anytime via Cookie Settings in the footer.
        </p>

        {mode === 'settings' && (
          <div className="pt7-consent-options">
            <label className="pt7-consent-option">
              <input type="checkbox" checked disabled readOnly />
              <span>
                <strong>Necessary</strong>
                <small>Always on: security and basic site function</small>
              </span>
            </label>
            <label className="pt7-consent-option">
              <input
                type="checkbox"
                checked={statistics}
                onChange={(e) => setStatistics(e.target.checked)}
              />
              <span>
                <strong>Statistics</strong>
                <small>Google Analytics only. No ads or Meta tags.</small>
              </span>
            </label>
            <label className="pt7-consent-option">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span>
                <strong>Marketing</strong>
                <small>Google Ads and Meta: measure ads and remarketing</small>
              </span>
            </label>
          </div>
        )}

        <div className="pt7-consent-actions">
          {mode === 'banner' ? (
            <>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--primary" onClick={acceptAll}>
                Accept all
              </button>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--ghost" onClick={rejectNonEssential}>
                Reject non-essential
              </button>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--text" onClick={() => setMode('settings')}>
                Customize
              </button>
            </>
          ) : (
            <>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--primary" onClick={saveCustom}>
                Save choices
              </button>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--ghost" onClick={acceptAll}>
                Accept all
              </button>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--text" onClick={rejectNonEssential}>
                Reject non-essential
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
