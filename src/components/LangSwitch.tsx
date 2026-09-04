import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';

export function LangSwitch() {
  const locale = useLocale();
  const { t } = useTranslation('common');

  return (
    <nav className="navbar-lang" aria-label={t('nav.language')}>
      {locale === 'en' ? (
        <span lang="en" aria-current="page">
          EN
        </span>
      ) : (
        <Link to="/" hrefLang="en" lang="en" aria-label={t('nav.switchToEn')}>
          EN
        </Link>
      )}
      <span aria-hidden="true">|</span>
      {locale === 'nl' ? (
        <span lang="nl" aria-current="page">
          NL
        </span>
      ) : (
        <Link to="/nl/" hrefLang="nl" lang="nl" aria-label={t('nav.switchToNl')}>
          NL
        </Link>
      )}
    </nav>
  );
}
