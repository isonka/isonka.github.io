import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { ServiceTrustBand } from '../components/ServiceTrustBand';
import { ContactMap } from '../components/ContactMap';
import { trackPageView } from '../utils/gtmTracking';
import { BASE_URL, formatOpeningClock, studioHoursFor } from '../data/business';
import { MEMBERSHIP, formatEur } from '../data/pricing';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import '../styles/ServicePage.css';

const FAQ_KEYS = [
  'what',
  'where',
  'groupSize',
  'firstVisit',
  'beginners',
  'combine',
  'training',
  'neighbourhoods',
  'price',
] as const;

export const ReformerPilatesAmsterdam = () => {
  const { t } = useTranslation('reformer');
  const page = useLocalizedPage('/reformer-pilates-amsterdam/');
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
              { name: t('service.offerPrivate'), url: `${BASE_URL}${href('/private-pilates-amsterdam/')}` },
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
              <span className="service-badge">{t('hero.badgeMax')}</span>
              <span className="service-badge">{t('hero.badgeFormats')}</span>
              <span className="service-badge">{t('hero.badgeLevels')}</span>
              <span className="service-badge">{t('hero.badgeArea')}</span>
            </div>
            <Link to={href('/schedule/')} className="service-hero-btn">
              {t('hero.cta')}
            </Link>
          </div>
        </Reveal>

        <ServiceTrustBand
          layout="proof"
          imageSrc="/assets/images/reformer-pilates-amsterdam.webp"
          imageAlt={t('trust.imageAlt')}
          imageWidth={1600}
          imageHeight={2400}
          priceAnchor={t('trust.priceAnchor', { memberPrice: formatEur(MEMBERSHIP.four.perClass) })}
          testimonial="“Professional, thoughtful, and exactly the Reformer studio I spent two years looking for.”"
          testimonialAuthor={`Flaminia · ${t('trust.reviewSource')}`}
          ctaTo={href('/pricing/')}
          ctaLabel={t('trust.ctaLabel')}
        />

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('intro.title')}</h2>
            <p>{t('intro.p1')}</p>
            <p>
              <Trans
                ns="reformer"
                i18nKey="intro.p2"
                components={{
                  private: <Link to={href('/private-pilates-amsterdam/')} />,
                  prenatal: <Link to="/prenatal-pilates-amsterdam/" />,
                }}
              />
            </p>
            <p>
              <Trans
                ns="reformer"
                i18nKey="intro.p3"
                components={{
                  pricing: <Link to={href('/pricing/')} />,
                  schedule: <Link to={href('/schedule/')} />,
                }}
              />
            </p>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('where.title')}</h2>
            <p>{t('where.p1')}</p>
            <p>{t('where.p2')}</p>
            <p>{t('where.transit')}</p>
            <p>
              {t('where.hours', {
                weekdays: formatOpeningClock(studioHoursFor('Monday')),
                weekends: formatOpeningClock(studioHoursFor('Saturday')),
              })}
            </p>
            <div className="service-map">
              <ContactMap />
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('firstVisit.title')}</h2>
            <p>{t('firstVisit.lead')}</p>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>{t('firstVisit.arriveTitle')}</h3>
                <p>{t('firstVisit.arriveText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('firstVisit.equipmentTitle')}</h3>
                <p>{t('firstVisit.equipmentText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('firstVisit.coachTitle')}</h3>
                <p>{t('firstVisit.coachText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('firstVisit.nextTitle')}</h3>
                <p>{t('firstVisit.nextText')}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('forWhom.title')}</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>{t('forWhom.beginnersTitle')}</h3>
                <p>{t('forWhom.beginnersText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('forWhom.localsTitle')}</h3>
                <p>{t('forWhom.localsText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('forWhom.athletesTitle')}</h3>
                <p>
                  <Trans
                    ns="reformer"
                    i18nKey="forWhom.athletesText"
                    components={{
                      trx: <Link to={href('/trx-training-amsterdam/')} />,
                      strength: <Link to={href('/strength-training-amsterdam/')} />,
                    }}
                  />
                </p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('forWhom.instructorsTitle')}</h3>
                <p>
                  <Trans
                    ns="reformer"
                    i18nKey="forWhom.instructorsText"
                    components={{ academy: <Link to={href('/academy/')} /> }}
                  />
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="service-section">
          <div className="service-container">
            <h2>{t('why.title')}</h2>
            <div className="service-benefits-grid">
              <div className="service-benefit-card">
                <h3>{t('why.groupsTitle')}</h3>
                <p>{t('why.groupsText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('why.locationTitle')}</h3>
                <p>{t('why.locationText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('why.apparatusTitle')}</h3>
                <p>{t('why.apparatusText')}</p>
              </div>
              <div className="service-benefit-card">
                <h3>{t('why.languagesTitle')}</h3>
                <p>{t('why.languagesText')}</p>
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
            <Link to={href('/schedule/')} className="service-cta-btn-primary">
              {t('cta.book')}
            </Link>
            <Link to={href('/academy/')} className="service-cta-btn-secondary">
              {t('cta.academy')}
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
};
