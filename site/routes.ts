import { blogPosts, blogPostsNl, blogSeoTitle } from '../src/data/blog/index.ts';
import { trainerProfiles } from '../src/data/trainers.ts';
import { equipmentProducts } from '../src/data/equipment.ts';
import { workoutDetails } from '../src/data/workoutDetails.ts';
import { workoutDetailsNl } from '../src/data/workoutDetails.nl.ts';

export const BASE_URL = 'https://www.pt7.nl';

export type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type SitemapImage = {
  loc: string;
  title: string;
};

export type SitemapEntry = {
  lastmod: string;
  changefreq: ChangeFreq;
  priority: string;
  image?: SitemapImage;
};

export type Route = {
  path: string;
  prerender: boolean;
  canonical?: string;
  sitemap: SitemapEntry | null;
  meta?: { title: string; description: string };
};

const image = (file: string, title: string): SitemapImage => ({
  loc: `${BASE_URL}/assets/images/${file}`,
  title,
});

const FIXED_PAGES: Route[] = [
  {
    path: '/',
    prerender: true,
    sitemap: {
      lastmod: '2026-09-14',
      changefreq: 'weekly',
      priority: '1.0',
      image: image('pt7logo.webp', 'PT7 Pilates Amsterdam - Reformer Pilates Studio Museumplein'),
    },
  },
  { path: '/nl/', prerender: true, sitemap: { lastmod: '2026-09-14', changefreq: 'weekly', priority: '1.0' } },

  { path: '/pricing/', prerender: true, sitemap: { lastmod: '2026-09-14', changefreq: 'weekly', priority: '0.9' } },
  { path: '/pricing/nl/', prerender: true, sitemap: { lastmod: '2026-09-14', changefreq: 'weekly', priority: '0.9' } },
  {
    path: '/intro/',
    prerender: true,
    sitemap: { lastmod: '2026-09-25', changefreq: 'monthly', priority: '0.8' },
    meta: {
      title: 'Intro pack: 3 group classes for €50 | PT7 Pilates Amsterdam',
      description:
        'New clients at PT7 Museumplein: 3 small-group classes for €50. Max 5 people, 45 minutes. Valid 3 weeks. Buy online.',
    },
  },
  {
    path: '/intro/nl/',
    prerender: true,
    sitemap: { lastmod: '2026-09-25', changefreq: 'monthly', priority: '0.8' },
    meta: {
      title: 'Introductiepakket: 3 groepslessen voor €50 | PT7 Pilates',
      description:
        'Nieuwe klanten bij PT7 Museumplein: 3 groepslessen voor €50. Maximaal 5 personen, 45 minuten. Geldig 3 weken. Online kopen.',
    },
  },
  {
    path: '/opening-offer/',
    prerender: true,
    sitemap: {
      lastmod: '2026-10-13',
      changefreq: 'weekly',
      priority: '0.6',
      image: image('olympisch-stadion.webp', 'Olympisch Stadion — PT7 move postponed'),
    },
    meta: {
      title: 'Move Postponed | Olympisch Stadion | PT7 Amsterdam',
      description:
        'PT7’s move to Olympisch Stadion 15 is postponed after a fire at the stadium. Classes continue at Van Baerlestraat 76C.',
    },
  },
  {
    path: '/opening-offer/nl/',
    prerender: true,
    sitemap: { lastmod: '2026-10-13', changefreq: 'weekly', priority: '0.6' },
    meta: {
      title: 'Verhuizing uitgesteld | Olympisch Stadion | PT7 Amsterdam',
      description:
        'De verhuizing van PT7 naar Olympisch Stadion 15 is uitgesteld na een brand in het stadion. Lessen gaan door op Van Baerlestraat 76C.',
    },
  },
  { path: '/schedule/', prerender: true, sitemap: { lastmod: '2026-09-15', changefreq: 'daily', priority: '0.9' } },
  { path: '/schedule/nl/', prerender: true, sitemap: { lastmod: '2026-09-15', changefreq: 'daily', priority: '0.9' } },
  { path: '/instructors/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.8' } },
  { path: '/academy/', prerender: true, sitemap: { lastmod: '2026-10-27', changefreq: 'weekly', priority: '0.9' } },
  { path: '/academy/nl/', prerender: true, sitemap: { lastmod: '2026-10-27', changefreq: 'weekly', priority: '0.9' } },
  { path: '/academy/practice/', prerender: true, sitemap: null },
  { path: '/academy/practice/nl/', prerender: true, sitemap: null },
  { path: '/classpass-offer/', prerender: true, sitemap: null },
  { path: '/healthcare-providers/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.7' } },
  { path: '/corporate/', prerender: true, sitemap: { lastmod: '2026-08-27', changefreq: 'monthly', priority: '0.7' } },
  { path: '/privacy/', prerender: true, sitemap: { lastmod: '2026-08-27', changefreq: 'yearly', priority: '0.3' } },
  { path: '/equipment/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.7' } },
  { path: '/blog/', prerender: true, sitemap: { lastmod: '2026-09-17', changefreq: 'weekly', priority: '0.8' } },

  { path: '/prenatal-pilates-amsterdam/', prerender: true, sitemap: { lastmod: '2026-07-29', changefreq: 'monthly', priority: '0.9' } },
  { path: '/private-pilates-amsterdam/', prerender: true, sitemap: { lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.9' } },
  { path: '/private-pilates-amsterdam/nl/', prerender: true, sitemap: { lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.9' } },
  { path: '/trx-training-amsterdam/', prerender: true, sitemap: { lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.8' } },
  { path: '/trx-training-amsterdam/nl/', prerender: true, sitemap: { lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.8' } },
  { path: '/strength-training-amsterdam/', prerender: true, sitemap: { lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.8' } },
  { path: '/strength-training-amsterdam/nl/', prerender: true, sitemap: { lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.8' } },
  { path: '/reformer-pilates-amsterdam/', prerender: true, sitemap: { lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.9' } },
  { path: '/reformer-pilates-amsterdam/nl/', prerender: true, sitemap: { lastmod: '2026-10-16', changefreq: 'monthly', priority: '0.9' } },

  { path: '/congrats/', prerender: true, sitemap: null },

  {
    path: '/pregnancy-pilates-amsterdam/',
    prerender: false,
    canonical: `${BASE_URL}/prenatal-pilates-amsterdam/`,
    sitemap: null,
  },
];

const WORKOUT_SITEMAP: SitemapEntry = { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.7' };
const WORKOUT_OVERRIDES: Record<string, Partial<SitemapEntry>> = {};

const EQUIPMENT_SITEMAP: SitemapEntry = { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.6' };
const EQUIPMENT_OVERRIDES: Record<string, Partial<SitemapEntry>> = {
  reformer: { lastmod: '2026-09-14' },
};

const TRAINER_SITEMAP: SitemapEntry = { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.7' };
const TRAINER_OVERRIDES: Record<string, Partial<SitemapEntry>> = {
  elif: { image: image('elif.webp', 'Elif Arzu Ogan - Owner & Head Instructor PT7') },
  kelly: {
    lastmod: '2026-10-24',
    image: image('kelly.webp', 'Kelly Tin - Reformer Pilates Instructor PT7'),
  },
  gamze: {
    lastmod: '2026-08-23',
    image: image('gamze.webp', 'E. Gamze Karadağ - Reformer Pilates Instructor PT7'),
  },
};

const BLOG_SITEMAP: Omit<SitemapEntry, 'lastmod'> = { changefreq: 'monthly', priority: '0.7' };
const BLOG_PRIORITY_OVERRIDES: Record<string, string> = {
  'pilates-prices-amsterdam-2026-complete-guide': '0.8',
  'career-change-banker-to-pilates-instructor': '0.8',
};

const nlPath = (path: string) => `${path}nl/`;

/**
 * Dutch mirrors for fixed pages that do not list one explicitly. Redirect-only routes (canonical override)
 * have no mirror. The mirror reuses the English sitemap entry minus the image.
 */
const FIXED_NL_MIRRORS: Route[] = FIXED_PAGES.filter(
  (route) =>
    route.path !== '/' &&
    !route.path.endsWith('/nl/') &&
    !route.canonical &&
    !FIXED_PAGES.some((other) => other.path === nlPath(route.path)),
).map((route) => ({
  path: nlPath(route.path),
  prerender: route.prerender,
  sitemap: route.sitemap ? { lastmod: '2026-10-17', changefreq: route.sitemap.changefreq, priority: route.sitemap.priority } : null,
}));

const workoutRoutes = (details: typeof workoutDetails, nl: boolean): Route[] =>
  details.map((workout) => {
    const enPath = `/workouts/${workout.slug}/`;
    const path = nl ? nlPath(enPath) : enPath;
    // Guides that canonicalise to a service lander stay out of the sitemap.
    const selfCanonical = workout.seo.canonical === `${BASE_URL}${path}`;
    return {
      path,
      prerender: true,
      sitemap: selfCanonical ? { ...WORKOUT_SITEMAP, ...WORKOUT_OVERRIDES[workout.slug] } : null,
    };
  });

const blogRoutes = (posts: typeof blogPosts, nl: boolean): Route[] =>
  posts.map((post) => {
    const enPath = `/blog/${post.slug}/`;
    return {
      path: nl ? nlPath(enPath) : enPath,
      prerender: true,
      sitemap: {
        ...BLOG_SITEMAP,
        lastmod: post.dateModified ?? post.date,
        priority: BLOG_PRIORITY_OVERRIDES[post.slug] ?? BLOG_SITEMAP.priority,
      },
      meta: { title: blogSeoTitle(post), description: post.metaDescription },
    };
  });

const derived: Route[] = [
  ...workoutRoutes(workoutDetails, false),
  ...workoutRoutes(workoutDetailsNl, true),
  ...equipmentProducts.flatMap((product) => {
    const path = `/equipment/${product.slug}/`;
    const sitemap = { ...EQUIPMENT_SITEMAP, ...EQUIPMENT_OVERRIDES[product.slug] };
    return [
      { path, prerender: true, sitemap },
      { path: nlPath(path), prerender: true, sitemap: { ...sitemap, image: undefined } },
    ];
  }),
  ...trainerProfiles.flatMap((trainer) => {
    const path = `/trainer/${trainer.slug}/`;
    const sitemap = { ...TRAINER_SITEMAP, ...TRAINER_OVERRIDES[trainer.slug] };
    return [
      { path, prerender: true, sitemap },
      { path: nlPath(path), prerender: true, sitemap: { ...sitemap, image: undefined } },
    ];
  }),
  ...blogRoutes(blogPosts, false),
  ...blogRoutes(blogPostsNl, true),
];

export const routes: Route[] = [...FIXED_PAGES, ...FIXED_NL_MIRRORS, ...derived];

export const shellPaths: string[] = routes.map((route) => route.path);

export const prerenderPaths: string[] = routes.filter((route) => route.prerender).map((route) => route.path);

export const canonicalOverrides: Record<string, string> = Object.fromEntries(
  routes.filter((route) => route.canonical).map((route) => [route.path, route.canonical as string]),
);

export const shellMeta: Record<string, { title: string; description: string }> = Object.fromEntries(
  routes
    .filter((route) => route.meta)
    .map((route) => [route.path, route.meta as { title: string; description: string }]),
);
