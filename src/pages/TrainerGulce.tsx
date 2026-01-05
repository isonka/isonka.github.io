import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerGulce: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Gülce - Pilates Instructor | PT Studio 7"
        description="Meet Gülce, certified Reformer Pilates instructor at PT Studio 7 Amsterdam. Passionate about sharing strength, balance, and joy through Pilates."
        keywords="Gülce, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-gulce"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img 
              src="/assets/images/gulce.JPG" 
              alt="Gülce - Pilates Instructor" 
              className="trainer-hero-photo" 
              width="180" 
              height="180" 
              loading="eager" 
              decoding="async" 
            />
            <div className="trainer-hero-text">
              <h1>Gülce</h1>
              <p className="trainer-title">Pilates Instructor</p>
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
              Gülce has been practicing Pilates since she started college and has explored a wide range of teaching methods and movement approaches throughout her journey. Her experience spans Turkey, Germany, and the Netherlands, where she has both practiced and studied Pilates in diverse studio environments.
            </p>
            <p>
              She has been a happy and dedicated student at PT7 Studio for the past four years, and is now even happier to join the elite team of instructors. Gülce is passionate about sharing the same sense of strength, balance, and joy that Pilates has brought into her own life, and looks forward to bringing that happiness to her students.
            </p>
          </section>

          <section className="trainer-qualifications">
            <h2>Qualifications & Experience</h2>
            <ul>
              <li>PT 7 Academy Comprehensive Reformer Pilates Instructor Course</li>
              <li>International Pilates experience across Turkey, Germany, and the Netherlands</li>
              <li>Specializes in Reformer Pilates</li>
              <li>Focus on strength, balance, and mindful movement</li>
            </ul>
          </section>

          <section className="trainer-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book a session with Gülce and experience the joy of Reformer Pilates.</p>
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

