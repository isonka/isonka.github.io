import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerGokben: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Gökben Öztekin - Pilates Instructor | PT Studio 7"
        description="Meet Gökben Öztekin, expert Reformer Pilates instructor at PT Studio 7 Amsterdam. Specializing in precise technique and mindful movement."
        keywords="Gökben Öztekin, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-gokben"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img 
              src="/assets/images/gokben.jpeg" 
              alt="Gökben Öztekin - Basi Pilates Instructor" 
              className="trainer-hero-photo" 
              width="180" 
              height="180" 
              loading="eager" 
              decoding="async" 
            />
            <div className="trainer-hero-text">
              <h1>Gokben Oztekin</h1>
              <p className="trainer-title">Comprehensive Pilates</p>
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
              Gokben is a certified Basi Pilates Instructor with a passion for helping clients improve their strength, flexibility, and overall well-being. She creates a welcoming and motivating environment for everyone.
            </p>
          </section>

          <section className="trainer-qualifications">
            <h2>Qualifications & Experience</h2>
            <ul>
              <li>Basi Pilates Instructor</li>
              <li>Specializes in Pilates for all ages and abilities</li>
              <li>Focuses on mindful movement and personal growth</li>
            </ul>
          </section>

          <section className="trainer-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book a session with Gökben and experience the art of Reformer Pilates.</p>
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

