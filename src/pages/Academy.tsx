import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademyGraduates } from '../components/AcademyGraduates';
import { AcademyInquiry } from '../components/AcademyInquiry';
import { AcademyLangSwitch } from '../components/AcademyLangSwitch';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import {
  ACADEMY_ENROLL_WIDGET,
  ACADEMY_INSTALLMENTS_WIDGET,
  ACADEMY_URL_EN,
  ACADEMY_URL_NL,
  ANATOMY_COURSE_FEE,
  COURSE_TITLE,
  ITTAP_LOGO,
  ITTAP_LOGO_ALT,
  MAT_COURSE_TITLE,
  MAT_COURSE_TOTAL_HOURS,
  PMA_ITTAP_URL,
  PMA_LOGO,
  PMA_LOGO_ALT,
  PMA_NAME,
  PMA_URL,
  curriculumTopics,
  formatTermSchedule,
  lectureHours,
  matTrapezeBreakdown,
  matTrapezeIncludes,
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
  'The exercise assessment is mandatory for certification, costs EUR 250 including BTW.';

const academyHreflang = [
  { hreflang: 'en', href: ACADEMY_URL_EN },
  { hreflang: 'nl', href: ACADEMY_URL_NL },
  { hreflang: 'x-default', href: ACADEMY_URL_EN },
];

export const Academy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reformer' | 'mat'>('reformer');

  useEffect(() => {
    trackPageView('/academy', 'Pilates Instructor Course Amsterdam | PT7 Academy');
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
      question: 'Who is this Pilates teacher training for?',
      answer:
        'PT7 Academy suits career changers and aspiring instructors who want a serious Reformer pathway (300 hours, PMA ITTAP approved) or Mat & Trapeze Table training on a weekend schedule at Museumplein, Amsterdam. Lectures are on selected weekends so you can keep weekday work. Sessions and studio life are English-friendly, with Turkish and Dutch also used in the community.',
    },
    {
      question: 'When are classes held?',
      answer:
        `Lectures are held on selected weekends, not every week. Reformer terms: Autumn 2026 (September–November): ${formatTermSchedule(termSchedule2026)}; Spring 2027 (March–May): ${formatTermSchedule(termSchedule2027)}. Mat & Trapeze Table (November 2026–January 2027): ${formatTermSchedule(matTrapezeSchedule)}. Each lecture weekend runs ${lectureHours}, so you can keep your weekday job while you train.`,
    },
    {
      question: 'What courses does PT7 Academy offer?',
      answer:
        `We offer the ${COURSE_TITLE} (ITTAP approved by the Pilates Method Alliance) and the ${MAT_COURSE_TITLE} (curriculum follows international standards; PMA/ITTAP accreditation in progress). Each course is EUR 2,000 + VAT with the same MindBody enroll options.`,
    },
    {
      question: 'How long is the Reformer program?',
      answer:
        'The Reformer Pilates Instructor Course totals 300 hours, combining lectures, observation, self practice, teaching practice, sessions with a master trainer, and QTT observation.',
    },
    {
      question: 'How long is the Mat & Trapeze Table program?',
      answer:
        `The ${MAT_COURSE_TITLE} totals ${MAT_COURSE_TOTAL_HOURS} hours: 48 hours in-person technical training, 20 hours observation, 20 hours self practice, 15 hours student teaching, 15 hours private or group sessions with QTT, 5 hours assisted teaching with QTT, and 2 hours QTT observation of student teaching.`,
    },
    {
      question: 'Is anatomy included in the courses?',
      answer:
        `Anatomy is included in the ${COURSE_TITLE} (Pilates Introduction & Anatomy weekend). The ${MAT_COURSE_TITLE} does not include anatomy. Trainees without prior anatomy training need to take the separate Anatomy course (${ANATOMY_COURSE_FEE} + VAT).`,
    },
    {
      question: 'What is the accreditation status of the Academy?',
      answer:
        'PT7 Academy\'s Reformer Pilates Instructor Course is ITTAP approved by the Pilates Method Alliance (PMA), the international organization that sets professional standards for Pilates education. Our Reformer program is listed among accredited ITTAP Reformer programs. The Mat & Trapeze Table Instructor Course follows international teacher-training standards; PMA/ITTAP accreditation for that track is in progress and not yet approved.',
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
        description="Pilates instructor course and teacher training in Amsterdam. 300-hour Reformer Pilates instructor course (PMA ITTAP approved), Mat Pilates track, weekend schedule for career changers. Course fee from €2,000 + VAT."
        keywords="pilates instructor course amsterdam, pilates teacher training amsterdam, reformer pilates instructor course, reformer teacher training amsterdam, become a pilates instructor amsterdam, ITTAP approved pilates course, PMA ITTAP reformer course netherlands, mat pilates instructor course amsterdam, weekend pilates teacher training, pilates instructor course for career changers, pilates instructor course amsterdam price"
        canonical={ACADEMY_URL_EN}
        ogTitle="Pilates Instructor Course Amsterdam | Reformer Teacher Training"
        ogDescription="Become a Pilates instructor in Amsterdam: 300-hour Reformer teacher training (PMA ITTAP approved) plus Mat & Trapeze Table. Weekend intensives at Museumplein."
        ogLocale="en_US"
        ogLocaleAlternates={['nl_NL']}
        htmlLang="en"
        hreflangAlternates={academyHreflang}
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: COURSE_TITLE,
            description:
              '300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA) in Amsterdam. Lectures, observation, self practice, teaching practice, and master trainer sessions.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-09-12',
            endDate: '2026-11-08',
            schedule: 'Selected weekends Sep–Nov 2026, 12:00-18:00',
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
      <StructuredData
        type="Course"
        data={{
          course: {
            name: MAT_COURSE_TITLE,
            description:
              'Mat & Trapeze Table Instructor Course at PT Studio 7 Amsterdam (125 hours). Mat Pilates and Cadillac/Trapeze Table teacher training on selected weekends. Curriculum follows international standards; PMA/ITTAP accreditation in progress. PT7 Academy certificate.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-11-21',
            endDate: '2027-01-31',
            schedule: 'Selected weekends Nov 2026–Jan 2027, 12:00-18:00',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            url: ACADEMY_URL_EN,
            timeRequired: 'PT125H',
            educationalCredentialAwarded: 'PT7 Academy Mat & Trapeze Table Instructor Certificate',
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
              <h1 className="academy-page-title">
                Pilates Instructor Course Amsterdam — PMA ITTAP Approved Teacher Training
              </h1>
              <p className="academy-pma-subtitle">
                Reformer teacher training Amsterdam · PMA ITTAP approved · Weekend schedule
              </p>

              <div className="academy-offer-strip" id="academy-offer">
                <div className="academy-offer-facts">
                  <div className="academy-offer-fact">
                    <span className="academy-offer-label">Next Reformer term</span>
                    <span className="academy-offer-value">12 Sep – 8 Nov 2026</span>
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
                  <div
                    className="course-btn primary academy-enroll-btn"
                    data-course="reformer"
                    data-location="offer_strip"
                    dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                  />
                  <div
                    className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                    data-course="reformer"
                    data-location="offer_strip"
                    dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
                  />
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
                  Spring 2027 term also open (13 Mar – 16 May). Mat &amp; Trapeze Table track below.
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
                The {MAT_COURSE_TITLE} follows international teacher-training standards. PMA / ITTAP accreditation for
                this track is <strong>in progress</strong> and not yet approved.
              </p>
              <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer" className="pma-callout-link">
                View ITTAP on the Pilates Method Alliance website →
              </a>
            </div>

            <section className="academy-audience" aria-labelledby="academy-audience-heading">
              <h2 id="academy-audience-heading">Become a Pilates instructor in Amsterdam</h2>
              <p>
                PT7 Academy is built for people who want Reformer teacher training in Amsterdam (and optionally Mat
                &amp; Trapeze Table) without quitting their job first. This weekend Pilates teacher training runs on
                selected weekends only at our working studio on Van Baerlestraat, Museumplein. Coaching is
                English-friendly, with Turkish and Dutch available in the studio community.
              </p>
              <div className="benefits-grid academy-audience-grid">
                <div className="benefit-card">
                  <h3>Pilates instructor course for career changers</h3>
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
                  <h3>Weekend Pilates teacher training in Amsterdam</h3>
                  <p>
                    Four Reformer lecture weekends per term ({lectureHours}), plus observation, self practice, and
                    teaching hours. Train at Museumplein and keep weekday work.
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>Serious Reformer pathway</h3>
                  <p>
                    The Reformer course is 300 hours and PMA ITTAP approved. That is a different depth than short
                    mat-only intensives. Graduates receive the PT7 Academy Reformer Pilates Instructor Certificate
                    (program-level ITTAP approval is not the same as a personal PMA membership card).
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>Mat &amp; Trapeze Table track</h3>
                  <p>
                    Add apparatus teaching with our {MAT_COURSE_TOTAL_HOURS}-hour Mat &amp; Trapeze Table course.
                    Curriculum follows international standards; PMA/ITTAP accreditation for this track is still in
                    progress.
                  </p>
                </div>
              </div>
            </section>

            <div className="academy-tabs" role="tablist" aria-label="Academy courses">
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
                <div role="tabpanel" aria-label="Reformer Pilates Instructor Course">
            <div className="course-card featured full-width">
              <div className="course-badge">Enrolling Now</div>
              <h2 className="course-card-title">{COURSE_TITLE}</h2>
              <p className="academy-course-accreditation">
                300 hours · ITTAP Approved · <strong>Pilates Method Alliance (PMA)</strong>
              </p>

              <div className="course-highlights">
                <div className="highlight-item">
                  <span>PMA ITTAP approved</span>
                </div>
                <div className="highlight-item">
                  <span>Pilates Method Alliance accredited</span>
                </div>
                <div className="highlight-item">
                  <span>300 hours total</span>
                </div>
                <div className="highlight-item">
                  <span>4 weekend intensives</span>
                </div>
                <div className="highlight-item">
                  <span>2026 &amp; 2027 terms</span>
                </div>
                <div className="highlight-item">
                  <span>3 installment plan</span>
                </div>
                <div className="highlight-item">
                  <span>{lectureHours}</span>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Upcoming Term Schedules</h3>
                <p>
                  Lectures are not held every weekend. Each term runs on four selected weekends at PT Studio 7,
                  Museumplein, Amsterdam. Each lecture weekend runs {lectureHours}. Same course fee and enroll options
                  for both terms. Anatomy is included in the Reformer course (Pilates Introduction &amp; Anatomy weekend).
                </p>

                <h4 className="term-schedule-heading">Autumn 2026 (September–November)</h4>
                <div className="term-schedule-grid">
                  {termSchedule2026.map((item) => (
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
                    <div
                      className="course-btn primary academy-enroll-btn"
                      data-course="reformer"
                      data-location="reformer_fee"
                      dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                    />
                    <div
                      className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                      data-course="reformer"
                      data-location="reformer_fee"
                      dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
                    />
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
                  <div
                    className="course-btn primary academy-enroll-btn"
                    data-course="reformer"
                    data-location="reformer_cta"
                    dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                  />
                  <div
                    className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                    data-course="reformer"
                    data-location="reformer_cta"
                    dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
                  />
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
              )}

              {activeTab === 'mat' && (
                <div role="tabpanel" aria-label="Mat and Trapeze Table Instructor Course">
            <div className="course-card full-width">
              <div className="course-badge">Enrolling Now</div>
              <h2 className="course-card-title">{MAT_COURSE_TITLE}</h2>
              <p className="academy-course-accreditation">
                Mat Pilates &amp; Trapeze Table (Cadillac) · Follows international standards ·{' '}
                <strong>PMA / ITTAP accreditation in progress</strong>
              </p>

              <div className="course-highlights">
                <div className="highlight-item">
                  <span>International standards</span>
                </div>
                <div className="highlight-item">
                  <span>Accreditation in progress</span>
                </div>
                <div className="highlight-item">
                  <span>125 hours total</span>
                </div>
                <div className="highlight-item">
                  <span>48 hours lectures</span>
                </div>
                <div className="highlight-item">
                  <span>4 weekend intensives</span>
                </div>
                <div className="highlight-item">
                  <span>Nov 2026 – Jan 2027</span>
                </div>
                <div className="highlight-item">
                  <span>3 installment plan</span>
                </div>
                <div className="highlight-item">
                  <span>{lectureHours}</span>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Term Schedule</h3>
                <p>
                  Four selected weekends at PT Studio 7, Museumplein, Amsterdam. Each lecture weekend runs{' '}
                  {lectureHours}.
                </p>
                <div className="term-schedule-grid">
                  {matTrapezeSchedule.map((item) => (
                    <div key={item.dates} className="term-schedule-item">
                      <span className="term-schedule-dates">{item.dates}</span>
                      <span className="term-schedule-module">{item.module}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Course Fee</h3>
                <div className="price-options">
                  <div className="price-option">
                    <span className="price-option-label">Standard Fee</span>
                    <span className="price-option-amount">€2,000</span>
                    <span className="price-option-note">+ VAT (21%)</span>
                  </div>
                  <div className="price-option">
                    <span className="price-option-label">Anatomy Course (if needed)</span>
                    <span className="price-option-amount">{ANATOMY_COURSE_FEE}</span>
                    <span className="price-option-note">+ VAT (21%)</span>
                  </div>
                </div>
                <p className="payment-note" style={{ marginBottom: '16px' }}>
                  Anatomy is <strong>not</strong> included in the Mat &amp; Trapeze Table course (it is part of the
                  Reformer course). If you do not already have anatomy training, you need to purchase the separate
                  Anatomy course for {ANATOMY_COURSE_FEE} + VAT.
                </p>
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
                    <div
                      className="course-btn primary academy-enroll-btn"
                      data-course="mat"
                      data-location="mat_fee"
                      dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                    />
                    <div
                      className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                      data-course="mat"
                      data-location="mat_fee"
                      dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
                    />
                  </div>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>What&apos;s Included</h3>
                <ul className="academy-bullet-list">
                  {matTrapezeIncludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>
                  Does <strong>not</strong> include anatomy. Without prior anatomy training, add the separate Anatomy
                  course ({ANATOMY_COURSE_FEE} + VAT).
                </p>
              </div>

              <div className="academy-course-section">
                <h3>Training Breakdown ({MAT_COURSE_TOTAL_HOURS} Hours Total)</h3>
                <div className="hours-breakdown-grid">
                  {matTrapezeBreakdown.map((item) => (
                    <div key={item.label} className="hours-breakdown-item">
                      <span className="hours-breakdown-hours">{item.hours}</span>
                      <span className="hours-breakdown-label">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p>
                  Graduates who complete the program receive a <strong>PT7 Academy Mat &amp; Trapeze Table Instructor
                  Certificate</strong>. The curriculum follows international teacher-training standards. PMA / ITTAP
                  accreditation for this course is <strong>in progress</strong> and not yet approved.
                </p>
              </div>

              <div className="course-cta">
                <div className="course-cta-buttons">
                  <div
                    className="course-btn primary academy-enroll-btn"
                    data-course="mat"
                    data-location="mat_cta"
                    dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                  />
                  <div
                    className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                    data-course="mat"
                    data-location="mat_cta"
                    dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
                  />
                  <button
                    type="button"
                    className="course-btn secondary"
                    data-academy-inquiry="email"
                    data-course="mat"
                    data-location="mat_cta"
                    onClick={scrollToInquiry}
                  >
                    Inquire About This Course
                  </button>
                </div>
                <p className="cta-subtext">Reply within 48 hours to secure your place.</p>
              </div>
            </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="academy-benefits">
          <div className="academy-container">
            <h2>Why choose PT7 Academy for Pilates teacher training Amsterdam</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>300 Hours Comprehensive Training</h3>
                <p>
                  A full pathway from theory to teaching practice, observation, and master trainer sessions, not a
                  shortened weekend-only certificate.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Weekend Pilates teacher training</h3>
                <p>
                  Train on four scheduled weekends per term (Sep–Nov 2026 or Mar–May 2027), {lectureHours}, and keep your
                  day job while becoming a certified Reformer instructor.
                </p>
              </div>

              <div className="benefit-card benefit-card--pma">
                <h3>PMA ITTAP Accredited Reformer Program</h3>
                <p>
                  The {COURSE_TITLE} is ITTAP approved by the Pilates Method Alliance (PMA). The{' '}
                  {MAT_COURSE_TITLE} follows international standards, with PMA/ITTAP accreditation currently in progress.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Teaching inside a real boutique studio</h3>
                <p>
                  Training happens at PT Studio 7 Museumplein, where clients book Reformer, private, and small-group
                  sessions every week. You learn in the same environment you will teach in.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Structured Assessment</h3>
                <p>
                  Theoretical and practical exams, plus a mandatory exercise assessment (EUR 250 including BTW),
                  with a clear path to the PT7 Academy Reformer Pilates Instructor Certificate.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Flexible Payment</h3>
                <p>
                  Pay in full at checkout, or spread the course fee over 3 equal installments through MindBody
                  (3 × EUR 667 + VAT).
                </p>
              </div>
            </div>
          </div>
        </section>

        <AcademyGraduates locale="en" />

        <AcademyInquiry locale="en" />

        <section className="academy-benefits">
          <div className="academy-container">
            <h2>Frequently Asked Questions</h2>
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
            <h2>Ready to Become a Pilates Instructor in Amsterdam?</h2>
            <p>
              Enroll in the ITTAP approved Reformer Pilates instructor course or the Mat Pilates instructor course
              Amsterdam option ({MAT_COURSE_TITLE}) at PT7 Academy. Weekend teacher training at Museumplein — see
              course fee and payment options above.
            </p>
            <div className="cta-buttons">
              <div
                className="cta-btn primary academy-enroll-btn"
                data-course="reformer"
                data-location="bottom_cta"
                dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
              />
              <div
                className="cta-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                data-course="reformer"
                data-location="bottom_cta"
                dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
              />
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
