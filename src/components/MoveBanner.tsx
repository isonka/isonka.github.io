import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OPENING_OFFER } from '../data/openingOffer';
import '../styles/MoveBanner.css';

export const MoveBanner = () => {
  const { t } = useTranslation('common');
  const to = OPENING_OFFER.announcementPath;

  return (
    <Link to={to} className="move-banner">
      <span className="move-banner-text">
        <strong>{t('moveBanner.strong')}</strong>
        <span className="move-banner-full">{t('moveBanner.full')}</span>
        <span className="move-banner-short">{t('moveBanner.short')}</span>
      </span>
      <span className="move-banner-cta">{t('moveBanner.cta')}</span>
    </Link>
  );
};
