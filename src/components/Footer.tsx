import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { openCookieSettings } from '../utils/consentTracking';
import { homePath, isHomePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import { LangSwitch } from './LangSwitch';
import { Pt7Logo } from './brand/Pt7Logo';
import '../styles/Footer.css';

export const Footer = () => {
  const { t } = useTranslation('common');
  const locale = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const home = homePath(locale);
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';

  const handleCookieSettings = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openCookieSettings();
  };

  const scrollHome = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isHomePath(location.pathname)) {
      navigate(home);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <Link to={home} aria-label={t('nav.homeAria')} className="footer-logo-link">
            <Pt7Logo width={98} height={80} title="PT7" />
          </Link>
          <p className="footer-tag">{t('footer.tag')}</p>
        </div>

        <nav className="footer-nav" aria-label={t('footer.navAria')}>
          <ul className="footer-links">
            <li>
              <a href="#train" onClick={scrollHome('train')}>
                {t('nav.classes')}
              </a>
            </li>
            <li>
              <a href="#coaches" onClick={scrollHome('coaches')}>
                {t('nav.coaches')}
              </a>
            </li>
            <li>
              <Link to={academyHref}>{t('footer.academy')}</Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/pt7amsterdam"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="mailto:info@pt7.nl">info@pt7.nl</a>
            </li>
            <li>
              <Link to="/privacy/">{t('footer.privacy')}</Link>
            </li>
            <li>
              <a href="#" onClick={handleCookieSettings}>
                {t('footer.cookies')}
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer-meta">
          <LangSwitch />
          <p className="footer-copyright">
            {t('footer.copyright', { year: String(new Date().getFullYear()) })}
          </p>
          <p className="footer-credit">
            {t('footer.websiteBy')}{' '}
            <a href="https://karams.nl" target="_blank" rel="noopener noreferrer">
              Kara
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
