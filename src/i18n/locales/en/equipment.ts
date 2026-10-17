export const enEquipment = {
  seo: {
    title: 'Pilates Equipment & Reformer Kopen | Sole Pilates Dealer',
    description:
      'Official Sole Pilates dealer in the Netherlands. Reformer kopen? Try Pilates apparatus at our Amsterdam studio and ask us for advice. Prices on request.',
    keywords:
      'pilates equipment, pilates equipment amsterdam, reformer kopen, pilates reformer kopen, pilates apparatuur, pilates apparatuur kopen, sole pilates, sole pilates dealer nederland, tower reformer, cadillac pilates',
    ogTitle: 'Pilates Equipment & Reformer Kopen | Sole Pilates Dealer NL',
    ogDescription:
      'PT 7 is the official Sole Pilates dealer in the Netherlands. Try Pilates apparatus at our Museumplein studio. Prices on request.',
    listName: 'Pilates Equipment at PT 7 Amsterdam',
  },
  hero: {
    kicker: 'Equipment',
    title: 'Pilates Equipment in Amsterdam',
    line: 'Train on Reformer, Tower, Cadillac, and Chair in our classes at Museumplein. Looking to buy? PT 7 is the official Sole Pilates dealer in the Netherlands.',
  },
  dealer: {
    title: 'Official Sole Pilates dealer in the Netherlands',
    text: 'Equipping a studio or training at home? We advise you on the right apparatus for your space and goals. Try Pilates apparatus in person at our studio at Museumplein, then order through us. Prices on request.',
    dutchNote:
      'Reformer kopen of andere pilates apparatuur? PT 7 is officieel dealer van Sole Pilates in Nederland. Probeer de apparaten in onze studio aan het Museumplein en vraag vrijblijvend een offerte aan. Prijzen op aanvraag.',
    quoteSubject: 'Sole Pilates quote request',
    quoteButton: 'Request a Sole Pilates quote',
  },
  intent: {
    lead: 'Looking for Pilates classes?',
    text: 'These machines are what we teach on.',
    bookReformer: 'Book Reformer Pilates classes in Amsterdam',
    schedule: 'View class schedule',
  },
  cards: {
    imageAlt: '{{name}} Pilates Equipment',
    learnMore: 'Learn more',
    quote: 'Request a quote',
    quoteSubject: 'Quote request: {{name}}',
    quoteBody: 'Hi PT 7,\n\nI would like a quote for the {{name}}.\n\nThanks,',
    mostPopular: 'Most popular',
    reformer:
      'The quintessential Pilates apparatus featuring a sliding carriage, springs, and straps for full-body conditioning.',
    towerReformer: 'Combines the reformer with a tower for added vertical spring resistance and exercise variety.',
    cadillac: 'Versatile equipment with overhead bars and springs for advanced stretching and strength work.',
    wundaChair: 'Compact yet powerful equipment for balance, strength, and functional movement training.',
    ladderBarrel: 'Available for purchase for home or studio use. Sold by PT 7; not used in our client trainings.',
  },
  help: {
    title: 'Need help choosing?',
    text: 'Compare models, review specs, and request an order for home or studio use. We can advise based on your space and goals.',
    contact: 'Contact for Order',
    book: 'Book Pilates Classes',
  },
  detail: {
    breadcrumbForSale: 'Equipment for Sale',
    breadcrumbStudio: 'Studio Equipment',
    kickerForSale: 'Equipment for sale',
    kickerStudio: 'In the studio',
    titleForSale: '{{name}} for sale',
    titleStudio: '{{name}} at PT 7 Amsterdam',
    noticeForSale: 'This piece is for purchase and is not used in client sessions. ',
    noticeStudio: 'This is apparatus we use in classes at {{studioStreet}}, Museumplein. ',
    bookReformer: 'Book Reformer Pilates in Amsterdam',
    schedule: 'View schedule',
    contactForOrder: 'Contact for Order',
    bookClass: 'Book a class',
    viewImage: 'View image {{n}}',
    details: 'Details',
    relatedSuffix: ' at {{studioStreet}}, Museumplein.',
    related: {
      reformer: 'Book Reformer Pilates classes in Amsterdam',
      equipmentClasses: 'Book equipment-based Pilates classes',
      studioClasses: 'Book Pilates classes at our studio',
    },
    faqTrainQ: 'Can I train on the {{name}} at PT 7?',
    faqTrainA: '{{name}} is used in classes at our Museumplein studio. Small groups are a maximum of 5. Book from the schedule.',
    faqSellingQ: 'Is this page selling equipment?',
    faqSellingA:
      'This page describes apparatus in the studio. The Ladder Barrel is sold separately and is not used in client sessions. Book a class from the schedule.',
  },
  faqTitle: 'Frequently Asked Questions',
  contact: {
    title: 'Ready to Order?',
    subtitle: 'Visit our Amsterdam studio to try the equipment in person, or get in touch to discuss your order.',
  },
} as const;

export type EnEquipment = typeof enEquipment;
