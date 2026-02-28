import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import { useEffect } from 'react';
import '../styles/WorkoutDetail.css';
import '../styles/SummerShredLab.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'healcode-widget': any;
    }
  }
}

export const WorkoutSummerShredLab: React.FC = () => {
  useEffect(() => {
    trackPageView('/workouts/summer-shred-lab', 'Summer Shred Lab - PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Summer Shred Lab Amsterdam | 6-Week Body Transformation | PT Studio 7"
        description="Get your summer body in 6 weeks. Exclusive small-group program (max 3) using Technogym Skillrun, RowErg, and Nike Strength Half Rack. 2 sessions per week at PT Studio 7 Museumplein."
        keywords="summer body Amsterdam, summer shred program Amsterdam, body transformation Amsterdam, HIIT small group Amsterdam, Technogym Skillrun Amsterdam, strength training summer Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/workouts/summer-shred-lab"
        ogTitle="Summer Shred Lab | 6-Week Body Transformation | PT Studio 7"
        ogDescription="6 weeks. 2 sessions per week. Max 3 people. Skillrun, RowErg & Nike Strength. Get summer-ready at PT Studio 7 Amsterdam."
        ogImage="/assets/images/summer-shred-lab-poster.png"
      />
      <Breadcrumbs items={[{ name: 'Summer Shred Lab', path: '/workouts/summer-shred-lab' }]} />

      <div className="ssl-announcement-banner">
        <span className="ssl-banner-label">Now Enrolling</span>
        <span className="ssl-banner-text">Summer Shred Lab — 6 weeks · 2x per week · Max 3 people</span>
        <a href="#buy" className="ssl-banner-cta">Reserve Your Spot →</a>
      </div>

      <div className="workout-detail-page">
        <section className="ssl-hero">
          <img
            src="/assets/images/summer-shred-lab-poster.png"
            alt="Summer Shred Lab — 6 Weeks · 2× Per Week · Max 3 People"
            className="ssl-hero-image"
          />
          <div className="ssl-hero-cta">
            <a href="#buy" className="cta-button">Reserve Your Spot</a>
          </div>
        </section>

        <div className="workout-content">
          <section className="workout-intro">
            <h2>Get Summer-Ready in 6 Weeks</h2>
            <p className="lead">
              Summer Shred Lab is a results-driven 6-week program designed to burn fat, build lean muscle, and sharpen your conditioning — all before summer hits. Each 45-minute HIIT session combines the Technogym Skillrun, RowErg, and Nike Strength Half Rack in a rotating format that keeps every class intense and varied. Limited to 3 people per group so you get real coaching, not just a spot in a crowd.
            </p>
          </section>

          <section className="benefits-section">
            <h2>What You'll Get</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🔥</div>
                <h3>Fat Loss</h3>
                <p>High-output intervals on the Skillrun and RowErg maximise calorie burn during and after each session.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💪</div>
                <h3>Lean Muscle</h3>
                <p>Progressive strength work on the Nike Half Rack builds the muscle that gives your physique definition.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Conditioning</h3>
                <p>Rowing and sprint intervals push your cardiovascular capacity to a new ceiling over 6 weeks.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📈</div>
                <h3>Structured Progression</h3>
                <p>Each week builds on the last — load, distance, and intensity increase systematically so you keep improving.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">👥</div>
                <h3>Max 3 People</h3>
                <p>Small enough that your coach can correct form, adjust load, and push you at the right moments — every session.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🗓️</div>
                <h3>12 or 18 × 45-Min HIIT Sessions</h3>
                <p>2× or 3× per week over six weeks — choose the frequency that fits your schedule and ambition.</p>
              </div>
            </div>
          </section>

          <section className="for-whom-section">
            <h2>The Equipment</h2>
            <div className="for-whom-grid">
              <div className="for-whom-card">
                <h3>🏃 Technogym Skillrun</h3>
                <p>A performance treadmill built for speed and power. Reaches 30 km/h with negative incline capability, sprint simulation, sled and parachute resistance modes, and built-in HIIT programming — designed for athletes, not casual joggers.</p>
              </div>
              <div className="for-whom-card">
                <h3>🚣 Concept2 RowErg</h3>
                <p>The industry standard rowing machine. Full-body, low-impact, and brutally effective for cardiovascular conditioning and posterior chain strength.</p>
              </div>
              <div className="for-whom-card">
                <h3>🏋️ Nike Strength Half Rack</h3>
                <p>Premium rack setup with Olympic barbell and a full dumbbell range. Used for compound lifts — squats, presses, deadlifts, rows — to build functional strength and muscle.</p>
              </div>
            </div>
          </section>

          <section id="buy" className="class-options-section">
            <h2>Program Details</h2>
            <div className="class-options-grid">
              <div className="class-option-card featured">
                <span className="featured-badge">Limited to 3</span>
                <h3>Summer Shred Lab — 12 Classes</h3>
                <p className="class-size">Group of 3 — 6 Weeks</p>
                <p>The full program: structured progression, coached sessions, and the equipment to match. Run twice a week for six weeks.</p>
                <ul className="class-features">
                  <li>12 sessions total (2× per week)</li>
                  <li>45-minute HIIT format</li>
                  <li>Max 3 participants</li>
                  <li>Technogym Skillrun, RowErg & Nike Strength Half Rack</li>
                  <li>Progressive weekly structure</li>
                </ul>
                <div
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100057" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>
              <div className="class-option-card">
                <h3>Summer Shred Lab — 18 Classes</h3>
                <p className="class-size">Group of 3 — 6 Weeks</p>
                <p>Higher frequency, same timeframe. Three sessions per week over six weeks for maximum results before summer.</p>
                <ul className="class-features">
                  <li>18 sessions total (3× per week)</li>
                  <li>45-minute HIIT format</li>
                  <li>Max 3 participants</li>
                  <li>Technogym Skillrun, RowErg & Nike Strength Half Rack</li>
                  <li>Progressive weekly structure</li>
                </ul>
                <div
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100056" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>
            </div>
          </section>

          <section className="trainers-section">
            <h2>Your Coaches</h2>
            <div className="trainers-grid">
              <div className="trainer-mini-card">
                <img
                  src="/assets/images/elif.JPG"
                  alt="Elif Arzu Ogan - Summer Shred Lab"
                  width="400"
                  height="280"
                  loading="lazy"
                  decoding="async"
                />
                <h3>Elif Arzu Ogan</h3>
                <p className="trainer-cert">Head Trainer & Founder</p>
                <p>15+ years of strength and conditioning experience. Leads the program design and coaching.</p>
                <Link to="/trainer-elif" className="trainer-link">View Profile →</Link>
              </div>
              <div className="trainer-mini-card">
                <img
                  src="/assets/images/goknur.jpeg"
                  alt="Göknur Dipli - Summer Shred Lab"
                  width="400"
                  height="280"
                  loading="lazy"
                  decoding="async"
                />
                <h3>Göknur Dipli</h3>
                <p className="trainer-cert">Cardio & Conditioning Coach</p>
                <p>Specialist in metabolic conditioning and endurance-based training.</p>
                <Link to="/trainer-goknur" className="trainer-link">View Profile →</Link>
              </div>
            </div>
          </section>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>What fitness level do I need?</h3>
                <p>Intermediate and above. You should be comfortable with basic strength movements and able to sustain moderate-intensity cardio. If you're unsure, book a single session first and we'll assess together.</p>
              </div>
              <div className="faq-item">
                <h3>When does the program start?</h3>
                <p>Cohorts run on a rolling basis — when a group of 3 is confirmed, we set the start date together. Contact us to join the waitlist or to start with your own group.</p>
              </div>
              <div className="faq-item">
                <h3>Can I do this program if I've never rowed before?</h3>
                <p>Yes. We cover technique in the first session and scale intensity to your level. The RowErg is accessible to beginners when properly coached.</p>
              </div>
              <div className="faq-item">
                <h3>What should I eat during the program?</h3>
                <p>We recommend a moderate calorie deficit with high protein intake. We can point you toward general nutrition guidelines, though personalised diet plans require a registered dietitian.</p>
              </div>
              <div className="faq-item">
                <h3>What happens if I miss a session?</h3>
                <p>Since this is a group program, sessions can only be rescheduled if all three participants agree on a new time. Individual makeups are not possible — the group trains together or not at all.</p>
              </div>
            </div>
          </section>

          <section className="final-cta">
            <h2>Spots Fill Fast — Max 3 Per Group</h2>
            <p>Reserve your place in the next Summer Shred Lab cohort</p>
            <div className="cta-buttons">
              <a href="#buy" className="cta-button primary">Reserve Your Spot</a>
              <Link to="/pricing" className="cta-button secondary">View Pricing</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
