import { SEOHead } from '../components/SEOHead';
import '../styles/Academy.css';

export const Academy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="PT 7 Academy - Pilates Instructor Certification Courses | Amsterdam"
        description="Join PT 7 Academy for professional Pilates instructor certification in Amsterdam. Mat & Trapeze Table and Reformer courses. Learn from experienced instructors with 15+ years of expertise."
        keywords="Pilates instructor course Amsterdam, Mat Pilates certification, Reformer Pilates certification, Trapeze Table certification, Pilates teacher training Amsterdam, become Pilates instructor"
        canonical="https://www.ptstudio7amsterdam.nl/academy"
        ogTitle="PT 7 Academy | Pilates Instructor Certification Amsterdam"
        ogDescription="Professional Pilates instructor certification courses. Mat & Trapeze Table and Reformer training. Learn from expert instructors with 15+ years of experience."
      />

      <div className="academy-page">
        {/* Hero Section */}
        <section className="academy-hero">
          <div className="academy-hero-content">
            <h1>PT 7 Academy</h1>
            <p className="hero-subtitle">Professional Pilates Instructor Certification Courses</p>
            <p className="hero-description">
              Transform your passion for Pilates into a rewarding career. Join our comprehensive instructor training programs led by certified professionals with over 15 years of experience.
            </p>
          </div>
        </section>

        {/* About Academy Section */}
        <section className="academy-about">
          <div className="academy-container">
            <h2>Become a Certified Pilates Instructor with PT 7 Academy!</h2>
            <p className="start-date"><strong>🎓 Start your journey in January 2026</strong></p>
            <p>
              PT 7 Academy's Pilates Instructor Courses are designed to equip you with a strong foundation in Pilates. 
              Our goal is to help you become a highly sought-after instructor — one whose clients stay committed and inspired. 
              That's why our program goes far beyond just teaching exercises.
            </p>
            <p>
              You can join either Mat & Trapeze Table or Reformer training individually — or take both and receive <strong>5% off the total fee</strong>.
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
              {/* Mat & Trapeze Table Course */}
              <div className="course-card">
                <h3>Mat & Trapeze Table Instructor Course</h3>
                <p className="course-price">€2,000 <span className="vat-text">+ VAT (21%)</span></p>
                <p className="combo-note">💡 <strong>Take both courses</strong> and get <strong>5% off</strong> the total fee!</p>
                
                <div className="course-details">
                  <h4>Course Details:</h4>
                  <ul>
                    <li><strong>Duration:</strong> 12 weeks (includes Pilates foundations module)</li>
                    <li><strong>Schedule:</strong> Saturdays & Sundays | 12:00 – 18:00</li>
                    <li><strong>Location:</strong> PT Studio 7, Museumplein, Amsterdam</li>
                    <li><strong>Class Size:</strong> 4–8 participants</li>
                  </ul>

                  <h4>What's Included:</h4>
                  <ul>
                    <li>48 hours of in-person technical training</li>
                    <li>Intro to Pilates (first week)</li>
                    <li>Comprehensive Mat Pilates curriculum</li>
                    <li>Trapeze Table (Cadillac) training</li>
                    <li>5 hours of observation + 5 hours of practice (by appointment)</li>
                    <li>2 exams (theoretical & practical)</li>
                    <li>One-on-one final assessment</li>
                    <li>Completion certificate for successful participants</li>
                    <li>Optional work opportunities at our studio</li>
                  </ul>
                </div>
                
                <div className="course-cta">
                  <a href="mailto:info@ptstudio7amsterdam.nl?subject=Mat %26 Trapeze Table Instructor Course Inquiry" className="course-btn primary">
                    Inquire About This Course
                  </a>
                </div>
              </div>

              {/* Reformer Pilates Course */}
              <div className="course-card featured">
                <div className="course-badge">Most Popular</div>
                <h3>Reformer Pilates Instructor Course</h3>
                <p className="course-price">€2,000 <span className="vat-text">+ VAT (21%)</span></p>
                <p className="combo-note">💡 <strong>Take both courses</strong> and get <strong>5% off</strong> the total fee!</p>
                
                <div className="course-details">
                  <h4>Course Details:</h4>
                  <ul>
                    <li><strong>Duration:</strong> 12 weeks (includes Pilates foundations module)</li>
                    <li><strong>Schedule:</strong> Saturdays & Sundays | 12:00 – 18:00</li>
                    <li><strong>Location:</strong> PT Studio 7, Museumplein, Amsterdam</li>
                    <li><strong>Class Size:</strong> 4–8 participants</li>
                  </ul>

                  <h4>What's Included:</h4>
                  <ul>
                    <li>48 hours of in-person technical training</li>
                    <li>Intro to Pilates (first week)</li>
                    <li>Comprehensive Reformer Pilates curriculum</li>
                    <li>5 hours of observation + 5 hours of practice (by appointment)</li>
                    <li>2 exams (theoretical & practical)</li>
                    <li>One-on-one final assessment</li>
                    <li>Completion certificate for successful participants</li>
                    <li>Optional work opportunities at our studio</li>
                  </ul>
                </div>
                
                <div className="course-cta">
                  <a href="mailto:info@ptstudio7amsterdam.nl?subject=Reformer Pilates Instructor Course Inquiry" className="course-btn primary">
                    Inquire About This Course
                  </a>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="payment-info">
              <h3>✨ Special Offer: Flexible Payment Plan</h3>
              <p>Payment can be made in 3 installments to make your investment more manageable.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="academy-benefits">
          <div className="academy-container">
            <h2>Why Choose PT 7 Academy?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🎓</div>
                <h3>Expert Instructors</h3>
                <p>Learn from Senior Polestar Pilates certified instructors with over 15 years of teaching experience</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon">🏆</div>
                <h3>Premium Location</h3>
                <p>Train at our state-of-the-art Museumplein studio with professional-grade equipment</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon">👥</div>
                <h3>Small Class Sizes</h3>
                <p>4-8 participants per course for personalized attention and hands-on guidance</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon">📚</div>
                <h3>Comprehensive Curriculum</h3>
                <p>Balanced mix of theory, practical skills, and real teaching experience</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon">✨</div>
                <h3>Recognized Certification</h3>
                <p>Receive a PT 7 Academy certification upon successful completion</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon">💼</div>
                <h3>Work Opportunities</h3>
                <p>Optional work opportunities at our studio for successful graduates</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="academy-cta">
          <div className="academy-container">
            <h2>Ready to Start Your Journey?</h2>
            <p>
              Whether you're looking to deepen your Pilates practice or start a new career as a certified instructor, 
              PT 7 Academy is here to support you every step of the way.
            </p>
            <div className="cta-buttons">
              <a href="mailto:info@ptstudio7amsterdam.nl?subject=PT 7 Academy Course Inquiry" className="cta-btn primary">
                Contact Us for More Information
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

