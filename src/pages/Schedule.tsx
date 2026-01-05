import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { BookingGuide } from '../components/BookingGuide';
import { trackScheduleVisit, trackPageView } from '../utils/gtmTracking';
import '../styles/Schedule.css';

export const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('group');

  useEffect(() => {
    // Track page view
    trackPageView('/schedule', 'Schedule & Book Your Session');
    trackScheduleVisit();

    // Load MindBody Branded Web widget script once on mount
    const existingScript = document.querySelector('script[src*="brandedweb.mindbodyonline.com"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://brandedweb.mindbodyonline.com/embed/widget.js';
      script.async = true;
      
      // Add script and wait for it to load
      script.onload = () => {
        console.log('MindBody widget script loaded');
      };
      
      script.onerror = () => {
        console.error('Failed to load MindBody widget script');
      };
      
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Book Classes - Pilates, TRX & Training | PT Studio 7 Museumplein Amsterdam"
        description="Book Pilates, TRX, Strength Training at PT Studio 7 Museumplein. Small group classes (max 5) & private classes with expert trainers. 45-min classes. Premium location across from Stedelijk Museum."
        keywords="book Pilates Amsterdam, book TRX Amsterdam, Pilates Museumplein, small group fitness Amsterdam, private training booking Amsterdam, Pilates schedule, boutique gym booking Amsterdam, Pilates near Rijksmuseum, intimate fitness classes Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/schedule"
        ogTitle="Book Your Class | Pilates, TRX & Training at PT Studio 7 Museumplein"
        ogDescription="Reserve your spot in small group classes (max 5) or private classes. Pilates, TRX, Strength Training. Expert trainers. Premium Museumplein location."
      />

      <div className="schedule-page">
        {/* Hero Section */}
        <section className="schedule-hero">
          <div className="schedule-hero-content">
            <h1>Schedule & Book Your Session</h1>
            <p>Pilates • TRX • Strength Training • Cardio<br/>
            Small group classes (max 5) or private classes with expert trainers</p>
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
              <p className="subtitle">Small group training with maximum 5 participants. Expert instruction in an energizing environment.</p>

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
                  <p>Maximum 5 people for personalized attention</p>
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
            <Link to="/pricing" className="cta-button">View Pricing & Packages</Link>
          </div>
        </section>
      </div>

      {/* Floating Booking Help */}
      <BookingGuide />
    </>
  );
};

