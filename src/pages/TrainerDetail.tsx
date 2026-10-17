import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { StructuredData } from '../components/StructuredData';
import { Reveal } from '../components/Reveal';
import { PHOTO_FOCUS } from '../data/photoFocus';
import { trainersFor } from '../data/localized';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import { NotFound } from './NotFound';
import '../styles/Trainer.css';

type RelatedLinkKey = 'reformer' | 'academyTraining' | 'prenatal' | 'strength' | 'academyBecome';

const RELATED_LINK_PATHS: Record<RelatedLinkKey, string> = {
  reformer: '/reformer-pilates-amsterdam/',
  academyTraining: '/academy/',
  prenatal: '/prenatal-pilates-amsterdam/',
  strength: '/workouts/functional-training/',
  academyBecome: '/academy/',
};

const RELATED_LINKS_BY_TRAINER: Record<string, RelatedLinkKey[]> = {
  elif: ['reformer', 'academyTraining', 'prenatal'],
  gokben: ['reformer'],
  goknur: ['reformer', 'strength'],
  gulce: ['reformer', 'academyBecome'],
  lal: ['reformer', 'academyBecome'],
  nisan: ['reformer', 'academyBecome'],
  kelly: ['reformer', 'academyBecome'],
  gamze: ['reformer', 'academyBecome'],
};

export const TrainerDetail= () => {
  const { t } = useTranslation('instructors');
  const { slug } = useParams<{ slug: string }>();
  const page = useLocalizedPage(`/trainer/${slug}/`);
  const { href } = page;
  const trainer = trainersFor(page.locale).find(p => p.slug === slug);

  if (!trainer) {
    return <NotFound />;
  }

  const relatedLinks = (RELATED_LINKS_BY_TRAINER[trainer.slug] ?? []).map((key) => ({
    to: href(RELATED_LINK_PATHS[key]),
    label: t(`detail.links.${key}`),
  }));
  const role = trainer.heroTitle.replace(/\n/g, ' · ');

  return (
    <>
      <SEOHead
        title={trainer.seo.title}
        description={trainer.seo.description}
        keywords={trainer.seo.keywords}
        canonical={page.canonical}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData
        type="Person"
        data={{
          person: {
            name: trainer.name,
            jobTitle: trainer.structuredData.jobTitle,
            image: trainer.image,
            description: trainer.structuredData.description,
            worksFor: 'PT 7 Pilates',
            knowsAbout: trainer.specialties,
            hasCredential: trainer.qualifications,
            sameAs: trainer.slug === 'elif'
              ? ['https://www.instagram.com/pt7amsterdam', 'https://www.polestarpilates.nl/']
              : ['https://www.instagram.com/pt7amsterdam'],
          },
        }}
      />
      <Breadcrumbs items={[
        { name: t('breadcrumb'), path: href('/instructors/') },
        { name: trainer.name, path: page.path },
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
            <p className="trainer-kicker trainer-reveal" style={{ transitionDelay: '80ms' }}>{t('detail.kicker')}</p>
            <h1 className="trainer-reveal" style={{ transitionDelay: '140ms' }}>{trainer.displayName}</h1>
            <p className="trainer-title trainer-reveal" style={{ transitionDelay: '220ms' }}>{role}</p>
            <p className="trainer-meta trainer-reveal" style={{ transitionDelay: '300ms' }}>
              {trainer.languages.join(' · ')}
            </p>
            <div className="trainer-hero-actions trainer-reveal" style={{ transitionDelay: '380ms' }}>
              <Link to={href('/schedule/')} className="trainer-btn-primary">
                {t('detail.bookWith', { name: trainer.displayName.split(' ')[0] })}
              </Link>
              <Link to={href('/pricing/')} className="trainer-btn-secondary">{t('detail.viewPricing')}</Link>
            </div>
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
            <h2 className="trainer-reveal">{t('detail.qualifications')}</h2>
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
              <h2 className="trainer-reveal">{t('detail.related')}</h2>
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
          <h2 className="trainer-reveal">{t('detail.ctaTitle')}</h2>
          <p className="trainer-reveal" style={{ transitionDelay: '80ms' }}>{trainer.ctaText}</p>
          <div className="trainer-cta-buttons trainer-reveal" style={{ transitionDelay: '160ms' }}>
            <Link to={href('/schedule/')} className="trainer-btn-primary">{t('detail.book')}</Link>
            <Link to={href('/pricing/')} className="trainer-btn-secondary">{t('detail.viewPricing')}</Link>
          </div>
        </Reveal>

        <p className="trainer-back">
          <Link to={href('/instructors/')}>{t('detail.back')}</Link>
        </p>
      </div>
    </>
  );
};
