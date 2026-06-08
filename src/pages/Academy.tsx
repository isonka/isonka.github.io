import { Link } from 'react-router-dom';
import { AcademyUrgencyBanner } from '../components/AcademyUrgencyBanner';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import '../styles/Academy.css';

const ITTAP_LOGO = '/assets/images/ittap-approved-program.png';
const ITTAP_LOGO_ALT =
  'ITTAP Approved Program: International Teacher Training Accreditation for Pilates, Pilates Method Alliance';

export const Academy: React.FC = () => {
  const academyFaqs = [
    {
      question: 'Is the Reformer Instructor Course weekend-only?',
      answer:
        'Yes. The course runs on Saturdays and Sundays, so career changers can keep their weekday jobs while training.',
    },
    {
      question: 'What is the course format and duration?',
      answer:
        'Each instructor course includes 4 weeks of lessons plus 8 weeks of optional observation and practice, with theoretical and practical exams and a final assessment.',
    },
    {
      question: 'What is the accreditation status of the Academy?',
      answer:
        'PT Studio 7 Academy offers international Pilates instructor certification training as an ITTAP-approved program, accredited by the Pilates Method Alliance, the international body for Pilates education.',
    },
    {
      question: 'Is the certification recognized internationally?',
      answer:
        'Yes. ITTAP (International Teacher Training Accreditation for Pilates) is the Pilates Method Alliance standard for teacher training worldwide. Your certificate comes from an international Pilates instructor certification training program, valued by studios and employers internationally, not just in the Netherlands.',
    },
    {
      question: 'How much does the course cost?',
      answer:
        'The course fee is EUR 2,000 plus 21% VAT per course. If you take both courses, you receive 5% off the total fee.',
    },
    {
      question: 'Do you offer installment payments?',
      answer:
        'Yes. A 3-installment plan is available to reduce upfront cost and make the transition into training more manageable.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Reformer Instructor Course Amsterdam 2026 | PT Studio 7 Academy"
        description="Become a certified Pilates instructor in Amsterdam. ITTAP-approved international Pilates instructor certification training from the Pilates Method Alliance. Weekend-only training for career changers. Small groups (5-10), PMA-registered instructors. Starting September 2026."
        keywords="Reformer instructor course Amsterdam, Pilates opleiding Amsterdam, Pilates teacher training, international Pilates instructor certification, ITTAP approved Pilates, Pilates certification Netherlands, pilatesdocent worden, weekend Pilates certification, career change Pilates instructor"
        canonical="https://www.pt7.nl/academy"
        ogTitle="Reformer Instructor Course Amsterdam 2026 | PT Studio 7 Academy"
        ogDescription="ITTAP-approved international Pilates instructor certification training in Amsterdam. Weekend training for career changers. Small groups, PMA-registered instructors. Starting September 2026."
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: 'Reformer Instructor Course',
            description: 'ITTAP-approved international Pilates instructor certification training in Amsterdam. 85 hours of in-person technical training, anatomy, comprehensive curriculum, exams, and final assessment at PT Studio 7 Museumplein.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-03-01',
            schedule: 'Saturdays & Sundays',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            maxParticipants: 10,
          },
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: academyFaqs }} />

      <div className="academy-page">
        <AcademyUrgencyBanner />

        {/* About Academy Section */}
        <section className="academy-about">
          <div className="academy-container">
            <h2>Become a Certified Pilates Instructor in Amsterdam</h2>
            <p className="start-date"><strong>Reformer Instructor Course, Starting September 2026</strong></p>
            <div className="ittap-accreditation">
              <a
                href="https://pilatesmethodalliance.org/page/ITTAP"
                target="_blank"
                rel="noopener noreferrer"
                className="ittap-accreditation-link"
              >
                <img
                  src={ITTAP_LOGO}
                  alt={ITTAP_LOGO_ALT}
                  className="ittap-logo"
                  width={500}
                  height={215}
                />
              </a>
              <p>
                PT Studio 7 Academy is an <strong>ITTAP-approved</strong> international Pilates instructor
                certification training program, the international standard for Pilates teacher training, accredited
                by the Pilates Method Alliance. Graduates earn an <strong>internationally recognized certificate</strong>{' '}
                valued by studios and employers worldwide.
              </p>
            </div>
            <p>
              <strong>Thinking about a career change?</strong> Many of our instructors came from banking, tech, and corporate backgrounds. 
              Our weekend-only schedule means you can train while keeping your current job, with no need to quit before you're ready.
            </p>
            <p>
              Want a real example? Read our <Link to="/blog/career-change-banker-to-pilates-instructor">career-change story</Link> and explore the
              <Link to="/trainer/elif"> Elif instructor profile</Link> to see who leads the training.
            </p>
            <p>
              PT 7 Academy's instructor courses are designed to equip you with a strong foundation in Pilates and
              <strong> international Pilates instructor certification training</strong> you can take anywhere. Our goal is to help you become a
              highly sought-after instructor, one whose clients stay committed and inspired. That's why our program
              goes far beyond just teaching exercises.
            </p>
            <p>
              You will also see how programming is applied in real sessions on our
              <Link to="/workouts/reformer-pilates"> Reformer Pilates</Link>,
              <Link to="/private-pilates-amsterdam"> Private Pilates</Link>, and
              <Link to="/prenatal-pilates-amsterdam"> Prenatal Pilates</Link> pages.
            </p>
            <div className="payment-info" style={{ marginTop: '1.5rem' }}>
              <h3>Career-Changer Story</h3>
              <p>
                Read <Link to="/blog/career-change-banker-to-pilates-instructor">From Banker to Pilates Instructor</Link> to see how the Academy pathway works in real life and how graduates transition into teaching.
              </p>
            </div>
            <p>
              You can enroll in the Reformer Instructor Course or the Mat & Trapeze Table Instructor Course individually, or take both and receive <strong>5% off the total fee</strong>.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="academy-courses">
          <div className="academy-container">
            <h2>Our Courses</h2>
            
            {/* Program Overview */}
            <div className="program-overview">
              <h3>What You'll Gain In-Depth Knowledge In:</h3>
              <div className="knowledge-grid">
                <div className="knowledge-item">✓ What is Pilates?</div>
                <div className="knowledge-item">✓ Basic anatomy</div>
                <div className="knowledge-item">✓ Alignment & posture principles</div>
                <div className="knowledge-item">✓ Designing effective flows</div>
                <div className="knowledge-item">✓ Modifications for different levels</div>
                <div className="knowledge-item">✓ Contraindications & special cases</div>
              </div>
            </div>

            <div className="courses-grid">              
              <div className="course-card featured">
                <div className="course-badge">Enrolling Now</div>
                <h3>Reformer Instructor Course</h3>
                <p className="course-price">€2,000 <span className="vat-text">+ VAT (21%)</span></p>
                
                <div className="course-highlights">
                  <div className="highlight-item">
                    <span>Starts September 2026</span>
                  </div>
                  <div className="highlight-item">
                    <span>PMA-registered instructors</span>
                  </div>
                  <div className="highlight-item">
                    <span>ITTAP-approved program</span>
                  </div>
                  <div className="highlight-item">
                    <span>International Pilates Instructor Certification</span>
                  </div>
                  <div className="highlight-item">
                    <span>Only 10 spots available</span>
                  </div>
                </div>

                <p className="combo-note"><strong>Take both courses</strong> and get <strong>5% off</strong> the total fee!</p>
                
                <div className="course-details">
                  <h4>Course Details:</h4>
                  <ul>
                    <li><strong>Duration:</strong> 4 weeks of lessons + 8 weeks optional observation & practice</li>
                    <li><strong>Schedule:</strong> Saturdays & Sundays</li>
                    <li><strong>Location:</strong> PT Studio 7, Museumplein, Amsterdam</li>
                    <li><strong>Class Size:</strong> 5–10 participants</li>
                  </ul>

                  <h4>What's Included:</h4>
                  <ul>
                    <li>85 hours of in-person technical training</li>
                    <li>Intro to Pilates (first week)</li>
                    <li>Comprehensive Pilates curriculum (reformer)</li>
                    <li>Observation + practice (by appointment)</li>
                    <li>2 exams (theoretical & practical)</li>
                    <li>One-on-one final assessment</li>
                    <li>Internationally recognized completion certificate (ITTAP-approved international Pilates instructor certification training)</li>
                  </ul>
                </div>
                
                <div className="course-cta">
                  <a href="mailto:info@pt7.nl?subject=Reformer Instructor Course Inquiry" className="course-btn primary">
                    Secure Your Spot Now
                  </a>
                  <p className="cta-subtext">Reply within 48 hours to guarantee your place</p>
                </div>
              </div>

              {/* Mat & Trapeze Table Course - IN PROGRESS */}
              <div className="course-card">
                <div className="course-badge">Enrolling Now</div>
                <h3>Mat & Trapeze Table Instructor Course</h3>
                <p className="course-price">€2,000 <span className="vat-text">+ VAT (21%)</span></p>
                <p className="combo-note"><strong>Take both courses</strong> and get <strong>5% off</strong> the total fee!</p>
                
                <div className="course-details">
                  <h4>Course Details:</h4>
                  <ul>
                    <li><strong>Duration:</strong> 4 weeks of lessons + 8 weeks optional observation & practice</li>
                    <li><strong>Schedule:</strong> Saturdays & Sundays</li>
                    <li><strong>Location:</strong> PT Studio 7, Museumplein, Amsterdam</li>
                    <li><strong>Class Size:</strong> 5–10 participants</li>
                  </ul>

                  <h4>What's Included:</h4>
                  <ul>
                    <li>85 hours of in-person technical training</li>
                    <li>Intro to Pilates (first week)</li>
                    <li>Comprehensive Mat Pilates curriculum</li>
                    <li>Trapeze Table (Cadillac) training</li>
                    <li>Observation + practice (by appointment)</li>
                    <li>2 exams (theoretical & practical)</li>
                    <li>One-on-one final assessment</li>
                    <li>Internationally recognized completion certificate (ITTAP-approved international Pilates instructor certification training)</li>
                  </ul>
                </div>
                
                <div className="course-cta">
                  <a href="mailto:info@pt7.nl?subject=Mat %26 Trapeze Table - Next Cohort Inquiry" className="course-btn primary">
                  Secure Your Spot Now
                  </a>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="payment-info">
              <h3>Flexible Payment, No Financial Stress</h3>
              <p>We know a career change is already a big step. That's why we offer a 3-installment plan so you can focus on learning, not budgeting.</p>
              <div className="payment-breakdown-grid">
                <div className="payment-step">
                  <span className="payment-step-label">Month 1</span>
                  <span className="payment-step-amount">€807</span>
                </div>
                <div className="payment-step">
                  <span className="payment-step-label">Month 2</span>
                  <span className="payment-step-amount">€807</span>
                </div>
                <div className="payment-step">
                  <span className="payment-step-label">Month 3</span>
                  <span className="payment-step-amount">€807</span>
                </div>
              </div>
              <p className="payment-note">All amounts include 21% VAT. Full upfront payment also accepted.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="academy-benefits">
          <div className="academy-container">
            <h2>Why Choose PT 7 Academy?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>Weekend-Only Schedule</h3>
                <p>Train on Saturdays and Sundays and keep your day job while becoming a certified Pilates instructor</p>
              </div>

              <div className="benefit-card">
                <h3>Perfect for Career Changers</h3>
                <p>No fitness background needed. Our instructors came from banking, tech, and corporate careers, just like you</p>
              </div>
              
              <div className="benefit-card">
                <h3>International Pilates Instructor Certification Training</h3>
                <p>
                  Train in Amsterdam, certify internationally. PT Studio 7 Academy is an ITTAP-approved international
                  Pilates instructor certification training program. Graduates receive a certificate recognized
                  internationally by the Pilates Method Alliance, the worldwide standard for Pilates teacher training.
                </p>
              </div>
              
              <div className="benefit-card">
                <h3>Small Class Sizes</h3>
                <p>Only 5-10 participants per course for more personal attention than larger programs</p>
              </div>
              
              <div className="benefit-card">
                <h3>Affordable Investment</h3>
                <p>€2,000 + VAT, significantly less than BASI or Polestar comprehensive programs (€5,000-8,000)</p>
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

        {/* CTA Section */}
        <section className="academy-cta">
          <div className="academy-container">
            <h2>Ready for a Career Change?</h2>
            <p>
              Whether you're a banker tired of spreadsheets, a developer seeking balance, or simply passionate about Pilates,
              this is your chance to turn that passion into a profession. No fitness background required.
            </p>
            <div className="cta-buttons">
              <a href="mailto:info@pt7.nl?subject=Reformer Instructor Course Inquiry" className="cta-btn primary">
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

