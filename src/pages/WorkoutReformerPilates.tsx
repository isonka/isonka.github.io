import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { trackPageView } from '../utils/gtmTracking';
import { useEffect } from 'react';
import '../styles/WorkoutDetail.css';

export const WorkoutReformerPilates: React.FC = () => {
  useEffect(() => {
    trackPageView('/workouts/reformer-pilates', 'Reformer Pilates - PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Reformer Pilates Amsterdam Museumplein | PT Studio 7"
        description="Expert Reformer Pilates classes in Amsterdam at Museumplein. Small group classes (max 5) & private sessions. Strengthen core, improve flexibility, perfect posture. Book now!"
        keywords="Reformer Pilates Amsterdam, Pilates Museumplein, Reformer classes Amsterdam, core strength training, flexibility training Amsterdam, posture correction, small group Pilates, Reformer Pilates lessen, buikspieren training Amsterdam, houding verbeteren"
        canonical="https://www.ptstudio7amsterdam.nl/workouts/reformer-pilates"
        ogTitle="Reformer Pilates Amsterdam | PT Studio 7 Museumplein"
        ogDescription="Premium Reformer Pilates studio at Museumplein. Small groups (max 5), expert instructors. Build core strength, flexibility & perfect posture."
        ogImage="/assets/images/reformer.jpg"
      />

      <div className="workout-detail-page">
        {/* Hero Section */}
        <section className="workout-hero" style={{ backgroundImage: 'url(/assets/images/reformer.jpg)' }}>
          <div className="workout-hero-overlay">
            <div className="workout-hero-content">
              <h1>Reformer Pilates</h1>
              <p className="workout-tagline">Full-body workout focusing on core strength, flexibility, and posture</p>
              <Link to="/schedule" className="cta-button">Book a Class</Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="workout-content">
          <section className="workout-intro">
            <h2>Transform Your Body with Reformer Pilates</h2>
            <p className="lead">
              Reformer Pilates is a dynamic, full-body workout that uses specialized equipment to create resistance and support. At PT Studio 7, our expert instructors guide you through controlled, precise movements that strengthen your core, improve flexibility, and enhance your overall body awareness.
            </p>
          </section>

          {/* Benefits Grid */}
          <section className="benefits-section">
            <h2>Why Choose Reformer Pilates?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">💪</div>
                <h3>Core Strength</h3>
                <p>Build deep core stability and strength that supports your entire body, improving balance and preventing injury.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🤸‍♀️</div>
                <h3>Flexibility</h3>
                <p>Increase your range of motion and flexibility through controlled stretching and lengthening movements.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🧘‍♀️</div>
                <h3>Posture Perfection</h3>
                <p>Correct imbalances and improve alignment for better posture in everyday life and reduced back pain.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Full-Body Toning</h3>
                <p>Target every muscle group with precision for a balanced, toned physique without bulk.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🧠</div>
                <h3>Mind-Body Connection</h3>
                <p>Develop body awareness and mindful movement through focused, intentional exercises.</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">♿</div>
                <h3>Low Impact</h3>
                <p>Safe for all fitness levels and ages, with minimal stress on joints while building strength.</p>
              </div>
            </div>
          </section>

          {/* Who Is It For */}
          <section className="for-whom-section">
            <h2>Perfect For</h2>
            <div className="for-whom-grid">
              <div className="for-whom-card">
                <h3>🆕 Beginners</h3>
                <p>New to Pilates? Our instructors provide modifications and guidance to help you master the basics safely.</p>
              </div>
              <div className="for-whom-card">
                <h3>🏃‍♀️ Athletes</h3>
                <p>Enhance your performance with improved core strength, flexibility, and injury prevention.</p>
              </div>
              <div className="for-whom-card">
                <h3>🤰 Pregnant Women</h3>
                <p>Safe prenatal training in private sessions to maintain strength and prepare for childbirth.</p>
              </div>
              <div className="for-whom-card">
                <h3>🩹 Injury Recovery</h3>
                <p>Low-impact rehabilitation that rebuilds strength and mobility under expert supervision.</p>
              </div>
              <div className="for-whom-card">
                <h3>👴 Active Aging</h3>
                <p>Prevent muscle loss and maintain strength, mobility, balance, and independence with gentle yet effective exercises.</p>
              </div>
              <div className="for-whom-card">
                <h3>💼 Desk Workers</h3>
                <p>Combat sitting-related issues with posture correction and back-strengthening exercises.</p>
              </div>
            </div>
          </section>

          {/* Class Options */}
          <section className="class-options-section">
            <h2>Class Options</h2>
            <div className="class-options-grid">
              <div className="class-option-card">
                <h3>Small Group Classes</h3>
                <p className="class-size">Maximum 5 People</p>
                <p>Experience Reformer Pilates in an intimate group setting with personalized attention. Perfect for those who enjoy the energy of working out with others.</p>
                <ul className="class-features">
                  <li>45-minute sessions</li>
                  <li>From €28 per class</li>
                  <li>All fitness levels welcome</li>
                  <li>Energizing group atmosphere</li>
                </ul>
                <Link to="/pricing" className="class-option-btn">View Group Pricing</Link>
              </div>
              <div className="class-option-card featured">
                <span className="featured-badge">Most Personal</span>
                <h3>Private Classes</h3>
                <p className="class-size">One-on-One</p>
                <p>Get 100% of your instructor's attention with fully customized workouts tailored to your goals, injuries, or specific needs.</p>
                <ul className="class-features">
                  <li>45-minute personalized sessions</li>
                  <li>From €70 per class</li>
                  <li>Fully customized program</li>
                  <li>Flexible scheduling</li>
                </ul>
                <Link to="/pricing" className="class-option-btn">View Private Pricing</Link>
              </div>
            </div>
          </section>

          {/* Equipment Showcase */}
          <section className="equipment-section">
            <h2>Our Reformer Equipment</h2>
            <p className="section-subtitle">We use professional-grade Reformer Pilates equipment that provides smooth, adjustable resistance for optimal results.</p>
            <div className="equipment-highlight">
              <div className="equipment-info">
                <h3>Premium Reformer Machines</h3>
                <p>Our studio features state-of-the-art Reformer machines with:</p>
                <ul>
                  <li>✓ Adjustable spring resistance for all fitness levels</li>
                  <li>✓ Smooth gliding carriage for precise movements</li>
                  <li>✓ Comfortable padding and ergonomic design</li>
                  <li>✓ Multiple straps and bars for exercise variety</li>
                  <li>✓ Regularly maintained for safety and performance</li>
                </ul>
                <Link to="/equipment/reformer" className="learn-more-link">Learn More About Our Equipment →</Link>
              </div>
            </div>
          </section>

          {/* Trainers */}
          <section className="trainers-section">
            <h2>Meet Your Expert Instructors</h2>
            <div className="trainers-grid">
              <div className="trainer-mini-card">
                <img 
                  src="/assets/images/elif.JPG" 
                  alt="Elif Arzu Ogan - Reformer Pilates Instructor" 
                  width="400" 
                  height="280" 
                  loading="lazy" 
                  decoding="async" 
                />
                <h3>Elif Arzu Ogan</h3>
                <p className="trainer-cert">Senior Polestar Pilates Instructor</p>
                <p>15+ years experience, specializing in injury recovery and spinal health</p>
                <Link to="/trainer-elif" className="trainer-link">View Profile →</Link>
              </div>
              <div className="trainer-mini-card">
                <img 
                  src="/assets/images/gokben.jpeg" 
                  alt="Gökben Öztekin - Basi Pilates Instructor" 
                  width="400" 
                  height="280" 
                  loading="lazy" 
                  decoding="async" 
                />
                <h3>Gökben Öztekin</h3>
                <p className="trainer-cert">Basi Pilates Instructor</p>
                <p>Pilates Instructor</p>
                <Link to="/trainer-gokben" className="trainer-link">View Profile →</Link>
              </div>
              <div className="trainer-mini-card">
                <img 
                  src="/assets/images/goknur.jpeg" 
                  alt="Göknur Dipli - Reformer Pilates Instructor" 
                  width="400" 
                  height="280" 
                  loading="lazy" 
                  decoding="async" 
                />
                <h3>Göknur Dipli</h3>
                <p className="trainer-cert">Senior Polestar Pilates Instructor</p>
                <p>12+ years experience in Reformer Pilates and strength training</p>
                <Link to="/trainer-goknur" className="trainer-link">View Profile →</Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Do I need Pilates experience?</h3>
                <p>No! We welcome complete beginners. Our instructors provide modifications and guidance for all fitness levels.</p>
              </div>
              <div className="faq-item">
                <h3>What should I wear?</h3>
                <p>Wear comfortable, fitted athletic clothing that allows you to move freely. Avoid loose clothing that might get caught in the equipment. Grip socks are recommended (available for purchase at our studio).</p>
              </div>
              <div className="faq-item">
                <h3>How often should I practice Reformer Pilates?</h3>
                <p>For best results, we recommend 2-3 sessions per week. Consistency is key to seeing improvements in strength, flexibility, and posture.</p>
              </div>
              <div className="faq-item">
                <h3>Can I do Reformer Pilates if I have injuries?</h3>
                <p>Yes! Reformer Pilates is excellent for rehabilitation. Please inform your instructor about any injuries before class so they can provide appropriate modifications.</p>
              </div>
              <div className="faq-item">
                <h3>How is Reformer Pilates different from mat Pilates?</h3>
                <p>Reformer Pilates uses specialized equipment with springs for resistance, offering more variety, support, and challenge. It's excellent for beginners and advanced practitioners alike.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="final-cta">
            <h2>Ready to Transform Your Body?</h2>
            <p>Join us for a Reformer Pilates class at our premium Museumplein location</p>
            <div className="cta-buttons">
              <Link to="/schedule" className="cta-button primary">Book Your Class</Link>
              <Link to="/pricing" className="cta-button secondary">View Pricing</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

