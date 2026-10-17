import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trainerProfiles } from '../data/trainers';
import {
  CLASS_MINUTES,
  COUPLE,
  GROUP,
  GROUP_MAX,
  INTRO,
  MEMBERSHIP,
  PRIVATE,
  formatEur,
} from '../data/pricing';
import { localeHref } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';
import '../styles/Chatbot.css';

const GOAL_OPTIONS = ['strength', 'weight', 'rehab', 'pregnancy', 'wellness', 'curious'] as const;
const EXPERIENCE_OPTIONS = ['experienced', 'someExperience', 'beginner'] as const;
const GROUP_OPTIONS = ['private', 'couple', 'group'] as const;
const INJURY_OPTIONS = ['injuries', 'noInjuries', 'minorConcerns'] as const;
const PREGNANCY_FOCUS_OPTIONS = ['backPain', 'pelvicFloor', 'generalFitness', 'birthPrep', 'noConcerns'] as const;
const FOLLOW_UP_OPTIONS = ['book', 'equipment', 'trainers', 'restart', 'showEquipment', 'noThanks'] as const;

type OptionId =
  | (typeof GOAL_OPTIONS)[number]
  | (typeof EXPERIENCE_OPTIONS)[number]
  | (typeof GROUP_OPTIONS)[number]
  | (typeof INJURY_OPTIONS)[number]
  | (typeof PREGNANCY_FOCUS_OPTIONS)[number]
  | (typeof FOLLOW_UP_OPTIONS)[number];

const includes = <T extends string>(list: readonly T[], value: string): value is T =>
  (list as readonly string[]).includes(value);

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: readonly OptionId[];
}

let lastMessageId = 0;
const nextMessageId = () => (lastMessageId += 1);

interface UserProfile {
  goal?: OptionId;
  experience?: OptionId;
  groupSize?: OptionId;
  hasInjuries?: OptionId;
  isPregnant?: boolean;
}

