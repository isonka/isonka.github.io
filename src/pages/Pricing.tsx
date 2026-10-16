import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPricingView, trackPageView } from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import { StableHealcodeSlot } from '../components/StableHealcodeSlot';
import {
  CLASS_MINUTES,
  COUPLE_PLANS,
  GROUP,
  GROUP_MAX,
  INTRO,
  MEMBERSHIP_PLANS,
  PACK_PLANS,
  PRIVATE,
  PRIVATE_TIERS,
  PRICING_TABS,
  formatEur,
  healcodeHtml,
  privatePlans,
  type PlanCard,
  type PricingTab,
  type PrivateTier,
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

const FAQ_KEYS = ['validity', 'cancel', 'freeze', 'pregnancy', 'injuries', 'levels'] as const;
const FACT_KEYS = ['minutes', 'size', 'lanes', 'coach'] as const;

function PlanGrid({
  plans,
  t,
}: {
  plans: PlanCard[];
  t: (key: string, opts?: Record<string, string>) => string;
}) {
  return (
    <div className="pricing-plan-grid">
      {plans.map((plan) => {
        const featured = Boolean(plan.badge);
        const ctaLabel = t(plan.ctaKey);
        const per =
          plan.perValue != null
            ? t(plan.perKey, { amount: plan.perValue })
            : t(plan.perKey);
        return (
          <article
            key={plan.id}
            className={`pricing-plan-card${featured ? ' is-featured' : ''}`}
          >
            <span
              className={`pricing-plan-stripe${featured ? ' is-gold' : ''}`}
              aria-hidden="true"
            />
            <div className="pricing-plan-top">
              <span className="pricing-plan-name">{t(plan.nameKey)}</span>
              {plan.badge ? (
                <span className="pricing-plan-badge">{t(`labels.${plan.badge}`)}</span>
              ) : null}
            </div>
            <div>
              <div className="pricing-plan-price">
                {formatEur(plan.price)}
                {plan.unitKey ? (
                  <span className="pricing-plan-unit">{t(`labels.${plan.unitKey}`)}</span>
                ) : null}
              </div>
              <div className="pricing-plan-per">{per}</div>
            </div>
            <ul className="pricing-plan-points">
              {plan.pointsKeys.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <StableHealcodeSlot
              className={`pricing-plan-cta${featured ? ' is-primary' : ''} ${
                plan.widgetType === 'contract-link'
                  ? 'healcode-contract-text-link'
                  : 'healcode-pricing-option-text-link'
              }`}
              html={healcodeHtml(plan.serviceId, plan.widgetType, ctaLabel)}
            />
          </article>
        );
      })}
    </div>
  );
}

export const Pricing = () => {
  const { t } = useTranslation('pricing');
  const locale = useLocale();
  const isNl = locale === 'nl';
  const [tab, setTab] = useState<PricingTab>('memberships');
  const [tier, setTier] = useState<PrivateTier>('senior');
  const canonical = isNl ? PRICING_URL_NL : PRICING_URL_EN;

  const plans = useMemo(() => {
    if (tab === 'memberships') return MEMBERSHIP_PLANS;
    if (tab === 'packs') return PACK_PLANS;
    if (tab === 'couples') return COUPLE_PLANS;
    return privatePlans(tier);
  }, [tab, tier]);

  const faqs = [
    ...FAQ_KEYS.map((key) => ({
      question: t(`faq.items.${key}.question`),
      answer: t(`faq.items.${key}.answer`),
    })),
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
      answer: t('faqSeoOnly.intro.answer', {
        classes: String(INTRO.classes),
        price: formatEur(INTRO.price),
      }),
    },
  ];

  useEffect(() => {
    trackPageView(isNl ? '/pricing/nl/' : '/pricing/', t('seo.analyticsTitle'));
    trackPricingView();
    void ensureHealcodeLoaded();
  }, [isNl, t]);

  const introCta = t('offer.cta');

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description', {
          groupMax: String(GROUP_MAX),
          groupPrice: formatEur(GROUP.pack20.perClass),
        })}
        keywords={t('seo.keywords')}
        canonical={canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription', {
          groupMax: String(GROUP_MAX),
          groupPrice: formatEur(GROUP.pack20.perClass),
        })}
        ogLocale={isNl ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={isNl ? ['en_US'] : ['nl_NL']}
        htmlLang={isNl ? 'nl' : 'en'}
        hreflangAlternates={PRICING_HREFLANG}
      />
      <StructuredData type="FAQPage" data={{ faqs }} />
      <Breadcrumbs
        items={[{ name: t('breadcrumbName'), path: isNl ? '/pricing/nl/' : '/pricing/' }]}
      />

      <div className="pricing-page">
        <header id="top" className="pricing-hero">
          <p className="pricing-eyebrow">{t('hero.kicker')}</p>
          <h1 className="pricing-display">
            {t('hero.titleBefore')}{' '}
            <span className="pricing-accent">{t('hero.titleAccent')}</span>
          </h1>
          <p className="pricing-lead">
            {t('hero.lead', { minutes: String(CLASS_MINUTES) })}
          </p>
        </header>

        <section id="offer" className="pricing-offer-wrap">
          <div className="pricing-offer">
            <span className="pricing-offer-stripe" aria-hidden="true" />
            <div className="pricing-offer-copy">
              <div className="pricing-eyebrow">{t('offer.label')}</div>
              <div className="pricing-offer-title">
                {t('offer.title', { classes: String(INTRO.classes) })}{' '}
                <span className="pricing-accent">{formatEur(INTRO.price)}</span>
              </div>
              <div className="pricing-offer-detail">{t('offer.detail')}</div>
            </div>
            <StableHealcodeSlot
              className="pricing-offer-cta healcode-pricing-option-text-link"
              html={healcodeHtml(INTRO.serviceId, INTRO.widgetType, introCta)}
            />
          </div>
        </section>

        <section className="pricing-plans">
          <h2 className="pricing-heading">
            {t('plans.titleBefore')}{' '}
            <span className="pricing-accent">{t('plans.titleAccent')}</span>
          </h2>

          <div className="pricing-tabs" role="tablist" aria-label={t('plans.tabsAria')}>
            {PRICING_TABS.map((id) => {
              const on = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  className={`pricing-tab${on ? ' is-on' : ''}`}
                  onClick={() => setTab(id)}
                >
                  {t(`plans.tabs.${id}`)}
                </button>
              );
            })}
          </div>

          <p className="pricing-tab-intro">{t(`plans.intros.${tab}`)}</p>

          {tab === 'private' ? (
            <>
              <div
                className="pricing-levels"
                role="tablist"
                aria-label={t('plans.levelsAria')}
              >
                {PRIVATE_TIERS.map((level) => {
                  const on = tier === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      className={`pricing-level${on ? ' is-on' : ''}`}
                      onClick={() => setTier(level)}
                    >
                      {t(`plans.levels.${level}`)}
                    </button>
                  );
                })}
              </div>
              <p className="pricing-level-note">{t(`plans.levelNotes.${tier}`)}</p>
            </>
          ) : null}

          <PlanGrid plans={plans} t={t} />
        </section>

        <section className="pricing-facts" aria-label={t('facts.minutes.title')}>
          <div className="pricing-facts-inner">
            {FACT_KEYS.map((key) => (
              <div key={key} className="pricing-fact">
                <span className="pricing-fact-stripe" aria-hidden="true" />
                <strong>{t(`facts.${key}.title`)}</strong>
                <span>{t(`facts.${key}.body`)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pricing-faq">
          <div className="pricing-faq-aside">
            <h2 className="pricing-heading">
              {t('faq.titleBefore')}{' '}
              <span className="pricing-accent">{t('faq.titleAccent')}</span>
            </h2>
            <p className="pricing-faq-lead">{t('faq.lead')}</p>
            <a
              href="https://wa.me/31685162693"
              className="pricing-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('faq.whatsapp')}
            </a>
            <p className="pricing-vat">{t('faq.vat')}</p>
          </div>
          <div className="pricing-faq-list">
            {FAQ_KEYS.map((key) => (
              <details key={key} className="pricing-faq-item">
                <summary>
                  {t(`faq.items.${key}.question`)}
                  <span className="pricing-faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{t(`faq.items.${key}.answer`)}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
