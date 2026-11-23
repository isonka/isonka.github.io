import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ApiError,
  getTheoryAttempt,
  handleSessionError,
  saveTheoryAnswer,
  startTheory,
  submitTheory,
  type SessionHandlers,
  type TheoryView,
} from './api';
import { s } from './strings';

// The theory exam: intro and Start, one question at a time with a timer, then the score. The server owns the clock: it
// draws the questions, saves each answer and hands the exam in itself once the time and a short grace period are over.
// This page never hands in because of its own clock, because a wrong device clock would end the exam early.

const POLL_AT_ZERO_MS = 5000;
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const attemptText = (n: number) => s.overview.exams.attempt(n);

/** 38:05, or 1:02:00 above an hour. */
function clock(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const rest = String(seconds % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${rest}` : `${m}:${rest}`;
}

function useCountdown(deadline: string | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!deadline) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [deadline]);
  return deadline ? Math.max(0, Math.ceil((new Date(deadline).getTime() - now) / 1000)) : null;
}

// Leaving the page during the exam is counted, as in the app. Exams are taken in class, so nothing is blocked. The count
// stays in this browser, per attempt: the API has no field for it yet.
const leftKey = (id: string) => `pt7-theory-left:${id}`;

function readLeft(id: string) {
  try {
    const n = Number(localStorage.getItem(leftKey(id)));
    return Number.isInteger(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

function writeLeft(id: string, n: number) {
  try {
    localStorage.setItem(leftKey(id), String(n));
  } catch {
    // Private mode: the count lasts until the page closes
  }
}

const leftText = (n: number) => (n === 1 ? s.theory.leftOne : s.theory.leftMany(n));

export function TheoryScreen({ id, handlers }: { id: string; handlers: SessionHandlers }) {
  const { onEnded, onPasswordRequired } = handlers;
  const [view, setView] = useState<TheoryView | null>(null);
  const [loadError, setLoadError] = useState<'none' | 'notFound' | 'failed'>('none');
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState('');
  const [notSaved, setNotSaved] = useState(false);
  const latest = useRef(0); // a slow older answer must not replace a newer one
  const choices = useRef(0); // a load that started before a choice must not undo it on screen
  const saving = useRef<Promise<void>>(Promise.resolve()); // answers go to the server one at a time, in order
  const versions = useRef(new Map<number, number>());
  const confirmed = useRef(new Map<number, number | null>());

  const load = useCallback(async () => {
    const request = ++latest.current;
    await saving.current;
    const choicesAtStart = choices.current;
    try {
      const next = await getTheoryAttempt(id);
      if (request !== latest.current) return;
      if (next.status === 'in_progress' && choicesAtStart !== choices.current) return;
      confirmed.current = new Map(next.questions.map((q, i) => [i, q.answer]));
      setView(next);
      setLoadError('none');
    } catch (err) {
      if (request !== latest.current) return;
      if (handleSessionError(err, { onEnded, onPasswordRequired })) return;
      setLoadError(err instanceof ApiError && err.status === 404 ? 'notFound' : 'failed');
    }
  }, [id, onEnded, onPasswordRequired]);

  useEffect(() => {
    void load();
  }, [load]);

  const start = async () => {
    setBusy(true);
    setActionError('');
    try {
      const next = await startTheory(id);
      confirmed.current = new Map(next.questions.map((q, i) => [i, q.answer]));
      setView(next);
    } catch (err) {
      if (!handleSessionError(err, { onEnded, onPasswordRequired })) {
        if (err instanceof ApiError && err.status === 409) void load(); // already started, e.g. on another device
        else setActionError(s.theory.startFailed);
      }
    }
    setBusy(false);
  };

  /** Shown at once and sent in order. A newer choice for the same question replaces one not sent yet. */
  const choose = (index: number, answer: number) => {
    choices.current++;
    const version = (versions.current.get(index) ?? 0) + 1;
    versions.current.set(index, version);
    const show = (value: number | null) =>
      setView((v) => (v ? { ...v, questions: v.questions.map((q, i) => (i === index ? { ...q, answer: value } : q)) } : v));
    show(answer);
    saving.current = saving.current.then(async () => {
      if (versions.current.get(index) !== version) return;
      try {
        await saveTheoryAnswer(id, index, answer);
        confirmed.current.set(index, answer);
        if (versions.current.get(index) === version) setNotSaved(false);
      } catch (err) {
        if (handleSessionError(err, { onEnded, onPasswordRequired })) return;
        if (err instanceof ApiError && err.status === 409) {
          void load(); // time is up: the exam was handed in
        } else if (versions.current.get(index) === version) {
          show(confirmed.current.get(index) ?? null);
          setNotSaved(true);
        }
      }
    });
  };

  const handIn = async () => {
    setBusy(true);
    setActionError('');
    await saving.current;
    try {
      setView(await submitTheory(id));
    } catch (err) {
      if (!handleSessionError(err, { onEnded, onPasswordRequired })) {
        if (err instanceof ApiError && err.status === 409) void load();
        else setActionError(s.theory.handInFailed);
      }
    }
    setBusy(false);
  };

  const back = (
    <a className="trainee-back" href="#overview">
      ‹ {s.nav.overview}
    </a>
  );

  if (!view) {
    if (loadError === 'notFound') {
      return (
        <div>
          {back}
          <p className="trainee-card">{s.theory.notFound}</p>
        </div>
      );
    }
    if (loadError === 'failed') {
      return (
        <div>
          {back}
          <div className="trainee-card">
            <p>{s.unavailable}</p>
            <button type="button" className="trainee-secondary" onClick={() => void load()}>
              {s.retry}
            </button>
          </div>
        </div>
      );
    }
    return <p role="status">{s.loading}</p>;
  }

  if (view.status === 'in_progress' && view.questions.length > 0) {
    return (
      <Running
        key={view._id}
        view={view}
        busy={busy}
        notSaved={notSaved}
        actionError={actionError}
        onChoose={choose}
        onHandIn={() => void handIn()}
        onRefresh={load}
      />
    );
  }

  if (view.status === 'submitted') return <Result view={view} back={back} />;

  return (
    <div>
      {back}
      <p className="kicker">{s.theory.eyebrow(attemptText(view.attempt))}</p>
      <h3 className="trainee-series-title">{view.name}</h3>
      <dl className="trainee-card trainee-fields">
        <div>
          <dt>{s.theory.questions(view.questionCount)}</dt>
          <dd>{s.theory.questionsMeta}</dd>
        </div>
        <div>
          <dt>{s.theory.minutes(view.timeLimitMinutes)}</dt>
          <dd>{s.theory.minutesMeta}</dd>
        </div>
        <div>
          <dt>{s.theory.passMark(view.passMark)}</dt>
          <dd>{s.theory.passMarkMeta}</dd>
        </div>
      </dl>
      <p className="trainee-lead">
        {s.theory.onlineOnly} {s.theory.leaveRule}
      </p>
      {actionError && (
        <p className="trainee-error" role="alert">
          {actionError}
        </p>
      )}
      <button type="button" className="btn-ink" disabled={busy} onClick={() => void start()}>
        {busy ? s.theory.starting : s.theory.start}
      </button>
    </div>
  );
}

function Result({ view, back }: { view: TheoryView; back: React.ReactNode }) {
  const score = view.score ?? 0;
  const left = readLeft(view._id);
  return (
    <div>
      {back}
      <p className="kicker">{s.theory.eyebrow(attemptText(view.attempt))}</p>
      <h3 className="trainee-series-title">{s.theory.handedIn}</h3>
      <section className="trainee-card">
        <div className="trainee-score-row">
          <strong>{score}%</strong>
          <span className="trainee-entry-meta">{s.theory.scoreOf(view.correctCount ?? 0, view.questionCount, view.passMark)}</span>
          <span className={`trainee-badge ${view.passed ? 'passed' : 'not-passed'}`}>{view.passed ? s.overview.exams.passed : s.overview.exams.notPassed}</span>
        </div>
        <span className="trainee-progress trainee-progress-mark" aria-hidden="true">
          <span style={{ width: `${Math.min(100, score)}%` }} />
          <i style={{ left: `${view.passMark}%` }} />
        </span>
        {left > 0 && <p className="trainee-error trainee-spaced">{leftText(left)}</p>}
      </section>
      <p className="trainee-lead">{s.theory.noCorrectAnswers}</p>
    </div>
  );
}

function Running({
  view,
  busy,
  notSaved,
  actionError,
  onChoose,
  onHandIn,
  onRefresh,
}: {
  view: TheoryView;
  busy: boolean;
  notSaved: boolean;
  actionError: string;
  onChoose: (index: number, answer: number) => void;
  onHandIn: () => void;
  onRefresh: () => Promise<void>;
}) {
  const [index, setIndex] = useState(() => Math.max(0, view.questions.findIndex((q) => q.answer === null)));
  const [gridOpen, setGridOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [left, setLeft] = useState(() => readLeft(view._id));
  const [warned, setWarned] = useState(false);
  const seconds = useCountdown(view.deadline);
  const timeUp = seconds === 0;

  // Leaving is counted; on return the server may have handed the exam in meanwhile
  useEffect(() => {
    // A reload also hides the page, right after `pagehide`: that isn't leaving the exam
    let unloading = false;
    const onPageHide = () => {
      unloading = true;
    };
    const onPageShow = () => {
      unloading = false;
    };
    const onChange = () => {
      if (document.visibilityState === 'hidden') {
        if (unloading) return;
        const n = readLeft(view._id) + 1;
        writeLeft(view._id, n);
        setLeft(n);
        setWarned(true);
      } else {
        void onRefresh();
      }
    };
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);
    document.addEventListener('visibilitychange', onChange);
    return () => {
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onChange);
    };
  }, [view._id, onRefresh]);

  // At zero the server hands the exam in (after its grace period): keep asking until it has
  useEffect(() => {
    if (!timeUp) return;
    void onRefresh();
    const timer = setInterval(() => void onRefresh(), POLL_AT_ZERO_MS);
    return () => clearInterval(timer);
  }, [timeUp, onRefresh]);

  const n = view.questions.length;
  const current = Math.min(index, n - 1);
  const q = view.questions[current];
  const answered = view.questions.filter((x) => x.answer !== null).length;
  const open = n - answered;
  const last = current === n - 1;
  const urgent = seconds !== null && seconds < 300;
  const go = (i: number) => {
    setIndex(i);
    setConfirming(false);
  };

  return (
    <div className="trainee-theory">
      <div className="trainee-heading">
        <div>
          <p className="kicker trainee-tight">{s.theory.questionOf(current + 1, n)}</p>
          <h3 className="trainee-tight">{view.name}</h3>
        </div>
        {seconds !== null && (
          <span className={`trainee-timer${urgent ? ' urgent' : ''}`} role="timer" aria-label={s.theory.timeLeft(clock(seconds))}>
            {clock(seconds)}
          </span>
        )}
      </div>

      <div className="trainee-theory-progress">
        <span className="trainee-entry-meta">{s.theory.answeredOf(answered, n)}</span>
        <button type="button" className="trainee-link" aria-expanded={gridOpen} onClick={() => setGridOpen(!gridOpen)}>
          {s.theory.allQuestions}
        </button>
      </div>
      <span className="trainee-progress" aria-hidden="true">
        <span style={{ width: `${(answered / n) * 100}%` }} />
      </span>

      {timeUp && <p className="trainee-notice trainee-spaced" role="status">{s.theory.timeUp}</p>}
      {left > 0 && <p className="trainee-error trainee-spaced">{leftText(left)}</p>}
      {warned && (
        <div className="trainee-card trainee-spaced" role="alert">
          <p className="trainee-entry-main">{s.theory.leftTitle}</p>
          <p>{s.theory.leftWarning}</p>
          <button type="button" className="trainee-secondary" onClick={() => setWarned(false)}>
            {s.theory.backToExam}
          </button>
        </div>
      )}

      {gridOpen && (
        <div className="trainee-grid trainee-spaced">
          {view.questions.map((x, i) => (
            <button
              key={i}
              type="button"
              className={`${x.answer !== null ? 'done' : ''}${i === current ? ' current' : ''}`}
              aria-current={i === current ? 'true' : undefined}
              aria-label={s.theory.questionN(i + 1, x.answer !== null)}
              onClick={() => {
                go(i);
                setGridOpen(false);
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <section className="trainee-question">
        <p id="trainee-question-text" className="trainee-question-text">
          {q.text}
        </p>
        <div className="trainee-card trainee-options" role="radiogroup" aria-labelledby="trainee-question-text">
          {q.options.map((option, j) => (
            <button key={j} type="button" role="radio" aria-checked={q.answer === j} onClick={() => onChoose(current, j)}>
              <span className="trainee-letter" aria-hidden="true">
                {LETTERS[j] ?? j + 1}
              </span>
              <span>{option}</span>
            </button>
          ))}
        </div>
        {notSaved && (
          <p className="trainee-error" role="alert">
            {s.theory.notSaved}
          </p>
        )}
      </section>

      {confirming ? (
        <div className="trainee-card trainee-spaced" role="alertdialog" aria-label={s.theory.handInTitle}>
          <p className="trainee-entry-main">{s.theory.handInTitle}</p>
          <p>
            {open > 0 ? `${s.theory.notAnswered(open)} ` : ''}
            {s.theory.handInFinal}
          </p>
          {actionError && (
            <p className="trainee-error" role="alert">
              {actionError}
            </p>
          )}
          <div className="trainee-actions">
            <button type="button" className="btn-ink" disabled={busy} onClick={onHandIn}>
              {busy ? s.theory.handingIn : s.theory.handIn}
            </button>
            <button type="button" className="trainee-secondary" disabled={busy} onClick={() => setConfirming(false)}>
              {s.logbook.form.cancel}
            </button>
          </div>
        </div>
      ) : (
        <div className="trainee-actions trainee-spaced">
          <button type="button" className="trainee-secondary" disabled={current === 0} onClick={() => go(current - 1)}>
            {s.theory.previous}
          </button>
          {!last && (
            <button type="button" className="btn-ink" onClick={() => go(current + 1)}>
              {s.theory.next}
            </button>
          )}
          <button type="button" className={last ? 'btn-ink' : 'trainee-secondary'} disabled={busy} onClick={() => setConfirming(true)}>
            {s.theory.handIn}
          </button>
        </div>
      )}
    </div>
  );
}
