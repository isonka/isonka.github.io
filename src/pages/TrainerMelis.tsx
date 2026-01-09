import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { StructuredData } from '../components/StructuredData';
import '../styles/Trainer.css';

export const TrainerMelis: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Melis - Pilates Instructor | PT Studio 7"
        description="Meet Melis, certified Reformer Pilates instructor at PT Studio 7 Amsterdam. Helping clients build strength, mobility, and confidence through intentional movement."
        keywords="Melis, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7, Pilates leraar"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-melis"
      />
      <StructuredData
        type="Person"
        data={{
          person: {
            name: 'Melis',
            jobTitle: 'Reformer Pilates Instructor',
            image: '/assets/images/melis.JPG',
            description: 'Certified Reformer Pilates instructor helping clients build strength, mobility, and confidence through intentional movement at PT Studio 7 Amsterdam.',
            worksFor: 'PT Studio 7 Amsterdam',
          },
        }}
      />
      <Breadcrumbs items={[{ name: 'Instructors', path: '/instructors' }, { name: 'Melis', path: '/trainer-melis' }]} />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img 
              src="/assets/images/melis.JPG" 
              alt="Melis - Pilates Instructor" 
              className="trainer-hero-photo" 
              width="180" 
              height="180" 
              loading="eager" 
              decoding="async" 
            />
            <div className="trainer-hero-text">
              <h1>Melis</h1>
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
              Based in Amsterdam, Melis helps clients build strength, mobility, and confidence through intentional and tailored Reformer Pilates. With a background as a former volleyball player and four years of Salsa dancing, movement and body awareness have always been central to her life.
            </p>
            <p>
              She discovered Pilates as a powerful way to support both physical performance and overall wellbeing, and values its blend of precision, control, and functional strength. Melis enjoys helping clients improve posture, develop strength that carries into everyday life, and feel better in their bodies within a welcoming and supportive environment.
            </p>
          </section>

          <section className="trainer-qualifications">
            <h2>Qualifications & Experience</h2>
            <ul>
              <li>PT 7 Academy Comprehensive Reformer Pilates Instructor Course</li>
              <li>Former volleyball player with athletic background</li>
              <li>4 years of Salsa dancing experience</li>
              <li>Specializes in Reformer Pilates</li>
              <li>Focus on posture improvement and functional strength</li>
            </ul>
          </section>

          <section className="trainer-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book a session with Melis and build strength that carries into everyday life.</p>
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

