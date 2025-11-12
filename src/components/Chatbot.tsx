import { useState, useEffect, useRef } from 'react';
import '../styles/Chatbot.css';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

interface UserProfile {
  goal?: string;
  experience?: string;
  groupSize?: string;
  hasInjuries?: string;
  isPregnant?: string;
  budget?: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      addBotMessage(
        "Hi! 👋 I'm here to help you find the perfect class and instructor at PT Studio 7! Let me ask you a few quick questions.",
        500
      );
      
      setTimeout(() => {
        addBotMessage(
          "What brings you to PT Studio 7?",
          1500,
          [
            "Improve strength & fitness",
            "Lose weight & tone",
            "Rehabilitation/injury recovery",
            "Pregnancy fitness",
            "General wellness",
            "Just curious"
          ]
        );
      }, 1500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, delay: number = 0, options?: string[]) => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text,
            sender: 'bot',
            options
          }
        ]);
      }, 800);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text,
        sender: 'user'
      }
    ]);
  };

  const handleUserResponse = (response: string, field: keyof UserProfile) => {
    addUserMessage(response);
    
    const newProfile = { ...userProfile, [field]: response };
    setUserProfile(newProfile);

    // Progress through conversation flow
    if (field === 'goal') {
      if (response === "Pregnancy fitness") {
        setUserProfile({ ...newProfile, isPregnant: 'yes' });
        addBotMessage(
          "Great! We offer specialized pregnancy Pilates. For safety, we only accept pregnant clients for one-on-one private classes.",
          1000
        );
        addBotMessage(
          "Have you done Pilates before?",
          2000,
          ["Yes, I'm experienced", "Some experience", "I'm a beginner"]
        );
      } else {
        addBotMessage(
          "Perfect! Have you done Pilates before?",
          1000,
          ["Yes, I'm experienced", "Some experience", "I'm a beginner"]
        );
      }
    } else if (field === 'experience') {
      if (newProfile.isPregnant === 'yes') {
        // Skip group size for pregnancy
        addBotMessage(
          "Do you have any specific concerns or areas you'd like to focus on during pregnancy?",
          1000,
          ["Back pain", "Pelvic floor", "General fitness", "Preparing for birth", "No specific concerns"]
        );
      } else {
        addBotMessage(
          "Would you like to train alone or with others?",
          1000,
          ["Private (just me)", "With a partner (couple)", "Small group (3 people)", "Group class (max 4)"]
        );
      }
    } else if (field === 'groupSize') {
      addBotMessage(
        "Do you have any injuries or specific concerns?",
        1000,
        ["Yes, I have injuries", "No injuries", "Some minor concerns"]
      );
    } else if (field === 'hasInjuries' || field === 'budget') {
      // Generate final recommendation
      generateRecommendation(newProfile);
    }
  };

  const generateRecommendation = (profile: UserProfile) => {
    addBotMessage("Let me find the perfect match for you! 🎯", 1000);

    setTimeout(() => {
      // Determine best trainer
      let recommendedTrainer = '';
      let trainerReason = '';
      
      if (profile.isPregnant === 'yes' || profile.goal === 'Pregnancy fitness') {
        recommendedTrainer = 'Elif Arzu Ogan';
        trainerReason = 'Elif has specialized training in pregnancy Pilates and offers safe, personalized one-on-one sessions.';
      } else if (profile.hasInjuries === 'Yes, I have injuries' || profile.goal === 'Rehabilitation/injury recovery') {
        recommendedTrainer = 'Elif Arzu Ogan or Göknur Dipli';
        trainerReason = 'Both are Senior Polestar Pilates instructors with extensive experience in rehabilitation and working with injuries, including spinal disorders and low back care.';
      } else if (profile.goal === 'Improve strength & fitness' || profile.goal === 'Lose weight & tone') {
        recommendedTrainer = 'Göknur Dipli';
        trainerReason = 'Göknur specializes in EMS training and functional training, perfect for building strength and achieving weight goals efficiently.';
      } else {
        recommendedTrainer = 'Gökben Öztekin';
        trainerReason = 'Gökben is an expert Basi Pilates instructor who creates a welcoming environment for all fitness levels.';
      }

      // Determine class type
      let classType = '';
      let pricing = '';

      if (profile.isPregnant === 'yes') {
        classType = '**Private Classes** (Required for pregnancy)';
        pricing = '• Single class: €80\n• 5-class pack: €75/class (€375 total)\n• 10-class pack: €72.50/class (€725 total) - Best Value';
      } else if (profile.groupSize === 'Private (just me)') {
        classType = '**Private Classes**';
        pricing = '• Single class: €80\n• 5-class pack: €75/class (€375 total)\n• 10-class pack: €72.50/class (€725 total) - Best Value';
      } else if (profile.groupSize === 'With a partner (couple)') {
        classType = '**Couple Classes**';
        pricing = '• Single class: €50/person\n• 10-class pack: €43/person (€430 total) - Best Value\n• 20-class pack: €40/person (€800 total)';
      } else if (profile.groupSize === 'Small group (3 people)') {
        classType = '**Trio Classes**';
        pricing = '• Single class: €45/person\n• 10-class pack: €40/person (€400 total) - Best Value\n• 20-class pack: €38/person (€760 total)';
      } else {
        classType = '**Small Group Classes** (max 4 people)';
        pricing = '• Single class: €37/person\n• 10-class pack: €30/person (€300 total) - Most Popular\n• 20-class pack: €28/person (€560 total) - Best Value\n\n💡 **Or try our Weekday Membership** (Mon-Fri 9am-5pm):\n• 4 classes/month: €21.50/class (€86/month)\n• Unlimited 3 months: €350/month';
      }

      const recommendation = `✨ **Your Perfect Match:**

👨‍🏫 **Recommended Trainer:** ${recommendedTrainer}
${trainerReason}

📋 **Best Class Type:** ${classType}

💰 **Pricing Options:**
${pricing}

🎁 **Special Offer:** Try our Introduction Package - 1 group class + 1 personal training session for just €105.30!`;

      addBotMessage(recommendation, 2000);

      addBotMessage(
        "All classes are 45 minutes and you can book directly through our schedule. Would you like me to help you with anything else?",
        4000,
        ["Book a class now", "Tell me about equipment", "View all trainers", "Start over"]
      );
    }, 2000);
  };

  const handleFollowUp = (response: string) => {
    addUserMessage(response);

    switch (response) {
      case "Book a class now":
        addBotMessage("Perfect! I'll take you to our booking page where you can see our full schedule and book directly.", 500);
        setTimeout(() => {
          window.location.href = '/schedule';
        }, 2000);
        break;
      
      case "Tell me about equipment":
        addBotMessage("We use professional Pilates equipment including Reformers, Cadillac/Trapeze Tables, Tower Reformers, Ladder Barrel, Wunda Chair, and Spine Corrector. We also offer EMS training and TRX!", 500);
        addBotMessage("Would you like to see our equipment?", 1500, ["Yes, show me", "No thanks", "Start over"]);
        break;
      
      case "Yes, show me":
        addBotMessage("Great! I'll take you to our equipment page.", 500);
        setTimeout(() => {
          window.location.href = '/equipment';
        }, 1500);
        break;
      
      case "View all trainers":
        addBotMessage("I'll take you to our home page where you can learn about all our amazing trainers!", 500);
        setTimeout(() => {
          window.location.href = '/#trainers';
        }, 1500);
        break;
      
      case "Start over":
        setMessages([]);
        setUserProfile({});
        addBotMessage("Let's start fresh! What brings you to PT Studio 7?", 500, [
          "Improve strength & fitness",
          "Lose weight & tone",
          "Rehabilitation/injury recovery",
          "Pregnancy fitness",
          "General wellness",
          "Just curious"
        ]);
        break;
      
      case "No thanks":
        addBotMessage("No problem! Feel free to reach out anytime. You can call us at +31 6 8516 2693 or email info@ptstudio7amsterdam.nl. See you at the studio! 💪", 500);
        break;
      
      default:
        break;
    }
  };

  const handleOptionClick = (option: string) => {
    // Determine which field this option belongs to
    const goalOptions = ["Improve strength & fitness", "Lose weight & tone", "Rehabilitation/injury recovery", "Pregnancy fitness", "General wellness", "Just curious"];
    const experienceOptions = ["Yes, I'm experienced", "Some experience", "I'm a beginner"];
    const groupOptions = ["Private (just me)", "With a partner (couple)", "Small group (3 people)", "Group class (max 4)"];
    const injuryOptions = ["Yes, I have injuries", "No injuries", "Some minor concerns", "Back pain", "Pelvic floor", "General fitness", "Preparing for birth", "No specific concerns"];
    const followUpOptions = ["Book a class now", "Tell me about equipment", "View all trainers", "Start over", "Yes, show me", "No thanks"];

    if (goalOptions.includes(option)) {
      handleUserResponse(option, 'goal');
    } else if (experienceOptions.includes(option)) {
      handleUserResponse(option, 'experience');
    } else if (groupOptions.includes(option)) {
      handleUserResponse(option, 'groupSize');
    } else if (injuryOptions.includes(option)) {
      handleUserResponse(option, 'hasInjuries');
    } else if (followUpOptions.includes(option)) {
      handleFollowUp(option);
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM7 9H9V11H7V9ZM11 9H13V11H11V9ZM15 9H17V11H15V9Z" fill="currentColor"/>
          </svg>
          <span className="chatbot-badge">Find Your Perfect Class</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h3>PT Studio 7 Assistant</h3>
                <p>Find your perfect class</p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text.split('\n').map((line, i) => {
                    // Handle markdown-style bold
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i}>
                        {parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j}>{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>
                {message.options && (
                  <div className="message-options">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        className="option-button"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-footer">
            <p>Need help? Call <a href="tel:+31685162693">06 85 16 26 93</a></p>
          </div>
        </div>
      )}
    </>
  );
};

