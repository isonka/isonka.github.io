import { Link } from 'react-router-dom';
import '../styles/AcademyUrgencyBanner.css';

export const AcademyUrgencyBanner: React.FC = () => (
  <Link
    to="/academy/"
    className="academy-urgency-banner"
    aria-label="Become a Pilates instructor — Pilates teacher training at PT7 Academy"
  >
    <div className="urgency-content">
      <span className="urgency-text">
        <strong>Become a Pilates instructor</strong>
        <span className="urgency-text-full"> · Pilates teacher training · PMA ITTAP Approved · Sep term full · Next: Mar 2027</span>
        <span className="urgency-text-short"> · Teacher training · Next: Mar 2027</span>
      </span>
      <span className="urgency-cta">View Course →</span>
    </div>
  </Link>
);
