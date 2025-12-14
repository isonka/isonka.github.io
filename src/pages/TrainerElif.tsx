import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Trainer.css';

export const TrainerElif: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Elif Arzu Ogan - Pilates & Functional Training Instructor | PT Studio 7"
        description="Meet Elif Arzu Ogan, expert Pilates and functional training instructor at PT Studio 7 Amsterdam. Book your personalized session today."
        keywords="Elif Arzu Ogan, Pilates instructor Amsterdam, functional training, PT Studio 7"
        canonical="https://www.ptstudio7amsterdam.nl/trainer-elif"
      />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img 
              src="/assets/images/elif.jpeg" 
              alt="Elif Arzu Ogan - Owner & Head Instructor" 
              className="trainer-hero-photo" 
              width="180" 
              height="180" 
              loading="eager" 
              decoding="async" 
            />
            <div className="trainer-hero-text">
              <h1>Elif Arzu Ogan</h1>
              <p className="trainer-title">Owner & Head Instructor</p>
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
              Elif is the founder and head instructor of PT Studio 7, which she established in 2010. Since founding the studio, she has continued her career as both an instructor and business owner. With over 15 years of experience, she is a Senior Polestar Pilates Instructor, Miha BodyTec EMS Advance Trainer, and TRX & Functional Training Instructor. Elif holds a bachelor's degree in Business Administration from Hacettepe University. She started her sports career with athletics, continued with swimming, and played basketball in various clubs. She is passionate about helping clients reach their goals through personalized, attentive training and a holistic approach to health and fitness.
            </p>
          </section>

          <section className="trainer-qualifications">
            <h2>Qualifications & Experience</h2>
            <ul>
              <li>Senior Polestar Pilates Instructor</li>
              <li>Miha BodyTec EMS Advance Trainer</li>
              <li>TRX & Functional Training Instructor</li>
              <li>15+ years of experience in Pilates instruction</li>
              <li>Specializes in individualized programs for all ages and fitness levels</li>
              <li>Pilates for scoliosis and spinal disorders – Polestar Pilates, Online</li>
              <li>Pilates during and post pregnancy workshop – Polestar Pilates, Online</li>
              <li>Polestar Pilates Certified Pilates Trainer – Polestar Pilates, İstanbul</li>
              <li>The science of healthy spine movement – Polestar Pilates with Brent Anderson, İstanbul</li>
              <li>Pilates for low back care – Polestar Pilates and Brent Anderson, İstanbul</li>
              <li>4dpro Bungee Fitness Trainer – 4dpro Bungee Fitness, İzmir</li>
              <li>Miha bodytec Advance EMS Trainer – Miha bodytec, İstanbul</li>
              <li>Reformer Pilates Trainer – Seam Academy, İstanbul</li>
              <li>Pliometric Training and muscle contraction workshop – Seam Academy, İstanbul</li>
              <li>Kinesis Trainer – Technogym Wellness Institute, İstanbul</li>
              <li>Pilates during pregnancy workshop – Pilatesystem, Ankara</li>
              <li>Pilates Instructor – Turkish Gymnastic Federation, İzmir</li>
              <li>Zumba basic trainer – Zumba, İstanbul</li>
              <li>TRX Suspension Training Trainer – TRX, İstanbul</li>
              <li>Wellness Trainer – Turkish Sport for Everyone Federation, İzmir</li>
            </ul>
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
            <Link to="/instructors">← Back to All Instructors</Link>
          </div>
        </div>
      </div>
    </>
  );
};

