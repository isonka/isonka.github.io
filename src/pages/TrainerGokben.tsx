import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerGokben: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Gökben Öztekin - Reformer Pilates Expert | PT Studio 7"
        description="Meet Gökben Öztekin, expert Reformer Pilates instructor at PT Studio 7 Amsterdam. Specializing in precise technique and mindful movement."
        keywords="Gökben Öztekin, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-gokben"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img src="/assets/images/gokben.jpeg" alt="Gökben Öztekin" className="trainer-hero-photo" />
            <div className="trainer-hero-text">
              <h1>Gökben Öztekin</h1>
              <p className="trainer-title">Reformer Pilates Expert</p>
            </div>
          </div>
        </div>

        <div className="trainer-content">
          <section className="trainer-bio">
            <h2>About Gökben</h2>
            <p>
              Gökben Öztekin is a dedicated Reformer Pilates expert who brings precision, grace, and deep anatomical 
              knowledge to every session. Her passion for Pilates is evident in her meticulous attention to form and 
              her ability to guide students through challenging movements with clarity and encouragement.
            </p>
            <p>
              With extensive training in classical and contemporary Pilates methods, Gökben has helped countless clients 
              discover the transformative power of mindful movement. She believes in creating a supportive environment 
              where students can explore their capabilities while building strength, flexibility, and body awareness.
            </p>
          </section>

          <section className="trainer-specialties">
            <h2>Specializations</h2>
            <div className="specialties-grid">
              <div className="specialty-card">
                <h3>Reformer Technique</h3>
                <p>Expert guidance on all reformer exercises with emphasis on precision and control</p>
              </div>
              <div className="specialty-card">
                <h3>Flexibility Training</h3>
                <p>Programs designed to improve range of motion and prevent injuries</p>
              </div>
              <div className="specialty-card">
                <h3>Mind-Body Connection</h3>
                <p>Integrating breath work and mindfulness into physical practice</p>
              </div>
              <div className="specialty-card">
                <h3>Beginner Programs</h3>
                <p>Patient, thorough instruction for those new to Pilates</p>
              </div>
            </div>
          </section>

          <section className="trainer-approach">
            <h2>Training Philosophy</h2>
            <p>
              "Pilates is more than exercise—it's a practice of self-discovery. Every movement is an opportunity 
              to connect with your body, understand its needs, and celebrate its capabilities. I'm here to guide 
              you on that journey with patience and expertise."
            </p>
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
            <Link to="/#trainers">← Back to All Trainers</Link>
          </div>
        </div>
      </div>
    </>
  );
};

