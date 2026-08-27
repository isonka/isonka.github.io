import { useEffect } from 'react';
import { ACADEMY_INQUIRY_WIDGET } from '../data/academy';
import { ensureHealcodeLoaded } from '../utils/healcode';

type AcademyInquiryProps = {
  locale: 'en' | 'nl';
};

export const AcademyInquiry: React.FC<AcademyInquiryProps> = ({ locale }) => {
  const isNl = locale === 'nl';

  useEffect(() => {
    void ensureHealcodeLoaded();
  }, []);

  return (
    <section className="academy-inquiry" id="academy-inquiry" aria-labelledby="academy-inquiry-heading">
      <div className="academy-container">
        <p className="academy-kicker">{isNl ? 'Contact' : 'Contact'}</p>
        <h2 id="academy-inquiry-heading">
          {isNl ? 'Vraag stellen of inschrijven bespreken' : 'Ask a question or discuss enrollment'}
        </h2>
        <p className="academy-inquiry-intro">
          {isNl
            ? 'Vul het formulier in. We reageren doorgaans binnen 48 uur. Liever mail of bel? Gebruik de contactgegevens hieronder.'
            : 'Use the form below. We typically reply within 48 hours. Prefer email or phone? Use the contacts underneath.'}
        </p>
        <div
          className="academy-inquiry-widget"
          dangerouslySetInnerHTML={{ __html: ACADEMY_INQUIRY_WIDGET }}
        />
        <p className="academy-inquiry-fallback">
          {isNl ? 'Of neem direct contact op: ' : 'Or contact us directly: '}
          <a href="mailto:info@pt7.nl?subject=PT7%20Academy%20Inquiry">info@pt7.nl</a>
          {' · '}
          <a href="tel:+31685162693">+31 685 162693</a>
        </p>
      </div>
    </section>
  );
};
