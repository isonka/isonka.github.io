import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PHOTO_FOCUS } from '../data/photoFocus';
import { BASE_URL } from '../data/business';
import { trainersFor } from '../data/localized';
import type { TrainerProfile } from '../data/trainers';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import { useInViewOnce } from '../hooks/useInViewOnce';
import '../styles/Trainers.css';

const InstructorRow = ({
  instructor,
  index,
  eager,
}: {
  instructor: TrainerProfile;
  index: number;
  eager: boolean;
}) => {
  const { t } = useTranslation('instructors');
  const { href } = useLocalizedPage('/instructors/');
  const { ref, inView } = useInViewOnce<HTMLAnchorElement>();
  const role = instructor.heroTitle.replace(/\n/g, ' · ');
  const bio = instructor.bio[0];

  return (
    <Link
      ref={ref}
      to={href(`/trainer/${instructor.slug}/`)}
      className={`instructor-row${inView ? ' is-in' : ''}`}
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
        <span className="instructor-link">
          {t('viewProfile')}
        </span>
      </div>
    </Link>
  );
};

export const Trainers= () => {
  const { t } = useTranslation('instructors');
  const page = useLocalizedPage('/instructors/');
  const { href } = page;
  const trainerProfiles = trainersFor(page.locale);
  const availableInstructors = trainerProfiles.filter(p => p.available);
  const hasComingSoon = trainerProfiles.some(p => !p.available);

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={page.canonical}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData
        type="ItemList"
        data={{
          itemList: {
            name: t('seo.listName'),
            itemListElement: availableInstructors.map((instructor) => ({
              name: instructor.name,
              url: `${BASE_URL}${href(`/trainer/${instructor.slug}/`)}`,
              image: `${BASE_URL}${instructor.image}`,
            })),
          },
        }}
      />
      <Breadcrumbs items={[{ name: t('breadcrumb'), path: page.path }]} />

      <div className="trainers-page">

        {availableInstructors.length > 0 && (
          <section className="instructors-stack" aria-labelledby="instructors-heading">
            <header className="instructors-header">
              <p className="instructors-kicker">{t('kicker')}</p>
              <h1 id="instructors-heading">{t('title')}</h1>
              <p>{t('lead')}</p>
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
                <h2>{t('growing.title')}</h2>
                <p>{t('growing.text')}</p>
              </div>
              <Link to={href('/academy/')} className="growing-banner-link">
                {t('growing.link')}
              </Link>
            </div>
          </section>
        )}

        <section className="trainers-cta">
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.text')}</p>
          <div className="trainers-cta-buttons">
            <Link to={href('/schedule/')} className="trainers-btn-primary">{t('cta.book')}</Link>
            <Link to={href('/pricing/')} className="trainers-btn-secondary">{t('cta.pricing')}</Link>
          </div>
        </section>
      </div>
    </>
  );
};
