import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OPENING_OFFER } from '../data/openingOffer';
import '../styles/OpeningOfferHomeBanner.css';

export const OpeningOfferHomeBanner = () => {
  const { t } = useTranslation('home');

  return (
    <div className="oo-home-banner" role="region" aria-label={t('openingBanner.label')}>
      <p className="oo-home-banner-line">
        <strong>{t('openingBanner.label')}:</strong> {t('openingBanner.text')}{' '}
        <Link to={OPENING_OFFER.announcementPath} className="oo-home-banner-link">
          {t('openingBanner.cta')}
        </Link>
      </p>
    </div>
  );
};
