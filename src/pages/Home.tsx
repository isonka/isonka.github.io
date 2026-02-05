import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { trackPageView, trackPhoneClick, trackEmailClick, trackSocialClick } from '../utils/gtmTracking';
import { trackFBPageView, trackFBPhoneClick, trackFBEmailClick, trackFBWhatsAppClick, trackFBBookingClick } from '../utils/fbPixelTracking';
import '../styles/Home.css';

// Hero background images for rotation
const heroImages = [
  { src: '/assets/images/studio.jpg', alt: 'PT Studio 7 - Pilates Reformer Studio' },
  { src: '/assets/images/nike_strength_studio.JPG', alt: 'PT Studio 7 - Nike Strength Training Area' },
];

// Reviews data for structured data
const reviewsData = [
  {
    author: 'Lot Canter Cremers',
    reviewBody: 'Through a neighbor in my building I was introduced to PT Studio 7. I have been going to this studio for the past 18 months, of which I have been pregnant for 9. During my pregnancy Elif trained me until the very end (38.5 weeks). Her training gave me and my body an extremely comfortable pregnancy and smooth delivery of birth!',
    ratingValue: 5,
  },
  {
    author: 'Ayşe',
    reviewBody: "I've been training at PT Studio 7 for a while now, and I couldn't be happier with my experience! The studio has such a calm and positive atmosphere, and the trainers are incredibly professional and supportive.",
    ratingValue: 5,
  },
  {
    author: 'Maya',
    reviewBody: "This is a truly special Pilates Reformer studio — warm, welcoming, and filled with care. Gökben and Elif bring so much heart into every session. I've been practicing here for almost six months, and I feel stronger, more balanced, and more connected to my body.",
    ratingValue: 5,
  },
  {
    author: 'Flaminia',
    reviewBody: "PT Studio 7 and Elif are exactly what I was looking for: professional, thoughtful, engaging in your body progress and growth. Elif is amazing and has decades of experience as a fitness trainer with a detail-oriented approach.",
    ratingValue: 5,
  },
];

