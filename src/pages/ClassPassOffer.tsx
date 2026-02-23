import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import '../styles/ClassPassOffer.css';

export const ClassPassOffer = () => {
  return (
    <>
      <SEOHead
        title="ClassPass Members Exclusive Offer | PT Studio 7 Amsterdam"
        description="Special offer for ClassPass members. Save up to 40% when you join PT Studio 7 directly. Same great Pilates classes, better value, more perks."
        keywords="ClassPass Amsterdam, Pilates ClassPass, ClassPass offer, Pilates membership Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/classpass-offer"
        ogTitle="ClassPass Members: Exclusive Offer Inside"
        ogDescription="Stop paying premium ClassPass credits. Join PT Studio 7 directly and save up to 40% per class."
      />
      <Breadcrumbs items={[{ name: 'ClassPass Offer', path: '/classpass-offer' }]} />

      <div className="classpass-offer-page">
        {/* Hero Section */}
        <section className="cp-hero">
          <div className="cp-hero-overlay">
            <div className="cp-hero-content">
              <span className="cp-badge">ClassPass Members Only</span>
              <h1>Love Our Classes?<br />Get More for Less.</h1>
              <p className="cp-hero-subtitle">
                You've discovered PT Studio 7 through ClassPass. Now discover how much you can save by joining us directly.
              </p>
              <a href="#offer" className="cp-cta-button">See Your Savings</a>
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="cp-comparison" id="offer">
          <h2>The Real Cost Comparison</h2>
          <p className="section-subtitle">Our classes cost 13-20 credits on ClassPass. Here's what that really means.</p>
          
          <div className="comparison-grid">
            <div className="comparison-card classpass-card">
              <div className="card-header">
                <img src="https://cdn9.classpass.com/dist/gfe-v2/_next/static/media/logotype.f52b0a12.svg" alt="ClassPass" className="cp-logo" />
                <span className="card-label">ClassPass (for 4 classes/month)</span>
              </div>
              <div className="card-body">
                <div className="price-row">
                  <span>Plan needed (68 credits)</span>
                  <span className="price strike">€99/month</span>
                </div>
                <div className="price-row">
                  <span>Cost per class</span>
                  <span className="price strike">~€25</span>
                </div>
                <div className="price-row">
                  <span>Priority booking</span>
                  <span className="price no">Last in line</span>
                </div>
                <div className="price-row">
                  <span>Same instructor</span>
                  <span className="price no">✗</span>
                </div>
                <div className="price-row">
                  <span>Progress tracking</span>
                  <span className="price no">✗</span>
                </div>
              </div>
            </div>

            <div className="comparison-card direct-card featured">
              <div className="card-ribbon">Save €13+</div>
              <div className="card-header">
                <img src="/assets/images/pt7logo.png" alt="PT Studio 7" className="pt7-logo" />
                <span className="card-label">Direct Membership (4 classes/month)</span>
              </div>
              <div className="card-body">
                <div className="price-row highlight">
                  <span>Monthly cost</span>
                  <span className="price">€86/month</span>
                </div>
                <div className="price-row highlight">
                  <span>Cost per class</span>
                  <span className="price">€21.50</span>
                </div>
                <div className="price-row">
                  <span>Priority booking</span>
                  <span className="price yes">First access</span>
                </div>
                <div className="price-row">
                  <span>Same instructor</span>
                  <span className="price yes">✓</span>
                </div>
                <div className="price-row">
                  <span>Progress tracking</span>
                  <span className="price yes">✓</span>
                </div>
              </div>
            </div>
          </div>

          <div className="savings-highlight">
            <span className="savings-number">€156/year</span>
            <span className="savings-text">saved with direct membership (€13/month × 12)</span>
          </div>
        </section>

        {/* Exclusive Offer */}
        <section className="cp-exclusive-offer">
          <div className="offer-container">
            <span className="offer-badge">ClassPass Converter Special</span>
            <h2>Your First Month: 20% Off</h2>
            <p className="offer-description">
              Switch from ClassPass to our 4-class or 8-class monthly membership and get <strong>20% off your first month</strong>.
            </p>
            <div className="offer-details">
              <div className="offer-item">
                <h4>4 Classes/Month</h4>
                <p className="original-price">€86</p>
                <p className="offer-price">€69</p>
                <p className="per-class">Just €17.25/class</p>
              </div>
              <div className="offer-item">
                <h4>8 Classes/Month</h4>
                <p className="original-price">€160</p>
                <p className="offer-price">€128</p>
                <p className="per-class">Just €16/class</p>
              </div>
            </div>
            <p className="offer-note">Contact us to get your discount code. Valid for new direct members only.</p>
            <Link to="/pricing" className="cp-cta-button">View All Membership Options</Link>
          </div>
        </section>

        {/* Why Switch */}
        <section className="cp-benefits">
          <h2>Why Members Love Being Direct</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">📅</span>
              <h3>Priority Booking</h3>
              <p>Book classes before they open to ClassPass. Never miss your favorite time slot again.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">👩‍🏫</span>
              <h3>Your Instructor Knows You</h3>
              <p>Build a real relationship. Your instructor tracks your progress and tailors corrections to you.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📈</span>
              <h3>Track Your Progress</h3>
              <p>Your instructor remembers your history and tracks your improvement over time.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🎯</span>
              <h3>Real Progress</h3>
              <p>When you commit to one studio, you see real results. Our members transform in 8-12 weeks.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">👥</span>
              <h3>Community</h3>
              <p>Join our WhatsApp group, member events, and workshops. You're not just a booking—you're family.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💰</span>
              <h3>Better Value</h3>
              <p>More classes, lower price, better experience. It's a no-brainer.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="cp-testimonials">
          <h2>From ClassPass to Committed</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "I was hopping between 5 different studios on ClassPass. When I found PT Studio 7, I knew I had to commit. 
                The small groups (max 5!) and personal attention are worth so much more than the 'variety' I thought I needed."
              </p>
              <p className="testimonial-author">— Sarah M., Member since 2025</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "With ClassPass I was always scrambling for spots and never saw the same instructor twice. 
                Now I have my regular slot, my instructor knows my weak points, and I've made actual progress."
              </p>
              <p className="testimonial-author">— Marc V., Former ClassPass user</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The booking stress alone was worth switching. With ClassPass I'd refresh at midnight hoping for a spot. 
                Now I book a week in advance with no drama."
              </p>
              <p className="testimonial-author">— Anna K., Member since 2025</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cp-faq">
          <h2>Questions?</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I still use ClassPass occasionally?</h4>
              <p>Of course! But once you see the value of direct membership, you probably won't want to.</p>
            </div>
            <div className="faq-item">
              <h4>What if I'm not ready to commit?</h4>
              <p>Try our 5-class pack (€35/class, valid 5 weeks). No subscription, no commitment. See if we're the right fit.</p>
            </div>
            <div className="faq-item">
              <h4>How do I claim the 20% off?</h4>
              <p>Email us at info@ptstudio7amsterdam.nl or ask at the studio to get your discount code.</p>
            </div>
            <div className="faq-item">
              <h4>Is the class experience different?</h4>
              <p>The class is the same high quality. But as a member, you get priority booking, progress tracking, and instructors who know your goals.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cp-final-cta">
          <h2>Ready to Make the Switch?</h2>
          <p>Join the members who've upgraded from ClassPass credits to real community.</p>
          <div className="cta-buttons">
            <Link to="/pricing" className="cp-cta-button primary">View Membership Options</Link>
            <Link to="/schedule" className="cp-cta-button secondary">Try a Class First</Link>
          </div>
        </section>
      </div>
    </>
  );
};
