import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookingGuide } from '../components/BookingGuide';
import { trackScheduleVisit, trackPageView } from '../utils/gtmTracking';
import {
  clearMindBodyWidgetContainers,
  initScheduleMindBodyWidgets,
} from '../utils/mindbodyBrandedWeb';
import '../styles/Schedule.css';

const scheduleFaqs = [
  {
    question: 'How do I book Pilates classes in Amsterdam online?',
    answer:
      'Choose Group classes or Private classes on this page, pick a date and time in the MindBody calendar, then sign in or create an account to complete booking. Payment is handled securely in the widget.',
  },
  {
    question: 'What should I bring to my first Pilates class?',
    answer:
      'Wear fitted athletic clothing, bring water, and grip socks if you have them (available at the studio). First-time group clients should arrive about 10 minutes early for a quick orientation.',
  },
  {
    question: 'Can I book private Pilates sessions from this page?',
    answer:
      'Yes. Open the Private classes tab to book one-on-one, couple, or trio appointments. For more on private formats, see pt7.nl/private-pilates-amsterdam/.',
  },
  {
    question: 'Are your group Pilates classes beginner-friendly?',
    answer:
      'Yes. Instructors give modifications in every session. Groups stay at a maximum of 5 people so you still get personal cues. Many beginners start with a private intro, then join a small group.',
  },
  {
    question: 'Can I train with PT Studio 7 during pregnancy?',
    answer:
      'Pregnant clients are welcome in one-on-one private sessions only, where we adapt exercises safely. See pt7.nl/prenatal-pilates-amsterdam/ for our pregnancy-focused private Reformer option.',
  },
];

