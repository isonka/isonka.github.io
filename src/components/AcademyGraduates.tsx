import { Link } from 'react-router-dom';
import { academyGraduates } from '../data/academy';
import { PHOTO_FOCUS } from '../data/photoFocus';
import type { Locale } from '../i18n/locale';

type AcademyGraduatesProps = {
  locale: Locale;
};

export const AcademyGraduates = ({ locale }: AcademyGraduatesProps) => {
  const isNl = locale === 'nl';
  const heading = isNl ? 'Afgestudeerden van PT7 Academy' : 'PT7 Academy graduates';
  const intro = isNl
    ? 'E. Gamze Karadağ, Kelly Tin, Nisan Atalay, Lal Avgen en Gülce Koç rondden de Reformer-opleiding af en lesgeven nu bij PT7.'
    : 'E. Gamze Karadağ, Kelly Tin, Nisan Atalay, Lal Avgen, and Gülce Koç completed the Reformer instructor course and now teach at PT7.';

  return (
    <section className="academy-graduates" aria-labelledby="academy-graduates-heading">
      <div className="academy-container">
        <p className="academy-kicker">{isNl ? 'Afgestudeerden' : 'Graduates'}</p>
        <h2 id="academy-graduates-heading">
          {heading.split(' ').slice(0, -1).join(' ')} <b>{heading.split(' ').slice(-1)[0]}</b>
        </h2>
        <p className="academy-graduates-intro">{intro}</p>
        <ul className="academy-graduates-grid">
          {academyGraduates.map((grad) => {
            const outcome = isNl ? grad.outcomeNl : grad.outcomeEn;
            const slug = grad.href?.replace(/^\/trainer\//, '').replace(/\/$/, '') ?? '';
            const inner = (
              <>
                <span className="academy-graduate-media">
                  <img
                    src={grad.image}
                    alt={isNl ? `${grad.name}, instructeur bij PT7` : `${grad.name}, instructor at PT7`}
                    width={280}
                    height={350}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: PHOTO_FOCUS[slug] ?? '50% 20%' }}
                  />
                </span>
                <span className="academy-graduate-meta">
                  <span className="lane-stripe lane-stripe-sm lane-pilates" aria-hidden="true" />
                  <span className="academy-graduate-copy">
                    <span className="academy-graduate-name">{grad.name}</span>
                    <span className="academy-graduate-role">{outcome}</span>
                  </span>
                </span>
              </>
            );

            return (
              <li key={grad.name} className="academy-graduate-card">
                {grad.href ? (
                  <Link to={grad.href} className="academy-graduate-link">
                    {inner}
                  </Link>
                ) : (
                  <div className="academy-graduate-link academy-graduate-link--static">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
