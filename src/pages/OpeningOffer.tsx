import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { OpeningCountdown } from '../components/OpeningCountdown';
import { trackPageView } from '../utils/gtmTracking';
import { OPENING_OFFER } from '../data/openingOffer';
import { useLocale } from '../i18n/useLocale';
import '../styles/OpeningOffer.css';

const OFFER_URL_EN = `https://www.pt7.nl${OPENING_OFFER.path}`;
const OFFER_URL_NL = `https://www.pt7.nl${OPENING_OFFER.pathNl}`;

const OFFER_HREFLANG = [
  { hreflang: 'en', href: OFFER_URL_EN },
  { hreflang: 'nl', href: OFFER_URL_NL },
  { hreflang: 'x-default', href: OFFER_URL_EN },
];

const DATE_KEYS = ['lastDay', 'closed', 'firstClass'] as const;
const STUDIO_KEYS = ['reformers', 'private', 'yoga'] as const;
const STEP_KEYS = ['buy', 'book', 'arrive'] as const;
const FAQ_KEYS = ['when', 'how', 'intro', 'book'] as const;

function bonusLabel(
  t: ReturnType<typeof useTranslation<'openingOffer'>>['t'],
  ns: 'membership' | 'group' | 'privateCouple',
  bonus: number,
) {
  const key =
    bonus === 1 ? (`packages.${ns}.bonus_one` as const) : (`packages.${ns}.bonus_other` as const);
  return t(key, { bonus });
}

