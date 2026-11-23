import { useCallback, useEffect, useState } from 'react';
import { ApiError, getMovement, getMovements, handleSessionError, type MovementDetail, type MovementSummary, type SessionHandlers } from './api';
import { MovementPhoto } from './MovementPhoto';
import { seriesHref } from './route';
import { s } from './strings';

// The movement library: the series per Reformer level, and one series with its photos, the book's template and how to
// perform each variation. Trainees only ever get published series (the API's rule).

const LEVELS = [1, 2, 3];

function Retry({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="trainee-card">
      <p>{s.unavailable}</p>
      <button type="button" className="trainee-secondary" onClick={onRetry}>
        {s.retry}
      </button>
    </div>
  );
}

export function LibraryScreen({ slug, handlers }: { slug: string | null; handlers: SessionHandlers }) {
  // Kept here, so coming back from a series returns to the same level
  const [level, setLevel] = useState(1);
  return slug ? <Series key={slug} slug={slug} handlers={handlers} /> : <SeriesList level={level} onLevel={setLevel} handlers={handlers} />;
}

function SeriesList({ level, onLevel, handlers }: { level: number; onLevel: (level: number) => void; handlers: SessionHandlers }) {
  const { onEnded, onPasswordRequired } = handlers;
  const [movements, setMovements] = useState<MovementSummary[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(() => {
    setFailed(false);
    getMovements()
      .then(setMovements)
      .catch((err: unknown) => {
        if (!handleSessionError(err, { onEnded, onPasswordRequired })) setFailed(true);
      });
  }, [onEnded, onPasswordRequired]);

  useEffect(load, [load]);

  if (failed) return <Retry onRetry={load} />;
  if (!movements) return <p role="status">{s.loading}</p>;
  const series = movements.filter((m) => m.level === level);

  return (
    <div>
      <h3>{s.library.title}</h3>
      <p className="trainee-lead">{s.library.lead(movements.length)}</p>
      <div className="trainee-levels" role="group" aria-label={s.library.levels}>
        {LEVELS.map((l) => (
          <button key={l} type="button" aria-pressed={level === l} onClick={() => onLevel(l)}>
            {s.library.reformer(l)}
          </button>
        ))}
      </div>
      {series.length === 0 ? (
        <p className="trainee-card">{s.library.none}</p>
      ) : (
        <ul className="trainee-card trainee-series">
          {series.map((m) => (
            <li key={m.slug}>
              <a href={seriesHref(m.slug)}>
                <MovementPhoto key={m.coverPhotoId ?? 'none'} fileId={m.coverPhotoId} alt="" className="trainee-thumb" />
                <span className="trainee-series-text">
                  <span className="trainee-entry-main">{m.name}</span>
                  <span className="trainee-entry-meta">
                    {m.number} · {s.library.variations(m.variationCount)}
                  </span>
                </span>
                <span aria-hidden="true">›</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Series({ slug, handlers }: { slug: string; handlers: SessionHandlers }) {
  const { onEnded, onPasswordRequired } = handlers;
  const [movement, setMovement] = useState<MovementDetail | null>(null);
  const [error, setError] = useState<'none' | 'notFound' | 'failed'>('none');

  const load = useCallback(() => {
    setError('none');
    getMovement(slug)
      .then((answer) => {
        // A hand-made address such as #library/offline or #library/. reaches another library route
        if (answer?.slug === slug) setMovement(answer);
        else setError('notFound');
      })
      .catch((err: unknown) => {
        if (handleSessionError(err, { onEnded, onPasswordRequired })) return;
        setError(err instanceof ApiError && err.status === 404 ? 'notFound' : 'failed');
      });
  }, [slug, onEnded, onPasswordRequired]);

  useEffect(load, [load]);
  useEffect(() => {
    window.scrollTo(0, 0); // in a block: newer browsers return a promise here, which React would take for a clean-up
  }, []);

  const back = (
    <a className="trainee-back" href="#library">
      ‹ {s.library.back}
    </a>
  );

  if (error === 'notFound') {
    return (
      <div>
        {back}
        <p className="trainee-card">{s.library.notFound}</p>
      </div>
    );
  }
  if (error === 'failed') {
    return (
      <div>
        {back}
        <Retry onRetry={load} />
      </div>
    );
  }
  if (!movement) return <p role="status">{s.loading}</p>;

  const fields = [
    { key: 'setup', label: s.library.setup, text: movement.setup },
    { key: 'regression', label: s.library.regression, text: movement.regression },
    { key: 'progression', label: s.library.progression, text: movement.progression },
    { key: 'modification', label: s.library.modification, text: movement.modification },
    { key: 'contraindication', label: s.library.contraindication, text: movement.contraindication },
  ].filter((f) => f.text);
  const variations = movement.variations.filter((v) => v.name || v.howToPerform);

  return (
    <article>
      {back}
      <p className="kicker">{s.library.seriesOf(movement.level, movement.number)}</p>
      <h3 className="trainee-series-title">{movement.name}</h3>

      {movement.photos.length > 0 && (
        <ul className="trainee-photos" tabIndex={0} aria-label={s.library.photos}>
          {movement.photos.map((p, i) => (
            <li key={p.fileId}>
              <MovementPhoto fileId={p.fileId} alt={p.caption || s.library.photoOf(i + 1, movement.photos.length)} className="trainee-photo-large" />
              {p.caption && <span className="trainee-entry-meta">{p.caption}</span>}
            </li>
          ))}
        </ul>
      )}

      {fields.length > 0 && (
        <dl className="trainee-card trainee-fields">
          {fields.map((f) => (
            <div key={f.key} className={f.key === 'contraindication' ? 'trainee-warning' : undefined}>
              <dt>{f.label}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </dl>
      )}

      {variations.length > 0 && (
        <section className="trainee-card">
          <h3>{s.library.howTo}</h3>
          <ul className="trainee-entries">
            {variations.map((v, i) => (
              <li key={i} className="trainee-variation">
                {v.name && <span className="trainee-entry-main">{v.name}</span>}
                {v.howToPerform && <span>{v.howToPerform}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
