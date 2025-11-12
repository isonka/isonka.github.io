import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { trackPageView } from '../utils/gtmTracking';
import { useEffect } from 'react';
import '../styles/WorkoutDetail.css';

export const WorkoutTRX: React.FC = () => {
  useEffect(() => {
    trackPageView('/workouts/trx', 'TRX Training - PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="TRX Suspension Training Amsterdam | PT Studio 7 Museumplein"
        description="Professional TRX suspension training in Amsterdam at Museumplein. Build strength, balance & functional fitness. Small group classes & private sessions. Expert trainers!"
        keywords="TRX training Amsterdam, suspension training Amsterdam, TRX Museumplein, functional fitness Amsterdam, strength training, balance training, TRX classes"
        canonical="https://www.ptstudio7amsterdam.nl/workouts/trx"
        ogTitle="TRX Suspension Training Amsterdam | PT Studio 7"
        ogDescription="Expert TRX suspension training at Museumplein. Build total body strength, balance & functional fitness in small groups (max 4)."
        ogImage="/assets/images/trx.jpg"
      />

      <div className="workout-detail-page">
        <section className="workout-hero" style={{ backgroundImage: 'url(/assets/images/trx.jpg)' }}>
          <div className="workout-hero-overlay">
            <div className="workout-hero-content">
              <h1>TRX Suspension Training</h1>
              <p className="workout-tagline">Suspension training for strength, balance, and functional fitness</p>
              <Link to="/schedule" className="cta-button">Book a Class</Link>
            </div>
          </div>
        </section>

        <div className="workout-content">
          <section className="workout-intro">
            <h2>Master Your Body Weight with TRX</h2>
            <p className="lead">
              TRX Suspension Training leverages gravity and your body weight to build strength, balance, flexibility, and core stability simultaneously. Used by elite athletes and military forces, TRX delivers a challenging, scalable workout that's perfect for everyone from beginners to advanced fitness enthusiasts.
            </p>
          </section>

          <section className="benefits-section">
            <h2>Benefits of TRX Training</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Total Body Workout</h3>
                <p>Engage multiple muscle groups simultaneously for efficient, effective full-body conditioning.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Core Engagement</h3>
                <p>Every exercise activates your core, building deep stabilizing strength and balance.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📈</div>
                <h3>Scalable Intensity</h3>
                <p>Easily adjust difficulty by changing your body angle - perfect for all fitness levels.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🏃‍♂️</div>
                <h3>Functional Strength</h3>
                <p>Build practical strength that translates to everyday movements and sports performance.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🤸</div>
                <h3>Flexibility & Mobility</h3>
                <p>Improve range of motion and joint stability through dynamic movements.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔥</div>
                <h3>Fat Burning</h3>
                <p>High-intensity workouts torch calories and boost metabolism for hours after training.</p>
              </div>
            </div>
          </section>

          <section className="for-whom-section">
            <h2>Perfect For</h2>
            <div className="for-whom-grid">
              <div className="for-whom-card">
                <h3>💪 Strength Seekers</h3>
                <p>Build lean muscle and functional power without heavy weights or machines.</p>
              </div>
              <div className="for-whom-card">
                <h3>🏋️ Athletes</h3>
                <p>Enhance sports performance with explosive power, balance, and injury prevention.</p>
              </div>
              <div className="for-whom-card">
                <h3>⏱️ Time-Efficient Trainers</h3>
                <p>Get a complete workout in 45 minutes with no wasted time switching equipment.</p>
              </div>
              <div className="for-whom-card">
                <h3>🆕 Beginners</h3>
                <p>Start at your level and progress safely with easily adjustable intensity.</p>
              </div>
              <div className="for-whom-card">
                <h3>🎯 Goal-Oriented</h3>
                <p>Whether fat loss, muscle gain, or athletic performance - TRX delivers results.</p>
              </div>
              <div className="for-whom-card">
                <h3>🧘 Mind-Body Enthusiasts</h3>
                <p>Combine strength with mindful movement and body awareness.</p>
              </div>
            </div>
          </section>

          <section className="class-options-section">
            <h2>Training Options</h2>
            <div className="class-options-grid">
              <div className="class-option-card">
                <h3>Couple TRX Training</h3>
                <p className="class-size">Train with Your Partner</p>
                <p>Work out together with your partner in a motivating environment while receiving personalized coaching for both of you.</p>
                <ul className="class-features">
                  <li>45-minute sessions</li>
                  <li>From €40-50 per person</li>
                  <li>Share the experience</li>
                  <li>Motivate each other</li>
                </ul>
                <Link to="/pricing" className="class-option-btn">View Couple Pricing</Link>
              </div>
              <div className="class-option-card featured">
                <span className="featured-badge">Most Personal</span>
                <h3>Private TRX Training</h3>
                <p className="class-size">One-on-One</p>
                <p>Get individualized programming designed for your specific goals, fitness level, and any limitations.</p>
                <ul className="class-features">
                  <li>45-minute private sessions</li>
                  <li>From €70 per class</li>
                  <li>Custom workout design</li>
                  <li>Flexible scheduling</li>
                </ul>
                <Link to="/pricing" className="class-option-btn">View Private Pricing</Link>
              </div>
            </div>
          </section>

          <section className="trainers-section">
            <h2>Expert TRX Instructors</h2>
            <div className="trainers-grid">
              <div className="trainer-mini-card">
                <img src="/assets/images/elif.jpeg" alt="Elif Arzu Ogan" />
                <h3>Elif Arzu Ogan</h3>
                <p className="trainer-cert">Certified TRX Instructor</p>
                <p>15+ years functional training experience, TRX certified expert</p>
                <Link to="/trainer-elif" className="trainer-link">View Profile →</Link>
              </div>
              <div className="trainer-mini-card">
                <img src="/assets/images/goknur.jpeg" alt="Göknur Dipli" />
                <h3>Göknur Dipli</h3>
                <p className="trainer-cert">TRX & Functional Training Specialist</p>
                <p>12+ years experience in suspension training and functional fitness</p>
                <Link to="/trainer-goknur" className="trainer-link">View Profile →</Link>
              </div>
            </div>
          </section>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Is TRX suitable for beginners?</h3>
                <p>Absolutely! TRX is incredibly scalable. By simply adjusting your body angle, we can make exercises easier or harder. Our instructors will guide you to find the right intensity.</p>
              </div>
              <div className="faq-item">
                <h3>Will I build muscle with TRX?</h3>
                <p>Yes! TRX builds lean, functional muscle through body weight resistance. You'll develop strength, definition, and improved muscle endurance.</p>
              </div>
              <div className="faq-item">
                <h3>What fitness level do I need for TRX?</h3>
                <p>TRX is highly adaptable and can be scaled for any fitness level. By simply adjusting your body angle, we can make exercises easier or more challenging to match your athletic abilities.</p>
              </div>
              <div className="faq-item">
                <h3>What should I wear?</h3>
                <p>Wear comfortable athletic clothing that allows full range of motion. Athletic shoes are required for TRX training.</p>
              </div>
              <div className="faq-item">
                <h3>How many times per week should I do TRX?</h3>
                <p>2-3 times per week is ideal for building strength and seeing results, with rest days in between for recovery.</p>
              </div>
            </div>
          </section>

          <section className="final-cta">
            <h2>Ready to Experience TRX?</h2>
            <p>Discover the power of suspension training at PT Studio 7</p>
            <div className="cta-buttons">
              <Link to="/schedule" className="cta-button primary">Book Your Session</Link>
              <Link to="/pricing" className="cta-button secondary">View Pricing</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

