export const enPricing = {
  seo: {
    title: 'Pilates Prices Amsterdam | From €50 Intro | PT 7',
    description:
      'Pilates prices at Olympisch Stadion 15: intro pack of 3 group classes for €50, then from {{groupPrice}}/class (max {{groupMax}}). Memberships and privates.',
    keywords:
      'pilates class prices amsterdam, pilates prices amsterdam, Pilates prijzen Amsterdam, reformer pilates prive amsterdam, strippenkaart Pilates',
    ogTitle: 'Pick your plan. Find your lane. | PT 7',
    ogDescription:
      'Intro pack 3 classes for €50. Small groups (max {{groupMax}}) from {{groupPrice}}/class at Olympisch Stadion. Memberships and privates.',
    analyticsTitle: 'Pilates Prices Amsterdam | PT 7 Pilates',
  },
  breadcrumbName: 'Prices',
  hero: {
    eyebrow: 'Prices · Entry · Memberships',
    title: 'Pick your plan.',
    titleAccent: 'Find your lane.',
    lead:
      'Every class is 45 minutes with a coach on the floor. Start with the intro ticket, then choose how often you train.',
  },
  facts: {
    aria: 'Every class',
    minutes: 'Minutes',
    perClass: 'Per class',
    lanes: 'Lanes',
    coach: 'Coach on the floor',
  },
  ticket: {
    title: 'First time?',
    titleAccent: "You're in.",
    lead:
      'Three group classes, any lane. Reformer on Monday, yoga on Wednesday, barbell on Friday — or the same lane three times.',
    admit: 'Admit one',
    badge: 'New members',
    big: '3 group classes',
    sub: 'Any lane · first-time clients',
    stubLabel: 'Entry',
    cta: 'Claim it',
  },
  plans: {
    title: 'Choose how you',
    titleAccent: 'train.',
    tabsAria: 'Price categories',
    memberships: 'Memberships',
    packs: 'Class packs',
    private: 'Private',
    couples: 'Couples',
    membershipLead:
      'For training every week. Group classes, any day, one class per day. Memberships renew automatically and can be cancelled after the minimum period.',
    packsLead:
      'Pay as you go. Packs are valid for as many weeks as they have classes, from the day you buy.',
    privateLead:
      'One-on-one with a coach. Choose your coach level — master (Elif), senior, or coach.',
    couplesLead: 'Two people, one coach. Price is per person.',
  },
  labels: {
    perClass: 'per class',
    perMonth: '/ month',
    mostPopular: 'Most popular',
    bestValue: 'Best value',
    buyNow: 'Buy',
    startMembership: 'Start membership',
    buyPack: 'Buy pack',
    bookPrivate: 'Book private',
    bookCouple: 'Book couple',
    unlimitedClasses: 'Unlimited classes',
    yearTotal: '{{amount}} per year',
    tierMaster: 'Master coach',
    tierSenior: 'Senior coach',
    tierJunior: 'Coach',
  },
  membership: {
    four: '4 classes a month',
    eight: '8 classes a month',
    unlimited: 'Unlimited',
    annual: 'Unlimited annual',
    fourB1: 'Monthly, renews automatically',
    fourB2: 'Cancel any time after month one',
    eightB1: 'Monthly, renews automatically',
    eightB2: 'Cancel any time after month one',
    unlimitedB1: '3-month commitment',
    unlimitedB2: 'Then renews monthly',
    annualB1: '12-month commitment',
    annualB2: 'Includes a 4-week freeze',
  },
  group: {
    single: 'Single class',
    pack5: '5-class pack',
    pack10: '10-class pack',
    pack20: '20-class pack',
    valid: 'Valid {{weeks}} weeks',
  },
  private: {
    single: 'Single session',
    pack5: '5-session pack',
    pack10: '10-session pack',
    pack20: '20-session pack',
  },
  couple: {
    single: 'Single (per person)',
    pack5: '5-class pack',
    pack10: '10-class pack',
    pack20: '20-class pack',
  },
  faq: {
    title: 'Good to',
    titleAccent: 'know.',
    lead: 'Not sure which plan fits? Message us and a coach will help you choose.',
    whatsapp: 'WhatsApp us',
    items: {
      validity: {
        q: 'How does pack validity work?',
        a: 'A pack is valid for as many weeks as it has classes, starting on the day you buy it. A 5-class pack runs 5 weeks; a 20-class pack runs 20 weeks.',
      },
      cancel: {
        q: 'How do I cancel a membership?',
        a: 'Memberships renew automatically. Cancel before your renewal date by emailing info@pt7.nl or calling +31 685 162693, after the minimum period of your plan.',
      },
      freeze: {
        q: 'Can I freeze my membership?',
        a: 'The annual unlimited membership includes a 4-week freeze. Ask us about other plans.',
      },
      pregnant: {
        q: 'I am pregnant. Can I join group classes?',
        a: 'During pregnancy we train one-on-one only, so your coach can adapt every exercise safely. See the Private tab.',
      },
      injury: {
        q: 'I have an injury. Is that a problem?',
        a: 'Tell us before you book. Our coaches adapt exercises, and private sessions are a good way to start back.',
      },
      levels: {
        q: 'What is the difference between coach levels?',
        a: 'Private sessions are priced by experience: master coach (Elif), senior coaches and coaches. Every coach is certified and trained in the PT7 method.',
      },
    },
  },
} as const;

export type EnPricing = typeof enPricing;
