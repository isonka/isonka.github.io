import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { trackPageView } from '../utils/gtmTracking';
import { useEffect } from 'react';
import '../styles/WorkoutDetail.css';

export const WorkoutCardio: React.FC = () => {
  useEffect(() => {
    trackPageView('/workouts/cardio', 'Cardio Training - PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Cardio Training Amsterdam | PT Studio 7 Museumplein"
        description="High-intensity cardio workouts in Amsterdam at Museumplein. Boost endurance, burn fat, improve heart health. Small group HIIT classes & personal training!"
        keywords="cardio training Amsterdam, HIIT Amsterdam, fat burning workout, endurance training Museumplein, cardio classes Amsterdam, heart health fitness"
        canonical="https://www.ptstudio7amsterdam.nl/workouts/cardio"
        ogTitle="Cardio Training Amsterdam | PT Studio 7"
        ogDescription="High-energy cardio workouts to burn calories and build endurance. Small groups (max 5) at Museumplein."
        ogImage="/assets/images/cardio.jpg"
      />

      <div className="workout-detail-page">
        <section className="workout-hero" style={{ backgroundImage: 'url(/assets/images/cardio.jpg)' }}>
          <div className="workout-hero-overlay">
            <div className="workout-hero-content">
              <h1>Cardio Training</h1>
              <p className="workout-tagline">High-intensity cardio workouts to boost endurance and burn calories</p>
              <Link to="/schedule" className="cta-button">Book a Session</Link>
            </div>
          </div>
        </section>

        <div className="workout-content">
          <section className="workout-intro">
            <h2>Transform Your Cardiovascular Fitness</h2>
            <p className="lead">
              Our cardio training combines high-intensity interval training (HIIT), metabolic conditioning, and endurance work to maximize calorie burn, boost cardiovascular health, and improve your overall fitness. Get ready to sweat, challenge yourself, and see real results!
            </p>
          </section>

          <section className="benefits-section">
            <h2>Benefits of Cardio Training</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🔥</div>
                <h3>Fat Burning</h3>
                <p>Torch calories during and after your workout with the afterburn effect of high-intensity training.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">❤️</div>
                <h3>Heart Health</h3>
                <p>Strengthen your cardiovascular system, lower blood pressure, and reduce heart disease risk.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Increased Energy</h3>
                <p>Boost your stamina and energy levels for better performance in daily activities.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🧠</div>
                <h3>Mental Clarity</h3>
                <p>Release endorphins, reduce stress, and improve mood and cognitive function.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💪</div>
                <h3>Endurance Building</h3>
                <p>Improve your ability to sustain physical activity for longer periods without fatigue.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⏱️</div>
                <h3>Time Efficient</h3>
                <p>HIIT workouts deliver maximum results in minimal time - perfect for busy schedules.</p>
              </div>
            </div>
          </section>

          <section className="for-whom-section">
            <h2>Perfect For</h2>
            <div className="for-whom-grid">
              <div className="for-whom-card">
                <h3>🎯 Weight Loss Goals</h3>
                <p>Maximize calorie burn and fat loss with high-intensity metabolic training.</p>
              </div>
              <div className="for-whom-card">
                <h3>🏃‍♀️ Endurance Athletes</h3>
                <p>Build cardiovascular capacity for running, cycling, or sports performance.</p>
              </div>
              <div className="for-whom-card">
                <h3>⏰ Busy Professionals</h3>
                <p>Get an effective workout in 45 minutes that fits your schedule.</p>
              </div>
              <div className="for-whom-card">
                <h3>💓 Heart Health</h3>
                <p>Improve cardiovascular health and reduce risk of heart disease.</p>
              </div>
              <div className="for-whom-card">
                <h3>🔋 Energy Boost</h3>
                <p>Increase daily energy levels and combat fatigue with regular cardio training.</p>
              </div>
              <div className="for-whom-card">
                <h3>😊 Stress Relief</h3>
                <p>Release endorphins and reduce stress through high-energy exercise.</p>
              </div>
            </div>
          </section>

          <section className="class-options-section">
            <h2>Training Options</h2>
            <div className="class-options-grid">
              <div className="class-option-card">
                <h3>Couple Cardio Training</h3>
                <p className="class-size">Train with Your Partner</p>
                <p>Push each other to new limits while getting personalized coaching and motivation for both of you.</p>
                <ul className="class-features">
                  <li>45-minute high-energy sessions</li>
                  <li>From €40-50 per person</li>
                  <li>All fitness levels</li>
                  <li>Motivate each other</li>
                </ul>
                <Link to="/pricing" className="class-option-btn">View Couple Pricing</Link>
              </div>
              <div className="class-option-card featured">
                <span className="featured-badge">Tailored Intensity</span>
                <h3>Private Cardio Training</h3>
                <p className="class-size">One-on-One</p>
                <p>Get a personalized cardio program designed for your fitness level, goals, and any health considerations.</p>
                <ul className="class-features">
                  <li>45-minute private sessions</li>
                  <li>From €70 per class</li>
                  <li>Custom intensity levels</li>
                  <li>Your pace, your goals</li>
                </ul>
                <Link to="/pricing" className="class-option-btn">View Private Pricing</Link>
              </div>
            </div>
          </section>

          <section className="trainers-section">
            <h2>Your Cardio Training Coaches</h2>
            <div className="trainers-grid">
              <div className="trainer-mini-card">
                <img 
                  src="/assets/images/elif.JPG" 
                  alt="Elif Arzu Ogan - Cardio Instructor" 
                  width="400" 
                  height="280" 
                  loading="lazy" 
                  decoding="async" 
                />
                <h3>Elif Arzu Ogan</h3>
                <p className="trainer-cert">Cardio & HIIT Instructor</p>
                <p>15+ years experience in high-intensity training and cardio conditioning</p>
                <Link to="/trainer-elif" className="trainer-link">View Profile →</Link>
              </div>
              <div className="trainer-mini-card">
                <img 
                  src="/assets/images/goknur.jpeg" 
                  alt="Göknur Dipli - Cardio Coach" 
                  width="400" 
                  height="280" 
                  loading="lazy" 
                  decoding="async" 
                />
                <h3>Göknur Dipli</h3>
                <p className="trainer-cert">Metabolic Conditioning Instructor</p>
                <p>12+ years experience in cardio training and endurance coaching</p>
                <Link to="/trainer-goknur" className="trainer-link">View Profile →</Link>
              </div>
            </div>
          </section>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Is cardio training right for beginners?</h3>
                <p>Yes! We modify intensity and exercises to match your current fitness level. You'll start where you are and progress at your own pace.</p>
              </div>
              <div className="faq-item">
                <h3>How many calories will I burn?</h3>
                <p>Depending on intensity and your body, you can burn 300-600 calories per 45-minute session, plus additional calories from the afterburn effect.</p>
              </div>
              <div className="faq-item">
                <h3>Will I lose muscle with cardio training?</h3>
                <p>No! Our cardio workouts include resistance exercises and are designed to preserve muscle while burning fat. We recommend combining cardio with strength training for best results.</p>
              </div>
              <div className="faq-item">
                <h3>What if I have joint issues?</h3>
                <p>We offer low-impact modifications for all exercises. Inform your instructor about any concerns, and they'll provide alternatives that protect your joints.</p>
              </div>
              <div className="faq-item">
                <h3>How often should I do cardio?</h3>
                <p>For general health, 2-3 times per week is excellent. For weight loss goals, 3-5 sessions per week combined with proper nutrition works best.</p>
              </div>
            </div>
          </section>

          <section className="final-cta">
            <h2>Ready to Boost Your Endurance?</h2>
            <p>Join our high-energy cardio classes at PT Studio 7</p>
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

