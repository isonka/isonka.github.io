import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Footer.css';

declare global {
  interface Window {
    Cookiebot?: any;
  }
}

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCookieSettings = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('Cookie Settings clicked');
    console.log('Cookiebot available:', !!window.Cookiebot);
    
    // Check if Cookiebot is loaded
    if (window.Cookiebot) {
      console.log('Opening Cookiebot dialog...');
      window.Cookiebot.renew();
    } else {
      console.warn('Cookiebot not yet loaded. Please wait a moment and try again.');
      alert('Cookie settings are loading. Please try again in a moment.');
    }
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
        <p className="footer-copyright">© 2025 PT Studio 7 Amsterdam. All rights reserved.</p>
        <ul className="footer-links">
          <li><Link to="/schedule">Book</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><a href="#contact" onClick={handleContactClick}>Contact</a></li>
          <li><a href="#" onClick={handleCookieSettings}>Cookie Settings</a></li>
        </ul>
      </div>
    </footer>
  );
};

