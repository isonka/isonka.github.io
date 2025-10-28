import { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import '../styles/Pricing.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'healcode-widget': any;
    }
  }
}

export const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('membership');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    
    // Scroll to tab content on mobile
    setTimeout(() => {
      const tabContent = document.querySelector('.pricing-content');
      if (tabContent) {
        const offsetTop = tabContent.getBoundingClientRect().top + window.scrollY - 80; // 80px offset for navbar
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    // Adjust content height for animations
    const faqContents = document.querySelectorAll('.faq-content');
    faqContents.forEach((content) => {
      const element = content as HTMLElement;
      if (element.parentElement?.classList.contains('active')) {
        element.style.maxHeight = element.scrollHeight + 50 + 'px';
      } else {
        element.style.maxHeight = '0';
      }
    });
  }, [openFaqIndex]);

  useEffect(() => {
    // Trigger healcode widget initialization after tab change
    const timer = setTimeout(() => {
      if ((window as any).HealcodeWidget && typeof (window as any).HealcodeWidget.init === 'function') {
        try {
          (window as any).HealcodeWidget.init();
        } catch (e) {
          console.log('HealcodeWidget init error:', e);
        }
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <>
      <SEOHead
        title="Pricing - Reformer Pilates Classes & Memberships | PT Studio 7 Museumplein"
        description="Flexible Reformer Pilates pricing at Museumplein. Small group classes (max 4), memberships, private sessions. Expert instructors. Premium location. Complementary EMS & TRX. From €28/class."
        keywords="Reformer Pilates prices Amsterdam, Pilates membership Amsterdam, Pilates class rates Museumplein, small group Pilates pricing, boutique Pilates studio membership Amsterdam, private Pilates rates Museumplein, couple Pilates Amsterdam, Pilates packages Amsterdam, intimate Pilates classes pricing Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/pricing"
        ogTitle="PT Studio 7 Pricing | Reformer Pilates Packages at Museumplein"
        ogDescription="Small group Reformer Pilates (max 4) from €28/class. Memberships & private sessions available. Expert instructors at Amsterdam's most exclusive Museumplein Pilates studio."
      />

      <div className="pricing-page">
        <div className="pricing-hero">
          <h1>Pricing & Membership</h1>
          <p>Reformer Pilates Classes - Small groups (max 4) at Museumplein</p>
        </div>

        {/* Introduction Package - Special Offer */}
        <div className="special-offer-container">
          <div className="special-offer">
            <span className="offer-badge">Special Offer</span>
            <h3>Introduction Package</h3>
            <p>Perfect starter: 1 group class + 1 personal training session</p>
            <span className="special-price">€105.30</span>
            <a 
              href="https://clients.mindbodyonline.com/classic/ws?studioid=5741736&stype=40" 
              className="buy-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="pricing-tabs">
          <button
            className={`pricing-tab ${activeTab === 'membership' ? 'active' : ''}`}
            onClick={() => handleTabChange('membership')}
          >
            Membership
          </button>
          <button
            className={`pricing-tab ${activeTab === 'group' ? 'active' : ''}`}
            onClick={() => handleTabChange('group')}
          >
            Group Classes
          </button>
          <button
            className={`pricing-tab ${activeTab === 'private' ? 'active' : ''}`}
            onClick={() => handleTabChange('private')}
          >
            Private Lessons
          </button>
          <button
            className={`pricing-tab ${activeTab === 'couple' ? 'active' : ''}`}
            onClick={() => handleTabChange('couple')}
          >
            Couple Sessions
          </button>
          <button
            className={`pricing-tab ${activeTab === 'trio' ? 'active' : ''}`}
            onClick={() => handleTabChange('trio')}
          >
            Trio Classes
          </button>
        </div>

        {/* Membership Content */}
        {activeTab === 'membership' && (
          <div className="pricing-content">
            <h2 className="pricing-section-title">Weekday Membership</h2>
            <p className="pricing-subtitle">Valid Monday-Friday, 9:00-17:00 • Maximum 1 class per day</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€21.50 <span className="per-person">per class</span></h4>
                  <span className="package-name">4 Classes in 1 Month</span>
                </div>
                <p className="total-price">€86 in total</p>
                <p className="validity">Weekdays 9:00-17:00 • 1 class/day</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  1-month period • You can cancel after first month • Auto-renews monthly unless cancelled
                </p>
                <a
                  href="https://clients.mindbodyonline.com/classic/ws?studioid=5741736&stype=43&prodid=100043"
                  className="buy-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now
                </a>
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€20 <span className="per-person">per class</span></h4>
                  <span className="package-name">8 Classes in 1 Month</span>
                </div>
                <p className="total-price">€160 in total</p>
                <p className="validity">Weekdays 9:00-17:00 • 1 class/day</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  1-month period • You can cancel after first month • Auto-renews monthly unless cancelled
                </p>
                <a
                  href="https://clients.mindbodyonline.com/classic/ws?studioid=5741736&stype=43&prodid=100044"
                  className="buy-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now
                </a>
              </div>

              <div className="package-card featured">
                <div className="badge">Most Popular</div>
                <div className="price-display">
                  <h4 className="price-per-class">€350 <span className="per-person">per month</span></h4>
                  <span className="package-name">Unlimited 3 Months</span>
                </div>
                <p className="total-price">Unlimited classes during weekdays</p>
                <p className="validity">Weekdays 9:00-17:00 • 1 class/day</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  3-month commitment • You can cancel after 3 months • Auto-renews unless cancelled
                </p>
                <a
                  href="https://clients.mindbodyonline.com/classic/ws?studioid=5741736&stype=43&prodid=100042"
                  className="buy-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now
                </a>
              </div>

              <div className="package-card">
                <div className="badge">Best Value</div>
                <div className="price-display">
                  <h4 className="price-per-class">€250 <span className="per-person">per month</span></h4>
                  <span className="package-name">Annual Unlimited</span>
                </div>
                <p className="total-price">€3,000/year • Includes 4-week freeze option</p>
                <p className="validity">Weekdays 9:00-17:00 • 1 class/day</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  12-month commitment • You can cancel after 12 months • Auto-renews unless cancelled
                </p>
                <a
                  href="https://clients.mindbodyonline.com/classic/ws?studioid=5741736&stype=43&prodid=100041"
                  className="buy-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Group Classes Content */}
        {activeTab === 'group' && (
          <div className="pricing-content">
            <h2 className="pricing-section-title">Small Group Classes</h2>
            <p className="pricing-subtitle">Small group training with maximum 4 participants. Expert instruction in an energizing environment. 45-minute sessions.</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€37 <span className="per-person">per person</span></h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100002" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€35 <span className="per-person">per person</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">€175 in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100003" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Most Popular</div>
                <div className="price-display">
                  <h4 className="price-per-class">€30 <span className="per-person">per person</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">€300 in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100004" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€28 <span className="per-person">per person</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">€560 in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100005" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Private Lessons Content */}
        {activeTab === 'private' && (
          <div className="pricing-content">
            <h2 className="pricing-section-title">One-on-One Private Sessions</h2>
            <p className="pricing-subtitle">One-on-one personalized training tailored to your specific goals and fitness level. 45-minute sessions.</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€80</h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100012" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€75</h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">€375 in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100013" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Best Value</div>
                <div className="price-display">
                  <h4 className="price-per-class">€72.50</h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">€725 in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100014" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€70</h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">€1,400 in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100015" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Couple Sessions Content */}
        {activeTab === 'couple' && (
          <div className="pricing-content">
            <h2 className="pricing-section-title">Couple Sessions</h2>
            <p className="pricing-subtitle">Train together with your partner. Share the experience and motivate each other. Price shown per person. 45-minute sessions.</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€50 <span className="per-person">per person</span></h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100033" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€45 <span className="per-person">per person</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">€225 in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100034" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Best Value</div>
                <div className="price-display">
                  <h4 className="price-per-class">€43 <span className="per-person">per person</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">€430 in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100035" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€40 <span className="per-person">per person</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">€800 in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100036" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Trio Classes Content */}
        {activeTab === 'trio' && (
          <div className="pricing-content">
            <h2 className="pricing-section-title">Trio Classes</h2>
            <p className="pricing-subtitle">Train with two friends or family members. Perfect for small groups who want personalized attention. Price shown per person. 45-minute sessions.</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€45 <span className="per-person">per person</span></h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100037" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€42 <span className="per-person">per person</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">€210 in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100038" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Best Value</div>
                <div className="price-display">
                  <h4 className="price-per-class">€40 <span className="per-person">per person</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">€400 in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100039" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">€38 <span className="per-person">per person</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">€760 in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <div 
                  className="buy-button healcode-pricing-option-text-link"
                  dangerouslySetInnerHTML={{
                    __html: '<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script><healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100040" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* What to Bring Section */}
        <div className="info-section">
          <div className="info-container">
            <h2 className="info-title">What to Bring</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Comfortable Clothing</h3>
                <p>Wear comfortable workout clothes that allow you to move freely. We recommend athletic wear that's not too loose.</p>
              </div>

              <div className="info-card">
                <h3>Grip Socks</h3>
                <p>Grip socks are recommended for all classes. Don't have them? You can purchase grip socks at our studio.</p>
              </div>

              <div className="info-card">
                <h3>Water Bottle</h3>
                <p>Stay hydrated! Bring your water bottle to keep refreshed during your 45-minute session.</p>
              </div>

              <div className="info-card">
                <h3>Towel (Optional)</h3>
                <p>While we provide everything else, you're welcome to bring a small towel if you prefer.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            
            <div className={`faq-item ${openFaqIndex === 0 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(0)}>
                <h3>How long are the packages valid?</h3>
                <span className="faq-icon">{openFaqIndex === 0 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p>Each package has a valid period of weeks equal to the number of lessons. For example, a 5-class package is valid for 5 weeks from the purchase date.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 1 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(1)}>
                <h3>Can I attend during pregnancy?</h3>
                <span className="faq-icon">{openFaqIndex === 1 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p>Pregnant clients are only accepted for one-on-one classes where we can provide personalized attention to ensure safety.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 2 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(2)}>
                <h3>What if I have injuries?</h3>
                <span className="faq-icon">{openFaqIndex === 2 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p>Please inform us if you have any injuries or joint problems before booking. Our trainers can modify exercises to accommodate your needs.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 3 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(3)}>
                <h3>Can I try before I commit to a package?</h3>
                <span className="faq-icon">{openFaqIndex === 3 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p>Yes! We offer single class options for all training types, and we recommend starting with a smaller package to try our classes.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 4 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(4)}>
                <h3>How do membership renewals work?</h3>
                <span className="faq-icon">{openFaqIndex === 4 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p><strong>1-Month Memberships (4 & 8 classes):</strong> 1-month period. You can cancel after the first month. Auto-renews monthly unless cancelled.</p>
                <p><strong>3-Month Membership:</strong> 3-month commitment. You can cancel after 3 months. Auto-renews unless cancelled.</p>
                <p><strong>Annual Membership:</strong> 12-month commitment. You can cancel after 12 months. Auto-renews unless cancelled.</p>
                <p>If you don't cancel before the renewal date, payments will be processed automatically.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 5 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(5)}>
                <h3>Can I cancel my membership?</h3>
                <span className="faq-icon">{openFaqIndex === 5 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p>Yes! In 1-month memberships (4 & 8 classes), you have the right to cancel after the first month. The 3-month and annual memberships can be cancelled after you complete your initial commitment period (3 or 12 months).</p>
                <p>To cancel, contact us via email at <a href="mailto:info@ptstudio7amsterdam.nl">info@ptstudio7amsterdam.nl</a> or call <a href="tel:+31685162693">06 85 16 26 93</a> before your renewal date.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 6 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(6)}>
                <h3>Is the annual membership unlimited classes?</h3>
                <span className="faq-icon">{openFaqIndex === 6 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p>Yes! The annual membership at €250 per month (€3,000 for 12 months total) gives you UNLIMITED classes during weekdays (Monday-Friday, 9:00-17:00), with a maximum of 1 class per day. This is our best value option and includes a 4-week freeze option.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 7 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(7)}>
                <h3>What's the class duration?</h3>
                <span className="faq-icon">{openFaqIndex === 7 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p>All our classes are 45 minutes long, providing an effective and efficient workout that fits into your busy schedule.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 8 ? 'active' : ''}`}>
              <div className="faq-header" onClick={() => toggleFaq(8)}>
                <h3>How many people in group classes?</h3>
                <span className="faq-icon">{openFaqIndex === 8 ? '−' : '+'}</span>
              </div>
              <div className="faq-content">
                <p>Our group classes have a maximum of 4 participants, ensuring you receive personalized attention while enjoying the energy of a group setting.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="contact-cta">
          <h2>Need Assistance?</h2>
          <p>We care about you! Email any assistance you need or call us for personalized guidance.</p>
          <div className="cta-buttons">
            <a href="mailto:info@ptstudio7amsterdam.nl" className="cta-button primary">Email Us</a>
            <a href="tel:+31685162693" className="cta-button secondary">Call: 06 85 16 26 93</a>
          </div>
        </div>
      </div>
    </>
  );
};

