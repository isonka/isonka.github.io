export const enClasspass = {
  seo: {
    title: 'ClassPass Transition Offer | PT7 Pilates Amsterdam',
    description:
      'A clear transition offer for ClassPass clients moving to PT7 direct pricing. Compare costs and claim 20% off eligible first purchases.',
    keywords: 'ClassPass Amsterdam, Pilates ClassPass, ClassPass offer, Pilates membership Amsterdam',
    ogTitle: 'ClassPass Clients: PT7 Direct Offer',
    ogDescription: 'Compare ClassPass costs with PT7 direct pricing and claim your transition discount.',
  },
  breadcrumb: 'ClassPass Offer',
  faq: {
    occasional: {
      q: 'Can I still use ClassPass occasionally?',
      a: 'Yes. Many clients use direct plans as their main option and keep ClassPass for occasional flexibility.',
    },
    commit: {
      q: "What if I'm not ready to commit?",
      a: 'You can start with a class pack. It has no recurring subscription and lets you test the studio rhythm first.',
    },
    claim: {
      q: 'How do I claim the 20% off?',
      a: 'Email us at info@pt7.nl or ask at the studio to get your discount code for eligible monthly plans and first-time package purchases.',
    },
    experience: {
      q: 'Is the class experience different?',
      a: 'The class method is the same. Direct clients mainly benefit from earlier booking access and better continuity with instructors.',
    },
  },
  hero: {
    badge: 'For ClassPass Clients',
    title: 'Prefer PT7?<br/>Book Direct.',
    subtitle:
      'If you already train with us through ClassPass, this page shows the direct pricing difference and your transition discount.',
    cta: 'View Offer Details',
  },
  comparison: {
    title: 'Cost Comparison',
    subtitle: 'Our classes typically cost 13-20 credits on ClassPass. Here is a direct monthly comparison.',
    classpassLabel: 'ClassPass (for 4 classes/month)',
    planNeeded: 'Plan needed (68 credits)',
    perMonth: '{{price}}/month',
    costPerClass: 'Cost per class',
    priority: 'Priority booking',
    lastInLine: 'Last in line',
    sameInstructor: 'Same instructor',
    progress: 'Progress tracking',
    directLabel: 'Direct Membership (4 classes/month)',
    monthlyCost: 'Monthly cost',
    firstAccess: 'First access',
    savings: '{{amount}}/year',
    savingsText: 'estimated yearly savings on a 4-class monthly plan',
  },
  offer: {
    badge: 'Transition Offer',
    title: '20% Off Your First Eligible Purchase',
    description:
      'Switch from ClassPass and get <strong>20% off your first month</strong> on all monthly plans, plus <strong>20% off your first purchase</strong> on class packs and private or couple packages.',
    four: '4 Classes/Month',
    eight: '8 Classes/Month',
    perClass: '{{price}} per class',
    note: 'Contact us for your discount code. Available for new direct clients on eligible first purchases.',
    cta: 'View All Pricing Options',
  },
  benefits: {
    title: 'Why Clients Switch to Direct Booking',
    booking: { tag: 'Booking', title: 'Priority Booking', text: 'Access classes earlier than ClassPass release windows.' },
    coaching: {
      tag: 'Coaching',
      title: 'Your Instructor Knows You',
      text: 'Train more consistently with instructors who know your history and goals.',
    },
    tracking: {
      tag: 'Progress',
      title: 'Track Your Progress',
      text: 'Build continuity across sessions instead of starting from zero each visit.',
    },
    results: { tag: 'Results', title: 'Real Progress', text: 'Consistent training in one studio usually leads to better long-term results.' },
    community: { tag: 'Community', title: 'Community', text: 'Join member updates, workshops, and events at the studio.' },
    value: { tag: 'Value', title: 'Better Value', text: 'Direct plans are often more predictable in both availability and cost.' },
  },
  heard: {
    title: 'What We Hear Most Often',
    scheduling: 'More stable scheduling makes it easier to train consistently.',
    instructors: 'Working with familiar instructors improves continuity from week to week.',
    simpler: 'Direct plans feel simpler for clients who already train here regularly.',
  },
  faqTitle: 'Frequently Asked Questions',
  final: {
    title: 'Ready to Switch to Direct?',
    text: 'Review pricing options and choose the format that fits your schedule.',
    pricing: 'View Pricing Options',
    schedule: 'View Schedule',
  },
} as const;

export type EnClasspass = typeof enClasspass;