export const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Track page view
    trackPageView('/', 'Home - PT Studio 7 Amsterdam');
    trackFBPageView('Home - PT Studio 7 Amsterdam');
  }, []);

  // Rotate hero background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Promotional Banner for Pilates Instructor Course */}
      <div className="promo-banner">
        <div className="promo-content">
          <span className="promo-text">
            <strong>Become a Certified Pilates Instructor</strong> — Course starts March 2026
          </span>
          <Link to="/academy" className="promo-cta">
            Learn More →
          </Link>
        </div>
      </div>

      <SEOHead
        title="Personal Training Amsterdam | Boutique Studio Museumplein | PT Studio 7"
        description="Personal Training studio Amsterdam at Museumplein, Oud-Zuid. Pilates, Nike Strength Training, TRX & Cardio. Private sessions & small groups (max 5). Expert instructors. Book now!"
        keywords="personal training Amsterdam, personal trainer Museumplein, Pilates Amsterdam, Nike strength training, TRX Amsterdam, boutique fitness Amsterdam, private training Oud-Zuid, PT Amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl"
        ogTitle="Personal Training Amsterdam | PT Studio 7 Museumplein"
        ogDescription="Boutique personal training studio at Museumplein. Pilates, Nike Strength, TRX & Cardio. Small groups (max 5), private sessions, expert instructors."
        ogImage="/assets/images/about-us-web.jpg"
      />
      <StructuredData type="LocalBusiness" data={{ reviews: reviewsData }} />
      
      {/* Hero Section with Rotating Background Images */}
      <section className="hero-video">
        {heroImages.map((image, index) => (
          <img 
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`hero-video-bg ${index === currentImageIndex ? 'active' : ''}`}
            width="2304"
            height="1536"
            fetchPriority={index === 0 ? "high" : "low"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        <div className="hero-overlay">
          <div className="hero-content-wrapper">
            <h1 className="hero-title">Personal Training Amsterdam</h1>
              <h2 className="hero-tagline">Boutique Fitness Studio | Small Groups (Max 5) | Private Sessions</h2>
              <p className="hero-description">
                  • Expert Certified Trainers • Private & Group Classes • Museumplein, Oud-Zuid<br/>
                  Pilates • Nike Strength • TRX • Cardio
              </p>
            <div className="hero-buttons">
              <Link to="/schedule" className="hero-btn-primary" onClick={() => trackFBBookingClick()}>Book a Class</Link>
              <Link to="/pricing" className="hero-btn-secondary">View Pricing</Link>
            </div>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Two Dedicated Studios</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Private Sessions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Small Groups (Max 5)</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Expert Trainers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2>Personal Training Amsterdam — Your Boutique Studio at Museumplein</h2>
            <p>
              Looking for expert personal training in Amsterdam Oud-Zuid? With 15 years of expertise at our Museumplein location, PT Studio 7 offers 
              Amsterdam's premier boutique fitness experience. Located at Van Baerlestraat 76C in the heart of Oud-Zuid, across from Stedelijk Museum, 
              we feature <strong>two dedicated training studios</strong> — a Pilates studio with professional Reformers, and a Strength & Cardio studio with Nike equipment and Technogym machines.
            </p>
            <p>
              We offer one-on-one private sessions where you receive 100% of your instructor's attention. 
              We also offer intimate small group classes (maximum 5 people) for those who enjoy training 
              with friends. Each program is customized to build strength, improve flexibility, or achieve your wellness goals.
            </p>
            <p>
              Our expert instructors design a personalized roadmap for your success, adapting every session 
              to your progress and celebrating each milestone with you.
            </p>
            <p className="about-signature">
              <strong>Elif Arzu Ogan</strong><br/>
              Owner & Head Instructor, PT Studio 7
            </p>
          </div>
          <div className="about-image">
            <img 
              src="/assets/images/about-us-web.jpg" 
              alt="PT Studio 7 Museumplein Location - Small Group Pilates Studio"
              width="700"
              height="447"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Workouts Section */}
      <section id="workouts" className="workouts-section">
        <div className="section-header">
          <h2>Pilates & Training Programs Amsterdam</h2>
          <p>Explore our variety of training programs</p>
        </div>
        <div className="workouts-grid">
          <Link to="/workouts/reformer-pilates" className="workout-card">
            <img 
              src="/assets/images/reformer.jpg" 
              alt="Reformer & Trapeze Table Pilates" 
              width="400" 
              height="220" 
              loading="lazy" 
              decoding="async" 
            />
            <h3>Reformer & Trapeze Table Pilates</h3>
            <p>Full-body workout focusing on core strength, flexibility, and posture</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/workouts/trx" className="workout-card">
            <img 
              src="/assets/images/trx.jpg" 
              alt="TRX Training" 
              width="400" 
              height="220" 
              loading="lazy" 
              decoding="async" 
            />
            <h3>TRX Training</h3>
            <p>Suspension training for strength, balance, and functional fitness</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/workouts/functional-training" className="workout-card">
            <img 
              src="/assets/images/nike_strength_studio.JPG" 
              alt="Nike Strength Training" 
              width="400" 
              height="220" 
              loading="lazy" 
              decoding="async" 
            />
            <h3>Nike Strength Training</h3>
            <p>Premium Nike equipment: half rack, Olympic barbell & dumbbells</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/workouts/cardio" className="workout-card">
            <img 
              src="/assets/images/cardio.jpg" 
              alt="Cardio Training" 
              width="400" 
              height="220" 
              loading="lazy" 
              decoding="async" 
            />
            <h3>Cardio</h3>
            <p>High-intensity cardio workouts to boost endurance and burn calories</p>
            <span className="learn-more">Learn More →</span>
          </Link>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="trainers-section">
        <div className="section-header">
          <h2>Expert Personal Trainers Amsterdam</h2>
          <p>Certified professionals dedicated to your fitness journey</p>
        </div>
        <div className="trainers-grid">
          <Link to="/trainer-elif" className="trainer-card">
            <img 
              src="/assets/images/elif.JPG" 
              alt="Elif Arzu Ogan - Pilates Instructor" 
              loading="lazy"
              decoding="async"
              width="140"
              height="140"
            />
            <h3>Elif Arzu Ogan</h3>
            <p>Comprehensive Pilates<br />Strength Training<br />Prenatal Pilates</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/trainer-gokben" className="trainer-card">
            <img 
              src="/assets/images/gokben.jpeg" 
              alt="Gökben Öztekin - Pilates Instructor" 
              loading="lazy"
              decoding="async"
              width="140"
              height="140"
            />
            <h3>Gökben Öztekin</h3>
            <p>Comprehensive Pilates</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/trainer-goknur" className="trainer-card">
            <img 
              src="/assets/images/goknur.jpeg" 
              alt="Göknur Dipli - Pilates Instructor" 
              loading="lazy"
              decoding="async"
              width="140"
              height="140"
            />
            <h3>Göknur Dipli</h3>
            <p>Comprehensive Pilates<br />Strength Training<br />Prenatal Pilates</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/trainer-gulce" className="trainer-card">
            <img 
              src="/assets/images/gulce.JPG" 
              alt="Gülce - Pilates Instructor" 
              loading="lazy"
              decoding="async"
              width="140"
              height="140"
            />
            <h3>Gülce</h3>
            <p>Reformer Pilates</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/trainer-melis" className="trainer-card">
            <img 
              src="/assets/images/melis.JPG" 
              alt="Melis - Pilates Instructor" 
              loading="lazy"
              decoding="async"
              width="140"
              height="140"
            />
            <h3>Melis</h3>
            <p>Reformer Pilates</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/trainer-lal" className="trainer-card">
            <img 
              src="/assets/images/lal.JPG" 
              alt="Lal - Pilates Instructor" 
              loading="lazy"
              decoding="async"
              width="140"
              height="140"
            />
            <h3>Lal</h3>
            <p>Reformer Pilates</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/trainer-nisan" className="trainer-card">
            <img 
              src="/assets/images/nisan.JPG" 
              alt="Nisan - Pilates Instructor" 
              loading="lazy"
              decoding="async"
              width="140"
              height="140"
            />
            <h3>Nisan</h3>
            <p>Reformer Pilates</p>
            <span className="learn-more">Learn More →</span>
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="section-header">
          <h2>Pilates Amsterdam Reviews</h2>
          <p>Real experiences from our community</p>
        </div>
        <div className="reviews-container">
          <div className="review-card">
            <img 
              src="/assets/images/lot.png" 
              alt="Lot Canter Cremers review" 
              className="reviewer-photo" 
              width="80" 
              height="80" 
              loading="lazy" 
              decoding="async" 
            />
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "Through a neighbor in my building I was introduced to PT Studio 7. I have been going to this studio for the past 18 months, of which I have been pregnant for 9. During my pregnancy Elif trained me until the very end (38.5 weeks). Her training gave me and my body an extremely comfortable pregnancy and smooth delivery of birth! Her experience and knowledge about the human body, pregnant or not, makes all the difference. Of course I continued after my pregnancy and I really enjoy and recommend this studio to everyone who is looking for a Pilates studio with qualified and experienced instructors. Since the Pilates sport is getting so popular there are a lot of places where you can go but most of the instructors don't have enough knowledge to be able to teach and train you like they do at PT Studio 7!"
            </p>
            <p className="review-author">- Lot Canter Cremers</p>
          </div>
          <div className="review-card">
            <div className="reviewer-initial" aria-label="Flaminia">F</div>
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "I had been looking for a professional Pilates reformer studio for about 2 years and tried many different studios around Amsterdam. PT Studio 7 and Elif are exactly what I was looking for: professional, thoughtful, engaging in your body progress and growth. Elif is amazing and has decades of experience as a fitness trainer. She demonstrates techniques with a detail-oriented approach and her classes are always different and tailored to the group!"
            </p>
            <p className="review-author">- Flaminia</p>
          </div>
          <div className="review-card">
            <img 
              src="/assets/images/maya.png" 
              alt="Maya review" 
              className="reviewer-photo" 
              width="80" 
              height="80" 
              loading="lazy" 
              decoding="async" 
            />
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "This is a truly special Pilates Reformer studio — warm, welcoming, and filled with care. Gökben and Elif bring so much heart into every session. Their gentle guidance, attentiveness, and kindness make all the difference. I've been practicing here for almost six months, and I feel stronger, more balanced, and more connected to my body. Every class leaves me smiling and deeply grateful!"
            </p>
            <p className="review-author">- Maya</p>
          </div>
          <div className="review-card">
            <img 
              src="/assets/images/yesim.png" 
              alt="Yeşim review" 
              className="reviewer-photo" 
              width="80" 
              height="80" 
              loading="lazy" 
              decoding="async" 
            />
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "I've been coming here for 6 months and the results are incredible. The atmosphere 
              is motivating and the equipment is pristine. Highly recommend!"
            </p>
            <p className="review-author">- Yeşim</p>
          </div>
          <div className="review-card">
            <img 
              src="/assets/images/ayse.png" 
              alt="Ayşe review" 
              className="reviewer-photo" 
              width="80" 
              height="80" 
              loading="lazy" 
              decoding="async" 
            />
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "I've been training at PT Studio 7 for a while now, and I couldn't be happier with my experience! The studio has such a calm and positive atmosphere, and the trainers are incredibly professional and supportive. They pay close attention to your needs and guide you through every movement with care. I highly recommend it!"
            </p>
            <p className="review-author">- Ayşe</p>
          </div>
        </div>
      </section>

      {/* Partner Badges Section */}
      <section className="partner-badges-section">
        <div className="partner-badges-container">
          <h3>Find Us On</h3>
          <div className="partner-badges">
            {/* Google Reviews Badge */}
            <a 
              href="https://maps.app.goo.gl/wrhyzYbov9eiGQJw5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="partner-badge google-badge"
            >
              <img 
                src="/assets/images/google-logo.svg" 
                alt="Google" 
                className="partner-logo"
                width="24"
                height="24"
              />
              <div className="google-rating">
                <span className="rating-stars">★★★★★</span>
                <span className="rating-text">4.8</span>
                <span className="review-incentive">Leave a review, get 5% off!</span>
              </div>
            </a>
            
            {/* ClassPass Badge */}
            <a 
              href="https://classpass.com/studios/pt-studio-7-amsterdam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="partner-badge classpass-badge"
            >
              <img 
                src="/assets/images/classpass-logo.svg" 
                alt="classpass" 
                className="partner-logo"
                width="100"
                height="20"
              />
              <div className="classpass-rating">
                <span className="rating-stars">★★★★★</span>
                <span className="rating-text">4.9</span>
                <span className="review-count">2,500+ reviews</span>
              </div>
            </a>

            {/* Urban Sports Club Badge */}
            <a 
              href="https://urbansportsclub.com/nl/venues/pt-studio-7-museumplein" 
              target="_blank" 
              rel="noopener noreferrer"
              className="partner-badge usc-badge"
            >
              <img 
                src="/assets/images/urbansportsclub-logo.svg" 
                alt="Urban Sports Club" 
                className="partner-logo"
                width="140"
                height="20"
              />
              <div className="usc-rating">
                <span className="rating-text">Book via USC</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Visit Our Pilates Studio in Oud-Zuid</h2>
            <p className="address">
              Van Baerlestraat 76C<br />
              1071BB Amsterdam Oud-Zuid<br />
              Netherlands
            </p>
            <p className="location-note">
              <svg className="location-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#bfa100"/>
              </svg>
              Located at Museumplein in Oud-Zuid, across from Stedelijk Museum
            </p>
            <div className="contact-links">
              <a href="tel:+31685162693" className="contact-link" onClick={() => { trackPhoneClick(); trackFBPhoneClick(); }}>
                <svg className="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="#bfa100"/>
                </svg>
                +31 6 8516 2693
              </a>
              <a href="https://wa.me/31685162693" target="_blank" rel="noopener noreferrer" className="contact-link whatsapp-link" onClick={() => { trackSocialClick('whatsapp'); trackFBWhatsAppClick(); }}>
                <svg className="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
                </svg>
                WhatsApp Us
              </a>
              <a href="mailto:info@ptstudio7amsterdam.nl" className="contact-link" onClick={() => { trackEmailClick(); trackFBEmailClick(); }}>
                <svg className="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#bfa100"/>
                </svg>
                info@ptstudio7amsterdam.nl
              </a>
              <a href="https://www.instagram.com/ptstudio7amsterdam" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg className="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="#E4405F"/>
                </svg>
                @ptstudio7amsterdam
              </a>
              <a href="https://www.facebook.com/ptstudio7" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg className="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
                PT Studio 7
              </a>
              <a href="https://www.linkedin.com/company/pt-studio-7" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg className="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/>
                </svg>
                PT Studio 7
              </a>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.7239958408204!2d4.876257777138345!3d52.3572909720188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6090de92c90df%3A0xe44c5d7c1eae1d19!2sPT%20Studio%207!5e0!3m2!1sen!2snl!4v1732445893649!5m2!1sen!2snl"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PT Studio 7 Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

