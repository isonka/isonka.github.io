import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { StructuredData } from '../components/StructuredData';
import { Reveal } from '../components/Reveal';
import { PHOTO_FOCUS } from '../data/photoFocus';
import { trainerProfiles } from '../data/trainers';
import '../styles/Trainer.css';

export const TrainerDetail= () => {
  const { slug } = useParams<{ slug: string }>();
  const trainer = trainerProfiles.find(t => t.slug === slug);

  if (!trainer) {
    return <Navigate to="/instructors/" replace />;
  }

  const relatedLinksByTrainer: Record<string, { to: string; label: string }[]> = {
    elif: [
      { to: '/workouts/reformer-pilates', label: 'Reformer Pilates classes' },
      { to: '/academy', label: 'Pilates teacher training at PT7 Academy' },
      { to: '/prenatal-pilates-amsterdam', label: 'Prenatal Pilates page' },
    ],
    gokben: [{ to: '/workouts/reformer-pilates', label: 'Reformer Pilates classes' }],
    goknur: [
      { to: '/workouts/reformer-pilates', label: 'Reformer Pilates classes' },
      { to: '/workouts/functional-training', label: 'Strength training classes' },
    ],
    gulce: [
      { to: '/workouts/reformer-pilates', label: 'Reformer Pilates classes' },
      { to: '/academy', label: 'Become a Pilates instructor | PT7 Academy' },
    ],
    lal: [
      { to: '/workouts/reformer-pilates', label: 'Reformer Pilates classes' },
      { to: '/academy', label: 'Become a Pilates instructor | PT7 Academy' },
    ],
    nisan: [
      { to: '/workouts/reformer-pilates', label: 'Reformer Pilates classes' },
      { to: '/academy', label: 'Become a Pilates instructor | PT7 Academy' },
    ],
    kelly: [
      { to: '/workouts/reformer-pilates', label: 'Reformer Pilates classes' },
      { to: '/academy', label: 'Become a Pilates instructor | PT7 Academy' },
    ],
    gamze: [
      { to: '/workouts/reformer-pilates', label: 'Reformer Pilates classes' },
      { to: '/academy', label: 'Become a Pilates instructor | PT7 Academy' },
    ],
  };

  const relatedLinks = relatedLinksByTrainer[trainer.slug] || [];
  const role = trainer.heroTitle.replace(/\n/g, ' · ');

  return (
    <>
      <SEOHead
        title={trainer.seo.title}
        description={trainer.seo.description}
        keywords={trainer.seo.keywords}
        canonical={`https://www.pt7.nl/trainer/${trainer.slug}/`}
      />
      <StructuredData
        type="Person"
        data={{
          person: {
            name: trainer.name,
            jobTitle: trainer.structuredData.jobTitle,
            image: trainer.image,
            description: trainer.structuredData.description,
            worksFor: 'PT Studio 7 Amsterdam',
            knowsAbout: trainer.specialties,
            hasCredential: trainer.qualifications,
            sameAs: trainer.slug === 'elif'
              ? ['https://www.instagram.com/ptstudio7amsterdam', 'https://www.polestarpilates.nl/']
              : ['https://www.instagram.com/ptstudio7amsterdam'],
          },
        }}
      />
      <Breadcrumbs items={[
        { name: 'Instructors', path: '/instructors' },
        { name: trainer.name, path: `/trainer/${trainer.slug}` },
      ]} />

      <div className="trainer-page">
        <Reveal className="trainer-hero">
          <div className="trainer-hero-photo">
            <img
              src={trainer.image}
              alt={`${trainer.name} - ${trainer.structuredData.jobTitle}`}
              width={200}
              height={200}
              loading="eager"
              decoding="async"
              style={{ objectPosition: PHOTO_FOCUS[trainer.slug] ?? '50% 24%' }}
            />
          </div>
          <div className="trainer-hero-text">
            <p className="trainer-kicker trainer-reveal" style={{ transitionDelay: '80ms' }}>Instructor</p>
            <h1 className="trainer-reveal" style={{ transitionDelay: '140ms' }}>{trainer.displayName}</h1>
            <p className="trainer-title trainer-reveal" style={{ transitionDelay: '220ms' }}>{role}</p>
            <p className="trainer-meta trainer-reveal" style={{ transitionDelay: '300ms' }}>
              {trainer.languages.join(' · ')}
            </p>
          </div>
        </Reveal>

        <div className="trainer-content">
          <Reveal className="trainer-bio">
            {trainer.bio.map((paragraph, i) => (
              <p key={i} className="trainer-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="trainer-qualifications">
            <h2 className="trainer-reveal">Qualifications & Experience</h2>
            <ul>
              {trainer.qualifications.map((q, i) => (
                <li
                  key={i}
                  className="trainer-reveal"
                  style={{ transitionDelay: `${Math.min(i, 8) * 40 + 80}ms` }}
                >
                  {q}
                </li>
              ))}
            </ul>
          </Reveal>

          {relatedLinks.length > 0 && (
            <Reveal className="trainer-related">
              <h2 className="trainer-reveal">Explore Related Pages</h2>
              <ul>
                {relatedLinks.map((link, i) => (
                  <li
                    key={link.to}
                    className="trainer-reveal"
                    style={{ transitionDelay: `${i * 60 + 80}ms` }}
                  >
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <Reveal className="trainer-cta">
          <h2 className="trainer-reveal">Ready to Start Your Journey?</h2>
          <p className="trainer-reveal" style={{ transitionDelay: '80ms' }}>{trainer.ctaText}</p>
          <div className="trainer-cta-buttons trainer-reveal" style={{ transitionDelay: '160ms' }}>
            <Link to="/schedule/" className="trainer-btn-primary">Book a Session</Link>
            <Link to="/pricing/" className="trainer-btn-secondary">View Pricing</Link>
          </div>
        </Reveal>

        <p className="trainer-back">
          <Link to="/instructors/">← Back to All Instructors</Link>
        </p>
      </div>
    </>
  );
};
