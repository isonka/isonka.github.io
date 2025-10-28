import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerElif: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Elif Arzu Ogan - Pilates & Functional Training Specialist | PT Studio 7"
        description="Meet Elif Arzu Ogan, expert Pilates and functional training specialist at PT Studio 7 Amsterdam. Book your personalized session today."
        keywords="Elif Arzu Ogan, Pilates instructor Amsterdam, functional training, PT Studio 7, personal trainer"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-elif"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img src="/assets/images/elif.jpeg" alt="Elif Arzu Ogan" className="trainer-hero-photo" />
            <div className="trainer-hero-text">
              <h1>Elif Arzu Ogan</h1>
              <p className="trainer-title">Pilates & Functional Training Specialist</p>
            </div>
          </div>
        </div>

        <div className="trainer-content">
          <section className="trainer-bio">
            <h2>About Elif</h2>
            <p>
              Elif Arzu Ogan is a highly skilled Pilates and functional training specialist with years of experience 
              helping clients achieve their fitness goals. Her approach combines classical Pilates techniques with 
              modern functional training methods to create personalized programs that deliver real results.
            </p>
            <p>
              With a deep understanding of body mechanics and movement patterns, Elif specializes in helping clients 
              improve their posture, build core strength, and enhance overall body awareness. Whether you're recovering 
              from an injury, looking to improve athletic performance, or simply want to feel stronger and more confident, 
              Elif creates customized programs tailored to your unique needs.
            </p>
          </section>

          <section className="trainer-specialties">
            <h2>Specializations</h2>
            <div className="specialties-grid">
              <div className="specialty-card">
                <h3>Reformer Pilates</h3>
                <p>Expert instruction on all Pilates apparatus with focus on proper form and technique</p>
              </div>
              <div className="specialty-card">
                <h3>Functional Training</h3>
                <p>Movement-based exercises to improve everyday activities and athletic performance</p>
              </div>
              <div className="specialty-card">
                <h3>Posture Correction</h3>
                <p>Specialized programs to address postural imbalances and chronic pain</p>
              </div>
              <div className="specialty-card">
                <h3>Core Strengthening</h3>
                <p>Deep core work for stability, strength, and injury prevention</p>
              </div>
            </div>
          </section>

          <section className="trainer-approach">
            <h2>Training Philosophy</h2>
            <p>
              "I believe that fitness is not just about physical strength, but about building a sustainable, 
              healthy relationship with your body. My goal is to help you move better, feel better, and enjoy 
              the process of becoming stronger every day."
            </p>
          </section>

          <section className="trainer-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>Book a session with Elif and experience personalized training at its finest.</p>
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

