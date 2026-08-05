import { Link } from 'react-router-dom';

type AcademyLangSwitchProps = {
  current: 'en' | 'nl';
};

const FlagEn = () => (
  <svg className="academy-lang-flag-svg" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <rect width="60" height="40" fill="#012169" />
    <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
    <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="5" />
    <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="13" />
    <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="7" />
  </svg>
);

const FlagNl = () => (
  <svg className="academy-lang-flag-svg" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <rect width="60" height="13.33" y="0" fill="#AE1C28" />
    <rect width="60" height="13.33" y="13.33" fill="#fff" />
    <rect width="60" height="13.34" y="26.66" fill="#21468B" />
  </svg>
);

export const AcademyLangSwitch: React.FC<AcademyLangSwitchProps> = ({ current }) => (
  <nav className="academy-lang-switch" aria-label="Language">
    {current === 'en' ? (
      <span className="academy-lang-flag academy-lang-flag--current" lang="en" title="English" aria-current="page">
        <FlagEn />
        <span className="visually-hidden">English</span>
      </span>
    ) : (
      <Link
        to="/academy"
        hrefLang="en"
        lang="en"
        className="academy-lang-flag"
        title="English"
        aria-label="Switch to English"
      >
        <FlagEn />
      </Link>
    )}
    {current === 'nl' ? (
      <span className="academy-lang-flag academy-lang-flag--current" lang="nl" title="Nederlands" aria-current="page">
        <FlagNl />
        <span className="visually-hidden">Nederlands</span>
      </span>
    ) : (
      <Link
        to="/academy/nl"
        hrefLang="nl"
        lang="nl"
        className="academy-lang-flag"
        title="Nederlands"
        aria-label="Schakel over naar Nederlands"
      >
        <FlagNl />
      </Link>
    )}
  </nav>
);
