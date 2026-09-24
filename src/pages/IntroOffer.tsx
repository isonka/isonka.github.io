import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { ServiceTrustBand } from '../components/ServiceTrustBand';
import { StableHealcodeSlot } from '../components/StableHealcodeSlot';
import { trackPageView } from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import { CLASS_MINUTES, GROUP_MAX, INTRO, formatEur } from '../data/pricing';
import { business } from '../data/business';
import { useLocale } from '../i18n/useLocale';
import '../styles/ServicePage.css';
import '../styles/IntroOffer.css';

const INTRO_URL_EN = 'https://www.pt7.nl/intro/';
const INTRO_URL_NL = 'https://www.pt7.nl/intro/nl/';

const INTRO_HREFLANG = [
  { hreflang: 'en', href: INTRO_URL_EN },
  { hreflang: 'nl', href: INTRO_URL_NL },
  { hreflang: 'x-default', href: INTRO_URL_EN },
];

const INTRO_SERVICE =
  'data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100066" data-bw-identity-site="true" data-type="pricing-link"';

function IntroBuy({ label }: { label: string }) {
  return (
    <StableHealcodeSlot
      className="intro-buy"
      html={`<healcode-widget ${INTRO_SERVICE} data-inner-html="${label}"></healcode-widget>`}
    />
  );
}

export const IntroOffer = () => {
  const { t } = useTranslation('intro');
  const { t: tHome } = useTranslation('home');
  const locale = useLocale();
  const isNl = locale === 'nl';
  const values = {
    classes: String(INTRO.classes),
    price: formatEur(INTRO.price),
    weeks: String(INTRO.classes),
    groupMax: String(GROUP_MAX),
    minutes: String(CLASS_MINUTES),
    street: business.address.streetAddress,
  };
  const canonical = isNl ? INTRO_URL_NL : INTRO_URL_EN;
  const pricingHref = isNl ? '/pricing/nl/' : '/pricing/';
  const scheduleHref = isNl ? '/schedule/nl/' : '/schedule/';
  const faqs = [
    { question: t('faq.who.question'), answer: t('faq.who.answer') },
    { question: t('faq.valid.question'), answer: t('faq.valid.answer', values) },
    { question: t('faq.which.question'), answer: t('faq.which.answer') },
    { question: t('faq.size.question'), answer: t('faq.size.answer', values) },
    { question: t('faq.after.question'), answer: t('faq.after.answer') },
  ];

  useEffect(() => {
    trackPageView(isNl ? '/intro/nl/' : '/intro/', t('seo.analyticsTitle'));
    void ensureHealcodeLoaded();
  }, [isNl, t]);

  return (
    <>
      <SEOHead
        title={t('seo.title', values)}
        description={t('seo.description', values)}
        keywords={t('seo.keywords')}
        canonical={canonical}
        ogTitle={t('seo.ogTitle', values)}
        ogDescription={t('seo.ogDescription', values)}
        ogLocale={isNl ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={isNl ? ['en_US'] : ['nl_NL']}
        htmlLang={isNl ? 'nl' : 'en'}
        hreflangAlternates={INTRO_HREFLANG}
      />
      <StructuredData type="FAQPage" data={{ faqs }} />
      <Breadcrumbs items={[{ name: t('breadcrumb'), path: isNl ? '/intro/nl/' : '/intro/' }]} />

      <div className="service-page">
        <Reveal className="service-hero">
          <div className="service-hero-content">
            <p className="kicker">{t('hero.kicker')}</p>
            <h1>{t('hero.title', values)}</h1>
            <p>{t('hero.lead', values)}</p>
            <div className="service-hero-badges">
              <span className="service-badge">{t('badges.clients')}</span>
              <span className="service-badge">{t('badges.weeks', values)}</span>
              <span className="service-badge">{t('badges.size', values)}</span>
              <span className="service-badge">{t('badges.length', values)}</span>
            </div>
            <IntroBuy label={t('buy')} />
          </div>
        </Reveal>

        <ServiceTrustBand
          layout="proof"
          imageSrc="/assets/images/reformer-pilates-amsterdam.jpg"
          imageAlt={t('imageAlt')}
          imageWidth={1600}
          imageHeight={2400}
          priceAnchor={t('hero.title', values)}
          testimonial={tHome('reviews.items.flaminia.pull')}
          testimonialAuthor={`${tHome('reviews.items.flaminia.author')} · ${tHome('reviews.items.flaminia.meta')}`}
          ctaTo={pricingHref}
          ctaLabel={t('pricingLink')}
        />

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('included.title')}</h2>
            <p>{t('hero.fineprint', values)}</p>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>{t('included.classes', values)}</h3>
                <p>{t('included.formats')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('included.size', values)}</h3>
                <p>{t('faq.size.answer', values)}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('included.length', values)}</h3>
                <p>{t('included.place', values)}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('steps.title')}</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>1. {t('steps.buyTitle')}</h3>
                <p>{t('steps.buyText', values)}</p>
              </div>
              <div className="service-benefit-card">
                <h3>2. {t('steps.bookTitle')}</h3>
                <p>
                  {t('steps.bookText')}{' '}
                  <Link to={scheduleHref}>{t('scheduleCta')}</Link>
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>3. {t('steps.arriveTitle')}</h3>
                <p>{t('steps.arriveText', values)}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('faq.title')}</h2>
            <div className="service-faq-list">
              {faqs.map((faq) => (
                <div key={faq.question} className="service-faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="service-cta-section">
          <h2>{t('close.title', values)}</h2>
          <p>{t('close.text')}</p>
          <div className="service-cta-buttons">
            <IntroBuy label={t('buy')} />
            <Link to={scheduleHref} className="service-cta-btn-secondary">
              {t('scheduleCta')}
            </Link>
            <Link to={pricingHref} className="service-cta-btn-secondary">
              {t('pricingLink')}
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
};
