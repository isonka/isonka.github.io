import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OPENING_OFFER } from '../data/openingOffer';
import { useLocale } from '../i18n/useLocale';
import { isPrerender } from '../utils/prerender';
import '../styles/OpeningOfferHomeBanner.css';

const STORAGE_KEY = 'pt7-opening-offer-home-banner-dismissed';

export const OpeningOfferHomeBanner = () => {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const to = locale === 'nl' ? OPENING_OFFER.pathNl : OPENING_OFFER.path;

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (isPrerender()) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* private mode / blocked storage — still show once this session */
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="oo-home-banner" role="region" aria-label={t('openingBanner.kicker')}>
      <div className="oo-home-banner-inner">
        <div className="oo-home-banner-copy">
          <p className="oo-home-banner-kicker">{t('openingBanner.kicker')}</p>
          <p className="oo-home-banner-title">{t('openingBanner.title')}</p>
          <p className="oo-home-banner-lead">{t('openingBanner.lead')}</p>
          <p className="oo-home-banner-limited">{t('openingBanner.limited')}</p>
        </div>
        <div className="oo-home-banner-actions">
          <Link to={to} className="oo-home-banner-cta" onClick={dismiss}>
            {t('openingBanner.cta')}
          </Link>
          <button type="button" className="oo-home-banner-skip" onClick={dismiss}>
            {t('openingBanner.skip')}
          </button>
        </div>
      </div>
      <button
        type="button"
        className="oo-home-banner-dismiss"
        onClick={dismiss}
        aria-label={t('openingBanner.dismiss')}
      >
        ×
      </button>
    </div>
  );
};
