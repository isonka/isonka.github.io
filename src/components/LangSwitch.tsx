import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';
import { localizedPath } from '../i18n/locale';

export function LangSwitch() {
  const locale = useLocale();
  const { pathname } = useLocation();
  const { t } = useTranslation('common');

  return (
    <nav className="navbar-lang" aria-label={t('nav.language')}>
      {locale === 'en' ? (
        <span lang="en" aria-current="page">
          EN
        </span>
      ) : (
        <Link to={localizedPath(pathname, 'en')} hrefLang="en" lang="en" aria-label={t('nav.switchToEn')}>
          EN
        </Link>
      )}
      <span aria-hidden="true">|</span>
      {locale === 'nl' ? (
        <span lang="nl" aria-current="page">
          NL
        </span>
      ) : (
        <Link to={localizedPath(pathname, 'nl')} hrefLang="nl" lang="nl" aria-label={t('nav.switchToNl')}>
          NL
        </Link>
      )}
    </nav>
  );
}
