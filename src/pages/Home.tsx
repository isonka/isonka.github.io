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
import '../styles/Home.css';

const HOME_HREFLANG = [
  { hreflang: 'en', href: 'https://www.pt7.nl/' },
  { hreflang: 'nl', href: 'https://www.pt7.nl/nl/' },
  { hreflang: 'x-default', href: 'https://www.pt7.nl/' },
];

const FAQ_KEYS = ['where', 'groupSize', 'booking', 'training', 'location'] as const;

const WORKOUT_COPY = {
  'reformer-pilates': 'reformerPilates',
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

const reviews = [
  { author: 'Lot Canter Cremers', text: '"Through a neighbor in my building I was introduced to PT Studio 7. I have been going to this studio for the past 18 months, of which I have been pregnant for 9. During my pregnancy Elif trained me until the very end (38.5 weeks). Her training gave me and my body an extremely comfortable pregnancy and smooth delivery of birth! Her experience and knowledge about the human body, pregnant or not, makes all the difference. Of course I continued after my pregnancy and I really enjoy and recommend this studio to everyone who is looking for a Pilates studio with qualified and experienced instructors. Since the Pilates sport is getting so popular there are a lot of places where you can go but most of the instructors don\'t have enough knowledge to be able to teach and train you like they do at PT Studio 7!"' },
  { author: 'Flaminia', text: '"I had been looking for a professional Pilates reformer studio for about 2 years and tried many different studios around Amsterdam. PT Studio 7 and Elif are exactly what I was looking for: professional, thoughtful, engaging in your body progress and growth. Elif is amazing and has decades of experience as a fitness trainer. She demonstrates techniques with a detail-oriented approach and her classes are always different and tailored to the group!"' },
  { author: 'Maya', text: '"This is a truly special Pilates Reformer studio, warm, welcoming, and filled with care. Gökben and Elif bring so much heart into every session. Their gentle guidance, attentiveness, and kindness make all the difference. I\'ve been practicing here for almost six months, and I feel stronger, more balanced, and more connected to my body. Every class leaves me smiling and deeply grateful!"' },
  { author: 'Yeşim', text: '"I\'ve been coming here for 6 months and the results are incredible. The atmosphere is motivating and the equipment is pristine. Highly recommend!"' },
  { author: 'Ayşe', text: '"I\'ve been training at PT Studio 7 for a while now, and I couldn\'t be happier with my experience! The studio has such a calm and positive atmosphere, and the trainers are incredibly professional and supportive. They pay close attention to your needs and guide you through every movement with care. I highly recommend it!"' },
];

const reviewsData = [
  { author: 'Lot Canter Cremers', reviewBody: 'Through a neighbor in my building I was introduced to PT Studio 7...', ratingValue: 5 },
  { author: 'Ayşe', reviewBody: "I've been training at PT Studio 7 for a while now...", ratingValue: 5 },
  { author: 'Maya', reviewBody: "This is a truly special Pilates Reformer studio...", ratingValue: 5 },
  { author: 'Flaminia', reviewBody: "PT Studio 7 and Elif are exactly what I was looking for...", ratingValue: 5 },
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

export const Home: React.FC = () => {
  const { t } = useTranslation('home');
  const locale = useLocale();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [secondHeroReady, setSecondHeroReady] = useState(false);
  const canonical = locale === 'nl' ? 'https://www.pt7.nl/nl/' : 'https://www.pt7.nl/';
  const academyHref = locale === 'nl' ? '/academy/nl/' : '/academy/';

  const homeFaqs = FAQ_KEYS.map((key) => ({
    question: t(`faqs.${key}.question`),
    answer: t(`faqs.${key}.answer`),
  }));

  const workoutItems = workouts.map((w) => {
    const slug = w.to.replace(/^\/workouts\//, '').replace(/\/$/, '');
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
          <div className="home-hero-actions">
            <Link to="/schedule/" className="home-btn home-btn-gold" onClick={() => trackFBBookingClick()}>
              {t('hero.bookClass')}
            </Link>
            <Link to="/reformer-pilates-amsterdam/" className="home-btn home-btn-ghost">
              {t('hero.pilatesClasses')}
            </Link>
            <Link to="/pricing/" className="home-btn home-btn-ghost">
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
          {reviews.map((r) => (
            <blockquote key={r.author} className="home-quote">
              <p>{r.text}</p>
              <cite>{r.author}</cite>
            </blockquote>
          ))}
        </div>
        <p className="home-ratings">
          <a href="https://maps.app.goo.gl/wrhyzYbov9eiGQJw5" target="_blank" rel="noopener noreferrer">
            {t('reviews.google')}
          </a>
          <span aria-hidden="true"> · </span>
          <a href="https://classpass.com/studios/pt-studio-7-amsterdam" target="_blank" rel="noopener noreferrer">
            {t('reviews.classpass')}
          </a>
        </p>
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
