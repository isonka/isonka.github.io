import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const faqs = [
  {
    question: 'What is Reformer Pilates?',
    answer:
      'Reformer Pilates uses a spring-loaded carriage, straps, and a footbar so you can strengthen, lengthen, and stabilize the whole body with controlled resistance. Compared with mat Pilates, the Reformer offers more support for beginners and more progressive challenge for advanced clients.',
  },
  {
    question: 'Where can I take Reformer Pilates classes in Amsterdam Oud-Zuid / Museumplein?',
    answer:
      'PT Studio 7 is at Van Baerlestraat 76C, across from the Stedelijk Museum at Museumplein. We specialize in small group Reformer classes (maximum 5 people) and private sessions.',
  },
  {
    question: 'How many people are in a Reformer class?',
    answer:
      'Our small group Reformer classes have a maximum of 5 participants. That keeps coaching personal while still offering group energy. Private, duo, and trio sessions are also available.',
  },
  {
    question: 'What happens on my first visit?',
    answer:
      'Arrive a few minutes early. We show you the Reformer setup, springs, and straps, then coach you through a 45-minute session with modifications for your level. Small groups stay at max 5 so cues stay personal from day one.',
  },
  {
    question: 'Is Reformer Pilates suitable for beginners?',
    answer:
      'Yes. Instructors give modifications and progressions so beginners learn safe form from day one. Many clients start with a private session, then join small groups.',
  },
  {
    question: 'Can I combine Reformer Pilates with TRX or strength training?',
    answer:
      'Yes. Many clients combine Reformer with TRX or strength work at the same Museumplein studio. Instructors can help you build a balanced weekly plan.',
  },
  {
    question: 'Do you offer Reformer instructor training in Amsterdam?',
    answer:
      'Yes. PT7 Academy runs a 300-hour Reformer Pilates Instructor Course at the studio (ITTAP approved by the Pilates Method Alliance). See the Academy page for the next term.',
  },
];

const reformerSeoOnlyFaqs = [
  {
    question: 'Is there Reformer Pilates in Amsterdam Oud-Zuid?',
    answer:
      'Yes. Our studio sits in Oud-Zuid at Museumplein (Van Baerlestraat 76C). We run small group and private Reformer sessions for clients in Amsterdam Zuid, the Museum District, and nearby neighborhoods.',
  },
];

const reformerSchemaFaqs = [...faqs, ...reformerSeoOnlyFaqs];

