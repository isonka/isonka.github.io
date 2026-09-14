import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackScheduleVisit, trackPageView } from '../utils/gtmTracking';
import {
  initScheduleMindBodyWidgets,
  teardownMindBodyWidgets,
} from '../utils/mindbodyBrandedWeb';
import { isPrerender } from '../utils/prerender';
import { useLocale } from '../i18n/useLocale';
import { business, formatOpeningClock, studioHoursFor } from '../data/business';
import '../styles/Schedule.css';

const SCHEDULE_URL_EN = 'https://www.pt7.nl/schedule/';
const SCHEDULE_URL_NL = 'https://www.pt7.nl/schedule/nl/';

const SCHEDULE_HREFLANG = [
  { hreflang: 'en', href: SCHEDULE_URL_EN },
  { hreflang: 'nl', href: SCHEDULE_URL_NL },
  { hreflang: 'x-default', href: SCHEDULE_URL_EN },
];

const FAQ_KEYS = ['hours', 'book', 'bring', 'private', 'beginner', 'pregnancy'] as const;

const weekdayHours = formatOpeningClock(studioHoursFor('Monday'));
const weekendHours = formatOpeningClock(studioHoursFor('Saturday'));
const hoursValues = { weekdayHours, weekendHours };

function hoursLabelKey(days: readonly string[]): 'hours.weekdays' | 'hours.weekends' {
  return days.includes('Saturday') || days.includes('Sunday') ? 'hours.weekends' : 'hours.weekdays';
}

