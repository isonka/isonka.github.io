import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const faqs = [
  {
    question: 'Is prenatal Reformer Pilates safe in every trimester?',
    answer:
      'Yes, when supervised by instructors experienced in pregnancy training. At PT Studio 7, every exercise is adapted to your trimester, symptoms, and energy level. We modify load, range, and positions as your body changes. Clients commonly train safely through 38+ weeks.',
  },
  {
    question: 'Do I need approval from my midwife or doctor?',
    answer:
      'Yes. Confirm with your midwife or doctor that exercise is appropriate before you start. If they say no, or set limits that rule out this training, we will not begin or continue sessions. Prenatal Pilates at PT Studio 7 is supportive movement coaching, not medical care. Share any restrictions so we can stay within them.',
  },
  {
    question: 'Can I start at any week of pregnancy?',
    answer:
      'Yes, when you are cleared to exercise. Clients start at different weeks and often continue until labor. We adapt every private session to your week, symptoms, and energy.',
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
      'Yes. We focus on breathing, pelvic floor muscles control, spinal support, and leg strength to reduce common pregnancy discomforts and improve day-to-day movement.',
  },
  {
    question: 'Which languages are sessions offered in?',
    answer:
      'Sessions are available in English, Turkish, and Dutch. Many prenatal clients are expats living near Museumplein / Oud-Zuid who prefer coaching in English.',
  },
  {
    question: 'Where is the studio and how do I get there?',
    answer:
      'PT Studio 7 is at Van Baerlestraat 76C, 1071 BB Amsterdam, across from the Stedelijk Museum at Museumplein in Oud-Zuid. The location is easy to reach by tram or metro to the Museumplein area. Arrive a few minutes early for your first private intake so we can settle in without rushing.',
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
    trackPageView('/prenatal-pilates-amsterdam/', 'Prenatal Pilates Amsterdam | PT Studio 7');
  }, []);

  return (
    <>
      <SEOHead
        title="Prenatal & Pregnancy Pilates Amsterdam | Private Reformer | PT Studio 7"
        description="Private prenatal Reformer Pilates at Museumplein (Oud-Zuid). 45-minute 1:1 sessions, trimester adaptations, pelvic floor focus. Train with Elif or Göknur through pregnancy."
        keywords="prenatal pilates amsterdam, pregnancy pilates amsterdam, private prenatal pilates, reformer pilates pregnancy, pelvic floor pilates amsterdam, postnatal pilates amsterdam, pregnancy pilates museumplein"
        canonical={`${baseUrl}/prenatal-pilates-amsterdam/`}
        ogTitle="Prenatal & Pregnancy Pilates Amsterdam | PT Studio 7"
        ogDescription="Private 45-minute prenatal Reformer sessions at Museumplein. Trimester-specific coaching with Elif and Göknur, not group classes."
      />

      <StructuredData
        type="Service"
        data={{
          service: {
            name: 'Prenatal & Pregnancy Pilates Amsterdam',
            description:
              'Private prenatal and pregnancy Reformer Pilates sessions in Amsterdam Oud-Zuid / Museumplein, tailored to each trimester, with pelvic floor and core-focused programming. Max class size for non-pregnancy groups is 5; pregnancy training is private only.',
            serviceUrl: `${baseUrl}/prenatal-pilates-amsterdam/`,
            areaServed: 'Amsterdam',
            offers: [
              { name: 'Private Prenatal Pilates Session', priceCurrency: 'EUR', url: `${baseUrl}/pricing/` },
              { name: 'Prenatal Pilates Intro Session', priceCurrency: 'EUR', url: `${baseUrl}/schedule/` },
            ],
          },
        }}
      />

      <StructuredData type="FAQPage" data={{ faqs }} />
      <Breadcrumbs items={[{ name: 'Prenatal Pilates Amsterdam', path: '/prenatal-pilates-amsterdam' }]} />

      <div className="service-page">
        <Reveal className="service-hero">
          <div className="service-hero-content">
            <p className="kicker">Prenatal</p>
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
            <Link to="/schedule/" className="service-hero-btn">Book a Prenatal Session</Link>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>Why prenatal Pilates at PT Studio 7</h2>
            <p>
              Pregnancy changes breathing mechanics, posture, and load through your spine and pelvis. Our prenatal sessions use the Reformer to provide support and controlled resistance so you can keep moving well without overloading sensitive areas.
            </p>
            <p>
              We prioritize breathing, pelvic floor muscles control, leg strength, and upper-back strength. That combination helps reduce common complaints like lower-back tension, pelvic discomfort, and shoulder tightness while preparing you for labor and recovery.
            </p>
            <p>
              If you want a deeper trimester-by-trimester guide, read our full article:{' '}
              <Link to="/blog/prenatal-pilates-supporting-body-through-every-trimester/">
                Prenatal Pilates: Supporting Your Body Through Every Trimester
              </Link>.
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>Who this is for</h2>
            <p>
              If your midwife or doctor says exercise is okay, you can start private prenatal Reformer sessions at
              any week of pregnancy and continue until labor.
            </p>
            <p>
              If your doctor or midwife says no to exercise, or places clear limits that rule out this type of
              training, we will not start or continue sessions. Your medical guidance always comes first.
            </p>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>Any week until labor</h3>
                <p>
                  Start when you are ready, or keep going through the final weeks. We adapt every session to your
                  week, energy, and symptoms, including clients who train with us into the 38+ week range.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>Postnatal continuation</h3>
                <p>
                  After birth, many clients continue with postnatal sessions focused on recovery, pelvic floor
                  muscles control, and returning to strength after medical clearance.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>What a private prenatal session looks like</h2>
            <p>
              Sessions are 45 minutes and private only, never mixed into a group class. That matters in pregnancy:
              load, range, and positions change week by week, and your instructor needs full attention on you.
            </p>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>1. Intake &amp; goals</h3>
                <p>
                  We start with how far along you are, how you feel day to day, prior exercise experience, and any
                  guidance from your midwife or doctor. Your first booking is a private intake so programming fits
                  your pregnancy, not a generic class plan.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>2. Reformer-supported movement</h3>
                <p>
                  Springs and the carriage give controlled resistance with more support than floor-only work. We
                  emphasise breathing, pelvic floor muscles control, leg strength, and upper-back strength as
                  posture and balance shift.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>3. Trimester adaptations</h3>
                <p>
                  We adjust intensity and positions as your body changes, including through later pregnancy when
                  many clients continue training with us into the 38+ week range.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>4. Tailored to how you feel today</h3>
                <p>
                  Every day can feel different in pregnancy: energy, sleep, and comfort shift. We tailor each
                  class to your needs and requirements that day, not a fixed routine you have to push through.
                  That is why we believe prenatal Pilates should be one-on-one.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>From our prenatal clients</h2>
            <blockquote className="service-quote">
              <p>
                “I have been going to this studio for the past 18 months, of which I have been pregnant for 9.
                During my pregnancy Elif trained me until the very end (38.5 weeks). Her training gave me and my
                body an extremely comfortable pregnancy and smooth delivery of birth! Her experience and knowledge
                about the human body, pregnant or not, makes all the difference.”
              </p>
              <footer>Lot Canter Cremers</footer>
            </blockquote>
            <p>
              Lot’s experience reflects how we work here: private Reformer sessions, trimester-aware coaching, and
              instructors who stay with you through pregnancy when it is appropriate for you.
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>Meet your prenatal specialists</h2>
            <p>
              Book with instructors experienced in prenatal and postnatal Reformer coaching. See private packages on
              our <Link to="/pricing/">Pricing page</Link>.
            </p>
            <div className="service-trainers-strip">
              <Link to="/trainer/elif/" className="service-trainer-card">
                <img
                  src="/assets/images/elif.webp"
                  alt="Elif Arzu Ogan, prenatal Pilates instructor"
                  width={60}
                  height={60}
                />
                <div>
                  <h3>Elif Arzu Ogan</h3>
                  <p>Owner &amp; head instructor · prenatal specialist</p>
                </div>
              </Link>
              <Link to="/trainer/goknur/" className="service-trainer-card">
                <img
                  src="/assets/images/goknur.webp"
                  alt="Göknur Dipli, prenatal Pilates instructor"
                  width={60}
                  height={60}
                />
                <div>
                  <h3>Göknur Dipli</h3>
                  <p>Senior instructor · prenatal &amp; strength</p>
                </div>
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>Related studio pages</h2>
            <p>
              Looking for non-pregnancy training? Explore{' '}
              <Link to="/private-pilates-amsterdam/">private Pilates Amsterdam</Link>,{' '}
              <Link to="/reformer-pilates-amsterdam/">Reformer Pilates Amsterdam</Link>, or the full{' '}
              <Link to="/schedule/">class schedule</Link>.
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
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
        </Reveal>

        <Reveal className="service-cta-section">
          <h2>Start safely, train confidently</h2>
          <p>
            Book your private prenatal intake and we will design a program that supports you through pregnancy and beyond.
          </p>
          <div className="service-cta-buttons">
            <Link to="/schedule/" className="service-cta-btn-primary">Book Prenatal Intake</Link>
            <Link to="/pricing/" className="service-cta-btn-secondary">View Private Session Pricing</Link>
          </div>
        </Reveal>
      </div>
    </>
  );
};
