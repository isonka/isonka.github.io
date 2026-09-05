import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AcademyGraduates } from '../components/AcademyGraduates';
import { AcademyInquiry } from '../components/AcademyInquiry';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { AcademyEnrollButtons } from '../components/AcademyEnrollButtons';
import {
  ACADEMY_URL_EN,
  ACADEMY_URL_NL,
  COURSE_TITLE,
  COURSE_TITLE_NL,
  ITTAP_LOGO,
  ITTAP_LOGO_ALT,
  MAT_COURSE_TITLE,
  MAT_COURSE_TITLE_NL,
  PMA_ITTAP_URL,
  PMA_LOGO,
  PMA_LOGO_ALT,
  PMA_NAME,
  PMA_URL,
  curriculumTopics,
  curriculumTopicsNl,
  formatTermSchedule,
  lectureHours,
  lectureHoursNl,
  termSchedule2026,
  termSchedule2027,
  termScheduleWinter2026,
  trainingBreakdown,
} from '../data/academy';
import {
  trackAcademyEnrollClick,
  trackAcademyInquiryClick,
  trackPageView,
} from '../utils/gtmTracking';
import { ensureHealcodeLoaded } from '../utils/healcode';
import '../styles/Academy.css';

const academyHreflang = [
  { hreflang: 'en', href: ACADEMY_URL_EN },
  { hreflang: 'nl', href: ACADEMY_URL_NL },
  { hreflang: 'x-default', href: ACADEMY_URL_EN },
];

type AcademyFaq = {
  question: string;
  questionNl: string;
  answer: string;
  answerNl: string;
};

