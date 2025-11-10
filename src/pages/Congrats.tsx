import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { trackBookingConfirmation, trackPageView } from '../utils/gtmTracking';
import '../styles/Congrats.css';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

export const Congrats: React.FC = () => {
  useEffect(() => {
    // Track page view
    trackPageView('/congrats', 'Booking Confirmed');
    
    // Track booking confirmation in GTM
    trackBookingConfirmation();

    // Fire Google Ads conversion events when page loads
    if (window.gtag) {
      // Primary conversion event (original)
      window.gtag('event', 'ads_conversion_Book_appointment_1', {});
      
      // Purchase conversion tracking (new)
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17684932205/G4r3CKjwirkbEO3M6vBB',
        'transaction_id': '' // Optional: can add unique booking ID if available
      });
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Booking Confirmed - PT Studio 7 Amsterdam"
        description="Your class is booked! See you at PT Studio 7 Amsterdam."
        keywords="PT Studio 7, booking confirmed"
        canonical="https://www.ptstudio7amsterdam.nl/congrats.html"
      />

      <div className="congrats-page">
        <div className="congrats-container">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p className="congrats-message">
            You're all set! We can't wait to see you at PT Studio 7.
          </p>

          <div className="next-steps">
            <h2>What's Next?</h2>
            <ul>
              <li>✓ Check your email for booking confirmation and details</li>
              <li>✓ Arrive 10 minutes early if it's your first visit</li>
              <li>✓ Bring water, a towel, and grip socks (or purchase at studio)</li>
              <li>✓ Wear comfortable workout clothes</li>
            </ul>
          </div>

          <div className="studio-info">
            <h3>📍 Studio Location</h3>
            <p>
              <strong>Van Baerlestraat 76C</strong><br />
              1071BB Amsterdam<br />
              (Museumplein, across from Stedelijk Museum)
            </p>
          </div>

          <div className="action-buttons">
            <Link to="/schedule" className="btn-primary">Book Another Class</Link>
            <Link to="/pricing" className="btn-secondary">View Packages</Link>
            <Link to="/" className="btn-secondary">Back to Home</Link>
          </div>

          <div className="contact-support">
            <p>Questions? Contact us at <a href="mailto:info@ptstudio7amsterdam.nl">info@ptstudio7amsterdam.nl</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

