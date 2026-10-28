import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import '../styles/ClassPassOffer.css';

const FAQ_KEYS = ['occasional', 'commit', 'claim', 'experience'] as const;
const BENEFIT_KEYS = ['booking', 'coaching', 'tracking', 'results', 'community', 'value'] as const;
const HEARD_KEYS = ['scheduling', 'instructors', 'simpler'] as const;

export const ClassPassOffer = () => {
  const { t } = useTranslation('classpass');
  const page = useLocalizedPage('/classpass-offer/');
  const { href } = page;

  const classPassFaqs = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.q`),
    answer: t(`faq.${key}.a`),
  }));

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={page.canonical}
        robots="noindex, follow"
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData type="FAQPage" data={{ faqs: classPassFaqs }} />
      <Breadcrumbs items={[{ name: t('breadcrumb'), path: page.path }]} />

      <div className="classpass-offer-page">
        <section className="cp-hero">
          <div className="cp-hero-overlay">
            <div className="cp-hero-content">
              <span className="cp-badge">{t('hero.badge')}</span>
              <h1>
                <Trans t={t} i18nKey="hero.title" components={{ br: <br /> }} />
              </h1>
              <p className="cp-hero-subtitle">{t('hero.subtitle')}</p>
              <a href="#offer" className="cp-cta-button hero-cta">{t('hero.cta')}</a>
            </div>
          </div>
        </section>

        <section className="cp-comparison" id="offer">
          <h2>{t('comparison.title')}</h2>
          <p className="section-subtitle">{t('comparison.subtitle')}</p>

          <div className="comparison-grid">
            <div className="comparison-card classpass-card">
              <div className="card-header">
                <img
                  src="https://cdn9.classpass.com/dist/gfe-v2/_next/static/media/logotype.f52b0a12.svg"
                  alt="ClassPass"
                  className="cp-logo"
                  loading="lazy"
                  decoding="async"
                />
                <span className="card-label">{t('comparison.classpassLabel')}</span>
              </div>
              <div className="card-body">
                <div className="price-row">
                  <span>{t('comparison.planNeeded')}</span>
                  <span className="price strike">{t('comparison.perMonth', { price: '€99' })}</span>
                </div>
                <div className="price-row">
                  <span>{t('comparison.costPerClass')}</span>
                  <span className="price strike">~€25</span>
                </div>
                <div className="price-row">
                  <span>{t('comparison.priority')}</span>
                  <span className="price no">{t('comparison.lastInLine')}</span>
                </div>
                <div className="price-row">
                  <span>{t('comparison.sameInstructor')}</span>
                  <span className="price no">✗</span>
                </div>
                <div className="price-row">
                  <span>{t('comparison.progress')}</span>
                  <span className="price no">✗</span>
                </div>
              </div>
            </div>

            <div className="comparison-card direct-card">
              <div className="card-header">
                <img
                  src="/assets/images/pt7logo.webp"
                  alt="PT7"
                  className="pt7-logo"
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                />
                <span className="card-label">{t('comparison.directLabel')}</span>
              </div>
              <div className="card-body">
                <div className="price-row highlight">
                  <span>{t('comparison.monthlyCost')}</span>
                  <span className="price">{t('comparison.perMonth', { price: '€86' })}</span>
                </div>
                <div className="price-row highlight">
                  <span>{t('comparison.costPerClass')}</span>
                  <span className="price">€21.50</span>
                </div>
                <div className="price-row">
                  <span>{t('comparison.priority')}</span>
                  <span className="price yes">{t('comparison.firstAccess')}</span>
                </div>
                <div className="price-row">
                  <span>{t('comparison.sameInstructor')}</span>
                  <span className="price yes">✓</span>
                </div>
                <div className="price-row">
                  <span>{t('comparison.progress')}</span>
                  <span className="price yes">✓</span>
                </div>
              </div>
            </div>
          </div>

          <div className="savings-highlight">
            <span className="savings-number">{t('comparison.savings', { amount: '€156' })}</span>
            <span className="savings-text">{t('comparison.savingsText')}</span>
          </div>
        </section>

        <section className="cp-exclusive-offer">
          <div className="offer-container">
            <span className="offer-badge">{t('offer.badge')}</span>
            <h2>{t('offer.title')}</h2>
            <p className="offer-description">
              <Trans t={t} i18nKey="offer.description" components={{ strong: <strong /> }} />
            </p>
            <div className="offer-details">
              <div className="offer-item">
                <h4>{t('offer.four')}</h4>
                <p className="original-price">€86</p>
                <p className="offer-price">€69</p>
                <p className="per-class">{t('offer.perClass', { price: '€17.25' })}</p>
              </div>
              <div className="offer-item">
                <h4>{t('offer.eight')}</h4>
                <p className="original-price">€160</p>
                <p className="offer-price">€128</p>
                <p className="per-class">{t('offer.perClass', { price: '€16' })}</p>
              </div>
            </div>
            <p className="offer-note">{t('offer.note')}</p>
            <Link to={href('/pricing/')} className="cp-cta-button offer-cta">{t('offer.cta')}</Link>
          </div>
        </section>

        <section className="cp-benefits">
          <h2>{t('benefits.title')}</h2>
          <div className="benefits-grid">
            {BENEFIT_KEYS.map((key) => (
              <div key={key} className="benefit-card">
                <span className="benefit-icon">{t(`benefits.${key}.tag`)}</span>
                <h3>{t(`benefits.${key}.title`)}</h3>
                <p>{t(`benefits.${key}.text`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cp-testimonials">
          <h2>{t('heard.title')}</h2>
          <div className="testimonials-grid">
            {HEARD_KEYS.map((key) => (
              <div key={key} className="testimonial-card">
                <p className="testimonial-text">{t(`heard.${key}`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cp-faq">
          <h2>{t('faqTitle')}</h2>
          <div className="faq-grid">
            {classPassFaqs.map((faq) => (
              <div key={faq.question} className="faq-item">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cp-final-cta">
          <h2>{t('final.title')}</h2>
          <p>{t('final.text')}</p>
          <div className="cta-buttons">
            <Link to={href('/pricing/')} className="cp-cta-button primary">{t('final.pricing')}</Link>
            <Link to={href('/schedule/')} className="cp-cta-button secondary">{t('final.schedule')}</Link>
          </div>
        </section>
      </div>
    </>
  );
};
