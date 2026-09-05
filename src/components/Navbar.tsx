import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackBookNowClick, trackNavClick } from '../utils/gtmTracking';
import { loadHealcodeWhenIdle } from '../utils/healcode';
import { homePath, isHomePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import { LangSwitch } from './LangSwitch';
import '../styles/Navbar.css';

export const Navbar= () => {
  const { t } = useTranslation('common');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const home = homePath(locale);
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';

  const toggleMenu = () => {
    if (isMenuOpen) setMoreOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => loadHealcodeWhenIdle(), []);

  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.navbar-dropdown')) setMoreOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [moreOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleScroll = () => {
      setIsMenuOpen(false);
      setMoreOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    trackNavClick(sectionId);

    if (!isHomePath(location.pathname)) {
      navigate(home);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to={home} aria-label={t('nav.homeAria')}>
            <img
              src="/assets/images/ts_logo.webp"
              alt="PT Studio 7 Logo"
              width={160}
              height={48}
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>

        <Link
          to="/schedule/"
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
          <span className="navbar-toggle-icon"></span>
        </button>

        <div className="navbar-lang-bar">
          <LangSwitch />
        </div>

        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#about" aria-label={t('nav.aboutAria')} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('nav.about')}</a></li>
          <li><a href="#reviews" aria-label={t('nav.reviewsAria')} onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>{t('nav.reviews')}</a></li>
          <li><Link to="/instructors/" aria-label={t('nav.instructorsAria')} onClick={closeMenu}>{t('nav.instructors')}</Link></li>
          <li><Link to="/reformer-pilates-amsterdam/" aria-label={t('nav.classesAria')} onClick={closeMenu}>{t('nav.classes')}</Link></li>
          <li><Link to="/pricing/" aria-label={t('nav.pricesAria')} onClick={closeMenu}>{t('nav.prices')}</Link></li>
          <li><Link to={academyHref} aria-label={t('nav.academyAria')} onClick={closeMenu}>{t('nav.academy')}</Link></li>
          <li className="navbar-dropdown">
            <button
              type="button"
              className={`navbar-dropdown-trigger ${moreOpen ? 'open' : ''}`}
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
            >
              {t('nav.more')}
            </button>
            <ul className={`navbar-dropdown-menu ${moreOpen ? 'open' : ''}`}>
              <li><a href="#workouts" onClick={(e) => { e.preventDefault(); closeMenu(); setMoreOpen(false); scrollToSection('workouts'); }}>{t('nav.workouts')}</a></li>
              <li><Link to="/equipment/" onClick={() => { closeMenu(); setMoreOpen(false); }}>{t('nav.shopEquipment')}</Link></li>
              <li><Link to="/healthcare-providers/" onClick={() => { closeMenu(); setMoreOpen(false); }}>{t('nav.forHealthcare')}</Link></li>
              <li><Link to="/corporate/" onClick={() => { closeMenu(); setMoreOpen(false); }}>{t('nav.forBusiness')}</Link></li>
              <li><Link to="/blog/" onClick={() => { closeMenu(); setMoreOpen(false); }}>{t('nav.blog')}</Link></li>
            </ul>
          </li>
          <li><a href="#contact" aria-label={t('nav.contactAria')} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('nav.contact')}</a></li>
          <li className="navbar-login">
            <span
              className="navbar-login-widget"
              dangerouslySetInnerHTML={{
                __html:
                  '<healcode-widget data-version="0.2" data-link-class="loginRegister" data-site-id="123605" data-mb-site-id="5741736" data-bw-identity-site="true" data-type="account-link" data-inner-html="Login | Register"></healcode-widget>',
              }}
            />
          </li>
          <li className="navbar-booknow-desktop-wrapper">
            <Link to="/schedule/" className="navbar-booknow-desktop" aria-label={t('nav.bookClassAria')} onClick={() => { closeMenu(); trackBookNowClick('navbar-desktop'); }}>
              {t('nav.bookNow')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
