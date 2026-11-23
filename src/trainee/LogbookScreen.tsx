import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError, getLogbook, handleSessionError, type Logbook, type SessionHandlers } from './api';
import { CategoryLog } from './LogbookHours';
import { ExerciseCheckIn, HomeworkList } from './LogbookChecklists';
import { hoursText } from './logbookText';
import { s } from './strings';

// The trainee's logbook: totals, one card per log, and the selected log below. The same rules as the app and the API;
// the API checks every save. Loaded only when this screen opens, because the answer reads the whole logbook.

type LoadError = 'none' | 'notLinked' | 'failed';

export function LogbookScreen(handlers: SessionHandlers) {
  const { onEnded, onPasswordRequired } = handlers;
  const [logbook, setLogbook] = useState<Logbook | null>(null);
  const [error, setError] = useState<LoadError>('none');
  const [selected, setSelected] = useState('observation');
  const latest = useRef(0); // a slow older answer must not replace a newer one
  const detail = useRef<HTMLDivElement>(null);

  // On a phone the chosen log is far below the cards: go there, so the tap visibly does something
  const choose = (key: string) => {
    setSelected(key);
    requestAnimationFrame(() => {
      detail.current?.scrollIntoView({ block: 'start' });
      detail.current?.focus({ preventScroll: true });
    });
  };

  const load = useCallback(() => {
    const request = ++latest.current;
    return getLogbook()
      .then((data) => {
        if (request !== latest.current) return;
        setLogbook(data);
        setError('none');
      })
      .catch((err: unknown) => {
        if (request !== latest.current) return;
        if (handleSessionError(err, { onEnded, onPasswordRequired })) return;
        setError(err instanceof ApiError && err.status === 403 ? 'notLinked' : 'failed');
      });
  }, [onEnded, onPasswordRequired]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!logbook) {
    if (error === 'notLinked') return <p className="trainee-card">{s.logbook.notLinked}</p>;
    if (error === 'failed') {
      return (
        <div className="trainee-card">
          <p>{s.unavailable}</p>
          <button type="button" className="trainee-secondary" onClick={() => void load()}>
            {s.retry}
          </button>
        </div>
      );
    }
    return <p role="status">{s.loading}</p>;
  }

  const { programme, trainee, summary } = logbook;
  const daysLeft = trainee.studioAccess.daysLeft;
  const category = summary.categories.find((c) => c.key === selected);
  const homeworkDone = summary.homework.filter((h) => h.status === 'approved').length;
  const performing = summary.exercises.filter((e) => e.performing === 'approved').length;
  const teaching = summary.exercises.filter((e) => e.teaching === 'approved').length;
  const change = () => void load();

  return (
    <div className="trainee-logbook">
      <h3>{s.logbook.title}</h3>
      <p className="trainee-lead">
        {programme.name} · {s.logbook.qtt(programme.qttName)}
      </p>
      {error !== 'none' && (
        <p className="trainee-error" role="alert">
          {s.logbook.stale}
        </p>
      )}

      <div className="trainee-stats">
        <div className="trainee-card">
          <span className="trainee-stat-label">{s.logbook.hoursSigned}</span>
          <strong>
            {hoursText(summary.countedHours)} / {summary.totalRequired}
          </strong>
        </div>
        <div className="trainee-card">
          <span className="trainee-stat-label">{s.logbook.studioLeft}</span>
          <strong>{daysLeft === null ? s.logbook.noStartDate : s.logbook.days(daysLeft)}</strong>
        </div>
      </div>

      <div className="trainee-log-picker">
        {summary.categories.map((c) => (
          <button key={c.key} type="button" className="trainee-log-card" aria-pressed={selected === c.key} onClick={() => choose(c.key)}>
            <span className="trainee-log-name">{c.name}</span>
            <span className="trainee-log-hours">{s.logbook.ofHours(hoursText(c.approved), c.required)}</span>
            <span className="trainee-progress" aria-hidden="true">
              <span style={{ width: `${Math.min(100, Math.round((c.approved / c.required) * 100))}%` }} />
            </span>
            <span className="trainee-log-meta">{c.pending ? s.logbook.waiting(hoursText(c.pending)) : s.logbook.nothingWaiting}</span>
          </button>
        ))}
        <button type="button" className="trainee-log-card" aria-pressed={selected === 'homework'} onClick={() => choose('homework')}>
          <span className="trainee-log-name">{s.logbook.homework.title}</span>
          <span className="trainee-log-meta">{s.logbook.homework.summary(homeworkDone, summary.homework.length)}</span>
        </button>
        <button type="button" className="trainee-log-card" aria-pressed={selected === 'exercises'} onClick={() => choose('exercises')}>
          <span className="trainee-log-name">{s.logbook.exercises.title}</span>
          <span className="trainee-log-meta">{s.logbook.exercises.summary(performing, teaching, summary.exercises.length)}</span>
        </button>
      </div>

      <div ref={detail} tabIndex={-1} className="trainee-log-detail">
        {category && <CategoryLog key={category.key} logbook={logbook} category={category} handlers={handlers} onChange={change} />}
        {selected === 'homework' && <HomeworkList logbook={logbook} handlers={handlers} onChange={change} />}
        {selected === 'exercises' && <ExerciseCheckIn logbook={logbook} handlers={handlers} onChange={change} />}
      </div>
    </div>
  );
}
