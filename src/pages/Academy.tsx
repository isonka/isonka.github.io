import { useEffect } from 'react';
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
  'https://www.pilatesmethodalliance.org/international-teacher-trainer-accreditation-for-pilates';
const PMA_NAME = 'Pilates Method Alliance (PMA)';

const COURSE_TITLE = 'Reformer Pilates Instructor Course';

const ACADEMY_ENROLL_WIDGET =
  '<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100058" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Enroll"></healcode-widget>';

const ACADEMY_INSTALLMENTS_WIDGET =
  '<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100065" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Enroll with 3 Installments"></healcode-widget>';

const termSchedule = [
  { dates: '12–13 September 2026', module: 'Pilates Introduction & Anatomy' },
  { dates: '26–27 September 2026', module: 'Reformer 1' },
  { dates: '17–18 October 2026', module: 'Reformer 2' },
  { dates: '7–8 November 2026', module: 'Reformer 3' },
];

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

const trainingBreakdown = [
  { hours: '85 hours', label: 'Lectures & Theory' },
  { hours: '60 hours', label: 'Observation' },
  { hours: '60 hours', label: 'Self Practice' },
  { hours: '40 hours', label: 'Teaching Practice' },
  { hours: '40 hours', label: 'Private or Group Sessions with Master Trainer' },
  { hours: '10 hours', label: 'Assisted Teaching with Master Trainer' },
  { hours: '5 hours', label: 'QTT Observation of Student Teaching & Assessment' },
];