export const Schedule= () => {
  const { t } = useTranslation('schedule');
  const locale = useLocale();
  const isNl = locale === 'nl';
  const [activeTab, setActiveTab] = useState('group');
  const [widgetsLoading, setWidgetsLoading] = useState(true);
  const [widgetsError, setWidgetsError] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const canonical = isNl ? SCHEDULE_URL_NL : SCHEDULE_URL_EN;
  const schedulePath = isNl ? '/schedule/nl/' : '/schedule/';
  const pricingHref = isNl ? '/pricing/nl/' : '/pricing/';

  const scheduleFaqs = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`, hoursValues).replace(/<\/?[a-z]+>/g, ''),
  }));

  useEffect(() => {
    trackPageView(schedulePath, t('seo.analyticsTitle'));
    trackScheduleVisit();
  }, [schedulePath, t]);

  useEffect(() => {
    if (isPrerender()) return;

    let cancelled = false;

    setWidgetsLoading(true);
    setWidgetsError(false);

    initScheduleMindBodyWidgets()
      .then(() => {
        if (!cancelled) {
          setWidgetsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setWidgetsError(true);
          setWidgetsLoading(false);
        }
      });

    return () => {
      cancelled = true;
      teardownMindBodyWidgets();
    };
  }, [schedulePath]);

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogLocale={isNl ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={isNl ? ['en_US'] : ['nl_NL']}
        htmlLang={isNl ? 'nl' : 'en'}
        hreflangAlternates={SCHEDULE_HREFLANG}
      />
      <StructuredData type="FAQPage" data={{ faqs: scheduleFaqs }} />
      <Breadcrumbs items={[{ name: t('breadcrumbName'), path: schedulePath }]} />

      <div className="schedule-page">
        <section className="schedule-hero">
          <div className="schedule-hero-content">
            <p className="schedule-kicker">{t('hero.kicker')}</p>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.lead')}</p>
            <div className="schedule-hours" aria-labelledby="schedule-hours-heading">
              <h2 id="schedule-hours-heading" className="schedule-hours-title">
                {t('hours.title')}
              </h2>
              <dl className="schedule-hours-list">
                {business.openingHours.map((slot) => (
                  <div key={slot.opens + slot.closes} className="schedule-hours-row">
                    <dt>{t(hoursLabelKey(slot.dayOfWeek))}</dt>
                    <dd>{formatOpeningClock(slot)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="location-highlight">{t('hero.location')}</p>
            <p className="schedule-account-note">{t('hero.accountNote')}</p>
            <p>
              <Link to="/reformer-pilates-amsterdam/">{t('hero.linkReformer')}</Link>
              {' · '}
              <Link to={pricingHref}>{t('hero.linkPricing')}</Link>
              {' · '}
              <Link to="/private-pilates-amsterdam/">{t('hero.linkPrivate')}</Link>
            </p>
          </div>
        </section>

        <section className="schedule-main">
          <div className="tabs-container">
            <div className="tab-navigation">
              <button
                type="button"
                className={`tab-button ${activeTab === 'group' ? 'active' : ''}`}
                onClick={() => setActiveTab('group')}
              >
                {t('tabs.group')}
              </button>
              <button
                type="button"
                className={`tab-button ${activeTab === 'private' ? 'active' : ''}`}
                onClick={() => setActiveTab('private')}
              >
                {t('tabs.private')}
              </button>
            </div>

            <div className={`tab-content ${activeTab === 'group' ? 'active' : ''}`}>
              <h2>{t('group.title')}</h2>
              <p className="subtitle">{t('group.subtitle')}</p>

              <div className="info-banner">
                <p>
                  <strong>{t('group.bannerLead')}</strong> {t('group.bannerText')}
                </p>
              </div>

              <p className="schedule-availability-note" role="note">
                {t('group.availability')}
              </p>

              <div className="quick-info">
                <div className="info-card">
                  <h3>{t('group.durationTitle')}</h3>
                  <p>{t('group.durationValue')}</p>
                </div>
                <div className="info-card">
                  <h3>{t('group.sizeTitle')}</h3>
                  <p>{t('group.sizeValue')}</p>
                </div>
                <div className="info-card">
                  <h3>{t('group.bringTitle')}</h3>
                  <p>{t('group.bringValue')}</p>
                </div>
              </div>

              <div className="widget-container">
                {widgetsLoading && (
                  <p className="widget-loading" role="status">
                    {t('widget.loading')}
                  </p>
                )}
                {widgetsError && (
                  <p className="widget-error" role="alert">
                    <Trans
                      ns="schedule"
                      i18nKey="widget.error"
                      components={{ refresh: <a href={schedulePath} /> }}
                    />
                  </p>
                )}
                <div
                  key={`group-${schedulePath}`}
                  className="mindbody-widget"
                  data-widget-type="Schedules"
                  data-widget-id="2b8825c036"
                  style={{ width: '100%' }}
                  hidden={widgetsError}
                />
              </div>
            </div>

            <div className={`tab-content ${activeTab === 'private' ? 'active' : ''}`}>
              <h2>{t('private.title')}</h2>
              <p className="subtitle">
                <Trans
                  ns="schedule"
                  i18nKey="private.subtitle"
                  components={{ private: <Link to="/private-pilates-amsterdam/" /> }}
                />
              </p>

              <div className="info-banner">
                <p>
                  <strong>{t('private.bannerLead')}</strong> {t('private.bannerText')}
                </p>
              </div>              

              <div className="quick-info">
                <div className="info-card">
                  <h3>{t('private.durationTitle')}</h3>
                  <p>{t('private.durationValue')}</p>
                </div>
                <div className="info-card">
                  <h3>{t('private.optionsTitle')}</h3>
                  <p>{t('private.optionsValue')}</p>
                </div>
                <div className="info-card">
                  <h3>{t('private.programTitle')}</h3>
                  <p>{t('private.programValue')}</p>
                </div>
                <div className="info-card">
                  <h3>{t('private.bringTitle')}</h3>
                  <p>{t('private.bringValue')}</p>
                </div>
              </div>

              <div className="widget-container">
                {widgetsLoading && (
                  <p className="widget-loading" role="status">
                    {t('widget.loading')}
                  </p>
                )}
                {widgetsError && (
                  <p className="widget-error" role="alert">
                    <Trans
                      ns="schedule"
                      i18nKey="widget.error"
                      components={{ refresh: <a href={schedulePath} /> }}
                    />
                  </p>
                )}
                <div
                  key={`private-${schedulePath}`}
                  className="mindbody-widget"
                  data-widget-type="Appointments"
                  data-widget-id="2b18450c036"
                  style={{ width: '100%' }}
                  hidden={widgetsError}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="schedule-faq" aria-labelledby="schedule-faq-heading">
          <div className="schedule-faq-inner">
            <p className="schedule-kicker">{t('faq.kicker')}</p>
            <h2 id="schedule-faq-heading">{t('faq.title')}</h2>
            <div className="schedule-faq-list">
              {FAQ_KEYS.map((key, i) => (
                <div key={key} className="schedule-faq-item">
                  <button
                    type="button"
                    className={`schedule-faq-question ${openFaqIndex === i ? 'active' : ''}`}
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    aria-expanded={openFaqIndex === i}
                    aria-controls={`schedule-faq-answer-${i}`}
                    id={`schedule-faq-question-${i}`}
                  >
                    {t(`faq.${key}.question`)}
                  </button>
                  <div
                    id={`schedule-faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`schedule-faq-question-${i}`}
                    className={`schedule-faq-answer ${openFaqIndex === i ? 'open' : ''}`}
                  >
                    <p>
                      <Trans
                        ns="schedule"
                        i18nKey={`faq.${key}.answer`}
                        values={hoursValues}
                        components={{
                          private: <Link to="/private-pilates-amsterdam/" />,
                          prenatal: <Link to="/prenatal-pilates-amsterdam/" />,
                        }}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" aria-labelledby="schedule-cta-heading">
          <div className="cta-section-inner">
            <p className="schedule-kicker schedule-kicker-on-dark">{t('cta.kicker')}</p>
            <h2 id="schedule-cta-heading">{t('cta.title')}</h2>
            <p>{t('cta.text')}</p>
            <Link to={pricingHref} className="cta-button">
              {t('cta.button')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