export const Chatbot= () => {
  const { t } = useTranslation('common');
  const locale = useLocale();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const timersRef = useRef<number[]>([]);

  const juniors = trainerProfiles.filter((p) => p.tier === 'junior').map((p) => p.name);
  const seniors = trainerProfiles.filter((p) => p.tier === 'senior');
  const master = trainerProfiles.find((p) => p.tier === 'master');
  const instructorCount = trainerProfiles.length;

  const optionLabel = (id: OptionId) =>
    id === 'group' ? t('chatbot.options.group', { max: String(GROUP_MAX) }) : t(`chatbot.options.${id}`);

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
      addBotMessage(t('chatbot.greeting'), 500);

      later(() => {
        addBotMessage(t('chatbot.askGoal'), 1500, GOAL_OPTIONS);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const addBotMessage = (text: string, delay: number = 0, options?: readonly OptionId[]) => {
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

  const handleUserResponse = (response: OptionId, field: Exclude<keyof UserProfile, 'isPregnant'>) => {
    addUserMessage(optionLabel(response));

    const newProfile: UserProfile = { ...userProfile, [field]: response };
    setUserProfile(newProfile);

    if (field === 'goal') {
      if (response === 'pregnancy') {
        setUserProfile({ ...newProfile, isPregnant: true });
        addBotMessage(t('chatbot.pregnancyIntro'), 1000);
        addBotMessage(t('chatbot.askExperience'), 2000, EXPERIENCE_OPTIONS);
      } else {
        addBotMessage(t('chatbot.askExperiencePerfect'), 1000, EXPERIENCE_OPTIONS);
      }
    } else if (field === 'experience') {
      if (newProfile.isPregnant) {
        addBotMessage(t('chatbot.askPregnancyFocus'), 1000, PREGNANCY_FOCUS_OPTIONS);
      } else {
        addBotMessage(t('chatbot.askGroupSize'), 1000, GROUP_OPTIONS);
      }
    } else if (field === 'groupSize') {
      addBotMessage(t('chatbot.askInjuries'), 1000, INJURY_OPTIONS);
    } else if (field === 'hasInjuries') {
      generateRecommendation(newProfile);
    }
  };

  const privateLine = (tier: keyof typeof PRIVATE) => {
    const p = PRIVATE[tier];
    const tierLabel = { master: 'tierMaster', senior: 'tierSenior', junior: 'tierJunior' } as const;
    return t('chatbot.rec.privateLine', {
      tier: t(`chatbot.rec.${tierLabel[tier]}`),
      single: formatEur(p.single),
      pack5: formatEur(p.pack5),
      pack10: formatEur(p.pack10),
      pack20: formatEur(p.pack20),
    });
  };

  const generateRecommendation = (profile: UserProfile) => {
    addBotMessage(t('chatbot.matching'), 1000);

    later(() => {
      let recommendedInstructor = '';
      let instructorReason = '';

      if (profile.isPregnant || profile.goal === 'pregnancy') {
        recommendedInstructor = master
          ? t('chatbot.rec.masterTitle', { name: master.name })
          : t('chatbot.rec.ourMaster');
        instructorReason = t('chatbot.rec.pregnancyReason', {
          name: master?.displayName ?? t('chatbot.rec.ourMaster'),
        });
      } else if (profile.hasInjuries === 'injuries' || profile.goal === 'rehab') {
        recommendedInstructor = master
          ? t('chatbot.rec.rehabTitle', {
              master: master.displayName,
              seniors: seniors.map((s) => s.displayName).join(' / '),
            })
          : t('chatbot.rec.rehabFallback');
        instructorReason = t('chatbot.rec.rehabReason');
      } else if (profile.goal === 'strength' || profile.goal === 'weight') {
        if (profile.groupSize === 'private') {
          const strengthSenior = seniors.find((s) => s.slug === 'goknur') ?? seniors[0];
          recommendedInstructor = strengthSenior
            ? t('chatbot.rec.seniorTitle', { name: strengthSenior.name })
            : t('chatbot.rec.seniorFallback');
          instructorReason = t('chatbot.rec.strengthReason');
        } else {
          recommendedInstructor = t('chatbot.rec.anyInstructor', { total: String(instructorCount) });
          instructorReason = t('chatbot.rec.groupStrengthReason');
        }
      } else if (profile.experience === 'beginner') {
        recommendedInstructor = juniors.length
          ? t('chatbot.rec.juniorTitle', {
              names: juniors.slice(0, -1).join(', '),
              last: juniors[juniors.length - 1],
            })
          : t('chatbot.rec.juniorFallback');
        instructorReason = t('chatbot.rec.beginnerReason');
      } else if (profile.goal === 'wellness' || profile.goal === 'curious') {
        const host = seniors[0];
        recommendedInstructor = host
          ? t('chatbot.rec.seniorTitle', { name: host.name })
          : t('chatbot.rec.seniorFallback');
        instructorReason = t('chatbot.rec.wellnessReason');
      } else {
        recommendedInstructor = t('chatbot.rec.anyInstructor', { total: String(instructorCount) });
        instructorReason = t('chatbot.rec.defaultReason');
      }

      let classType = '';
      let pricing = '';

      if (profile.isPregnant) {
        classType = t('chatbot.rec.classPregnancy', { minutes: String(CLASS_MINUTES) });
        pricing = [privateLine('master'), privateLine('senior')].join('\n');
      } else if (profile.groupSize === 'private') {
        classType = t('chatbot.rec.classPrivate');
        pricing = [privateLine('junior'), privateLine('senior'), privateLine('master')].join('\n');
      } else if (profile.groupSize === 'couple') {
        classType = t('chatbot.rec.classCouple');
        pricing = t('chatbot.rec.coupleLines', {
          single: formatEur(COUPLE.single),
          pack5: formatEur(COUPLE.pack5.perClass),
          pack5Total: formatEur(COUPLE.pack5.total),
          pack10: formatEur(COUPLE.pack10.perClass),
          pack10Total: formatEur(COUPLE.pack10.total),
        });
      } else {
        classType = t('chatbot.rec.classGroup', { max: String(GROUP_MAX) });
        pricing = t('chatbot.rec.groupLines', {
          single: formatEur(GROUP.single),
          pack5: formatEur(GROUP.pack5.perClass),
          pack5Total: formatEur(GROUP.pack5.total),
          pack10: formatEur(GROUP.pack10.perClass),
          pack10Total: formatEur(GROUP.pack10.total),
          pack20: formatEur(GROUP.pack20.perClass),
          pack20Total: formatEur(GROUP.pack20.total),
          fourClasses: String(MEMBERSHIP.four.classes),
          fourPer: formatEur(MEMBERSHIP.four.perClass),
          fourTotal: formatEur(MEMBERSHIP.four.total),
          eightClasses: String(MEMBERSHIP.eight.classes),
          eightPer: formatEur(MEMBERSHIP.eight.perClass),
          eightTotal: formatEur(MEMBERSHIP.eight.total),
          unlimited: formatEur(MEMBERSHIP.unlimited3.perMonth),
          annual: formatEur(MEMBERSHIP.annual.perMonth),
          annualTotal: formatEur(MEMBERSHIP.annual.yearTotal),
        });
      }

      const recommendation = t('chatbot.rec.summary', {
        instructor: recommendedInstructor,
        reason: instructorReason,
        classType,
        pricing,
        introClasses: String(INTRO.classes),
        introPrice: formatEur(INTRO.price),
        introUrl: `https://www.pt7.nl${localeHref('/intro/', locale)}`,
      });

      addBotMessage(recommendation, 2000);
      addBotMessage(
        t('chatbot.afterMatch', { minutes: String(CLASS_MINUTES) }),
        4000,
        ['book', 'equipment', 'trainers', 'restart'],
      );
    }, 2000);
  };

  const handleFollowUp = (response: (typeof FOLLOW_UP_OPTIONS)[number]) => {
    addUserMessage(optionLabel(response));

    switch (response) {
      case 'book':
        addBotMessage(t('chatbot.goingToBooking'), 500);
        later(() => navigate(localeHref('/schedule/', locale)), 2000);
        break;

      case 'equipment':
        addBotMessage(t('chatbot.equipmentInfo'), 500);
        addBotMessage(t('chatbot.askEquipmentPage'), 2000, ['showEquipment', 'noThanks', 'restart']);
        break;

      case 'showEquipment':
        addBotMessage(t('chatbot.openingEquipment'), 500);
        later(() => navigate(localeHref('/equipment/', locale)), 1500);
        break;

      case 'trainers':
        addBotMessage(
          t('chatbot.openingTrainers', {
            total: String(instructorCount),
            master: master ? '1' : '0',
            senior: String(seniors.length),
            junior: String(juniors.length),
          }),
          500,
        );
        later(() => navigate(localeHref('/instructors/', locale)), 1500);
        break;

      case 'restart':
        clearTimers();
        setMessages([]);
        setUserProfile({});
        addBotMessage(t('chatbot.restart'), 500, GOAL_OPTIONS);
        break;

      case 'noThanks':
        addBotMessage(t('chatbot.noThanksReply'), 500);
        break;
    }
  };

  const handleOptionClick = (option: OptionId) => {
    if (includes(GOAL_OPTIONS, option)) {
      handleUserResponse(option, 'goal');
    } else if (includes(EXPERIENCE_OPTIONS, option)) {
      handleUserResponse(option, 'experience');
    } else if (includes(GROUP_OPTIONS, option)) {
      handleUserResponse(option, 'groupSize');
    } else if (includes(INJURY_OPTIONS, option) || includes(PREGNANCY_FOCUS_OPTIONS, option)) {
      handleUserResponse(option, 'hasInjuries');
    } else if (includes(FOLLOW_UP_OPTIONS, option)) {
      handleFollowUp(option);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          aria-label={t('chatbot.openAria')}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM7 9H9V11H7V9ZM11 9H13V11H11V9ZM15 9H17V11H15V9Z" fill="currentColor"/>
          </svg>
          <span className="chatbot-badge">{t('chatbot.badge')}</span>
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
                <h3>{t('chatbot.title')}</h3>
                <p>{t('chatbot.subtitle')}</p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => {
                clearTimers();
                setIsOpen(false);
              }}
              aria-label={t('chatbot.closeAria')}
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
                    {message.options.map((option) => (
                      <button
                        key={option}
                        className="option-button"
                        onClick={() => handleOptionClick(option)}
                      >
                        {optionLabel(option)}
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
            <p>{t('chatbot.footer')} <a href="tel:+31685162693">+31 685 162693</a></p>
          </div>
        </div>
      )}
    </>
  );
};

