import { Link, useNavigate, useLocation } from 'react-router-dom';
import { openCookieSettings } from '../utils/consentTracking';
import '../styles/Footer.css';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCookieSettings = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openCookieSettings();
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copyright">© {new Date().getFullYear()} PT Studio 7 Amsterdam. All rights reserved.</p>
        <p className="footer-credit">Website by <a href="https://karams.nl" target="_blank" rel="noopener noreferrer">Kara</a></p>
        <ul className="footer-links">
          <li><Link to="/schedule/">Book</Link></li>
          <li><Link to="/pricing/">Pricing</Link></li>
          <li><Link to="/reformer-pilates-amsterdam/">Reformer Pilates</Link></li>
          <li><Link to="/prenatal-pilates-amsterdam/">Prenatal</Link></li>
          <li><Link to="/academy/">Pilates teacher training</Link></li>
          <li><a href="#contact" onClick={handleContactClick}>Contact</a></li>
          <li><a href="#" onClick={handleCookieSettings}>Cookie Settings</a></li>
        </ul>
      </div>
    </footer>
  );
};
