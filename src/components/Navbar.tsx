import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackBookNowClick, trackNavClick } from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import { homePath, isHomePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import '../styles/Navbar.css';

export const Navbar= () => {
  const { t } = useTranslation('common');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'business' | 'more' | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const home = homePath(locale);
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';
  const pricingHref = locale === 'nl' ? '/pricing/nl/' : '/pricing/';
  const scheduleHref = locale === 'nl' ? '/schedule/nl/' : '/schedule/';

  const toggleMenu = () => {
    if (isMenuOpen) setOpenDropdown(null);
    else void ensureHealcodeLoaded().catch(() => {});
    setIsMenuOpen(!isMenuOpen);
  };

  const loadLoginWidget = () => {
    void ensureHealcodeLoaded().catch(() => {});
  };

  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.navbar-dropdown')) setOpenDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleScroll = () => {
      setIsMenuOpen(false);
      setOpenDropdown(null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
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
              src="/assets/images/pt7logo.webp"
              alt="PT 7"
              width={56}
              height={56}
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
          <span className="navbar-toggle-icon"></span>
        </button>

        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#about" aria-label={t('nav.aboutAria')} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('nav.about')}</a></li>
          <li><a href="#reviews" aria-label={t('nav.reviewsAria')} onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>{t('nav.reviews')}</a></li>
          <li><Link to="/instructors/" aria-label={t('nav.instructorsAria')} onClick={closeMenu}>{t('nav.instructors')}</Link></li>
          <li><Link to="/reformer-pilates-amsterdam/" aria-label={t('nav.classesAria')} onClick={closeMenu}>{t('nav.classes')}</Link></li>
          <li><Link to={pricingHref} aria-label={t('nav.pricesAria')} onClick={closeMenu}>{t('nav.prices')}</Link></li>
          <li><Link to={academyHref} aria-label={t('nav.academyAria')} onClick={closeMenu}>{t('nav.academy')}</Link></li>
          <li className="navbar-dropdown">
            <button
              type="button"
              className={`navbar-dropdown-trigger ${openDropdown === 'business' ? 'open' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'business' ? null : 'business')}
              aria-expanded={openDropdown === 'business'}
              aria-haspopup="true"
            >
              {t('nav.business')}
            </button>
            <ul className={`navbar-dropdown-menu ${openDropdown === 'business' ? 'open' : ''}`}>
              <li><Link to="/corporate/" onClick={closeMenu}>{t('nav.forBusiness')}</Link></li>
              <li><Link to="/healthcare-providers/" onClick={closeMenu}>{t('nav.forHealthcare')}</Link></li>
            </ul>
          </li>
          <li><Link to="/equipment/" onClick={closeMenu}>{t('nav.shop')}</Link></li>
          <li className="navbar-dropdown">
            <button
              type="button"
              className={`navbar-dropdown-trigger ${openDropdown === 'more' ? 'open' : ''}`}
              onClick={() => setOpenDropdown(openDropdown === 'more' ? null : 'more')}
              aria-expanded={openDropdown === 'more'}
              aria-haspopup="true"
            >
              {t('nav.more')}
            </button>
            <ul className={`navbar-dropdown-menu ${openDropdown === 'more' ? 'open' : ''}`}>
              <li><a href="#workouts" onClick={(e) => { e.preventDefault(); closeMenu(); scrollToSection('workouts'); }}>{t('nav.workouts')}</a></li>
              <li><Link to="/blog/" onClick={closeMenu}>{t('nav.blog')}</Link></li>
            </ul>
          </li>
          <li><a href="#contact" aria-label={t('nav.contactAria')} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('nav.contact')}</a></li>
          <li
            className="navbar-login"
            onPointerEnter={loadLoginWidget}
            onFocus={loadLoginWidget}
          >
            <span
              className="navbar-login-widget"
              dangerouslySetInnerHTML={{
                __html:
                  '<healcode-widget data-version="0.2" data-link-class="loginRegister" data-site-id="123605" data-mb-site-id="5741736" data-bw-identity-site="true" data-type="account-link" data-inner-html="MindBody Login"></healcode-widget>',
              }}
            />
          </li>
          <li className="navbar-booknow-desktop-wrapper">
            <Link to={scheduleHref} className="navbar-booknow-desktop" aria-label={t('nav.bookClassAria')} onClick={() => { closeMenu(); trackBookNowClick('navbar-desktop'); }}>
              {t('nav.bookNow')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
