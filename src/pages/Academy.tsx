import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademyUrgencyBanner } from '../components/AcademyUrgencyBanner';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import '../styles/Academy.css';

declare global {
  interface Window {
    HealcodeWidget?: {
      init: () => void;
    };
  }
}

const ITTAP_LOGO = '/assets/images/pma-ittap-reformer-approved-2026.png';
const PMA_LOGO = '/assets/images/pma-logo-black.png';
const ITTAP_LOGO_ALT =
  'ITTAP Approved Reformer Pilates Instructor Course 2026, Pilates Method Alliance (PMA)';
const PMA_LOGO_ALT = 'Pilates Method Alliance (PMA)';
const PMA_URL = 'https://www.pilatesmethodalliance.org/';
const PMA_ITTAP_URL =
  'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program';
const PMA_NAME = 'Pilates Method Alliance (PMA)';

const COURSE_TITLE = 'Reformer Pilates Instructor Course';
const MAT_COURSE_TITLE = 'Mat & Trapeze Table Instructor Course';

const ACADEMY_ENROLL_WIDGET =
  '<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100058" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Enroll"></healcode-widget>';

const ACADEMY_INSTALLMENTS_WIDGET =
  '<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100065" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Enroll with 3 Installments"></healcode-widget>';

const termSchedule2026 = [
  { dates: '12–13 September 2026', module: 'Pilates Introduction & Anatomy' },
  { dates: '26–27 September 2026', module: 'Reformer 1' },
  { dates: '17–18 October 2026', module: 'Reformer 2' },
  { dates: '7–8 November 2026', module: 'Reformer 3' },
];

const termSchedule2027 = [
  { dates: '13–14 March 2027', module: 'Pilates Introduction & Anatomy' },
  { dates: '3–4 April 2027', module: 'Reformer 1' },
  { dates: '24–25 April 2027', module: 'Reformer 2' },
  { dates: '15–16 May 2027', module: 'Reformer 3' },
];

const matTrapezeSchedule = [
  { dates: '21–22 November 2026', module: 'Mat 1' },
  { dates: '12–13 December 2026', module: 'Trapeze Table 1' },
  { dates: '9–10 January 2027', module: 'Mat 2 & Trapeze Table 2' },
  { dates: '30–31 January 2027', module: 'Mat 3 & Trapeze Table 3' },
];

const formatTermSchedule = (schedule: { dates: string; module: string }[]) =>
  schedule.map((item) => `${item.dates} (${item.module})`).join('; ');

const lectureHours = '12:00 to 18:00';
const exerciseAssessmentNote =
  'The exercise assessment is mandatory for certification, costs EUR 250 including BTW.';

const curriculumTopics = [
  'History of Pilates',
  'Functional Anatomy',
  'Movement Principles',
  'Postural Patterns',
  'Breathing Anatomy',
  'Code of Ethics',
  'Class Planning & Preparation',
  'Contraindications',
  'Reformer Level 1 Exercises',
  'Reformer Level 2 Exercises',
  'Reformer Level 3 Exercises',
  'Regressions, Progressions, Modifications, and Contraindications for all exercises',
];

const matTrapezeIncludes = [
  '48 hours of in-person technical training',
  'Comprehensive Mat Pilates curriculum (Mat 1–3)',
  'Trapeze Table (Cadillac) training (Trapeze Table 1–3)',
  '2 exams (theoretical & practical)',
  'One-on-one final assessment',
  'PT7 Academy completion certificate',
];

const ANATOMY_COURSE_FEE = '€500';

const trainingBreakdown = [
  { hours: '85 hours', label: 'Lectures & Theory' },
  { hours: '60 hours', label: 'Observation' },
  { hours: '60 hours', label: 'Self Practice' },
  { hours: '40 hours', label: 'Teaching Practice' },
  { hours: '40 hours', label: 'Private or Group Sessions with Master Trainer' },
  { hours: '10 hours', label: 'Assisted Teaching with Master Trainer' },
  { hours: '5 hours', label: 'QTT Observation of Student Teaching & Assessment' },
];

const matTrapezeBreakdown = [
  { hours: '48 hours', label: 'In-person technical training (lectures)' },
  { hours: '20 hours', label: 'Observation' },
  { hours: '20 hours', label: 'Self Practice' },
  { hours: '15 hours', label: 'Student Teaching' },
  { hours: '15 hours', label: 'Private or Group Sessions with QTT' },
  { hours: '5 hours', label: 'Assisted Teaching with QTT' },
  { hours: '2 hours', label: 'QTT Observation of Student Teaching' },
];

