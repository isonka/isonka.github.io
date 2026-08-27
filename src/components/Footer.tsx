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

    if (location.pathname !== '/') {
      navigate('/');
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
        <p className="footer-tag">Reformer Pilates &amp; personal training · Museumplein Amsterdam</p>

        <nav className="footer-nav" aria-label="Footer">
          <ul className="footer-links">
            <li><Link to="/schedule/">Book</Link></li>
            <li><Link to="/pricing/">Pricing</Link></li>
            <li><Link to="/reformer-pilates-amsterdam/">Reformer Pilates</Link></li>
            <li><Link to="/prenatal-pilates-amsterdam/">Prenatal</Link></li>
            <li><Link to="/academy/">Academy</Link></li>
            <li><Link to="/corporate/">For Business</Link></li>
            <li><Link to="/healthcare-providers/">For Healthcare</Link></li>
            <li><Link to="/blog/">Blog</Link></li>
            <li><a href="#contact" onClick={handleContactClick}>Contact</a></li>
            <li><Link to="/privacy/">Privacy</Link></li>
            <li><a href="#" onClick={handleCookieSettings}>Cookies</a></li>
          </ul>
        </nav>

        <div className="footer-meta">
          <p className="footer-copyright">
            © {new Date().getFullYear()} PT Studio 7 Amsterdam. All rights reserved.
          </p>
          <p className="footer-credit">
            Website by{' '}
            <a href="https://karams.nl" target="_blank" rel="noopener noreferrer">
              Kara
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