export const Academy: React.FC = () => {
  useEffect(() => {
    window.HealcodeWidget?.init?.();
  }, []);

  const academyFaqs = [
    {
      question: 'When are classes held?',
      answer:
        `Lectures are held on selected weekends, not every week. The next term runs September to November 2026: ${termSchedule.map((item) => `${item.dates} (${item.module})`).join('; ')}. Each lecture weekend runs ${lectureHours}, so you can keep your weekday job while you train.`,
    },
    {
      question: 'How long is the program?',
      answer:
        'The Reformer Pilates Instructor Course totals 300 hours, combining lectures, observation, self practice, teaching practice, sessions with a master trainer, and QTT observation.',
    },
    {
      question: 'What is the accreditation status of the Academy?',
      answer:
        'PT7 Academy\'s Reformer Pilates Instructor Course is ITTAP approved by the Pilates Method Alliance (PMA), the international organization that sets professional standards for Pilates education. Our program is listed among accredited ITTAP Reformer programs.',
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
        'The standard fee is EUR 2,000 plus VAT, or EUR 1,800 plus VAT with early bird pricing before the end of June. Enroll via MindBody to pay in full, or choose Enroll with 3 Installments (3 × EUR 667 + VAT standard, or 3 × EUR 600 + VAT early bird).',
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
        title="Reformer Pilates Instructor Course Amsterdam | PT7 Academy"
        description="300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA). Next term: September–November 2026 weekend intensives in Amsterdam. Early bird EUR 1,800 + VAT until end of June."
        keywords="Pilates Method Alliance, PMA ITTAP, Reformer Pilates Instructor Course, 300 hours reformer training, Reformer instructor course Amsterdam, ITTAP approved Pilates, Pilates teacher training Netherlands"
        canonical="https://www.pt7.nl/academy"
        ogTitle="Reformer Pilates Instructor Course | PMA ITTAP Approved | PT7 Academy"
        ogDescription="300 hours Reformer Pilates Instructor Course, ITTAP approved by the Pilates Method Alliance (PMA). Next term starts 12 September 2026. Early bird pricing available."
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
            schedule: 'Selected weekends Sep–Nov 2026, 12:00-18:00',
            startTime: '12:00',
            endTime: '18:00',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
          },
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: academyFaqs }} />

      <div className="academy-page">
        <AcademyUrgencyBanner />

        <section className="academy-about">
          <div className="academy-container">
            <h1 className="academy-page-title">{COURSE_TITLE}</h1>
            <p className="academy-pma-subtitle">
              300 hours · ITTAP Approved · <strong>Pilates Method Alliance (PMA)</strong>
            </p>
            <p className="start-date">
              <strong>Next term starts 12 September 2026</strong> · Selected weekend lectures, {lectureHours}
            </p>

            <div className="ittap-accreditation">
              <p className="ittap-accreditation-eyebrow">Pilates Method Alliance Accreditation</p>
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
            </div>

            <div className="pma-callout">
              <h2>Why PMA Accreditation Matters</h2>
              <p>
                The {PMA_NAME} is the leading international body for Pilates education. ITTAP approval means a program
                meets PMA standards for Reformer teacher training, giving future instructors confidence that their
                education aligns with recognized professional requirements.
              </p>
              <p>
                Graduates who complete the full program receive the PT7 Academy Reformer Pilates Instructor Certificate,
                recognized internationally through PMA&apos;s ITTAP accreditation framework.
              </p>
              <a href={PMA_ITTAP_URL} target="_blank" rel="noopener noreferrer" className="pma-callout-link">
                View ITTAP on the Pilates Method Alliance website →
              </a>
            </div>

            <p className="academy-lead">
              The {COURSE_TITLE} is a comprehensive program of 300 hours designed for individuals who want to become highly
              qualified Reformer Pilates instructors, delivered through a curriculum aligned with {PMA_NAME} ITTAP
              standards.
            </p>

            <p>
              <strong>Thinking about a career change?</strong> Many of our instructors came from banking, tech, and
              corporate backgrounds. Lectures run on selected weekends only, so you can train while keeping your
              current job.
            </p>
            <p>
              Read our <Link to="/blog/career-change-banker-to-pilates-instructor">career-change story</Link> and
              explore the <Link to="/trainer/elif">Elif instructor profile</Link> to see who leads the training.
            </p>
            <p>
              To see the real sessions on our
              <Link to="/workouts/reformer-pilates"> Reformer Pilates</Link>,
              <Link to="/private-pilates-amsterdam"> Private Pilates</Link>, and
              <Link to="/prenatal-pilates-amsterdam"> Prenatal Pilates</Link> pages.
            </p>
          </div>
        </section>

        <section className="academy-courses">
          <div className="academy-container">
            <div className="course-card featured full-width">
              <div className="course-badge">Enrolling Now</div>
              <h2 className="course-card-title">Course Overview</h2>

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
                  <span>Sep–Nov 2026</span>
                </div>
                <div className="highlight-item">
                  <span>3 installment plan</span>
                </div>
                <div className="highlight-item">
                  <span>{lectureHours}</span>
                </div>
              </div>

              <div className="academy-course-section">
                <h3>Next Term Schedule</h3>
                <p>
                  Lectures are not held every weekend. The next term runs on four selected weekends at PT Studio 7,
                  Museumplein, Amsterdam. Each lecture weekend runs {lectureHours}.
                </p>
                <div className="term-schedule-grid">
                  {termSchedule.map((item) => (
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
                  <div className="price-option price-option--early">
                    <span className="price-option-label">Early Bird</span>
                    <span className="price-option-amount">€1,800</span>
                    <span className="price-option-note">+ VAT (21%) · until end of June</span>
                  </div>
                </div>
                <div className="payment-info payment-info--inline">
                  <h4>Payment Options</h4>
                  <p>Pay in full at checkout, or spread the course fee over 3 equal installments.</p>
                  <div className="payment-breakdown-grid">
                    <div className="payment-step">
                      <span className="payment-step-label">Standard</span>
                      <span className="payment-step-amount">3 × €667</span>
                      <span className="payment-step-note">+ VAT per installment</span>
                    </div>
                    <div className="payment-step">
                      <span className="payment-step-label">Early Bird</span>
                      <span className="payment-step-amount">3 × €600</span>
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
                <p className="cta-subtext">Reply within 48 hours to secure early bird pricing</p>
              </div>
            </div>
          </div>
        </section>

        <section className="academy-benefits">
          <div className="academy-container">
            <h2>Why Choose PT7 Academy?</h2>
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
                  Train on four scheduled weekends between September and November 2026, {lectureHours}, and keep your
                  day job while becoming a certified Reformer instructor.
                </p>
              </div>

              <div className="benefit-card benefit-card--pma">
                <h3>PMA ITTAP Accredited Program</h3>
                <p>
                  The {COURSE_TITLE} is ITTAP approved by the Pilates Method Alliance (PMA), the international
                  organization that accredits Reformer, Mat, and Comprehensive teacher training programs worldwide.
                </p>
              </div>

              <div className="benefit-card">
                <h3>PMA-Aligned Curriculum</h3>
                <p>
                  Course content, assessment, and training hours are structured to meet the standards set by the
                  Pilates Method Alliance through its ITTAP accreditation framework.
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
                <h3>Early Bird Pricing</h3>
                <p>Enroll before the end of June and save EUR 200 on the standard course fee.</p>
              </div>

              <div className="benefit-card">
                <h3>Flexible Payment</h3>
                <p>
                  Pay in full at checkout, or spread the course fee over 3 equal installments through MindBody. Early
                  bird enrollees pay 3 × EUR 600 + VAT; standard fee is 3 × EUR 667 + VAT.
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
            <h2>Ready to Become a Reformer Instructor?</h2>
            <p>
              Join the PMA ITTAP approved {COURSE_TITLE} at PT7 Academy in Amsterdam. 300 hours of comprehensive
              Reformer training.
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
                Call: 06 85 16 26 93
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