const MAT_COURSE_TOTAL_HOURS = 125;

export const Academy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reformer' | 'mat'>('reformer');

  useEffect(() => {
    window.HealcodeWidget?.init?.();
  }, [activeTab]);

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
        description="Pilates teacher training in Amsterdam at Museumplein. 300-hour Reformer instructor course (PMA ITTAP approved) plus Mat & Trapeze Table track. Weekend schedule for career changers."
        keywords="Pilates instructor course Amsterdam, Pilates teacher training Amsterdam, PMA ITTAP, Reformer Pilates Instructor Course, Mat Pilates instructor course, Trapeze Table instructor training, ITTAP approved Pilates"
        canonical="https://www.pt7.nl/academy"
        ogTitle="Pilates Instructor Course Amsterdam | PT7 Academy"
        ogDescription="Pilates teacher training at Museumplein: 300-hour Reformer course (PMA ITTAP approved) and Mat & Trapeze Table track. Weekend intensives for 2026 and 2027."
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
            url: 'https://www.pt7.nl/academy',
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
            url: 'https://www.pt7.nl/academy',
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
            url: 'https://www.pt7.nl/academy',
            timeRequired: 'PT125H',
            educationalCredentialAwarded: 'PT7 Academy Mat & Trapeze Table Instructor Certificate',
          },
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: academyFaqs }} />

      <div className="academy-page">
        <AcademyUrgencyBanner />

        <section className="academy-courses">
          <div className="academy-container">
            <div className="ittap-accreditation">
              <h1 className="academy-page-title">Pilates Instructor Courses Amsterdam</h1>
              <p className="academy-pma-subtitle">Pilates teacher training at Museumplein · PT7 Academy</p>
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
              <h2 id="academy-audience-heading">Who this Pilates teacher training is for</h2>
              <p>
                PT7 Academy is built for people who want to teach Reformer Pilates (and optionally Mat &amp; Trapeze
                Table) without quitting their job first. Lectures run on selected weekends only at our working studio
                on Van Baerlestraat, Museumplein. Coaching is English-friendly, with Turkish and Dutch available in
                the studio community.
              </p>
              <div className="benefits-grid academy-audience-grid">
                <div className="benefit-card">
                  <h3>Career changers</h3>
                  <p>
                    Many trainees come from banking, tech, and other careers. Read how the switch works in our{' '}
                    <Link to="/blog/career-change-banker-to-pilates-instructor">
                      career-change guide
                    </Link>
                    , and meet course lead{' '}
                    <Link to="/trainer/elif">Elif Arzu Ogan</Link>.
                  </p>
                </div>
                <div className="benefit-card">
                  <h3>Weekend schedule in central Amsterdam</h3>
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

              <div className="academy-course-section">
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
                      dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                    />
                    <div
                      className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
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
                    dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                  />
                  <div
                    className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                    dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
                  />
                  <a
                    href="mailto:info@pt7.nl?subject=Reformer Pilates Instructor Course Inquiry"
                    className="course-btn secondary"
                  >
                    Inquire About the Course
                  </a>
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
                      dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                    />
                    <div
                      className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
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
                    dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
                  />
                  <div
                    className="course-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                    dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
                  />
                  <a
                    href="mailto:info@pt7.nl?subject=Mat %26 Trapeze Table Instructor Course Inquiry"
                    className="course-btn secondary"
                  >
                    Inquire About This Course
                  </a>
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
            <h2>Why choose PT7 Academy for Pilates teacher training</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>300 Hours Comprehensive Training</h3>
                <p>
                  A full pathway from theory to teaching practice, observation, and master trainer sessions, not a
                  shortened weekend-only certificate.
                </p>
              </div>

              <div className="benefit-card">
                <h3>Selected Weekend Schedule</h3>
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
            <h2>Ready to Become a Pilates Instructor?</h2>
            <p>
              Choose the PMA ITTAP approved {COURSE_TITLE} or the {MAT_COURSE_TITLE} at PT7 Academy in Amsterdam.
              Weekend intensives at Museumplein.
            </p>
            <div className="cta-buttons">
              <div
                className="cta-btn primary academy-enroll-btn"
                dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
              />
              <div
                className="cta-btn secondary academy-enroll-btn academy-enroll-btn--installments"
                dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
              />
              <a href="mailto:info@pt7.nl?subject=Reformer Pilates Instructor Course Inquiry" className="cta-btn secondary">
                Inquire About the Course
              </a>
              <a href="tel:+31685162693" className="cta-btn secondary">
                Call: +31 685 162693
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
