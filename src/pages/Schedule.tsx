import { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import '../styles/Schedule.css';

export const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('group');

  useEffect(() => {
    // Load MindBody widget script
    const script = document.createElement('script');
    script.src = 'https://brandedweb.mindbodyonline.com/embed/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Book Classes - Pilates, EMS, TRX & Training | PT Studio 7 Museumplein Amsterdam"
        description="Book Pilates, EMS, TRX, Functional Training at PT Studio 7 Museumplein. Small group classes (max 4) & private classes with expert trainers. 45-min classes. Premium location across from Stedelijk Museum."
        keywords="book Pilates Amsterdam, book EMS training Amsterdam, book TRX Amsterdam, Pilates Museumplein, EMS Museumplein, small group fitness Amsterdam, private training booking Amsterdam, Pilates schedule, boutique gym booking Amsterdam, Pilates near Rijksmuseum, intimate fitness classes Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/schedule"
        ogTitle="Book Your Class | Pilates, EMS, TRX at PT Studio 7 Museumplein"
        ogDescription="Reserve your spot in small group classes (max 4) or private classes. Pilates, EMS, TRX, Functional Training. Expert trainers. Premium Museumplein location."
      />

      <div className="schedule-page">
        {/* Hero Section */}
        <section className="schedule-hero">
          <div className="schedule-hero-content">
            <h1>Schedule & Book Your Session</h1>
            <p>Pilates • EMS Training • TRX • Functional Training • Cardio<br/>
            Small group classes (max 4) or private classes with expert trainers</p>
            <div className="location-highlight">
              <span className="location-icon">📍</span>
              <span>Premium location at <strong>Museumplein</strong> - across from Stedelijk Museum with stunning Rijksmuseum views</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="schedule-main">
          <div className="tabs-container">
            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button
                className={`tab-button ${activeTab === 'group' ? 'active' : ''}`}
                onClick={() => setActiveTab('group')}
              >
                <span className="label">Small Group</span>
                Group Classes
              </button>
              <button
                className={`tab-button ${activeTab === 'private' ? 'active' : ''}`}
                onClick={() => setActiveTab('private')}
              >
                <span className="label">Private Training</span>
                Private Classes
              </button>
            </div>

            {/* Group Classes Tab */}
            <div className={`tab-content ${activeTab === 'group' ? 'active' : ''}`}>
              <h2>Group Classes</h2>
              <p className="subtitle">Small group training with maximum 4 participants. Expert instruction in an energizing environment.</p>

              <div className="info-banner">
                <span className="icon">ℹ</span>
                <p><strong>New to group classes?</strong> First-timers arrive 10 minutes early for orientation. Our trainers will guide you through everything!</p>
              </div>

              <div className="quick-info">
                <div className="info-card">
                  <h3>Class Duration</h3>
                  <p>45 minutes of comprehensive Pilates workout</p>
                </div>
                <div className="info-card">
                  <h3>Group Size</h3>
                  <p>Maximum 4 people for personalized attention</p>
                </div>
                <div className="info-card">
                  <h3>What to Bring</h3>
                  <p>Water bottle, towel, grip socks (recommended, available for purchase at studio)</p>
                </div>
              </div>

              {/* MindBody Widget for Group Classes */}
              <div className="widget-container">
                <div 
                  className="mindbody-widget" 
                  data-widget-type="Schedules" 
                  data-widget-id="2b9312c036" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>

            {/* Private Classes Tab */}
            <div className={`tab-content ${activeTab === 'private' ? 'active' : ''}`}>
              <h2>Private Classes</h2>
              <p className="subtitle">Personalized training tailored to your specific goals and fitness level. Available as one-on-one, couple, or trio classes.</p>

              <div className="info-banner">
                <span className="icon">ℹ</span>
                <p><strong>Personalized attention guaranteed!</strong> Private classes are customized to your goals, injuries, or specific needs. Train solo, with a partner, or with two friends.</p>
              </div>

              <div className="quick-info">
                <div className="info-card">
                  <h3>Class Duration</h3>
                  <p>45 minutes of focused, personalized training</p>
                </div>
                <div className="info-card">
                  <h3>Class Options</h3>
                  <p>One-on-One, Couple, or Trio (3 people)</p>
                </div>
                <div className="info-card">
                  <h3>Customized Program</h3>
                  <p>Workout adapted to your goals and level</p>
                </div>
                <div className="info-card">
                  <h3>What to Bring</h3>
                  <p>Comfortable fitted clothing, socks (grip socks recommended), water bottle, towel (recommended)</p>
                </div>
              </div>

              {/* MindBody Widget for Private Classes */}
              <div className="widget-container">
                <div 
                  className="mindbody-widget" 
                  data-widget-type="Appointments" 
                  data-widget-id="2b18450c036" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <h2>Need Help Choosing?</h2>
            <p>Not sure whether group classes or private classes are right for you? Check out our pricing or contact us for guidance.</p>
            <a href="/pricing" className="cta-button">View Pricing & Packages</a>
          </div>
        </section>
      </div>
    </>
  );
};

