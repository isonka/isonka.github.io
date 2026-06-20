import '../styles/AcademyUrgencyBanner.css';

export const AcademyUrgencyBanner: React.FC = () => (
  <div className="academy-urgency-banner">
    <div className="urgency-content">
      <span className="urgency-text">
        <strong>Reformer Pilates Instructor Course</strong>
        <span className="urgency-text-full"> · 300 hours · PMA ITTAP Approved · Early bird</span>
        <span className="urgency-text-short"> · 300 hours · Early bird</span>
      </span>
      <a href="mailto:info@pt7.nl?subject=Reformer Pilates Instructor Course Inquiry" className="urgency-cta">
        Inquire Now →
      </a>
    </div>
  </div>
);
