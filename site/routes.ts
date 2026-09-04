/**
 * Single source of truth for every public URL on the site.
 *
 * Consumed by the build scripts (static shells, prerender, sitemap) through
 * Node's TypeScript type stripping. `src/App.tsx` keeps its own React Router
 * table because those entries need element references; everything that only
 * needs to know *which URLs exist* reads this file.
 *
 * Detail-page URLs are derived from the data modules that render them, so a
 * new blog post or trainer cannot be missing from the build or the sitemap.
 */
import { blogPosts } from '../src/data/blogPosts.ts';
import { trainerProfiles } from '../src/data/trainers.ts';
import { equipmentProducts } from '../src/data/equipment.ts';
import { workoutDetails } from '../src/data/workoutDetails.ts';

export const BASE_URL = 'https://www.pt7.nl';

export type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type SitemapImage = {
  loc: string;
  /** Raw text; the sitemap writer handles XML escaping. */
  title: string;
};

export type SitemapEntry = {
  lastmod: string;
  changefreq: ChangeFreq;
  priority: string;
  image?: SitemapImage;
};

export type Route = {
  /** Canonical path, always with a trailing slash. */
  path: string;
  /** Write a prerendered snapshot. Off for pages that redirect client-side. */
  prerender: boolean;
  /** Absolute canonical when it differs from `path` (legacy keyword aliases). */
  canonical?: string;
  /** `null` keeps the URL out of sitemap.xml. */
  sitemap: SitemapEntry | null;
  /**
   * Fallback <title>/description for the static shell. Only surfaces if the
   * prerendered snapshot is missing, since SEOHead rewrites these at runtime.
   */
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
      lastmod: '2026-09-03',
      changefreq: 'weekly',
      priority: '1.0',
      image: image('pt7logo.png', 'PT Studio 7 Amsterdam - Reformer Pilates Studio Museumplein'),
    },
  },
  { path: '/nl/', prerender: true, sitemap: { lastmod: '2026-09-03', changefreq: 'weekly', priority: '1.0' } },

  { path: '/pricing/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'weekly', priority: '0.9' } },
  { path: '/schedule/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'daily', priority: '0.9' } },
  { path: '/instructors/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.8' } },
  { path: '/academy/', prerender: true, sitemap: { lastmod: '2026-09-01', changefreq: 'weekly', priority: '0.9' } },
  { path: '/academy/nl/', prerender: true, sitemap: { lastmod: '2026-09-01', changefreq: 'weekly', priority: '0.9' } },
  { path: '/classpass-offer/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.8' } },
  { path: '/healthcare-providers/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.7' } },
  { path: '/corporate/', prerender: true, sitemap: { lastmod: '2026-08-27', changefreq: 'monthly', priority: '0.7' } },
  { path: '/privacy/', prerender: true, sitemap: { lastmod: '2026-08-27', changefreq: 'yearly', priority: '0.3' } },
  { path: '/equipment/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.7' } },
  { path: '/blog/', prerender: true, sitemap: { lastmod: '2026-03-10', changefreq: 'weekly', priority: '0.8' } },

  // Service landing pages (local SEO)
  { path: '/prenatal-pilates-amsterdam/', prerender: true, sitemap: { lastmod: '2026-07-29', changefreq: 'monthly', priority: '0.9' } },
  { path: '/private-pilates-amsterdam/', prerender: true, sitemap: { lastmod: '2026-03-27', changefreq: 'monthly', priority: '0.9' } },
  { path: '/trx-training-amsterdam/', prerender: true, sitemap: { lastmod: '2026-03-27', changefreq: 'monthly', priority: '0.8' } },
  { path: '/strength-training-amsterdam/', prerender: true, sitemap: { lastmod: '2026-03-27', changefreq: 'monthly', priority: '0.8' } },
  { path: '/reformer-pilates-amsterdam/', prerender: true, sitemap: { lastmod: '2026-07-17', changefreq: 'monthly', priority: '0.9' } },

  // Booking confirmation: needs a shell so direct hits resolve, must stay out of search.
  { path: '/congrats/', prerender: true, sitemap: null },

  // Legacy keyword alias. Redirects client-side, so a snapshot would capture the
  // prenatal page's markup under this URL and never match the client's first render.
  {
    path: '/pregnancy-pilates-amsterdam/',
    prerender: false,
    canonical: `${BASE_URL}/prenatal-pilates-amsterdam/`,
    sitemap: null,
  },
];

