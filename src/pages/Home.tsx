import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { StableHealcodeSlot } from '../components/StableHealcodeSlot';
import { ensureHealcodeLoaded } from '../utils/healcode';
import { trackPageView } from '../utils/gtmTracking';
import { trackFBPageView, trackFBBookingClick } from '../utils/fbPixelTracking';
import { trainerProfiles } from '../data/trainers';
import { GROUP_MAX } from '../data/pricing';
import { useLocale } from '../i18n/useLocale';
import { localeHref } from '../i18n/locale';
import { isPrerender } from '../utils/prerender';
import '../styles/Home.css';

const HOME_HREFLANG = [
  { hreflang: 'en', href: 'https://www.pt7.nl/' },
  { hreflang: 'nl', href: 'https://www.pt7.nl/nl/' },
  { hreflang: 'x-default', href: 'https://www.pt7.nl/' },
];

const LANE_KEYS = [
  'reformer',
  'barbell',
  'yoga',
  'mat',
  'trx',
  'bump',
  'private',
] as const;

const COACH_ORDER = [
  'elif',
  'goknur',
  'gokben',
  'gulce',
  'lal',
  'nisan',
  'kelly',
  'gamze',
] as const;

const REVIEW_KEYS = [
  'fatih',
  'irmina',
  'gizem',
  'flaminia',
  'lot',
  'maya',
  'ayse',
] as const;

const firstName = (name: string) => name.split(' ')[0] ?? name;

