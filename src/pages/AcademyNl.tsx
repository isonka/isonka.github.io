import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademyGraduates } from '../components/AcademyGraduates';
import { AcademyInquiry } from '../components/AcademyInquiry';
import { AcademyLangSwitch } from '../components/AcademyLangSwitch';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { AcademyEnrollButtons } from '../components/AcademyEnrollButtons';
import {
  ACADEMY_URL_EN,
  ACADEMY_URL_NL,
  ANATOMY_COURSE_FEE,
  COURSE_TITLE_NL,
  ITTAP_LOGO,
  ITTAP_LOGO_ALT,
  MAT_COURSE_TITLE_NL,
  MAT_COURSE_TOTAL_HOURS,
  PMA_ITTAP_URL,
  PMA_LOGO,
  PMA_LOGO_ALT,
  PMA_NAME,
  PMA_URL,
  curriculumTopicsNl,
  formatTermSchedule,
  lectureHoursNl,
  matTrapezeBreakdown,
  matTrapezeIncludesNl,
  matTrapezeSchedule,
  termSchedule2026,
  termSchedule2027,
  trainingBreakdown,
} from '../data/academy';
import {
  trackAcademyEnrollClick,
  trackAcademyInquiryClick,
  trackPageView,
} from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import '../styles/Academy.css';

const exerciseAssessmentNote =
  'De oefeningsevaluatie is verplicht voor certificering en kost EUR 250 inclusief BTW.';

const academyHreflang = [
  { hreflang: 'en', href: ACADEMY_URL_EN },
  { hreflang: 'nl', href: ACADEMY_URL_NL },
  { hreflang: 'x-default', href: ACADEMY_URL_EN },
];

