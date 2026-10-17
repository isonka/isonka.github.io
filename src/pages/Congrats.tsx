import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { trackBookingConfirmation, trackPageView } from '../utils/gtmTracking';
import { trackAdsConversion } from '../utils/consentTracking';
import { isPrerender } from '../utils/prerender';
import '../styles/Congrats.css';
import { business } from '../data/business';
import { useLocalizedPage } from '../i18n/useLocalizedPage';

const BOOKING_CONVERSION = {
  key: 'booking',
  events: [
    { name: 'ads_conversion_Book_appointment_1' },
    { name: 'conversion', sendTo: 'AW-17684932205/G4r3CKjwirkbEO3M6vBB' },
  ],
};

export const Congrats= () => {
  const { t } = useTranslation('congrats');
  const page = useLocalizedPage('/congrats/');
  const { href } = page;

  useEffect(() => {
    if (isPrerender()) return;

    trackPageView(page.path, t('seo.analyticsTitle'));
    trackBookingConfirmation();

    return trackAdsConversion(BOOKING_CONVERSION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={page.canonical}
        robots="noindex, follow"
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />

      <div className="congrats-page">
        <div className="congrats-container">
          <div className="success-icon">✓</div>
          <h1>{t('title')}</h1>
          <p className="congrats-message">{t('message')}</p>

          <div className="next-steps">
            <h2>{t('nextTitle')}</h2>
            <ul>
              <li>{t('next.email')}</li>
              <li>{t('next.early')}</li>
              <li>{t('next.bring')}</li>
              <li>{t('next.wear')}</li>
            </ul>
          </div>

          <div className="studio-info">
            <h3>{t('locationTitle')}</h3>
            <p>
              <strong>{business.address.streetAddress}</strong><br />
              {business.address.postalCode} {business.address.addressLocality}<br />
              {t('locationNote')}
            </p>
          </div>

          <div className="action-buttons">
            <Link to={href('/schedule/')} className="btn-primary">{t('bookAnother')}</Link>
            <Link to={href('/pricing/')} className="btn-secondary">{t('packages')}</Link>
            <Link to={href('/')} className="btn-secondary">{t('home')}</Link>
          </div>

          <div className="review-request">
            <p>{t('reviewPrompt')}</p>
            <a
              href="https://g.page/r/CRkdrh58XUzkEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-review"
            >
              {t('reviewButton')}
            </a>
          </div>

          <div className="contact-support">
            <p>
              <Trans t={t} i18nKey="questions" components={{ email: <a href="mailto:info@pt7.nl" /> }} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
