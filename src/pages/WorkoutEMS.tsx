import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { trackPageView } from '../utils/gtmTracking';
import { useEffect } from 'react';
import '../styles/WorkoutDetail.css';

export const WorkoutEMS: React.FC = () => {
  useEffect(() => {
    trackPageView('/workouts/ems', 'EMS Training - PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="EMS Training Amsterdam | Miha Bodytec | PT Studio 7 Museumplein"
        description="Certified EMS Training in Amsterdam at Museumplein. 20-minute full-body workouts with Miha Bodytec. Efficient muscle activation, fat burning & recovery. Expert trainers!"
        keywords="EMS training Amsterdam, Miha Bodytec Amsterdam, EMS workout Museumplein, electro muscle stimulation, EMS fitness Amsterdam, efficient workout Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/workouts/ems"
        ogTitle="EMS Training Amsterdam | Miha Bodytec | PT Studio 7"
        ogDescription="Revolutionary EMS training with Miha Bodytec. 20-minute sessions = 90 minutes conventional training. Expert certified trainers at Museumplein."
        ogImage="/assets/images/ems.jpg"
      />

      <div className="workout-detail-page">
        <section className="workout-hero" style={{ backgroundImage: 'url(/assets/images/ems.jpg)' }}>
          <div className="workout-hero-overlay">
            <div className="workout-hero-content">
              <h1>EMS Training</h1>
              <p className="workout-tagline">Electro Muscle Stimulation for efficient full-body activation</p>
              <Link to="/schedule" className="cta-button">Book Your EMS Session</Link>
            </div>
          </div>
        </section>

        <div className="workout-content">
          <section className="workout-intro">
            <h2>The Future of Efficient Training</h2>
            <p className="lead">
              EMS (Electro Muscle Stimulation) Training uses cutting-edge Miha Bodytec technology to activate up to 90% of your muscles simultaneously with electrical impulses. What takes 90 minutes in conventional training can be achieved in just 25 minutes with EMS - making it the most time-efficient workout available.
            </p>
          </section>

          <section className="how-it-works">
            <h2>How EMS Works</h2>
            <div className="how-grid">
              <div className="how-card">
                <div className="how-number">1</div>
                <h3>Wear the EMS Suit</h3>
                <p>Put on the specialized EMS vest and straps with integrated electrodes that target major muscle groups.</p>
              </div>
              <div className="how-card">
                <div className="how-number">2</div>
                <h3>Electrical Impulses</h3>
                <p>Low-frequency electrical impulses are sent to your muscles, causing them to contract more intensely than voluntary training.</p>
              </div>
              <div className="how-card">
                <div className="how-number">3</div>
                <h3>Guided Exercises</h3>
                <p>Perform movements while the EMS system amplifies muscle engagement up to 18 times more than normal.</p>
              </div>
              <div className="how-card">
                <div className="how-number">4</div>
                <h3>Maximum Results</h3>
                <p>Achieve deep muscle activation, improved strength, enhanced metabolism, and accelerated recovery in minimal time.</p>
              </div>
            </div>
          </section>

          <section className="benefits-section">
            <h2>Benefits of EMS Training</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Time Efficiency</h3>
                <p>25-minute sessions deliver results equivalent to 90 minutes of conventional training.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💪</div>
                <h3>Deep Muscle Activation</h3>
                <p>Activate up to 90% of your muscles simultaneously, including deep-lying stabilizers.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔥</div>
                <h3>Fat Burning</h3>
                <p>Boost metabolism and burn calories for up to 48 hours after your session.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Targeted Training</h3>
                <p>Customize intensity for each muscle group to address imbalances and weak points.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">♿</div>
                <h3>Joint-Friendly</h3>
                <p>Low-impact workout that's gentle on joints, perfect for injury recovery or joint issues.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🧘</div>
                <h3>Back Pain Relief</h3>
                <p>Strengthen deep back muscles to alleviate chronic back pain and improve posture.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🩹</div>
                <h3>Rehabilitation</h3>
                <p>Safe and effective for injury recovery, rebuilding muscle strength with minimal joint stress.</p>
              </div>
            </div>
          </section>

          <section className="for-whom-section">
            <h2>Perfect For</h2>
            <div className="for-whom-grid">
              <div className="for-whom-card">
                <h3>⏰ Busy Professionals</h3>
                <p>Get a complete workout in 25 minutes - perfect for demanding schedules.</p>
              </div>
              <div className="for-whom-card">
                <h3>🎯 Fast Results</h3>
                <p>See visible results in 4-6 weeks with regular training.</p>
              </div>
              <div className="for-whom-card">
                <h3>🔙 Back Pain Sufferers</h3>
                <p>Strengthen deep back muscles to relieve chronic pain safely and effectively.</p>
              </div>
              <div className="for-whom-card">
                <h3>🏋️ Plateau Breakers</h3>
                <p>Break through training plateaus with intense muscle stimulation.</p>
              </div>
              <div className="for-whom-card">
                <h3>🩹 Post-Injury Recovery</h3>
                <p>Rebuild strength gently with low-impact, controlled muscle activation.</p>
              </div>
              <div className="for-whom-card">
                <h3>👴 Active Aging</h3>
                <p>Prevent muscle loss and maintain muscle mass, strength, and mobility with minimal joint stress.</p>
              </div>
            </div>
          </section>

          <section className="class-options-section">
            <h2>EMS Training Options</h2>
            <div className="class-options-grid">
              <div className="class-option-card featured">
                <span className="featured-badge">Private Only</span>
                <h3>Private EMS Sessions</h3>
                <p className="class-size">One-on-One Training</p>
                <p>EMS training is conducted exclusively as private sessions to ensure proper setup, safety, and customized intensity for each muscle group.</p>
                <ul className="class-features">
                  <li>25-minute high-intensity sessions</li>
                  <li>Fully personalized intensity</li>
                  <li>Miha Bodytec certified trainers</li>
                  <li>Flexible scheduling</li>
                </ul>
                <Link to="/schedule" className="class-option-btn">Book EMS Training</Link>
              </div>
            </div>
          </section>

          <section className="trainers-section">
            <h2>Miha Bodytec Certified Trainers</h2>
            <div className="trainers-grid">
              <div className="trainer-mini-card">
                <img src="/assets/images/elif.jpeg" alt="Elif Arzu Ogan" />
                <h3>Elif Arzu Ogan</h3>
                <p className="trainer-cert">Miha Bodytec EMS Advance Trainer</p>
                <p>Certified EMS specialist with 15+ years training experience</p>
                <Link to="/trainer-elif" className="trainer-link">View Profile →</Link>
              </div>
              <div className="trainer-mini-card">
                <img src="/assets/images/goknur.jpeg" alt="Göknur Dipli" />
                <h3>Göknur Dipli</h3>
                <p className="trainer-cert">Miha Bodytec EMS Advance Trainer</p>
                <p>Certified EMS expert with 12+ years in functional training</p>
                <Link to="/trainer-goknur" className="trainer-link">View Profile →</Link>
              </div>
            </div>
          </section>

          <section className="safety-section">
            <h2>Safety & Contraindications</h2>
            <div className="safety-content">
              <div className="safety-card safe">
                <h3>✓ Safe For</h3>
                <ul>
                  <li>Healthy adults of all fitness levels</li>
                  <li>People with chronic back pain</li>
                  <li>Those recovering from injuries (with doctor approval)</li>
                  <li>Busy professionals seeking efficiency</li>
                  <li>Athletes looking for supplementary training</li>
                </ul>
              </div>
              <div className="safety-card warning">
                <h3>⚠️ Not Suitable For</h3>
                <ul>
                  <li>Pregnancy</li>
                  <li>Breastfeeding</li>
                  <li>Pacemakers or electronic implants</li>
                  <li>Epilepsy</li>
                  <li>Severe circulatory disorders</li>              
                  <li>Cancer patients</li>
                </ul>
                <p className="safety-note">Please consult your doctor if you have any health concerns before starting EMS training.</p>
              </div>
            </div>
          </section>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Does EMS training hurt?</h3>
                <p>No! You'll feel a tingling sensation as your muscles contract, but it's not painful. We adjust intensity to your comfort level and gradually increase as you adapt.</p>
              </div>
              <div className="faq-item">
                <h3>How quickly will I see results?</h3>
                <p>Most clients notice changes in 4-6 weeks with regular training (1-2 times per week). You'll feel stronger after the first few sessions.</p>
              </div>
              <div className="faq-item">
                <h3>Is EMS training safe?</h3>
                <p>Yes! EMS has been used in physical therapy for decades. Our Miha Bodytec system is the only FDA-approved EMS device and is medically certified. Our trainers are specially certified in EMS training to ensure your safety.</p>
              </div>
              <div className="faq-item">
                <h3>Can EMS replace regular workouts?</h3>
                <p>EMS is incredibly efficient, but we recommend combining it with other training types for overall fitness. It's excellent as a time-saving supplement or primary workout.</p>
              </div>
              <div className="faq-item">
                <h3>How often should I do EMS training?</h3>
                <p>1-2 times per week is optimal. Each 25-minute session causes deep muscle fatigue, so adequate recovery time (48-72 hours) between sessions is important.</p>
              </div>
              <div className="faq-item">
                <h3>What should I wear?</h3>
                <p>Wear fitted 100% cotton workout clothes - avoid loose clothing and synthetic fabrics. We provide the EMS suit, which you wear over your clothes. EMS is a sweaty exercise, so we recommend bringing spare clothes to change into after your session. Don't forget a water bottle!</p>
              </div>
            </div>
          </section>

          <section className="final-cta">
            <h2>Experience the Future of Training</h2>
            <p>Try EMS training at PT Studio 7 with our Miha Bodytec certified trainers</p>
            <div className="cta-buttons">
              <Link to="/schedule" className="cta-button primary">Book EMS Session</Link>
              <Link to="/pricing" className="cta-button secondary">View Pricing</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

