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
  TRIO,
  formatEur,
  packTotal,
} from '../data/pricing';
import { useLocale } from '../i18n/useLocale';
import '../styles/Pricing.css';

const PRICING_URL_EN = 'https://www.pt7.nl/pricing/';
const PRICING_URL_NL = 'https://www.pt7.nl/pricing/nl/';

const PRICING_HREFLANG = [
  { hreflang: 'en', href: PRICING_URL_EN },
  { hreflang: 'nl', href: PRICING_URL_NL },
  { hreflang: 'x-default', href: PRICING_URL_EN },
];

export const Pricing= () => {
  const { t } = useTranslation('pricing');
  const locale = useLocale();
  const isNl = locale === 'nl';
  const [instructorTier, setInstructorTier] = useState<keyof typeof PRIVATE>('master');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const canonical = isNl ? PRICING_URL_NL : PRICING_URL_EN;
  const buyNow = t('labels.buyNow');

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

  const pricingSeoOnly = [
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
  ];

  const pricingSchema = [...pricingSeoOnly, ...pricingVisible];

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description', { groupMax: String(GROUP_MAX), groupPrice: formatEur(GROUP.pack20.perClass) })}
        keywords={t('seo.keywords')}
        canonical={canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription', { groupMax: String(GROUP_MAX), groupPrice: formatEur(GROUP.pack20.perClass) })}
        ogLocale={isNl ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={isNl ? ['en_US'] : ['nl_NL']}
        htmlLang={isNl ? 'nl' : 'en'}
        hreflangAlternates={PRICING_HREFLANG}
      />
      <StructuredData type="FAQPage" data={{ faqs: pricingSchema }} />
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
              components={{ schedule: <Link to="/schedule/" /> }}
            />
          </p>
        </header>
        <div className="special-offer-container">
          <div className="special-offer">
            <span className="offer-badge">{t('offer.badge')}</span>
            <h3>{t('offer.title')}</h3>
            <p>{t('offer.description', { classes: String(INTRO.classes), price: formatEur(INTRO.price) })}</p>
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
          <a href="#trio-classes">{t('nav.trio')}</a>
        </nav>

        <section className="pricing-content" id="membership">
            <p className="pricing-kicker">{t('membership.kicker')}</p>
            <h2 className="pricing-section-title">{t('membership.title')}</h2>
            <p className="pricing-subtitle">{t('membership.subtitle')}</p>

            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.four.perClass)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('membership.classesInMonth', { count: MEMBERSHIP.four.classes })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(MEMBERSHIP.four.total) })}</p>
                <p className="validity">{t('labels.allDaysOneClass')}</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
                  {t('membership.monthlyFineprint')}
                </p>
                <StableHealcodeSlot
                  className="buy-button healcode-contract-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-contract-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="104" data-bw-identity-site="true" data-type="contract-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.eight.perClass)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('membership.classesInMonth', { count: MEMBERSHIP.eight.classes })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(MEMBERSHIP.eight.total) })}</p>
                <p className="validity">{t('labels.allDaysOneClass')}</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
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
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.unlimited3.perMonth)} <span className="per-person">{t('labels.perMonth')}</span></h4>
                  <span className="package-name">{t('membership.unlimited3Name')}</span>
                </div>
                <p className="total-price">{t('membership.unlimitedClasses')}</p>
                <p className="validity">{t('labels.allDaysOneClass')}</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
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
                  <h4 className="price-per-class">{formatEur(MEMBERSHIP.annual.perMonth)} <span className="per-person">{t('labels.perMonth')}</span></h4>
                  <span className="package-name">{t('membership.annualName')}</span>
                </div>
                <p className="total-price">
                  {t('membership.annualTotalNote', { yearTotal: formatEur(MEMBERSHIP.annual.yearTotal) })}
                </p>
                <p className="validity">{t('labels.allDaysOneClass')}</p>
                <p className="validity" style={{ color: '#888', fontSize: '13px' }}>
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
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(GROUP.single)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.singleClass')}</span>
                </div>
                <p className="validity">{t('labels.validFor', { count: 1 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100002" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(GROUP.pack5.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 5 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(GROUP.pack5.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 5 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100003" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">{t('labels.mostPopular')}</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(GROUP.pack10.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 10 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(GROUP.pack10.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 10 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100004" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(GROUP.pack20.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 20 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(GROUP.pack20.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 20 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100005" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>
            </div>
        </section>

        <section className="pricing-content" id="private-classes">
            <p className="pricing-kicker">{t('private.kicker')}</p>
            <h2 className="pricing-section-title">{t('private.title')}</h2>
            <p className="pricing-subtitle">{t('private.subtitle', { minutes: String(CLASS_MINUTES) })}</p>

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
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.junior.single)}</h4>
                  <span className="package-name">{t('labels.singleClass')}</span>
                </div>
                <p className="validity">{t('labels.validFor', { count: 1 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100052" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.junior.pack5)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 5 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.junior.pack5, 5)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 5 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100053" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.junior.pack10)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 10 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.junior.pack10, 10)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 10 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100054" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.junior.pack20)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 20 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.junior.pack20, 20)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 20 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100055" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>
            </div>
            </div>

            <div
              className={`instructor-panel${instructorTier === 'senior' ? ' is-active' : ''}`}
              role="tabpanel"
              aria-hidden={instructorTier !== 'senior'}
            >
            <p className="instructor-info">{t('private.seniorInfoLabel')} <strong>Gökben Öztekin</strong>, <strong>Göknur Dipli</strong></p>
            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.senior.single)}</h4>
                  <span className="package-name">{t('labels.singleClass')}</span>
                </div>
                <p className="validity">{t('labels.validFor', { count: 1 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100012" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.senior.pack5)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 5 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.senior.pack5, 5)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 5 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100013" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">{t('labels.mostPopular')}</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.senior.pack10)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 10 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.senior.pack10, 10)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 10 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100014" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.senior.pack20)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 20 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.senior.pack20, 20)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 20 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100015" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>
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
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.master.single)}</h4>
                  <span className="package-name">{t('labels.singleClass')}</span>
                </div>
                <p className="validity">{t('labels.validFor', { count: 1 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100048" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.master.pack5)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 5 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.master.pack5, 5)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 5 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100049" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.master.pack10)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 10 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.master.pack10, 10)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 10 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100050" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(PRIVATE.master.pack20)} <span className="per-person">{t('labels.perClass')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 20 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(packTotal(PRIVATE.master.pack20, 20)) })}</p>
                <p className="validity">{t('labels.validFor', { count: 20 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100051" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>
            </div>
            </div>
            </div>
        </section>

        <section className="pricing-content" id="couple-classes">
            <p className="pricing-kicker">{t('couple.kicker')}</p>
            <h2 className="pricing-section-title">{t('couple.title')}</h2>
            <p className="pricing-subtitle">{t('couple.subtitle', { minutes: String(CLASS_MINUTES) })}</p>

            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(COUPLE.single)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.singleClass')}</span>
                </div>
                <p className="validity">{t('labels.validFor', { count: 1 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100033" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(COUPLE.pack5.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 5 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(COUPLE.pack5.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 5 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100034" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">{t('labels.bestValue')}</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(COUPLE.pack10.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 10 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(COUPLE.pack10.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 10 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100035" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(COUPLE.pack20.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 20 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(COUPLE.pack20.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 20 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100036" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>
            </div>
        </section>

        <section className="pricing-content" id="trio-classes">
            <p className="pricing-kicker">{t('trio.kicker')}</p>
            <h2 className="pricing-section-title">{t('trio.title')}</h2>
            <p className="pricing-subtitle">{t('trio.subtitle', { minutes: String(CLASS_MINUTES) })}</p>

            <div className="packages-grid">
              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(TRIO.single)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.singleClass')}</span>
                </div>
                <p className="validity">{t('labels.validFor', { count: 1 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100037" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(TRIO.pack5.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 5 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(TRIO.pack5.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 5 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100038" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card featured">
                <div className="badge">{t('labels.bestValue')}</div>
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(TRIO.pack10.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 10 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(TRIO.pack10.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 10 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100039" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>

              <div className="package-card">
                <div className="price-display">
                  <h4 className="price-per-class">{formatEur(TRIO.pack20.perClass)} <span className="per-person">{t('labels.perPerson')}</span></h4>
                  <span className="package-name">{t('labels.classPack', { count: 20 })}</span>
                </div>
                <p className="total-price">{t('labels.inTotal', { amount: formatEur(TRIO.pack20.total) })}</p>
                <p className="validity">{t('labels.validFor', { count: 20 })}</p>
                <StableHealcodeSlot
                  className="buy-button healcode-pricing-option-text-link"
                  html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100040" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${buyNow}"></healcode-widget>`}
                />
              </div>
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
      </div>
    </>
  );
};
