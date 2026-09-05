import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/Corporate.css';

export const Corporate= () => {
  useEffect(() => {
    trackPageView('/corporate', 'Corporate Pilates Amsterdam | For Business | PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Corporate Pilates Amsterdam | Bedrijfsfitness | PT Studio 7"
        description="Corporate Pilates and bedrijfsfitness Amsterdam for teams. Boutique Reformer at Museumplein or on-site mat sessions. Tax-friendly WKR options. Ask about corporate rates."
        keywords="corporate Pilates Amsterdam, bedrijfsfitness Amsterdam, corporate wellness Amsterdam, team Pilates Amsterdam, office Pilates Amsterdam, WKR pilates, bedrijfssport Amsterdam, Reformer Pilates teams"
        canonical="https://www.pt7.nl/corporate/"
        ogTitle="Corporate Pilates Amsterdam | For Business | PT Studio 7"
        ogDescription="Stronger backs, clearer heads, fewer sick days. Boutique Reformer Pilates for your team, at Museumplein or on-site at your office."
      />
      <StructuredData
        type="Service"
        data={{
          service: {
            name: 'Corporate Pilates Amsterdam',
            description:
              'Boutique Reformer and mat Pilates for teams, at PT Studio 7 Museumplein or on-site at your office. Small groups (max 5), certified instructors, tax-friendly employer options (WKR).',
            serviceUrl: 'https://www.pt7.nl/corporate/',
            areaServed: 'Amsterdam',
            offers: [
              { name: 'Studio team sessions', url: 'https://www.pt7.nl/corporate/' },
              { name: 'On-site office mat Pilates', url: 'https://www.pt7.nl/corporate/' },
            ],
          },
        }}
      />
      <Breadcrumbs items={[{ name: 'For Business', path: '/corporate' }]} />

      <div className="corporate-page">
        <section className="corporate-hero">
          <div className="corporate-hero-content">
            <h1>Corporate Pilates in Amsterdam | For Teams</h1>
            <p className="hero-subtitle">For Business</p>
            <p className="hero-description">
              Stronger backs, clearer heads, fewer sick days. Boutique Reformer Pilates for your team, at our Museumplein studio or on-site at your office.
            </p>
          </div>
        </section>

        <section className="corporate-pilates-rehab">
          <div className="corporate-container">
            <h2>Why teams train with PT Studio 7</h2>
            <p className="rehab-intro">
              Desk work wrecks posture, tight hips, stiff necks, lower-back pain. Certified instructors run focused small-group Reformer and mat sessions that undo exactly that. Max 5 per class means real attention. 15+ years expertise, minutes from Zuid.
            </p>
            <div className="rehab-grid">
              <div className="rehab-card">
                <h3>Undoes desk damage</h3>
                <p>Focused Reformer and mat work for tight hips, stiff necks, and lower-back pain, the exact issues long days at a laptop create.</p>
              </div>
              <div className="rehab-card">
                <h3>Max 5 per class</h3>
                <p>Small groups mean real coaching, not a crowded gym floor. Every person gets attention and safe progression.</p>
              </div>
              <div className="rehab-card">
                <h3>Minutes from Zuid</h3>
                <p>15+ years of expertise at our Museumplein studio, easy for teams based in Amsterdam Zuid and nearby.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="corporate-who">
          <div className="corporate-container">
            <h2>Two formats</h2>
            <div className="who-grid">
              <div className="who-card">
                <span className="who-icon">Studio</span>
                <h3>At our studio</h3>
                <p>Private small-group slot at Museumplein, as a recurring perk or a one-off team session.</p>
              </div>
              <div className="who-card">
                <span className="who-icon">On-site</span>
                <h3>At your office</h3>
                <p>We bring mat Pilates to you. Just floor space needed, no Reformer required on location.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="corporate-offer">
          <div className="corporate-container">
            <h2>Tax-friendly for employers (WKR)</h2>
            <div className="offer-grid">
              <div className="offer-card">
                <h3>Vrije ruimte</h3>
                <p>Reimburse a Pilates subscription from the employer&apos;s free space (vrije ruimte).</p>
              </div>
              <div className="offer-card">
                <h3>Cafetariamodel</h3>
                <p>Let employees pay pre-tax via a cafetariamodel salary swap, same mechanic as the bike plan, roughly cost-neutral for the company.</p>
              </div>
              <div className="offer-card">
                <h3>Nihilwaardering</h3>
                <p>On-site sessions at the company&apos;s own premises count as a workplace provision (nihilwaardering) and don&apos;t touch the free space.</p>
              </div>
            </div>
            <p className="corporate-disclaimer">
              Exact treatment depends on the employer&apos;s payroll setup; their own tax/payroll advisor confirms details.
            </p>
          </div>
        </section>

        <section className="corporate-how">
          <div className="corporate-container">
            <h2>How it works</h2>
            <div className="how-steps">
              <div className="how-step">
                <span className="step-number">1</span>
                <span className="step-title">Tell us team size + format</span>
                <p>Studio slot or on-site mat, share headcount and how often you want to train.</p>
              </div>
              <div className="how-step">
                <span className="step-number">2</span>
                <span className="step-title">Corporate rate + HR sheet</span>
                <p>We send a corporate rate and a one-page sheet HR can hand to payroll.</p>
              </div>
              <div className="how-step">
                <span className="step-number">3</span>
                <span className="step-title">We schedule and run it</span>
                <p>Sessions booked, instructors assigned, your team trains.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="corporate-cta">
          <div className="corporate-container">
            <h2>Ask about corporate rates</h2>
            <p>Email or WhatsApp, we&apos;ll reply with options for your team size and format.</p>
            <div className="cta-buttons">
              <a href="mailto:info@pt7.nl?subject=Corporate%20rates%20-%20For%20Business" className="cta-button primary">
                Email Us
              </a>
              <a
                href="https://wa.me/31685162693?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20corporate%20Pilates%20rates%20for%20our%20team."
                className="cta-button secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <p className="cta-note">Van Baerlestraat 76C, 1071BB Amsterdam (Museumplein, Oud-Zuid)</p>
          </div>
        </section>

        <section className="corporate-back">
          <div className="corporate-container">
            <div style={{ marginBottom: '1rem' }}>
              <h3>Related Service Pages</h3>
              <p>
                <Link to="/workouts/reformer-pilates/">Reformer Pilates</Link> ·{' '}
                <Link to="/healthcare-providers/">For Healthcare</Link> ·{' '}
                <Link to="/pricing/">Pricing</Link>
              </p>
            </div>
            <Link to="/" className="back-link">← Back to PT Studio 7</Link>
          </div>
        </section>
      </div>
    </>
  );
};
