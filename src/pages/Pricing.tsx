import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPricingView, trackPageView } from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import { StableHealcodeSlot } from '../components/StableHealcodeSlot';
import {
  CLASS_MINUTES,
  COUPLE,
  GROUP,
  GROUP_MAX,
  INTRO,
  MEMBERSHIP,
  PRIVATE,
  TRIO,
  formatEur,
  packTotal,
} from '../data/pricing';
import '../styles/Pricing.css';

const pricingSeoOnlyFaqs = (formatPrice: typeof formatEur) => [
  {
    question: 'How much do Pilates classes cost in Amsterdam?',
    answer: `Group Reformer Pilates classes start from ${formatPrice(GROUP.pack20.perClass)} per class with a 20-class pack (${formatPrice(GROUP.pack20.total)} total). Single group classes are ${formatPrice(GROUP.single)}. Private sessions start from ${formatPrice(PRIVATE.junior.single)}. Full packages are listed on this page.`,
  },
  {
    question: 'Is there an intro offer for new clients?',
    answer: `Yes. New clients can start with our introduction package: ${INTRO.classes} group classes for ${formatPrice(INTRO.price)} (new clients only).`,
  },
];

const pricingVisibleFaqs = (formatPrice: typeof formatEur) => [
  {
    question: 'How long are the packages valid?',
    answer:
      'Each package has a valid period of weeks equal to the number of lessons. For example, a 5-class package is valid for 5 weeks from the purchase date.',
  },
  {
    question: 'Can I attend during pregnancy?',
    answer:
      'Pregnant clients are only accepted for one-on-one classes where we can provide personalized attention to ensure safety.',
  },
  {
    question: 'What if I have injuries?',
    answer:
      'Please inform us if you have any injuries or joint problems before booking. Our trainers can modify exercises to accommodate your needs.',
  },
  {
    question: 'Can I try before I commit to a package?',
    answer:
      'Yes! We offer single class options for all training types, and we recommend starting with a smaller package to try our classes.',
  },
  {
    question: 'How do membership renewals work?',
    answer:
      "1-Month Memberships (4 & 8 classes): 1-month period. You can cancel after the first month. Auto-renews monthly unless cancelled. 3-Month Membership: 3-month commitment. You can cancel after 3 months. Auto-renews unless cancelled. Annual Membership: 12-month commitment. You can cancel after 12 months. Auto-renews unless cancelled. If you don't cancel before the renewal date, payments will be processed automatically.",
  },
  {
    question: 'Can I cancel my membership?',
    answer:
      'Yes! In 1-month memberships (4 & 8 classes), you have the right to cancel after the first month. The 3-month and annual memberships can be cancelled after you complete your initial commitment period (3 or 12 months). To cancel, contact us via email at info@pt7.nl or call +31 685 162693 before your renewal date.',
  },
  {
    question: 'Is the annual membership unlimited classes?',
    answer:
      `Yes! The annual membership at ${formatPrice(MEMBERSHIP.annual.perMonth)} per month (${formatPrice(MEMBERSHIP.annual.yearTotal)} for 12 months total) gives you unlimited classes (all days, 7:00-18:00), with a maximum of 1 class per day. This is our best value option and includes a 4-week freeze option.`,
  },
  {
    question: "What's the class duration?",
    answer:
      `All our classes are ${CLASS_MINUTES} minutes long, providing an effective and efficient workout that fits into your busy schedule.`,
  },
  {
    question: 'How many people in group classes?',
    answer:
      `Our group classes have a maximum of ${GROUP_MAX} participants, ensuring you receive personalized attention while enjoying the energy of a group setting.`,
  },
];

