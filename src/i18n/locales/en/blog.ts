export const enBlog = {
  seo: {
    title: 'Pilates & Fitness Blog | PT7 Pilates Amsterdam',
    description:
      'Read expert articles about Pilates, prenatal fitness, and wellness from PT7 Amsterdam. Tips, guides, and insights from our certified trainers at Museumplein.',
    keywords:
      'pilates blog, prenatal pilates, fitness tips amsterdam, pilates exercises, reformer pilates guide, pregnancy fitness, wellness blog amsterdam',
    ogTitle: 'Pilates & Fitness Blog | PT7 Pilates Amsterdam',
    ogDescription: "Expert articles about Pilates, prenatal fitness, and wellness from PT7 Amsterdam's certified trainers.",
    listName: 'PT7 Pilates Blog',
  },
  kicker: 'Blog',
  title: 'Pilates & Fitness Blog',
  lead: 'Tips, guides, and studio notes from our trainers at Museumplein.',
  readMore: 'Read more',
  cta: {
    title: 'Ready to start training?',
    text: 'Join us at PT7 Amsterdam for expert-led Pilates in our Museumplein studio.',
    book: 'Book Your Class',
  },
  post: {
    breadcrumb: 'Blog',
    byAuthor: 'By {{author}}',
    recent: 'Recent posts',
    aboutTitle: 'About PT7',
    aboutText:
      'Located at Museumplein in Amsterdam, PT7 offers premium Pilates, TRX, and functional fitness with expert instructors in an intimate setting.',
    packages: 'View our packages',
    ctaTitle: 'Experience it yourself',
    ctaText: 'Ready to try Pilates at PT7 Amsterdam? Book a class at our Museumplein studio.',
  },
} as const;

export type EnBlog = typeof enBlog;
