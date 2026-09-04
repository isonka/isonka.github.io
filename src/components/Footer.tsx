import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { openCookieSettings } from '../utils/consentTracking';
import { homePath, isHomePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import '../styles/Footer.css';

export const Footer: React.FC = () => {
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

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!isHomePath(location.pathname)) {
      navigate(home);
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">PT Studio 7</p>
        <p className="footer-tag">{t('footer.tag')}</p>

        <nav className="footer-nav" aria-label={t('footer.navAria')}>
          <ul className="footer-links">
            <li><Link to="/schedule/">{t('footer.book')}</Link></li>
            <li><Link to="/pricing/">{t('footer.pricing')}</Link></li>
            <li><Link to="/reformer-pilates-amsterdam/">{t('footer.reformerPilates')}</Link></li>
            <li><Link to="/prenatal-pilates-amsterdam/">{t('footer.prenatal')}</Link></li>
            <li><Link to={academyHref}>{t('footer.academy')}</Link></li>
            <li><Link to="/corporate/">{t('footer.forBusiness')}</Link></li>
            <li><Link to="/healthcare-providers/">{t('footer.forHealthcare')}</Link></li>
            <li><Link to="/blog/">{t('footer.blog')}</Link></li>
            <li><a href="#contact" onClick={handleContactClick}>{t('footer.contact')}</a></li>
            <li><Link to="/privacy/">{t('footer.privacy')}</Link></li>
            <li><a href="#" onClick={handleCookieSettings}>{t('footer.cookies')}</a></li>
          </ul>
        </nav>

        <div className="footer-meta">
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
