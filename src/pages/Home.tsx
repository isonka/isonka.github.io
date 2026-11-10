import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { AcademyUrgencyBanner } from '../components/AcademyUrgencyBanner';
import { OpeningOfferHomeBanner } from '../components/OpeningOfferHomeBanner';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { trackPageView, trackPhoneClick, trackEmailClick, trackSocialClick } from '../utils/gtmTracking';
import { trackFBPageView, trackFBPhoneClick, trackFBEmailClick, trackFBWhatsAppClick, trackFBBookingClick } from '../utils/fbPixelTracking';
import { workouts } from '../data/workouts';
import { WorkoutGallery } from '../components/WorkoutCard';
import { ManifestoLine } from '../components/ManifestoLine';
import { ContactMap } from '../components/ContactMap';
import { PHOTO_FOCUS } from '../data/photoFocus';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { SilkBackground } from '../components/SilkBackground';
import { BLACK_FRIDAY_BONUS, isBlackFridayHero } from '../data/blackFriday';
import { GROUP } from '../data/pricing';
import { homePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import { isPrerender } from '../utils/prerender';
import '../styles/Home.css';
import { localeHref } from '../i18n/locale';
import { MediumTail } from '../components/MediumTail';
import { laneFromText } from '../lib/lanes';

const HOME_HREFLANG = [
  { hreflang: 'en', href: 'https://www.pt7.nl/' },
  { hreflang: 'nl', href: 'https://www.pt7.nl/nl/' },
  { hreflang: 'x-default', href: 'https://www.pt7.nl/' },
];

const FAQ_KEYS = ['where', 'groupSize', 'booking', 'training', 'location'] as const;

const BF_GROUP_PACKS = [
  { pack: 5, total: GROUP.pack5.total, was: GROUP.pack5.perClass, popular: false },
  { pack: 10, total: GROUP.pack10.total, was: GROUP.pack10.perClass, popular: true },
  { pack: 20, total: GROUP.pack20.total, was: GROUP.pack20.perClass, popular: false },
] as const;

function formatOfferEur(n: number, locale: 'en' | 'nl'): string {
  const formatted = new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
  return formatted.replace(/[\s\u00a0]/g, '');
}

function offerPerClass(total: number, classes: number): number {
  return Math.round((total / classes) * 100) / 100;
}

const WORKOUT_COPY = {
  'reformer-pilates': 'reformerPilates',
  'reformer-pilates-amsterdam': 'reformerPilates',
  trx: 'trx',
  'trx-training-amsterdam': 'trx',
  'functional-training': 'functionalTraining',
  cardio: 'cardio',
} as const;

const heroImages = [
  {
    src: '/assets/images/studio-800.webp',
    srcSet:
      '/assets/images/studio-800.webp 800w, /assets/images/studio-1200.webp 1200w, /assets/images/studio.webp 1600w',
    width: 1600,
    height: 1066,
    altKey: 'heroImages.studio' as const,
  },
  {
    src: '/assets/images/nike_strength_studio.webp',
    srcSet:
      '/assets/images/nike_strength_studio-800.webp 800w, /assets/images/nike_strength_studio.webp 1200w',
    width: 1200,
    height: 800,
    altKey: 'heroImages.nike' as const,
  },
];

const trainers = [
  { id: 'elif', to: '/trainer/elif/', src: '/assets/images/elif.webp', name: 'Elif Arzu Ogan' },
  { id: 'goknur', to: '/trainer/goknur/', src: '/assets/images/goknur.webp', name: 'Göknur Dipli' },
  { id: 'gokben', to: '/trainer/gokben/', src: '/assets/images/gokben.webp', name: 'Gökben Öztekin' },
  { id: 'gulce', to: '/trainer/gulce/', src: '/assets/images/gulce.webp', name: 'Gülce Koç' },
  { id: 'lal', to: '/trainer/lal/', src: '/assets/images/lal.webp', name: 'Lal Avgen' },
  { id: 'nisan', to: '/trainer/nisan/', src: '/assets/images/nisan.webp', name: 'Nisan Atalay' },
  { id: 'kelly', to: '/trainer/kelly/', src: '/assets/images/kelly.webp', name: 'Kelly Tin' },
  { id: 'gamze', to: '/trainer/gamze/', src: '/assets/images/gamze.webp', name: 'E. Gamze Karadağ' },
] as const;

const REVIEW_KEYS = ['mara', 'lot', 'flaminia', 'maya', 'yesim', 'ayse'] as const;

const reviewsData = [
  { author: 'Lot Canter Cremers', reviewBody: 'Through a neighbor in my building I was introduced to PT7...', ratingValue: 5 },
  { author: 'Ayşe', reviewBody: "I've been training at PT7 for a while now...", ratingValue: 5 },
  { author: 'Maya', reviewBody: "This is a truly special Pilates Reformer studio...", ratingValue: 5 },
  { author: 'Flaminia', reviewBody: "PT7 and Elif are exactly what I was looking for...", ratingValue: 5 },
];

function TrainerTile({
  trainer,
}: {
  trainer: (typeof trainers)[number];
}) {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const { ref, inView } = useInViewOnce<HTMLAnchorElement>();
  const slug = trainer.to.replace(/^\/trainer\//, '').replace(/\/$/, '');
  const focus = PHOTO_FOCUS[slug] ?? '50% 24%';
  const specialties = t(`trainers.${trainer.id}.specialties`);

  return (
    <Link
      ref={ref}
      to={localeHref(trainer.to, locale)}
      className={`home-person${inView ? ' is-inview' : ''}`}
    >
      <div className="home-person-media">
        <img
          src={inView ? trainer.src : undefined}
          alt={t(`trainers.${trainer.id}.alt`)}
          loading="lazy"
          decoding="async"
          width="280"
          height="350"
          style={{ objectPosition: focus }}
        />
      </div>
      <span className="home-person-name">
        <span className={`lane-stripe lane-stripe-sm lane-${laneFromText(specialties)}`} aria-hidden="true" />
        <span className="home-person-copy">
          <span className="home-person-title">{trainer.name}</span>
          <span className="home-person-role">{specialties}</span>
        </span>
      </span>
    </Link>
  );
}

export const Home= () => {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const campaignHero = isBlackFridayHero();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [secondHeroReady, setSecondHeroReady] = useState(false);
  const aboutImage = useInViewOnce<HTMLDivElement>();
  const canonical = locale === 'nl' ? 'https://www.pt7.nl/nl/' : 'https://www.pt7.nl/';
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';
  const pricingHref = locale === 'nl' ? '/pricing/nl/' : '/pricing/';
  const scheduleHref = locale === 'nl' ? '/schedule/nl/' : '/schedule/';

  const homeFaqs = FAQ_KEYS.map((key) => ({
    question: t(`faqs.${key}.question`),
    answer: t(`faqs.${key}.answer`),
  }));

  const workoutItems = workouts.map((w) => {
    const slug = w.to.replace(/^\/workouts\//, '').replace(/\/$/, '').replace(/^\//, '');
    const copyKey = WORKOUT_COPY[slug as keyof typeof WORKOUT_COPY];
    if (!copyKey) return w;
    return {
      ...w,
      to: localeHref(w.to, locale),
      title: t(`workouts.${copyKey}.title`),
      description: t(`workouts.${copyKey}.description`),
      alt: t(`workouts.${copyKey}.alt`),
    };
  });

  useEffect(() => {
    const path = homePath(locale);
    trackPageView(path, t('seo.analyticsTitle'));
    trackFBPageView(t('seo.analyticsTitle'));
  }, [locale, t]);

  useEffect(() => {
    if (campaignHero || isPrerender()) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const enable = () => setSecondHeroReady(true);
    const events = ['pointerdown', 'keydown'] as const;
    events.forEach((event) =>
      window.addEventListener(event, enable, { once: true, passive: true }),
    );
    return () => {
      events.forEach((event) => window.removeEventListener(event, enable));
    };
  }, [campaignHero]);

  useEffect(() => {
    if (!secondHeroReady) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [secondHeroReady]);

  return (
    <>
      <SilkBackground />
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

      <OpeningOfferHomeBanner />
      <AcademyUrgencyBanner />

      {campaignHero ? (
        <section className="home-hero home-hero--bf">
          <div className="home-hero-inner">
            <div className="bf-hero">
              <div className="bf-hero-copy">
                <p className="home-hero-campaign">
                  {t('hero.campaign')}
                  <span aria-hidden="true"> · </span>
                  {t('hero.dates')}
                </p>
                <h1 className="home-hero-title">
                  <span className="bf-hero-lead">{t('hero.offerLead')}</span>
                  <span className="bf-hero-gold">{t('hero.offerPrice')}</span>
                </h1>
                <p className="home-hero-line">{t('hero.line')}</p>
                <div className="home-hero-actions">
                  <Link to={pricingHref} className="home-btn home-btn-gold">
                    {t('hero.seePacks')}
                  </Link>
                  <Link to={scheduleHref} className="home-btn home-btn-ghost" onClick={() => trackFBBookingClick()}>
                    {t('hero.book')}
                  </Link>
                </div>
              </div>
              <ul className="bf-offers">
                {BF_GROUP_PACKS.map((item) => {
                  const free = BLACK_FRIDAY_BONUS[item.pack];
                  const classes = item.pack + free;
                  return (
                    <li key={item.pack}>
                      <div>
                        <p className="bf-offer-name">
                          {t('hero.classes', { count: item.pack })}
                          <span className="bf-offer-free">{t('hero.free', { count: free })}</span>
                        </p>
                        <p className="bf-offer-detail">
                          {t('hero.youGet', {
                            count: classes,
                            price: formatOfferEur(item.total, locale),
                          })}
                          {item.popular ? (
                            <span className="bf-offer-popular">{` · ${t('hero.popular')}`}</span>
                          ) : null}
                        </p>
                      </div>
                      <p className="bf-offer-rate">
                        <span className="bf-offer-now">
                          {formatOfferEur(offerPerClass(item.total, classes), locale)}
                        </span>
                        <span className="bf-offer-was">
                          {t('hero.aClass')}
                          {' · '}
                          <s>{formatOfferEur(item.was, locale)}</s>
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
              <p className="bf-hero-note">{t('hero.ends')}</p>
            </div>
          </div>
        </section>
      ) : (
        <section className={`home-hero${secondHeroReady ? ' home-hero--can-fade' : ''}`}>
          {heroImages.map((image, index) => {
            if (index > 0 && !secondHeroReady) return null;
            const isActive = index === currentImageIndex;
            return (
              <img
                key={image.src}
                src={image.src}
                srcSet={image.srcSet}
                sizes="100vw"
                alt={t(image.altKey)}
                className={`home-hero-bg${isActive ? ' is-active' : ''}`}
                width={image.width}
                height={image.height}
                fetchPriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={index === 0 ? { opacity: 1 } : undefined}
              />
            );
          })}
          <div className="home-hero-veil" />
          <div className="home-hero-inner">
            <p className="home-hero-brand brand-mark">
              PT<span className="brand-mark-accent">7</span>
            </p>
            <h1 className="home-hero-title"><MediumTail text={t('hero.title')} /></h1>
            <p className="home-hero-line">{t('hero.studioLine')}</p>
            <div className="home-hero-ratings">
              <a href="https://maps.app.goo.gl/wrhyzYbov9eiGQJw5" target="_blank" rel="noopener noreferrer">
                {t('reviews.google')}
              </a>
              <a href="https://classpass.com/studios/pt7-amsterdam" target="_blank" rel="noopener noreferrer">
                {t('reviews.classpass')}
              </a>
            </div>
            <div className="home-hero-actions">
              <Link to={scheduleHref} className="home-btn home-btn-gold" onClick={() => trackFBBookingClick()}>
                {t('hero.bookClass')}
              </Link>
              <Link to={localeHref('/reformer-pilates-amsterdam/', locale)} className="home-btn home-btn-ghost">
                {t('hero.pilatesClasses')}
              </Link>
              <Link to={pricingHref} className="home-btn home-btn-ghost">
                {t('hero.viewPricing')}
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="workouts" className="home-section home-works">
        <div className="home-works-label">
          <div className="home-head">
            <h2 className="home-kicker home-kicker-heading">
              <MediumTail text={t('workouts.heading')} />
            </h2>
            <p className="home-lane-legend">
              {t('workouts.lanePilates')}
              <span className="lane-stripe lane-stripe-sm lane-pilates" aria-hidden="true" />
              <span aria-hidden="true">·</span>
              {t('workouts.laneStrength')}
              <span className="lane-stripe lane-stripe-sm lane-strength" aria-hidden="true" />
            </p>
          </div>
          <p className="home-sub">{t('workouts.sub')}</p>
        </div>
        <WorkoutGallery items={workoutItems} />
      </section>

      <section id="about" className="home-section home-manifesto">
        <p className="home-kicker">{t('about.kicker')}</p>
        <h2 className="home-display">
          <ManifestoLine>
            <MediumTail text={t('about.title')} />
          </ManifestoLine>
        </h2>
        <div className="home-manifesto-layout">
          <div className="home-prose">
            <blockquote className="home-founder-note">
              <p>{t('about.note')}</p>
              <footer className="home-signature">
                <strong>{t('about.ownerName')}</strong>
                <span>{t('about.signatureRole')}</span>
              </footer>
            </blockquote>
            <ul className="home-about-facts">
              {(['years', 'group', 'private'] as const).map((key) => (
                <li key={key} className="home-about-fact">
                  <span className="home-about-fact-value">{t(`about.facts.${key}.value`)}</span>
                  <span className="home-about-fact-label">{t(`about.facts.${key}.label`)}</span>
                </li>
              ))}
            </ul>
            <p className="home-about-seo">{t('about.seoLine')}</p>
            <nav className="home-prose-links" aria-label={t('about.linksLabel')}>
              <span className="home-prose-links-label">{t('about.linksLabel')}</span>
              <Trans
                ns="home"
                i18nKey="about.links"
                components={{
                  reformer: <Link to={localeHref('/reformer-pilates-amsterdam/', locale)} />,
                  private: <Link to={localeHref('/private-pilates-amsterdam/', locale)} />,
                  prenatal: <Link to={localeHref('/prenatal-pilates-amsterdam/', locale)} />,
                  trx: <Link to={localeHref('/trx-training-amsterdam/', locale)} />,
                  strength: <Link to={localeHref('/strength-training-amsterdam/', locale)} />,
                }}
              />
            </nav>
          </div>
          <div className="home-bleed-frame" ref={aboutImage.ref}>
            <img
              src={aboutImage.inView ? '/assets/images/about-us-web.webp' : undefined}
              alt={t('about.imageAlt')}
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="trainers" className="home-section home-team">
        <p className="home-kicker">{t('trainers.kicker')}</p>
        <h2 className="home-section-title">
          <MediumTail text={t('trainers.title')} />
        </h2>
        <p className="home-sub">{t('trainers.sub')}</p>
        <div className="home-team-grid">
          {trainers.map((trainer) => (
            <TrainerTile key={trainer.to} trainer={trainer} />
          ))}
        </div>
        <p className="home-footnote">
          <Trans
            ns="home"
            i18nKey="trainers.footnote"
            components={{
              become: <Link to={academyHref} />,
              training: <Link to={academyHref} />,
            }}
          />
        </p>
      </section>

      <section id="reviews" className="home-section home-reviews">
        <p className="home-kicker">{t('reviews.kicker')}</p>
        <h2 className="home-section-title">
          <MediumTail text={t('reviews.title')} />
        </h2>
        <p className="home-sub">{t('reviews.sub')}</p>
        <div className="home-quotes">
          {REVIEW_KEYS.map((key) => (
            <blockquote key={key} className="home-quote">
              <p className="home-quote-pull">{t(`reviews.items.${key}.pull`)}</p>
              <details>
                <summary>{t('reviews.readMore')}</summary>
                <p className="home-quote-full">{t(`reviews.items.${key}.full`)}</p>
              </details>
              <cite>
                {t(`reviews.items.${key}.author`)}
                <span className="home-quote-meta">{t(`reviews.items.${key}.meta`)}</span>
              </cite>
            </blockquote>
          ))}
        </div>
        <p className="home-ratings">
          <a href="https://maps.app.goo.gl/wrhyzYbov9eiGQJw5" target="_blank" rel="noopener noreferrer">
            {t('reviews.google')}
          </a>
          <a href="https://classpass.com/studios/pt7-amsterdam" target="_blank" rel="noopener noreferrer">
            {t('reviews.classpass')}
          </a>
        </p>
      </section>

      <section id="faq" className="home-section home-faq" aria-labelledby="home-faq-heading">
        <p className="home-kicker">{t('faqSection.kicker')}</p>
        <h2 id="home-faq-heading" className="home-section-title">
          <MediumTail text={t('faqSection.title')} />
        </h2>
        <div className="home-faq-list">
          {homeFaqs.map((faq) => (
            <div key={faq.question} className="home-faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="home-contact">
        <div className="home-contact-inner">
          <p className="home-kicker home-kicker-on-dark">{t('contact.kicker')}</p>
          <h2 className="home-contact-title">
            <MediumTail text={t('contact.title')} />
          </h2>
          <p className="home-contact-address">{t('contact.address')}</p>
          <p className="home-contact-meta">{t('contact.meta')}</p>

          <div className="home-contact-grid">
            <ContactMap />
            <div className="home-contact-actions">
              <a href="tel:+31685162693" data-analytics="skip" className="home-btn home-btn-light" onClick={() => { trackPhoneClick(); trackFBPhoneClick(); }}>
                +31 685 162693
              </a>
              <a href="https://wa.me/31685162693" data-analytics="skip" target="_blank" rel="noopener noreferrer" className="home-btn home-btn-ghost" onClick={() => { trackSocialClick('whatsapp'); trackFBWhatsAppClick(); }}>
                WhatsApp
              </a>
              <a href="mailto:info@pt7.nl" data-analytics="skip" className="home-btn home-btn-ghost" onClick={() => { trackEmailClick(); trackFBEmailClick(); }}>
                {t('contact.emailUs')}
              </a>
              <div className="home-contact-socials">
                <a href="https://www.instagram.com/pt7amsterdam" target="_blank" rel="noopener noreferrer" aria-label={t('contact.instagram')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/ptstudio7" target="_blank" rel="noopener noreferrer" aria-label={t('contact.facebook')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 21v-8h3l.5-3H14V8.2c0-.8.4-1.2 1.3-1.2H18V4h-2.8C12.4 4 11 5.5 11 8v2H9v3h2v8" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/pt7" target="_blank" rel="noopener noreferrer" aria-label={t('contact.linkedin')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                    <path d="M8 11v6M8 8h.01M12 17v-3.5a2 2 0 0 1 4 0V17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
