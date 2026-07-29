import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const faqs = [
  {
    question: 'Is prenatal Reformer Pilates safe in every trimester?',
    answer:
      'Yes, when supervised by instructors experienced in pregnancy training. At PT Studio 7, every exercise is adapted to your trimester, symptoms, and energy level. We modify load, range, and positions as your body changes. Clients commonly train safely through 38+ weeks.',
  },
  {
    question: 'Do I need Pilates experience before starting prenatal sessions?',
    answer:
      'No. Beginners are welcome. We start with a private intake and build your program around your current fitness level, pregnancy stage, and goals.',
  },
  {
    question: 'Are pregnancy / prenatal sessions private or group-based?',
    answer:
      'Pregnancy and prenatal Pilates at PT Studio 7 are offered exclusively as private sessions. Each pregnancy has unique medical history and trimester needs, so an individual format is required for safe, appropriate programming. Small group classes (max 5) are for non-pregnancy clients.',
  },
  {
    question: 'Can this help with pelvic floor and lower-back discomfort?',
    answer:
      'Yes. We focus on breath-led core control, pelvic floor awareness, spinal support, and glute strength to reduce common pregnancy discomforts and improve day-to-day movement.',
  },
  {
    question: 'Is this the same as “pregnancy Pilates Amsterdam”?',
    answer:
      'Yes. Prenatal Pilates and pregnancy Pilates refer to the same private Reformer offering at our Museumplein / Oud-Zuid studio. This page is the canonical guide; book via the schedule page or contact us directly.',
  },
  {
    question: 'Can I continue after birth with postnatal Pilates?',
    answer:
      'Absolutely. Many clients continue with postnatal sessions focused on recovery, diastasis-safe core progression, and returning to strength after medical clearance.',
  },
];

