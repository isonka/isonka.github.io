import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerNisan: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Nisan - Pilates Instructor | PT Studio 7"
        description="Meet Nisan, certified Reformer Pilates instructor at PT Studio 7 Amsterdam. Passionate about mindful movement and helping people feel good in their bodies."
        keywords="Nisan, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-nisan"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img 
              src="/assets/images/nisan.JPG" 
              alt="Nisan - Pilates Instructor" 
              className="trainer-hero-photo" 
              width="180" 
              height="180" 
              loading="eager" 
              decoding="async" 
            />
            <div className="trainer-hero-text">
              <h1>Nisan</h1>
              <p className="trainer-title">Pilates Instructor</p>
              <ul className="trainer-languages">
                <li>English</li>
                <li>Turkish</li>
                <li>Dutch</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="trainer-content">
          <section className="trainer-bio">
            <p>
              Nisan is a newly certified Pilates instructor who is passionate about mindful movement and helping people feel good in their bodies. Her approach focuses on building strength, mobility, and balance in ways that support a high quality of life and long-term wellbeing.
            </p>
          </section>

          <section className="trainer-qualifications">
            <h2>Qualifications & Experience</h2>
            <ul>
              <li>PT 7 Academy Comprehensive Reformer Pilates Instructor Course</li>
              <li>Specializes in Reformer Pilates</li>
              <li>Focus on mindful movement and wellbeing</li>
              <li>Emphasis on building strength, mobility, and balance</li>
            </ul>
          </section>

          <section className="trainer-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book a session with Nisan and experience mindful movement at its finest.</p>
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

