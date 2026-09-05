import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import { openCookieSettings } from '../utils/consentTracking';
import '../styles/ServicePage.css';
import '../styles/Privacy.css';

export const Privacy= () => {
  useEffect(() => {
    trackPageView('/privacy', 'Privacy Policy | PT Studio 7 Amsterdam');
  }, []);

  return (
    <>
      <SEOHead
        title="Privacy Policy | PT Studio 7 Amsterdam"
        description="How PT Studio 7 Amsterdam uses cookies, analytics, advertising, booking widgets, and contact data. GDPR information for visitors of pt7.nl."
        keywords="PT Studio 7 privacy, cookie policy Amsterdam, AVG, GDPR"
        canonical="https://www.pt7.nl/privacy/"
        ogTitle="Privacy Policy | PT Studio 7 Amsterdam"
        ogDescription="How we use cookies, analytics, ads, booking widgets, and contact data on pt7.nl."
      />
      <Breadcrumbs items={[{ name: 'Privacy', path: '/privacy/' }]} />

      <div className="service-page privacy-page">
        <section className="service-hero is-in">
          <div className="service-hero-content">
            <h1>Privacy policy</h1>
            <p>Last updated 27 August 2026. PT Studio 7 Amsterdam (Van Baerlestraat 76C, 1071 BB Amsterdam) is controller for this website.</p>
          </div>
        </section>

        <article className="privacy-prose">
          <h2>Who we are</h2>
          <p>
            PT Studio 7 operates <a href="https://www.pt7.nl">www.pt7.nl</a>. Contact:{' '}
            <a href="mailto:info@pt7.nl">info@pt7.nl</a> · <a href="tel:+31685162693">+31 685 162693</a>.
          </p>

          <h2>What this site does</h2>
          <p>
            This is a marketing site. Class booking, login, and payments run through MindBody (Healcode / Branded Web).
            We do not run our own member database on this domain.
          </p>

          <h2>Cookies and similar tech</h2>
          <p>
            Necessary storage keeps the site working (for example your cookie choice). Other tags load only after you
            choose them in the banner or Cookie Settings.
          </p>
          <ul>
            <li>
              <strong>Statistics</strong>: Google Analytics 4 only. Used to understand page use. Does not load Google
              Tag Manager, Google Ads, or Meta.
            </li>
            <li>
              <strong>Marketing</strong>: Google Tag Manager, Google Ads, and Meta Pixel. Used for ads measurement and
              remarketing.
            </li>
          </ul>
          <p>
            You can change this anytime via Cookie Settings in the footer. Browsers may also send a Global Privacy
            Control signal; we still store an explicit choice on this site.
          </p>

          <h2>Other Google and third parties</h2>
          <ul>
            <li>
              <strong>Fonts</strong> are hosted on this site. We do not load Google Fonts.
            </li>
            <li>
              <strong>Google Maps</strong> on the homepage loads only if you allowed statistics or marketing, or if you
              tap Show map. Opening an external Maps link is a normal navigation to Google.
            </li>
            <li>
              <strong>MindBody</strong> scripts power Login | Register, Buy Now, schedule, and academy enroll. Those
              requests go to MindBody so you can book and pay. Their privacy terms apply to that processing.
            </li>
          </ul>

          <h2>Contact data</h2>
          <p>
            Email, phone, and WhatsApp you start yourself. Academy inquiry forms are MindBody widgets. We use that
            information to reply and to run classes, not to sell lists.
          </p>

          <h2>Legal bases (GDPR)</h2>
          <p>
            Consent for statistics and marketing cookies. Contract / legitimate interest for booking and answering
            enquiries. Legal obligation where tax or accounting rules require keeping records of purchases (handled in
            MindBody).
          </p>

          <h2>Retention and rights</h2>
          <p>
            Cookie choice stays in your browser until you clear site data or change it. Analytics and ads retention
            follows Google and Meta settings in those accounts. You can ask for access, correction, erasure, or
            restriction via <a href="mailto:info@pt7.nl">info@pt7.nl</a>. You may complain to the Autoriteit
            Persoonsgegevens.
          </p>

          <h2>Children</h2>
          <p>This site is not aimed at children under 16.</p>

          <p>
            <Link to="/pricing/">Pricing</Link>
            {' · '}
            <Link to="/schedule/">Book</Link>
            {' · '}
            <a
              href="#cookies"
              onClick={(e) => {
                e.preventDefault();
                openCookieSettings();
              }}
            >
              Cookie settings
            </a>
          </p>
        </article>
      </div>
    </>
  );
};
