import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const faqs = [
  {
    question: 'What strength training equipment does PT Studio 7 have?',
    answer: 'Our strength studio is equipped with Nike premium equipment: a half rack with an Olympic barbell, a full set of dumbbells, kettlebells, a Technogym SkillRun treadmill, and a Concept2 RowErg rowing machine. It is a fully equipped functional training space designed for high-quality small group and personal training.',
  },
  {
    question: 'Is strength training combined with Pilates at PT Studio 7?',
    answer: 'Often, yes. Many of our clients train in both studios. Pilates and strength training complement each other perfectly: Pilates builds deep core stability, postural alignment, and movement quality; strength training adds power, muscle mass, and metabolic conditioning. Our instructors can design an integrated program that uses both.',
  },
  {
    question: 'Do I need prior experience for strength training at PT Studio 7?',
    answer: 'No prior experience is needed. We start with a movement assessment to understand your baseline, identify any imbalances or limitations, and set appropriate starting weights. Beginners are very welcome — and actually benefit enormously from the personalised instruction we offer in private and small group sessions.',
  },
  {
    question: 'Is strength training suitable for women who want to tone without bulk?',
    answer: 'Absolutely. Gaining large amounts of muscle mass requires very specific training conditions, high caloric intake, and often years of dedicated effort. What most women experience from strength training is a leaner, more defined physique — not bulk. Our instructors are experienced in programming for body composition goals in a way that is both effective and sustainable.',
  },
  {
    question: 'Can strength training help with back pain?',
    answer: 'Yes — in many cases, targeted strength training is one of the most effective interventions for chronic back pain. Strengthening the posterior chain (glutes, hamstrings, lower back), hip stabilisers, and core reduces load on the lumbar spine and improves posture. Our instructors work with clients recovering from back issues regularly and know how to progress safely.',
  },
  {
    question: 'How does personal training at PT Studio 7 differ from a commercial gym?',
    answer: 'At PT Studio 7 you train in a private, boutique environment with a maximum of 5 people in group sessions — or one-on-one in private sessions. Your instructor designs your program, monitors your technique every repetition, and adjusts load and exercise selection session by session. It is incomparable to training alone in a large gym.',
  },
];

export const StrengthTrainingAmsterdam: React.FC = () => {
  useEffect(() => {
    trackPageView('/strength-training-amsterdam', 'Strength Training Amsterdam | PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Strength Training Amsterdam | PT Studio 7 Museumplein"
        description="Personal strength training and functional fitness at Museumplein Amsterdam. Nike equipment, Technogym SkillRun, expert certified trainers. Small groups (max 5) & private sessions."
        keywords="strength training amsterdam, krachttraining amsterdam, personal training amsterdam, functionele training amsterdam, personal trainer museumplein, krachtsport amsterdam oud-zuid, personal training oud-zuid amsterdam, nike strength amsterdam"
        canonical="https://www.pt7.nl/strength-training-amsterdam"
        ogTitle="Strength Training Amsterdam | PT Studio 7 Museumplein"
        ogDescription="Personal strength training at Museumplein Amsterdam. Nike equipment, expert trainers, max 5 per group. Private & small group sessions."
      />
      <StructuredData
        type="FAQPage"
        data={{ faqs }}
      />
      <Breadcrumbs items={[{ name: 'Strength Training Amsterdam', path: '/strength-training-amsterdam' }]} />

      <div className="service-page">
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>Strength Training Amsterdam</h1>
            <p>
              Expert-led personal strength training in our premium Nike-equipped studio at
              Museumplein. Small groups of max 5 people and one-on-one private sessions.
            </p>
            <div className="service-hero-badges">
              <span className="service-badge">Nike equipment</span>
              <span className="service-badge">Technogym SkillRun</span>
              <span className="service-badge">Max 5 per group</span>
              <span className="service-badge">Museumplein Amsterdam</span>
            </div>
            <Link to="/schedule" className="service-hero-btn">Book a Session</Link>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Strength training in Amsterdam Oud-Zuid</h2>
            <p>
              PT Studio 7 houses a dedicated strength and conditioning studio equipped with premium
              Nike gear — a half rack, Olympic barbell, dumbbells, kettlebells, and a Technogym
              SkillRun treadmill. It is a serious training environment designed for people who want
              results, not a row of treadmills and mirrors.
            </p>
            <p>
              Strength training at PT Studio 7 is always instructor-led. We do not offer open gym
              access. Every session is guided, which means your technique is monitored on every
              repetition, your program is adapted as you get stronger, and you are never left to
              figure it out alone.
            </p>
            <p>
              Our approach combines classical strength training principles — compound lifts, progressive
              overload, periodisation — with the movement quality and body awareness we develop through
              Pilates. The result is a body that is not just strong in isolated movements, but
              functionally powerful, balanced, and resilient.
            </p>
            <p>
              Whether your goal is building muscle, losing weight, improving athletic performance,
              recovering from injury, or simply feeling stronger in daily life — we design a program
              specific to you.
            </p>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Why strength training at PT Studio 7?</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>Premium equipment</h3>
                <p>Nike half rack, Olympic barbell, full dumbbell range, kettlebells, Technogym SkillRun, and Concept2 RowErg — professional tools for serious training.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Expert guidance every session</h3>
                <p>Your instructor monitors technique, adjusts load, and progresses your program session by session. No guesswork, no plateaus.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Max 5 people per group</h3>
                <p>Even in group sessions you receive significant individual attention. Not the 10–20 person classes common at larger studios.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Combined with Pilates</h3>
                <p>Many clients train both Pilates and strength at PT Studio 7. Our instructors design integrated programs that use both disciplines for optimal results.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Goal-specific programming</h3>
                <p>Muscle building, fat loss, sports performance, injury rehab — your program is built around your specific outcome, not a generic template.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Boutique privacy</h3>
                <p>Train in a private, focused environment without the noise, crowds, and distractions of a commercial gym. Fully air-conditioned studios.</p>
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
          <h2>Build real strength in Amsterdam</h2>
          <p>
            Book a private or small group strength training session at our Museumplein studio and
            find out what expert-guided training can do for your body.
          </p>
          <div className="service-cta-buttons">
            <Link to="/schedule" className="service-cta-btn-primary">Book a Session</Link>
            <Link to="/pricing" className="service-cta-btn-secondary">View Pricing</Link>
          </div>
        </section>
      </div>
    </>
  );
};
