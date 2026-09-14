export const enSchedule = {
  seo: {
    title: 'Pilates Classes Near Me Amsterdam | Book Today | PT 7 Pilates',
    description:
      'Book Pilates classes near you at Museumplein (Amsterdam Zuid). Live schedule for Reformer, TRX & strength — small groups (max 5) and privates at Van Baerlestraat 76C. Reserve online today.',
    keywords:
      'pilates classes amsterdam, pilates classes near me, Pilates boeken Amsterdam, Pilates rooster Amsterdam, Pilates reserveren, TRX boeken Amsterdam, les boeken Museumplein, Pilates schedule Amsterdam, groepsles boeken, reformer pilates book amsterdam',
    ogTitle: 'Pilates Classes Near Me Amsterdam | Book Today | PT 7 Pilates',
    ogDescription:
      'Live schedule near Museumplein: Reformer, TRX & strength. Small groups (max 5) and private sessions. Book your spot online today.',
    analyticsTitle: 'Pilates Classes Amsterdam | Book Online | PT 7 Pilates',
  },
  breadcrumbName: 'Pilates Classes Amsterdam',
  hero: {
    kicker: 'Book',
    title: 'Pilates classes in Amsterdam: book online',
    lead:
      'Reformer Pilates, TRX, strength, and cardio: small groups (max 5) or private sessions with expert trainers. Looking for Pilates classes near Museumplein or Oud-Zuid? Reserve your spot below.',
    location: 'Van Baerlestraat 76C, Museumplein, across from Stedelijk Museum',
    accountNote:
      'Booking uses your MindBody account (same as the "MindBody Login" link in the menu). Studio contact is separate via phone, WhatsApp, or email.',
    linkReformer: 'Reformer Pilates Amsterdam',
    linkPricing: 'Class prices & packages',
    linkPrivate: 'Private sessions',
  },
  hours: {
    title: 'Studio hours',
    weekdays: 'Monday–Friday',
    weekends: 'Saturday–Sunday',
  },
  tabs: {
    group: 'Group classes',
    private: 'Private classes',
  },
  group: {
    title: 'Group classes',
    subtitle:
      'Small group training with maximum 5 participants. Expert instruction in an energizing environment.',
    bannerLead: 'New to group classes?',
    bannerText: 'First-timers arrive 10 minutes early for orientation. Our trainers will guide you through everything.',
    availability:
      'The calendar opens on today. If no classes show for this date, use the date strip above the list to move to the next day with availability.',
    durationTitle: 'Class duration',
    durationValue: '45 minutes',
    sizeTitle: 'Group size',
    sizeValue: 'Maximum 5 people',
    bringTitle: 'What to bring',
    bringValue: 'Water bottle, towel, grip socks (recommended; available at the studio)',
  },
  private: {
    title: 'Private classes',
    subtitle:
      'Personalized training for your goals and level: one-on-one, couple, or trio. See our <private>Private Pilates near Museumplein</private> page for formats, pricing, and what to expect.',
    bannerLead: 'Personalized attention.',
    bannerText:
      'Sessions adapt to your goals, injuries, or specific needs. Train solo, with a partner, or with two friends.',
    durationTitle: 'Class duration',
    durationValue: '45 minutes of focused training',
    optionsTitle: 'Class options',
    optionsValue: 'One-on-one, couple, or trio (3 people)',
    programTitle: 'Customized program',
    programValue: 'Workout adapted to your goals and level',
    bringTitle: 'What to bring',
    bringValue: 'Fitted clothing, socks (grip socks recommended), water bottle, towel',
  },
  widget: {
    loading: 'Loading booking calendar…',
    error: 'Booking calendar could not load. Please <refresh>refresh this page</refresh> or call us to book.',
  },
  faq: {
    kicker: 'FAQ',
    title: 'Frequently asked questions',
    hours: {
      question: 'When is the studio open?',
      answer:
        'Monday–Friday {{weekdayHours}}. Saturday–Sunday {{weekendHours}}. Book a class in the calendar on this page.',
    },
    book: {
      question: 'How do I book Pilates classes in Amsterdam online?',
      answer:
        'Choose Group classes or Private classes on this page, pick a date and time in the MindBody calendar, then sign in or create an account to complete booking. Payment is handled securely in the widget.',
    },
    bring: {
      question: 'What should I bring to my first Pilates class?',
      answer:
        'Wear fitted athletic clothing, bring water, and grip socks if you have them (available at the studio). First-time group clients should arrive about 10 minutes early for a quick orientation.',
    },
    private: {
      question: 'Can I book private Pilates sessions from this page?',
      answer:
        'Yes. Open the Private classes tab to book one-on-one, couple, or trio appointments. For more on private formats, see <private>Private Pilates near Museumplein</private>.',
    },
    beginner: {
      question: 'Are your group Pilates classes beginner-friendly?',
      answer:
        'Yes. Instructors give modifications in every session. Groups stay at a maximum of 5 people so you still get personal cues. Many beginners start with a private intro, then join a small group.',
    },
    pregnancy: {
      question: 'Can I train with PT 7 during pregnancy?',
      answer:
        'Pregnant clients are welcome in one-on-one private sessions only, where we adapt exercises safely. See <prenatal>Prenatal Pilates Amsterdam</prenatal> for our pregnancy-focused private Reformer option.',
    },
  },
  cta: {
    kicker: 'Next step',
    title: 'Need help choosing?',
    text: 'Not sure between group and private? Check pricing or contact us for guidance.',
    button: 'View pricing & packages',
  },
} as const;

export type EnSchedule = typeof enSchedule;