export const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('group');
  const [widgetsLoading, setWidgetsLoading] = useState(true);
  const [widgetsError, setWidgetsError] = useState(false);

  useEffect(() => {
    trackPageView('/schedule/', 'Pilates Classes Amsterdam | Book Online | PT Studio 7');
    trackScheduleVisit();

    let cancelled = false;

    setWidgetsLoading(true);
    setWidgetsError(false);

    initScheduleMindBodyWidgets()
      .then(() => {
        if (!cancelled) {
          setWidgetsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setWidgetsError(true);
          setWidgetsLoading(false);
        }
      });

    return () => {
      cancelled = true;
      clearMindBodyWidgetContainers();
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Pilates Classes Amsterdam | Book Online | PT Studio 7"
        description="Book Pilates classes in Amsterdam near Museumplein. Reformer, TRX, and strength: small groups (max 5) and private sessions at Van Baerlestraat 76C. View schedule and reserve online."
        keywords="pilates classes amsterdam, pilates classes near me, Pilates boeken Amsterdam, Pilates rooster Amsterdam, Pilates reserveren, TRX boeken Amsterdam, les boeken Museumplein, Pilates schedule Amsterdam, groepsles boeken, reformer pilates book amsterdam"
        canonical="https://www.pt7.nl/schedule/"
        ogTitle="Pilates Classes Amsterdam | Book Online | PT Studio 7"
        ogDescription="Book Pilates classes near Museumplein. Small groups (max 5) and private Reformer, TRX, and strength sessions. Reserve your spot online."
      />
      <StructuredData type="FAQPage" data={{ faqs: scheduleFaqs }} />
      <Breadcrumbs items={[{ name: 'Pilates Classes Amsterdam', path: '/schedule/' }]} />

      <div className="schedule-page">
        <section className="schedule-hero">
          <div className="schedule-hero-content">
            <p className="schedule-kicker">Book</p>
            <h1>Pilates classes in Amsterdam: book online</h1>
            <p>
              Reformer Pilates, TRX, strength, and cardio: small groups (max 5) or private sessions with expert trainers.
              Looking for Pilates classes near Museumplein or Oud-Zuid? Reserve your spot below.
            </p>
            <p className="location-highlight">
              Van Baerlestraat 76C, Museumplein, across from Stedelijk Museum
            </p>
            <p>
              <Link to="/reformer-pilates-amsterdam/">Reformer Pilates Amsterdam</Link>
              {' · '}
              <Link to="/pricing/">Class prices &amp; packages</Link>
              {' · '}
              <Link to="/private-pilates-amsterdam/">Private sessions</Link>
            </p>
          </div>
        </section>

        <section className="schedule-main">
          <div className="tabs-container">
            <div className="tab-navigation">
              <button
                type="button"
                className={`tab-button ${activeTab === 'group' ? 'active' : ''}`}
                onClick={() => setActiveTab('group')}
              >
                Group classes
              </button>
              <button
                type="button"
                className={`tab-button ${activeTab === 'private' ? 'active' : ''}`}
                onClick={() => setActiveTab('private')}
              >
                Private classes
              </button>
            </div>

            <div className={`tab-content ${activeTab === 'group' ? 'active' : ''}`}>
              <h2>Group classes</h2>
              <p className="subtitle">
                Small group training with maximum 5 participants. Expert instruction in an energizing environment.
              </p>

              <div className="info-banner">
                <p>
                  <strong>New to group classes?</strong> First-timers arrive 10 minutes early for orientation. Our
                  trainers will guide you through everything.
                </p>
              </div>

              <div className="quick-info">
                <div className="info-card">
                  <h3>Class duration</h3>
                  <p>45 minutes</p>
                </div>
                <div className="info-card">
                  <h3>Group size</h3>
                  <p>Maximum 5 people</p>
                </div>
                <div className="info-card">
                  <h3>What to bring</h3>
                  <p>Water bottle, towel, grip socks (recommended; available at the studio)</p>
                </div>
              </div>

              <div className="widget-container">
                {widgetsLoading && (
                  <p className="widget-loading" role="status">
                    Loading booking calendar…
                  </p>
                )}
                {widgetsError && (
                  <p className="widget-error" role="alert">
                    Booking calendar could not load. Please{' '}
                    <a href="/schedule/">refresh this page</a> or call us to book.
                  </p>
                )}
                <div
                  className="mindbody-widget"
                  data-widget-type="Schedules"
                  data-widget-id="2b8825c036"
                  style={{ width: '100%' }}
                  hidden={widgetsError}
                />
              </div>
            </div>

            <div className={`tab-content ${activeTab === 'private' ? 'active' : ''}`}>
              <h2>Private classes</h2>
              <p className="subtitle">
                Personalized training for your goals and level: one-on-one, couple, or trio. See our{' '}
                <Link to="/private-pilates-amsterdam/">Private Pilates near Museumplein</Link>
                {' '}
                page for formats, pricing, and what to expect.
              </p>

              <div className="info-banner">
                <p>
                  <strong>Personalized attention.</strong> Sessions adapt to your goals, injuries, or specific needs.
                  Train solo, with a partner, or with two friends.
                </p>
              </div>

              <div className="quick-info">
                <div className="info-card">
                  <h3>Class duration</h3>
                  <p>45 minutes of focused training</p>
                </div>
                <div className="info-card">
                  <h3>Class options</h3>
                  <p>One-on-one, couple, or trio (3 people)</p>
                </div>
                <div className="info-card">
                  <h3>Customized program</h3>
                  <p>Workout adapted to your goals and level</p>
                </div>
                <div className="info-card">
                  <h3>What to bring</h3>
                  <p>Fitted clothing, socks (grip socks recommended), water bottle, towel</p>
                </div>
              </div>

              <div className="widget-container">
                {widgetsLoading && (
                  <p className="widget-loading" role="status">
                    Loading booking calendar…
                  </p>
                )}
                {widgetsError && (
                  <p className="widget-error" role="alert">
                    Booking calendar could not load. Please{' '}
                    <a href="/schedule/">refresh this page</a> or call us to book.
                  </p>
                )}
                <div
                  className="mindbody-widget"
                  data-widget-type="Appointments"
                  data-widget-id="2b18450c036"
                  style={{ width: '100%' }}
                  hidden={widgetsError}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section" aria-labelledby="schedule-cta-heading">
          <div className="cta-section-inner">
            <p className="schedule-kicker schedule-kicker-on-dark">Next step</p>
            <h2 id="schedule-cta-heading">Need help choosing?</h2>
            <p>
              Not sure between group and private? Check pricing or contact us for guidance.
            </p>
            <Link to="/pricing/" className="cta-button">
              View pricing &amp; packages
            </Link>
          </div>
        </section>
      </div>

      <BookingGuide />
    </>
  );
};