export const Academy= () => {
  const { pathname } = useLocation();
  const isNl = pathname === '/academy/nl' || pathname.startsWith('/academy/nl/');

  const courseTitle = isNl ? COURSE_TITLE_NL : COURSE_TITLE;
  const matCourseTitle = isNl ? MAT_COURSE_TITLE_NL : MAT_COURSE_TITLE;
  const hours = isNl ? lectureHoursNl : lectureHours;
  const topics = isNl ? curriculumTopicsNl : curriculumTopics;
  const exerciseAssessmentNote = isNl
    ? 'De oefeningsevaluatie is verplicht voor certificering en kost EUR 250 inclusief BTW.'
    : 'The exercise assessment is mandatory for certification, costs EUR 250 including BTW.';

  useEffect(() => {
    trackPageView(
      isNl ? '/academy/nl' : '/academy',
      isNl
        ? 'Pilates Opleiding Amsterdam | Docentenopleiding | PT7 Academy'
        : 'Pilates Instructor Course Amsterdam | PT7 Academy',
    );
    void ensureHealcodeLoaded();
  }, [isNl]);

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

  const scrollToEnroll = () => {
    const enroll = document.getElementById('academy-enroll');
    if (enroll) {
      const offsetTop = enroll.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToInquiry = () => {
    const inquiry = document.getElementById('academy-inquiry');
    if (inquiry) {
      const offsetTop = inquiry.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const academyFaqs: AcademyFaq[] = [
    {
      question: 'Who is this Pilates teacher training for?',
      questionNl: 'Voor wie is deze pilates docentenopleiding bedoeld?',
      answer:
        'PT7 Academy suits career changers and aspiring instructors who want a serious Reformer pathway (300 hours, PMA ITTAP approved) on a weekend schedule at Museumplein, Amsterdam. Lectures are on selected weekends so you can keep weekday work. Sessions and studio life are English-friendly, with Turkish and Dutch also used in the community. A Mat & Trapeze Table instructor course is coming later.',
      answerNl:
        'PT7 Academy is geschikt voor carrièreswitchers en aspirant-instructeurs die een serieuze Reformer-route willen (300 uur, PMA ITTAP goedgekeurd) op een weekendrooster bij Museumplein, Amsterdam. Colleges vinden plaats op geselecteerde weekenden, zodat je doordeweeks kunt werken. Alle lessen en trainingen worden in het Engels gegeven. In de studio wordt ook Turks en Nederlands gesproken. Een Mat & Trapeze Table Instructeurscursus volgt later.',
    },
    {
      question: 'When are classes held?',
      questionNl: 'Wanneer vinden de lessen plaats?',
      answer:
        `Lectures are held on selected weekends, not every week. Reformer: Autumn 2026 (September–November) is fully booked. Next open Reformer term is Winter 2026/27 (November–January): ${formatTermSchedule(termScheduleWinter2026)}. Spring 2027 (March–May) is also open: ${formatTermSchedule(termSchedule2027)}. Each lecture weekend runs ${lectureHours}, so you can keep your weekday job while you train.`,
      answerNl:
        `Colleges vinden plaats op geselecteerde weekenden, niet elke week. Reformer: Herfst 2026 (september–november) is volgeboekt. Volgende open Reformer-termijn is Winter 2026/27 (november–januari): ${formatTermSchedule(termScheduleWinter2026, true)}. Lente 2027 (maart–mei) is ook open: ${formatTermSchedule(termSchedule2027, true)}. Elk college-weekend duurt ${lectureHoursNl}, zodat je doordeweeks kunt blijven werken.`,
    },
    {
      question: 'What courses does PT7 Academy offer?',
      questionNl: 'Welke cursussen biedt PT7 Academy aan?',
      answer:
        `We currently offer the ${COURSE_TITLE} (ITTAP approved by the Pilates Method Alliance), EUR 2,000 + VAT with MindBody enroll options. A ${MAT_COURSE_TITLE} is coming later.`,
      answerNl:
        `We bieden nu de ${COURSE_TITLE_NL} (ITTAP goedgekeurd door de Pilates Method Alliance), EUR 2.000 + BTW met MindBody-inschrijfopties. Een ${MAT_COURSE_TITLE_NL} volgt later.`,
    },
    {
      question: 'How long is the Reformer program?',
      questionNl: 'Hoe lang duurt het Reformer-programma?',
      answer:
        'The Reformer Pilates Instructor Course totals 300 hours, combining lectures, observation, self practice, teaching practice, sessions with a master trainer, and QTT observation.',
      answerNl:
        'De Reformer Pilates Instructeurscursus omvat in totaal 300 uur, met colleges, observatie, zelfpraktijk, lesgeven in de praktijk, sessies met een master trainer en QTT-observatie.',
    },
    {
      question: 'Is anatomy included in the course?',
      questionNl: 'Is anatomie inbegrepen in de cursus?',
      answer: `Anatomy is included in the ${COURSE_TITLE} (Pilates Introduction & Anatomy weekend).`,
      answerNl: `Anatomie is inbegrepen in de ${COURSE_TITLE_NL} (Pilates Introductie & Anatomie-weekend).`,
    },
    {
      question: 'What is the accreditation status of the Academy?',
      questionNl: 'Wat is de accreditatiestatus van de Academy?',
      answer:
        'PT7 Academy\'s Reformer Pilates Instructor Course is ITTAP approved by the Pilates Method Alliance (PMA), the international organization that sets professional standards for Pilates education. Our Reformer program is listed among accredited ITTAP Reformer programs.',
      answerNl:
        'De Reformer Pilates Instructeurscursus van PT7 Academy is ITTAP goedgekeurd door de Pilates Method Alliance (PMA), de internationale organisatie die professionele standaarden voor pilatesopleidingen vaststelt. Ons Reformer-programma staat vermeld onder geaccrediteerde ITTAP Reformer-programma\'s.',
    },
    {
      question: 'What is ITTAP and how is PMA involved?',
      questionNl: 'Wat is ITTAP en wat is de rol van PMA?',
      answer:
        'ITTAP (International Teacher Training Accreditation for Pilates) is the Pilates Method Alliance (PMA) accreditation system for teacher training programs. PMA reviews and approves programs that meet its standards for curriculum, assessment, and educational quality. PT7 Academy\'s Reformer Pilates Instructor Course holds ITTAP approval through 2026.',
      answerNl:
        'ITTAP (International Teacher Training Accreditation for Pilates) is het accreditatiesysteem van de Pilates Method Alliance (PMA) voor docentenopleidingen. PMA beoordeelt en keurt programma\'s goed die voldoen aan haar standaarden voor curriculum, assessment en onderwijskwaliteit. De Reformer Pilates Instructeurscursus van PT7 Academy heeft ITTAP-goedkeuring tot 2026.',
    },
    {
      question: 'Is the certification recognized internationally?',
      questionNl: 'Wordt het certificaat internationaal erkend?',
      answer:
        'The Reformer Pilates Instructor Course is ITTAP approved by the Pilates Method Alliance (PMA), placing it within PMA\'s international network of accredited Reformer programs. Graduates who complete the full program of 300 hours receive the PT7 Academy Reformer Pilates Instructor Certificate.',
      answerNl:
        'De Reformer Pilates Instructeurscursus is ITTAP goedgekeurd door de Pilates Method Alliance (PMA) en valt daarmee binnen PMA\'s internationale netwerk van geaccrediteerde Reformer-programma\'s. Afgestudeerden die het volledige programma van 300 uur afronden ontvangen het PT7 Academy Reformer Pilates Instructeurscertificaat.',
    },
    {
      question: 'How much does the course cost?',
      questionNl: 'Wat kost de cursus?',
      answer:
        'The course fee is EUR 2,000 plus VAT. Enroll via MindBody to pay in full, or choose Enroll with 3 Installments (3 × EUR 667 + VAT).',
      answerNl:
        'De cursusprijs is EUR 2.000 plus BTW. Schrijf je in via MindBody om in één keer te betalen, of kies Enroll with 3 Installments (3 × EUR 667 + BTW).',
    },
    {
      question: 'What assessments are included?',
      questionNl: 'Welke assessments zijn inbegrepen?',
      answer:
        'Participants complete one theoretical multiple-choice exam and one practical exam. The first attempt for both exams is free of charge. Any retakes are subject to an additional fee. Separately, a mandatory exercise assessment checked by a lead trainer is required for certification and costs EUR 250 including BTW.',
      answerNl:
        'Deelnemers maken één theoretisch meerkeuze-examen en één praktijkexamen. Het eerste examenpoging voor beide examens is gratis. Herkansingen zijn tegen meerprijs. Daarnaast is een verplichte oefeningsevaluatie door een lead trainer vereist voor certificering en kost EUR 250 inclusief BTW.',
    },
    {
      question: 'What is the exercise assessment?',
      questionNl: 'Wat is de oefeningsevaluatie?',
      answer:
        'Each trainee is checked by a lead trainer through a mandatory exercise assessment. It costs EUR 250 including BTW and is required to receive your certificate.',
      answerNl:
        'Elke trainee wordt door een lead trainer beoordeeld via een verplichte oefeningsevaluatie. Deze kost EUR 250 inclusief BTW en is vereist om je certificaat te ontvangen.',
    },
  ];

  const structuredFaqs = academyFaqs.map((faq) => ({
    question: isNl ? faq.questionNl : faq.question,
    answer: isNl ? faq.answerNl : faq.answer,
  }));

  const courseUrl = isNl ? ACADEMY_URL_NL : ACADEMY_URL_EN;
  const credentialAwarded = isNl
    ? 'PT7 Academy Reformer Pilates Instructeurscertificaat'
    : 'PT7 Academy Reformer Pilates Instructor Certificate';

  return (
    <>
      {isNl ? (
        <SEOHead
          title="Pilates Opleiding Amsterdam | Docentenopleiding | PT7 Academy"
          description="Pilates opleiding Amsterdam en pilates docentenopleiding bij Museumplein. 300 uur Reformer instructeurscursus (PMA ITTAP goedgekeurd). Volgende termijn november 2026–januari 2027. Weekendrooster. Lessen in het Engels. Vanaf €2.000 + BTW."
          keywords="pilates opleiding amsterdam, pilates docentenopleiding, reformer pilates opleiding amsterdam, pilates instructeur opleiding, PMA ITTAP, weekend pilates opleiding, carrièreswitch pilates"
          canonical={ACADEMY_URL_NL}
          ogTitle="Pilates Opleiding Amsterdam | Docentenopleiding PT7 Academy"
          ogDescription="Pilates docentenopleiding in Amsterdam: 300 uur Reformer (PMA ITTAP goedgekeurd). Volgende termijn november 2026–januari 2027. Weekendintensieven bij Museumplein. Training in het Engels."
          ogLocale="nl_NL"
          ogLocaleAlternates={['en_US']}
          htmlLang="nl"
          hreflangAlternates={academyHreflang}
        />
      ) : (
        <SEOHead
          title="Pilates Instructor Course Amsterdam | Teacher Training | PT7 Academy"
          description="Pilates instructor course and teacher training in Amsterdam. 300-hour Reformer Pilates instructor course (PMA ITTAP approved). Next term November 2026–January 2027. Weekend schedule for career changers. Course fee from €2,000 + VAT."
          keywords="pilates instructor course amsterdam, pilates teacher training amsterdam, reformer pilates instructor course, reformer teacher training amsterdam, become a pilates instructor amsterdam, ITTAP approved pilates course, PMA ITTAP reformer course netherlands, weekend pilates teacher training, pilates instructor course for career changers, pilates instructor course amsterdam price"
          canonical={ACADEMY_URL_EN}
          ogTitle="Pilates Instructor Course Amsterdam | Reformer Teacher Training"
          ogDescription="Become a Pilates instructor in Amsterdam: 300-hour Reformer teacher training (PMA ITTAP approved). Next term November 2026–January 2027. Weekend intensives at Museumplein."
          ogLocale="en_US"
          ogLocaleAlternates={['nl_NL']}
          htmlLang="en"
          hreflangAlternates={academyHreflang}
        />
      )}
      <StructuredData
        type="Course"
        data={{
          course: {
            name: `${courseTitle} (${isNl ? 'Herfst 2026, volgeboekt' : 'Autumn 2026, fully booked'})`,
            description: isNl
              ? '300 uur Reformer Pilates Instructeurscursus, ITTAP goedgekeurd door de Pilates Method Alliance (PMA) in Amsterdam. Herfst 2026-termijn (september–november) is volgeboekt. Colleges, observatie, zelfpraktijk, lesgeven in de praktijk en sessies met master trainer.'
              : '300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA) in Amsterdam. Autumn 2026 term (September–November) is fully booked. Lectures, observation, self practice, teaching practice, and master trainer sessions.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-09-12',
            endDate: '2026-11-08',
            schedule: isNl
              ? 'Geselecteerde weekenden sep–nov 2026, 12:00-18:00 (volgeboekt)'
              : 'Selected weekends Sep–Nov 2026, 12:00-18:00 (fully booked)',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: courseUrl,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: credentialAwarded,
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
            name: `${courseTitle} (Winter 2026/27)`,
            description: isNl
              ? '300 uur Reformer Pilates Instructeurscursus, ITTAP goedgekeurd door de Pilates Method Alliance (PMA) in Amsterdam. Winter 2026/27-termijn: november–januari weekendcolleges, observatie, zelfpraktijk, lesgeven in de praktijk en sessies met master trainer.'
              : '300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA) in Amsterdam. Winter 2026/27 term: November–January weekend lectures, observation, self practice, teaching practice, and master trainer sessions.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-11-21',
            endDate: '2027-01-31',
            schedule: isNl
              ? 'Geselecteerde weekenden nov 2026–jan 2027, 12:00-18:00'
              : 'Selected weekends Nov 2026–Jan 2027, 12:00-18:00',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: courseUrl,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: credentialAwarded,
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
            name: `${courseTitle} (${isNl ? 'Lente 2027' : 'Spring 2027'})`,
            description: isNl
              ? '300 uur Reformer Pilates Instructeurscursus, ITTAP goedgekeurd door de Pilates Method Alliance (PMA) in Amsterdam. Lente 2027-termijn: maart–mei weekendcolleges, observatie, zelfpraktijk, lesgeven in de praktijk en sessies met master trainer.'
              : '300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA) in Amsterdam. Spring 2027 term: March–May weekend lectures, observation, self practice, teaching practice, and master trainer sessions.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2027-03-13',
            endDate: '2027-05-16',
            schedule: isNl
              ? 'Geselecteerde weekenden mrt–mei 2027, 12:00-18:00'
              : 'Selected weekends Mar–May 2027, 12:00-18:00',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: courseUrl,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: credentialAwarded,
            recognizedByName: 'Pilates Method Alliance (PMA) / ITTAP',
            recognizedByUrl:
              'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program',
          },
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: structuredFaqs }} />

      <div className="academy-page">
        <section className="academy-courses">
          <div className="academy-container">
            <div className="ittap-accreditation">
              <p className="ittap-accreditation-eyebrow">PT7 Academy · Museumplein, Amsterdam</p>
              <h1 className="academy-page-title">
                {isNl ? 'Pilates opleiding Amsterdam' : 'Pilates instructor course Amsterdam'}
              </h1>
              <p className="academy-pma-subtitle">
                {isNl
                  ? 'PMA ITTAP goedgekeurde Reformer docentenopleiding. Weekendrooster bij Museumplein.'
                  : 'PMA ITTAP approved Reformer teacher training. Weekend schedule at Museumplein.'}
              </p>
              {isNl && (
                <p className="academy-lang-note">
                  <strong>Alle lessen en trainingen worden in het Engels gegeven.</strong>
                </p>
              )}

              <div className="academy-offer-strip" id="academy-offer">
                <div className="academy-offer-facts">
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">
                      {isNl ? 'Volgende Reformer-termijn' : 'Next Reformer term'}
                    </span>
                    <span className="academy-offer-value">
                      {isNl ? '21 nov 2026 – 31 jan 2027' : '21 Nov 2026 – 31 Jan 2027'}
                    </span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">{isNl ? 'Formaat' : 'Format'}</span>
                    <span className="academy-offer-value">
                      {isNl ? 'Geselecteerde weekenden' : 'Selected weekends'} · {hours}
                    </span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">{isNl ? 'Cursusprijs' : 'Course fee'}</span>
                    <span className="academy-offer-value">{isNl ? '€2.000 + BTW' : '€2,000 + VAT'}</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">{isNl ? 'Of in 3 termijnen' : 'Or pay in 3'}</span>
                    <span className="academy-offer-value">
                      {isNl ? '3 × €667 + BTW' : '3 × €667 + VAT'}
                    </span>
                  </div>
                </div>
                <div className="academy-offer-actions">
                  <AcademyEnrollButtons course="reformer" location="offer_strip" />
                  <button type="button" className="course-btn secondary" onClick={scrollToEnroll}>
                    {isNl ? 'Bekijk volledig rooster' : 'View full schedule'}
                  </button>
                  <button
                    type="button"
                    className="course-btn secondary"
                    data-academy-inquiry="email"
                    data-course="reformer"
                    data-location="offer_strip"
                    onClick={scrollToInquiry}
                  >
                    {isNl ? 'Informeer' : 'Inquire'}
                  </button>
                </div>
                <p className="academy-offer-note">
                  {isNl
                    ? 'September 2026-termijn volgeboekt. Winter 2026/27 nu open voor inschrijving. Lente 2027 ook open. Mat & Trapeze Table volgt later.'
                    : 'September 2026 term fully booked. Winter 2026/27 now enrolling. Spring 2027 also open. Mat & Trapeze Table coming later.'}
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
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
              </div>
              {isNl ? (
                <>
                  <p>
                    De <strong>{courseTitle}</strong> van PT7 Academy is <strong>ITTAP goedgekeurd</strong> door de{' '}
                    <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer">
                      {PMA_NAME}
                    </a>
                    , de internationale organisatie die zich inzet voor het verhogen van het pilatesberoep en het
                    vaststellen van standaarden voor docentenopleidingen wereldwijd.
                  </p>
                  <p>
                    Via PMA&apos;s ITTAP-accreditatiesysteem is de {courseTitle} beoordeeld en goedgekeurd op
                    curriculum, assessmentstandaarden en onderwijskwaliteit. Afgestudeerden die het volledige
                    programma van 300 uur afronden ontvangen het{' '}
                    <strong>PT7 Academy Reformer Pilates Instructeurscertificaat</strong>.
                  </p>
                  <p>
                    Een {matCourseTitle} <strong>volgt later</strong>.
                  </p>
                  <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer" className="pma-callout-link">
                    Bekijk ITTAP op de website van de Pilates Method Alliance →
                  </a>
                </>
              ) : (
                <>
                  <p>
                    PT7 Academy&apos;s <strong>{courseTitle}</strong> is <strong>ITTAP approved</strong> by the{' '}
                    <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer">
                      {PMA_NAME}
                    </a>
                    , the international organization dedicated to elevating the Pilates profession and setting
                    standards for teacher training worldwide.
                  </p>
                  <p>
                    Through PMA&apos;s ITTAP accreditation system, the {courseTitle} has been reviewed and approved
                    for its curriculum, assessment standards, and educational quality. Graduates who complete the
                    full 300 hours program receive the{' '}
                    <strong>PT7 Academy Reformer Pilates Instructor Certificate</strong>.
                  </p>
                  <p>
                    A {matCourseTitle} is <strong>coming later</strong>.
                  </p>
                  <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer" className="pma-callout-link">
                    View ITTAP on the Pilates Method Alliance website →
                  </a>
                </>
              )}
            </div>

            <section className="academy-audience" aria-labelledby="academy-audience-heading">
              <p className="academy-kicker">{isNl ? 'Voor wie' : "Who it's for"}</p>
              <h2 id="academy-audience-heading">
                {isNl ? 'Word pilatesinstructeur in Amsterdam' : 'Become a Pilates instructor in Amsterdam'}
              </h2>
              <p>
                {isNl
                  ? 'PT7 Academy is opgezet voor mensen die Reformer Pilates willen onderwijzen zonder eerst hun baan op te zeggen. Colleges vinden alleen plaats op geselecteerde weekenden in onze werkende studio aan de Van Baerlestraat, Museumplein. Alle lessen en trainingen worden in het Engels gegeven. In de studio wordt ook Turks en Nederlands gesproken.'
                  : 'PT7 Academy is built for people who want Reformer teacher training in Amsterdam without quitting their job first. This weekend Pilates teacher training runs on selected weekends only at our working studio on Van Baerlestraat, Museumplein. Coaching is English-friendly, with Turkish and Dutch available in the studio community.'}
              </p>
              <div className="benefits-grid academy-audience-grid">
                <div className="benefit-card">
                  <h3>{isNl ? 'Carrièreswitchers' : 'Career changers'}</h3>
                  <p>
                    {isNl ? (
                      <>
                        Veel trainees komen uit banking, tech en andere sectoren. Lees hoe de switch werkt in onze{' '}
                        <Link to="/blog/career-change-banker-to-pilates-instructor/">carrièreswitchgids</Link>, en
                        ontmoet cursusleider <Link to="/trainer/elif/">Elif Arzu Ogan</Link>.
                      </>
                    ) : (
                      <>
                        Many trainees come from banking, tech, and other careers. Read how the switch works in our{' '}
                        <Link to="/blog/career-change-banker-to-pilates-instructor/">career-change guide</Link>, and
                        meet course lead <Link to="/trainer/elif/">Elif Arzu Ogan</Link>.
                      </>
                    )}
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>{isNl ? 'Weekendrooster' : 'Weekend schedule'}</h3>
                  <p>
                    {isNl
                      ? `Vier Reformer college-weekenden per termijn (${hours}), plus observatie, zelfpraktijk en lesuren. Train bij Museumplein en behoud je doordeweekse werk.`
                      : `Four Reformer lecture weekends per term (${hours}), plus observation, self practice, and teaching hours. Train at Museumplein and keep weekday work.`}
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>{isNl ? '300-uur Reformer-route' : '300-hour Reformer pathway'}</h3>
                  <p>
                    {isNl
                      ? 'De Reformer-cursus is PMA ITTAP goedgekeurd, dieper dan korte mat-only intensieven. Afgestudeerden ontvangen het PT7 Academy Reformer Pilates Instructeurscertificaat (programma-ITTAP-goedkeuring is niet hetzelfde als een persoonlijke PMA-lidmaatschapskaart).'
                      : 'The Reformer course is PMA ITTAP approved, deeper than short mat-only intensives. Graduates receive the PT7 Academy Reformer Pilates Instructor Certificate (program-level ITTAP approval is not the same as a personal PMA membership card).'}
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>Mat &amp; Trapeze Table</h3>
                  <p>
                    {isNl
                      ? `Een ${matCourseTitle} volgt later. Informeer als je wilt weten wanneer data bekend zijn.`
                      : `A ${matCourseTitle} is coming later. Inquire if you want to be notified when dates open.`}
                  </p>
                </div>
              </div>
            </section>

            <div className="course-card featured full-width">
              <p className="course-badge">{isNl ? 'Inschrijving' : 'Enrolling'} · Winter 2026/27</p>
              <h2 className="course-card-title">{courseTitle}</h2>
              <p className="academy-course-accreditation">
                {isNl ? (
                  <>
                    300 uur · ITTAP goedgekeurd door de <strong>Pilates Method Alliance (PMA)</strong> · 4 weekenden
                    · {hours}
                  </>
                ) : (
                  <>
                    300 hours · ITTAP approved by the <strong>Pilates Method Alliance (PMA)</strong> · 4 weekends ·{' '}
                    {hours}
                  </>
                )}
              </p>

              <div className="academy-course-section">
                <h3>{isNl ? 'Komende termijnroosters' : 'Upcoming Term Schedules'}</h3>
                <p>
                  {isNl
                    ? `Colleges vinden niet elk weekend plaats. Elke termijn loopt over vier geselecteerde weekenden bij PT Studio 7, Museumplein, Amsterdam. Elk college-weekend duurt ${hours}. Herfst 2026 is volgeboekt; schrijf nu in voor Winter 2026/27. Lente 2027 is ook open. Anatomie is inbegrepen in de Reformer-cursus (Pilates Introductie & Anatomie-weekend).`
                    : `Lectures are not held every weekend. Each term runs on four selected weekends at PT Studio 7, Museumplein, Amsterdam. Each lecture weekend runs ${hours}. Autumn 2026 is fully booked; enroll now for Winter 2026/27. Spring 2027 is also open. Anatomy is included in the Reformer course (Pilates Introduction & Anatomy weekend).`}
                </p>

                <h4 className="term-schedule-heading">
                  {isNl ? 'Herfst 2026 (september–november)' : 'Autumn 2026 (September–November)'}
                  <span className="term-schedule-status">{isNl ? 'Volgeboekt' : 'Fully booked'}</span>
                </h4>
                <div className="term-schedule-grid">
                  {termSchedule2026.map((item) => (
                    <div key={item.module} className="term-schedule-item">
                      <span className="term-schedule-dates">{isNl ? item.datesNl : item.dates}</span>
                      <span className="term-schedule-module">{isNl ? item.moduleNl : item.module}</span>
                    </div>
                  ))}
                </div>

                <h4 className="term-schedule-heading">
                  {isNl ? 'Winter 2026/27 (november–januari)' : 'Winter 2026/27 (November–January)'}
                  <span className="term-schedule-status">{isNl ? 'Inschrijving' : 'Enrolling'}</span>
                </h4>
                <div className="term-schedule-grid">
                  {termScheduleWinter2026.map((item) => (
                    <div key={item.module} className="term-schedule-item">
                      <span className="term-schedule-dates">{isNl ? item.datesNl : item.dates}</span>
                      <span className="term-schedule-module">{isNl ? item.moduleNl : item.module}</span>
                    </div>
                  ))}
                </div>

                <h4 className="term-schedule-heading">{isNl ? 'Lente 2027 (maart–mei)' : 'Spring 2027 (March–May)'}</h4>
                <div className="term-schedule-grid">
                  {termSchedule2027.map((item) => (
                    <div key={item.module} className="term-schedule-item">
                      <span className="term-schedule-dates">{isNl ? item.datesNl : item.dates}</span>
                      <span className="term-schedule-module">{isNl ? item.moduleNl : item.module}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section" id="academy-enroll">
                <h3>{isNl ? 'Cursusprijs' : 'Course Fee'}</h3>
                <div className="price-options">
                  <div className="price-option">
                    <span className="price-option-label">{isNl ? 'Standaard tarief' : 'Standard Fee'}</span>
                    <span className="price-option-amount">{isNl ? '€2.000' : '€2,000'}</span>
                    <span className="price-option-note">{isNl ? '+ BTW (21%)' : '+ VAT (21%)'}</span>
                  </div>
                </div>
                <div className="payment-info payment-info--inline">
                  <h4>{isNl ? 'Betalingsopties' : 'Payment Options'}</h4>
                  <p>
                    {isNl
                      ? 'Betaal in één keer bij checkout, of spreid de cursusprijs over 3 gelijke termijnen.'
                      : 'Pay in full at checkout, or spread the course fee over 3 equal installments.'}
                  </p>
                  <div className="payment-breakdown-grid">
                    <div className="payment-step">
                      <span className="payment-step-label">{isNl ? 'Termijnen' : 'Installments'}</span>
                      <span className="payment-step-amount">3 × €667</span>
                      <span className="payment-step-note">{isNl ? '+ BTW per termijn' : '+ VAT per installment'}</span>
                    </div>
                  </div>
                  <p className="payment-note">
                    {isNl
                      ? 'Kies bij MindBody checkout voor betaling in één keer of 3 termijnen.'
                      : 'Choose pay in full or 3 installments at MindBody checkout below.'}
                  </p>
                </div>
                <div className="academy-enroll-action">
                  <div className="academy-enroll-buttons">
                    <AcademyEnrollButtons course="reformer" location="reformer_fee" />
                  </div>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>{isNl ? 'Curriculumoverzicht' : 'Curriculum Overview'}</h3>
                <p>
                  {isNl
                    ? 'Dit PMA ITTAP goedgekeurde programma combineert theoretische kennis met praktische toepassing voor een diep begrip van pilatesprincipes en lesgeefmethodologie.'
                    : 'This PMA ITTAP approved program combines theoretical knowledge with practical application to ensure a deep understanding of Pilates principles and teaching methodology.'}
                </p>
                <h4>{isNl ? 'Kernonderwerpen' : 'Core Topics Include'}</h4>
                <div className="knowledge-grid">
                  {topics.map((topic) => (
                    <div key={topic} className="knowledge-item">
                      ✓ {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section">
                <h3>{isNl ? 'Assessment & evaluatie' : 'Assessment & Evaluation'}</h3>
                <p>{isNl ? 'Tijdens de cursus voltooien deelnemers:' : 'During the course, participants will complete:'}</p>
                <ul className="academy-bullet-list">
                  <li>{isNl ? '1 theoretisch meerkeuze-examen' : '1 Theoretical Multiple-Choice Exam'}</li>
                  <li>{isNl ? '1 praktijkexamen' : '1 Practical Exam'}</li>
                  <li>
                    {isNl
                      ? 'Verplichte oefeningsevaluatie, beoordeeld door een lead trainer'
                      : 'Mandatory exercise assessment, checked by a lead trainer'}
                  </li>
                </ul>
                <p>
                  {isNl
                    ? 'Het eerste examenpoging voor beide examens is gratis. Herkansingen zijn tegen meerprijs.'
                    : 'The first attempt for both exams is free of charge. Any exam retakes are subject to an additional fee.'}
                </p>
                <p>{exerciseAssessmentNote}</p>
              </div>

              <div className="academy-course-section">
                <h3>{isNl ? 'Cursusvereisten' : 'Course Requirements'}</h3>
                <p>
                  {isNl
                    ? 'Deelnemers moeten de toegewezen huiswerkopdrachten gedurende het programma voltooien en slagen voor de verplichte oefeningsevaluatie met een lead trainer.'
                    : 'Participants are required to complete assigned homework throughout the program and pass the mandatory exercise assessment with a lead trainer.'}
                </p>
              </div>

              <div className="academy-course-section">
                <h3>{isNl ? 'Trainingsoverzicht (300 uur totaal)' : 'Training Breakdown (300 Hours Total)'}</h3>
                <div className="hours-breakdown-grid">
                  {trainingBreakdown.map((item) => (
                    <div key={item.label} className="hours-breakdown-item">
                      <span className="hours-breakdown-hours">{isNl ? item.hoursNl : item.hours}</span>
                      <span className="hours-breakdown-label">{isNl ? item.labelNl : item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section academy-course-section--certification">
                <h3>{isNl ? 'Certificering' : 'Certification'}</h3>
                <p>{isNl ? 'Deelnemers die succesvol:' : 'Participants who successfully:'}</p>
                <ul className="academy-bullet-list">
                  <li>{isNl ? 'Slagen voor alle vereiste examens' : 'Pass all required exams'}</li>
                  <li>
                    {isNl
                      ? 'Het volledige trainingsprogramma van 300 uur afronden'
                      : 'Complete the full training program of 300 hours'}
                  </li>
                  <li>
                    {isNl
                      ? 'De verplichte oefeningsevaluatie voltooien (EUR 250 inclusief BTW)'
                      : 'Complete the mandatory exercise assessment (EUR 250 including BTW)'}
                  </li>
                </ul>
                <p>
                  {isNl ? (
                    <>
                      ontvangen het <strong>PT7 Academy Reformer Pilates Instructeurscertificaat</strong>. Het
                      programma is ITTAP goedgekeurd door de Pilates Method Alliance (PMA); het
                      afgestudeerden-certificaat wordt uitgereikt door PT7 Academy.
                    </>
                  ) : (
                    <>
                      will be awarded the <strong>PT7 Academy Reformer Pilates Instructor Certificate</strong>. The
                      program is ITTAP approved by the Pilates Method Alliance (PMA); the graduate certificate is
                      issued by PT7 Academy.
                    </>
                  )}
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
                    {isNl ? 'Informeer over de cursus' : 'Inquire About the Course'}
                  </button>
                </div>
                <p className="cta-subtext">
                  {isNl ? 'Reactie binnen 48 uur om je plek te bevestigen.' : 'Reply within 48 hours to secure your place.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="academy-benefits">
          <div className="academy-container">
            <p className="academy-kicker">{isNl ? 'Waarom PT7 Academy' : 'Why PT7 Academy'}</p>
            <h2>{isNl ? 'Docentenopleiding in een werkende studio' : 'Teacher training in a working studio'}</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>{isNl ? '300 uur, geen shortcut' : '300 hours, not a shortcut'}</h3>
                <p>
                  {isNl
                    ? 'Volledige route van theorie naar lesgeven, observatie en sessies met master trainer, geen verkort weekend-only certificaat.'
                    : 'Full pathway from theory to teaching practice, observation, and master trainer sessions, not a shortened weekend-only certificate.'}
                </p>
              </div>

              <div className="benefit-card">
                <h3>{isNl ? 'Weekendcolleges' : 'Weekend lectures'}</h3>
                <p>
                  {isNl
                    ? `Vier geplande weekenden per Reformer-termijn (volgende: nov 2026–jan 2027), ${hours}. Behoud je dagbaan tijdens de opleiding.`
                    : `Four scheduled weekends per Reformer term (next: Nov 2026–Jan 2027), ${hours}. Keep your day job while training.`}
                </p>
              </div>

              <div className="benefit-card benefit-card--pma">
                <h3>{isNl ? 'PMA ITTAP Reformer-programma' : 'PMA ITTAP Reformer program'}</h3>
                <p>
                  {isNl
                    ? `De ${courseTitle} is ITTAP goedgekeurd door de Pilates Method Alliance (PMA). Een ${matCourseTitle} volgt later.`
                    : `The ${courseTitle} is ITTAP approved by the Pilates Method Alliance (PMA). A ${matCourseTitle} is coming later.`}
                </p>
              </div>

              <div className="benefit-card">
                <h3>{isNl ? 'Echte boutique studio' : 'Real boutique studio'}</h3>
                <p>
                  {isNl
                    ? 'Training bij PT Studio 7 Museumplein, waar klanten wekelijks Reformer, private en kleine-groepssessies boeken. Je leert waar je straks lesgeeft.'
                    : 'Training at PT Studio 7 Museumplein, where clients book Reformer, private, and small-group sessions every week. You learn where you will teach.'}
                </p>
              </div>

              <div className="benefit-card">
                <h3>{isNl ? 'Duidelijk assessmentpad' : 'Clear assessment path'}</h3>
                <p>
                  {isNl
                    ? 'Theoretische en praktische examens, plus een verplichte oefeningsevaluatie (EUR 250 inclusief BTW), richting het PT7 Academy Reformer Pilates Instructeurscertificaat.'
                    : 'Theoretical and practical exams, plus a mandatory exercise assessment (EUR 250 including BTW), leading to the PT7 Academy Reformer Pilates Instructor Certificate.'}
                </p>
              </div>

              <div className="benefit-card">
                <h3>{isNl ? 'Betaal in één keer of in 3' : 'Pay in full or in 3'}</h3>
                <p>
                  {isNl ? 'MindBody checkout: in één keer, of 3 × EUR 667 + BTW.' : 'MindBody checkout: pay in full, or 3 × EUR 667 + VAT.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <AcademyGraduates locale={isNl ? 'nl' : 'en'} />

        <AcademyInquiry locale={isNl ? 'nl' : 'en'} />

        <section className="academy-benefits">
          <div className="academy-container">
            <p className="academy-kicker">FAQ</p>
            <h2>{isNl ? 'Vragen vóór inschrijving' : 'Questions before you enroll'}</h2>
            <div className="benefits-grid">
              {structuredFaqs.map((faq) => (
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
            <p className="academy-kicker home-kicker-on-dark">{isNl ? 'Volgende stap' : 'Next step'}</p>
            <h2>{isNl ? 'Inschrijven of een vraag stellen' : 'Enroll or ask a question'}</h2>
            <p>
              {isNl
                ? '300-uur Reformer-docentenopleiding (PMA ITTAP goedgekeurd) bij PT7 Academy, Museumplein. Prijzen en betaling hierboven. Mat & Trapeze Table volgt later.'
                : '300-hour Reformer teacher training (PMA ITTAP approved) at PT7 Academy, Museumplein. Fees and payment options above. Mat & Trapeze Table coming later.'}
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
                {isNl ? 'Informeer over de cursus' : 'Inquire About the Course'}
              </button>
              <a
                href="tel:+31685162693"
                className="cta-btn secondary"
                data-academy-inquiry="phone"
                data-course="reformer"
                data-location="bottom_cta"
              >
                {isNl ? 'Bel: +31 685 162693' : 'Call: +31 685 162693'}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
