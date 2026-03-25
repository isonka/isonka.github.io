import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trainerProfiles } from '../data/trainers';
import '../styles/Trainers.css';

export const Trainers: React.FC = () => {
  const availableInstructors = trainerProfiles.filter(t => t.available);
  const hasComingSoon = trainerProfiles.some(t => !t.available);

  return (
    <>
      <SEOHead
        title="Our Instructors | PT Studio 7 Amsterdam"
        description="Meet our expert team of certified Pilates and fitness instructors at PT Studio 7 Amsterdam. Master, senior, and junior instructors dedicated to your fitness journey."
        keywords="Pilates instructors Amsterdam, polestar pilates amsterdam, Pilates leraren Amsterdam, gecertificeerde Pilates instructeurs, Pilates teachers Museumplein, Pilates team Oud-Zuid"
        canonical="https://www.pt7.nl/instructors"
      />
      <Breadcrumbs items={[{ name: 'Instructors', path: '/instructors' }]} />

      <div className="trainers-page">
        {/* All Instructors */}
        {availableInstructors.length > 0 && (
          <section className="trainers-section trainers-section-main">
            <div className="trainers-section-header">
              <h1>Meet Our Team</h1>
              <p>Experienced professionals with advanced certifications</p>
            </div>
            <div className="trainers-grid">
              {availableInstructors.map(instructor => (
                <Link to={`/trainer/${instructor.slug}`} key={instructor.slug} className="trainer-card">
                  <div className="trainer-card-image">
                    <img src={instructor.image} alt={instructor.name} loading="lazy" />
                    <span className={`trainer-tier-badge tier-${instructor.tier}`}>
                      {instructor.tier === 'master' ? 'Master' : instructor.tier === 'senior' ? 'Senior' : 'Junior'}
                    </span>
                  </div>
                  <div className="trainer-card-content">
                    <h3>{instructor.name}</h3>
                    <p className="trainer-card-title" style={{ whiteSpace: 'pre-line' }}>{instructor.title}</p>
                    <div className="trainer-card-languages">
                      {instructor.languages.map(lang => (
                        <span key={lang} className="language-tag">{lang}</span>
                      ))}
                    </div>
                    <span className="trainer-card-link">View Profile →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Growing Team Banner */}
        {hasComingSoon && (
          <section className="trainers-growing-banner">
            <div className="growing-banner-inner">
              <div className="growing-banner-text">
                <h2>Our Team is Growing</h2>
                <p>New instructors are joining soon. Interested in teaching at PT Studio 7?</p>
              </div>
              <Link to="/academy" className="growing-banner-link">Learn About Our Academy →</Link>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="trainers-cta">
          <h2>Ready to Train with Our Instructors?</h2>
          <p>Book a session and experience personalized training at its finest</p>
          <div className="trainers-cta-buttons">
            <Link to="/schedule" className="trainers-btn-primary">Book a Class</Link>
            <Link to="/pricing" className="trainers-btn-secondary">View Pricing</Link>
          </div>
        </section>
      </div>
    </>
  );
};

