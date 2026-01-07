import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerLal: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Lal - Pilates Instructor | PT Studio 7"
        description="Meet Lal, certified Reformer Pilates instructor at PT Studio 7 Amsterdam. Visual artist and creative technologist bringing mindful movement to her teaching."
        keywords="Lal, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-lal"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img 
              src="/assets/images/lal.JPG" 
              alt="Lal - Pilates Instructor" 
              className="trainer-hero-photo" 
              width="180" 
              height="180" 
              loading="eager" 
              decoding="async" 
            />
            <div className="trainer-hero-text">
              <h1>Lal</h1>
              <p className="trainer-title">Reformer Pilates</p>
              <ul className="trainer-languages">
                <li>English</li>
                <li>Turkish</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="trainer-content">
          <section className="trainer-bio">
            <p>
              Lal began practicing Pilates in 2022, building on a lifelong relationship with movement as an active spirit. Growing up in Istanbul, she was drawn to group sports like football and volleyball, later developing a strong interest in gym training and personal conditioning.
            </p>
            <p>
              Alongside her Pilates journey, Lal works professionally as a visual artist and creative technologist, a field that involves long hours of standing and physically demanding installation work. Pilates first helped her resolve the physical strain caused by this work, and over time became an essential practice for building strength, resilience, and body awareness. She chose to become an instructor to practice movements mindfully and share her knowledge with others.
            </p>
          </section>

          <section className="trainer-qualifications">
            <h2>Qualifications & Experience</h2>
            <ul>
              <li>PT 7 Academy Comprehensive Reformer Pilates Instructor Course</li>
              <li>Background in team sports (football, volleyball)</li>
              <li>Professional visual artist and creative technologist</li>
              <li>Specializes in Reformer Pilates</li>
              <li>Focus on building strength, resilience, and body awareness</li>
            </ul>
          </section>

          <section className="trainer-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book a session with Lal and discover mindful movement through Pilates.</p>
            <div className="cta-buttons">
              <Link to="/schedule" className="btn-primary">Book a Session</Link>
              <Link to="/pricing" className="btn-secondary">View Pricing</Link>
            </div>
          </section>

          <div className="back-link">
            <Link to="/instructors">← Back to All Instructors</Link>
          </div>
        </div>
      </div>
    </>
  );
};

