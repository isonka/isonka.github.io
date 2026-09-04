export const BASE_URL = 'https://www.pt7.nl';

export const SCHEMA_IDS = {
  organization: `${BASE_URL}/#organization`,
  localBusiness: `${BASE_URL}/#localbusiness`,
  founder: `${BASE_URL}/#founder`,
} as const;

export const business = {
  name: 'PT Studio 7 Amsterdam',
  alternateName: 'PT Studio 7',
  url: BASE_URL,
  logo: `${BASE_URL}/assets/images/pt7logo.webp`,
  description:
    "Boutique Reformer Pilates studio at Amsterdam Museumplein offering small group classes (max 5), private sessions, TRX, and strength training with 15+ years of expertise.",
  foundingDate: '2009',
  telephone: '+31685162693',
  email: 'info@pt7.nl',
  priceRange: '€€',
  paymentAccepted: 'Credit Card, Cash, Bank Transfer',
  currenciesAccepted: 'EUR',
  availableLanguage: ['English', 'Dutch', 'Turkish'],
  areaServed: 'Amsterdam',
  hasMap: 'https://maps.app.goo.gl/wrhyzYbov9eiGQJw5',

  images: [
    `${BASE_URL}/assets/images/studio.webp`,
    `${BASE_URL}/assets/images/reformer_1.webp`,
    `${BASE_URL}/assets/images/tower_reformer_1.webp`,
  ],

  address: {
    streetAddress: 'Van Baerlestraat 76C',
    addressLocality: 'Amsterdam',
    postalCode: '1071 BB',
    addressRegion: 'Noord-Holland',
    addressCountry: 'NL',
  },

  geo: {
    latitude: 52.3572909720188,
    longitude: 4.876257777138345,
  },

  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '20:00' },
    { dayOfWeek: ['Saturday', 'Sunday'], opens: '09:00', closes: '13:00' },
  ],

  sameAs: [
    'https://www.instagram.com/ptstudio7amsterdam',
    'https://www.facebook.com/ptstudio7',
    'https://www.linkedin.com/company/pt-studio-7',
    'https://classpass.com/studios/pt-studio-7-amsterdam',
    'https://www.polestarpilates.nl/',
  ],

  knowsAbout: [
    'Pilates',
    'Reformer Pilates',
    'Tower Reformer',
    'Cadillac Pilates',
    'Personal Training',
    'TRX',
    'Strength Training',
    'Small Group Training',
  ],

  rating: {
    value: '4.8',
    count: '28',
    best: '5',
    worst: '1',
  },

  founder: {
    name: 'Elif Arzu Ogan',
    givenName: 'Elif',
    familyName: 'Ogan',
    jobTitle: 'Owner & Head Trainer',
    description:
      'Certified Pilates instructor with 15+ years of experience, specializing in Reformer Pilates, functional training, and pregnancy Pilates.',
    image: `${BASE_URL}/assets/images/elif.webp`,
    url: `${BASE_URL}/trainer/elif/`,
    knowsAbout: [
      'Reformer Pilates',
      'Polestar Pilates',
      'Strength Training',
      'Pregnancy Pilates',
      'Postnatal Fitness',
    ],
  },
} as const;
