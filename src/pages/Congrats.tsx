import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Congrats.css';

export const Congrats: React.FC = () => {
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

