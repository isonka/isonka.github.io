import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { TrackArt } from '../components/brand/TrackArt';
import { StadiumMap } from '../components/brand/StadiumMap';
import { Pt7Logo } from '../components/brand/Pt7Logo';
import { trackPageView } from '../utils/gtmTracking';
import { trackFBPageView, trackFBBookingClick } from '../utils/fbPixelTracking';
import { homePath, localeHref } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import {
  DISCIPLINE_COLOR,
  LANE_KEYS,
  LANE_META,
  type LaneKey,
} from '../data/lanes';
import { PHOTO_FOCUS } from '../data/photoFocus';
import '../styles/Home.css';

const HOME_HREFLANG = [
  { hreflang: 'en', href: 'https://www.pt7.nl/' },
  { hreflang: 'nl', href: 'https://www.pt7.nl/nl/' },
  { hreflang: 'x-default', href: 'https://www.pt7.nl/' },
];

const FAQ_KEYS = ['where', 'groupSize', 'booking', 'training', 'location'] as const;

const FACT_KEYS = ['ways', 'size', 'minutes', 'coach'] as const;

const COACHES = [
  { id: 'elif', to: '/trainer/elif/', src: '/assets/images/elif.webp', shortName: 'Elif', n: '01', tag: 'pilatesStrength' as const },
  { id: 'goknur', to: '/trainer/goknur/', src: '/assets/images/goknur.webp', shortName: 'Göknur', n: '02', tag: 'pilatesStrength' as const },
  { id: 'gokben', to: '/trainer/gokben/', src: '/assets/images/gokben.webp', shortName: 'Gökben', n: '03', tag: 'pilates' as const },
  { id: 'gulce', to: '/trainer/gulce/', src: '/assets/images/gulce.webp', shortName: 'Gülce', n: '04', tag: 'pilates' as const },
  { id: 'lal', to: '/trainer/lal/', src: '/assets/images/lal.webp', shortName: 'Lal', n: '05', tag: 'pilates' as const },
  { id: 'nisan', to: '/trainer/nisan/', src: '/assets/images/nisan.webp', shortName: 'Nisan', n: '06', tag: 'pilates' as const },
  { id: 'kelly', to: '/trainer/kelly/', src: '/assets/images/kelly.webp', shortName: 'Kelly', n: '07', tag: 'pilates' as const },
  { id: 'gamze', to: '/trainer/gamze/', src: '/assets/images/gamze.webp', shortName: 'Gamze', n: '08', tag: 'pilates' as const },
] as const;

const REVIEW_KEYS = ['lot', 'flaminia', 'yesim'] as const;

const reviewsData = [
  {
    author: 'Lot',
    reviewBody: 'Elif trained me until 38.5 weeks. A comfortable pregnancy and a smooth delivery.',
    ratingValue: 5,
  },
  {
    author: 'Flaminia',
    reviewBody:
      'Professional, thoughtful — exactly the Reformer studio I spent two years looking for.',
    ratingValue: 5,
  },
  {
    author: 'Yeşim',
    reviewBody: 'Six months in. Incredible results and a motivating atmosphere.',
    ratingValue: 5,
  },
];

