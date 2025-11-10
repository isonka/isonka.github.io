import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { trackBookNowClick, trackNavClick } from '../utils/gtmTracking';
import '../styles/Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <li><a href="#workouts" aria-label="Explore workouts" onClick={(e) => { e.preventDefault(); scrollToSection('workouts'); }}>Workouts</a></li>
          <li><Link to="/pricing" aria-label="View pricing" onClick={closeMenu}>Prices</Link></li>
          <li><Link to="/equipment" aria-label="Explore equipment" onClick={closeMenu}>Equipment</Link></li>
          <li><Link to="/academy" aria-label="PT 7 Academy" onClick={closeMenu}>Academy</Link></li>
          <li><Link to="/blog" aria-label="Read our blog" onClick={closeMenu}>Blog</Link></li>
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

