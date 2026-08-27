import { Link } from 'react-router-dom';
import { academyGraduates } from '../data/academy';

type AcademyGraduatesProps = {
  locale: 'en' | 'nl';
};

export const AcademyGraduates: React.FC<AcademyGraduatesProps> = ({ locale }) => {
  const isNl = locale === 'nl';
  const heading = isNl ? 'Afgestudeerden van PT7 Academy' : 'PT7 Academy graduates';
  const intro = isNl
    ? 'E. Gamze Karadağ, Kelly Tin, Nisan Atalay, Lal Avgen en Gülce Koç rondden de Reformer-opleiding af en lesgeven nu bij PT Studio 7.'
    : 'E. Gamze Karadağ, Kelly Tin, Nisan Atalay, Lal Avgen, and Gülce Koç completed the Reformer instructor course and now teach at PT Studio 7.';

  return (
    <section className="academy-graduates" aria-labelledby="academy-graduates-heading">
      <div className="academy-container">
        <p className="academy-kicker">{isNl ? 'Afgestudeerden' : 'Graduates'}</p>
        <h2 id="academy-graduates-heading">{heading}</h2>
        <p className="academy-graduates-intro">{intro}</p>
        <ul className="academy-graduates-grid">
          {academyGraduates.map((grad) => {
            const outcome = isNl ? grad.outcomeNl : grad.outcomeEn;
            const inner = (
              <>
                <img
                  src={grad.image}
                  alt={isNl ? `${grad.name}, instructeur bij PT Studio 7` : `${grad.name}, instructor at PT Studio 7`}
                  width={280}
                  height={350}
                  loading="lazy"
                />
                <div className="academy-graduate-meta">
                  <h3>{grad.name}</h3>
                  <p>{outcome}</p>
                </div>
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
