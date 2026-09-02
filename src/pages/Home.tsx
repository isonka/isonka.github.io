import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import '../styles/Home.css';

const heroImages = [
  {
    src: '/assets/images/studio.webp',
    srcSet:
      '/assets/images/studio-800.webp 800w, /assets/images/studio-1200.webp 1200w, /assets/images/studio.webp 1600w',
    width: 1600,
    height: 1066,
    alt: 'PT Studio 7 - Pilates Reformer Studio',
  },
  {
    src: '/assets/images/nike_strength_studio.webp',
    srcSet:
      '/assets/images/nike_strength_studio-800.webp 800w, /assets/images/nike_strength_studio.webp 1200w',
    width: 1200,
    height: 800,
    alt: 'PT Studio 7 - Nike Strength Training Area',
  },
];

const trainers = [
  { to: '/trainer/elif', src: '/assets/images/elif.webp', alt: 'Elif Arzu Ogan - Pilates Instructor', name: 'Elif Arzu Ogan', specialties: 'Comprehensive Pilates\nStrength Training\nPrenatal Pilates' },
  { to: '/trainer/gokben', src: '/assets/images/gokben.webp', alt: 'Gökben Öztekin - Pilates Instructor', name: 'Gökben Öztekin', specialties: 'Comprehensive Pilates' },
  { to: '/trainer/goknur', src: '/assets/images/goknur.webp', alt: 'Göknur Dipli - Pilates Instructor', name: 'Göknur Dipli', specialties: 'Comprehensive Pilates\nStrength Training\nPrenatal Pilates' },
  { to: '/trainer/gulce/', src: '/assets/images/gulce.webp', alt: 'Gülce Koç - Pilates Instructor', name: 'Gülce Koç', specialties: 'Reformer Pilates' },
  { to: '/trainer/lal/', src: '/assets/images/lal.webp', alt: 'Lal Avgen - Pilates Instructor', name: 'Lal Avgen', specialties: 'Reformer Pilates' },
  { to: '/trainer/nisan/', src: '/assets/images/nisan.webp', alt: 'Nisan Atalay - Pilates Instructor', name: 'Nisan Atalay', specialties: 'Reformer Pilates' },
  { to: '/trainer/kelly/', src: '/assets/images/kelly.webp', alt: 'Kelly Tin - Pilates Instructor', name: 'Kelly Tin', specialties: 'Reformer Pilates' },
  { to: '/trainer/gamze/', src: '/assets/images/gamze.webp', alt: 'E. Gamze Karadağ - Pilates Instructor', name: 'E. Gamze Karadağ', specialties: 'Reformer Pilates' },
];

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

const homeFaqs = [
  {
    question: 'Where can I take Pilates classes in Amsterdam?',
    answer:
      'PT Studio 7 offers Reformer Pilates, TRX, strength, and cardio at Van Baerlestraat 76C near Museumplein in Amsterdam Oud-Zuid. Book group classes (max 5) or private sessions online at pt7.nl/schedule/.',
  },
  {
    question: 'How many people are in a Pilates group class?',
    answer:
      'Our group classes have a maximum of 5 participants so instructors can coach form and progress personally.',
  },
  {
    question: 'How do I book a class at PT Studio 7?',
    answer:
      'Use the online schedule at pt7.nl/schedule/ to pick a group class or private appointment. View packages and intro offers at pt7.nl/pricing/.',
  },
  {
    question: 'What training does PT Studio 7 offer?',
    answer:
      'Reformer Pilates is our core focus. We also offer TRX, strength and functional training, cardio sessions, prenatal private Pilates, and instructor training through PT7 Academy.',
  },
  {
    question: 'Where is PT Studio 7 located?',
    answer:
      'Van Baerlestraat 76C, 1071 BB Amsterdam, across from the Stedelijk Museum at Museumplein in Oud-Zuid.',
  },
];

