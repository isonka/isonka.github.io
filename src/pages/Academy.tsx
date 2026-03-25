import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import '../styles/Academy.css';

export const Academy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Pilates Instructor Course Amsterdam | Weekend Certification | PT 7 Academy"
        description="Become a certified Pilates instructor in Amsterdam. Weekend-only training, perfect for career changers. Small groups (5-10), PMA-registered instructors, pursuing ITTAP accreditation from the Pilates Method Alliance. Starting March 2026."
        keywords="Pilates instructor course Amsterdam, Pilates opleiding Amsterdam, Pilates teacher training, Pilates certification Netherlands, pilatesdocent worden, weekend Pilates certification, career change Pilates instructor"
        canonical="https://www.pt7.nl/academy"
        ogTitle="Pilates Instructor Course Amsterdam | Weekend Training | PT 7 Academy"
        ogDescription="Weekend Pilates certification for career changers. Small groups, PMA-registered instructors, pursuing ITTAP accreditation from the Pilates Method Alliance. Job opportunities at our Museumplein studio. Starting March 2026."
      />
      <StructuredData
        type="Course"
        data={{
          course: {
            name: 'Pilates Instructor Course',
            description: 'Weekend-only Reformer Pilates instructor certification in Amsterdam. 85 hours of in-person technical training, anatomy, comprehensive curriculum, exams, and job opportunities at PT Studio 7 Museumplein.',
            price: '2000',
            priceCurrency: 'EUR',
            startDate: '2026-03-01',
            schedule: 'Saturdays & Sundays',
            locationName: 'PT Studio 7 Amsterdam - Museumplein',
            maxParticipants: 10,
          },
        }}
      />

      <div className="academy-page">
        {/* Urgency Banner */}
        <div className="academy-urgency-banner">
          <div className="urgency-content">
            <span className="urgency-text">
              <strong>Pilates Instructor Course — Starting September 2026!</strong> Limited to 10 participants — Secure your spot today
            </span>
            <a href="mailto:info@pt7.nl?subject=Pilates Instructor Course Inquiry" className="urgency-cta">
              Inquire Now →
            </a>
          </div>
        </div>     

        {/* About Academy Section */}
        <section className="academy-about">
          <div className="academy-container">
            <h2>Become a Certified Pilates Instructor in Amsterdam</h2>
            <p className="start-date"><strong>Pilates Instructor Course — Starting September 2026</strong></p>
            <p>
              <strong>Thinking about a career change?</strong> Many of our instructors came from banking, tech, and corporate backgrounds. 
              Our weekend-only schedule means you can train while keeping your current job — no need to quit before you're ready.
            </p>
            <p>
              PT 7 Academy's Pilates Instructor Courses are designed to equip you with a strong foundation in Pilates. 
              Our goal is to help you become a highly sought-after instructor — one whose clients stay committed and inspired. 
              That's why our program goes far beyond just teaching exercises.
            </p>
            <p>
              You can join either Mat & Trapeze Table or Studio Equipment training individually — or take both and receive <strong>5% off the total fee</strong>.
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
              {/* Pilates Studio Equipment Course - FEATURED */}
              <div className="course-card featured">
                <div className="course-badge">Enrolling Now</div>
                <h3>Pilates Instructor Course</h3>
                <p className="course-price">€2,000 <span className="vat-text">+ VAT (21%)</span></p>
                
                <div className="course-highlights">
                  <div className="highlight-item">
                    <span>Starts September 2026</span>
                  </div>
                  <div className="highlight-item">
                    <span>PMA-registered instructors</span>
                  </div>
                  <div className="highlight-item">
                    <span>Only 10 spots available</span>
                  </div>
                  <div className="highlight-item">
                    <span>Job opportunities included</span>
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
                    <li>Comprehensive Pilates curriculum (studio equipment)</li>
                    <li>Observation + practice (by appointment)</li>
                    <li>2 exams (theoretical & practical)</li>
                    <li>One-on-one final assessment</li>
                    <li>Completion certificate for successful participants</li>
                    <li>Optional work opportunities at our studio</li>
                  </ul>
                </div>
                
                <div className="course-cta">
                  <a href="mailto:info@pt7.nl?subject=Pilates Instructor Course Inquiry" className="course-btn primary">
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
                    <li>Completion certificate for successful participants</li>
                    <li>Optional work opportunities at our studio</li>
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
              <h3>Flexible Payment — No Financial Stress</h3>
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
                <p>Train on Saturdays and Sundays — keep your day job while becoming a certified Pilates instructor</p>
              </div>

              <div className="benefit-card">
                <h3>Perfect for Career Changers</h3>
                <p>No fitness background needed. Our instructors came from banking, tech, and corporate careers — just like you</p>
              </div>
              
              <div className="benefit-card">
                <h3>Globally Recognized Training</h3>
                <p>Learn from PMA-registered instructors. PT Studio 7 is pursuing ITTAP accreditation from the Pilates Method Alliance — the international standard for recognized Pilates teacher training programs.</p>
              </div>
              
              <div className="benefit-card">
                <h3>Small Class Sizes</h3>
                <p>Only 5-10 participants per course — more personal attention than larger programs</p>
              </div>
              
              <div className="benefit-card">
                <h3>Job Opportunities Included</h3>
                <p>Work opportunities at our Museumplein studio for successful graduates — start earning right away</p>
              </div>
              
              <div className="benefit-card">
                <h3>Affordable Investment</h3>
                <p>€2,000 + VAT — significantly less than BASI or Polestar comprehensive programs (€5,000-8,000)</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="academy-cta">
          <div className="academy-container">
            <h2>Ready for a Career Change?</h2>
            <p>
              Whether you're a banker tired of spreadsheets, a developer seeking balance, or simply passionate about Pilates — 
              this is your chance to turn that passion into a profession. No fitness background required.
            </p>
            <div className="cta-buttons">
              <a href="mailto:info@pt7.nl?subject=Pilates Instructor Course Inquiry" className="cta-btn primary">
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

