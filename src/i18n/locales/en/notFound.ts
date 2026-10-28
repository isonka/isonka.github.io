export const enNotFound = {
  seo: {
    title: 'Page not found | PT7 Pilates Amsterdam',
    description: 'This page does not exist or has moved. Book a Reformer Pilates class, view pricing, or return home.',
    keywords: 'PT7, page not found',
  },
  title: 'Page not found',
  lead: 'This page does not exist or has moved. Book a class, check prices, or go back to the studio homepage.',
  home: 'Home',
  book: 'Book a class',
  pricing: 'View pricing',
} as const;

export type EnNotFound = typeof enNotFound;
