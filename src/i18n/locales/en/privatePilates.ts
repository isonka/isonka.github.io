export const enPrivatePilates = {
  seo: {
    title: 'Private Pilates Amsterdam | 1-on-1 Reformer | PT 7',
    description:
      'Private and duo Reformer Pilates at Museumplein, Amsterdam Zuid, from {{privateFrom}}. Your instructor’s full attention and a program built around you. Book online.',
    keywords:
      'private pilates amsterdam, privé pilates amsterdam, prive pilates les amsterdam, one on one pilates amsterdam, personal pilates amsterdam, private reformer pilates, private pilates amsterdam zuid, prive pilates museumplein',
    ogTitle: 'Private Pilates Amsterdam | From {{privateFrom}} | PT 7',
    ogDescription:
      'Private Reformer sessions at Museumplein from {{privateFrom}}. One-on-one or duo, with your instructor’s full attention.',
    analyticsTitle: 'Private Pilates Amsterdam | PT 7',
  },
  breadcrumb: 'Private Pilates Amsterdam',
  hero: {
    kicker: 'Private',
    title: 'Private Reformer Pilates in Amsterdam',
    lead: '100% personalised training: your goals, your pace, your program. One-on-one or duo sessions at our boutique studio at Museumplein in Amsterdam Oud-Zuid, across from the Stedelijk Museum.',
    badgeOne: 'One-on-one',
    badgeDuo: 'Duo',
    badgeLevels: 'All levels welcome',
    badgeArea: 'Amsterdam Zuid',
    cta: 'Book a Private Session',
  },
  trust: {
    imageAlt: 'Private Reformer Pilates session at PT 7',
    priceAnchor: 'Private from {{privateFrom}} · one-on-one or duo',
    reviewSource: 'Google review',
    ctaLabel: 'View private pricing',
  },
  intro: {
    title: 'Why private Pilates?',
    p1: 'Group classes are energising and social, but there is a ceiling to how much attention one instructor can give to five people at once. Private sessions remove that ceiling entirely. Your instructor has one job: to make your session as effective as possible for you, specifically.',
    p2: 'At PT 7, private sessions are the format we are most proud of. Every program is built from scratch after an intake conversation about your goals, movement history, injuries, and schedule. The session evolves week by week as your strength, mobility, and body awareness develop.',
    p3: 'Whether you are a complete beginner wanting to learn proper technique, an athlete looking to improve performance and prevent injury, someone recovering from a back injury or surgery, or a pregnant or postpartum woman needing specialist guidance (see <prenatal>prenatal Pilates</prenatal>), private sessions at PT 7 are designed to deliver real results, not just a good workout.',
    p4: 'We use classical Pilates apparatus: Reformer, Tower Reformer, Cadillac, Wunda Chair, and Spine Corrector. Your instructor selects the right tools for each phase of your program. Prefer to train in a small group? See <reformer>Reformer Pilates in Amsterdam Zuid</reformer>.',
  },
  formats: {
    title: 'Private session formats',
    oneTitle: 'One-on-One',
    oneText: 'Just you and your instructor. Maximum focus, maximum progress. Ideal for beginners, injury rehabilitation, pregnancy, or anyone who wants the most personalised experience possible.',
    duoTitle: 'Duo Session',
    duoText: 'Train with a partner, friend, spouse, or colleague. You share the cost while still receiving far more personal attention than in a group class. Programs can be shared or partially individualised.',
    scheduleTitle: 'Flexible scheduling',
    scheduleText: 'Private sessions can be scheduled at any time within our opening hours, including early morning and evenings. We work around your calendar.',
    equipmentTitle: 'Full equipment access',
    equipmentText: 'Private sessions give you access to our Pilates apparatus: Reformer, Cadillac, Wunda Chair, and Spine Corrector, not just the equipment available in group classes.',
    injuryTitle: 'Injury & special needs',
    injuryText: 'Recovering from back surgery, a knee injury, or chronic pain? Our instructors work closely with physiotherapists and can safely incorporate rehabilitation protocols into your sessions.',
  },
  faqTitle: 'Frequently asked questions',
  faq: {
    difference: {
      q: 'What is the difference between private and group Pilates?',
      a: 'In a private session your instructor is 100% focused on you. The program is built around your specific goals, movement patterns, injuries, and fitness level. Group classes follow a set structure suitable for all participants. Private sessions allow for deeper technical work, more frequent adjustments, and faster progress, especially for beginners, people recovering from injury, or clients with specific goals like pregnancy, back pain, or athletic performance.',
    },
    people: {
      q: 'How many people are in a private session?',
      a: 'Private sessions can be one-on-one (just you and your instructor) or duo (you and a partner). Both formats offer fully customized programming. Duo sessions are for people who want the benefits of private training at a lower price per person.',
    },
    frequency: {
      q: 'How often should I do private Pilates sessions?',
      a: 'For beginners or people with specific goals (injury rehab, pregnancy, postural correction), we recommend 2 sessions per week to start. Once you have a solid foundation, 1 session per week combined with group classes works very well. Your instructor will advise what is best for your individual situation.',
    },
    experience: {
      q: 'Do I need experience before starting private Pilates?',
      a: 'No experience needed at all. Private sessions are actually the best way to start Pilates, because you learn the fundamentals correctly from day one. Your instructor explains every movement, corrects your form, and builds your program progressively.',
    },
    trial: {
      q: 'Can I book a trial session before committing to a package?',
      a: 'Yes. We offer a single private session so you can experience the studio, meet your instructor, and decide if it is the right fit. Many clients start with a single session and then move to a package for better value.',
    },
    price: {
      q: 'How much is a private Pilates session in Amsterdam?',
      a: 'Private Reformer sessions at PT 7 start at {{privateFrom}}. A 20-class pack brings the junior rate to {{privatePack20}} per class. Duo sessions start at {{coupleFrom}} per person. Full rates are on the pricing page.',
    },
    equipment: {
      q: 'What equipment is used in private Pilates sessions?',
      a: 'Depending on your goals, private sessions at PT 7 can include the Reformer, Tower Reformer, Cadillac (Trapeze Table), Wunda Chair, and Spine Corrector. Your instructor selects the most appropriate equipment for each session.',
    },
  },
  cta: {
    title: 'Ready to start?',
    text: 'Book your first private session online, or contact us if you have questions about which format is right for you.',
    book: 'Book a Private Session',
    pricing: 'View Pricing',
  },
  service: {
    name: 'Private Reformer Pilates Amsterdam',
    description:
      'One-on-one and duo private Reformer Pilates at Museumplein, with the full attention of your instructor. Sessions start at {{privateFrom}}.',
    offerOne: 'One-on-one private session',
    offerDuo: 'Duo private session',
  },
} as const;

export type EnPrivatePilates = typeof enPrivatePilates;
