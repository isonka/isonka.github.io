import { useState } from 'react';
import '../styles/BookingGuide.css';

export const BookingGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Step 1: Choose Your Class Type',
      description: 'Select "Group Classes" for small group sessions (max 4 people) or "Private Classes" for one-on-one training.',
      tips: [
        'Group classes are great for motivation and meeting others',
        'Private classes offer personalized attention and custom programs',
        'Not sure? Start with a group class to experience the studio'
      ]
    },
    {
      title: 'Step 2: Browse the Schedule',
      description: 'Look through available dates and times. You\'ll see the instructor name, class type, and available spots.',
      tips: [
        'Green = Available spots',
        'Classes show as "Full" when all 4 spots are taken',
        'Book in advance - popular times fill up quickly!'
      ]
    },
    {
      title: 'Step 3: Create Your Account',
      description: 'Click "Sign Up" if you\'re new, or "Sign In" if you have an account. You\'ll need to provide your name, email, and phone number.',
      tips: [
        'Use an email you check regularly for booking confirmations',
        'Save your password - you\'ll use it for future bookings',
        'Your account saves your booking history and preferences'
      ]
    },
    {
      title: 'Step 4: Select Your Package',
      description: 'Choose a package or drop-in class. Packages offer better value if you plan to attend regularly.',
      tips: [
        'First time? Try a single class or intro package',
        'Regular attendees save with monthly packages',
        'Packages have expiration dates - plan accordingly'
      ]
    },
    {
      title: 'Step 5: Complete Payment',
      description: 'Enter your payment details securely through MindBody\'s system. You\'ll receive a confirmation email immediately.',
      tips: [
        'We accept all major credit cards',
        'Payment is secure through MindBody',
        'Save payment info for faster future bookings'
      ]
    },
    {
      title: 'Step 6: You\'re Booked!',
      description: 'Check your email for confirmation. Add the class to your calendar and arrive 10 minutes early for your first visit.',
      tips: [
        'Bring water, a towel, and grip socks (or buy at studio)',
        'Arrive 10 minutes early if it\'s your first time',
        'Check your spam folder if you don\'t see the confirmation'
      ]
    }
  ];

  return (
    <div className="booking-guide-container">
      <button 
        className="booking-guide-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="icon">❓</span>
        {isOpen ? 'Close Booking Help' : 'Need Help Booking?'}
      </button>

      {isOpen && (
        <div className="booking-guide-modal">
          <div className="booking-guide-content">
            <div className="booking-guide-header">
              <h3>How to Book Your Class</h3>
              <button 
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close guide"
              >
                ×
              </button>
            </div>

            <div className="booking-guide-body">
              {/* Progress Indicator */}
              <div className="progress-indicator">
                {steps.map((_, index) => (
                  <div 
                    key={index}
                    className={`progress-dot ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                    onClick={() => setActiveStep(index)}
                  />
                ))}
              </div>

              {/* Current Step */}
              <div className="step-content">
                <div className="step-number">Step {activeStep + 1} of {steps.length}</div>
                <h4>{steps[activeStep].title}</h4>
                <p className="step-description">{steps[activeStep].description}</p>
                
                <div className="step-tips">
                  <strong>💡 Tips:</strong>
                  <ul>
                    {steps[activeStep].tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation */}
              <div className="step-navigation">
                <button 
                  className="nav-button prev"
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                >
                  ← Previous
                </button>
                
                <span className="step-counter">{activeStep + 1} / {steps.length}</span>
                
                {activeStep < steps.length - 1 ? (
                  <button 
                    className="nav-button next"
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  >
                    Next →
                  </button>
                ) : (
                  <button 
                    className="nav-button done"
                    onClick={() => setIsOpen(false)}
                  >
                    Got it! ✓
                  </button>
                )}
              </div>
            </div>

            {/* Quick Help Section */}
            <div className="quick-help">
              <h5>Still need help?</h5>
              <div className="help-options">
                <a href="tel:+31685162693" className="help-link">
                  📞 Call us: +31 6 8516 2693
                </a>
                <a href="mailto:info@ptstudio7amsterdam.nl" className="help-link">
                  ✉️ Email: info@ptstudio7amsterdam.nl
                </a>
                <a href="https://wa.me/31685162693" target="_blank" rel="noopener noreferrer" className="help-link">
                  💬 WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

