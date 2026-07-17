import { Link } from 'react-router-dom';
import '../styles/AcademyUrgencyBanner.css';

export const AcademyUrgencyBanner: React.FC = () => (
  <Link
    to="/academy"
    className="academy-urgency-banner"
    aria-label="Reformer Pilates Instructor Course — open PT7 Academy"
  >
    <div className="urgency-content">
      <span className="urgency-text">
        <strong>Reformer Pilates Instructor Course</strong>
        <span className="urgency-text-full"> · 300 hours · PMA ITTAP Approved · Last spots</span>
        <span className="urgency-text-short"> · 300 hours · Last spots</span>
      </span>
      <span className="urgency-cta">View Course →</span>
    </div>
  </Link>
);
