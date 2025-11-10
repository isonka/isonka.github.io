import { useState, useEffect, useRef } from 'react';
import '../styles/BookingGuide.css';

export const BookingGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to top when step changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeStep]);

  const steps = [
    {
      title: 'Step 1: Choose Group or Private Classes',
      description: 'Click on either the "Group Classes" or "Private Classes" tab at the top of the booking widget.',
      instructions: [
        '📍 Look for the two tabs right above the calendar',
        '👥 "Group Classes" tab shows small group sessions (4 people max)',
        '👤 "Private Classes" tab shows one-on-one appointments',
        '✨ The active tab will be highlighted in gold/yellow'
      ],
      screenshot: 'tabs-selection.jpeg',
      tips: [
        '⚠️ Common mistake: Don\'t scroll past the tabs - they\'re at the very top',
        '💡 First time? We recommend starting with a private class',
        '🎯 Private classes require selecting a specific instructor'
      ]
    },
    {
      title: 'Step 2: Pick Your Date and Time',
      description: 'Use the calendar to select a date, then choose from the available time slots below.',
      instructions: [
        '📅 Click on any date in the calendar (dates with classes are highlighted)',
        '⏰ Available time slots appear below the calendar',
        '✅ "BOOK" button = Class has available spots - click to book!',
        '⏳ "JOIN WAITLIST" button = Class is full but you can join waitlist',
        '🚫 "UNAVAILABLE" = Class is not bookable (past date or cancelled)',
        '📝 Each slot shows: Time, Instructor Name, Duration, Spots Available'
      ],
      screenshot: 'calendar-selection.jpeg',
      tips: [
        '⚠️ Don\'t see your preferred time? Check the BOOK button - it means there ARE spots',
        '💡 Waitlist: You\'ll get notified by email if someone cancels',
        '⏱️ Popular times (morning 9-10am, evening 6-7pm) fill up first',
        '📱 Tip: Book for the whole week in advance to secure your favorite times'
      ]
    },
    {
      title: 'Step 3: Enter Email & Create Account',
      description: 'MindBody will ask for your email first. If you have an account, you\'ll sign in. If not, you\'ll create a new account.',
      instructions: [
        '📧 First, enter your EMAIL address',
        '🔍 MindBody checks if you have an account:',
        '   ✅ Have account? → You\'ll be asked for your PASSWORD (go to sign in)',
        '   🆕 New customer? → Continue to create account',
        '✍️ For NEW accounts, fill in:',
        '   • First Name',
        '   • Last Name (Surname)',
        '   • Password (create a new one)',
        '   • Country',
        '✅ Click checkbox to agree to terms',
        '🚀 Click "Continue" or "Create Account"'
      ],
      screenshot: 'signup-form.jpeg',
      tips: [
        '⚠️ Start with email first - MindBody uses this to check if you exist',
        '🔐 New password? Write it down! You\'ll need it for future bookings',
        '✉️ Use an email you check regularly - confirmations are sent here',
        '❌ Pop-up blocked? Check your browser and allow pop-ups for this site'
      ]
    },
    {
      title: 'Step 4: Choose Your Pricing Option',
      description: 'Select how you want to pay: single class, class pack, or membership.',
      instructions: [
        '💳 You\'ll see a list of pricing options',
        '🎫 Single Class: Pay per session (good for trying us out)',
        '📦 Class Packs: 5, 10, or 20 classes (better value)',
        '🔄 Membership: Unlimited monthly (best for regulars)',
        '✅ Click the "Select" or "Purchase" button next to your choice'
      ],
      screenshot: 'pricing-selection.jpeg',
      tips: [
        '⚠️ First time? Look for "Intro Offer" or "Trial Class"',
        '💰 Class packs offer better value than single classes',
        '⏳ Check package expiration dates on our Pricing page',
        '❓ Questions? Contact us via phone or email'
      ]
    },
    {
      title: 'Step 5: Enter Payment Information',
      description: 'Choose your payment method. We accept credit cards and iDEAL. MindBody uses bank-level encryption.',
      instructions: [
        '💳 Select payment method: Credit Card or iDEAL',
        '🏦 For iDEAL: Choose your bank from the dropdown',
        '💳 For Credit Card: Enter card number (no spaces)',
        '📅 Expiration date: MM/YY format',
        '🔐 CVV: 3 digits on back of card',
        '📍 Billing address must match your card',
        '✅ Click "Complete Purchase" or "Book Now"'
      ],
      screenshot: 'payment-form.jpeg',
      tips: [
        '🇳🇱 iDEAL is available for Dutch bank accounts',
        '⚠️ Error message? Check card details or try iDEAL',
        '🔒 Look for lock icon - connection is secure',
        '💾 Check "Save card" for faster future bookings'
      ]
    },
    {
      title: 'Step 6: Confirmation & What\'s Next',
      description: 'You\'re booked! You should see a confirmation screen and receive an email within minutes.',
      instructions: [
        '✅ Yellow checkmark = successful booking',
        '📧 Check your email for confirmation (arrives in 1-5 minutes)',
        '📱 Add to calendar using the link in the email',
        '🔔 You\'ll get a reminder 24 hours before class',
        '📲 Download MindBody app for easy future bookings'
      ],
      screenshot: 'confirmation.jpeg',
      tips: [
        '⚠️ No email? Check spam/junk folder first',
        '🕐 Arrive 10 minutes early for your first visit',
        '👟 What to bring: Water, towel, grip socks',
        '🎽 Wear comfortable fitted clothing (no loose shirts)',
        '📞 Still having issues? Call us: +31 6 8516 2693'
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
          <div className="booking-guide-content" ref={contentRef}>
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
                
                {/* Screenshot */}
                <div className="screenshot-container">
                  <img 
                    src={`/assets/images/booking-guide/${steps[activeStep].screenshot}`}
                    alt={steps[activeStep].title}
                    className="booking-screenshot"
                  />
                </div>

                {/* Detailed Instructions */}
                <div className="step-instructions">
                  <strong>📋 What to do:</strong>
                  <ul>
                    {steps[activeStep].instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Tips */}
                <div className="step-tips">
                  <strong>💡 Important Tips:</strong>
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

