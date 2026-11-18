import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
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
} from '../lib/academyApi';
import { dateLocale } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import { isPrerender } from '../utils/prerender';
import '../styles/AcademyTrainee.css';

// The trainee area (/academy/trainee/): sign in, replace the first password, then the trainee's own progress. Every
// piece of data comes from the PT7 Academy API in the browser; the static page itself holds nothing personal and is
// not indexed. The session is checked once per page load.

type State =
  | { kind: 'loading' }
  | { kind: 'unavailable' }
  | { kind: 'signedOut' }
  | { kind: 'signedIn'; user: SiteUser };

export const AcademyTrainee = () => {
  const { t } = useTranslation('trainee');
  const locale = useLocale();
  const [state, setState] = useState<State>({ kind: 'loading' });

  const load = useCallback(() => {
    setState({ kind: 'loading' });
    getSession()
      .then((s) => setState(s ? { kind: 'signedIn', user: s.user } : { kind: 'signedOut' }))
      .catch(() => setState({ kind: 'unavailable' }));
  }, []);

  useEffect(() => {
    if (isPrerender()) return; // the static shell shows the loading state only
    load();
  }, [load]);

  const leave = () => {
    signOut()
      .catch(() => undefined)
      .finally(() => setState({ kind: 'signedOut' }));
  };

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical="https://www.pt7.nl/academy/trainee/"
        robots="noindex, nofollow"
        omitCanonical
        htmlLang={locale}
        ogLocale={locale === 'nl' ? 'nl_NL' : 'en_US'}
      />
      <section className="trainee">
        <div className="trainee-inner">
          <p className="kicker">{t('kicker')}</p>
          {state.kind === 'loading' && <p role="status">{t('loading')}</p>}
          {state.kind === 'unavailable' && (
            <div className="trainee-card">
              <p>{t('unavailable')}</p>
              <button type="button" className="trainee-secondary" onClick={load}>
                {t('retry')}
              </button>
            </div>
          )}
          {state.kind === 'signedOut' && <SignInForm onSignedIn={(user) => setState({ kind: 'signedIn', user })} />}
          {state.kind === 'signedIn' && state.user.mustChangePassword && (
            <PasswordForm onChanged={() => setState({ kind: 'signedIn', user: { ...state.user, mustChangePassword: false } })} />
          )}
          {state.kind === 'signedIn' && !state.user.mustChangePassword && <Overview user={state.user} onSignOut={leave} />}
        </div>
      </section>
    </>
  );
};

const SIGN_IN_ERRORS = ['InvalidCredentials', 'AccountLocked', 'TooManyRequests', 'NotATrainee'] as const;

function SignInForm({ onSignedIn }: { onSignedIn: (user: SiteUser) => void }) {
  const { t } = useTranslation('trainee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { user } = await signIn(email.trim(), password);
      onSignedIn(user);
    } catch (err) {
      const code = err instanceof ApiError ? err.code : '';
      const known = SIGN_IN_ERRORS.find((c) => c === code);
      setError(known ? t(`signIn.errors.${known}`) : err instanceof ApiError && err.code === 'Unavailable' ? t('unavailable') : t('signIn.errors.other'));
      setBusy(false);
    }
  };

  return (
    <form className="trainee-card trainee-form" onSubmit={submit}>
      <h1>{t('signIn.title')}</h1>
      <p className="trainee-lead">{t('signIn.lead')}</p>
      <label>
        {t('signIn.email')}
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        {t('signIn.password')}
        <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && (
        <p className="trainee-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn-ink" disabled={busy}>
        {busy ? t('signIn.busy') : t('signIn.submit')}
      </button>
    </form>
  );
}

function PasswordForm({ onChanged }: { onChanged: () => void }) {
  const { t } = useTranslation('trainee');
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (next !== confirm) return setError(t('password.mismatch'));
    setBusy(true);
    setError(null);
    try {
      await changePassword(current, next);
      onChanged();
    } catch (err) {
      // The API's own message (wrong current password, rules not met) is the clearest; it is in English
      setError(err instanceof ApiError && err.status === 400 ? err.code : t('password.other'));
      setBusy(false);
    }
  };

  return (
    <form className="trainee-card trainee-form" onSubmit={submit}>
      <h1>{t('password.title')}</h1>
      <p className="trainee-lead">{t('password.lead')}</p>
      <label>
        {t('password.current')}
        <input type="password" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} />
      </label>
      <label>
        {t('password.next')}
        <input type="password" autoComplete="new-password" required minLength={12} value={next} onChange={(e) => setNext(e.target.value)} />
      </label>
      <label>
        {t('password.confirm')}
        <input type="password" autoComplete="new-password" required minLength={12} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </label>
      <p className="trainee-hint">{t('password.rules')}</p>
      {error && (
        <p className="trainee-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn-ink" disabled={busy}>
        {busy ? t('password.busy') : t('password.submit')}
      </button>
    </form>
  );
}

function Overview({ user, onSignOut }: { user: SiteUser; onSignOut: () => void }) {
  const { t } = useTranslation('trainee');
  const locale = useLocale();
  const [certificate, setCertificate] = useState<CertificateStatus | null | undefined>(undefined);
  const [exams, setExams] = useState<{ linked: boolean; exams: MyExam[] } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    Promise.all([getCertificate(), getExams()])
      .then(([c, e]) => {
        setCertificate(c);
        setExams(e);
      })
      .catch(() => setFailed(true));
  }, []);

  const date = (iso: string) => new Date(iso).toLocaleDateString(dateLocale(locale), { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="trainee-overview">
      <div className="trainee-heading">
        <h1>{t('overview.greeting', { name: user.name })}</h1>
        <button type="button" className="trainee-secondary" onClick={onSignOut}>
          {t('overview.signOut')}
        </button>
      </div>

      {failed && <p className="trainee-error">{t('unavailable')}</p>}
      {!failed && exams === null && <p role="status">{t('loading')}</p>}
      {exams && !exams.linked && <p className="trainee-card">{t('overview.notLinked')}</p>}

      {certificate && (
        <section className={`trainee-card${certificate.certificate ? ' trainee-card-done' : ''}`}>
          <h2>{certificate.certificate ? t('overview.certificate.issued') : t('overview.certificate.towards')}</h2>
          {certificate.certificate ? (
            <p>{t('overview.certificate.awarded', { credential: certificate.certificate.credential, number: certificate.certificate.number })}</p>
          ) : (
            <ul className="trainee-requirements">
              {certificate.requirements.map((r) => (
                <li key={r.key} className={r.met ? 'met' : ''}>
                  <span className="trainee-check" aria-label={r.met ? t('overview.certificate.done') : t('overview.certificate.notYet')}>
                    {r.met ? '✓' : ''}
                  </span>
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
          <h2>{t('overview.exams.title')}</h2>
          {exams.exams.length === 0 ? (
            <p>{t('overview.exams.empty')}</p>
          ) : (
            <ul className="trainee-exams">
              {exams.exams.map((exam) => (
                <li key={exam._id}>
                  <span className="trainee-exam-name">{exam.rubricName}</span>
                  <span className="trainee-exam-meta">
                    {date(exam.examDate)} · {t('overview.exams.attempt', { n: String(exam.attempt) })}
                  </span>
                  <span className={`trainee-badge ${exam.passed ? 'passed' : 'not-passed'}`}>
                    {exam.passed ? t('overview.exams.passed') : t('overview.exams.notPassed')}
                  </span>
                  <span className="trainee-score">{t('overview.exams.score', { score: exam.overallScore.toFixed(0) })}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