export const PrenatalPilatesAmsterdam: React.FC = () => {
  const baseUrl = 'https://www.pt7.nl';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    trackPageView('/prenatal-pilates-amsterdam', 'Prenatal Pilates Amsterdam | PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Prenatal & Pregnancy Pilates Amsterdam | Private Reformer | PT Studio 7"
        description="Private prenatal Reformer Pilates in Amsterdam Oud-Zuid / Museumplein. Trimester-specific sessions, pelvic floor support, pregnancy-safe training with specialist instructors."
        keywords="prenatal pilates amsterdam, pregnancy pilates amsterdam, private prenatal pilates, reformer pilates pregnancy, pelvic floor pilates amsterdam, postnatal pilates amsterdam, pregnancy pilates museumplein"
        canonical={`${baseUrl}/prenatal-pilates-amsterdam`}
        ogTitle="Prenatal & Pregnancy Pilates Amsterdam | PT Studio 7"
        ogDescription="Private prenatal Reformer Pilates in Amsterdam Oud-Zuid with trimester-specific programming and expert pelvic floor support."
      />

      <StructuredData
        type="Service"
        data={{
          service: {
            name: 'Prenatal & Pregnancy Pilates Amsterdam',
            description:
              'Private prenatal and pregnancy Reformer Pilates sessions in Amsterdam Oud-Zuid / Museumplein, tailored to each trimester, with pelvic floor and core-focused programming. Max class size for non-pregnancy groups is 5; pregnancy training is private only.',
            serviceUrl: `${baseUrl}/prenatal-pilates-amsterdam`,
            areaServed: 'Amsterdam',
            offers: [
              { name: 'Private Prenatal Pilates Session', priceCurrency: 'EUR', url: `${baseUrl}/pricing` },
              { name: 'Prenatal Pilates Intro Session', priceCurrency: 'EUR', url: `${baseUrl}/schedule` },
            ],
          },
        }}
      />

      <StructuredData type="FAQPage" data={{ faqs }} />
      <Breadcrumbs items={[{ name: 'Prenatal Pilates Amsterdam', path: '/prenatal-pilates-amsterdam' }]} />

      <div className="service-page">
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>Prenatal &amp; Pregnancy Pilates Amsterdam</h1>
            <p>
              Expert-led Reformer Pilates for pregnancy at Museumplein (Oud-Zuid). Every session is private and adapted to your trimester, your body, and your goals so you can train safely with confidence.
            </p>
            <div className="service-hero-badges">
              <span className="service-badge">Private sessions only</span>
              <span className="service-badge">Trimester-specific programming</span>
              <span className="service-badge">Pelvic floor focus</span>
              <span className="service-badge">Museumplein / Oud-Zuid</span>
            </div>
            <Link to="/schedule" className="service-hero-btn">Book a Prenatal Session</Link>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Why prenatal Pilates at PT Studio 7</h2>
            <p>
              Pregnancy changes breathing mechanics, posture, and load through your spine and pelvis. Our prenatal sessions use the Reformer to provide support and controlled resistance so you can keep moving well without overloading sensitive areas.
            </p>
            <p>
              We prioritize deep core coordination, pelvic floor awareness, hip stability, and upper-back strength. That combination helps reduce common complaints like lower-back tension, pelvic discomfort, and shoulder tightness while preparing you for labor and recovery.
            </p>
            <p>
              If you want a deeper trimester-by-trimester guide, read our full article:{' '}
              <Link to="/blog/prenatal-pilates-supporting-body-through-every-trimester">
                Prenatal Pilates: Supporting Your Body Through Every Trimester
              </Link>.
            </p>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Who this is for</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>First trimester foundations</h3>
                <p>Maintain healthy movement habits, breathing control, and gentle strength while managing fatigue and changing energy levels.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Second trimester stability</h3>
                <p>Build glute and trunk support to improve posture and reduce stress on the lower back as your bump grows.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Third trimester confidence</h3>
                <p>Focus on mobility, breathing, and practical movement strategies that help with comfort and preparation for labor.</p>
              </div>
              <div className="service-benefit-card">
                <h3>Postnatal continuation</h3>
                <p>Progress safely into recovery work after birth with structured core and pelvic-floor rehab guidance.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Meet your prenatal specialists</h2>
            <p>
              You can train with <Link to="/trainer/elif">Elif Arzu Ogan</Link> and{' '}
              <Link to="/trainer/goknur">Göknur Dipli</Link>, both experienced in prenatal and postnatal Pilates coaching.
            </p>
            <p>
              See private-session options and current packages on our <Link to="/pricing">Pricing page</Link>.
            </p>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Related studio pages</h2>
            <p>
              Looking for non-pregnancy training? Explore{' '}
              <Link to="/private-pilates-amsterdam">private Pilates Amsterdam</Link>,{' '}
              <Link to="/reformer-pilates-amsterdam">Reformer Pilates Amsterdam</Link>, or the full{' '}
              <Link to="/schedule">class schedule</Link>.
            </p>
          </div>
        </section>

        <section className="service-section">
          <div className="service-container">
            <h2>Frequently Asked Questions</h2>
            <div className="service-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="service-faq-item">
                  <button
                    type="button"
                    className={`service-faq-question ${openFaqIndex === i ? 'active' : ''}`}
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    aria-expanded={openFaqIndex === i}
                    aria-controls={`prenatal-faq-answer-${i}`}
                  >
                    {faq.question}
                  </button>
                  <div
                    id={`prenatal-faq-answer-${i}`}
                    className={`service-faq-answer ${openFaqIndex === i ? 'open' : ''}`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="service-cta-section">
          <h2>Start safely, train confidently</h2>
          <p>
            Book your private prenatal intake and we will design a program that supports you through pregnancy and beyond.
          </p>
          <div className="service-cta-buttons">
            <Link to="/schedule" className="service-cta-btn-primary">Book Prenatal Intake</Link>
            <Link to="/pricing" className="service-cta-btn-secondary">View Private Session Pricing</Link>
          </div>
        </section>
      </div>
    </>
  );
};
