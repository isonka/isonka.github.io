import '../styles/AcademyUrgencyBanner.css';

export const AcademyUrgencyBanner: React.FC = () => (
  <div className="academy-urgency-banner">
    <div className="urgency-content">
      <span className="urgency-text">
        <strong>International Pilates Instructor Certification Training</strong>
        <span className="urgency-text-full"> · Reformer course starts September 2026 · 10 spots</span>
        <span className="urgency-text-short"> · Sep 2026 · 10 spots</span>
      </span>
      <a href="mailto:info@pt7.nl?subject=Reformer Instructor Course Inquiry" className="urgency-cta">
        Inquire Now →
      </a>
    </div>
  </div>
);
