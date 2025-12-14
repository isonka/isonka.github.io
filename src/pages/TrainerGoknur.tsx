import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerGoknur: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Göknur Dipli - Pilates & Functional Training Instructor | PT Studio 7"
        description="Meet Göknur Dipli, expert Pilates and functional training instructor at PT Studio 7 Amsterdam. Holistic approach to fitness and wellness."
        keywords="Göknur Dipli, Pilates instructor Amsterdam, PT Studio 7"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-goknur"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img 
              src="/assets/images/goknur.jpeg" 
              alt="Göknur Dipli - Pilates & Functional Training Instructor" 
              className="trainer-hero-photo" 
              width="180" 
              height="180" 
              loading="eager" 
              decoding="async" 
            />
            <div className="trainer-hero-text">
              <h1>Goknur Dipli</h1>
              <p className="trainer-title">Pilates & Functional Training Instructor</p>
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
              Goknur is a Senior Polestar Pilates Instructor and Miha BodyTec EMS Advance Trainer. She brings a wealth of experience in functional training and is dedicated to helping clients achieve their best through expert guidance and motivation. She graduated in 2016 from Balıkesir University, Department of Physical Education and Sports, majoring in Coaching.
            </p>
          </section>

          <section className="trainer-qualifications">
            <h2>Qualifications & Experience</h2>
            <ul>
              <li>Senior Polestar Pilates Instructor</li>
              <li>Miha BodyTec EMS Advance Trainer</li>
              <li>TRX & Functional Training Instructor</li>
              <li>12+ years of experience in Pilates instruction</li>
              <li>Specializes in individualized programs for all ages and fitness levels</li>
              <li>Polestar Pilates Certified Pilates Trainer – Polestar Pilates, İstanbul</li>
              <li>The science of healthy spine movement – Polestar Pilates with Brent Anderson, İstanbul</li>
              <li>Pilates for low back care – Polestar Pilates and Brent Anderson, İstanbul</li>
              <li>4dpro Bungee Fitness Trainer – 4dpro Bungee Fitness, İzmir</li>
              <li>Miha bodytec Advance EMS Trainer – Miha bodytec, İstanbul</li>
              <li>Reformer Pilates Trainer – Seam Academy, İstanbul</li>
              <li>Pliometric Training and muscle contraction workshop – Seam Academy, İstanbul</li>
              <li>Pilates during pregnancy workshop – Pilatesystem, Ankara</li>
              <li>Pilates Instructor – Turkish Gymnastic Federation, İzmir</li>
              <li>Zumba basic trainer – Zumba, İstanbul</li>
              <li>3rd Level Fitness Trainer Certificate</li>
            </ul>
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
            <Link to="/instructors">← Back to All Instructors</Link>
          </div>
        </div>
      </div>
    </>
  );
};

