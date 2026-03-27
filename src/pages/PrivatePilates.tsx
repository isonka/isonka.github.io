import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const faqs = [
  {
    question: 'What is the difference between private and group Pilates?',
    answer: 'In a private session your instructor is 100% focused on you. The program is built around your specific goals, movement patterns, injuries, and fitness level. Group classes follow a set structure suitable for all participants. Private sessions allow for deeper technical work, more frequent adjustments, and faster progress — especially for beginners, people recovering from injury, or clients with specific goals like pregnancy, back pain, or athletic performance.',
  },
  {
    question: 'How many people are in a private session?',
    answer: 'Private sessions can be one-on-one (just you and your instructor), duo (you and a partner), or trio (you and two friends). All formats offer fully customized programming. Duo and trio sessions are great for people who want the benefits of private training at a lower price per person.',
  },
  {
    question: 'How often should I do private Pilates sessions?',
    answer: 'For beginners or people with specific goals (injury rehab, pregnancy, postural correction), we recommend 2 sessions per week to start. Once you have a solid foundation, 1 session per week combined with group classes works very well. Your instructor will advise what is best for your individual situation.',
  },
  {
    question: 'Do I need experience before starting private Pilates?',
    answer: 'No experience needed at all. Private sessions are actually the best way to start Pilates, because you learn the fundamentals correctly from day one. Your instructor explains every movement, corrects your form, and builds your program progressively.',
  },
  {
    question: 'Can I book a trial session before committing to a package?',
    answer: 'Yes. We offer a single private session so you can experience the studio, meet your instructor, and decide if it is the right fit. Many clients start with a single session and then move to a package for better value.',
  },
  {
    question: 'What equipment is used in private Pilates sessions?',
    answer: 'Depending on your goals, private sessions at PT Studio 7 can include the Reformer, Tower Reformer, Cadillac (Trapeze Table), Wunda Chair, Ladder Barrel, and Spine Corrector — the full suite of classical Pilates apparatus. Your instructor selects the most appropriate equipment for each session.',
  },
];

export const PrivatePilates: React.FC = () => {
  useEffect(() => {
    trackPageView('/private-pilates-amsterdam', 'Private Pilates Amsterdam | PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Private Reformer Pilates Sessions Amsterdam | PT Studio 7"
        description="One-on-one private Reformer Pilates sessions at Museumplein Amsterdam. 100% personalised training with certified instructors. Duo & trio options available. Book now."
        keywords="private pilates amsterdam, privé pilates amsterdam, one on one pilates amsterdam, personal pilates amsterdam, pilates prive les amsterdam, prive pilates museumplein, privé reformer pilates, priveles pilates amsterdam"
        canonical="https://www.pt7.nl/private-pilates-amsterdam"
        ogTitle="Private Reformer Pilates Amsterdam | PT Studio 7 Museumplein"
        ogDescription="100% personalised private Pilates sessions at Museumplein. One-on-one, duo or trio. Certified instructors with 15+ years experience."
      />
      <StructuredData
        type="FAQPage"
        data={{ faqs }}
      />
      <Breadcrumbs items={[{ name: 'Private Pilates Amsterdam', path: '/private-pilates-amsterdam' }]} />

      <div className="service-page">
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>Private Reformer Pilates Sessions Amsterdam</h1>
            <p>
              100% personalised training — your goals, your pace, your program. One-on-one or
              small private groups at our boutique studio at Museumplein.
            </p>
            <div className="service-hero-badges">
              <span className="service-badge">One-on-one</span>
              <span className="service-badge">Duo & Trio</span>
              <span className="service-badge">All levels welcome</span>
              <span className="service-badge">Museumplein Amsterdam</span>
            </div>
            <Link to="/schedule" className="service-hero-btn">Book a Private Session</Link>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Why private Pilates?</h2>
            <p>
              Group classes are energising and social — but there is a ceiling to how much attention
              one instructor can give to five people at once. Private sessions remove that ceiling
              entirely. Your instructor has one job: to make your session as effective as possible
              for you, specifically.
            </p>
            <p>
              At PT Studio 7, private sessions are the format we are most proud of. Every program
              is built from scratch after an intake conversation about your goals, movement history,
              injuries, and schedule. The session evolves week by week as your strength, mobility,
              and body awareness develop.
            </p>
            <p>
              Whether you are a complete beginner wanting to learn proper technique, an athlete
              looking to improve performance and prevent injury, someone recovering from a back
              injury or surgery, or a pregnant or postpartum woman needing specialist guidance —
              private sessions at PT Studio 7 are designed to deliver real results, not just a
              good workout.
            </p>
            <p>
              We use the full suite of classical Pilates apparatus: Reformer, Tower Reformer,
              Cadillac, Wunda Chair, Ladder Barrel, and Spine Corrector. Your instructor selects
              the right tools for each phase of your program.
            </p>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Private session formats</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>One-on-One</h3>
                <p>Just you and your instructor. Maximum focus, maximum progress. Ideal for beginners, injury rehabilitation, pregnancy, or anyone who wants the most personalised experience possible.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Duo Session</h3>
                <p>Train with a partner — friend, spouse, or colleague. You share the cost while still receiving far more personal attention than in a group class. Programs can be shared or partially individualised.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Trio Session</h3>
                <p>Up to three people training together. Great for friends or colleagues with similar goals. The instructor structures the session so each person gets meaningful individual attention.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Flexible scheduling</h3>
                <p>Private sessions can be scheduled at any time within our opening hours, including early morning and evenings. We work around your calendar.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Full equipment access</h3>
                <p>Private sessions give you access to all of our Pilates apparatus — Reformer, Cadillac, Wunda Chair, Ladder Barrel — not just the equipment available in group classes.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Injury & special needs</h3>
                <p>Recovering from back surgery, a knee injury, or chronic pain? Our instructors work closely with physiotherapists and can safely incorporate rehabilitation protocols into your sessions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Frequently asked questions</h2>
            <div className="service-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="service-faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="service-cta-section">
          <h2>Ready to start?</h2>
          <p>
            Book your first private session online, or contact us if you have questions about which
            format is right for you.
          </p>
          <div className="service-cta-buttons">
            <Link to="/schedule" className="service-cta-btn-primary">Book a Private Session</Link>
            <Link to="/pricing" className="service-cta-btn-secondary">View Pricing</Link>
          </div>
        </section>
      </div>
    </>
  );
};
