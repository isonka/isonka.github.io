import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPricingView, trackPageView } from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import { StableHealcodeSlot } from '../components/StableHealcodeSlot';
import {
  CLASS_MINUTES,
  COUPLE,
  GROUP,
  GROUP_MAX,
  INTRO,
  MEMBERSHIP,
  PRIVATE,
  formatEur,
  packTotal,
  savePercent,
} from '../data/pricing';
import { BLACK_FRIDAY_BONUS } from '../data/blackFriday';
import { formatOpeningClock, studioHoursFor, studioStreet } from '../data/business';
import { useLocale } from '../i18n/useLocale';
import '../styles/Pricing.css';
import { localeHref } from '../i18n/locale';

const PRICING_URL_EN = 'https://www.pt7.nl/pricing/';
const PRICING_URL_NL = 'https://www.pt7.nl/pricing/nl/';

const PRICING_HREFLANG = [
  { hreflang: 'en', href: PRICING_URL_EN },
  { hreflang: 'nl', href: PRICING_URL_NL },
  { hreflang: 'x-default', href: PRICING_URL_EN },
];

const weekdayHours = formatOpeningClock(studioHoursFor('Monday'));
const weekendHours = formatOpeningClock(studioHoursFor('Saturday'));

const SUMMARY_KEYS = ['blackFriday', 'group', 'intro', 'monthly', 'unlimited', 'private', 'membershipRules'] as const;

function PackBonus({ pack }: { pack: keyof typeof BLACK_FRIDAY_BONUS }) {
  const { t } = useTranslation('pricing');
  const free = BLACK_FRIDAY_BONUS[pack];
  return (
    <p className="package-bonus">{`+${free} ${t('blackFriday.free', { count: free })}`}</p>
  );
}

function ClassOffer({
  name,
  perClass,
  weeks,
  total,
  save,
  unit = 'class',
  serviceId,
  bonus,
  badge,
  featured = false,
}: {
  name: string;
  perClass: number;
  weeks: number;
  total?: number;
  save?: number;
  unit?: 'class' | 'person';
  serviceId: string;
  bonus?: keyof typeof BLACK_FRIDAY_BONUS;
  badge?: string;
  featured?: boolean;
}) {
  const { t } = useTranslation('pricing');
  const buyNow = t('labels.buyNow');
  const unitLabel = unit === 'person' ? t('labels.personUnit') : t('labels.classUnit');

  return (
    <div className={`package-card${featured ? ' featured' : ''}`}>
      {badge ? <div className="badge">{badge}</div> : null}
      <div className="price-display">
        <div className="package-head">
          <span className="package-name">{name}</span>
          {save != null ? <span className="package-save">{t('labels.save', { percent: String(save) })}</span> : null}
        </div>
        <h4 className="price-per-class price-lead">
          {formatEur(perClass)} <span className="per-unit">/ {unitLabel}</span>
        </h4>
      </div>
      <p className="pack-meta">
        {total != null
          ? t('labels.packMeta', { amount: formatEur(total), count: weeks })
          : t('labels.validShort', { count: weeks })}
      </p>
      {bonus ? <PackBonus pack={bonus} /> : null}
      <StableHealcodeSlot
        className="buy-button healcode-pricing-option-text-link"
        html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="${serviceId}" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
      />
    </div>
  );
}

