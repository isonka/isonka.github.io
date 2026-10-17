import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import '../styles/Corporate.css';
import { studioAddressLine } from '../data/business';
import { useLocalizedPage } from '../i18n/useLocalizedPage';

export const Corporate= () => {
  const { t } = useTranslation('corporate');
  const page = useLocalizedPage('/corporate/');
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
              { name: t('service.offerStudio'), url: page.canonical },
              { name: t('service.offerOnsite'), url: page.canonical },
            ],
          },
        }}
      />
      <Breadcrumbs items={[{ name: t('breadcrumb'), path: page.path }]} />

      <div className="corporate-page">
        <section className="corporate-hero">
          <div className="corporate-hero-content">
            <h1>{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <p className="hero-description">{t('hero.description')}</p>
          </div>
        </section>

        <section className="corporate-pilates-rehab">
          <div className="corporate-container">
            <h2>{t('why.title')}</h2>
            <p className="rehab-intro">{t('why.intro')}</p>
            <div className="rehab-grid">
              <div className="rehab-card">
                <h3>{t('why.deskTitle')}</h3>
                <p>{t('why.deskText')}</p>
              </div>
              <div className="rehab-card">
                <h3>{t('why.smallTitle')}</h3>
                <p>{t('why.smallText')}</p>
              </div>
              <div className="rehab-card">
                <h3>{t('why.zuidTitle')}</h3>
                <p>{t('why.zuidText')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="corporate-who">
          <div className="corporate-container">
            <h2>{t('formats.title')}</h2>
            <div className="who-grid">
              <div className="who-card">
                <span className="who-icon">{t('formats.studioTag')}</span>
                <h3>{t('formats.studioTitle')}</h3>
                <p>{t('formats.studioText')}</p>
              </div>
              <div className="who-card">
                <span className="who-icon">{t('formats.onsiteTag')}</span>
                <h3>{t('formats.onsiteTitle')}</h3>
                <p>{t('formats.onsiteText')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="corporate-offer">
          <div className="corporate-container">
            <h2>{t('tax.title')}</h2>
            <div className="offer-grid">
              <div className="offer-card">
                <h3>{t('tax.vrijeTitle')}</h3>
                <p>{t('tax.vrijeText')}</p>
              </div>
              <div className="offer-card">
                <h3>{t('tax.cafetariaTitle')}</h3>
                <p>{t('tax.cafetariaText')}</p>
              </div>
              <div className="offer-card">
                <h3>{t('tax.nihilTitle')}</h3>
                <p>{t('tax.nihilText')}</p>
              </div>
            </div>
            <p className="corporate-disclaimer">{t('tax.disclaimer')}</p>
          </div>
        </section>

        <section className="corporate-how">
          <div className="corporate-container">
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

        <section className="corporate-cta">
          <div className="corporate-container">
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

        <section className="corporate-back">
          <div className="corporate-container">
            <div style={{ marginBottom: '1rem' }}>
              <h3>{t('related.title')}</h3>
              <p>
                <Link to={href('/reformer-pilates-amsterdam/')}>{t('related.reformer')}</Link> ·{' '}
                <Link to={href('/healthcare-providers/')}>{t('related.healthcare')}</Link> ·{' '}
                <Link to={href('/pricing/')}>{t('related.pricing')}</Link>
              </p>
            </div>
            <Link to={href('/')} className="back-link">{t('related.back')}</Link>
          </div>
        </section>
      </div>
    </>
  );
};
