import { useEffect, useState, type FormEvent } from 'react';
import { SEOHead } from '../components/SEOHead';
import { useLocale } from '../i18n/useLocale';
import { trackPageView } from '../utils/gtmTracking';
import { isPrerender } from '../utils/prerender';
import '../styles/AcademyPractice.css';

const WIDGET_SRC = 'https://brandedweb.mindbodyonline.com/embed/widget.js';
const AUTH_COOKIE = 'pt7-academy-practice';
const AUTH_MAX_AGE = 60 * 60 * 24 * 30;
const PRACTICE_USER = 'pt7academy';
const PRACTICE_PASSWORD = 'gRaduatE2026';

const hasPracticeCookie = () =>
  document.cookie.split(';').some((part) => part.trim() === `${AUTH_COOKIE}=1`);

const setPracticeCookie = () => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${AUTH_COOKIE}=1; Max-Age=${AUTH_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
};

const copy = {
  en: {
    title: 'Book studio practice | PT7 Academy',
    description:
      'Academy students book the PT7 studio for observation, self practice, and teaching practice.',
    kicker: 'PT7 Academy students',
    heading: 'Book studio practice',
    lead: 'Book the studio for observation, self practice, and teaching practice. Studio use is free for 1 year from your course start date.',
    gate: 'Sign in with the details sent to academy students.',
    username: 'Username',
    password: 'Password',
    submit: 'Continue',
    error: 'Those details are not recognised.',
  },
  nl: {
    title: 'Studio boeken voor oefenen | PT7 Academy',
    description:
      'Academy-studenten boeken de PT7-studio voor observatie, zelfpraktijk en lespraktijk.',
    kicker: 'Studenten van PT7 Academy',
    heading: 'Studio boeken voor oefenen',
    lead: 'Boek de studio voor observatie, zelfpraktijk en lespraktijk. Gebruik van de studio is kosteloos gedurende 1 jaar vanaf de startdatum van je cursus.',
    gate: 'Log in met de gegevens die academy-studenten hebben ontvangen.',
    username: 'Gebruikersnaam',
    password: 'Wachtwoord',
    submit: 'Doorgaan',
    error: 'Deze gegevens kloppen niet.',
  },
} as const;

export const AcademyPractice = () => {
  const locale = useLocale();
  const isNl = locale === 'nl';
  const text = copy[locale];
  const path = isNl ? '/academy/practice/nl/' : '/academy/practice/';
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    trackPageView(path, text.title);
  }, [path, text.title]);

  useEffect(() => {
    if (hasPracticeCookie()) setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed || isPrerender()) return;

    document.querySelectorAll<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`).forEach((node) => node.remove());
    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [authed]);

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accepted = username.trim() === PRACTICE_USER && password === PRACTICE_PASSWORD;
    if (!accepted) {
      setRejected(true);
      return;
    }
    setPracticeCookie();
    setRejected(false);
    setPassword('');
    setAuthed(true);
  };

  return (
    <>
      <SEOHead
        title={text.title}
        description={text.description}
        keywords="PT7 Academy studio practice"
        canonical={`https://www.pt7.nl${path}`}
        robots="noindex, nofollow"
        ogTitle={text.title}
        ogDescription={text.description}
        htmlLang={isNl ? 'nl' : 'en'}
        ogLocale={isNl ? 'nl_NL' : 'en_US'}
        ogLocaleAlternates={isNl ? ['en_US'] : ['nl_NL']}
      />
      <div className="academy-practice-page">
        <div className="academy-practice-container">
          <p className="academy-practice-kicker">{text.kicker}</p>
          <h1>{text.heading}</h1>
          {authed ? (
            <>
              <p className="academy-practice-lead">{text.lead}</p>
              <div
                className="mindbody-widget"
                data-widget-type="Appointments"
                data-widget-id="2b72887c036"
              />
            </>
          ) : (
            <form className="academy-practice-gate" onSubmit={signIn}>
              <p className="academy-practice-lead">{text.gate}</p>
              <label>
                {text.username}
                <input
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </label>
              <label>
                {text.password}
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
              {rejected ? <p className="academy-practice-error">{text.error}</p> : null}
              <button type="submit" className="btn-gold">{text.submit}</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