export const Pricing= () => {
  const { t } = useTranslation('pricing');
  const locale = useLocale();
  const isNl = locale === 'nl';
  const [instructorTier, setInstructorTier] = useState<keyof typeof PRIVATE>('master');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const canonical = isNl ? PRICING_URL_NL : PRICING_URL_EN;
  const buyNow = t('labels.buyNow');
  const summaryValues = {
    pack20PerClass: formatEur(GROUP.pack20.perClass),
    groupSingle: formatEur(GROUP.single),
    introClasses: String(INTRO.classes),
    introPrice: formatEur(INTRO.price),
    fourTotal: formatEur(MEMBERSHIP.four.total),
    eightTotal: formatEur(MEMBERSHIP.eight.total),
    unlimited3: formatEur(MEMBERSHIP.unlimited3.perMonth),
    annualMonth: formatEur(MEMBERSHIP.annual.perMonth),
    annualYear: formatEur(MEMBERSHIP.annual.yearTotal),
    privateFrom: formatEur(PRIVATE.junior.single),
    coupleFrom: formatEur(COUPLE.single),
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    trackPageView(isNl ? '/pricing/nl/' : '/pricing/', t('seo.analyticsTitle'));
    trackPricingView();
    void ensureHealcodeLoaded();
  }, [isNl, t]);

  useEffect(() => {
    const faqContents = document.querySelectorAll('.faq-content');
    faqContents.forEach((content) => {
      const element = content as HTMLElement;
      if (element.parentElement?.classList.contains('active')) {
        element.style.maxHeight = element.scrollHeight + 50 + 'px';
      } else {
        element.style.maxHeight = '0';
      }
    });
  }, [openFaqIndex]);

  const pricingVisible = [
    {
      question: t('faqSeoOnly.cost.question'),
      answer: t('faqSeoOnly.cost.answer', {
        groupPerClass: formatEur(GROUP.pack20.perClass),
        groupTotal: formatEur(GROUP.pack20.total),
        groupSingle: formatEur(GROUP.single),
        juniorSingle: formatEur(PRIVATE.junior.single),
      }),
    },
    {
      question: t('faqSeoOnly.intro.question'),
      answer: t('faqSeoOnly.intro.answer', { classes: String(INTRO.classes), price: formatEur(INTRO.price) }),
    },
    { question: t('faq.validity.question'), answer: t('faq.validity.answer') },
    { question: t('faq.pregnancy.question'), answer: t('faq.pregnancy.answer') },
    { question: t('faq.injuries.question'), answer: t('faq.injuries.answer') },
    { question: t('faq.tryBefore.question'), answer: t('faq.tryBefore.answer') },
    { question: t('faq.renewals.question'), answer: t('faq.renewals.answer') },
    { question: t('faq.cancel.question'), answer: t('faq.cancel.answer') },
    {
      question: t('faq.annualUnlimited.question'),
      answer: t('faq.annualUnlimited.answer', {
        perMonth: formatEur(MEMBERSHIP.annual.perMonth),
        yearTotal: formatEur(MEMBERSHIP.annual.yearTotal),
        weekdayHours,
        weekendHours,
      }),
    },
    {
      question: t('faq.duration.question'),
      answer: t('faq.duration.answer', { minutes: String(CLASS_MINUTES) }),
    },
    {
      question: t('faq.groupSize.question'),
      answer: t('faq.groupSize.answer', { groupMax: String(GROUP_MAX) }),
    },
  ];

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description', { groupMax: String(GROUP_MAX), groupPrice: formatEur(GROUP.pack20.perClass), studioStreet })}
        keywords={t('seo.keywords')}
        canonical={canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription', { groupMax: String(GROUP_MAX), groupPrice: formatEur(GROUP.pack20.perClass) })}
        ogLocale={isNl ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={isNl ? ['en_US'] : ['nl_NL']}
        htmlLang={isNl ? 'nl' : 'en'}
        hreflangAlternates={PRICING_HREFLANG}
      />
      <StructuredData type="FAQPage" data={{ faqs: pricingVisible }} />
      <Breadcrumbs items={[{ name: t('breadcrumbName'), path: isNl ? '/pricing/nl/' : '/pricing/' }]} />

      <div className="pricing-page">
        <header className="pricing-hero">
          <p className="pricing-kicker">{t('hero.kicker')}</p>
          <h1>{t('hero.title')}</h1>
          <p className="pricing-lead">
            <Trans
              ns="pricing"
              i18nKey="hero.lead"
              values={{ groupMax: GROUP_MAX }}
              components={{
                schedule: <Link to={isNl ? '/schedule/nl/' : '/schedule/'} />,
                reformer: <Link to={localeHref('/reformer-pilates-amsterdam/', locale)} />,
                trx: <Link to={localeHref('/trx-training-amsterdam/', locale)} />,
              }}
            />
          </p>
        </header>
        <div className="bf-pricing-banner" role="region" aria-label={t('blackFriday.badge')}>
          <p className="pricing-kicker pricing-kicker-on-dark">{t('blackFriday.badge')}</p>
          <p>{t('blackFriday.lead')}</p>
        </div>
        <div className="special-offer-container">
          <div className="special-offer">
            <span className="offer-badge">{t('offer.badge')}</span>
            <h3>{t('offer.title')}</h3>
            <p>{t('offer.description', { classes: String(INTRO.classes), price: formatEur(INTRO.price) })}</p>
            <p className="offer-details">
              <Link to={isNl ? '/intro/nl/' : '/intro/'}>{t('offer.details')}</Link>
            </p>
            <span className="special-price">{formatEur(INTRO.price)}</span>
            <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100066" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
          </div>
        </div>

        <nav className="pricing-jump" aria-label={t('nav.aria')}>
          <a href="#membership">{t('nav.membership')}</a>
          <a href="#group-classes">{t('nav.group')}</a>
          <a href="#private-classes">{t('nav.private')}</a>
          <a href="#couple-classes">{t('nav.couple')}</a>
        </nav>

        <section className="pricing-content" id="membership">
            <p className="pricing-kicker">{t('membership.kicker')}</p>
            <h2 className="pricing-section-title">{t('membership.title')}</h2>
            <p className="pricing-subtitle">{t('membership.subtitle')}</p>

            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <span className="package-name">{t('membership.classesInMonth', { count: MEMBERSHIP.four.classes })}</span>
                  <p className="total-price">{t('labels.inTotal', { amount: formatEur(MEMBERSHIP.four.total) })}</p>
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.four.perClass)} <span className="per-person">{t('labels.perClass')}</span></h4>
                </div>
                <p className="validity">{t('labels.allDaysOneClass')}</p>
                <p className="package-fineprint">
                  {t('membership.monthlyFineprint')}
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="104" data-bw-identity-site="true" data-type="contract-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <span className="package-name">{t('membership.classesInMonth', { count: MEMBERSHIP.eight.classes })}</span>
                  <p className="total-price">{t('labels.inTotal', { amount: formatEur(MEMBERSHIP.eight.total) })}</p>
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.eight.perClass)} <span className="per-person">{t('labels.perClass')}</span></h4>
                </div>
                <p className="validity">{t('labels.allDaysOneClass')}</p>
                <p className="package-fineprint">
                  {t('membership.monthlyFineprint')}
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="107" data-bw-identity-site="true" data-type="contract-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">{t('labels.mostPopular')}</div>
                <div className="price-display">
                  <span className="package-name">{t('membership.unlimited3Name')}</span>
                  <p className="total-price">{formatEur(MEMBERSHIP.unlimited3.perMonth)} <span className="per-person">{t('labels.perMonth')}</span></p>
                  <h4 className="price-per-class">{t('membership.unlimitedClasses')}</h4>
                </div>
                <p className="validity">{t('labels.allDaysOneClass')}</p>
                <p className="package-fineprint">
                  {t('membership.unlimited3Fineprint')}
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="105" data-bw-identity-site="true" data-type="contract-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="badge">{t('labels.bestValue')}</div>
                <div className="price-display">
                  <span className="package-name">{t('membership.annualName')}</span>
                  <p className="total-price">
                    {t('membership.annualTotalNote', { yearTotal: formatEur(MEMBERSHIP.annual.yearTotal) })}
                  </p>
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.annual.perMonth)} <span className="per-person">{t('labels.perMonth')}</span></h4>
                </div>
                <p className="validity">{t('labels.allDaysOneClass')}</p>
                <p className="package-fineprint">
                  {t('membership.annualFineprint')}
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="102" data-bw-identity-site="true" data-type="contract-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>
            </div>
        </section>

        <section className="pricing-content" id="group-classes">
            <p className="pricing-kicker">{t('group.kicker')}</p>
            <h2 className="pricing-section-title">{t('group.title')}</h2>
            <p className="pricing-subtitle">{t('group.subtitle', { groupMax: String(GROUP_MAX), minutes: String(CLASS_MINUTES) })}</p>

            <div className="packages-grid">
              <ClassOffer name={t('labels.singleClass')} perClass={GROUP.single} weeks={1} serviceId="100002" />
              <ClassOffer
                name={t('labels.classPack', { count: 5 })}
                perClass={GROUP.pack5.perClass}
                total={GROUP.pack5.total}
                weeks={5}
                save={savePercent(GROUP.single, GROUP.pack5.perClass)}
                serviceId="100003"
                bonus={5}
              />
              <ClassOffer
                name={t('labels.classPack', { count: 10 })}
                perClass={GROUP.pack10.perClass}
                total={GROUP.pack10.total}
                weeks={10}
                save={savePercent(GROUP.single, GROUP.pack10.perClass)}
                serviceId="100004"
                bonus={10}
                badge={t('labels.mostPopular')}
                featured
              />
              <ClassOffer
                name={t('labels.classPack', { count: 20 })}
                perClass={GROUP.pack20.perClass}
                total={GROUP.pack20.total}
                weeks={20}
                save={savePercent(GROUP.single, GROUP.pack20.perClass)}
                serviceId="100005"
                bonus={20}
              />
            </div>
        </section>

        <section className="pricing-content" id="private-classes">
            <p className="pricing-kicker">{t('private.kicker')}</p>
            <h2 className="pricing-section-title">{t('private.title')}</h2>
            <p className="pricing-subtitle">{t('private.subtitle', { minutes: String(CLASS_MINUTES), privateFrom: formatEur(PRIVATE.junior.single) })}</p>

            <div className="instructor-tabs" role="tablist" aria-label={t('private.tabsAria')}>
              <button
                type="button"
                role="tab"
                aria-selected={instructorTier === 'master'}
                className={`instructor-tab ${instructorTier === 'master' ? 'active' : ''}`}
                onClick={() => setInstructorTier('master')}
              >
                {t('private.master')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={instructorTier === 'senior'}
                className={`instructor-tab ${instructorTier === 'senior' ? 'active' : ''}`}
                onClick={() => setInstructorTier('senior')}
              >
                {t('private.senior')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={instructorTier === 'junior'}
                className={`instructor-tab ${instructorTier === 'junior' ? 'active' : ''}`}
                onClick={() => setInstructorTier('junior')}
              >
                {t('private.junior')}
              </button>
            </div>

            <div className="instructor-panels">
            <div
              className={`instructor-panel${instructorTier === 'junior' ? ' is-active' : ''}`}
              role="tabpanel"
              aria-hidden={instructorTier !== 'junior'}
            >
            <p className="instructor-info">{t('private.juniorInfoLabel')} <strong>Gülce Koç</strong>, <strong>Lal Avgen</strong>, <strong>Nisan Atalay</strong>, <strong>Kelly Tin</strong>, <strong>E. Gamze Karadağ</strong></p>
            <div className="packages-grid">
              <ClassOffer name={t('labels.singleClass')} perClass={PRIVATE.junior.single} weeks={1} serviceId="100052" />
              <ClassOffer
                name={t('labels.classPack', { count: 5 })}
                perClass={PRIVATE.junior.pack5}
                total={packTotal(PRIVATE.junior.pack5, 5)}
                weeks={5}
                save={savePercent(PRIVATE.junior.single, PRIVATE.junior.pack5)}
                serviceId="100053"
                bonus={5}
              />
              <ClassOffer
                name={t('labels.classPack', { count: 10 })}
                perClass={PRIVATE.junior.pack10}
                total={packTotal(PRIVATE.junior.pack10, 10)}
                weeks={10}
                save={savePercent(PRIVATE.junior.single, PRIVATE.junior.pack10)}
                serviceId="100054"
                bonus={10}
              />
              <ClassOffer
                name={t('labels.classPack', { count: 20 })}
                perClass={PRIVATE.junior.pack20}
                total={packTotal(PRIVATE.junior.pack20, 20)}
                weeks={20}
                save={savePercent(PRIVATE.junior.single, PRIVATE.junior.pack20)}
                serviceId="100055"
                bonus={20}
              />
            </div>
            </div>

            <div
              className={`instructor-panel${instructorTier === 'senior' ? ' is-active' : ''}`}
              role="tabpanel"
              aria-hidden={instructorTier !== 'senior'}
            >
            <p className="instructor-info">{t('private.seniorInfoLabel')} <strong>Gökben Öztekin</strong>, <strong>Göknur Dipli</strong></p>
            <div className="packages-grid">
              <ClassOffer name={t('labels.singleClass')} perClass={PRIVATE.senior.single} weeks={1} serviceId="100012" />
              <ClassOffer
                name={t('labels.classPack', { count: 5 })}
                perClass={PRIVATE.senior.pack5}
                total={packTotal(PRIVATE.senior.pack5, 5)}
                weeks={5}
                save={savePercent(PRIVATE.senior.single, PRIVATE.senior.pack5)}
                serviceId="100013"
                bonus={5}
              />
              <ClassOffer
                name={t('labels.classPack', { count: 10 })}
                perClass={PRIVATE.senior.pack10}
                total={packTotal(PRIVATE.senior.pack10, 10)}
                weeks={10}
                save={savePercent(PRIVATE.senior.single, PRIVATE.senior.pack10)}
                serviceId="100014"
                bonus={10}
                badge={t('labels.mostPopular')}
                featured
              />
              <ClassOffer
                name={t('labels.classPack', { count: 20 })}
                perClass={PRIVATE.senior.pack20}
                total={packTotal(PRIVATE.senior.pack20, 20)}
                weeks={20}
                save={savePercent(PRIVATE.senior.single, PRIVATE.senior.pack20)}
                serviceId="100015"
                bonus={20}
              />
            </div>
            </div>

            <div
              className={`instructor-panel${instructorTier === 'master' ? ' is-active' : ''}`}
              role="tabpanel"
              aria-hidden={instructorTier !== 'master'}
            >
            <p className="instructor-info">
              {t('private.masterInfoLabel')} <strong>Elif Arzu Ogan</strong>: {t('private.masterRole')}
            </p>
            <div className="packages-grid">
              <ClassOffer name={t('labels.singleClass')} perClass={PRIVATE.master.single} weeks={1} serviceId="100048" />
              <ClassOffer
                name={t('labels.classPack', { count: 5 })}
                perClass={PRIVATE.master.pack5}
                total={packTotal(PRIVATE.master.pack5, 5)}
                weeks={5}
                save={savePercent(PRIVATE.master.single, PRIVATE.master.pack5)}
                serviceId="100049"
                bonus={5}
              />
              <ClassOffer
                name={t('labels.classPack', { count: 10 })}
                perClass={PRIVATE.master.pack10}
                total={packTotal(PRIVATE.master.pack10, 10)}
                weeks={10}
                save={savePercent(PRIVATE.master.single, PRIVATE.master.pack10)}
                serviceId="100050"
                bonus={10}
              />
              <ClassOffer
                name={t('labels.classPack', { count: 20 })}
                perClass={PRIVATE.master.pack20}
                total={packTotal(PRIVATE.master.pack20, 20)}
                weeks={20}
                save={savePercent(PRIVATE.master.single, PRIVATE.master.pack20)}
                serviceId="100051"
                bonus={20}
              />
            </div>
            </div>
            </div>
        </section>

        <section className="pricing-content" id="couple-classes">
            <p className="pricing-kicker">{t('couple.kicker')}</p>
            <h2 className="pricing-section-title">{t('couple.title')}</h2>
            <p className="pricing-subtitle">{t('couple.subtitle', { minutes: String(CLASS_MINUTES) })}</p>

            <div className="packages-grid">
              <ClassOffer name={t('labels.singleClass')} perClass={COUPLE.single} weeks={1} unit="person" serviceId="100033" />
              <ClassOffer
                name={t('labels.classPack', { count: 5 })}
                perClass={COUPLE.pack5.perClass}
                total={COUPLE.pack5.total}
                weeks={5}
                save={savePercent(COUPLE.single, COUPLE.pack5.perClass)}
                unit="person"
                serviceId="100034"
                bonus={5}
              />
              <ClassOffer
                name={t('labels.classPack', { count: 10 })}
                perClass={COUPLE.pack10.perClass}
                total={COUPLE.pack10.total}
                weeks={10}
                save={savePercent(COUPLE.single, COUPLE.pack10.perClass)}
                unit="person"
                serviceId="100035"
                bonus={10}
                badge={t('labels.bestValue')}
                featured
              />
              <ClassOffer
                name={t('labels.classPack', { count: 20 })}
                perClass={COUPLE.pack20.perClass}
                total={COUPLE.pack20.total}
                weeks={20}
                save={savePercent(COUPLE.single, COUPLE.pack20.perClass)}
                unit="person"
                serviceId="100036"
                bonus={20}
              />
            </div>
        </section>

        <div className="info-section">
          <div className="info-container">
            <p className="pricing-kicker">{t('info.kicker')}</p>
            <h2 className="info-title">{t('info.title')}</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>{t('info.clothing.title')}</h3>
                <p>{t('info.clothing.text')}</p>
              </div>

              <div className="info-card">
                <h3>{t('info.socks.title')}</h3>
                <p>{t('info.socks.text')}</p>
              </div>

              <div className="info-card">
                <h3>{t('info.water.title')}</h3>
                <p>{t('info.water.text', { minutes: String(CLASS_MINUTES) })}</p>
              </div>

              <div className="info-card">
                <h3>{t('info.towel.title')}</h3>
                <p>{t('info.towel.text')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <div className="faq-container">
            <p className="pricing-kicker">{t('faq.kicker')}</p>
            <h2>{t('faq.title')}</h2>

            {pricingVisible.map((faq, index) => (
              <div key={faq.question} className={`faq-item ${openFaqIndex === index ? 'active' : ''}`}>
                <div className="faq-header" onClick={() => toggleFaq(index)}>
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
                </div>
                <div className="faq-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-cta">
          <p className="pricing-kicker pricing-kicker-on-dark">{t('contact.kicker')}</p>
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.text')}</p>
          <div className="cta-buttons">
            <a href="mailto:info@pt7.nl" className="cta-button primary">{t('contact.emailUs')}</a>
            <a href="tel:+31685162693" className="cta-button secondary">{t('contact.call', { phone: '+31 685 162693' })}</a>
          </div>
        </div>

        <div className="pricing-summary">
          {SUMMARY_KEYS.map((key) => (
            <p key={key}>{t(`summary.${key}`, summaryValues)}</p>
          ))}
        </div>
      </div>
    </>
  );
};
