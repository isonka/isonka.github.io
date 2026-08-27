import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PHOTO_FOCUS } from '../data/photoFocus';
import { trainerProfiles, type TrainerProfile } from '../data/trainers';
import { useInViewOnce } from '../hooks/useInViewOnce';
import '../styles/Trainers.css';

const InstructorRow: React.FC<{ instructor: TrainerProfile; index: number; eager: boolean }> = ({
  instructor,
  index,
  eager,
}) => {
  const { ref, inView } = useInViewOnce<HTMLAnchorElement>();
  const role = instructor.heroTitle.replace(/\n/g, ' · ');
  const bio = instructor.bio[0];

  return (
    <Link
      ref={ref}
      to={`/trainer/${instructor.slug}/`}
      className={`instructor-row${index % 2 === 1 ? ' instructor-row--flip' : ''}${inView ? ' is-in' : ''}`}
      style={{ '--row-delay': `${(index % 4) * 90}ms` } as React.CSSProperties}
    >
      <div className="instructor-row-photo">
        <img
          src={instructor.image}
          alt={instructor.name}
          width={200}
          height={200}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition: PHOTO_FOCUS[instructor.slug] ?? '50% 24%' }}
        />
      </div>
      <div className="instructor-row-info">
        <h2 className="instructor-name instructor-reveal" style={{ transitionDelay: 'calc(var(--row-delay) + 80ms)' }}>
          {instructor.name}
        </h2>
        <p className="instructor-role instructor-reveal" style={{ transitionDelay: 'calc(var(--row-delay) + 160ms)' }}>
          {role}
        </p>
        <p className="instructor-bio instructor-reveal" style={{ transitionDelay: 'calc(var(--row-delay) + 240ms)' }}>
          {bio}
        </p>
        <p className="instructor-meta instructor-reveal" style={{ transitionDelay: 'calc(var(--row-delay) + 320ms)' }}>
          {instructor.languages.join(' · ')}
        </p>
        <span className="instructor-link instructor-reveal" style={{ transitionDelay: 'calc(var(--row-delay) + 400ms)' }}>
          View profile →
        </span>
      </div>
    </Link>
  );
};

export const Trainers: React.FC = () => {
  const availableInstructors = trainerProfiles.filter(t => t.available);
  const hasComingSoon = trainerProfiles.some(t => !t.available);

  return (
    <>
      <SEOHead
        title="Our Instructors | PT Studio 7 Amsterdam"
        description="Meet our expert team of certified Pilates and fitness instructors at PT Studio 7 Amsterdam. Master, senior, and junior instructors dedicated to your fitness journey."
        keywords="Pilates instructors Amsterdam, polestar pilates amsterdam, Pilates leraren Amsterdam, gecertificeerde Pilates instructeurs, Pilates teachers Museumplein, Pilates team Oud-Zuid"
        canonical="https://www.pt7.nl/instructors/"
      />
      <Breadcrumbs items={[{ name: 'Instructors', path: '/instructors' }]} />

      <div className="trainers-page">

        {availableInstructors.length > 0 && (
          <section className="instructors-stack" aria-labelledby="instructors-heading">
            <header className="instructors-header">
              <p className="instructors-kicker">The team</p>
              <h1 id="instructors-heading">Meet Our Team</h1>
              <p>Experienced professionals with advanced certifications</p>
            </header>

            {availableInstructors.map((instructor, index) => (
              <InstructorRow
                key={instructor.slug}
                instructor={instructor}
                index={index}
                eager={index === 0}
              />
            ))}
          </section>
        )}

        {hasComingSoon && (
          <section className="trainers-growing-banner">
            <div className="growing-banner-inner">
              <div className="growing-banner-text">
                <h2>Our Team is Growing</h2>
                <p>New instructors are joining soon. Interested in teaching at PT Studio 7?</p>
              </div>
              <Link to="/academy/" className="growing-banner-link">
                Become a Pilates instructor →
              </Link>
            </div>
          </section>
        )}

        <section className="trainers-cta">
          <h2>Ready to Train with Our Instructors?</h2>
          <p>Book a session and experience personalized training at its finest</p>
          <div className="trainers-cta-buttons">
            <Link to="/schedule/" className="trainers-btn-primary">Book a Class</Link>
            <Link to="/pricing/" className="trainers-btn-secondary">View Pricing</Link>
          </div>
        </section>
      </div>
    </>
  );
};
