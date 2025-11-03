import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import '../styles/Home.css';

export const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Only load video on desktop (not on mobile to save bandwidth)
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile && videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVideoLoaded) {
              const video = videoRef.current;
              if (video) {
                // Load video only when in viewport
                video.src = '/assets/video/landing.mp4';
                video.load();
                setIsVideoLoaded(true);
              }
            }
          });
        },
        { threshold: 0.25 } // Load when 25% visible
      );

      observer.observe(videoRef.current);

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }
  }, [isVideoLoaded]);

  return (
    <>
      <SEOHead
        title="PT Studio 7 Amsterdam | Pilates Studio at Museumplein"
        description="Amsterdam's premier Pilates boutique studio at Museumplein. Small group classes (max 4). Expert certified instructors. Private & group classes. EMS, TRX & Functional Training. Located at Stedelijk Museum."
        keywords="Pilates Amsterdam, Pilates Museumplein, boutique Pilates studio Amsterdam, small group Pilates Amsterdam, private Pilates Amsterdam, Pilates studio Stedelijk Museum, luxury Pilates Amsterdam, Pilates Rijksmuseum, intimate Pilates classes Amsterdam, premium Pilates Museumplein"
        canonical="https://www.ptstudio7amsterdam.nl"
        ogTitle="PT Studio 7 | Pilates Studio at Museumplein Amsterdam"
        ogDescription="Amsterdam's premier Pilates boutique studio. Small groups (max 4). Expert instructors. Premium Museumplein location. Private & group Pilates classes available."
      />
      
      {/* Video Hero Section - Desktop only, lazy loaded */}
      <section className="hero-video">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="/assets/images/about-us-web.jpg"
          className="hero-video-bg"
          aria-label="PT Studio 7 background video"
        >
          {/* Source loaded dynamically via IntersectionObserver */}
        </video>
        <div className="hero-overlay">
          <div className="hero-content-wrapper">
            <h1 className="hero-title">PT Studio 7 Amsterdam</h1>
              <h2 className="hero-tagline">Pilates Studio at Museumplein</h2>
              <p className="hero-description">
                  • Expert Certified Instructors • Tailored Private Classes • Premium Location<br/>
                  Pilates • EMS • TRX • One-on-One & Small Groups (Max 4)
              </p>
            <div className="hero-buttons">
              <Link to="/schedule" className="hero-btn-primary">Book a Class</Link>
              <Link to="/pricing" className="hero-btn-secondary">View Pricing</Link>
            </div>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Private Sessions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Tailored Programs</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Small Groups (Max 4)</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Expert Instructors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2>Welcome to PT Studio 7</h2>
            <p>
              For the past 15 years, we've been dedicated to transforming lives through private, personalized Pilates 
              training at our boutique studio in the heart of Amsterdam at Museumplein. Every session is tailored 
              specifically to your body, your goals, and your unique needs.
            </p>
            <p>
              Our specialty is one-on-one private training where you receive 100% of your instructor's attention. We also 
              offer intimate small group sessions (maximum 4 people) for those who enjoy training with friends while still 
              receiving individualized guidance. Each program is customized to help you build strength, improve flexibility, 
              rehabilitate from injury, or achieve any wellness goal you have.
            </p>
            <p>
              Our expert instructors don't just follow a routine—they design a personalized roadmap for your success, 
              adapting every session to your progress and celebrating each milestone with you.
            </p>
            <p className="about-signature">
              <strong>Elif Arzu Ogan</strong><br/>
              Owner & Head Trainer, PT Studio 7
            </p>
          </div>
          <div className="about-image">
            <img src="/assets/images/about-us-web.jpg" alt="PT Studio 7 Museumplein Location - Small Group Pilates Studio" />
          </div>
        </div>
      </section>

      {/* Workouts Section */}
      <section id="workouts" className="workouts-section">
        <div className="section-header">
          <h2>Our Workouts</h2>
          <p>Explore our variety of training programs</p>
        </div>
        <div className="workouts-grid">
          <div className="workout-card">
            <img src="/assets/images/pilates.jpg" alt="Reformer Pilates" loading="lazy" decoding="async" />
            <h3>Reformer Pilates</h3>
            <p>Full-body workout focusing on core strength, flexibility, and posture</p>
          </div>
          <div className="workout-card">
            <img src="/assets/images/trx.jpg" alt="TRX Training" loading="lazy" decoding="async" />
            <h3>TRX Training</h3>
            <p>Suspension training for strength, balance, and functional fitness</p>
          </div>
          <div className="workout-card">
            <img src="/assets/images/free.jpg" alt="Functional Training" loading="lazy" decoding="async" />
            <h3>Functional Training</h3>
            <p>Build strength and improve movement patterns with free weights</p>
          </div>
          <div className="workout-card">
            <img src="/assets/images/cardio.jpg" alt="Cardio Training" loading="lazy" decoding="async" />
            <h3>Cardio</h3>
            <p>High-intensity cardio workouts to boost endurance and burn calories</p>
          </div>
          <div className="workout-card">
            <img src="/assets/images/ems.jpg" alt="EMS Training" loading="lazy" decoding="async" />
            <h3>EMS Training</h3>
            <p>Electro Muscle Stimulation for efficient full-body activation</p>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="trainers-section">
        <div className="section-header">
          <h2>Meet Our Expert Trainers</h2>
          <p>Certified professionals dedicated to your success</p>
        </div>
        <div className="trainers-grid">
          <Link to="/trainer-elif" className="trainer-card">
            <img 
              src="/assets/images/elif.jpeg" 
              alt="Elif Arzu Ogan - Pilates Instructor" 
              loading="lazy"
              decoding="async"
              width="400"
              height="500"
            />
            <h3>Elif Arzu Ogan</h3>
            <p>Pilates & Functional Training Specialist</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/trainer-gokben" className="trainer-card">
            <img 
              src="/assets/images/gokben.jpeg" 
              alt="Gökben Öztekin - Reformer Pilates Expert" 
              loading="lazy"
              decoding="async"
              width="400"
              height="500"
            />
            <h3>Gökben Öztekin</h3>
            <p>Reformer Pilates Expert</p>
            <span className="learn-more">Learn More →</span>
          </Link>
          <Link to="/trainer-goknur" className="trainer-card">
            <img 
              src="/assets/images/goknur.jpeg" 
              alt="Göknur Dipli - Personal Trainer" 
              loading="lazy"
              decoding="async"
              width="400"
              height="500"
            />
            <h3>Göknur Dipli</h3>
            <p>Personal Trainer & Nutrition Coach</p>
            <span className="learn-more">Learn More →</span>
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p>Real experiences from our community</p>
        </div>
        <div className="reviews-container">
          <div className="review-card">
            <img src="/assets/images/cansu.png" alt="Cansu review" className="reviewer-photo" loading="lazy" decoding="async" />
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "Amazing studio with top-notch equipment and incredibly knowledgeable trainers. 
              The small group classes ensure personalized attention every session."
            </p>
            <p className="review-author">- Cansu</p>
          </div>
          <div className="review-card">
            <img src="/assets/images/su.png" alt="Su review" className="reviewer-photo" loading="lazy" decoding="async" />
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "The location is unbeatable - right at Museumplein! The trainers are professional 
              and really care about your progress. Best Pilates studio in Amsterdam!"
            </p>
            <p className="review-author">- Su</p>
          </div>
          <div className="review-card">
            <img src="/assets/images/yesim.png" alt="Yeşim review" className="reviewer-photo" loading="lazy" decoding="async" />
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "I've been coming here for 6 months and the results are incredible. The atmosphere 
              is motivating and the equipment is pristine. Highly recommend!"
            </p>
            <p className="review-author">- Yeşim</p>
          </div>
          <div className="review-card">
            <img src="/assets/images/tugce.png" alt="Tuğçe review" className="reviewer-photo" loading="lazy" decoding="async" />
            <div className="stars">★★★★★</div>
            <p className="review-text">
              "Professional trainers, clean studio, and great energy. I feel stronger and more 
              confident after every session. Couldn't ask for a better Pilates studio!"
            </p>
            <p className="review-author">- Tuğçe</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Visit Us</h2>
            <p className="address">
              Van Baerlestraat 76C<br />
              1071BB Amsterdam<br />
              Netherlands
            </p>
            <p className="location-note">
              <svg className="location-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#bfa100"/>
              </svg>
              Located at Museumplein, across from Stedelijk Museum with Rijksmuseum views
            </p>
            <div className="contact-links">
              <a href="tel:+31685162693" className="contact-link">
                <svg className="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="#bfa100"/>
                </svg>
                +31 6 8516 2693
              </a>
              <a href="https://wa.me/31685162693" target="_blank" rel="noopener noreferrer" className="contact-link whatsapp-link">
                <svg className="contact-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
                </svg>
                WhatsApp Us
              </a>
              <a href="mailto:info@ptstudio7amsterdam.nl" className="contact-link">
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

