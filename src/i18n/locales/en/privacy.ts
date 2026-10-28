export const enPrivacy = {
  seo: {
    title: 'Privacy Policy | PT7 Pilates Amsterdam',
    description:
      'How PT7 Amsterdam uses cookies, analytics, advertising, booking widgets, and contact data. GDPR information for visitors of pt7.nl.',
    keywords: 'PT7 privacy, cookie policy Amsterdam, AVG, GDPR',
    ogDescription: 'How we use cookies, analytics, ads, booking widgets, and contact data on pt7.nl.',
  },
  breadcrumb: 'Privacy',
  title: 'Privacy policy',
  updated: 'Last updated 27 August 2026. PT7 Amsterdam ({{address}}) is controller for this website.',
  who: {
    title: 'Who we are',
    text: 'PT7 operates <site>www.pt7.nl</site>. Contact: <email>info@pt7.nl</email> · <phone>+31 685 162693</phone>.',
  },
  what: {
    title: 'What this site does',
    text: 'This is a marketing site. Class booking, login, and payments run through MindBody (Healcode / Branded Web). We do not run our own member database on this domain.',
  },
  cookies: {
    title: 'Cookies and similar tech',
    intro:
      'Necessary storage keeps the site working (for example your cookie choice). Other tags load only after you choose them in the banner or Cookie Settings.',
    statistics:
      '<strong>Statistics</strong>: Google Analytics 4 only. Used to understand page use. Does not load Google Tag Manager, Google Ads, or Meta.',
    marketing: '<strong>Marketing</strong>: Google Tag Manager, Google Ads, and Meta Pixel. Used for ads measurement and remarketing.',
    change:
      'You can change this anytime via Cookie Settings in the footer. Browsers may also send a Global Privacy Control signal; we still store an explicit choice on this site.',
  },
  thirdParties: {
    title: 'Other Google and third parties',
    fonts: '<strong>Fonts</strong> are hosted on this site. We do not load Google Fonts.',
    maps:
      '<strong>Google Maps</strong> on the homepage loads only if you allowed statistics or marketing, or if you tap Show map. Opening an external Maps link is a normal navigation to Google.',
    mindbody:
      '<strong>MindBody</strong> scripts power Login | Register, Buy Now, schedule, and academy enroll. Those requests go to MindBody so you can book and pay. Their privacy terms apply to that processing.',
  },
  contact: {
    title: 'Contact data',
    text: 'Email, phone, and WhatsApp you start yourself. Academy inquiry forms are MindBody widgets. We use that information to reply and to run classes, not to sell lists.',
  },
  legal: {
    title: 'Legal bases (GDPR)',
    text: 'Consent for statistics and marketing cookies. Contract / legitimate interest for booking and answering enquiries. Legal obligation where tax or accounting rules require keeping records of purchases (handled in MindBody).',
  },
  retention: {
    title: 'Retention and rights',
    text: 'Cookie choice stays in your browser until you clear site data or change it. Analytics and ads retention follows Google and Meta settings in those accounts. You can ask for access, correction, erasure, or restriction via <email>info@pt7.nl</email>. You may complain to the Autoriteit Persoonsgegevens.',
  },
  children: {
    title: 'Children',
    text: 'This site is not aimed at children under 16.',
  },
  links: {
    pricing: 'Pricing',
    book: 'Book',
    cookies: 'Cookie settings',
  },
} as const;

export type EnPrivacy = typeof enPrivacy;