export const Home = () => {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const [activeLane, setActiveLane] = useState(0);
  const introHref = locale === 'nl' ? '/intro/nl/' : '/intro/';
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';
  const scheduleHref = locale === 'nl' ? '/schedule/nl/' : '/schedule/';

  useEffect(() => {
    if (isPrerender()) return;
    trackPageView('/', t('seo.analyticsTitle'));
    trackFBPageView();
    void ensureHealcodeLoaded().catch(() => {});
  }, [t]);

  const laneKey = LANE_KEYS[activeLane];
  const laneAccent = t(`lanes.items.${laneKey}.accent`);
  const coaches = COACH_ORDER.map((slug) => {
    const profile = trainerProfiles.find((p) => p.slug === slug);
    return {
      slug,
      name: profile ? firstName(profile.displayName) : slug,
      image: profile?.image ?? '',
      alt: profile?.displayName ?? slug,
    };
  });

  return (
    <div className="home home--c">
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={locale === 'nl' ? 'https://www.pt7.nl/nl/' : 'https://www.pt7.nl/'}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        hreflang={HOME_HREFLANG}
      />
      <StructuredData type="LocalBusiness" />
      <StructuredData type="WebSite" />

      <header id="start" className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="home-mono home-mono--gold">{t('hero.eyebrow')}</p>
            <h1 className="home-display">
              <span className="nw">{t('hero.titleLine1')}</span>
              <br />
              <span className="nw">
                <em>{t('hero.titleAccent')}</em>
              </span>
            </h1>
            <p className="home-hero-lead">{t('hero.lead')}</p>
            <div className="home-hero-ctas">
              <a href="#lanes" className="btn-gold">
                {t('hero.ctaPrimary')}
              </a>
              <a href="#ticket" className="btn-ghost">
                {t('hero.ctaSecondary')}
              </a>
            </div>
          </div>
          <div className="home-hero-art" aria-hidden="true">
            <svg viewBox="200 60 700 700" preserveAspectRatio="xMaxYMax meet">
              <path
                d="M216 760A684 684 0 0 1 900 76L900 138A622 622 0 0 0 278 760Z"
                fill="#ffd700"
              />
              <g fill="none" stroke="#3d3a36" strokeWidth="2">
                <path d="M650 760A250 250 0 0 1 900 510" />
                <path d="M588 760A312 312 0 0 1 900 448" />
                <path d="M526 760A374 374 0 0 1 900 386" />
                <path d="M464 760A436 436 0 0 1 900 324" />
                <path d="M402 760A498 498 0 0 1 900 262" />
                <path d="M340 760A560 560 0 0 1 900 200" />
                <path d="M278 760A622 622 0 0 1 900 138" />
              </g>
              <g
                fontFamily="'Barlow Condensed', sans-serif"
                fontWeight="900"
                fontSize="34"
                textAnchor="middle"
                fill="#5e5a54"
              >
                <text x="679" y="599">
                  1
                </text>
                <text x="630" y="561">
                  2
                </text>
                <text x="581" y="523">
                  3
                </text>
                <text x="532" y="484">
                  4
                </text>
                <text x="483" y="446">
                  5
                </text>
                <text x="434" y="408">
                  6
                </text>
                <text x="385" y="370" fill="#1c1a18">
                  7
                </text>
              </g>
              <line x1="216" y1="742" x2="650" y2="742" stroke="#f5f0e6" strokeWidth="6" />
              <rect x="752" y="566" width="76" height="194" fill="#f5f0e6" />
              <g transform="translate(730 394) scale(1.2)">
                <path
                  d="M36 122C30 84 50 46 72 0C66 42 80 80 72 122Z"
                  fill="#ffd700"
                  stroke="#1c1a18"
                  strokeWidth="6"
                  paintOrder="stroke"
                />
                <path
                  d="M18 122C12 98 22 72 38 44C38 76 50 100 48 122Z"
                  fill="#ff5a2e"
                  stroke="#1c1a18"
                  strokeWidth="6"
                  paintOrder="stroke"
                />
                <path
                  d="M60 122C58 102 72 88 90 60C92 90 88 108 82 122Z"
                  fill="#ff5a2e"
                  stroke="#1c1a18"
                  strokeWidth="6"
                  paintOrder="stroke"
                />
                <polygon points="8,126 96,126 84,142 20,142" fill="#f5f0e6" />
              </g>
            </svg>
          </div>
        </div>
      </header>

      <section className="home-board" aria-label={t('scoreboard.aria')}>
        <div className="home-board-grid">
          <div className="home-board-cell">
            <span className="home-board-v">7</span>
            <span className="home-board-l">{t('scoreboard.lanes')}</span>
          </div>
          <div className="home-board-cell">
            <span className="home-board-v">≤{GROUP_MAX}</span>
            <span className="home-board-l">{t('scoreboard.perClass')}</span>
          </div>
          <div className="home-board-cell">
            <span className="home-board-v">45</span>
            <span className="home-board-l">{t('scoreboard.minutes')}</span>
          </div>
          <div className="home-board-cell">
            <span className="home-board-v">1</span>
            <span className="home-board-l">{t('scoreboard.coach')}</span>
          </div>
        </div>
      </section>

      <section id="lanes" className="home-lanes">
        <div className="home-lanes-head">
          <h2 className="home-section-title">
            <span className="nw">{t('lanes.titleLine1')}</span>
            <br />
            <span className="nw">
              {t('lanes.titleMid')} <em>{t('lanes.titleAccent')}</em>
            </span>
          </h2>
          <p className="home-muted">{t('lanes.lead')}</p>
        </div>
        <div className="home-lanes-grid">
          <div className="home-lane-list" role="tablist" aria-label={t('lanes.titleLine1')}>
            {LANE_KEYS.map((key, i) => {
              const selected = i === activeLane;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={selected ? 'is-selected' : undefined}
                  onClick={() => setActiveLane(i)}
                >
                  <span className="lane-n">{i + 1}</span>
                  <span className="lane-name">{t(`lanes.items.${key}.name`)}</span>
                  <span className={`lane-tag lane-tag--${t(`lanes.items.${key}.accent`)}`}>
                    {t(`lanes.items.${key}.tag`)}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            className={`home-lane-panel accent-${laneAccent}`}
            role="tabpanel"
            id="lane-panel"
          >
            <span className="lane-big" aria-hidden="true">
              {activeLane + 1}
            </span>
            <div className="home-lane-panel-body">
              <span className="home-mono home-lane-eyebrow">
                {t(`lanes.items.${laneKey}.eyebrow`)}
              </span>
              <h3>{t(`lanes.items.${laneKey}.name`)}</h3>
              <p>{t(`lanes.items.${laneKey}.body`)}</p>
            </div>
            <div className="home-lane-panel-foot">
              <dl>
                <div>
                  <dt>{t('lanes.format')}</dt>
                  <dd>{t(`lanes.items.${laneKey}.format`)}</dd>
                </div>
                <div>
                  <dt>{t('lanes.kit')}</dt>
                  <dd>{t(`lanes.items.${laneKey}.kit`)}</dd>
                </div>
              </dl>
              <a href="#ticket" className="lane-cta">
                {t('lanes.start', { n: activeLane + 1 })}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="coaches" className="home-coaches">
        <div className="home-coaches-inner">
          <div className="home-coaches-head">
            <h2 className="home-section-title">
              <span className="nw">{t('coaches.titleLine1')}</span>
              <br />
              <span className="nw">
                <em>{t('coaches.titleAccent')}</em>
              </span>
            </h2>
            <p>{t('coaches.lead')}</p>
          </div>
          <div className="home-coaches-grid">
            {coaches.map((c) => (
              <article key={c.slug} className="home-coach-card">
                <div className="home-coach-photo">
                  {c.image ? (
                    <img src={c.image} alt={c.alt} width={480} height={600} loading="lazy" />
                  ) : null}
                </div>
                <div className="home-coach-copy">
                  <span className="home-coach-stripe" aria-hidden="true" />
                  <span className="home-mono">{t(`coaches.eyebrows.${c.slug}`)}</span>
                  <strong>{c.name}</strong>
                  <span className="home-coach-role">{t(`coaches.roles.${c.slug}`)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ticket" className="home-ticket">
        <div className="home-ticket-copy">
          <h2 className="home-section-title">
            <span className="nw">{t('ticket.titleLine1')}</span>
            <br />
            <span className="nw">
              <em>{t('ticket.titleAccent')}</em>
            </span>
          </h2>
          <p className="home-muted">{t('ticket.lead')}</p>
        </div>
        <div className="ticket">
          <div className="ticket-main">
            <div className="ticket-meta">
              <span>{t('ticket.admit')}</span>
              <span>{t('ticket.place')}</span>
            </div>
            <div>
              <div className="ticket-big">{t('ticket.big')}</div>
              <div className="ticket-sub">{t('ticket.sub')}</div>
            </div>
          </div>
          <div className="ticket-perf" aria-hidden="true" />
          <div className="ticket-stub">
            <span className="home-mono">{t('ticket.stubLabel')}</span>
            <span className="ticket-price">€50</span>
            <div className="ticket-cta">
              <StableHealcodeSlot
                className="ticket-healcode"
                html={`<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100066" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="${t('ticket.cta')}"></healcode-widget>`}
              />
              <Link
                to={introHref}
                className="ticket-fallback"
                onClick={() => trackFBBookingClick()}
              >
                {t('ticket.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="academy" className="home-academy">
        <div className="acad-stripes" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="acad-inner">
          <div className="acad-copy">
            <img
              src="/brand/logos/pt7-academy-on-dark.svg"
              alt="PT7 Academy"
              width={160}
              height={48}
              className="acad-logo"
            />
            <p className="home-mono">{t('academy.approved')}</p>
            <h2 className="home-section-title">
              <span className="nw">{t('academy.titleLine1')}</span>
              <br />
              <span className="nw">{t('academy.titleLine2')}</span>
            </h2>
            <p>{t('academy.body')}</p>
          </div>
          <div className="acad-card">
            <span className="home-mono acad-next">{t('academy.next')}</span>
            <div className="acad-date">{t('academy.date')}</div>
            <div className="acad-seats">{t('academy.seats')}</div>
            <Link to={academyHref} className="btn-ink">
              {t('academy.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="home-results" aria-labelledby="results-heading">
        <div className="home-results-head">
          <h2 id="results-heading" className="home-section-title">
            {t('results.title')}
          </h2>
          <p className="home-mono home-results-ratings">{t('results.ratings')}</p>
        </div>
        <div className="home-results-list">
          {REVIEW_KEYS.map((key, i) => (
            <div key={key} className="home-results-row">
              <span className="home-mono home-results-n">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="home-results-quote">{t(`results.items.${key}.quote`)}</span>
              <span className="home-results-by">{t(`results.items.${key}.by`)}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="venue" className="home-venue">
        <div className="home-venue-copy">
          <h2 className="home-section-title">
            <span className="nw">{t('venue.titleLine1')}</span>
            <br />
            <span className="nw">
              {t('venue.titleLine2')} <em>{t('venue.titleAccent')}</em>
            </span>
            <br />
            <span className="nw">{t('venue.titleLine3')}</span>
          </h2>
          <p className="home-muted">{t('venue.body')}</p>
          <address className="home-venue-address">
            {t('venue.address')}
            <br />
            {t('venue.city')}
            <br />
            {t('venue.transit')}
          </address>
          <p className="home-venue-links">
            <Link to={scheduleHref}>Book</Link>
            {' · '}
            <Link to={localeHref('/pricing/', locale)}>Prices</Link>
          </p>
        </div>
        <div className="home-venue-map">
          <svg viewBox="0 -30 560 390" role="img" aria-label={t('venue.mapAria')}>
            <rect
              x="20"
              y="40"
              width="520"
              height="280"
              rx="140"
              fill="none"
              stroke="#c9b9a0"
              strokeWidth="28"
            />
            <rect x="60" y="80" width="440" height="200" rx="100" fill="#dcd2c0" />
            <rect x="250" y="8" width="22" height="40" fill="#0b0b0b" />
            <polygon points="242,0 280,0 276,8 246,8" fill="#0b0b0b" />
            <path d="M255 0C254 -8 260 -14 264 -22C264 -14 270 -8 268 0Z" fill="#ff5a2e" />
            <circle cx="62" cy="82" r="12" fill="#0b0b0b" />
            <circle cx="62" cy="82" r="5" fill="#ffd700" />
            <line x1="62" y1="82" x2="120" y2="150" stroke="#0b0b0b" strokeWidth="2" />
            <text
              x="261"
              y="68"
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="500"
              fontSize="11"
              fill="#5c574f"
            >
              MARATHON TOWER
            </text>
            <text
              x="128"
              y="160"
              fontFamily="'Barlow Condensed', sans-serif"
              fontWeight="900"
              fontSize="30"
              fill="#0b0b0b"
            >
              PT7 — UNIT 15
            </text>
            <text
              x="128"
              y="184"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="500"
              fontSize="12"
              fill="#5c574f"
            >
              UPPER-LEFT CORNER
            </text>
          </svg>
        </div>
      </section>
    </div>
  );
};
