import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { openCookieSettings } from '../utils/consentTracking';
import { homePath, isHomePath, localeHref } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import { LangSwitch } from './LangSwitch';
import '../styles/Footer.css';

export const Footer = () => {
  const { t } = useTranslation('common');
  const locale = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const home = homePath(locale);
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';
  const pricingHref = locale === 'nl' ? '/pricing/nl/' : '/pricing/';
  const scheduleHref = locale === 'nl' ? '/schedule/nl/' : '/schedule/';

  const handleCookieSettings = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openCookieSettings();
  };

  const goHomeSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (!isHomePath(location.pathname)) {
      navigate(home);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer footer--c">
      <div className="footer-checker" aria-hidden="true" />
      <div className="footer-inner">
        <p className="footer-headline">
          <span className="footer-headline-line">{t('footer.headline')}</span>
          <br />
          <span className="footer-headline-line">
            {t('footer.headlineMid')} <em>{t('footer.headlineAccent')}</em>
          </span>
        </p>

        <div className="footer-aside">
          <img
            src="/brand/logos/pt7-logo-on-dark.svg"
            alt="PT 7"
            width={88}
            height={72}
            className="footer-logo"
            loading="lazy"
            decoding="async"
          />
          <nav className="footer-nav" aria-label={t('footer.navAria')}>
            <a href="#lanes" onClick={(e) => goHomeSection(e, 'lanes')}>
              {t('footer.train')}
            </a>
            <a href="#coaches" onClick={(e) => goHomeSection(e, 'coaches')}>
              {t('footer.coaches')}
            </a>
            <Link to={academyHref}>{t('footer.academy')}</Link>
            <Link to={pricingHref}>{t('footer.pricing')}</Link>
            <Link to={scheduleHref}>{t('footer.book')}</Link>
            <a
              href="https://www.instagram.com/pt7amsterdam"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.instagram')}
            </a>
            <a href="mailto:info@pt7.nl">info@pt7.nl</a>
            <Link to="/privacy/">{t('footer.privacy')}</Link>
            <a href="#" onClick={handleCookieSettings}>
              {t('footer.cookies')}
            </a>
            <Link to={localeHref('/reformer-pilates-amsterdam/', locale)}>
              {t('footer.reformerPilates')}
            </Link>
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
      </div>
    </footer>
  );
};
