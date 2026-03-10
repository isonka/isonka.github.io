import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { trackPageView } from '../utils/gtmTracking';
import { workoutDetails } from '../data/workoutDetails';
import '../styles/WorkoutDetail.css';

export const WorkoutDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const workout = workoutDetails.find(w => w.slug === slug);

  useEffect(() => {
    if (workout) {
      trackPageView(`/workouts/${workout.slug}`, `${workout.hero.title} - PT Studio 7`);
    }
  }, [workout]);

  useEffect(() => {
    if (workout?.extraCss === 'SummerShredLab') {
      import('../styles/SummerShredLab.css');
    }
  }, [workout]);

  if (!workout) {
    return <Navigate to="/" replace />;
  }

  const isAnchorLink = (to: string) => to.startsWith('#');

  return (
    <>
      <SEOHead
        title={workout.seo.title}
        description={workout.seo.description}
        keywords={workout.seo.keywords}
        canonical={workout.seo.canonical}
        ogTitle={workout.seo.ogTitle}
        ogDescription={workout.seo.ogDescription}
        ogImage={workout.seo.ogImage}
      />
      <Breadcrumbs items={[{ name: workout.breadcrumbName, path: `/workouts/${workout.slug}` }]} />

      {workout.announcementBanner && (
        <div className="ssl-announcement-banner">
          <span className="ssl-banner-label">{workout.announcementBanner.label}</span>
          <span className="ssl-banner-text">{workout.announcementBanner.text}</span>
          <a href={workout.announcementBanner.ctaHref} className="ssl-banner-cta">{workout.announcementBanner.ctaLabel}</a>
        </div>
      )}

      <div className="workout-detail-page">
        {workout.hero.usePosterHero ? (
          <section className="ssl-hero">
            <img
              src={workout.hero.image}
              alt={`${workout.hero.title} — PT Studio 7`}
              className="ssl-hero-image"
            />
            <div className="ssl-hero-cta">
              {isAnchorLink(workout.hero.ctaTo) ? (
                <a href={workout.hero.ctaTo} className="cta-button">{workout.hero.ctaLabel}</a>
              ) : (
                <Link to={workout.hero.ctaTo} className="cta-button">{workout.hero.ctaLabel}</Link>
              )}
            </div>
          </section>
        ) : (
          <section className="workout-hero" style={{ backgroundImage: `url(${workout.hero.image})` }}>
            <div className="workout-hero-overlay">
              <div className="workout-hero-content">
                <h1>{workout.hero.title}</h1>
                <p className="workout-tagline">{workout.hero.tagline}</p>
                <Link to={workout.hero.ctaTo} className="cta-button">{workout.hero.ctaLabel}</Link>
              </div>
            </div>
          </section>
        )}

        <div className="workout-content">
          <section className="workout-intro">
            <h2>{workout.intro.title}</h2>
            <p className="lead">{workout.intro.lead}</p>
          </section>

          {workout.equipmentGallery && (
            <section className="equipment-gallery-section">
              <h2>{workout.equipmentGallery.title}</h2>
              <div className="equipment-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                {workout.equipmentGallery.items.map((item, i) => (
                  <div key={i} className="equipment-gallery-item" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                    <img src={item.image} alt={item.imageAlt} style={{ width: '100%', height: '250px', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ padding: '1rem', background: '#fff' }}>
                      <h4 style={{ margin: '0 0 0.5rem', color: '#333' }}>{item.title}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="benefits-section">
            <h2>{workout.benefits.title}</h2>
            <div className="benefits-grid">
              {workout.benefits.cards.map((card, i) => (
                <div key={i} className="benefit-card">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="for-whom-section">
            <h2>{workout.forWhom.title}</h2>
            <div className="for-whom-grid">
              {workout.forWhom.cards.map((card, i) => (
                <div key={i} className="for-whom-card">
                  <h3>{card.heading}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </section>

          {workout.equipmentShowcase && (
            <section className="equipment-section">
              <h2>{workout.equipmentShowcase.title}</h2>
              <p className="section-subtitle">{workout.equipmentShowcase.subtitle}</p>
              <div className="equipment-highlight">
                <div className="equipment-info">
                  <h3>{workout.equipmentShowcase.heading}</h3>
                  <p>{workout.equipmentShowcase.description}</p>
                  <ul>
                    {workout.equipmentShowcase.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <Link to={workout.equipmentShowcase.linkTo} className="learn-more-link">{workout.equipmentShowcase.linkLabel}</Link>
                </div>
              </div>
            </section>
          )}

          <section id="buy" className="class-options-section">
            <h2>{workout.classOptions.title}</h2>
            <div className="class-options-grid">
              {workout.classOptions.cards.map((card, i) => (
                <div key={i} className={`class-option-card${card.featured ? ' featured' : ''}`}>
                  {card.featured && card.featuredBadge && <span className="featured-badge">{card.featuredBadge}</span>}
                  <h3>{card.title}</h3>
                  <p className="class-size">{card.subtitle}</p>
                  <p>{card.description}</p>
                  <ul className="class-features">
                    {card.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                  {card.healcodeHtml ? (
                    <div
                      className="buy-button healcode-pricing-option-text-link"
                      dangerouslySetInnerHTML={{ __html: card.healcodeHtml }}
                    />
                  ) : card.linkTo ? (
                    <Link to={card.linkTo} className="class-option-btn">{card.linkLabel}</Link>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="trainers-section">
            <h2>{workout.trainers.title}</h2>
            <div className="trainers-grid">
              {workout.trainers.cards.map((trainer) => (
                <div key={trainer.slug} className="trainer-mini-card">
                  <img
                    src={trainer.image}
                    alt={trainer.imageAlt}
                    width="400"
                    height="280"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{trainer.name}</h3>
                  <p className="trainer-cert">{trainer.cert}</p>
                  <p>{trainer.description}</p>
                  <Link to={`/trainer/${trainer.slug}`} className="trainer-link">View Profile →</Link>
                </div>
              ))}
            </div>
          </section>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {workout.faq.map((item, i) => (
                <div key={i} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="final-cta">
            <h2>{workout.finalCta.title}</h2>
            <p>{workout.finalCta.subtitle}</p>
            <div className="cta-buttons">
              {isAnchorLink(workout.finalCta.primaryTo) ? (
                <a href={workout.finalCta.primaryTo} className="cta-button primary">{workout.finalCta.primaryLabel}</a>
              ) : (
                <Link to={workout.finalCta.primaryTo} className="cta-button primary">{workout.finalCta.primaryLabel}</Link>
              )}
              <Link to={workout.finalCta.secondaryTo} className="cta-button secondary">{workout.finalCta.secondaryLabel}</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
