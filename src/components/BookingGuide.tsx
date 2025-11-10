import { useState } from 'react';
import '../styles/BookingGuide.css';

export const BookingGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
      screenshot: 'tabs-selection.jpg',
      tips: [
        '⚠️ Common mistake: Don\'t scroll past the tabs - they\'re at the very top',
        '💡 First time? We recommend starting with a group class',
        '🎯 Private classes require selecting a specific instructor'
      ]
    },
    {
      title: 'Step 2: Pick Your Date and Time',
      description: 'Use the calendar to select a date, then choose an available time slot from the list.',
      instructions: [
        '📅 Click on any date in the calendar (highlighted dates have availability)',
        '⏰ Available time slots appear below the calendar',
        '👀 Look for green buttons - these are available classes',
        '🚫 Gray/disabled buttons mean the class is full',
        '📝 Each time slot shows: Time, Instructor Name, Available Spots'
      ],
      screenshot: 'calendar-selection.jpg',
      tips: [
        '⚠️ Important: Grey dates = no classes that day',
        '💡 Click the class time button to proceed (don\'t just look at it!)',
        '⏱️ Popular morning slots fill up fast - book early in the week'
      ]
    },
    {
      title: 'Step 3: Create Account or Sign In',
      description: 'If you\'re new, you\'ll be asked to create an account. Existing members should click "Sign In".',
      instructions: [
        '🆕 New customers: Click "Create Account" or "Sign Up"',
        '✍️ Fill in: First Name, Last Name, Email, Phone Number',
        '🔐 Create a password (write it down!)',
        '✅ Click checkbox to agree to terms',
        '👤 Returning: Click "Already have an account? Sign In"'
      ],
      screenshot: 'signup-form.jpg',
      tips: [
        '⚠️ Use a real email - you\'ll need it for confirmations!',
        '📱 Include country code for phone: +31 6...',
        '🔑 Password must be at least 8 characters',
        '❌ Pop-up blocked? Allow pop-ups for this site'
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
      screenshot: 'pricing-selection.jpg',
      tips: [
        '⚠️ First time? Look for "Intro Offer" or "Trial Class"',
        '💰 Class packs save 15-30% vs single classes',
        '⏳ Packages expire after 6-12 months (check details)',
        '🎁 Ask about student/senior discounts via email'
      ]
    },
    {
      title: 'Step 5: Enter Payment Information',
      description: 'Securely enter your credit card details. MindBody uses bank-level encryption.',
      instructions: [
        '💳 Enter card number (no spaces or dashes)',
        '📅 Expiration date: MM/YY format',
        '🔐 CVV: 3 digits on back of card',
        '📍 Billing address must match your card',
        '✅ Click "Complete Purchase" or "Book Now"'
      ],
      screenshot: 'payment-form.jpg',
      tips: [
        '⚠️ Error message? Check card number and expiration date',
        '🔒 Look for lock icon - connection is secure',
        '💾 Check "Save card" for faster future bookings',
        '🚫 Using VPN? Try disabling it if payment fails'
      ]
    },
    {
      title: 'Step 6: Confirmation & What\'s Next',
      description: 'You\'re booked! You should see a confirmation screen and receive an email within minutes.',
      instructions: [
        '✅ Green checkmark = successful booking',
        '📧 Check your email for confirmation (arrives in 1-5 minutes)',
        '📱 Add to calendar using the link in the email',
        '🔔 You\'ll get a reminder 24 hours before class',
        '📲 Download MindBody app for easy future bookings'
      ],
      screenshot: 'confirmation.jpg',
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
                
                {/* Screenshot placeholder */}
                <div className="screenshot-placeholder">
                  📸 Screenshot placeholder: {steps[activeStep].screenshot}
                  <div className="screenshot-note">
                    (You can add actual MindBody screenshots here)
                  </div>
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