export const ReformerPilatesAmsterdam: React.FC = () => {
  useEffect(() => {
    trackPageView(
      '/reformer-pilates-amsterdam/',
      'Reformer Pilates Amsterdam Museumplein | PT Studio 7'
    );
  }, []);

  return (
    <>
      <SEOHead
        title="Reformer Pilates Amsterdam Museumplein | PT Studio 7"
        description="Reformer Pilates at Museumplein Amsterdam. Small groups max 5, private sessions, full apparatus studio in Oud-Zuid. First visit coaching for beginners and expats."
        keywords="reformer pilates amsterdam, pilates museumplein, reformer pilates oud-zuid, small group pilates amsterdam, pilates classes amsterdam, reformer pilates lessen amsterdam, boutique pilates amsterdam"
        canonical="https://www.pt7.nl/reformer-pilates-amsterdam/"
        ogTitle="Reformer Pilates Amsterdam | PT Studio 7 Museumplein"
        ogDescription="Boutique Reformer Pilates at Museumplein. Small groups (max 5), private sessions, expert instructors in Amsterdam Oud-Zuid."
      />
      <StructuredData type="FAQPage" data={{ faqs: reformerSchemaFaqs }} />
      <StructuredData
        type="Service"
        data={{
          service: {
            name: 'Reformer Pilates Amsterdam',
            description:
              'Small group (max 5) and private Reformer Pilates classes at PT Studio 7 Museumplein, Amsterdam Oud-Zuid.',
            serviceUrl: 'https://www.pt7.nl/reformer-pilates-amsterdam/',
            areaServed: 'Amsterdam',
            offers: [
              { name: 'Small group Reformer class', url: 'https://www.pt7.nl/schedule/' },
              { name: 'Private Reformer session', url: 'https://www.pt7.nl/private-pilates-amsterdam/' },
            ],
          },
        }}
      />
      <Breadcrumbs
        items={[{ name: 'Reformer Pilates Amsterdam', path: '/reformer-pilates-amsterdam/' }]}
      />

      <div className="service-page">
        <Reveal className="service-hero">
          <div className="service-hero-content">
            <p className="kicker">Reformer</p>
            <h1>Reformer Pilates Amsterdam</h1>
            <p>
              Boutique Reformer Pilates at Museumplein: small groups of maximum 5, private
              sessions, and expert coaching in Amsterdam Oud-Zuid.
            </p>
            <div className="service-hero-badges">
              <span className="service-badge">Max 5 per class</span>
              <span className="service-badge">Private & group</span>
              <span className="service-badge">All levels</span>
              <span className="service-badge">Museumplein Amsterdam</span>
            </div>
            <Link to="/schedule/" className="service-hero-btn">
              Book a Reformer Class
            </Link>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>Reformer Pilates at Museumplein</h2>
            <p>
              Looking for Reformer Pilates in Amsterdam near Museumplein or Oud-Zuid? PT Studio 7
              is a boutique studio at Van Baerlestraat 76C, across from the Stedelijk Museum. We
              focus on equipment-based Reformer training, not crowded mat classes, with
              instructors who coach form, breath, and progression in every session.
            </p>
            <p>
              Small group classes are capped at five people so you still get personal attention.
              Prefer one-on-one?{' '}
              <Link to="/private-pilates-amsterdam/">Private, duo, and trio Reformer sessions</Link>{' '}
              are available for beginners, athletes, and rehab-minded clients. Pregnancy training is
              private only: see{' '}
              <Link to="/prenatal-pilates-amsterdam/">prenatal Pilates Amsterdam</Link>.
            </p>
            <p>
              Want deeper detail on benefits, equipment, and class options? See our full{' '}
              <Link to="/workouts/reformer-pilates/">Reformer Pilates workout guide</Link>,{' '}
              <Link to="/pricing/">pricing</Link>, and{' '}
              <Link to="/schedule/">live schedule</Link>.
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>Your first Reformer visit</h2>
            <p>
              Sessions are 45 minutes. Whether you book a small group or a private, we coach the
              machine and your movement, not a silent follow-along video.
            </p>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>1. Arrive &amp; settle in</h3>
                <p>
                  Come a few minutes early to Van Baerlestraat 76C (across from Stedelijk Museum).
                  We confirm your booking and get you ready for the Reformer.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>2. Meet the equipment</h3>
                <p>
                  Springs, carriage, straps, and footbar are explained in plain language. Beginners
                  get the setup they need before load increases.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>3. Coach in a max-5 room</h3>
                <p>
                  Small groups stay at five people so cues and corrections stay personal. Private
                  sessions give you the instructor&apos;s full attention.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>4. Leave with a next step</h3>
                <p>
                  After class we can point you to the right mix of group Reformer, private work, or
                  strength/TRX in the same studio.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>Who Reformer at PT Studio 7 is for</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>Beginners</h3>
                <p>
                  New to Reformer or Pilates? Start in a max-5 group or book a private intro so you
                  learn form before the room gets busy.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>Expats &amp; locals in Oud-Zuid</h3>
                <p>
                  English, Turkish, and Dutch coaching near Museumplein, Vondelpark, and Zuid. Easy
                  for people who live or work in the area.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>Strength &amp; athletic clients</h3>
                <p>
                  Combine Reformer with{' '}
                  <Link to="/trx-training-amsterdam/">TRX</Link> or{' '}
                  <Link to="/strength-training-amsterdam/">strength training</Link> in the same
                  studio for a balanced week.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>Future instructors</h3>
                <p>
                  Want to teach?{' '}
                  <Link to="/academy/">Pilates teacher training at PT7 Academy</Link> offers a 300-hour Reformer instructor
                  course (PMA ITTAP approved) on selected weekends at this same studio.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>Why train Reformer with us</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>True micro-groups</h3>
                <p>
                  Maximum 5 participants, far smaller than typical Reformer rooms of 8–12, so
                  cues and corrections stay personal.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>Museumplein location</h3>
                <p>
                  Central Amsterdam Oud-Zuid, easy for locals and expats near the museums, Vondelpark,
                  and Zuid.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>Full apparatus studio</h3>
                <p>
                  Reformers plus Tower, Cadillac, Wunda Chair, and more. Not a
                  Reformer-only box gym.
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>English, Turkish & Dutch</h3>
                <p>
                  International-friendly coaching for Amsterdam’s expat and local community.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
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
        </Reveal>

        <Reveal className="service-cta-section">
          <h2>Book Reformer Pilates in Amsterdam</h2>
          <p>
            Reserve a small group or private Reformer session at Museumplein, or explore PT7
            Academy if you want to teach.
          </p>
          <div className="service-cta-buttons">
            <Link to="/schedule/" className="service-cta-btn-primary">
              Book a Session
            </Link>
            <Link to="/workouts/reformer-pilates/" className="service-cta-btn-secondary">
              Reformer Guide
            </Link>
            <Link to="/academy/" className="service-cta-btn-secondary">
              Pilates teacher training
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
};
