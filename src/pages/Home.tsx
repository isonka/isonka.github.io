import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { AcademyUrgencyBanner } from '../components/AcademyUrgencyBanner';
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
import { homePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import { isPrerender } from '../utils/prerender';
import '../styles/Home.css';

const HOME_HREFLANG = [
  { hreflang: 'en', href: 'https://www.pt7.nl/' },
  { hreflang: 'nl', href: 'https://www.pt7.nl/nl/' },
  { hreflang: 'x-default', href: 'https://www.pt7.nl/' },
];

const FAQ_KEYS = ['where', 'groupSize', 'booking', 'training', 'location'] as const;

const WORKOUT_COPY = {
  'reformer-pilates': 'reformerPilates',
  'reformer-pilates-amsterdam': 'reformerPilates',
  trx: 'trx',
  'functional-training': 'functionalTraining',
  cardio: 'cardio',
} as const;

const heroImages = [
  {
    src: '/assets/images/studio.webp',
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
  { id: 'elif', to: '/trainer/elif', src: '/assets/images/elif.webp', name: 'Elif Arzu Ogan' },
  { id: 'gokben', to: '/trainer/gokben', src: '/assets/images/gokben.webp', name: 'Gökben Öztekin' },
  { id: 'goknur', to: '/trainer/goknur', src: '/assets/images/goknur.webp', name: 'Göknur Dipli' },
  { id: 'gulce', to: '/trainer/gulce/', src: '/assets/images/gulce.webp', name: 'Gülce Koç' },
  { id: 'lal', to: '/trainer/lal/', src: '/assets/images/lal.webp', name: 'Lal Avgen' },
  { id: 'nisan', to: '/trainer/nisan/', src: '/assets/images/nisan.webp', name: 'Nisan Atalay' },
  { id: 'kelly', to: '/trainer/kelly/', src: '/assets/images/kelly.webp', name: 'Kelly Tin' },
  { id: 'gamze', to: '/trainer/gamze/', src: '/assets/images/gamze.webp', name: 'E. Gamze Karadağ' },
] as const;

const REVIEW_KEYS = ['lot', 'flaminia', 'maya', 'yesim', 'ayse'] as const;

const reviewsData = [
  { author: 'Lot Canter Cremers', reviewBody: 'Through a neighbor in my building I was introduced to PT 7...', ratingValue: 5 },
  { author: 'Ayşe', reviewBody: "I've been training at PT 7 for a while now...", ratingValue: 5 },
  { author: 'Maya', reviewBody: "This is a truly special Pilates Reformer studio...", ratingValue: 5 },
  { author: 'Flaminia', reviewBody: "PT 7 and Elif are exactly what I was looking for...", ratingValue: 5 },
];

function TrainerTile({
  trainer,
}: {
  trainer: (typeof trainers)[number];
}) {
  const { t } = useTranslation('home');
  const { ref, inView } = useInViewOnce<HTMLAnchorElement>();
  const slug = trainer.to.replace(/^\/trainer\//, '').replace(/\/$/, '');
  const focus = PHOTO_FOCUS[slug] ?? '50% 24%';

  return (
    <Link
      ref={ref}
      to={trainer.to}
      className={`home-person${inView ? ' is-inview' : ''}`}
    >
      <span className="home-person-role">
        {t(`trainers.${trainer.id}.specialties`)}
      </span>
      <div className="home-person-media">
        <img
          src={trainer.src}
          alt={t(`trainers.${trainer.id}.alt`)}
          loading="lazy"
          decoding="async"
          width="280"
          height="400"
          style={{ objectPosition: focus }}
        />
      </div>
      <span className="home-person-name">{trainer.name}</span>
    </Link>
  );
}

export const Home= () => {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [secondHeroReady, setSecondHeroReady] = useState(false);
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
    if (isPrerender()) return;

    const enable = () => setSecondHeroReady(true);
    const ric = window.requestIdleCallback?.bind(window);
    if (ric) {
      const id = ric(enable, { timeout: 4000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(enable, 2500);
    return () => window.clearTimeout(timer);
  }, []);

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
        ogImage="/assets/images/og-share.jpg"
        ogLocale={locale === 'nl' ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={locale === 'nl' ? ['en_US'] : ['nl_NL']}
        htmlLang={locale === 'nl' ? 'nl' : 'en'}
        hreflangAlternates={HOME_HREFLANG}
      />
      <StructuredData type="LocalBusiness" data={{ reviews: reviewsData }} />
      <StructuredData type="FAQPage" data={{ faqs: homeFaqs }} />

      <AcademyUrgencyBanner />

      <section className="home-hero">
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
            />
          );
        })}
        <div className="home-hero-veil" />
        <div className="home-hero-inner">
          <p className="home-hero-brand">{t('hero.brand')}</p>
          <h1 className="home-hero-title">{t('hero.title')}</h1>
          <p className="home-hero-line">{t('hero.line')}</p>
          <div className="home-hero-ratings">
            <a href="https://maps.app.goo.gl/wrhyzYbov9eiGQJw5" target="_blank" rel="noopener noreferrer">
              {t('reviews.google')}
            </a>
            <a href="https://classpass.com/studios/pt-studio-7-amsterdam" target="_blank" rel="noopener noreferrer">
              {t('reviews.classpass')}
            </a>
          </div>
          <div className="home-hero-actions">
            <Link to={scheduleHref} className="home-btn home-btn-gold" onClick={() => trackFBBookingClick()}>
              {t('hero.bookClass')}
            </Link>
            <Link to="/reformer-pilates-amsterdam/" className="home-btn home-btn-ghost">
              {t('hero.pilatesClasses')}
            </Link>
            <Link to={pricingHref} className="home-btn home-btn-ghost">
              {t('hero.viewPricing')}
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="home-section home-manifesto">
        <p className="home-kicker">{t('about.kicker')}</p>
        <h2 className="home-display">
          <ManifestoLine>{t('about.title')}</ManifestoLine>
        </h2>
        <div className="home-manifesto-layout">
          <div className="home-prose">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
            <p className="home-prose-links">
              <Trans
                ns="home"
                i18nKey="about.links"
                components={{
                  reformer: <Link to="/reformer-pilates-amsterdam/" />,
                  private: <Link to="/private-pilates-amsterdam/" />,
                  prenatal: <Link to="/prenatal-pilates-amsterdam/" />,
                  trx: <Link to="/trx-training-amsterdam/" />,
                  strength: <Link to="/strength-training-amsterdam/" />,
                }}
              />
            </p>
            <p className="home-signature">
              <strong>{t('about.ownerName')}</strong>
              <br />
              {t('about.signatureRole')}
            </p>
          </div>
          <div className="home-bleed-frame">
            <img
              src="/assets/images/about-us-web.webp"
              alt={t('about.imageAlt')}
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section id="workouts" className="home-section home-works">
        <div className="home-works-label">
          <h2 className="home-kicker home-kicker-heading">{t('workouts.heading')}</h2>
          <p className="home-sub">{t('workouts.sub')}</p>
        </div>
        <WorkoutGallery items={workoutItems} />
      </section>

      <section id="trainers" className="home-section home-team">
        <p className="home-kicker">{t('trainers.kicker')}</p>
        <h2 className="home-section-title">{t('trainers.title')}</h2>
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
        <h2 className="home-section-title">{t('reviews.title')}</h2>
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
          <a href="https://classpass.com/studios/pt-studio-7-amsterdam" target="_blank" rel="noopener noreferrer">
            {t('reviews.classpass')}
          </a>
        </p>
      </section>

      <section id="faq" className="home-section home-faq" aria-labelledby="home-faq-heading">
        <p className="home-kicker">{t('faqSection.kicker')}</p>
        <h2 id="home-faq-heading" className="home-section-title">{t('faqSection.title')}</h2>
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
          <h2 className="home-contact-title">{t('contact.title')}</h2>
          <p className="home-contact-address">{t('contact.address')}</p>
          <p className="home-contact-meta">{t('contact.meta')}</p>

          <div className="home-contact-grid">
            <ContactMap />
            <div className="home-contact-actions">
              <a href="tel:+31685162693" className="home-btn home-btn-light" onClick={() => { trackPhoneClick(); trackFBPhoneClick(); }}>
                +31 685 162693
              </a>
              <a href="https://wa.me/31685162693" target="_blank" rel="noopener noreferrer" className="home-btn home-btn-ghost" onClick={() => { trackSocialClick('whatsapp'); trackFBWhatsAppClick(); }}>
                WhatsApp
              </a>
              <a href="mailto:info@pt7.nl" className="home-btn home-btn-ghost" onClick={() => { trackEmailClick(); trackFBEmailClick(); }}>
                {t('contact.emailUs')}
              </a>
              <div className="home-contact-socials">
                <a href="https://www.instagram.com/ptstudio7amsterdam" target="_blank" rel="noopener noreferrer" aria-label={t('contact.instagram')}>{t('contact.instagram')}</a>
                <a href="https://www.facebook.com/ptstudio7" target="_blank" rel="noopener noreferrer" aria-label={t('contact.facebook')}>{t('contact.facebook')}</a>
                <a href="https://www.linkedin.com/company/pt-studio-7" target="_blank" rel="noopener noreferrer" aria-label={t('contact.linkedin')}>{t('contact.linkedin')}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
