import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';
import '../styles/AcademyUrgencyBanner.css';

export const AcademyUrgencyBanner= () => {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const to = locale === 'nl' ? '/academy/nl/' : '/academy/';

  return (
    <Link
      to={to}
      className="academy-urgency-banner"
      aria-label={t('banner.aria')}
    >
      <div className="urgency-content">
        <span className="urgency-text">
          <strong>{t('banner.strong')}</strong>
          <span className="urgency-text-full">{t('banner.full')}</span>
          <span className="urgency-text-short">{t('banner.short')}</span>
        </span>
        <span className="urgency-cta">{t('banner.cta')}</span>
      </div>
    </Link>
  );
};
