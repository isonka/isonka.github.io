import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackBookNowClick, trackNavClick } from '../utils/gtmTracking';
import { homePath, isHomePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import '../styles/Navbar.css';

export const Navbar = () => {
  const { t } = useTranslation('common');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const home = homePath(locale);
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';
  const pricingHref = locale === 'nl' ? '/pricing/nl/' : '/pricing/';
  const scheduleHref = locale === 'nl' ? '/schedule/nl/' : '/schedule/';
  const isPricing = location.pathname.includes('/pricing');

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleScroll = () => setIsMenuOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    trackNavClick(sectionId);

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
    <nav className="navbar navbar--c">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to={home} aria-label={t('nav.homeAria')}>
            <img
              src="/brand/logos/pt7-logo-on-dark.svg"
              alt="PT 7"
              width={98}
              height={80}
              className="navbar-logo-img"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>

        <Link
          to={scheduleHref}
          className="navbar-booknow-mobile"
          aria-label={t('nav.bookNowAria')}
          onClick={() => trackBookNowClick('navbar-mobile')}
        >
          {t('nav.bookNow')}
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="navbar-toggle-icon" aria-hidden="true" />
        </button>

        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a
              href="#lanes"
              aria-label={t('nav.trainAria')}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('lanes');
              }}
            >
              {t('nav.train')}
            </a>
          </li>
          <li>
            <a
              href="#coaches"
              aria-label={t('nav.coachesAria')}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('coaches');
              }}
            >
              {t('nav.coaches')}
            </a>
          </li>
          <li>
            <Link
              to={pricingHref}
              aria-label={t('nav.pricesAria')}
              aria-current={isPricing ? 'page' : undefined}
              className={isPricing ? 'is-active' : undefined}
              onClick={closeMenu}
            >
              {t('nav.prices')}
            </Link>
          </li>
          <li>
            <Link
              to={academyHref}
              aria-label={t('nav.academyAria')}
              className="navbar-link-academy"
              onClick={closeMenu}
            >
              {t('nav.academy')}
            </Link>
          </li>
          <li>
            <a
              href="#venue"
              aria-label={t('nav.venueAria')}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('venue');
              }}
            >
              {t('nav.venue')}
            </a>
          </li>
          <li className="navbar-booknow-desktop-wrapper">
            <Link
              to={scheduleHref}
              className="navbar-booknow-desktop"
              aria-label={t('nav.bookClassAria')}
              onClick={() => {
                closeMenu();
                trackBookNowClick('navbar-desktop');
              }}
            >
              {t('nav.bookNow')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
