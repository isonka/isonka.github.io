export const enIntro = {
  seo: {
    title: 'Intro pack: {{classes}} group classes for {{price}} | PT 7 Pilates Amsterdam',
    description:
      'New clients at PT 7 Museumplein: {{classes}} small-group classes for {{price}}. Max {{groupMax}} people, {{minutes}} minutes. Valid {{weeks}} weeks. Buy online.',
    keywords:
      'intro pilates amsterdam, pilates intro pack amsterdam, proefles pilates amsterdam, new client pilates amsterdam, reformer pilates trial museumplein',
    ogTitle: '{{classes}} group classes for {{price}} | PT 7 Pilates',
    ogDescription:
      'New clients only. {{classes}} small-group classes at Museumplein for {{price}}, valid {{weeks}} weeks.',
    analyticsTitle: 'Intro offer | PT 7 Pilates Amsterdam',
  },
  breadcrumb: 'Intro offer',
  imageAlt: 'Instructor coaching a Reformer client at PT 7 Amsterdam',
  badges: {
    clients: 'New clients only',
    weeks: 'Valid {{weeks}} weeks',
    size: 'Max {{groupMax}}',
    length: '{{minutes}} min',
  },
  hero: {
    kicker: 'New clients',
    title: '{{classes}} group classes for {{price}}',
    lead: 'A first pack for the studio at Museumplein. Small groups, maximum {{groupMax}}. Buy it, then pick a class on the schedule.',
    fineprint: 'New clients only. Valid for {{weeks}} weeks from purchase.',
  },
  buy: 'Buy the pack',
  pricingLink: 'See all prices',
  included: {
    title: 'What you get',
    classes: '{{classes}} small-group classes',
    size: 'Maximum {{groupMax}} people in the room',
    length: '{{minutes}}-minute sessions',
    formats: 'Reformer, TRX, and strength',
    place: '{{street}}, Museumplein',
  },
  steps: {
    title: 'How it works',
    buyTitle: 'Buy the pack',
    buyText: 'Pay {{price}} online. The classes are added to the account you check out with.',
    bookTitle: 'Pick a class',
    bookText: 'Open the schedule and reserve a group class.',
    arriveTitle: 'Show up',
    arriveText: 'The studio is at {{street}}, across from the Stedelijk Museum.',
  },
  scheduleCta: 'View the schedule',
  faq: {
    title: 'Questions',
    who: {
      question: 'Who can buy this pack?',
      answer:
        'New clients only. If you already train at PT 7, use the regular class packs and memberships.',
    },
    valid: {
      question: 'How long is it valid?',
      answer:
        '{{weeks}} weeks from the purchase date. That is the same rule as other class packs: the number of weeks matches the number of classes.',
    },
    which: {
      question: 'Which classes does it cover?',
      answer:
        'Small-group classes on the schedule: Reformer, TRX, and strength. Private, couple, and trio sessions have their own prices.',
    },
    size: {
      question: 'How big is the class?',
      answer: 'Maximum {{groupMax}} people, so you still get corrections during the session.',
    },
    after: {
      question: 'What do I do after I pay?',
      answer: 'Reserve a group class on the schedule. The classes sit on the account you used at checkout.',
    },
  },
  close: {
    title: 'Start with {{classes}} classes',
    text: 'New clients only. Memberships and private sessions are on the pricing page.',
  },
} as const;

export type EnIntro = typeof enIntro;
