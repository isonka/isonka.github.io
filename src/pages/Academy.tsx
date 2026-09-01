import { useEffect } from 'react';
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
  COURSE_TITLE,
  ITTAP_LOGO,
  ITTAP_LOGO_ALT,
  MAT_COURSE_TITLE,
  PMA_ITTAP_URL,
  PMA_LOGO,
  PMA_LOGO_ALT,
  PMA_NAME,
  PMA_URL,
  curriculumTopics,
  formatTermSchedule,
  lectureHours,
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

const exerciseAssessmentNote =
  'The exercise assessment is mandatory for certification, costs EUR 250 including BTW.';

const academyHreflang = [
  { hreflang: 'en', href: ACADEMY_URL_EN },
  { hreflang: 'nl', href: ACADEMY_URL_NL },
  { hreflang: 'x-default', href: ACADEMY_URL_EN },
];

export const Academy: React.FC = () => {
  useEffect(() => {
    trackPageView('/academy', 'Pilates Instructor Course Amsterdam | PT7 Academy');
    void ensureHealcodeLoaded();
  }, []);

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

  const academyFaqs = [
    {
      question: 'Who is this Pilates teacher training for?',
      answer:
        'PT7 Academy suits career changers and aspiring instructors who want a serious Reformer pathway (300 hours, PMA ITTAP approved) on a weekend schedule at Museumplein, Amsterdam. Lectures are on selected weekends so you can keep weekday work. Sessions and studio life are English-friendly, with Turkish and Dutch also used in the community. A Mat & Trapeze Table instructor course is coming later.',
    },
    {
      question: 'When are classes held?',
      answer:
        `Lectures are held on selected weekends, not every week. Reformer: Autumn 2026 (September–November) is fully booked. Next open Reformer term is Winter 2026/27 (November–January): ${formatTermSchedule(termScheduleWinter2026)}. Spring 2027 (March–May) is also open: ${formatTermSchedule(termSchedule2027)}. Each lecture weekend runs ${lectureHours}, so you can keep your weekday job while you train.`,
    },
    {
      question: 'What courses does PT7 Academy offer?',
      answer:
        `We currently offer the ${COURSE_TITLE} (ITTAP approved by the Pilates Method Alliance), EUR 2,000 + VAT with MindBody enroll options. A ${MAT_COURSE_TITLE} is coming later.`,
    },
    {
      question: 'How long is the Reformer program?',
      answer:
        'The Reformer Pilates Instructor Course totals 300 hours, combining lectures, observation, self practice, teaching practice, sessions with a master trainer, and QTT observation.',
    },
    {
      question: 'Is anatomy included in the course?',
      answer:
        `Anatomy is included in the ${COURSE_TITLE} (Pilates Introduction & Anatomy weekend).`,
    },
    {
      question: 'What is the accreditation status of the Academy?',
      answer:
        'PT7 Academy\'s Reformer Pilates Instructor Course is ITTAP approved by the Pilates Method Alliance (PMA), the international organization that sets professional standards for Pilates education. Our Reformer program is listed among accredited ITTAP Reformer programs.',
    },
    {
      question: 'What is ITTAP and how is PMA involved?',
      answer:
        'ITTAP (International Teacher Training Accreditation for Pilates) is the Pilates Method Alliance (PMA) accreditation system for teacher training programs. PMA reviews and approves programs that meet its standards for curriculum, assessment, and educational quality. PT7 Academy\'s Reformer Pilates Instructor Course holds ITTAP approval through 2026.',
    },
    {
      question: 'Is the certification recognized internationally?',
      answer:
        'The Reformer Pilates Instructor Course is ITTAP approved by the Pilates Method Alliance (PMA), placing it within PMA\'s international network of accredited Reformer programs. Graduates who complete the full program of 300 hours receive the PT7 Academy Reformer Pilates Instructor Certificate.',
    },
    {
      question: 'How much does the course cost?',
      answer:
        'The course fee is EUR 2,000 plus VAT. Enroll via MindBody to pay in full, or choose Enroll with 3 Installments (3 × EUR 667 + VAT).',
    },
    {
      question: 'What assessments are included?',
      answer:
        'Participants complete one theoretical multiple-choice exam and one practical exam. The first attempt for both exams is free of charge. Any retakes are subject to an additional fee. Separately, a mandatory exercise assessment checked by a lead trainer is required for certification and costs EUR 250 including BTW.',
    },
    {
      question: 'What is the exercise assessment?',
      answer:
        'Each trainee is checked by a lead trainer through a mandatory exercise assessment. It costs EUR 250 including BTW and is required to receive your certificate.',
    },
  ];

  return (
    <>
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
      <StructuredData
        type="Course"
        data={{
          course: {
            name: `${COURSE_TITLE} (Autumn 2026, fully booked)`,
            description:
              '300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA) in Amsterdam. Autumn 2026 term (September–November) is fully booked. Lectures, observation, self practice, teaching practice, and master trainer sessions.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-09-12',
            endDate: '2026-11-08',
            schedule: 'Selected weekends Sep–Nov 2026, 12:00-18:00 (fully booked)',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: ACADEMY_URL_EN,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: 'PT7 Academy Reformer Pilates Instructor Certificate',
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
            name: `${COURSE_TITLE} (Winter 2026/27)`,
            description:
              '300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA) in Amsterdam. Winter 2026/27 term: November–January weekend lectures, observation, self practice, teaching practice, and master trainer sessions.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-11-21',
            endDate: '2027-01-31',
            schedule: 'Selected weekends Nov 2026–Jan 2027, 12:00-18:00',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: ACADEMY_URL_EN,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: 'PT7 Academy Reformer Pilates Instructor Certificate',
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
            name: `${COURSE_TITLE} (Spring 2027)`,
            description:
              '300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA) in Amsterdam. Spring 2027 term: March–May weekend lectures, observation, self practice, teaching practice, and master trainer sessions.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2027-03-13',
            endDate: '2027-05-16',
            schedule: 'Selected weekends Mar–May 2027, 12:00-18:00',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: ACADEMY_URL_EN,
            timeRequired: 'PT300H',
            educationalCredentialAwarded: 'PT7 Academy Reformer Pilates Instructor Certificate',
            recognizedByName: 'Pilates Method Alliance (PMA) / ITTAP',
            recognizedByUrl:
              'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program',
          },
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: academyFaqs }} />

      <div className="academy-page">
        <section className="academy-courses">
          <div className="academy-container">
            <div className="ittap-accreditation">
              <AcademyLangSwitch current="en" />
              <p className="ittap-accreditation-eyebrow">PT7 Academy · Museumplein, Amsterdam</p>
              <h1 className="academy-page-title">Pilates instructor course Amsterdam</h1>
              <p className="academy-pma-subtitle">
                PMA ITTAP approved Reformer teacher training. Weekend schedule at Museumplein.
              </p>

              <div className="academy-offer-strip" id="academy-offer">
                <div className="academy-offer-facts">
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Next Reformer term</span>
                    <span className="academy-offer-value">21 Nov 2026 – 31 Jan 2027</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Format</span>
                    <span className="academy-offer-value">Selected weekends · {lectureHours}</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Course fee</span>
                    <span className="academy-offer-value">€2,000 + VAT</span>
                  </div>
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Or pay in 3</span>
                    <span className="academy-offer-value">3 × €667 + VAT</span>
                  </div>
                </div>
                <div className="academy-offer-actions">
                  <AcademyEnrollButtons course="reformer" location="offer_strip" />
                  <button type="button" className="course-btn secondary" onClick={scrollToEnroll}>
                    View full schedule
                  </button>
                  <button
                    type="button"
                    className="course-btn secondary"
                    data-academy-inquiry="email"
                    data-course="reformer"
                    data-location="offer_strip"
                    onClick={scrollToInquiry}
                  >
                    Inquire
                  </button>
                </div>
                <p className="academy-offer-note">
                  September 2026 term fully booked. Winter 2026/27 now enrolling. Spring 2027 also open. Mat &amp; Trapeze Table coming later.
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
                PT7 Academy&apos;s <strong>{COURSE_TITLE}</strong> is <strong>ITTAP approved</strong> by the{' '}
                <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer">
                  {PMA_NAME}
                </a>
                , the international organization dedicated to elevating the Pilates profession and setting standards
                for teacher training worldwide.
              </p>
              <p>
                Through PMA&apos;s ITTAP accreditation system, the {COURSE_TITLE} has been reviewed and approved for
                its curriculum, assessment standards, and educational quality. Graduates who complete the full 300 hours
                program receive the <strong>PT7 Academy Reformer Pilates Instructor Certificate</strong>.
              </p>
              <p>
                A {MAT_COURSE_TITLE} is <strong>coming later</strong>.
              </p>
              <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer" className="pma-callout-link">
                View ITTAP on the Pilates Method Alliance website →
              </a>
            </div>

            <section className="academy-audience" aria-labelledby="academy-audience-heading">
              <p className="academy-kicker">Who it&apos;s for</p>
              <h2 id="academy-audience-heading">Become a Pilates instructor in Amsterdam</h2>
              <p>
                PT7 Academy is built for people who want Reformer teacher training in Amsterdam without quitting their
                job first. This weekend Pilates teacher training runs on selected weekends only at our working studio
                on Van Baerlestraat, Museumplein. Coaching is English-friendly, with Turkish and Dutch available in the
                studio community.
              </p>
              <div className="benefits-grid academy-audience-grid">
                <div className="benefit-card">
                  <h3>Career changers</h3>
                  <p>
                    Many trainees come from banking, tech, and other careers. Read how the switch works in our{' '}
                    <Link to="/blog/career-change-banker-to-pilates-instructor/">
                      career-change guide
                    </Link>
                    , and meet course lead{' '}
                    <Link to="/trainer/elif/">Elif Arzu Ogan</Link>.
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>Weekend schedule</h3>
                  <p>
                    Four Reformer lecture weekends per term ({lectureHours}), plus observation, self practice, and
                    teaching hours. Train at Museumplein and keep weekday work.
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>300-hour Reformer pathway</h3>
                  <p>
                    The Reformer course is PMA ITTAP approved, deeper than short mat-only intensives. Graduates
                    receive the PT7 Academy Reformer Pilates Instructor Certificate (program-level ITTAP approval is
                    not the same as a personal PMA membership card).
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>Mat &amp; Trapeze Table</h3>
                  <p>
                    A {MAT_COURSE_TITLE} is coming later. Inquire if you want to be notified when dates open.
                  </p>
                </div>
              </div>
            </section>

            <div className="course-card featured full-width">
              <p className="course-badge">Enrolling · Winter 2026/27</p>
              <h2 className="course-card-title">{COURSE_TITLE}</h2>
              <p className="academy-course-accreditation">
                300 hours · ITTAP approved by the <strong>Pilates Method Alliance (PMA)</strong> · 4 weekends ·{' '}
                {lectureHours}
              </p>

              <div className="academy-course-section">
                <h3>Upcoming Term Schedules</h3>
                <p>
                  Lectures are not held every weekend. Each term runs on four selected weekends at PT Studio 7,
                  Museumplein, Amsterdam. Each lecture weekend runs {lectureHours}. Autumn 2026 is fully booked;
                  enroll now for Winter 2026/27. Spring 2027 is also open. Anatomy is included in the Reformer course
                  (Pilates Introduction &amp; Anatomy weekend).
                </p>

                <h4 className="term-schedule-heading">
                  Autumn 2026 (September–November)
                  <span className="term-schedule-status">Fully booked</span>
                </h4>
                <div className="term-schedule-grid">
                  {termSchedule2026.map((item) => (
                    <div key={item.dates} className="term-schedule-item">
                      <span className="term-schedule-dates">{item.dates}</span>
                      <span className="term-schedule-module">{item.module}</span>
                    </div>
                  ))}
                </div>

                <h4 className="term-schedule-heading">
                  Winter 2026/27 (November–January)
                  <span className="term-schedule-status">Enrolling</span>
                </h4>
                <div className="term-schedule-grid">
                  {termScheduleWinter2026.map((item) => (
                    <div key={item.dates} className="term-schedule-item">
                      <span className="term-schedule-dates">{item.dates}</span>
                      <span className="term-schedule-module">{item.module}</span>
                    </div>
                  ))}
                </div>

                <h4 className="term-schedule-heading">Spring 2027 (March–May)</h4>
                <div className="term-schedule-grid">
                  {termSchedule2027.map((item) => (
                    <div key={item.dates} className="term-schedule-item">
                      <span className="term-schedule-dates">{item.dates}</span>
                      <span className="term-schedule-module">{item.module}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section" id="academy-enroll">
                <h3>Course Fee</h3>
                <div className="price-options">
                  <div className="price-option">
                    <span className="price-option-label">Standard Fee</span>
                    <span className="price-option-amount">€2,000</span>
                    <span className="price-option-note">+ VAT (21%)</span>
                  </div>
                </div>
                <div className="payment-info payment-info--inline">
                  <h4>Payment Options</h4>
                  <p>Pay in full at checkout, or spread the course fee over 3 equal installments.</p>
                  <div className="payment-breakdown-grid">
                    <div className="payment-step">
                      <span className="payment-step-label">Installments</span>
                      <span className="payment-step-amount">3 × €667</span>
                      <span className="payment-step-note">+ VAT per installment</span>
                    </div>
                  </div>
                  <p className="payment-note">Choose pay in full or 3 installments at MindBody checkout below.</p>
                </div>
                <div className="academy-enroll-action">
                  <div className="academy-enroll-buttons">
                    <AcademyEnrollButtons course="reformer" location="reformer_fee" />
                  </div>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Curriculum Overview</h3>
                <p>
                  This PMA ITTAP approved program combines theoretical knowledge with practical application to ensure
                  a deep understanding of Pilates principles and teaching methodology.
                </p>
                <h4>Core Topics Include</h4>
                <div className="knowledge-grid">
                  {curriculumTopics.map((topic) => (
                    <div key={topic} className="knowledge-item">
                      ✓ {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Assessment &amp; Evaluation</h3>
                <p>During the course, participants will complete:</p>
                <ul className="academy-bullet-list">
                  <li>1 Theoretical Multiple-Choice Exam</li>
                  <li>1 Practical Exam</li>
                  <li>Mandatory exercise assessment, checked by a lead trainer</li>
                </ul>
                <p>
                  The first attempt for both exams is free of charge. Any exam retakes are subject to an additional fee.
                </p>
                <p>{exerciseAssessmentNote}</p>
              </div>

              <div className="academy-course-section">
                <h3>Course Requirements</h3>
                <p>
                  Participants are required to complete assigned homework throughout the program and pass the mandatory
                  exercise assessment with a lead trainer.
                </p>
              </div>

              <div className="academy-course-section">
                <h3>Training Breakdown (300 Hours Total)</h3>
                <div className="hours-breakdown-grid">
                  {trainingBreakdown.map((item) => (
                    <div key={item.label} className="hours-breakdown-item">
                      <span className="hours-breakdown-hours">{item.hours}</span>
                      <span className="hours-breakdown-label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section academy-course-section--certification">
                <h3>Certification</h3>
                <p>Participants who successfully:</p>
                <ul className="academy-bullet-list">
                  <li>Pass all required exams</li>
                  <li>Complete the full training program of 300 hours</li>
                  <li>
                    Complete the mandatory exercise assessment (EUR 250 including BTW)
                  </li>
                </ul>
                <p>
                  will be awarded the <strong>PT7 Academy Reformer Pilates Instructor Certificate</strong>. The program
                  is ITTAP approved by the Pilates Method Alliance (PMA); the graduate certificate is issued by PT7
                  Academy.
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
                    Inquire About the Course
                  </button>
                </div>
                <p className="cta-subtext">Reply within 48 hours to secure your place.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="academy-benefits">
          <div className="academy-container">
            <p className="academy-kicker">Why PT7 Academy</p>
            <h2>Teacher training in a working studio</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>300 hours, not a shortcut</h3>
                <p>
                  Full pathway from theory to teaching practice, observation, and master trainer sessions, not a
                  shortened weekend-only certificate.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Weekend lectures</h3>
                <p>
                  Four scheduled weekends per Reformer term (next: Nov 2026–Jan 2027), {lectureHours}. Keep your day
                  job while training.
                </p>
              </div>

              <div className="benefit-card benefit-card--pma">
                <h3>PMA ITTAP Reformer program</h3>
                <p>
                  The {COURSE_TITLE} is ITTAP approved by the Pilates Method Alliance (PMA). A {MAT_COURSE_TITLE} is
                  coming later.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Real boutique studio</h3>
                <p>
                  Training at PT Studio 7 Museumplein, where clients book Reformer, private, and small-group sessions
                  every week. You learn where you will teach.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Clear assessment path</h3>
                <p>
                  Theoretical and practical exams, plus a mandatory exercise assessment (EUR 250 including BTW),
                  leading to the PT7 Academy Reformer Pilates Instructor Certificate.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Pay in full or in 3</h3>
                <p>
                  MindBody checkout: pay in full, or 3 × EUR 667 + VAT.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AcademyGraduates locale="en" />

        <AcademyInquiry locale="en" />

        <section className="academy-benefits">
          <div className="academy-container">
            <p className="academy-kicker">FAQ</p>
            <h2>Questions before you enroll</h2>
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
            <p className="academy-kicker home-kicker-on-dark">Next step</p>
            <h2>Enroll or ask a question</h2>
            <p>
              300-hour Reformer teacher training (PMA ITTAP approved) at PT7 Academy, Museumplein. Fees and payment
              options above. Mat &amp; Trapeze Table coming later.
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
                Inquire About the Course
              </button>
              <a
                href="tel:+31685162693"
                className="cta-btn secondary"
                data-academy-inquiry="phone"
                data-course="reformer"
                data-location="bottom_cta"
              >
                Call: +31 685 162693
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