const WORKOUT_SITEMAP: SitemapEntry = { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.7' };
const WORKOUT_OVERRIDES: Record<string, Partial<SitemapEntry>> = {
  'reformer-pilates': {
    priority: '0.8',
    image: image('reformer_1.webp', 'Reformer Pilates Amsterdam - PT Studio 7'),
  },
};

const EQUIPMENT_SITEMAP: SitemapEntry = { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.6' };

const TRAINER_SITEMAP: SitemapEntry = { lastmod: '2026-03-10', changefreq: 'monthly', priority: '0.7' };
const TRAINER_OVERRIDES: Record<string, Partial<SitemapEntry>> = {
  elif: { image: image('elif.webp', 'Elif Arzu Ogan - Owner & Head Instructor PT Studio 7') },
  kelly: {
    lastmod: '2026-08-16',
    image: image('kelly.webp', 'Kelly Tin - Reformer Pilates Instructor PT Studio 7'),
  },
  gamze: {
    lastmod: '2026-08-23',
    image: image('gamze.webp', 'E. Gamze Karadağ - Reformer Pilates Instructor PT Studio 7'),
  },
};

const BLOG_SITEMAP: Omit<SitemapEntry, 'lastmod'> = { changefreq: 'monthly', priority: '0.7' };
const BLOG_PRIORITY_OVERRIDES: Record<string, string> = {
  'pilates-prices-amsterdam-2026-complete-guide': '0.8',
  'career-change-banker-to-pilates-instructor': '0.8',
};

const derived: Route[] = [
  ...workoutDetails.map((workout) => ({
    path: `/workouts/${workout.slug}/`,
    prerender: true,
    sitemap: { ...WORKOUT_SITEMAP, ...WORKOUT_OVERRIDES[workout.slug] },
  })),
  ...equipmentProducts.map((product) => ({
    path: `/equipment/${product.slug}/`,
    prerender: true,
    sitemap: { ...EQUIPMENT_SITEMAP },
  })),
  ...trainerProfiles.map((trainer) => ({
    path: `/trainer/${trainer.slug}/`,
    prerender: true,
    sitemap: { ...TRAINER_SITEMAP, ...TRAINER_OVERRIDES[trainer.slug] },
  })),
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}/`,
    prerender: true,
    sitemap: {
      ...BLOG_SITEMAP,
      lastmod: post.date,
      priority: BLOG_PRIORITY_OVERRIDES[post.slug] ?? BLOG_SITEMAP.priority,
    },
    meta: { title: `${post.title} | PT Studio 7`, description: post.metaDescription },
  })),
];

export const routes: Route[] = [...FIXED_PAGES, ...derived];

/** Paths needing a static HTML file so GitHub Pages answers direct hits with 200. */
export const shellPaths: string[] = routes.map((route) => route.path);

/** Paths that get a prerendered snapshot. */
export const prerenderPaths: string[] = routes.filter((route) => route.prerender).map((route) => route.path);

/** Canonical overrides keyed by path, for the legacy keyword aliases. */
export const canonicalOverrides: Record<string, string> = Object.fromEntries(
  routes.filter((route) => route.canonical).map((route) => [route.path, route.canonical as string]),
);

/** Shell fallback meta keyed by path, for routes that carry it. */
export const shellMeta: Record<string, { title: string; description: string }> = Object.fromEntries(
  routes
    .filter((route) => route.meta)
    .map((route) => [route.path, route.meta as { title: string; description: string }]),
);