export const Pricing= () => {
  const [instructorTier, setInstructorTier] = useState<keyof typeof PRIVATE>('master');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    trackPageView('/pricing/', 'Pilates Class Prices Amsterdam | PT Studio 7');
    trackPricingView();
    void ensureHealcodeLoaded();
  }, []);

  useEffect(() => {
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

  const pricingVisible = pricingVisibleFaqs(formatEur);
  const pricingSchema = [...pricingSeoOnlyFaqs(formatEur), ...pricingVisible];

  return (
    <>
      <SEOHead
        title="Pilates Class Prices Amsterdam | Packages & Memberships | PT Studio 7"
        description={`Pilates class prices in Amsterdam at Museumplein. Small group classes (max ${GROUP_MAX}) from ${formatEur(GROUP.pack20.perClass)}/class, memberships, and private sessions. Reformer, TRX & strength.`}
        keywords="pilates class prices amsterdam, pilates prices amsterdam, Pilates prijzen Amsterdam, Pilates abonnement Amsterdam, Pilates prices Museumplein, reformer pilates prive amsterdam, kleine groep pilates amsterdam, private Pilates kosten, small group Pilates pricing, proefles Pilates Amsterdam, strippenkaart Pilates"
        canonical="https://www.pt7.nl/pricing/"
        ogTitle="Pilates Class Prices Amsterdam | PT Studio 7 Museumplein"
        ogDescription={`Pilates class prices in Amsterdam: small groups (max ${GROUP_MAX}) from ${formatEur(GROUP.pack20.perClass)}/class. Memberships and private sessions at Museumplein.`}
      />
      <StructuredData type="FAQPage" data={{ faqs: pricingSchema }} />
      <Breadcrumbs items={[{ name: 'Pilates Class Prices Amsterdam', path: '/pricing/' }]} />

      <div className="pricing-page">
        <header className="pricing-hero">
          <p className="pricing-kicker">Pricing</p>
          <h1>Pilates class prices &amp; memberships in Amsterdam</h1>
          <p className="pricing-lead">
            Small groups (max {GROUP_MAX}), memberships, and private sessions at Museumplein.
            Ready to book?{' '}
            <Link to="/schedule/">View the class schedule</Link>.
          </p>
        </header>
        <div className="special-offer-container">
          <div className="special-offer">
            <span className="offer-badge">Special offer</span>
            <h3>Introduction package</h3>
            <p>New clients only: {INTRO.classes} group classes for {formatEur(INTRO.price)}</p>
            <span className="special-price">{formatEur(INTRO.price)}</span>
            <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100066" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
          </div>
        </div>

        <nav className="pricing-jump" aria-label="Pricing sections">
          <a href="#membership">Membership</a>
          <a href="#group-classes">Group</a>
          <a href="#private-classes">Private</a>
          <a href="#couple-classes">Couple</a>
          <a href="#trio-classes">Trio</a>
        </nav>

        <section className="pricing-content" id="membership">
            <p className="pricing-kicker">Membership</p>
            <h2 className="pricing-section-title">Membership</h2>
            <p className="pricing-subtitle">Valid all days • Maximum 1 class per day</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.four.perClass)} <span className="per-person">per class</span></h4>
                  <span className="package-name">{MEMBERSHIP.four.classes} Classes in 1 Month</span>
                </div>
                <p className="total-price">{formatEur(MEMBERSHIP.four.total)} in total</p>
                <p className="validity">All days • 1 class/day</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  1-month period • You can cancel after first month • Auto-renews monthly unless cancelled
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="104" data-bw-identity-site="true" data-type="contract-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.eight.perClass)} <span className="per-person">per class</span></h4>
                  <span className="package-name">{MEMBERSHIP.eight.classes} Classes in 1 Month</span>
                </div>
                <p className="total-price">{formatEur(MEMBERSHIP.eight.total)} in total</p>
                <p className="validity">All days • 1 class/day</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  1-month period • You can cancel after first month • Auto-renews monthly unless cancelled
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="107" data-bw-identity-site="true" data-type="contract-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Most Popular</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.unlimited3.perMonth)} <span className="per-person">per month</span></h4>
                  <span className="package-name">Unlimited 3 Months</span>
                </div>
                <p className="total-price">Unlimited classes</p>
                <p className="validity">All days • 1 class/day</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  3-month commitment • You can cancel after 3 months • Auto-renews unless cancelled
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="105" data-bw-identity-site="true" data-type="contract-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="badge">Best Value</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.annual.perMonth)} <span className="per-person">per month</span></h4>
                  <span className="package-name">Annual Unlimited</span>
                </div>
                <p className="total-price">{formatEur(MEMBERSHIP.annual.yearTotal)}/year • Includes 4-week freeze option</p>
                <p className="validity">All days • 1 class/day</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  12-month commitment • You can cancel after 12 months • Auto-renews unless cancelled
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="102" data-bw-identity-site="true" data-type="contract-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>
            </div>
        </section>

        <section className="pricing-content" id="group-classes">
            <p className="pricing-kicker">Group</p>
            <h2 className="pricing-section-title">Small group classes</h2>
            <p className="pricing-subtitle">Small group training with maximum {GROUP_MAX} participants. Expert instruction in an energizing environment. {CLASS_MINUTES}-minute sessions.</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(GROUP.single)} <span className="per-person">per person</span></h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100002" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(GROUP.pack5.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(GROUP.pack5.total)} in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100003" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Most Popular</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(GROUP.pack10.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(GROUP.pack10.total)} in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100004" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(GROUP.pack20.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(GROUP.pack20.total)} in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100005" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>
            </div>
        </section>

        <section className="pricing-content" id="private-classes">
            <p className="pricing-kicker">Private</p>
            <h2 className="pricing-section-title">Private classes</h2>
            <p className="pricing-subtitle">Personalized one-on-one training tailored to your specific goals and fitness level. Choose your instructor level. {CLASS_MINUTES}-minute classes.</p>
            
            <div className="instructor-tabs" role="tablist" aria-label="Instructor level">
              <button
                type="button"
                role="tab"
                aria-selected={instructorTier === 'master'}
                className={`instructor-tab ${instructorTier === 'master' ? 'active' : ''}`}
                onClick={() => setInstructorTier('master')}
              >
                Master Instructor
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={instructorTier === 'senior'}
                className={`instructor-tab ${instructorTier === 'senior' ? 'active' : ''}`}
                onClick={() => setInstructorTier('senior')}
              >
                Senior Instructor
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={instructorTier === 'junior'}
                className={`instructor-tab ${instructorTier === 'junior' ? 'active' : ''}`}
                onClick={() => setInstructorTier('junior')}
              >
                Junior Instructor
              </button>
            </div>

            <div className="instructor-panels">
            <div
              className={`instructor-panel${instructorTier === 'junior' ? ' is-active' : ''}`}
              role="tabpanel"
              aria-hidden={instructorTier !== 'junior'}
            >
            <p className="instructor-info">Junior Instructors: <strong>Gülce Koç</strong>, <strong>Lal Avgen</strong>, <strong>Nisan Atalay</strong>, <strong>Kelly Tin</strong>, <strong>E. Gamze Karadağ</strong></p>
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.junior.single)}</h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100052" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.junior.pack5)} <span className="per-person">per class</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.junior.pack5, 5))} in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100053" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.junior.pack10)} <span className="per-person">per class</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.junior.pack10, 10))} in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100054" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.junior.pack20)} <span className="per-person">per class</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.junior.pack20, 20))} in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100055" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>
            </div>
            </div>

            <div
              className={`instructor-panel${instructorTier === 'senior' ? ' is-active' : ''}`}
              role="tabpanel"
              aria-hidden={instructorTier !== 'senior'}
            >
            <p className="instructor-info">Senior Instructors: <strong>Gökben Öztekin</strong>, <strong>Göknur Dipli</strong></p>
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.senior.single)}</h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100012" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.senior.pack5)} <span className="per-person">per class</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.senior.pack5, 5))} in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100013" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Most Popular</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.senior.pack10)} <span className="per-person">per class</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.senior.pack10, 10))} in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100014" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.senior.pack20)} <span className="per-person">per class</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.senior.pack20, 20))} in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100015" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>
            </div>
            </div>

            <div
              className={`instructor-panel${instructorTier === 'master' ? ' is-active' : ''}`}
              role="tabpanel"
              aria-hidden={instructorTier !== 'master'}
            >
            <p className="instructor-info">Master Instructor: <strong>Elif Arzu Ogan</strong>: Owner & Head Instructor with 15+ years experience</p>
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.master.single)}</h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100048" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.master.pack5)} <span className="per-person">per class</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.master.pack5, 5))} in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100049" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.master.pack10)} <span className="per-person">per class</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.master.pack10, 10))} in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100050" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.master.pack20)} <span className="per-person">per class</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(packTotal(PRIVATE.master.pack20, 20))} in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100051" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>
            </div>
            </div>
            </div>
        </section>

        <section className="pricing-content" id="couple-classes">
            <p className="pricing-kicker">Couple</p>
            <h2 className="pricing-section-title">Couple classes</h2>
            <p className="pricing-subtitle">Train together with your partner. Share the experience and motivate each other. Price shown per person. {CLASS_MINUTES}-minute classes.</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(COUPLE.single)} <span className="per-person">per person</span></h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100033" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(COUPLE.pack5.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(COUPLE.pack5.total)} in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100034" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Best Value</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(COUPLE.pack10.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(COUPLE.pack10.total)} in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100035" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(COUPLE.pack20.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(COUPLE.pack20.total)} in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100036" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>
            </div>
        </section>

        <section className="pricing-content" id="trio-classes">
            <p className="pricing-kicker">Trio</p>
            <h2 className="pricing-section-title">Trio classes</h2>
            <p className="pricing-subtitle">Train with two friends or family members. Perfect for small groups who want personalized attention. Price shown per person. {CLASS_MINUTES}-minute classes.</p>
            
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(TRIO.single)} <span className="per-person">per person</span></h4>
                  <span className="package-name">Single Class</span>
                </div>
                <p className="validity">Valid for 1 week</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100037" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(TRIO.pack5.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">5-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(TRIO.pack5.total)} in total</p>
                <p className="validity">Valid for 5 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100038" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card featured">
                <div className="badge">Best Value</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(TRIO.pack10.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">10-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(TRIO.pack10.total)} in total</p>
                <p className="validity">Valid for 10 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100039" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(TRIO.pack20.perClass)} <span className="per-person">per person</span></h4>
                  <span className="package-name">20-Class Pack</span>
                </div>
                <p className="total-price">{formatEur(TRIO.pack20.total)} in total</p>
                <p className="validity">Valid for 20 weeks</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html='<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100040" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Now"></healcode-widget>'
                />
              </div>
            </div>
        </section>

        <div className="info-section">
          <div className="info-container">
            <p className="pricing-kicker">Studio</p>
            <h2 className="info-title">What to bring</h2>
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
                <p>Stay hydrated! Bring your water bottle to keep refreshed during your {CLASS_MINUTES}-minute session.</p>
              </div>

              <div className="info-card">
                <h3>Towel (Recommended)</h3>
                <p>We recommend bringing a small towel for your comfort, though it's not mandatory.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <div className="faq-container">
            <p className="pricing-kicker">FAQ</p>
            <h2>Questions before you book</h2>

            {pricingVisible.map((faq, index) => (
              <div key={faq.question} className={`faq-item ${openFaqIndex === index ? 'active' : ''}`}>
                <div className="faq-header" onClick={() => toggleFaq(index)}>
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
                </div>
                <div className="faq-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-cta">
          <p className="pricing-kicker pricing-kicker-on-dark">Contact</p>
          <h2>Need assistance?</h2>
          <p>Email us or call for guidance on packages and memberships.</p>
          <div className="cta-buttons">
            <a href="mailto:info@pt7.nl" className="cta-button primary">Email Us</a>
            <a href="tel:+31685162693" className="cta-button secondary">Call: +31 685 162693</a>
          </div>
        </div>
      </div>
    </>
  );
};