export const OpeningOffer = () => {
  const { t } = useTranslation('openingOffer');
  const locale = useLocale();
  const isNl = locale === 'nl';
  const canonical = isNl ? OFFER_URL_NL : OFFER_URL_EN;
  const scheduleHref = isNl ? '/schedule/nl/' : '/schedule/';
  const pricingHref = isNl ? '/pricing/nl/' : '/pricing/';
  const path = isNl ? OPENING_OFFER.pathNl : OPENING_OFFER.path;
  const faqs = FAQ_KEYS.map((key) => ({
    question: t(`faq.items.${key}.question`),
    answer: t(`faq.items.${key}.answer`),
  }));

  useEffect(() => {
    trackPageView(path, t('seo.analyticsTitle'));
  }, [path, t]);

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogImage="/assets/images/olympisch-stadion.webp"
        ogLocale={isNl ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={isNl ? ['en_US'] : ['nl_NL']}
        htmlLang={isNl ? 'nl' : 'en'}
        hreflangAlternates={OFFER_HREFLANG}
      />
      <StructuredData type="FAQPage" data={{ faqs }} />
      <Breadcrumbs items={[{ name: t('breadcrumb'), path }]} />

      <div className="opening-offer-page">
        <section className="oo-hero" aria-label={t('hero.title')}>
          <div className="oo-hero-media" aria-hidden="true">
            <img
              src="/assets/images/olympisch-stadion.webp"
              alt=""
              width={1600}
              height={1066}
              decoding="async"
              fetchPriority="high"
            />
            <div className="oo-hero-shade" />
          </div>
          <div className="oo-hero-content">
            <p className="oo-brand">{t('hero.brand')}</p>
            <p className="oo-kicker oo-kicker-on-dark">{t('hero.kicker')}</p>
            <h1>{t('hero.title')}</h1>
            <p className="oo-hero-lead">{t('hero.lead')}</p>
            <OpeningCountdown />
            <div className="oo-hero-actions">
              <Link to={scheduleHref} className="oo-btn oo-btn-gold">
                {t('hero.primaryCta')}
              </Link>
              <Link to={pricingHref} className="oo-btn oo-btn-ghost">
                {t('hero.secondaryCta')}
              </Link>
            </div>
          </div>
        </section>

        <Reveal className="oo-section">
          <div className="oo-container">
            <div className="oo-packages-head">
              <div>
                <p className="oo-kicker">{t('packages.kicker')}</p>
                <h2>{t('packages.title')}</h2>
                <p className="oo-lead">{t('packages.lead')}</p>
              </div>
              <p className="oo-limited">{t('limited')}</p>
            </div>

            <div className="oo-package-block">
              <h3 className="oo-package-title">{t('packages.membership.title')}</h3>
              <ul className="oo-package-list">
                {OPENING_OFFER.bonuses.membership.map((row) => (
                  <li key={`m-${row.paid}`}>
                    <span className="oo-package-base">
                      {t('packages.membership.row', { paid: row.paid })}
                    </span>
                    <span className="oo-bonus-pill">
                      {bonusLabel(t, 'membership', row.bonus)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="oo-package-block">
              <h3 className="oo-package-title">
                {t('packages.group.title')}
                <span className="oo-package-sub">{t('packages.group.subtitle')}</span>
              </h3>
              <ul className="oo-package-list">
                {OPENING_OFFER.bonuses.group.map((row) => (
                  <li key={`g-${row.paid}`}>
                    <span className="oo-package-base">
                      {t('packages.group.row', { paid: row.paid })}
                    </span>
                    <span className="oo-bonus-pill">
                      {bonusLabel(t, 'group', row.bonus)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="oo-package-block">
              <h3 className="oo-package-title">{t('packages.privateCouple.title')}</h3>
              <ul className="oo-package-list">
                {OPENING_OFFER.bonuses.privateCouple.map((row) => (
                  <li key={`p-${row.paid}`}>
                    <span className="oo-package-base">
                      {t('packages.privateCouple.row', { paid: row.paid })}
                    </span>
                    <span className="oo-bonus-pill">
                      {bonusLabel(t, 'privateCouple', row.bonus)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="oo-section oo-section-ink">
          <div className="oo-container">
            <p className="oo-kicker oo-kicker-on-dark">{t('dates.kicker')}</p>
            <h2>{t('dates.title')}</h2>
            <ol className="oo-dates">
              {DATE_KEYS.map((key) => (
                <li key={key} className="oo-date-row">
                  <span className="oo-date-label">{t(`dates.items.${key}.label`)}</span>
                  <span className="oo-date-value">{t(`dates.items.${key}.value`)}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal className="oo-section">
          <div className="oo-container">
            <p className="oo-kicker">{t('studio.kicker')}</p>
            <h2>{t('studio.title')}</h2>
            <p className="oo-lead">{t('studio.lead')}</p>
            <div className="oo-studio-grid">
              {STUDIO_KEYS.map((key) => (
                <div key={key} className="oo-studio-item">
                  <h3>{t(`studio.items.${key}.title`)}</h3>
                  <p>{t(`studio.items.${key}.text`)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="oo-section">
          <div className="oo-container">
            <p className="oo-kicker">{t('steps.kicker')}</p>
            <h2>{t('steps.title')}</h2>
            <ol className="oo-steps">
              {STEP_KEYS.map((key, index) => (
                <li key={key} className="oo-step">
                  <span className="oo-step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3>{t(`steps.items.${key}.title`)}</h3>
                    <p>{t(`steps.items.${key}.text`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal className="oo-section">
          <div className="oo-container">
            <h2>{t('faq.title')}</h2>
            <div className="oo-faq-list">
              {faqs.map((faq) => (
                <div key={faq.question} className="oo-faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="oo-close">
          <div className="oo-container oo-close-inner">
            <h2>{t('close.title')}</h2>
            <p>{t('close.text')}</p>
            <div className="oo-hero-actions">
              <Link to={scheduleHref} className="oo-btn oo-btn-gold">
                {t('close.primaryCta')}
              </Link>
              <Link to={pricingHref} className="oo-btn oo-btn-ghost">
                {t('close.secondaryCta')}
              </Link>
            </div>
            <p className="oo-close-link">
              <Link to="/blog/pt-7-moves-to-olympisch-stadion/">{t('close.moveLink')}</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </>
  );
};
