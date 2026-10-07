import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OPENING_OFFER } from '../data/openingOffer';
import { useLocale } from '../i18n/useLocale';
import '../styles/OpeningOfferHomeBanner.css';

export const OpeningOfferHomeBanner = () => {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const to = locale === 'nl' ? OPENING_OFFER.pathNl : OPENING_OFFER.path;

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
          <Link to={to} className="oo-home-banner-cta">
            {t('openingBanner.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
};
