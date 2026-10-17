import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  applyConsent,
  getStoredConsent,
  saveConsent,
  type Pt7Consent,
} from '../utils/consentTracking';
import { isPrerender } from '../utils/prerender';
import { localeHref } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import '../styles/CookieConsent.css';

type PanelMode = 'hidden' | 'banner' | 'settings';

export const CookieConsent= () => {
  const { t } = useTranslation('common');
  const locale = useLocale();
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
          {t('cookies.title')}
        </h2>
        <p className="pt7-consent-text">
          <Trans
            t={t}
            i18nKey="cookies.text"
            components={{ privacy: <Link to={localeHref('/privacy/', locale)} /> }}
          />
        </p>

        {mode === 'settings' && (
          <div className="pt7-consent-options">
            <label className="pt7-consent-option">
              <input type="checkbox" checked disabled readOnly />
              <span>
                <strong>{t('cookies.necessary')}</strong>
                <small>{t('cookies.necessaryHint')}</small>
              </span>
            </label>
            <label className="pt7-consent-option">
              <input
                type="checkbox"
                checked={statistics}
                onChange={(e) => setStatistics(e.target.checked)}
              />
              <span>
                <strong>{t('cookies.statistics')}</strong>
                <small>{t('cookies.statisticsHint')}</small>
              </span>
            </label>
            <label className="pt7-consent-option">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span>
                <strong>{t('cookies.marketing')}</strong>
                <small>{t('cookies.marketingHint')}</small>
              </span>
            </label>
          </div>
        )}

        <div className="pt7-consent-actions">
          {mode === 'banner' ? (
            <>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--primary" onClick={acceptAll}>
                {t('cookies.acceptAll')}
              </button>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--ghost" onClick={rejectNonEssential}>
                {t('cookies.rejectNonEssential')}
              </button>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--text" onClick={() => setMode('settings')}>
                {t('cookies.customize')}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--primary" onClick={saveCustom}>
                {t('cookies.save')}
              </button>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--ghost" onClick={acceptAll}>
                {t('cookies.acceptAll')}
              </button>
              <button type="button" className="pt7-consent-btn pt7-consent-btn--text" onClick={rejectNonEssential}>
                {t('cookies.rejectNonEssential')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
