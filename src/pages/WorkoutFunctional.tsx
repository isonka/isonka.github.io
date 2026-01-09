import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import { useEffect } from 'react';
import '../styles/WorkoutDetail.css';

export const WorkoutFunctional: React.FC = () => {
  useEffect(() => {
    trackPageView('/workouts/functional-training', 'Strength Training - PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Strength Training Amsterdam | PT Studio 7 Museumplein"
        description="Expert Strength Training in Amsterdam at Museumplein. Build real-world strength, improve movement patterns, prevent injuries. Small groups & private training!"
        keywords="strength training Amsterdam, free weights training, movement training Museumplein, functional fitness Amsterdam, personal training"
        canonical="https://www.ptstudio7amsterdam.nl/workouts/functional-training"
        ogTitle="Strength Training Amsterdam | PT Studio 7"
        ogDescription="Build practical strength for everyday life. Expert strength training with free weights at our Museumplein studio."
        ogImage="/assets/images/strength.JPG"
      />
      <Breadcrumbs items={[{ name: 'Strength Training', path: '/workouts/functional-training' }]} />

      <div className="workout-detail-page">
        <section className="workout-hero" style={{ backgroundImage: 'url(/assets/images/strength.JPG)' }}>
          <div className="workout-hero-overlay">
            <div className="workout-hero-content">
              <h1>Strength Training</h1>
              <p className="workout-tagline">Train multiple muscles with one exercise - Build strength efficiently</p>
              <Link to="/schedule" className="cta-button">Book a Session</Link>
            </div>
          </div>
        </section>

        <div className="workout-content">
          <section className="workout-intro">
            <h2>Train Multiple Muscles with Every Exercise</h2>
            <p className="lead">
              Strength Training uses compound movements that engage multiple muscle groups simultaneously for maximum efficiency. With one exercise, you train your entire body - building real-world strength, stability, and mobility that translates directly to your daily activities, whether lifting groceries, playing with kids, or excelling in sports.
            </p>
          </section>

          <section className="benefits-section">
            <h2>Why Strength Training?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🏋️</div>
                <h3>Real-World Strength</h3>
                <p>Build practical strength that helps you lift, carry, push, and pull in everyday life.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Injury Prevention</h3>
                <p>Strengthen stabilizing muscles and improve movement patterns to reduce injury risk.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚖️</div>
                <h3>Better Balance</h3>
                <p>Multi-directional movements enhance balance, coordination, and body control.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💪</div>
                <h3>Muscle Building</h3>
                <p>Develop lean, functional muscle mass that improves your metabolism and physique.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔄</div>
                <h3>Core Stability</h3>
                <p>Every exercise engages your core for improved posture and spinal health.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <h3>Progressive Results</h3>
                <p>Track your progress with measurable improvements in strength and performance.</p>
              </div>
            </div>
          </section>

          <section className="for-whom-section">
            <h2>Perfect For</h2>
            <div className="for-whom-grid">
              <div className="for-whom-card">
                <h3>💪 Strength Goals</h3>
                <p>Build muscle, increase power, and get stronger in functional, practical ways.</p>
              </div>
              <div className="for-whom-card">
                <h3>⚽ Sports Performance</h3>
                <p>Enhance athletic ability with movements that directly translate to your sport.</p>
              </div>
              <div className="for-whom-card">
                <h3>🏃‍♂️ Active Lifestyle</h3>
                <p>Prepare your body for hiking, running, sports, and outdoor adventures.</p>
              </div>
              <div className="for-whom-card">
                <h3>👴 Healthy Aging</h3>
                <p>Prevent muscle loss and maintain strength, independence, and quality of life with functional training.</p>
              </div>
              <div className="for-whom-card">
                <h3>🔙 Back Pain Relief</h3>
                <p>Strengthen your posterior chain and core to alleviate chronic back pain.</p>
              </div>
              <div className="for-whom-card">
                <h3>🎯 Weight Loss</h3>
                <p>Burn calories efficiently while building muscle that boosts your metabolism.</p>
              </div>
            </div>
          </section>

          <section className="class-options-section">
            <h2>Training Options</h2>
            <div className="class-options-grid">
              <div className="class-option-card">
                <h3>Couple Training</h3>
                <p className="class-size">Train with Your Partner</p>
                <p>Work out together with your partner while receiving personalized coaching and form corrections for both of you.</p>
                <ul className="class-features">
                  <li>45-minute sessions</li>
                  <li>From €40-50 per person</li>
                  <li>Share the journey</li>
                  <li>Motivate each other</li>
                </ul>
                <Link to="/pricing" className="class-option-btn">View Couple Pricing</Link>
              </div>
              <div className="class-option-card featured">
                <span className="featured-badge">Fully Customized</span>
                <h3>Personal Training</h3>
                <p className="class-size">One-on-One</p>
                <p>Get a completely personalized program designed around your goals, injuries, and fitness level.</p>
                <ul className="class-features">
                  <li>45-minute private sessions</li>
                  <li>From €70 per class</li>
                  <li>Custom program design</li>
                  <li>Focused attention</li>
                </ul>
                <Link to="/pricing" className="class-option-btn">View Private Pricing</Link>
              </div>
            </div>
          </section>

          <section className="trainers-section">
            <h2>Your Strength Training Instructors</h2>
            <div className="trainers-grid">
              <div className="trainer-mini-card">
                <img 
                  src="/assets/images/elif.JPG" 
                  alt="Elif Arzu Ogan - Strength Training Instructor" 
                  width="400" 
                  height="280" 
                  loading="lazy" 
                  decoding="async" 
                />
                <h3>Elif Arzu Ogan</h3>
                <p className="trainer-cert">Strength Training Instructor</p>
                <p>15+ years experience in strength training and functional movement</p>
                <Link to="/trainer-elif" className="trainer-link">View Profile →</Link>
              </div>
              <div className="trainer-mini-card">
                <img 
                  src="/assets/images/goknur.jpeg" 
                  alt="Göknur Dipli - Comprehensive Pilates, Strength Training, Prenatal Pilates Instructor" 
                  width="400" 
                  height="280" 
                  loading="lazy" 
                  decoding="async" 
                />
                <h3>Göknur Dipli</h3>
                <p className="trainer-cert">Strength Training Instructor</p>
                <p>Certified coach with 12+ years in fitness and strength training</p>
                <Link to="/trainer-goknur" className="trainer-link">View Profile →</Link>
              </div>
            </div>
          </section>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>What's the difference between strength training and regular gym workouts?</h3>
                <p>Our strength training focuses on multi-joint, compound movements that mimic real-life activities, rather than isolating individual muscles on machines. This builds practical, usable strength.</p>
              </div>
              <div className="faq-item">
                <h3>Do I need weight training experience?</h3>
                <p>No! We teach proper form from scratch and start with appropriate weights for your level. In couple or private sessions, you'll receive personalized attention to master each movement safely.</p>
              </div>
              <div className="faq-item">
                <h3>Will I get bulky?</h3>
                <p>No. Functional training builds lean, athletic muscle. The type of training we do creates strength and definition without excessive bulk.</p>
              </div>
              <div className="faq-item">
                <h3>Can strength training help with weight loss?</h3>
                <p>Absolutely! Building muscle increases your resting metabolism, and strength training workouts burn significant calories both during and after exercise.</p>
              </div>
              <div className="faq-item">
                <h3>Is this suitable for older adults?</h3>
                <p>Yes! Strength training is one of the best ways to maintain independence as you age. We modify exercises to match your abilities and gradually build strength safely.</p>
              </div>
            </div>
          </section>

          <section className="final-cta">
            <h2>Start Building Real-World Strength</h2>
            <p>Experience strength training at PT Studio 7 Museumplein</p>
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

