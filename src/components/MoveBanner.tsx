import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/MoveBanner.css';

export const MoveBanner = () => {
  const { t } = useTranslation('common');

  return (
    <Link to="/blog/pt-7-moves-to-olympisch-stadion/" className="move-banner">
      <span className="move-banner-text">
        <strong>{t('moveBanner.strong')}</strong>
        <span className="move-banner-full">{t('moveBanner.full')}</span>
        <span className="move-banner-short">{t('moveBanner.short')}</span>
      </span>
      <span className="move-banner-cta">{t('moveBanner.cta')}</span>
    </Link>
  );
};
