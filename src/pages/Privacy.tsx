import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import { openCookieSettings } from '../utils/consentTracking';
import '../styles/ServicePage.css';
import '../styles/Privacy.css';
import { studioAddressLine } from '../data/business';
import { useLocalizedPage } from '../i18n/useLocalizedPage';

export const Privacy= () => {
  const { t } = useTranslation('privacy');
  const page = useLocalizedPage('/privacy/');
  const { href } = page;
  const strong = { strong: <strong /> };
  const email = <a href="mailto:info@pt7.nl" />;

  useEffect(() => {
    trackPageView(page.path, 'Privacy Policy | PT 7 Pilates Amsterdam');
  }, [page.path]);

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
      <Breadcrumbs items={[{ name: t('breadcrumb'), path: page.path }]} />

      <div className="service-page privacy-page">
        <section className="service-hero is-in">
          <div className="service-hero-content">
            <h1>{t('title')}</h1>
            <p>{t('updated', { address: studioAddressLine })}</p>
          </div>
        </section>

        <article className="privacy-prose">
          <h2>{t('who.title')}</h2>
          <p>
            <Trans
              t={t}
              i18nKey="who.text"
              components={{
                site: <a href="https://www.pt7.nl" />,
                email,
                phone: <a href="tel:+31685162693" />,
              }}
            />
          </p>

          <h2>{t('what.title')}</h2>
          <p>{t('what.text')}</p>

          <h2>{t('cookies.title')}</h2>
          <p>{t('cookies.intro')}</p>
          <ul>
            <li>
              <Trans t={t} i18nKey="cookies.statistics" components={strong} />
            </li>
            <li>
              <Trans t={t} i18nKey="cookies.marketing" components={strong} />
            </li>
          </ul>
          <p>{t('cookies.change')}</p>

          <h2>{t('thirdParties.title')}</h2>
          <ul>
            <li>
              <Trans t={t} i18nKey="thirdParties.fonts" components={strong} />
            </li>
            <li>
              <Trans t={t} i18nKey="thirdParties.maps" components={strong} />
            </li>
            <li>
              <Trans t={t} i18nKey="thirdParties.mindbody" components={strong} />
            </li>
          </ul>

          <h2>{t('contact.title')}</h2>
          <p>{t('contact.text')}</p>

          <h2>{t('legal.title')}</h2>
          <p>{t('legal.text')}</p>

          <h2>{t('retention.title')}</h2>
          <p>
            <Trans t={t} i18nKey="retention.text" components={{ email }} />
          </p>

          <h2>{t('children.title')}</h2>
          <p>{t('children.text')}</p>

          <p>
            <Link to={href('/pricing/')}>{t('links.pricing')}</Link>
            {' · '}
            <Link to={href('/schedule/')}>{t('links.book')}</Link>
            {' · '}
            <a
              href="#cookies"
              onClick={(e) => {
                e.preventDefault();
                openCookieSettings();
              }}
            >
              {t('links.cookies')}
            </a>
          </p>
        </article>
      </div>
    </>
  );
};
