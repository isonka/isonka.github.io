import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import {
  ApiError,
  changePassword,
  getCertificate,
  getExams,
  getSession,
  signIn,
  signOut,
  type CertificateStatus,
  type MyExam,
  type SiteUser,
} from './api';
import { s } from './strings';

// The trainee area: sign in, replace the first password, then the trainee's own progress. All data comes from the
// PT7 Academy API in the browser (same address, /api); the static page holds nothing personal. The session is checked
// once per page load.

type View =
  | { kind: 'loading' }
  | { kind: 'unavailable' }
  | { kind: 'signedOut'; notice?: string }
  | { kind: 'signedIn'; user: SiteUser };

/** The API is up but website sign-in is switched off (SITE_SESSION_SECRET not set): nothing to offer yet. */
const isOff = (err: unknown) => err instanceof ApiError && err.status === 503;
/** The API could not be reached (network, or a host without /api). */
const isUnreachable = (err: unknown) => err instanceof ApiError && err.code === 'Unavailable';

export function TraineeApp() {
  const [view, setView] = useState<View>({ kind: 'loading' });
  // Move focus to the new view's heading after the trainee did something (not on the first load)
  const [moved, setMoved] = useState(false);
  const go = useCallback((next: View) => {
    setMoved(true);
    setView(next);
  }, []);
  // Stable, so the overview's data load runs once (it depends on these)
  const ended = useCallback(() => go({ kind: 'signedOut', notice: s.signIn.ended }), [go]);
  const passwordRequired = useCallback(
    () => setView((v) => (v.kind === 'signedIn' ? { kind: 'signedIn', user: { ...v.user, mustChangePassword: true } } : v)),
    [],
  );

  const load = useCallback(() => {
    setView({ kind: 'loading' });
    getSession()
      .then((session) => setView(session ? { kind: 'signedIn', user: session.user } : { kind: 'signedOut' }))
      .catch(() => setView({ kind: 'unavailable' }));
  }, []);

  useEffect(load, [load]);

  return (
    <>
      <header className="trainee-top">
        <a href="https://pt7.nl/" className="trainee-brand" aria-label={s.backToSite}>
          PT7
        </a>
      </header>
      <main className="trainee">
        <div className="trainee-inner">
          <p className="kicker">{s.kicker}</p>
          <h1>{s.title}</h1>
          {view.kind === 'loading' && <p role="status">{s.loading}</p>}
          {view.kind === 'unavailable' && (
            <div className="trainee-card">
              <p>{s.unavailable}</p>
              <button type="button" className="trainee-secondary" onClick={load}>
                {s.retry}
              </button>
            </div>
          )}
          {view.kind === 'signedOut' && (
            <SignInForm
              focus={moved}
              notice={view.notice}
              onSignedIn={(user) => go({ kind: 'signedIn', user })}
              onOff={() => go({ kind: 'unavailable' })}
            />
          )}
          {view.kind === 'signedIn' && view.user.mustChangePassword && (
            <PasswordForm
              focus={moved}
              onChanged={() => go({ kind: 'signedIn', user: { ...view.user, mustChangePassword: false } })}
              onEnded={ended}
            />
          )}
          {view.kind === 'signedIn' && !view.user.mustChangePassword && (
            <Overview
              focus={moved}
              user={view.user}
              onSignedOut={() => go({ kind: 'signedOut' })}
              onEnded={ended}
              onPasswordRequired={passwordRequired}
            />
          )}
        </div>
      </main>
    </>
  );
}

/** A heading that takes focus when the view changed after an action, so screen readers follow along. */
function ViewHeading({ text, focus }: { text: string; focus: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (focus) ref.current?.focus();
  }, [focus]);
  return (
    <h2 ref={ref} tabIndex={-1}>
      {text}
    </h2>
  );
}

function ErrorText({ id, text }: { id: string; text: string | null }) {
  return text ? (
    <p id={id} className="trainee-error" role="alert">
      {text}
    </p>
  ) : null;
}

function SignInForm({ focus, notice, onSignedIn, onOff }: { focus: boolean; notice?: string; onSignedIn: (user: SiteUser) => void; onOff: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { user } = await signIn(email.trim(), password);
      onSignedIn(user);
    } catch (err) {
      if (isOff(err)) return onOff();
      const code = err instanceof ApiError ? err.code : '';
      setError(isUnreachable(err) ? s.unavailable : (s.signIn.errors[code] ?? s.signIn.errors.other)); // keeps the typed email
      setBusy(false);
    }
  };

  const invalid = error ? { 'aria-invalid': true, 'aria-describedby': errorId } : {};
  return (
    <form className="trainee-card trainee-form" onSubmit={submit}>
      <ViewHeading text={s.signIn.title} focus={focus} />
      {notice && <p className="trainee-notice">{notice}</p>}
      <p className="trainee-lead">{s.signIn.lead}</p>
      <label>
        {s.signIn.email}
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} {...invalid} />
      </label>
      <label>
        {s.signIn.password}
        <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} {...invalid} />
      </label>
      <ErrorText id={errorId} text={error} />
      <button type="submit" className="btn-ink" disabled={busy}>
        {busy ? s.signIn.busy : s.signIn.submit}
      </button>
    </form>
  );
}

