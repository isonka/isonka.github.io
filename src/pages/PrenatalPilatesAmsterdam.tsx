import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { ServiceTrustBand } from '../components/ServiceTrustBand';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/ServicePage.css';
import { BASE_URL } from '../data/business';
import { useLocalizedPage } from '../i18n/useLocalizedPage';

const FAQ_KEYS = [
  'safe',
  'approval',
  'anyWeek',
  'experience',
  'private',
  'pelvic',
  'languages',
  'where',
  'same',
  'postnatal',
] as const;

export const PrenatalPilatesAmsterdam= () => {
  const { t } = useTranslation('prenatal');
  const page = useLocalizedPage('/prenatal-pilates-amsterdam/');
  const { href } = page;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

      <StructuredData
        type="Service"
        data={{
          service: {
            name: t('service.name'),
            description: t('service.description'),
            serviceUrl: page.canonical,
            areaServed: 'Amsterdam',
            offers: [
              { name: t('service.offerPrivate'), priceCurrency: 'EUR', url: `${BASE_URL}${href('/pricing/')}` },
              { name: t('service.offerIntro'), priceCurrency: 'EUR', url: `${BASE_URL}${href('/schedule/')}` },
            ],
          },
        }}
      />

      <StructuredData type="FAQPage" data={{ faqs }} />
      <Breadcrumbs items={[{ name: t('breadcrumb'), path: page.path }]} />

      <div className="service-page">
        <Reveal className="service-hero">
          <div className="service-hero-content">
            <p className="kicker">{t('hero.kicker')}</p>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.lead')}</p>
            <div className="service-hero-badges">
              <span className="service-badge">{t('hero.badgePrivate')}</span>
              <span className="service-badge">{t('hero.badgeTrimester')}</span>
              <span className="service-badge">{t('hero.badgePelvic')}</span>
              <span className="service-badge">{t('hero.badgeArea')}</span>
            </div>
            <Link to={href('/schedule/')} className="service-hero-btn">{t('hero.cta')}</Link>
          </div>
        </Reveal>

        <ServiceTrustBand
          imageSrc="/assets/images/pregnancy2.webp"
          imageAlt={t('trust.imageAlt')}
          priceAnchor={t('trust.priceAnchor')}
          testimonial={t('trust.testimonial')}
          testimonialAuthor={`Lot Canter Cremers · ${t('trust.reviewSource')}`}
          ctaTo={href('/pricing/#private-classes')}
          ctaLabel={t('trust.ctaLabel')}
        />

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('why.title')}</h2>
            <p>{t('why.p1')}</p>
            <p>{t('why.p2')}</p>
            <p>
              <Trans
                t={t}
                i18nKey="why.p3"
                components={{
                  post: <Link to={href('/blog/prenatal-pilates-supporting-body-through-every-trimester/')} />,
                }}
              />
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('who.title')}</h2>
            <p>{t('who.p1')}</p>
            <p>{t('who.p2')}</p>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>{t('who.anyWeekTitle')}</h3>
                <p>{t('who.anyWeekText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('who.postnatalTitle')}</h3>
                <p>{t('who.postnatalText')}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('session.title')}</h2>
            <p>{t('session.intro')}</p>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>{t('session.intakeTitle')}</h3>
                <p>{t('session.intakeText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('session.reformerTitle')}</h3>
                <p>{t('session.reformerText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('session.trimesterTitle')}</h3>
                <p>{t('session.trimesterText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('session.todayTitle')}</h3>
                <p>{t('session.todayText')}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('clients.title')}</h2>
            <blockquote className="service-quote">
              <p>{t('clients.quote')}</p>
              <footer>Lot Canter Cremers</footer>
            </blockquote>
            <p>{t('clients.after')}</p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('specialists.title')}</h2>
            <p>
              <Trans t={t} i18nKey="specialists.intro" components={{ pricing: <Link to={href('/pricing/')} /> }} />
            </p>
            <div className="service-trainers-strip">
              <Link to={href('/trainer/elif/')} className="service-trainer-card">
                <img
                  src="/assets/images/elif.webp"
                  alt={t('specialists.elifAlt')}
                  width={60}
                  height={60}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3>Elif Arzu Ogan</h3>
                  <p>{t('specialists.elifRole')}</p>
                </div>
              </Link>
              <Link to={href('/trainer/goknur/')} className="service-trainer-card">
                <img
                  src="/assets/images/goknur.webp"
                  alt={t('specialists.goknurAlt')}
                  width={60}
                  height={60}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3>Göknur Dipli</h3>
                  <p>{t('specialists.goknurRole')}</p>
                </div>
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('related.title')}</h2>
            <p>
              <Trans
                t={t}
                i18nKey="related.text"
                components={{
                  private: <Link to={href('/private-pilates-amsterdam/')} />,
                  reformer: <Link to={href('/reformer-pilates-amsterdam/')} />,
                  schedule: <Link to={href('/schedule/')} />,
                }}
              />
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('faqTitle')}</h2>
            <div className="service-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="service-faq-item">
                  <button
                    type="button"
                    className={`service-faq-question ${openFaqIndex === i ? 'active' : ''}`}
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    aria-expanded={openFaqIndex === i}
                    aria-controls={`prenatal-faq-answer-${i}`}
                  >
                    {faq.question}
                  </button>
                  <div
                    id={`prenatal-faq-answer-${i}`}
                    className={`service-faq-answer ${openFaqIndex === i ? 'open' : ''}`}
                  >
                    <p>{faq.answer}</p>
                  </div>
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
