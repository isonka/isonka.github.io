import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { ServiceTrustBand } from '../components/ServiceTrustBand';
import { BASE_URL } from '../data/business';
import { COUPLE, PRIVATE, formatEur } from '../data/pricing';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const prices = {
  privateFrom: formatEur(PRIVATE.junior.single),
  privatePack20: formatEur(PRIVATE.junior.pack20),
  coupleFrom: formatEur(COUPLE.single),
};

const FAQ_KEYS = ['difference', 'people', 'frequency', 'experience', 'trial', 'price', 'equipment'] as const;

export const PrivatePilates = () => {
  const { t } = useTranslation('privatePilates');
  const page = useLocalizedPage('/private-pilates-amsterdam/');
  const { href } = page;

  useEffect(() => {
    trackPageView(page.path, t('seo.analyticsTitle'));
  }, [page.path, t]);

  const faqs = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.q`),
    answer: t(`faq.${key}.a`, prices),
  }));

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description', prices)}
        keywords={t('seo.keywords')}
        canonical={page.canonical}
        ogTitle={t('seo.ogTitle', prices)}
        ogDescription={t('seo.ogDescription', prices)}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData type="FAQPage" data={{ faqs }} />
      <StructuredData
        type="Service"
        data={{
          service: {
            name: t('service.name'),
            description: t('service.description', prices),
            serviceUrl: page.canonical,
            areaServed: 'Amsterdam',
            offers: [
              {
                name: t('service.offerOne'),
                price: String(PRIVATE.junior.single),
                priceCurrency: 'EUR',
                url: `${BASE_URL}${href('/pricing/')}`,
              },
              {
                name: t('service.offerDuo'),
                price: String(COUPLE.single),
                priceCurrency: 'EUR',
                url: `${BASE_URL}${href('/pricing/')}`,
              },
            ],
          },
        }}
      />
      <Breadcrumbs items={[{ name: t('breadcrumb'), path: page.path }]} />

      <div className="service-page">
        <Reveal className="service-hero">
          <div className="service-hero-content">
            <p className="kicker">{t('hero.kicker')}</p>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.lead')}</p>
            <div className="service-hero-badges">
              <span className="service-badge">{t('hero.badgeOne')}</span>
              <span className="service-badge">{t('hero.badgeDuo')}</span>
              <span className="service-badge">{t('hero.badgeLevels')}</span>
              <span className="service-badge">{t('hero.badgeArea')}</span>
            </div>
            <Link to={href('/schedule/')} className="service-hero-btn">{t('hero.cta')}</Link>
          </div>
        </Reveal>

        <ServiceTrustBand
          imageSrc="/assets/images/reformer_2.webp"
          imageAlt={t('trust.imageAlt')}
          priceAnchor={t('trust.priceAnchor', prices)}
          testimonial={t('trust.testimonial')}
          testimonialAuthor={`Maya · ${t('trust.reviewSource')}`}
          ctaTo={href('/pricing/#private-classes')}
          ctaLabel={t('trust.ctaLabel')}
        />

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('intro.title')}</h2>
            <p>{t('intro.p1')}</p>
            <p>{t('intro.p2')}</p>
            <p>
              <Trans
                ns="privatePilates"
                i18nKey="intro.p3"
                components={{ prenatal: <Link to={href('/prenatal-pilates-amsterdam/')} /> }}
              />
            </p>
            <p>
              <Trans
                ns="privatePilates"
                i18nKey="intro.p4"
                components={{ reformer: <Link to={href('/reformer-pilates-amsterdam/')} /> }}
              />
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('formats.title')}</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>{t('formats.oneTitle')}</h3>
                <p>{t('formats.oneText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('formats.duoTitle')}</h3>
                <p>{t('formats.duoText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('formats.scheduleTitle')}</h3>
                <p>{t('formats.scheduleText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('formats.equipmentTitle')}</h3>
                <p>{t('formats.equipmentText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('formats.injuryTitle')}</h3>
                <p>{t('formats.injuryText')}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('faqTitle')}</h2>
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
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.text')}</p>
          <div className="service-cta-buttons">
            <Link to={href('/schedule/')} className="service-cta-btn-primary">{t('cta.book')}</Link>
            <Link to={href('/pricing/')} className="service-cta-btn-secondary">{t('cta.pricing')}</Link>
          </div>
        </Reveal>
      </div>
    </>
  );
};
