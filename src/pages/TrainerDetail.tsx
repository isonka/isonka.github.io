import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { StructuredData } from '../components/StructuredData';
import { trainerProfiles } from '../data/trainers';
import '../styles/Trainer.css';

export const TrainerDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const trainer = trainerProfiles.find(t => t.slug === slug);

  if (!trainer) {
    return <Navigate to="/instructors" replace />;
  }

  return (
    <>
      <SEOHead
        title={trainer.seo.title}
        description={trainer.seo.description}
        keywords={trainer.seo.keywords}
        canonical={`https://www.pt7.nl/trainer/${trainer.slug}`}
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
          },
        }}
      />
      <Breadcrumbs items={[
        { name: 'Instructors', path: '/instructors' },
        { name: trainer.name, path: `/trainer/${trainer.slug}` },
      ]} />

      <div className="trainer-page">
        <div className="trainer-hero">
          <div className="trainer-hero-content">
            <img
              src={trainer.image}
              alt={`${trainer.name} - ${trainer.structuredData.jobTitle}`}
              className="trainer-hero-photo"
              width="180"
              height="180"
              loading="eager"
              decoding="async"
            />
            <div className="trainer-hero-text">
              <h1>{trainer.displayName}</h1>
              <p className="trainer-title" style={{ whiteSpace: 'pre-line' }}>{trainer.heroTitle}</p>
              <ul className="trainer-languages">
                {trainer.languages.map(lang => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="trainer-content">
          <section className="trainer-bio">
            {trainer.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>

          <section className="trainer-qualifications">
            <h2>Qualifications & Experience</h2>
            <ul>
              {trainer.qualifications.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </section>

          <section className="trainer-cta">
            <h2>Ready to Start Your Journey?</h2>
            <p>{trainer.ctaText}</p>
            <div className="cta-buttons">
              <Link to="/schedule" className="btn-primary">Book a Session</Link>
              <Link to="/pricing" className="btn-secondary">View Pricing</Link>
            </div>
          </section>

          <div className="back-link">
            <Link to="/instructors">&larr; Back to All Instructors</Link>
          </div>
        </div>
      </div>
    </>
  );
};
