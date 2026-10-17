import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/HealthcareProviders.css';
import { BASE_URL, studioAddressLine } from '../data/business';
import { useLocalizedPage } from '../i18n/useLocalizedPage';

const BENEFIT_KEYS = ['goals', 'destination', 'continuity', 'simple', 'professional'] as const;

export const HealthcareProviders= () => {
  const { t } = useTranslation('healthcare');
  const page = useLocalizedPage('/healthcare-providers/');
  const { href } = page;

  useEffect(() => {
    trackPageView(page.path, t('seo.analyticsTitle'));
  }, [page.path, t]);

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={page.canonical}
        ogTitle={t('seo.title')}
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
              { name: t('service.offerPrivate'), url: `${BASE_URL}${href('/schedule/')}` },
              { name: t('service.offerGroup'), url: `${BASE_URL}${href('/schedule/')}` },
            ],
          },
        }}
      />
      <Breadcrumbs items={[{ name: t('breadcrumb'), path: page.path }]} />

      <div className="healthcare-page">
        <section className="healthcare-hero">
          <div className="healthcare-hero-content">
            <h1>{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <p className="hero-description">{t('hero.description')}</p>
          </div>
        </section>

        <section className="healthcare-pilates-rehab">
          <div className="healthcare-container">
            <h2>{t('why.title')}</h2>
            <p className="rehab-intro">{t('why.intro')}</p>
            <div className="rehab-grid">
              <div className="rehab-card">
                <h3>{t('why.controlledTitle')}</h3>
                <p>{t('why.controlledText')}</p>
              </div>
              <div className="rehab-card">
                <h3>{t('why.coreTitle')}</h3>
                <p>{t('why.coreText')}</p>
              </div>
              <div className="rehab-card">
                <h3>{t('why.awarenessTitle')}</h3>
                <p>{t('why.awarenessText')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="healthcare-who">
          <div className="healthcare-container">
            <h2>{t('who.title')}</h2>
            <div className="who-grid">
              <div className="who-card">
                <span className="who-icon">{t('who.physioTag')}</span>
                <h3>{t('who.physioTitle')}</h3>
                <p>{t('who.physioText')}</p>
              </div>
              <div className="who-card">
                <span className="who-icon">{t('who.gpTag')}</span>
                <h3>{t('who.gpTitle')}</h3>
                <p>{t('who.gpText')}</p>
              </div>
              <div className="who-card">
                <span className="who-icon">{t('who.specialistTag')}</span>
                <h3>{t('who.specialistTitle')}</h3>
                <p>{t('who.specialistText')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="healthcare-how">
          <div className="healthcare-container">
            <h2>{t('how.title')}</h2>
            <div className="how-steps">
              <div className="how-step">
                <span className="step-number">1</span>
                <span className="step-title">{t('how.step1Title')}</span>
                <p>{t('how.step1Text')}</p>
              </div>
              <div className="how-step">
                <span className="step-number">2</span>
                <span className="step-title">{t('how.step2Title')}</span>
                <p>{t('how.step2Text')}</p>
              </div>
              <div className="how-step">
                <span className="step-number">3</span>
                <span className="step-title">{t('how.step3Title')}</span>
                <p>{t('how.step3Text')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="healthcare-offer">
          <div className="healthcare-container">
            <h2>{t('offer.title')}</h2>
            <div className="offer-grid">
              <div className="offer-card">
                <h3>{t('offer.equipmentTitle')}</h3>
                <p>{t('offer.equipmentText')}</p>
              </div>
              <div className="offer-card">
                <h3>{t('offer.functionalTitle')}</h3>
                <p>{t('offer.functionalText')}</p>
              </div>
              <div className="offer-card">
                <h3>{t('offer.groupsTitle')}</h3>
                <p>{t('offer.groupsText')}</p>
              </div>
              <div className="offer-card">
                <h3>{t('offer.privateTitle')}</h3>
                <p>{t('offer.privateText')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="healthcare-benefits">
          <div className="healthcare-container">
            <h2>{t('benefits.title')}</h2>
            <ul className="benefits-list">
              {BENEFIT_KEYS.map((key) => (
                <li key={key}>{t(`benefits.${key}`)}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="healthcare-cta">
          <div className="healthcare-container">
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.text')}</p>
            <div className="cta-buttons">
              <a
                href={`mailto:info@pt7.nl?subject=${encodeURIComponent(t('cta.emailSubject'))}`}
                className="cta-button primary"
              >
                {t('cta.email')}
              </a>
              <a
                href={`https://wa.me/31685162693?text=${encodeURIComponent(t('cta.whatsappText'))}`}
                className="cta-button secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <p className="cta-note">{t('cta.note', { address: studioAddressLine })}</p>
          </div>
        </section>

        <section className="healthcare-back">
          <div className="healthcare-container">
            <div style={{ marginBottom: '1rem' }}>
              <h3>{t('related.title')}</h3>
              <p>
                <Link to={href('/reformer-pilates-amsterdam/')}>{t('related.reformer')}</Link> ·{' '}
                <Link to={href('/trainer/elif/')}>{t('related.elif')}</Link> ·{' '}
                <Link to={href('/trainer/goknur/')}>{t('related.goknur')}</Link>
              </p>
            </div>
            <Link to={href('/')} className="back-link">{t('related.back')}</Link>
          </div>
        </section>
      </div>
    </>
  );
};