function TrainerTile({
  trainer,
}: {
  trainer: (typeof trainers)[number];
}) {
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
        {trainer.specialties.split('\n').join(' · ')}
      </span>
      <div className="home-person-media">
        <img
          src={trainer.src}
          alt={trainer.alt}
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [secondHeroReady, setSecondHeroReady] = useState(false);

  useEffect(() => {
    trackPageView('/', 'Home - PT Studio 7 Amsterdam');
    trackFBPageView('Home - PT Studio 7 Amsterdam');
  }, []);

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
        title="Pilates Amsterdam | Reformer Pilates & Personal Training | PT Studio 7"
        description="Pilates classes in Amsterdam at Museumplein: Reformer Pilates, small groups (max 5), and private sessions with certified instructors. Boutique studio in Oud-Zuid. Book online."
        keywords="Pilates Amsterdam, pilates classes Amsterdam, pilates classes near me, Reformer Pilates Amsterdam, personal training Amsterdam, Pilates Museumplein, private Pilates Amsterdam, small group Pilates, Pilates studio Van Baerlestraat, TRX training Amsterdam, prenatal Pilates Amsterdam"
        canonical="https://www.pt7.nl/"
        ogTitle="Pilates Amsterdam | Reformer Pilates & Personal Training | PT Studio 7"
        ogDescription="Pilates classes in Amsterdam at Museumplein: Reformer Pilates, small groups (max 5), and private sessions with certified instructors. Boutique studio in Oud-Zuid. Book online."
        ogImage="/assets/images/studio.jpg"
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
              alt={image.alt}
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
          <p className="home-hero-brand">PT Studio 7</p>
          <h1 className="home-hero-title">
            Reformer Pilates &amp; Personal Training in Amsterdam
          </h1>
          <p className="home-hero-line">
            Pilates classes in Amsterdam Oud-Zuid, boutique studio at Museumplein
          </p>
          <div className="home-hero-actions">
            <Link to="/schedule/" className="home-btn home-btn-gold" onClick={() => trackFBBookingClick()}>
              Book a Class
            </Link>
            <Link to="/reformer-pilates-amsterdam/" className="home-btn home-btn-ghost">
              Pilates Classes
            </Link>
            <Link to="/pricing/" className="home-btn home-btn-ghost">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="home-section home-manifesto">
        <p className="home-kicker">About</p>
        <h2 className="home-display">
          <ManifestoLine>
            Reformer Pilates &amp; Personal Training Studio at Museumplein
          </ManifestoLine>
        </h2>
        <div className="home-prose">
          <p>
            Reformer Pilates &amp; personal training in Amsterdam at our Museumplein studio in Oud-Zuid. With 15+ years of expertise, PT Studio 7 offers
            a boutique fitness experience built around attention and results. Located at Van Baerlestraat 76C across from Stedelijk Museum,
            our studio combines professional Reformers and classical Pilates apparatus with Nike strength equipment, TRX, and Concept2 machines in one space.
          </p>
          <p>
            We offer one-on-one private sessions where you receive 100% of your instructor&apos;s attention.
            We also offer intimate small group classes (maximum 5 people) for those who enjoy training
            with friends. Each program is customized to build strength, improve flexibility, or achieve your wellness goals.
          </p>
          <p>
            Our expert instructors design a personalized roadmap for your success, adapting every session
            to your progress and celebrating each milestone with you.
          </p>
          <p className="home-prose-links">
            Start here:{' '}
            <Link to="/reformer-pilates-amsterdam/">Reformer Pilates Amsterdam (Museumplein)</Link>
            {' · '}
            <Link to="/private-pilates-amsterdam/">Private Pilates</Link>
            {' · '}
            <Link to="/prenatal-pilates-amsterdam/">Prenatal Pilates</Link>
            {' · '}
            <Link to="/trx-training-amsterdam/">TRX</Link>
            {' · '}
            <Link to="/strength-training-amsterdam/">Strength Training</Link>
          </p>
          <p className="home-signature">
            <strong>Elif Arzu Ogan</strong>
            <br />
            Owner &amp; Head Instructor, PT Studio 7
          </p>
        </div>
        <div className="home-bleed-frame">
          <img
            src="/assets/images/about-us-web.webp"
            alt="PT Studio 7 Museumplein Location - Small Group Pilates Studio"
            width="1200"
            height="750"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section id="workouts" className="home-section home-works">
        <div className="home-works-label">
          <h2 className="home-kicker home-kicker-heading">Pilates &amp; Training Programs Amsterdam</h2>
          <p className="home-sub">Explore our variety of training programs</p>
        </div>
        <WorkoutGallery items={workouts} />
      </section>

      <section id="trainers" className="home-section home-team">
        <p className="home-kicker">Instructors</p>
        <h2 className="home-section-title">Expert Personal Trainers Amsterdam</h2>
        <p className="home-sub">Certified professionals dedicated to your fitness journey</p>
        <div className="home-team-grid">
          {trainers.map((t) => (
            <TrainerTile key={t.to} trainer={t} />
          ))}
        </div>
        <p className="home-footnote">
          Want to teach?{' '}
          <Link to="/academy/">Become a Pilates instructor</Link>
          {', '}
          <Link to="/academy/">Pilates teacher training</Link> at PT7 Academy.
        </p>
      </section>

      <section id="reviews" className="home-section home-reviews">
        <p className="home-kicker">Reviews</p>
        <h2 className="home-section-title">Pilates Amsterdam Reviews</h2>
        <p className="home-sub">Real experiences from our community</p>
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
            Google 4.9
          </a>
          <span aria-hidden="true"> · </span>
          <a href="https://classpass.com/studios/pt-studio-7-amsterdam" target="_blank" rel="noopener noreferrer">
            ClassPass 4.9 · 2,500+ reviews
          </a>
        </p>
      </section>

      <section id="contact" className="home-contact">
        <div className="home-contact-inner">
          <p className="home-kicker home-kicker-on-dark">Visit</p>
          <h2 className="home-contact-title">Visit Our Studio</h2>
          <p className="home-contact-address">
            Van Baerlestraat 76C, 1071 BB Amsterdam Oud-Zuid
          </p>
          <p className="home-contact-meta">Across from Stedelijk Museum at Museumplein</p>

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
                Email Us
              </a>
              <div className="home-contact-socials">
                <a href="https://www.instagram.com/ptstudio7amsterdam" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
                <a href="https://www.facebook.com/ptstudio7" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
                <a href="https://www.linkedin.com/company/pt-studio-7" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