export const Home = () => {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const [lane, setLane] = useState<LaneKey>('reformer');
  const canonical = locale === 'nl' ? 'https://www.pt7.nl/nl/' : 'https://www.pt7.nl/';
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';
  const scheduleHref = locale === 'nl' ? '/schedule/nl/' : '/schedule/';
  const introHref = locale === 'nl' ? '/intro/nl/' : '/intro/';

  const homeFaqs = FAQ_KEYS.map((key) => ({
    question: t(`faqs.${key}.question`),
    answer: t(`faqs.${key}.answer`),
  }));

  const selected = LANE_META[lane];
  const stripeColor = DISCIPLINE_COLOR[selected.discipline];
  const laneTimesHref = localeHref(selected.href, locale);

  useEffect(() => {
    const path = homePath(locale);
    trackPageView(path, t('seo.analyticsTitle'));
    trackFBPageView(t('seo.analyticsTitle'));
  }, [locale, t]);

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        ogImage="/assets/images/og-share.webp"
        ogLocale={locale === 'nl' ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={locale === 'nl' ? ['en_US'] : ['nl_NL']}
        htmlLang={locale === 'nl' ? 'nl' : 'en'}
        hreflangAlternates={HOME_HREFLANG}
      />
      <StructuredData type="LocalBusiness" data={{ reviews: reviewsData }} />
      <StructuredData type="FAQPage" data={{ faqs: homeFaqs }} />

      <header id="top" className="home-hero">
        <div className="home-hero-copy">
          <p className="home-eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="home-display">
            {t('hero.titleBefore')}{' '}
            <span className="home-accent">{t('hero.titleAccent')}</span>
          </h1>
          <p className="home-lead">{t('hero.lead')}</p>
          <div className="home-hero-actions">
            <Link
              to={introHref}
              className="home-btn home-btn-primary"
              onClick={() => trackFBBookingClick()}
            >
              {t('hero.bookFirst')}
            </Link>
            <a href="#train" className="home-btn home-btn-outline">
              {t('hero.explore')}
            </a>
          </div>
        </div>
        <div className="home-hero-art" aria-hidden="true">
          <TrackArt className="home-track-art" />
        </div>
      </header>

      <section className="home-facts" aria-label={t('facts.aria')}>
        <div className="home-facts-inner">
          {FACT_KEYS.map((key) => (
            <div key={key} className="home-fact">
              <span className="home-fact-value">{t(`facts.items.${key}.value`)}</span>
              <span className="home-fact-label">{t(`facts.items.${key}.label`)}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="train" className="home-section">
        <div className="home-section-head">
          <h2 className="home-heading">
            {t('lanes.titleBefore')}{' '}
            <span className="home-accent">{t('lanes.titleAccent')}</span>
          </h2>
          <p className="home-section-sub">{t('lanes.sub')}</p>
        </div>
        <div className="home-lanes">
          <div className="home-lane-list" role="tablist" aria-label={t('lanes.titleBefore')}>
            {LANE_KEYS.map((key) => {
              const meta = LANE_META[key];
              const on = key === lane;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  className={`home-lane-tab${on ? ' is-on' : ''}`}
                  onClick={() => setLane(key)}
                >
                  <span className="home-lane-n">{meta.n}</span>
                  <span className="home-lane-name">{t(`lanes.items.${key}.name`)}</span>
                  <span className="home-lane-tag">{t(`lanes.items.${key}.tag`)}</span>
                </button>
              );
            })}
          </div>
          <div className="home-lane-panel" role="tabpanel">
            <span
              className="stripe-7"
              aria-hidden="true"
              style={{ background: stripeColor }}
            />
            <div>
              <span className="home-lane-meta">
                {t('lanes.laneLabel', { n: selected.n })} · {t(`lanes.items.${lane}.tag`)}
              </span>
              <h3 className="home-lane-title">{t(`lanes.items.${lane}.name`)}</h3>
              <p className="home-lane-pitch">{t(`lanes.items.${lane}.pitch`)}</p>
            </div>
            <div className="home-lane-foot">
              <dl className="home-lane-dl">
                <div>
                  <dt>{t('lanes.formatLabel')}</dt>
                  <dd>{t(`lanes.items.${lane}.format`)}</dd>
                </div>
                <div>
                  <dt>{t('lanes.kitLabel')}</dt>
                  <dd>{t(`lanes.items.${lane}.kit`)}</dd>
                </div>
              </dl>
              <Link to={laneTimesHref} className="home-btn home-btn-outline">
                {t('lanes.seeTimes')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="coaches" className="home-coaches">
        <div className="home-section">
          <div className="home-section-head">
            <h2 className="home-heading home-coaches-title">
              {t('coaches.titleBefore')}{' '}
              <span className="home-accent">{t('coaches.titleAccent')}</span>
            </h2>
            <p className="home-section-sub home-coaches-sub">{t('coaches.sub')}</p>
          </div>
          <div className="home-coach-grid">
            {COACHES.map((coach) => {
              const focus = PHOTO_FOCUS[coach.id] ?? '50% 24%';
              return (
                <Link key={coach.id} to={coach.to} className="home-coach">
                  <div className="home-coach-media">
                    <span className="home-coach-seven" aria-hidden="true" />
                    <div className="home-coach-photo">
                      <img
                        src={coach.src}
                        alt={t(`coaches.alt.${coach.id}`)}
                        loading="lazy"
                        decoding="async"
                        width={280}
                        height={350}
                        style={{ objectPosition: focus }}
                      />
                    </div>
                    <span className="home-coach-num" aria-hidden="true">
                      {coach.n}
                    </span>
                  </div>
                  <div className="home-coach-meta">
                    <span className="home-coach-tag">{t(`coaches.tags.${coach.tag}`)}</span>
                    <strong className="home-coach-name">{coach.shortName}</strong>
                    <span className="home-coach-role">{t(`coaches.roles.${coach.id}`)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="first" className="home-section home-offer">
        <div className="home-offer-copy">
          <h2 className="home-heading">
            {t('offer.titleBefore')}{' '}
            <span className="home-accent">{t('offer.titleAccent')}</span>
          </h2>
          <p className="home-section-sub">{t('offer.lead')}</p>
        </div>
        <div className="home-offer-card">
          <div className="home-offer-main">
            <div className="home-eyebrow">{t('offer.label')}</div>
            <div className="home-offer-product">{t('offer.product')}</div>
            <div className="home-offer-detail">{t('offer.detail')}</div>
          </div>
          <div className="home-offer-stub">
            <span className="home-offer-price">{t('offer.price')}</span>
            <Link
              to={introHref}
              className="home-btn home-btn-primary"
              onClick={() => trackFBBookingClick()}
            >
              {t('offer.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section id="academy" className="home-academy" data-theme="evening">
        <div className="home-section home-academy-inner">
          <div className="home-academy-copy">
            <Pt7Logo variant="academy" width={120} height={98} title="PT7 Academy" />
            <h2 className="home-heading">
              {t('academy.titleBefore')}{' '}
              <span className="home-accent">{t('academy.titleAccent')}</span>
            </h2>
            <p className="home-section-sub">{t('academy.lead')}</p>
          </div>
          <div className="home-academy-aside">
            <div className="home-academy-box">
              <div className="home-academy-label">{t('academy.nextLabel')}</div>
              <div className="home-academy-date">{t('academy.nextDate')}</div>
              <div className="home-academy-seats">{t('academy.seats')}</div>
            </div>
            <Link to={academyHref} className="home-btn home-btn-primary">
              {t('academy.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section id="reviews" className="home-section">
        <div className="home-section-head home-section-head-baseline">
          <h2 className="home-heading">
            {t('reviews.titleBefore')}{' '}
            <span className="home-accent">{t('reviews.titleAccent')}</span>
          </h2>
          <span className="home-ratings-line">{t('reviews.ratings')}</span>
        </div>
        <div className="home-review-grid">
          {REVIEW_KEYS.map((key) => (
            <figure key={key} className="home-review">
              <blockquote>“{t(`reviews.items.${key}.quote`)}”</blockquote>
              <figcaption>
                <strong>{t(`reviews.items.${key}.name`)}</strong>
                {' · '}
                {t(`reviews.items.${key}.source`)}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="visit" className="home-visit">
        <div className="home-section home-visit-inner">
          <div className="home-visit-copy">
            <p className="home-eyebrow">{t('visit.eyebrow')}</p>
            <h2 className="home-heading">
              {t('visit.titleBefore')}{' '}
              <span className="home-accent">{t('visit.titleAccent')}</span>{' '}
              {t('visit.titleAfter')}
            </h2>
            <p className="home-visit-story">{t('visit.story')}</p>
            <p className="home-visit-address">
              {t('visit.address')}
              <br />
              {t('visit.transit')}
            </p>
          </div>
          <StadiumMap ariaLabel={t('visit.mapAria')} />
        </div>
      </section>
    </>
  );
};
