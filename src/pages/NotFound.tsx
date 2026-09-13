import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { trackPageView } from '../utils/gtmTracking';
import { isPrerender } from '../utils/prerender';
import '../styles/NotFound.css';

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (isPrerender()) return;
    trackPageView(location.pathname, 'Page not found | PT 7 Pilates Amsterdam');
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page not found | PT 7 Pilates Amsterdam"
        description="This page does not exist or has moved. Book a Reformer Pilates class, view pricing, or return home."
        keywords="PT 7, page not found"
        canonical="https://www.pt7.nl/"
        robots="noindex, follow"
        omitCanonical
      />

      <section className="not-found">
        <div className="not-found-inner">
          <p className="kicker">404</p>
          <h1>Page not found</h1>
          <p className="not-found-lead">
            This page does not exist or has moved. Book a class, check prices, or go back to the studio homepage.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn-ink">
              Home
            </Link>
            <Link to="/schedule/" className="btn-gold">
              Book a class
            </Link>
            <Link to="/pricing/" className="not-found-ghost">
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
