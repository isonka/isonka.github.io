import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import '../styles/ClassPassOffer.css';

export const ClassPassOffer = () => {
  return (
    <>
      <SEOHead
        title="ClassPass Transition Offer | PT Studio 7 Amsterdam"
        description="A clear transition offer for ClassPass clients moving to PT Studio 7 direct pricing. Compare costs and claim 20% off eligible first purchases."
        keywords="ClassPass Amsterdam, Pilates ClassPass, ClassPass offer, Pilates membership Amsterdam"
        canonical="https://www.pt7.nl/classpass-offer"
        ogTitle="ClassPass Clients: PT Studio 7 Direct Offer"
        ogDescription="Compare ClassPass costs with PT Studio 7 direct pricing and claim your transition discount."
      />
      <Breadcrumbs items={[{ name: 'ClassPass Offer', path: '/classpass-offer' }]} />

      <div className="classpass-offer-page">
        {/* Hero Section */}
        <section className="cp-hero">
          <div className="cp-hero-overlay">
            <div className="cp-hero-content">
              <span className="cp-badge">For ClassPass Clients</span>
              <h1>Prefer PT Studio 7?<br />Book Direct.</h1>
              <p className="cp-hero-subtitle">
                If you already train with us through ClassPass, this page shows the direct pricing difference and your transition discount.
              </p>
              <a href="#offer" className="cp-cta-button hero-cta">View Offer Details</a>
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="cp-comparison" id="offer">
          <h2>Cost Comparison</h2>
          <p className="section-subtitle">Our classes typically cost 13-20 credits on ClassPass. Here is a direct monthly comparison.</p>
          
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

            <div className="comparison-card direct-card">
              <div className="card-header">
                <img src="/assets/images/ts_logo.png" alt="PT Studio 7" className="pt7-logo" />
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
            <span className="savings-text">estimated yearly savings on a 4-class monthly plan</span>
          </div>
        </section>

        {/* Exclusive Offer */}
        <section className="cp-exclusive-offer">
          <div className="offer-container">
            <span className="offer-badge">Transition Offer</span>
            <h2>20% Off Your First Eligible Purchase</h2>
            <p className="offer-description">
              Switch from ClassPass and get <strong>20% off your first month</strong> on all monthly plans, plus <strong>20% off your first purchase</strong> on class packs and private, couple, or trio packages.
            </p>
            <div className="offer-details">
              <div className="offer-item">
                <h4>4 Classes/Month</h4>
                <p className="original-price">€86</p>
                <p className="offer-price">€69</p>
                <p className="per-class">€17.25 per class</p>
              </div>
              <div className="offer-item">
                <h4>8 Classes/Month</h4>
                <p className="original-price">€160</p>
                <p className="offer-price">€128</p>
                <p className="per-class">€16 per class</p>
              </div>
            </div>
            <p className="offer-note">Contact us for your discount code. Available for new direct clients on eligible first purchases.</p>
            <Link to="/pricing" className="cp-cta-button offer-cta">View All Pricing Options</Link>
          </div>
        </section>

        {/* Why Switch */}
        <section className="cp-benefits">
          <h2>Why Clients Switch to Direct Booking</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">Booking</span>
              <h3>Priority Booking</h3>
              <p>Access classes earlier than ClassPass release windows.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">Coaching</span>
              <h3>Your Instructor Knows You</h3>
              <p>Train more consistently with instructors who know your history and goals.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">Progress</span>
              <h3>Track Your Progress</h3>
              <p>Build continuity across sessions instead of starting from zero each visit.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">Results</span>
              <h3>Real Progress</h3>
              <p>Consistent training in one studio usually leads to better long-term results.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">Community</span>
              <h3>Community</h3>
              <p>Join member updates, workshops, and events at the studio.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">Value</span>
              <h3>Better Value</h3>
              <p>Direct plans are often more predictable in both availability and cost.</p>
            </div>
          </div>
        </section>

        {/* Client Observations */}
        <section className="cp-testimonials">
          <h2>What We Hear Most Often</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                More stable scheduling makes it easier to train consistently.
              </p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                Working with familiar instructors improves continuity from week to week.
              </p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                Direct plans feel simpler for clients who already train here regularly.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cp-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I still use ClassPass occasionally?</h4>
              <p>Yes. Many clients use direct plans as their main option and keep ClassPass for occasional flexibility.</p>
            </div>
            <div className="faq-item">
              <h4>What if I'm not ready to commit?</h4>
              <p>You can start with a class pack. It has no recurring subscription and lets you test the studio rhythm first.</p>
            </div>
            <div className="faq-item">
              <h4>How do I claim the 20% off?</h4>
              <p>Email us at info@pt7.nl or ask at the studio to get your discount code for eligible monthly plans and first-time package purchases.</p>
            </div>
            <div className="faq-item">
              <h4>Is the class experience different?</h4>
              <p>The class method is the same. Direct clients mainly benefit from earlier booking access and better continuity with instructors.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cp-final-cta">
          <h2>Ready to Switch to Direct?</h2>
          <p>Review pricing options and choose the format that fits your schedule.</p>
          <div className="cta-buttons">
            <Link to="/pricing" className="cp-cta-button primary">View Pricing Options</Link>
            <Link to="/schedule" className="cp-cta-button secondary">View Schedule</Link>
          </div>
        </section>
      </div>
    </>
  );
};
