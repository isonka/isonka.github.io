import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { StableHealcodeSlot } from '../components/StableHealcodeSlot';
import { trackPricingView, trackPageView } from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import {
  CLASS_MINUTES,
  COUPLE,
  GROUP,
  GROUP_MAX,
  HEALCODE,
  INTRO,
  MEMBERSHIP,
  PRIVATE,
  formatEur,
  healcodeHtml,
  type HealcodeWidget,
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

type Tab = 'memberships' | 'packs' | 'private' | 'couples';
type PrivateTier = keyof typeof PRIVATE;

const FAQ_KEYS = ['validity', 'cancel', 'freeze', 'pregnant', 'injury', 'levels'] as const;

type PlanCard = {
  n: number;
  title: string;
  price: string;
  priceNote: string;
  sub: string;
  bullets: string[];
  featured?: boolean;
  badge?: string;
  stripeGold?: boolean;
  widget: HealcodeWidget;
  cta: string;
};

function BuyButton({ widget, label }: { widget: HealcodeWidget; label: string }) {
  return (
    <StableHealcodeSlot
      className="price-buy"
      html={healcodeHtml(widget, label)}
    />
  );
}

export const Pricing = () => {
  const { t } = useTranslation('pricing');
  const locale = useLocale();
  const isNl = locale === 'nl';
  const [tab, setTab] = useState<Tab>('memberships');
  const [tier, setTier] = useState<PrivateTier>('master');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const canonical = isNl ? PRICING_URL_NL : PRICING_URL_EN;
  const buyLabel = t('labels.buyNow');

  useEffect(() => {
    trackPageView(isNl ? '/pricing/nl/' : '/pricing/', t('seo.analyticsTitle'));
    trackPricingView();
    void ensureHealcodeLoaded().catch(() => {});
  }, [isNl, t]);

  const privateWidgets =
    tier === 'master'
      ? HEALCODE.privateMaster
      : tier === 'senior'
        ? HEALCODE.privateSenior
        : HEALCODE.privateJunior;

  const membershipCards: PlanCard[] = [
    {
      n: 1,
      title: t('membership.four'),
      price: formatEur(MEMBERSHIP.four.total),
      priceNote: t('labels.perMonth'),
      sub: `${formatEur(MEMBERSHIP.four.perClass)} ${t('labels.perClass')}`,
      bullets: [t('membership.fourB1'), t('membership.fourB2')],
      widget: HEALCODE.membership4,
      cta: t('labels.startMembership'),
    },
    {
      n: 2,
      title: t('membership.eight'),
      price: formatEur(MEMBERSHIP.eight.total),
      priceNote: t('labels.perMonth'),
      sub: `${formatEur(MEMBERSHIP.eight.perClass)} ${t('labels.perClass')}`,
      bullets: [t('membership.eightB1'), t('membership.eightB2')],
      widget: HEALCODE.membership8,
      cta: t('labels.startMembership'),
    },
    {
      n: 3,
      title: t('membership.unlimited'),
      price: formatEur(MEMBERSHIP.unlimited3.perMonth),
      priceNote: t('labels.perMonth'),
      sub: t('labels.unlimitedClasses'),
      bullets: [t('membership.unlimitedB1'), t('membership.unlimitedB2')],
      featured: true,
      badge: t('labels.mostPopular'),
      stripeGold: true,
      widget: HEALCODE.unlimited3,
      cta: t('labels.startMembership'),
    },
    {
      n: 4,
      title: t('membership.annual'),
      price: formatEur(MEMBERSHIP.annual.perMonth),
      priceNote: t('labels.perMonth'),
      sub: t('labels.yearTotal', { amount: formatEur(MEMBERSHIP.annual.yearTotal) }),
      bullets: [t('membership.annualB1'), t('membership.annualB2')],
      featured: true,
      badge: t('labels.bestValue'),
      stripeGold: true,
      widget: HEALCODE.annual,
      cta: t('labels.startMembership'),
    },
  ];

  const packCards: PlanCard[] = [
    {
      n: 1,
      title: t('group.single'),
      price: formatEur(GROUP.single),
      priceNote: '',
      sub: `${CLASS_MINUTES} min · max ${GROUP_MAX}`,
      bullets: [],
      widget: HEALCODE.groupSingle,
      cta: t('labels.buyPack'),
    },
    {
      n: 2,
      title: t('group.pack5'),
      price: formatEur(GROUP.pack5.total),
      priceNote: '',
      sub: `${formatEur(GROUP.pack5.perClass)} ${t('labels.perClass')} · ${t('group.valid', { weeks: 5 })}`,
      bullets: [],
      widget: HEALCODE.group5,
      cta: t('labels.buyPack'),
    },
    {
      n: 3,
      title: t('group.pack10'),
      price: formatEur(GROUP.pack10.total),
      priceNote: '',
      sub: `${formatEur(GROUP.pack10.perClass)} ${t('labels.perClass')} · ${t('group.valid', { weeks: 10 })}`,
      bullets: [],
      featured: true,
      stripeGold: true,
      widget: HEALCODE.group10,
      cta: t('labels.buyPack'),
    },
    {
      n: 4,
      title: t('group.pack20'),
      price: formatEur(GROUP.pack20.total),
      priceNote: '',
      sub: `${formatEur(GROUP.pack20.perClass)} ${t('labels.perClass')} · ${t('group.valid', { weeks: 20 })}`,
      bullets: [],
      featured: true,
      badge: t('labels.bestValue'),
      stripeGold: true,
      widget: HEALCODE.group20,
      cta: t('labels.buyPack'),
    },
  ];

  const p = PRIVATE[tier];
  const tierLabel =
    tier === 'master'
      ? t('labels.tierMaster')
      : tier === 'senior'
        ? t('labels.tierSenior')
        : t('labels.tierJunior');
  const privateCards: PlanCard[] = [
    {
      n: 1,
      title: t('private.single'),
      price: formatEur(p.single),
      priceNote: '',
      sub: tierLabel,
      bullets: [],
      widget: privateWidgets.single,
      cta: t('labels.bookPrivate'),
    },
    {
      n: 2,
      title: t('private.pack5'),
      price: formatEur(packTotalPrivate(p.pack5, 5)),
      priceNote: '',
      sub: `${formatEur(p.pack5)} ${t('labels.perClass')}`,
      bullets: [],
      widget: privateWidgets.pack5,
      cta: t('labels.bookPrivate'),
    },
    {
      n: 3,
      title: t('private.pack10'),
      price: formatEur(packTotalPrivate(p.pack10, 10)),
      priceNote: '',
      sub: `${formatEur(p.pack10)} ${t('labels.perClass')}`,
      bullets: [],
      featured: true,
      stripeGold: true,
      widget: privateWidgets.pack10,
      cta: t('labels.bookPrivate'),
    },
    {
      n: 4,
      title: t('private.pack20'),
      price: formatEur(packTotalPrivate(p.pack20, 20)),
      priceNote: '',
      sub: `${formatEur(p.pack20)} ${t('labels.perClass')}`,
      bullets: [],
      featured: true,
      badge: t('labels.bestValue'),
      stripeGold: true,
      widget: privateWidgets.pack20,
      cta: t('labels.bookPrivate'),
    },
  ];

  const coupleCards: PlanCard[] = [
    {
      n: 1,
      title: t('couple.single'),
      price: formatEur(COUPLE.single),
      priceNote: '',
      sub: t('labels.perClass'),
      bullets: [],
      widget: HEALCODE.coupleSingle,
      cta: t('labels.bookCouple'),
    },
    {
      n: 2,
      title: t('couple.pack5'),
      price: formatEur(COUPLE.pack5.total),
      priceNote: '',
      sub: `${formatEur(COUPLE.pack5.perClass)} ${t('labels.perClass')}`,
      bullets: [],
      widget: HEALCODE.couple5,
      cta: t('labels.bookCouple'),
    },
    {
      n: 3,
      title: t('couple.pack10'),
      price: formatEur(COUPLE.pack10.total),
      priceNote: '',
      sub: `${formatEur(COUPLE.pack10.perClass)} ${t('labels.perClass')}`,
      bullets: [],
      featured: true,
      stripeGold: true,
      widget: HEALCODE.couple10,
      cta: t('labels.bookCouple'),
    },
    {
      n: 4,
      title: t('couple.pack20'),
      price: formatEur(COUPLE.pack20.total),
      priceNote: '',
      sub: `${formatEur(COUPLE.pack20.perClass)} ${t('labels.perClass')}`,
      bullets: [],
      featured: true,
      badge: t('labels.bestValue'),
      stripeGold: true,
      widget: HEALCODE.couple20,
      cta: t('labels.bookCouple'),
    },
  ];

  const cards =
    tab === 'memberships'
      ? membershipCards
      : tab === 'packs'
        ? packCards
        : tab === 'private'
          ? privateCards
          : coupleCards;

  const leadKey =
    tab === 'memberships'
      ? 'plans.membershipLead'
      : tab === 'packs'
        ? 'plans.packsLead'
        : tab === 'private'
          ? 'plans.privateLead'
          : 'plans.couplesLead';

  return (
    <div className="pricing pricing--c">
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description', {
          groupPrice: formatEur(GROUP.pack20.perClass),
          groupMax: GROUP_MAX,
        })}
        keywords={t('seo.keywords')}
        canonical={canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription', {
          groupPrice: formatEur(GROUP.pack20.perClass),
          groupMax: GROUP_MAX,
        })}
        hreflang={PRICING_HREFLANG}
      />
      <header className="price-hero">
        <div className="price-hero-stripes p-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="price-hero-inner p-sec">
          <Breadcrumbs
            items={[{ name: t('breadcrumbName'), path: isNl ? '/pricing/nl/' : '/pricing/' }]}
          />
          <p className="price-mono price-mono--gold">{t('hero.eyebrow')}</p>
          <h1 className="price-h1">
            {t('hero.title')} <span>{t('hero.titleAccent')}</span>
          </h1>
          <p className="price-hero-lead">{t('hero.lead')}</p>
        </div>
      </header>

      <section className="price-facts" aria-label={t('facts.aria')}>
        <div className="price-facts-grid p-facts">
          <div className="price-fact">
            <span className="price-fact-v">45</span>
            <span className="price-fact-l">{t('facts.minutes')}</span>
          </div>
          <div className="price-fact">
            <span className="price-fact-v">≤{GROUP_MAX}</span>
            <span className="price-fact-l">{t('facts.perClass')}</span>
          </div>
          <div className="price-fact">
            <span className="price-fact-v">7</span>
            <span className="price-fact-l">{t('facts.lanes')}</span>
          </div>
          <div className="price-fact">
            <span className="price-fact-v">1</span>
            <span className="price-fact-l">{t('facts.coach')}</span>
          </div>
        </div>
      </section>

      <section id="offer" className="price-ticket-sec p-sec">
        <div className="price-ticket-copy">
          <h2 className="price-section-title">
            {t('ticket.title')} <span>{t('ticket.titleAccent')}</span>
          </h2>
          <p>{t('ticket.lead')}</p>
        </div>
        <div className="ticket">
          <div className="ticket-main">
            <div className="ticket-meta">
              <span>{t('ticket.admit')}</span>
              <span>{t('ticket.badge')}</span>
            </div>
            <div>
              <div className="ticket-big">{t('ticket.big')}</div>
              <div className="ticket-sub">{t('ticket.sub')}</div>
            </div>
          </div>
          <div className="ticket-perf" aria-hidden="true" />
          <div className="ticket-stub">
            <span className="price-mono">{t('ticket.stubLabel')}</span>
            <span className="ticket-price">{formatEur(INTRO.price)}</span>
            <BuyButton widget={HEALCODE.intro} label={t('ticket.cta')} />
          </div>
        </div>
      </section>

      <section className="price-plans p-sec">
        <h2 className="price-section-title">
          {t('plans.title')} <span>{t('plans.titleAccent')}</span>
        </h2>
        <div className="price-tabs p-tabs" role="tablist" aria-label={t('plans.tabsAria')}>
          {(
            [
              ['memberships', 'plans.memberships'],
              ['packs', 'plans.packs'],
              ['private', 'plans.private'],
              ['couples', 'plans.couples'],
            ] as const
          ).map(([id, key]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={tab === id ? 'is-selected' : undefined}
              onClick={() => setTab(id)}
            >
              {t(key)}
            </button>
          ))}
        </div>
        <p className="price-tab-lead">{t(leadKey)}</p>

        {tab === 'private' ? (
          <div className="price-tier-tabs" role="tablist" aria-label="Coach level">
            {(['master', 'senior', 'junior'] as const).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tier === id}
                className={tier === id ? 'is-selected' : undefined}
                onClick={() => setTier(id)}
              >
                {id === 'master'
                  ? t('labels.tierMaster')
                  : id === 'senior'
                    ? t('labels.tierSenior')
                    : t('labels.tierJunior')}
              </button>
            ))}
          </div>
        ) : null}

        <div className="price-grid">
          {cards.map((card) => (
            <article
              key={`${tab}-${tier}-${card.n}`}
              className={`price-card${card.featured ? ' is-featured' : ''}`}
            >
              <span
                className={`price-card-stripe${card.stripeGold ? ' is-gold' : ''}`}
                aria-hidden="true"
              />
              <span className="price-card-n" aria-hidden="true">
                {card.n}
              </span>
              <div className="price-card-head">
                <span className="price-card-title">{card.title}</span>
                {card.badge ? <span className="price-card-badge">{card.badge}</span> : null}
              </div>
              <div className="price-card-price">
                <div className="price-card-amount">
                  {card.price}
                  {card.priceNote ? (
                    <span className="price-card-note">{card.priceNote}</span>
                  ) : null}
                </div>
                <div className="price-card-sub">{card.sub}</div>
              </div>
              {card.bullets.length > 0 ? (
                <ul className="price-card-bullets">
                  {card.bullets.map((b) => (
                    <li key={b}>— {b}</li>
                  ))}
                </ul>
              ) : (
                <div className="price-card-spacer" />
              )}
              <div className={`price-card-cta${card.featured ? ' is-featured' : ''}`}>
                <BuyButton widget={card.widget} label={card.cta || buyLabel} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="price-faq">
        <div className="price-faq-inner p-sec">
          <div className="price-faq-copy">
            <h2 className="price-section-title">
              {t('faq.title')} <span>{t('faq.titleAccent')}</span>
            </h2>
            <p>{t('faq.lead')}</p>
            <a
              className="price-whatsapp"
              href="https://wa.me/31685162693"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('faq.whatsapp')}
            </a>
          </div>
          <div className="price-faq-list">
            {FAQ_KEYS.map((key, i) => {
              const open = openFaq === i;
              return (
                <details
                  key={key}
                  open={open}
                  onToggle={(e) => {
                    const el = e.currentTarget;
                    setOpenFaq(el.open ? i : null);
                  }}
                >
                  <summary>
                    <span className="price-mono price-faq-n">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="price-faq-q">{t(`faq.items.${key}.q`)}</span>
                    <span className="faq-plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{t(`faq.items.${key}.a`)}</p>
                </details>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

function packTotalPrivate(perClass: number, classes: number): number {
  return perClass * classes;
}
