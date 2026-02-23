import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/HealthcareProviders.css';

export const HealthcareProviders: React.FC = () => {
  useEffect(() => {
    trackPageView('/healthcare-providers', 'For Healthcare Providers - PT Studio 7 Amsterdam');
  }, []);

  return (
    <>
      <SEOHead
        title="Refer Your Clients | For Healthcare Providers | PT Studio 7 Amsterdam"
        description="Physiotherapists, GPs, and healthcare providers: refer your clients to PT Studio 7 for post-rehab Pilates and functional training. Small groups, expert instructors, Museumplein."
        keywords="physiotherapist referral Amsterdam, Pilates post-rehab, fysiotherapeut doorverwijzing, beweegprogramma Amsterdam, Pilates fysiotherapie"
        canonical="https://www.ptstudio7amsterdam.nl/healthcare-providers"
        ogTitle="Refer Your Clients | For Healthcare Providers | PT Studio 7"
        ogDescription="Partner with PT Studio 7. Refer your clients for post-rehab Pilates and functional training. Small groups, expert instructors."
      />
      <Breadcrumbs items={[{ name: 'For Healthcare Providers', path: '/healthcare-providers' }]} />

      <div className="healthcare-page">
        <section className="healthcare-hero">
          <div className="healthcare-hero-content">
            <h1>For Healthcare Providers</h1>
            <p className="hero-subtitle">Refer Your Clients to PT Studio 7</p>
            <p className="hero-description">
              Partner with Amsterdam&apos;s boutique Pilates and fitness studio. We offer a trusted destination for your clients after rehabilitation — Pilates, functional training, and small-group sessions designed to support long-term recovery and strength.
            </p>
          </div>
        </section>

        <section className="healthcare-pilates-rehab">
          <div className="healthcare-container">
            <h2>Why Pilates for Rehabilitation</h2>
            <p className="rehab-intro">
              Pilates is widely used in rehabilitation because it supports the goals you set in treatment: controlled movement, core stability, and progressive strength without high impact.
            </p>
            <div className="rehab-grid">
              <div className="rehab-card">
                <h3>Controlled, Low-Impact Movement</h3>
                <p>Pilates equipment provides resistance through springs, allowing clients to load tissues gradually and safely. Movement is guided and adjustable — ideal for post-surgery, chronic back pain, or joint limitations.</p>
              </div>
              <div className="rehab-card">
                <h3>Core Stability & Posture</h3>
                <p>Pilates targets deep stabilisers and alignment. This supports spinal health, reduces compensatory patterns, and builds the foundation for functional movement — directly reinforcing what you work on in treatment.</p>
              </div>
              <div className="rehab-card">
                <h3>Body Awareness & Proprioception</h3>
                <p>Clients learn to sense and control movement more precisely. This improves movement quality and reduces re-injury risk, especially after discharge when they return to daily and sporting activities.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="healthcare-who">
          <div className="healthcare-container">
            <h2>Who We Work With</h2>
            <div className="who-grid">
              <div className="who-card">
                <span className="who-icon">Fysiotherapeuten</span>
                <h3>Physiotherapists</h3>
                <p>Post-rehab clients ready for movement and strength. Equipment Pilates and functional training complement your treatment plan.</p>
              </div>
              <div className="who-card">
                <span className="who-icon">Huisartsen</span>
                <h3>General Practitioners</h3>
                <p>Patients needing structured exercise for chronic conditions, mobility, or general fitness. We can work with your recommendations.</p>
              </div>
              <div className="who-card">
                <span className="who-icon">Specialisten</span>
                <h3>Medical Specialists</h3>
                <p>Post-surgery, post-injury, or ongoing care. Small groups (max 5) and private sessions allow for tailored modifications.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="healthcare-how">
          <div className="healthcare-container">
            <h2>How Referrals Work</h2>
            <div className="how-steps">
              <div className="how-step">
                <span className="step-number">1</span>
                <span className="step-title">You refer your client</span>
                <p>Send us the client&apos;s name and a brief note (e.g. post-LBP, post-ACL, chronic back). Email or WhatsApp.</p>
              </div>
              <div className="how-step">
                <span className="step-number">2</span>
                <span className="step-title">We schedule an intro</span>
                <p>We contact the client to arrange a private or small-group session. We take into account any limitations you share.</p>
              </div>
              <div className="how-step">
                <span className="step-number">3</span>
                <span className="step-title">Client continues training</span>
                <p>Pilates and functional training support ongoing strength, mobility, and recovery. We can provide feedback when you request it.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="healthcare-offer">
          <div className="healthcare-container">
            <h2>What We Offer Your Clients</h2>
            <div className="offer-grid">
              <div className="offer-card">
                <h3>Equipment Pilates</h3>
                <p>Spring-based resistance allows gradual, controlled loading — ideal for post-rehab. Builds core stability, posture, and flexibility. Every exercise can be modified for injuries and limitations.</p>
              </div>
              <div className="offer-card">
                <h3>Functional Training</h3>
                <p>Strength training with Nike equipment. Builds stability and functional capacity. Can be adapted for post-rehab.</p>
              </div>
              <div className="offer-card">
                <h3>Small Groups</h3>
                <p>Maximum 5 participants per class. Personalized attention and safe progression.</p>
              </div>
              <div className="offer-card">
                <h3>Private Sessions</h3>
                <p>One-on-one training for clients who need more control or individual programming.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="healthcare-benefits">
          <div className="healthcare-container">
            <h2>Benefits for You</h2>
            <ul className="benefits-list">
              <li>Pilates reinforces your treatment goals — controlled movement, core stability, progressive loading</li>
              <li>A trusted destination for clients after discharge</li>
              <li>Continuity of care — clients stay active and reduce relapse risk</li>
              <li>Simple referral process — no paperwork, just a quick message</li>
              <li>Professional studio with qualified instructors and 15+ years experience</li>
            </ul>
          </div>
        </section>

        <section className="healthcare-cta">
          <div className="healthcare-container">
            <h2>Start Referring</h2>
            <p>Email or WhatsApp with your client&apos;s name and a brief note. We&apos;ll take it from there.</p>
            <div className="cta-buttons">
              <a href="mailto:info@ptstudio7amsterdam.nl?subject=Referral%20-%20Healthcare%20Provider" className="cta-button primary">
                Email Referral
              </a>
              <a href="https://wa.me/31685162693?text=Hi%2C%20I%27d%20like%20to%20refer%20a%20client%20to%20PT%20Studio%207." className="cta-button secondary" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
            <p className="cta-note">Van Baerlestraat 76C, 1071BB Amsterdam (Museumplein, Oud-Zuid)</p>
          </div>
        </section>

        <section className="healthcare-back">
          <div className="healthcare-container">
            <Link to="/" className="back-link">← Back to PT Studio 7</Link>
          </div>
        </section>
      </div>
    </>
  );
};