function PasswordForm({ focus, onChanged, onEnded }: { focus: boolean; onChanged: () => void; onEnded: () => void }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rulesId = useId();
  const errorId = useId();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (next !== confirm) return setError(s.password.mismatch);
    setBusy(true);
    setError(null);
    try {
      await changePassword(current, next);
      onChanged();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return onEnded();
      // The API's own message (wrong current password, rules not met) is the clearest; it is in English
      setError(err instanceof ApiError && err.status === 400 ? err.code : s.password.other);
      setBusy(false);
    }
  };

  const describedBy = error ? `${rulesId} ${errorId}` : rulesId;
  return (
    <form className="trainee-card trainee-form" onSubmit={submit}>
      <ViewHeading text={s.password.title} focus={focus} />
      <p className="trainee-lead">{s.password.lead}</p>
      <label>
        {s.password.current}
        <input type="password" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} />
      </label>
      <label>
        {s.password.next}
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={12}
          value={next}
          onChange={(e) => setNext(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
        />
      </label>
      <label>
        {s.password.confirm}
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={12}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
        />
      </label>
      <p id={rulesId} className="trainee-hint">
        {s.password.rules}
      </p>
      <ErrorText id={errorId} text={error} />
      <button type="submit" className="btn-ink" disabled={busy}>
        {busy ? s.password.busy : s.password.submit}
      </button>
    </form>
  );
}

const dateText = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

function Overview({
  focus,
  user,
  onSignedOut,
  onEnded,
  onPasswordRequired,
}: {
  focus: boolean;
  user: SiteUser;
  onSignedOut: () => void;
  onEnded: () => void;
  onPasswordRequired: () => void;
}) {
  const [certificate, setCertificate] = useState<CertificateStatus | null>(null);
  const [exams, setExams] = useState<{ linked: boolean; exams: MyExam[] } | null>(null);
  const [failed, setFailed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(false);

  const load = useCallback(() => {
    setFailed(false);
    Promise.all([getCertificate(), getExams()])
      .then(([c, e]) => {
        setCertificate(c);
        setExams(e);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) return onEnded(); // revoked or expired meanwhile
        if (err instanceof ApiError && err.code === 'Password change required') return onPasswordRequired();
        setFailed(true);
      });
  }, [onEnded, onPasswordRequired]);

  useEffect(load, [load]);

  // Only show "signed out" once the API has removed the cookie (the page can't: it is HttpOnly)
  const leave = () => {
    setLeaving(true);
    setLeaveError(false);
    signOut()
      .then(onSignedOut)
      .catch(() => {
        setLeaveError(true);
        setLeaving(false);
      });
  };

  return (
    <div className="trainee-overview">
      <div className="trainee-heading">
        <ViewHeading text={s.overview.greeting(user.name)} focus={focus} />
        <button type="button" className="trainee-secondary" onClick={leave} disabled={leaving}>
          {s.overview.signOut}
        </button>
      </div>
      {leaveError && (
        <p className="trainee-error" role="alert">
          {s.overview.signOutFailed}
        </p>
      )}

      {failed && (
        <div className="trainee-card">
          <p>{s.unavailable}</p>
          <button type="button" className="trainee-secondary" onClick={load}>
            {s.retry}
          </button>
        </div>
      )}
      {!failed && exams === null && <p role="status">{s.loading}</p>}
      {exams && !exams.linked && <p className="trainee-card">{s.overview.notLinked}</p>}

      {certificate && (
        <section className={`trainee-card${certificate.certificate ? ' trainee-card-done' : ''}`}>
          <h3>{certificate.certificate ? s.overview.certificate.issued : s.overview.certificate.towards}</h3>
          {certificate.certificate ? (
            <p>{s.overview.certificate.awarded(certificate.certificate.credential, certificate.certificate.number)}</p>
          ) : (
            <ul className="trainee-requirements">
              {certificate.requirements.map((r) => (
                <li key={r.key} className={r.met ? 'met' : ''}>
                  <span className="trainee-check" aria-hidden="true">
                    {r.met ? '✓' : ''}
                  </span>
                  <span className="visually-hidden">{r.met ? s.overview.certificate.done : s.overview.certificate.notYet}: </span>
                  <span className="trainee-requirement-label">{r.label}</span>
                  <span className="trainee-requirement-detail">{r.detail}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {exams?.linked && (
        <section className="trainee-card">
          <h3>{s.overview.exams.title}</h3>
          {exams.exams.length === 0 ? (
            <p>{s.overview.exams.empty}</p>
          ) : (
            <ul className="trainee-exams">
              {exams.exams.map((exam) => (
                <li key={exam._id}>
                  <span className="trainee-exam-name">{exam.rubricName}</span>
                  <span className="trainee-exam-meta">
                    {dateText(exam.examDate)} · {s.overview.exams.attempt(exam.attempt)}
                  </span>
                  <span className={`trainee-badge ${exam.passed ? 'passed' : 'not-passed'}`}>
                    {exam.passed ? s.overview.exams.passed : s.overview.exams.notPassed}
                  </span>
                  <span className="trainee-score">{s.overview.exams.score(exam.overallScore)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
