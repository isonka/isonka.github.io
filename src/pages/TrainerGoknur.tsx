import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerGoknur: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Göknur Dipli - Personal Trainer & Nutrition Coach | PT Studio 7"
        description="Meet Göknur Dipli, expert personal trainer and nutrition coach at PT Studio 7 Amsterdam. Holistic approach to fitness and wellness."
        keywords="Göknur Dipli, personal trainer Amsterdam, nutrition coach, PT Studio 7, fitness coaching"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-goknur"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img src="/assets/images/goknur.jpeg" alt="Göknur Dipli" className="trainer-hero-photo" />
            <div className="trainer-hero-text">
              <h1>Göknur Dipli</h1>
              <p className="trainer-title">Personal Trainer & Nutrition Coach</p>
            </div>
          </div>
        </div>

        <div className="trainer-content">
          <section className="trainer-bio">
            <h2>About Göknur</h2>
            <p>
              Göknur Dipli is a comprehensive fitness and wellness expert who combines personal training expertise 
              with nutrition coaching to help clients achieve sustainable, long-term results. Her holistic approach 
              recognizes that true fitness comes from balancing exercise, nutrition, and lifestyle.
            </p>
            <p>
              With a background in both fitness training and nutritional science, Göknur creates personalized programs 
              that address not just how you move, but also how you fuel your body. She believes in empowering clients 
              with knowledge and skills they can use for life, not just quick fixes.
            </p>
          </section>

          <section className="trainer-specialties">
            <h2>Specializations</h2>
            <div className="specialties-grid">
              <div className="specialty-card">
                <h3>Personal Training</h3>
                <p>Customized workout programs tailored to your goals and fitness level</p>
              </div>
              <div className="specialty-card">
                <h3>Nutrition Coaching</h3>
                <p>Science-based nutrition guidance for optimal performance and health</p>
              </div>
              <div className="specialty-card">
                <h3>Weight Management</h3>
                <p>Sustainable approaches to achieving and maintaining healthy weight</p>
              </div>
              <div className="specialty-card">
                <h3>Lifestyle Coaching</h3>
                <p>Holistic wellness strategies for lasting health transformations</p>
              </div>
            </div>
          </section>

          <section className="trainer-approach">
            <h2>Training Philosophy</h2>
            <p>
              "True transformation happens when we address both fitness and nutrition together. My goal is to help 
              you build habits that last, not just programs you follow temporarily. Together, we'll create a lifestyle 
              that makes you feel strong, energized, and confident every single day."
            </p>
          </section>

          <section className="trainer-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book a session with Göknur for a complete approach to fitness and nutrition.</p>
            <div className="cta-buttons">
              <Link to="/schedule" className="btn-primary">Book a Session</Link>
              <Link to="/pricing" className="btn-secondary">View Pricing</Link>
            </div>
          </section>

          <div className="back-link">
            <Link to="/#trainers">← Back to All Trainers</Link>
          </div>
        </div>
      </div>
    </>
  );
};

