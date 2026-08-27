import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookingGuide } from '../components/BookingGuide';
import { trackScheduleVisit, trackPageView } from '../utils/gtmTracking';
import {
  clearMindBodyWidgetContainers,
  initScheduleMindBodyWidgets,
} from '../utils/mindbodyBrandedWeb';
import '../styles/Schedule.css';

export const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('group');
  const [widgetsLoading, setWidgetsLoading] = useState(true);
  const [widgetsError, setWidgetsError] = useState(false);

  useEffect(() => {
    trackPageView('/schedule', 'Schedule & Book Your Session');
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
        title="Class Schedule & Booking | PT Studio 7 Amsterdam"
        description="Book your Reformer Pilates class at PT Studio 7 Museumplein. View our weekly schedule for private sessions and small group classes (max 5 people)."
        keywords="Pilates boeken Amsterdam, Pilates rooster Amsterdam, Pilates reserveren, TRX boeken Amsterdam, les boeken Museumplein, Pilates schedule Amsterdam, groepsles boeken"
        canonical="https://www.pt7.nl/schedule/"
        ogTitle="Class Schedule & Booking | PT Studio 7 Amsterdam"
        ogDescription="Book your Reformer Pilates class at PT Studio 7 Museumplein. Weekly schedule for private sessions and small group classes (max 5 people)."
      />
      <Breadcrumbs items={[{ name: 'Book Classes', path: '/schedule' }]} />

      <div className="schedule-page">
        <section className="schedule-hero">
          <div className="schedule-hero-content">
            <p className="schedule-kicker">Book</p>
            <h1>Schedule &amp; book your session</h1>
            <p>
              Pilates, TRX, strength, and cardio, small groups (max 5) or private sessions with expert trainers.
            </p>
            <p className="location-highlight">
              Museumplein, Van Baerlestraat 76C, across from Stedelijk Museum
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
                  data-widget-id="2b9312c036"
                  style={{ width: '100%' }}
                  hidden={widgetsError}
                />
              </div>
            </div>

            <div className={`tab-content ${activeTab === 'private' ? 'active' : ''}`}>
              <h2>Private classes</h2>
              <p className="subtitle">
                Personalized training for your goals and level, one-on-one, couple, or trio.
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

