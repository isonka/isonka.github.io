import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { trackBookNowClick, trackNavClick } from '../utils/gtmTracking';
import '../styles/Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    if (isMenuOpen) setMoreOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  // Close More dropdown when clicking outside (desktop)
  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.navbar-dropdown')) setMoreOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [moreOpen]);

  // Close menu when scrolling on mobile (menu overlays screen and blocks content)
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
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
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
          <Link to="/" aria-label="PT Studio 7 Home">
            <img 
              src="/assets/images/ts_logo.png" 
              alt="PT Studio 7 Logo" 
              style={{ height: '48px', width: 'auto', verticalAlign: 'middle' }}
            />
          </Link>
        </div>
        
        <Link 
          to="/schedule" 
          className="navbar-booknow-mobile" 
          aria-label="Book a session"
          onClick={() => trackBookNowClick('navbar-mobile')}
        >
          Book Now
        </Link>
        
        <button
          type="button"
          className="navbar-toggle"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="navbar-toggle-icon"></span>
        </button>
        
        <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#about" aria-label="Learn about us" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
          <li><a href="#reviews" aria-label="Read reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}>Reviews</a></li>
          <li><Link to="/instructors" aria-label="Meet our instructors" onClick={closeMenu}>Instructors</Link></li>
          <li><Link to="/pricing" aria-label="View pricing" onClick={closeMenu}>Prices</Link></li>
          <li><Link to="/academy" aria-label="PT Studio 7 Academy" onClick={closeMenu}>Academy</Link></li>
          <li className="navbar-dropdown">
            <button
              type="button"
              className={`navbar-dropdown-trigger ${moreOpen ? 'open' : ''}`}
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
            >
              More
            </button>
            <ul className={`navbar-dropdown-menu ${moreOpen ? 'open' : ''}`}>
              <li><a href="#workouts" onClick={(e) => { e.preventDefault(); closeMenu(); setMoreOpen(false); scrollToSection('workouts'); }}>Workouts</a></li>
              <li><Link to="/equipment" onClick={() => { closeMenu(); setMoreOpen(false); }}>Equipment</Link></li>
              <li><Link to="/healthcare-providers" onClick={() => { closeMenu(); setMoreOpen(false); }}>For Healthcare</Link></li>
              <li><Link to="/blog" onClick={() => { closeMenu(); setMoreOpen(false); }}>Blog</Link></li>
            </ul>
          </li>
          <li><a href="#contact" aria-label="Contact us" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          <li className="navbar-booknow-desktop-wrapper">
            <Link to="/schedule" className="navbar-booknow-desktop" aria-label="Book a class" onClick={() => { closeMenu(); trackBookNowClick('navbar-desktop'); }}>
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

