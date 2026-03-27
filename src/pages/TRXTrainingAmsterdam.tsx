import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const faqs = [
  {
    question: 'What is TRX suspension training?',
    answer: 'TRX is a system of adjustable straps that anchor to a fixed point and use your own bodyweight as resistance. By adjusting the angle of your body and the length of the straps, the instructor can make any exercise easier or harder. It trains strength, stability, core control, and balance simultaneously — in ways that traditional weight training cannot.',
  },
  {
    question: 'Is TRX suitable for beginners?',
    answer: 'Yes. TRX is highly scalable. Every exercise can be made easier by changing your angle. Beginners start with a stable foundation and progress at their own pace. The low-impact nature of suspension training also makes it suitable for people with joint sensitivities.',
  },
  {
    question: 'Can I combine TRX with Pilates at PT Studio 7?',
    answer: 'Absolutely — and many of our clients do exactly that. Pilates and TRX complement each other very well. Pilates builds deep core stability and body awareness; TRX adds functional strength, power, and cardiovascular challenge. Our instructors can design a combined program that integrates both.',
  },
  {
    question: 'How long is a TRX session?',
    answer: 'All sessions at PT Studio 7 are 45 minutes. This is enough time for a complete full-body TRX workout, warm-up, and cool-down. Private sessions can be structured as pure TRX or a combination with strength training or Pilates work.',
  },
  {
    question: 'Do I need any equipment or clothing?',
    answer: 'We provide all TRX equipment. Wear comfortable fitted workout clothing and training shoes (or train barefoot/in socks). Bring a water bottle and a small towel. Grip socks are available for purchase at the studio if needed.',
  },
  {
    question: 'What are the benefits of TRX compared to gym machines?',
    answer: 'TRX trains the body in three-dimensional, functional movement patterns — not isolated single-joint movements. It develops stability and coordination alongside raw strength. Because you are working against gravity and your own bodyweight, every exercise also engages your core. The result is functional fitness that translates directly into real-life performance and injury prevention.',
  },
];

export const TRXTrainingAmsterdam: React.FC = () => {
  useEffect(() => {
    trackPageView('/trx-training-amsterdam', 'TRX Training Amsterdam | PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="TRX Training Amsterdam Museumplein | PT Studio 7"
        description="Professional TRX suspension training at Museumplein Amsterdam. Build functional strength, core stability and balance with certified trainers. Small groups & private sessions."
        keywords="TRX training amsterdam, TRX suspension training amsterdam, TRX les amsterdam, TRX museumplein, suspension training amsterdam, TRX personal training amsterdam, functionele training amsterdam, TRX oud-zuid"
        canonical="https://www.pt7.nl/trx-training-amsterdam"
        ogTitle="TRX Training Amsterdam | PT Studio 7 Museumplein"
        ogDescription="Professional TRX suspension training at Museumplein Amsterdam. Functional strength, core stability and balance. Certified trainers, small groups & private sessions."
      />
      <StructuredData
        type="FAQPage"
        data={{ faqs }}
      />
      <Breadcrumbs items={[{ name: 'TRX Training Amsterdam', path: '/trx-training-amsterdam' }]} />

      <div className="service-page">
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>TRX Training Amsterdam</h1>
            <p>
              Suspension training that builds full-body functional strength, core stability, and
              balance — at our boutique studio at Museumplein.
            </p>
            <div className="service-hero-badges">
              <span className="service-badge">Functional strength</span>
              <span className="service-badge">Core & balance</span>
              <span className="service-badge">All levels</span>
              <span className="service-badge">Museumplein Amsterdam</span>
            </div>
            <Link to="/schedule" className="service-hero-btn">Book a TRX Session</Link>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>TRX suspension training in Amsterdam</h2>
            <p>
              TRX suspension training uses adjustable straps and your own bodyweight to create
              resistance in every plane of movement. Unlike machines that isolate individual muscles,
              TRX trains the whole body as an integrated system — building the kind of functional
              strength that translates directly into how you move in daily life and sport.
            </p>
            <p>
              At PT Studio 7 on Museumplein, our certified trainers guide you through TRX programs
              that are tailored to your goals and fitness level. Whether you want to build general
              strength, improve your athletic performance, lose weight, or recover from an injury,
              TRX offers a highly effective and low-impact solution.
            </p>
            <p>
              One of the great advantages of TRX is its scalability. By adjusting your body angle
              and the strap length, the instructor can instantly make any exercise easier or harder.
              This makes TRX suitable for complete beginners and experienced athletes alike — and
              ideal for combining with Pilates in an integrated training program.
            </p>
            <p>
              TRX sessions at PT Studio 7 are available as private sessions (one-on-one, duo, or
              trio) and in our small group classes of maximum 5 people.
            </p>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Benefits of TRX training</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>Full-body in 45 minutes</h3>
                <p>TRX efficiently trains every major muscle group in a single session — upper body, lower body, and core simultaneously.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Core in every exercise</h3>
                <p>Because you are always working against gravity and instability, your core is engaged in every TRX movement — not just dedicated core exercises.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Joint-friendly</h3>
                <p>TRX is low-impact and can be adapted for people with knee, hip, or shoulder issues. The instructor adjusts load and range of motion to stay within safe limits.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Functional strength</h3>
                <p>Training in three-dimensional, natural movement patterns builds strength that carries over into real life — not just gym performance.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Scalable difficulty</h3>
                <p>From beginner to advanced, TRX exercises can be instantly modified. You progress at your own pace without switching equipment.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Pairs perfectly with Pilates</h3>
                <p>Many PT Studio 7 clients combine Pilates and TRX — Pilates for deep core work and alignment, TRX for functional strength and conditioning.</p>
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
          <h2>Start your TRX training</h2>
          <p>
            Book a private or small group TRX session at our Museumplein studio and experience what
            functional training can do for your strength and fitness.
          </p>
          <div className="service-cta-buttons">
            <Link to="/schedule" className="service-cta-btn-primary">Book a Session</Link>
            <Link to="/workouts/trx" className="service-cta-btn-secondary">Learn More About TRX</Link>
          </div>
        </section>
      </div>
    </>
  );
};
