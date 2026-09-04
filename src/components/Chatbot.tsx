import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainerProfiles } from '../data/trainers';
import {
  CLASS_MINUTES,
  COUPLE,
  GROUP,
  GROUP_MAX,
  INTRO,
  MEMBERSHIP,
  TRIO,
  formatEur,
  privatePackLine,
} from '../data/pricing';
import '../styles/Chatbot.css';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

let lastMessageId = 0;
const nextMessageId = () => (lastMessageId += 1);

interface UserProfile {
  goal?: string;
  experience?: string;
  groupSize?: string;
  hasInjuries?: string;
  isPregnant?: string;
  budget?: string;
}

export const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const timersRef = useRef<number[]>([]);

  const juniors = trainerProfiles.filter((t) => t.tier === 'junior').map((t) => t.name);
  const seniors = trainerProfiles.filter((t) => t.tier === 'senior');
  const master = trainerProfiles.find((t) => t.tier === 'master');
  const instructorCount = trainerProfiles.length;

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  useEffect(() => () => clearTimers(), []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "Hi! I'm here to help you find a class and instructor at PT Studio 7. A few quick questions.",
        500
      );

      later(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const addBotMessage = (text: string, delay: number = 0, options?: string[]) => {
    later(() => {
      setIsTyping(true);
      later(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: nextMessageId(),
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
        id: nextMessageId(),
        text,
        sender: 'user'
      }
    ]);
  };

  const handleUserResponse = (response: string, field: keyof UserProfile) => {
    addUserMessage(response);
    
    const newProfile = { ...userProfile, [field]: response };
    setUserProfile(newProfile);

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
        addBotMessage(
          "Do you have any specific concerns or areas you'd like to focus on during pregnancy?",
          1000,
          ["Back pain", "Pelvic floor", "General fitness", "Preparing for birth", "No specific concerns"]
        );
      } else {
        addBotMessage(
          "Would you like to train alone or with others?",
          1000,
          ["Private (just me)", "With a partner (couple)", "Small group (3 people)", "Group class (max 5)"]
        );
      }
    } else if (field === 'groupSize') {
      addBotMessage(
        "Do you have any injuries or specific concerns?",
        1000,
        ["Yes, I have injuries", "No injuries", "Some minor concerns"]
      );
    } else if (field === 'hasInjuries' || field === 'budget') {
      generateRecommendation(newProfile);
    }
  };

  const generateRecommendation = (profile: UserProfile) => {
    addBotMessage("Let me find the perfect match for you!", 1000);

    later(() => {
      let recommendedInstructor = '';
      let instructorReason = '';

      if (profile.isPregnant === 'yes' || profile.goal === 'Pregnancy fitness') {
        recommendedInstructor = master ? `${master.name} (Master Instructor)` : 'Our master instructor';
        instructorReason = `${master?.displayName ?? 'Our master instructor'} offers specialized pregnancy Pilates in one-on-one private classes.`;
      } else if (profile.hasInjuries === 'Yes, I have injuries' || profile.goal === 'Rehabilitation/injury recovery') {
        recommendedInstructor = master
          ? `${master.displayName} (Master) or ${seniors.map((s) => s.displayName).join(' / ')} (Senior)`
          : 'Master or Senior instructor';
        instructorReason = 'Master and Senior instructors have extensive experience in rehabilitation, including spinal disorders and low back care.';
      } else if (profile.goal === 'Improve strength & fitness' || profile.goal === 'Lose weight & tone') {
        if (profile.groupSize === 'Private (just me)') {
          const strengthSenior = seniors.find((s) => s.slug === 'goknur') ?? seniors[0];
          recommendedInstructor = strengthSenior
            ? `${strengthSenior.name} (Senior Instructor)`
            : 'A senior instructor';
          instructorReason = 'Senior instructors specialize in functional training and strength building on Nike Strength equipment.';
        } else {
          recommendedInstructor = `Any of our ${instructorCount} instructors`;
          instructorReason = 'For group classes, all instructors can help you build strength.';
        }
      } else if (profile.experience === "I'm a beginner") {
        recommendedInstructor = juniors.length
          ? `${juniors.slice(0, -1).join(', ')}, or ${juniors[juniors.length - 1]} (Junior Instructors)`
          : 'A junior instructor';
        instructorReason = 'Junior instructors are PT7 Academy certified and work well with beginners.';
      } else if (profile.goal === 'General wellness' || profile.goal === 'Just curious') {
        const host = seniors[0];
        recommendedInstructor = host ? `${host.name} (Senior Instructor)` : 'A senior instructor';
        instructorReason = 'Senior instructors create a welcoming environment for all fitness levels.';
      } else {
        recommendedInstructor = `Any of our ${instructorCount} instructors`;
        instructorReason = 'Master, Senior, and Junior instructors to match your needs and budget.';
      }

      let classType = '';
      let pricing = '';

      if (profile.isPregnant === 'yes') {
        classType = `**Private Classes** (required for pregnancy, ${CLASS_MINUTES} min)`;
        pricing = `• Master: ${privatePackLine('master').replace(/^• /, '')}\n• Senior: ${privatePackLine('senior').replace(/^• /, '')}`;
      } else if (profile.groupSize === 'Private (just me)') {
        classType = '**Private Classes**';
        pricing = `• Junior: ${privatePackLine('junior').replace(/^• /, '')}\n• Senior: ${privatePackLine('senior').replace(/^• /, '')}\n• Master: ${privatePackLine('master').replace(/^• /, '')}`;
      } else if (profile.groupSize === 'With a partner (couple)') {
        classType = '**Couple Classes**';
        pricing = `• Single class: ${formatEur(COUPLE.single)}/person\n• 5-class pack: ${formatEur(COUPLE.pack5.perClass)}/person (${formatEur(COUPLE.pack5.total)} total)\n• 10-class pack: ${formatEur(COUPLE.pack10.perClass)}/person (${formatEur(COUPLE.pack10.total)} total)`;
      } else if (profile.groupSize === 'Small group (3 people)') {
        classType = '**Trio Classes**';
        pricing = `• Single class: ${formatEur(TRIO.single)}/person\n• 5-class pack: ${formatEur(TRIO.pack5.perClass)}/person (${formatEur(TRIO.pack5.total)} total)\n• 10-class pack: ${formatEur(TRIO.pack10.perClass)}/person (${formatEur(TRIO.pack10.total)} total)`;
      } else {
        classType = `**Small Group Classes** (max ${GROUP_MAX})`;
        pricing = `• Single class: ${formatEur(GROUP.single)}\n• 5-class pack: ${formatEur(GROUP.pack5.perClass)}/class (${formatEur(GROUP.pack5.total)} total)\n• 10-class pack: ${formatEur(GROUP.pack10.perClass)}/class (${formatEur(GROUP.pack10.total)} total)\n• 20-class pack: ${formatEur(GROUP.pack20.perClass)}/class (${formatEur(GROUP.pack20.total)} total)\n\nMembership (all days, 1 class/day):\n• ${MEMBERSHIP.four.classes} classes/month: ${formatEur(MEMBERSHIP.four.perClass)}/class (${formatEur(MEMBERSHIP.four.total)}/month)\n• ${MEMBERSHIP.eight.classes} classes/month: ${formatEur(MEMBERSHIP.eight.perClass)}/class (${formatEur(MEMBERSHIP.eight.total)}/month)\n• Unlimited 3 months: ${formatEur(MEMBERSHIP.unlimited3.perMonth)}/month\n• Annual unlimited: ${formatEur(MEMBERSHIP.annual.perMonth)}/month (${formatEur(MEMBERSHIP.annual.yearTotal)}/year)`;
      }

      const recommendation = `**Your match:**

**Recommended instructor:** ${recommendedInstructor}
${instructorReason}

**Best class type:** ${classType}

**Pricing:**
${pricing}

**Special offer:** New clients, introduction package: ${INTRO.classes} group classes for ${formatEur(INTRO.price)}.`;

      addBotMessage(recommendation, 2000);
      addBotMessage(
        `All classes are ${CLASS_MINUTES} minutes. You can book on the schedule. Anything else?`,
        4000,
        ["Book a class now", "Tell me about equipment", "View all trainers", "Start over"]
      );
    }, 2000);
  };

  const handleFollowUp = (response: string) => {
    addUserMessage(response);

    switch (response) {
      case "Book a class now":
        addBotMessage("Taking you to the booking page.", 500);
        later(() => navigate('/schedule/'), 2000);
        break;

      case "Tell me about equipment":
        addBotMessage("We train in one boutique studio at Museumplein with:\n\n**Pilates apparatus:** Reformers, Tower Reformer, Cadillac/Trapeze Table, Wunda Chair\n\n**Strength & cardio:** Nike Strength Half Rack, Olympic barbell, dumbbells, Concept2 RowErg, TRX", 500);
        addBotMessage("See the equipment page?", 2000, ["Yes, show me", "No thanks", "Start over"]);
        break;

      case "Yes, show me":
        addBotMessage("Opening equipment.", 500);
        later(() => navigate('/equipment/'), 1500);
        break;

      case "View all trainers": {
        const juniorCount = juniors.length;
        const seniorCount = seniors.length;
        addBotMessage(
          `Opening instructors: ${instructorCount} trainers, ${master ? 1 : 0} Master, ${seniorCount} Senior, ${juniorCount} Junior.`,
          500,
        );
        later(() => navigate('/instructors/'), 1500);
        break;
      }

      case "Start over":
        clearTimers();
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
        addBotMessage("Call +31 685 162693 or email info@pt7.nl anytime.", 500);
        break;

      default:
        break;
    }
  };

  const handleOptionClick = (option: string) => {
    const goalOptions = ["Improve strength & fitness", "Lose weight & tone", "Rehabilitation/injury recovery", "Pregnancy fitness", "General wellness", "Just curious"];
    const experienceOptions = ["Yes, I'm experienced", "Some experience", "I'm a beginner"];
    const groupOptions = ["Private (just me)", "With a partner (couple)", "Small group (3 people)", "Group class (max 5)"];
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
              onClick={() => {
                clearTimers();
                setIsOpen(false);
              }}
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
            <p>Need help? Call <a href="tel:+31685162693">+31 685 162693</a></p>
          </div>
        </div>
      )}
    </>
  );
};

