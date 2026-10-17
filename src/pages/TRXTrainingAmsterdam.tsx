import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { ServiceTrustBand } from '../components/ServiceTrustBand';
import { BASE_URL } from '../data/business';
import { MEMBERSHIP, formatEur } from '../data/pricing';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';

const FAQ_KEYS = ['what', 'beginners', 'pilates', 'length', 'clothing', 'where', 'machines'] as const;
const BENEFIT_KEYS = ['fullBody', 'core', 'joints', 'functional', 'scalable', 'pilates'] as const;

export const TRXTrainingAmsterdam = () => {
  const { t } = useTranslation('trx');
  const page = useLocalizedPage('/trx-training-amsterdam/');
  const { href } = page;

  useEffect(() => {
    trackPageView(page.path, t('seo.analyticsTitle'));
  }, [page.path, t]);

  const faqs = FAQ_KEYS.map((key) => ({
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
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData type="FAQPage" data={{ faqs }} />
      <StructuredData
        type="Service"
        data={{
          service: {
            name: t('service.name'),
            description: t('service.description'),
            serviceUrl: page.canonical,
            areaServed: 'Amsterdam',
            offers: [
              { name: t('service.offerGroup'), url: `${BASE_URL}${href('/schedule/')}` },
              { name: t('service.offerPrivate'), url: `${BASE_URL}${href('/schedule/')}` },
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
              <span className="service-badge">{t('hero.badgeStrength')}</span>
              <span className="service-badge">{t('hero.badgeCore')}</span>
              <span className="service-badge">{t('hero.badgeLevels')}</span>
              <span className="service-badge">{t('hero.badgeArea')}</span>
            </div>
            <Link to={href('/schedule/')} className="service-hero-btn">{t('hero.cta')}</Link>
          </div>
        </Reveal>

        <ServiceTrustBand
          imageSrc="/assets/images/trx.webp"
          imageAlt={t('trust.imageAlt')}
          priceAnchor={t('trust.priceAnchor', { memberPrice: formatEur(MEMBERSHIP.four.perClass) })}
          testimonial={t('trust.testimonial')}
          testimonialAuthor={`Yeşim · ${t('trust.reviewSource')}`}
          ctaTo={href('/pricing/')}
          ctaLabel={t('trust.ctaLabel')}
        />

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('intro.title')}</h2>
            <p>{t('intro.p1')}</p>
            <p>{t('intro.p2')}</p>
            <p>
              <Trans
                ns="trx"
                i18nKey="intro.p3"
                components={{ reformer: <Link to={href('/reformer-pilates-amsterdam/')} /> }}
              />
            </p>
            <p>
              <Trans
                ns="trx"
                i18nKey="intro.p4"
                components={{
                  private: <Link to={href('/private-pilates-amsterdam/')} />,
                  strength: <Link to={href('/strength-training-amsterdam/')} />,
                }}
              />
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('benefits.title')}</h2>
            <div className="service-benefits-grid">
              {BENEFIT_KEYS.map((key) => (
                <div key={key} className="service-benefit-card">
                  <h3>{t(`benefits.${key}Title`)}</h3>
                  <p>{t(`benefits.${key}Text`)}</p>
                </div>
              ))}
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
            <Link to={href('/workouts/trx/')} className="service-cta-btn-secondary">{t('cta.guide')}</Link>
          </div>
        </Reveal>
      </div>
    </>
  );
};