export const AcademyNl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reformer' | 'mat'>('reformer');

  useEffect(() => {
    trackPageView('/academy/nl', 'Pilates Opleiding Amsterdam | Docentenopleiding | PT7 Academy');
    void ensureHealcodeLoaded();
  }, []);

  useEffect(() => {
    void ensureHealcodeLoaded();
  }, [activeTab]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const enrollBtn = target.closest('.academy-enroll-btn') as HTMLElement | null;
      if (enrollBtn) {
        const paymentType = enrollBtn.classList.contains('academy-enroll-btn--installments')
          ? 'installments'
          : 'full';
        const course = (enrollBtn.dataset.course as 'reformer' | 'mat' | undefined) ?? 'reformer';
        const location = enrollBtn.dataset.location ?? 'academy_page';
        trackAcademyEnrollClick(paymentType, course, location);
        return;
      }

      const inquiryBtn = target.closest('[data-academy-inquiry]') as HTMLElement | null;
      if (inquiryBtn) {
        const course = (inquiryBtn.dataset.course as 'reformer' | 'mat' | undefined) ?? 'reformer';
        const method = (inquiryBtn.dataset.academyInquiry as 'email' | 'phone' | undefined) ?? 'email';
        const location = inquiryBtn.dataset.location ?? 'academy_page';
        trackAcademyInquiryClick(course, method, location);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const handleTabChange = (tabName: 'reformer' | 'mat') => {
    setActiveTab(tabName);
    setTimeout(() => {
      const tabContent = document.querySelector('.academy-tab-content');
      if (tabContent) {
        const offsetTop = tabContent.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToEnroll = () => {
    setActiveTab('reformer');
    setTimeout(() => {
      const enroll = document.getElementById('academy-enroll');
      if (enroll) {
        const offsetTop = enroll.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToInquiry = () => {
    const inquiry = document.getElementById('academy-inquiry');
    if (inquiry) {
      const offsetTop = inquiry.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const academyFaqs = [
    {
      question: 'Voor wie is deze pilates docentenopleiding bedoeld?',
      answer:
        'PT7 Academy is geschikt voor carrièreswitchers en aspirant-instructeurs die een serieuze Reformer-route willen (300 uur, PMA ITTAP goedgekeurd) of Mat & Trapeze Table training op een weekendrooster bij Museumplein, Amsterdam. Colleges vinden plaats op geselecteerde weekenden, zodat je doordeweeks kunt werken. Alle lessen en trainingen worden in het Engels gegeven. In de studio wordt ook Turks en Nederlands gesproken.',
    },
    {
      question: 'Wanneer vinden de lessen plaats?',
      answer:
        `Colleges vinden plaats op geselecteerde weekenden, niet elke week. Reformer: Herfst 2026 (september–november) is volgeboekt. Volgende open Reformer-termijn is Lente 2027 (maart–mei): ${formatTermSchedule(termSchedule2027, true)}. Mat & Trapeze Table (november 2026–januari 2027): ${formatTermSchedule(matTrapezeSchedule, true)}. Elk college-weekend duurt ${lectureHoursNl}, zodat je doordeweeks kunt blijven werken.`,
    },
    {
      question: 'Welke cursussen biedt PT7 Academy aan?',
      answer:
        `We bieden de ${COURSE_TITLE_NL} (ITTAP goedgekeurd door de Pilates Method Alliance) en de ${MAT_COURSE_TITLE_NL} (curriculum volgt internationale standaarden; PMA/ITTAP-accreditatie in behandeling). Elke cursus kost EUR 2.000 + BTW met dezelfde MindBody-inschrijfopties.`,
    },
    {
      question: 'Hoe lang duurt het Reformer-programma?',
      answer:
        'De Reformer Pilates Instructeurscursus omvat in totaal 300 uur, met colleges, observatie, zelfpraktijk, lesgeven in de praktijk, sessies met een master trainer en QTT-observatie.',
    },
    {
      question: 'Hoe lang duurt het Mat & Trapeze Table-programma?',
      answer:
        `De ${MAT_COURSE_TITLE_NL} omvat in totaal ${MAT_COURSE_TOTAL_HOURS} uur: 48 uur technische training op locatie, 20 uur observatie, 20 uur zelfpraktijk, 15 uur studentlesgeven, 15 uur private of groepssessies met QTT, 5 uur begeleid lesgeven met QTT en 2 uur QTT-observatie van studentlessen.`,
    },
    {
      question: 'Is anatomie inbegrepen in de cursussen?',
      answer:
        `Anatomie is inbegrepen in de ${COURSE_TITLE_NL} (Pilates Introductie & Anatomie-weekend). De ${MAT_COURSE_TITLE_NL} omvat geen anatomie. Trainees zonder eerdere anatomieopleiding moeten de aparte Anatomie-cursus volgen (${ANATOMY_COURSE_FEE} + BTW).`,
    },
    {
      question: 'Wat is de accreditatiestatus van de Academy?',
      answer:
        'De Reformer Pilates Instructeurscursus van PT7 Academy is ITTAP goedgekeurd door de Pilates Method Alliance (PMA), de internationale organisatie die professionele standaarden voor pilatesopleidingen vaststelt. Ons Reformer-programma staat vermeld onder geaccrediteerde ITTAP Reformer-programma\'s. De Mat & Trapeze Table Instructeurscursus volgt internationale docentenopleidingsstandaarden; PMA/ITTAP-accreditatie voor die route is in behandeling en nog niet goedgekeurd.',
    },
    {
      question: 'Wat is ITTAP en wat is de rol van PMA?',
      answer:
        'ITTAP (International Teacher Training Accreditation for Pilates) is het accreditatiesysteem van de Pilates Method Alliance (PMA) voor docentenopleidingen. PMA beoordeelt en keurt programma\'s goed die voldoen aan haar standaarden voor curriculum, assessment en onderwijskwaliteit. De Reformer Pilates Instructeurscursus van PT7 Academy heeft ITTAP-goedkeuring tot 2026.',
    },
    {
      question: 'Wordt het certificaat internationaal erkend?',
      answer:
        'De Reformer Pilates Instructeurscursus is ITTAP goedgekeurd door de Pilates Method Alliance (PMA) en valt daarmee binnen PMA\'s internationale netwerk van geaccrediteerde Reformer-programma\'s. Afgestudeerden die het volledige programma van 300 uur afronden ontvangen het PT7 Academy Reformer Pilates Instructeurscertificaat.',
    },
    {
      question: 'Wat kost de cursus?',
      answer:
        'De cursusprijs is EUR 2.000 plus BTW. Schrijf je in via MindBody om in één keer te betalen, of kies Enroll with 3 Installments (3 × EUR 667 + BTW).',
    },
    {
      question: 'Welke assessments zijn inbegrepen?',
      answer:
        'Deelnemers maken één theoretisch meerkeuze-examen en één praktijkexamen. Het eerste examenpoging voor beide examens is gratis. Herkansingen zijn tegen meerprijs. Daarnaast is een verplichte oefeningsevaluatie door een lead trainer vereist voor certificering en kost EUR 250 inclusief BTW.',
    },
    {
      question: 'Wat is de oefeningsevaluatie?',
      answer:
        'Elke trainee wordt door een lead trainer beoordeeld via een verplichte oefeningsevaluatie. Deze kost EUR 250 inclusief BTW en is vereist om je certificaat te ontvangen.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Pilates Opleiding Amsterdam | Docentenopleiding | PT7 Academy"
        description="Pilates opleiding Amsterdam en pilates docentenopleiding bij Museumplein. 300 uur Reformer instructeurscursus (PMA ITTAP goedgekeurd) plus Mat & Trapeze Table. Weekendrooster. Lessen in het Engels. Vanaf €2.000 + BTW."
        keywords="pilates opleiding amsterdam, pilates docentenopleiding, reformer pilates opleiding amsterdam, pilates instructeur opleiding, PMA ITTAP, mat pilates opleiding amsterdam, weekend pilates opleiding, carrièreswitch pilates"
        canonical={ACADEMY_URL_NL}
        ogTitle="Pilates Opleiding Amsterdam | Docentenopleiding PT7 Academy"
        ogDescription="Pilates docentenopleiding in Amsterdam: 300 uur Reformer (PMA ITTAP goedgekeurd) en Mat & Trapeze Table. Weekendintensieven bij Museumplein. Training in het Engels."
        ogLocale="nl_NL"
        ogLocaleAlternates={['en_US']}
        htmlLang="nl"
        hreflangAlternates={academyHreflang}
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: `${COURSE_TITLE_NL} (Herfst 2026, volgeboekt)`,
            description:
              '300 uur Reformer Pilates Instructeurscursus, ITTAP goedgekeurd door de Pilates Method Alliance (PMA) in Amsterdam. Herfst 2026-termijn (september–november) is volgeboekt. Colleges, observatie, zelfpraktijk, lesgeven in de praktijk en sessies met master trainer.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-09-12',
            endDate: '2026-11-08',
            schedule: 'Geselecteerde weekenden sep–nov 2026, 12:00-18:00 (volgeboekt)',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: ACADEMY_URL_NL,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: 'PT7 Academy Reformer Pilates Instructeurscertificaat',
            recognizedByName: 'Pilates Method Alliance (PMA) / ITTAP',
            recognizedByUrl:
              'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program',
          },
        }}
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: `${COURSE_TITLE_NL} (Lente 2027)`,
            description:
              '300 uur Reformer Pilates Instructeurscursus, ITTAP goedgekeurd door de Pilates Method Alliance (PMA) in Amsterdam. Lente 2027-termijn: maart–mei weekendcolleges, observatie, zelfpraktijk, lesgeven in de praktijk en sessies met master trainer.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2027-03-13',
            endDate: '2027-05-16',
            schedule: 'Geselecteerde weekenden mrt–mei 2027, 12:00-18:00',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: ACADEMY_URL_NL,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: 'PT7 Academy Reformer Pilates Instructeurscertificaat',
            recognizedByName: 'Pilates Method Alliance (PMA) / ITTAP',
            recognizedByUrl:
              'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program',
          },
        }}
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: MAT_COURSE_TITLE_NL,
            description:
              'Mat & Trapeze Table Instructeurscursus bij PT Studio 7 Amsterdam (125 uur). Mat Pilates en Cadillac/Trapeze Table docentenopleiding op geselecteerde weekenden. Curriculum volgt internationale standaarden; PMA/ITTAP-accreditatie in behandeling. PT7 Academy certificaat.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-11-21',
            endDate: '2027-01-31',
            schedule: 'Geselecteerde weekenden nov 2026–jan 2027, 12:00-18:00',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: ACADEMY_URL_NL,
            timeRequired: 'PT125H',
            educationalCredentialAwarded: 'PT7 Academy Mat & Trapeze Table Instructeurscertificaat',
          },
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: academyFaqs }} />

      <div className="academy-page">
        <section className="academy-courses">
          <div className="academy-container">
            <div className="ittap-accreditation">
              <AcademyLangSwitch current="nl" />
              <p className="ittap-accreditation-eyebrow">PT7 Academy · Museumplein, Amsterdam</p>
              <h1 className="academy-page-title">Pilates opleiding Amsterdam</h1>
              <p className="academy-pma-subtitle">
                PMA ITTAP goedgekeurde Reformer docentenopleiding. Weekendrooster bij Museumplein.
              </p>
              <p className="academy-lang-note">
                <strong>Alle lessen en trainingen worden in het Engels gegeven.</strong>
              </p>

              <div className="academy-offer-strip" id="academy-offer">
                <div className="academy-offer-facts">
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Volgende Reformer-termijn</span>
                    <span className="academy-offer-value">13 mrt – 16 mei 2027</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Formaat</span>
                    <span className="academy-offer-value">Geselecteerde weekenden · {lectureHoursNl}</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Cursusprijs</span>
                    <span className="academy-offer-value">€2.000 + BTW</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Of in 3 termijnen</span>
                    <span className="academy-offer-value">3 × €667 + BTW</span>
                  </div>
                </div>
                <div className="academy-offer-actions">
                  <AcademyEnrollButtons course="reformer" location="offer_strip" />
                  <button type="button" className="course-btn secondary" onClick={scrollToEnroll}>
                    Bekijk volledig rooster
                  </button>
                  <button
                    type="button"
                    className="course-btn secondary"
                    data-academy-inquiry="email"
                    data-course="reformer"
                    data-location="offer_strip"
                    onClick={scrollToInquiry}
                  >
                    Informeer
                  </button>
                </div>
                <p className="academy-offer-note">
                  September 2026-termijn volgeboekt. Lente 2027 nu open voor inschrijving. Mat &amp; Trapeze Table route hieronder.
                </p>
              </div>

              <div className="accreditation-logos">
                <div className="accreditation-logo-cell">
                  <a
                    href={PMA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accreditation-logo-link"
                  >
                    <img
                      src={PMA_LOGO}
                      alt={PMA_LOGO_ALT}
                      className="pma-logo"
                      width={300}
                      height={339}
                    />
                  </a>
                </div>
                <div className="accreditation-logo-cell">
                  <a
                    href={PMA_ITTAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accreditation-logo-link"
                  >
                    <img
                      src={ITTAP_LOGO}
                      alt={ITTAP_LOGO_ALT}
                      className="ittap-logo"
                      width={394}
                      height={342}
                    />
                  </a>
                </div>
              </div>
              <p>
                De <strong>{COURSE_TITLE_NL}</strong> van PT7 Academy is <strong>ITTAP goedgekeurd</strong> door de{' '}
                <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer">
                  {PMA_NAME}
                </a>
                , de internationale organisatie die zich inzet voor het verhogen van het pilatesberoep en het vaststellen
                van standaarden voor docentenopleidingen wereldwijd.
              </p>
              <p>
                Via PMA&apos;s ITTAP-accreditatiesysteem is de {COURSE_TITLE_NL} beoordeeld en goedgekeurd op curriculum,
                assessmentstandaarden en onderwijskwaliteit. Afgestudeerden die het volledige programma van 300 uur
                afronden ontvangen het <strong>PT7 Academy Reformer Pilates Instructeurscertificaat</strong>.
              </p>
              <p>
                De {MAT_COURSE_TITLE_NL} volgt internationale docentenopleidingsstandaarden. PMA / ITTAP-accreditatie
                voor deze route is <strong>in behandeling</strong> en nog niet goedgekeurd.
              </p>
              <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer" className="pma-callout-link">
                Bekijk ITTAP op de website van de Pilates Method Alliance →
              </a>
            </div>

            <section className="academy-audience" aria-labelledby="academy-audience-heading">
              <p className="academy-kicker">Voor wie</p>
              <h2 id="academy-audience-heading">Word pilatesinstructeur in Amsterdam</h2>
              <p>
                PT7 Academy is opgezet voor mensen die Reformer Pilates (en optioneel Mat &amp; Trapeze Table) willen
                onderwijzen zonder eerst hun baan op te zeggen. Colleges vinden alleen plaats op geselecteerde
                weekenden in onze werkende studio aan de Van Baerlestraat, Museumplein. Alle lessen en trainingen
                worden in het Engels gegeven. In de studio wordt ook Turks en Nederlands gesproken.
              </p>
              <div className="benefits-grid academy-audience-grid">
                <div className="benefit-card">
                  <h3>Carrièreswitchers</h3>
                  <p>
                    Veel trainees komen uit banking, tech en andere sectoren. Lees hoe de switch werkt in onze{' '}
                    <Link to="/blog/career-change-banker-to-pilates-instructor/">
                      carrièreswitchgids
                    </Link>
                    , en ontmoet cursusleider{' '}
                    <Link to="/trainer/elif/">Elif Arzu Ogan</Link>.
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>Weekendrooster</h3>
                  <p>
                    Vier Reformer college-weekenden per termijn ({lectureHoursNl}), plus observatie, zelfpraktijk en
                    lesuren. Train bij Museumplein en behoud je doordeweekse werk.
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>300-uur Reformer-route</h3>
                  <p>
                    De Reformer-cursus is PMA ITTAP goedgekeurd, dieper dan korte mat-only intensieven. Afgestudeerden
                    ontvangen het PT7 Academy Reformer Pilates Instructeurscertificaat (programma-ITTAP-goedkeuring is
                    niet hetzelfde als een persoonlijke PMA-lidmaatschapskaart).
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>Mat &amp; Trapeze Table</h3>
                  <p>
                    Breid je apparatuuronderwijs uit met onze {MAT_COURSE_TOTAL_HOURS}-urige Mat &amp; Trapeze Table
                    cursus. Curriculum volgt internationale standaarden; PMA/ITTAP-accreditatie voor deze route is nog
                    in behandeling.
                  </p>
                </div>
              </div>
            </section>

            <div className="academy-tabs" role="tablist" aria-label="Academy cursussen">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'reformer'}
                className={`academy-tab ${activeTab === 'reformer' ? 'active' : ''}`}
                onClick={() => handleTabChange('reformer')}
              >
                Reformer
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'mat'}
                className={`academy-tab ${activeTab === 'mat' ? 'active' : ''}`}
                onClick={() => handleTabChange('mat')}
              >
                Mat &amp; Trapeze Table
              </button>
            </div>

            <div className="academy-tab-content">
              {activeTab === 'reformer' && (
                <div role="tabpanel" aria-label="Reformer Pilates Instructeurscursus">
            <div className="course-card featured full-width">
              <p className="course-badge">Inschrijving · Lente 2027</p>
              <h2 className="course-card-title">{COURSE_TITLE_NL}</h2>
              <p className="academy-course-accreditation">
                300 uur · ITTAP goedgekeurd door de <strong>Pilates Method Alliance (PMA)</strong> · 4 weekenden ·{' '}
                {lectureHoursNl}
              </p>

              <div className="academy-course-section">
                <h3>Komende termijnroosters</h3>
                <p>
                  Colleges vinden niet elk weekend plaats. Elke termijn loopt over vier geselecteerde weekenden bij PT
                  Studio 7, Museumplein, Amsterdam. Elk college-weekend duurt {lectureHoursNl}. Herfst 2026 is
                  volgeboekt; schrijf nu in voor Lente 2027. Anatomie is inbegrepen in de Reformer-cursus (Pilates
                  Introductie &amp; Anatomie-weekend).
                </p>

                <h4 className="term-schedule-heading">
                  Herfst 2026 (september–november)
                  <span className="term-schedule-status">Volgeboekt</span>
                </h4>
                <div className="term-schedule-grid">
                  {termSchedule2026.map((item) => (
                    <div key={item.datesNl} className="term-schedule-item">
                      <span className="term-schedule-dates">{item.datesNl}</span>
                      <span className="term-schedule-module">{item.moduleNl}</span>
                    </div>
                  ))}
                </div>

                <h4 className="term-schedule-heading">Lente 2027 (maart–mei)</h4>
                <div className="term-schedule-grid">
                  {termSchedule2027.map((item) => (
                    <div key={item.datesNl} className="term-schedule-item">
                      <span className="term-schedule-dates">{item.datesNl}</span>
                      <span className="term-schedule-module">{item.moduleNl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section" id="academy-enroll">
                <h3>Cursusprijs</h3>
                <div className="price-options">
                  <div className="price-option">
                    <span className="price-option-label">Standaard tarief</span>
                    <span className="price-option-amount">€2.000</span>
                    <span className="price-option-note">+ BTW (21%)</span>
                  </div>
                </div>
                <div className="payment-info payment-info--inline">
                  <h4>Betalingsopties</h4>
                  <p>Betaal in één keer bij checkout, of spreid de cursusprijs over 3 gelijke termijnen.</p>
                  <div className="payment-breakdown-grid">
                    <div className="payment-step">
                      <span className="payment-step-label">Termijnen</span>
                      <span className="payment-step-amount">3 × €667</span>
                      <span className="payment-step-note">+ BTW per termijn</span>
                    </div>
                  </div>
                  <p className="payment-note">Kies bij MindBody checkout voor betaling in één keer of 3 termijnen.</p>
                </div>
                <div className="academy-enroll-action">
                  <div className="academy-enroll-buttons">
                    <AcademyEnrollButtons course="reformer" location="reformer_fee" />
                  </div>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Curriculumoverzicht</h3>
                <p>
                  Dit PMA ITTAP goedgekeurde programma combineert theoretische kennis met praktische toepassing voor een
                  diep begrip van pilatesprincipes en lesgeefmethodologie.
                </p>
                <h4>Kernonderwerpen</h4>
                <div className="knowledge-grid">
                  {curriculumTopicsNl.map((topic) => (
                    <div key={topic} className="knowledge-item">
                      ✓ {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Assessment &amp; evaluatie</h3>
                <p>Tijdens de cursus voltooien deelnemers:</p>
                <ul className="academy-bullet-list">
                  <li>1 theoretisch meerkeuze-examen</li>
                  <li>1 praktijkexamen</li>
                  <li>Verplichte oefeningsevaluatie, beoordeeld door een lead trainer</li>
                </ul>
                <p>
                  Het eerste examenpoging voor beide examens is gratis. Herkansingen zijn tegen meerprijs.
                </p>
                <p>{exerciseAssessmentNote}</p>
              </div>

              <div className="academy-course-section">
                <h3>Cursusvereisten</h3>
                <p>
                  Deelnemers moeten de toegewezen huiswerkopdrachten gedurende het programma voltooien en slagen voor
                  de verplichte oefeningsevaluatie met een lead trainer.
                </p>
              </div>

              <div className="academy-course-section">
                <h3>Trainingsoverzicht (300 uur totaal)</h3>
                <div className="hours-breakdown-grid">
                  {trainingBreakdown.map((item) => (
                    <div key={item.labelNl} className="hours-breakdown-item">
                      <span className="hours-breakdown-hours">{item.hoursNl}</span>
                      <span className="hours-breakdown-label">{item.labelNl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section academy-course-section--certification">
                <h3>Certificering</h3>
                <p>Deelnemers die succesvol:</p>
                <ul className="academy-bullet-list">
                  <li>Slagen voor alle vereiste examens</li>
                  <li>Het volledige trainingsprogramma van 300 uur afronden</li>
                  <li>
                    De verplichte oefeningsevaluatie voltooien (EUR 250 inclusief BTW)
                  </li>
                </ul>
                <p>
                  ontvangen het <strong>PT7 Academy Reformer Pilates Instructeurscertificaat</strong>. Het programma
                  is ITTAP goedgekeurd door de Pilates Method Alliance (PMA); het afgestudeerden-certificaat wordt
                  uitgereikt door PT7 Academy.
                </p>
              </div>

              <div className="course-cta">
                <div className="course-cta-buttons">
                  <AcademyEnrollButtons course="reformer" location="reformer_cta" />
                  <button
                    type="button"
                    className="course-btn secondary"
                    data-academy-inquiry="email"
                    data-course="reformer"
                    data-location="reformer_cta"
                    onClick={scrollToInquiry}
                  >
                    Informeer over de cursus
                  </button>
                </div>
                <p className="cta-subtext">Reactie binnen 48 uur om je plek te bevestigen.</p>
              </div>
            </div>
                </div>
              )}

              {activeTab === 'mat' && (
                <div role="tabpanel" aria-label="Mat en Trapeze Table Instructeurscursus">
            <div className="course-card full-width">
              <p className="course-badge">Inschrijving · nov 2026 – jan 2027</p>
              <h2 className="course-card-title">{MAT_COURSE_TITLE_NL}</h2>
              <p className="academy-course-accreditation">
                {MAT_COURSE_TOTAL_HOURS} uur · Mat &amp; Trapeze Table (Cadillac) · Internationale standaarden ·{' '}
                <strong>PMA / ITTAP-accreditatie in behandeling</strong> · {lectureHoursNl}
              </p>

              <div className="academy-course-section">
                <h3>Termijnrooster</h3>
                <p>
                  Vier geselecteerde weekenden bij PT Studio 7, Museumplein, Amsterdam. Elk college-weekend duurt{' '}
                  {lectureHoursNl}.
                </p>
                <div className="term-schedule-grid">
                  {matTrapezeSchedule.map((item) => (
                    <div key={item.datesNl} className="term-schedule-item">
                      <span className="term-schedule-dates">{item.datesNl}</span>
                      <span className="term-schedule-module">{item.moduleNl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Cursusprijs</h3>
                <div className="price-options">
                  <div className="price-option">
                    <span className="price-option-label">Standaard tarief</span>
                    <span className="price-option-amount">€2.000</span>
                    <span className="price-option-note">+ BTW (21%)</span>
                  </div>
                  <div className="price-option">
                    <span className="price-option-label">Anatomie-cursus (indien nodig)</span>
                    <span className="price-option-amount">{ANATOMY_COURSE_FEE}</span>
                    <span className="price-option-note">+ BTW (21%)</span>
                  </div>
                </div>
                <p className="payment-note" style={{ marginBottom: '16px' }}>
                  Anatomie is <strong>niet</strong> inbegrepen in de Mat &amp; Trapeze Table cursus (het maakt deel uit
                  van de Reformer-cursus). Als je nog geen anatomieopleiding hebt gevolgd, moet je de aparte
                  Anatomie-cursus aanschaffen voor {ANATOMY_COURSE_FEE} + BTW.
                </p>
                <div className="payment-info payment-info--inline">
                  <h4>Betalingsopties</h4>
                  <p>Betaal in één keer bij checkout, of spreid de cursusprijs over 3 gelijke termijnen.</p>
                  <div className="payment-breakdown-grid">
                    <div className="payment-step">
                      <span className="payment-step-label">Termijnen</span>
                      <span className="payment-step-amount">3 × €667</span>
                      <span className="payment-step-note">+ BTW per termijn</span>
                    </div>
                  </div>
                  <p className="payment-note">Kies bij MindBody checkout voor betaling in één keer of 3 termijnen.</p>
                </div>
                <div className="academy-enroll-action">
                  <div className="academy-enroll-buttons">
                    <AcademyEnrollButtons course="mat" location="mat_fee" />
                  </div>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Wat is inbegrepen</h3>
                <ul className="academy-bullet-list">
                  {matTrapezeIncludesNl.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  Omvat <strong>geen</strong> anatomie. Zonder eerdere anatomieopleiding voeg je de aparte Anatomie-cursus
                  toe ({ANATOMY_COURSE_FEE} + BTW).
                </p>
              </div>

              <div className="academy-course-section">
                <h3>Trainingsoverzicht ({MAT_COURSE_TOTAL_HOURS} uur totaal)</h3>
                <div className="hours-breakdown-grid">
                  {matTrapezeBreakdown.map((item) => (
                    <div key={item.labelNl} className="hours-breakdown-item">
                      <span className="hours-breakdown-hours">{item.hoursNl}</span>
                      <span className="hours-breakdown-label">{item.labelNl}</span>
                    </div>
                  ))}
                </div>
                <p>
                  Afgestudeerden die het programma voltooien ontvangen een{' '}
                  <strong>PT7 Academy Mat &amp; Trapeze Table Instructeurscertificaat</strong>. Het curriculum volgt
                  internationale docentenopleidingsstandaarden. PMA / ITTAP-accreditatie voor deze cursus is{' '}
                  <strong>in behandeling</strong> en nog niet goedgekeurd.
                </p>
              </div>

              <div className="course-cta">
                <div className="course-cta-buttons">
                  <AcademyEnrollButtons course="mat" location="mat_cta" />
                  <button
                    type="button"
                    className="course-btn secondary"
                    data-academy-inquiry="email"
                    data-course="mat"
                    data-location="mat_cta"
                    onClick={scrollToInquiry}
                  >
                    Informeer over deze cursus
                  </button>
                </div>
                <p className="cta-subtext">Reactie binnen 48 uur om je plek te bevestigen.</p>
              </div>
            </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="academy-benefits">
          <div className="academy-container">
            <p className="academy-kicker">Waarom PT7 Academy</p>
            <h2>Docentenopleiding in een werkende studio</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>300 uur, geen shortcut</h3>
                <p>
                  Volledige route van theorie naar lesgeven, observatie en sessies met master trainer, geen verkort
                  weekend-only certificaat.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Weekendcolleges</h3>
                <p>
                  Vier geplande weekenden per Reformer-termijn (mrt–mei 2027), {lectureHoursNl}. Behoud je dagbaan
                  tijdens de opleiding.
                </p>
              </div>

              <div className="benefit-card benefit-card--pma">
                <h3>PMA ITTAP Reformer-programma</h3>
                <p>
                  De {COURSE_TITLE_NL} is ITTAP goedgekeurd door de Pilates Method Alliance (PMA). De{' '}
                  {MAT_COURSE_TITLE_NL} volgt internationale standaarden; PMA/ITTAP-accreditatie is in behandeling.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Echte boutique studio</h3>
                <p>
                  Training bij PT Studio 7 Museumplein, waar klanten wekelijks Reformer, private en
                  kleine-groepssessies boeken. Je leert waar je straks lesgeeft.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Duidelijk assessmentpad</h3>
                <p>
                  Theoretische en praktische examens, plus een verplichte oefeningsevaluatie (EUR 250 inclusief BTW),
                  richting het PT7 Academy Reformer Pilates Instructeurscertificaat.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Betaal in één keer of in 3</h3>
                <p>
                  MindBody checkout: in één keer, of 3 × EUR 667 + BTW.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AcademyGraduates locale="nl" />

        <AcademyInquiry locale="nl" />

        <section className="academy-benefits">
          <div className="academy-container">
            <p className="academy-kicker">FAQ</p>
            <h2>Vragen vóór inschrijving</h2>
            <div className="benefits-grid">
              {academyFaqs.map((faq) => (
                <div key={faq.question} className="benefit-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="academy-cta">
          <div className="academy-container">
            <p className="academy-kicker home-kicker-on-dark">Volgende stap</p>
            <h2>Inschrijven of een vraag stellen</h2>
            <p>
              Reformer (PMA ITTAP goedgekeurd) of Mat &amp; Trapeze Table bij PT7 Academy, Museumplein. Prijzen en
              betaling hierboven.
            </p>
            <div className="cta-buttons">
              <AcademyEnrollButtons course="reformer" location="bottom_cta" variant="cta" />
              <button
                type="button"
                className="cta-btn secondary"
                data-academy-inquiry="email"
                data-course="reformer"
                data-location="bottom_cta"
                onClick={scrollToInquiry}
              >
                Informeer over de cursus
              </button>
              <a
                href="tel:+31685162693"
                className="cta-btn secondary"
                data-academy-inquiry="phone"
                data-course="reformer"
                data-location="bottom_cta"
              >
                Bel: +31 685 162693
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
