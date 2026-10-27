import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { useLocale } from '../i18n/useLocale';
import { trackPageView } from '../utils/gtmTracking';
import { isPrerender } from '../utils/prerender';
import '../styles/AcademyPractice.css';

const WIDGET_SRC = 'https://brandedweb.mindbodyonline.com/embed/widget.js';

const copy = {
  en: {
    title: 'Book studio practice | PT7 Academy',
    description:
      'Academy students book the PT 7 studio for observation, self practice, and teaching practice.',
    kicker: 'PT7 Academy students',
    heading: 'Book studio practice',
    lead: 'Book the studio for observation, self practice, and teaching practice. Studio use is free for 1 year from your course start date.',
  },
  nl: {
    title: 'Studio boeken voor oefenen | PT7 Academy',
    description:
      'Academy-studenten boeken de PT 7-studio voor observatie, zelfpraktijk en lespraktijk.',
    kicker: 'Studenten van PT7 Academy',
    heading: 'Studio boeken voor oefenen',
    lead: 'Boek de studio voor observatie, zelfpraktijk en lespraktijk. Gebruik van de studio is kosteloos gedurende 1 jaar vanaf de startdatum van je cursus.',
  },
} as const;

export const AcademyPractice = () => {
  const locale = useLocale();
  const isNl = locale === 'nl';
  const text = copy[locale];
  const path = isNl ? '/academy/practice/nl/' : '/academy/practice/';

  useEffect(() => {
    trackPageView(path, text.title);
  }, [path, text.title]);

  useEffect(() => {
    if (isPrerender()) return;

    document.querySelectorAll<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`).forEach((node) => node.remove());
    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

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
          <p className="academy-practice-lead">{text.lead}</p>
          <div
            className="mindbody-widget"
            data-widget-type="Appointments"
            data-widget-id="2b72887c036"
          />
        </div>
      </div>
    </>
  );
};
