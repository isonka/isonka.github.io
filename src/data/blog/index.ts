import type { BlogPost } from './types.ts';
// Blog posts come from the PT7 Academy API, written by the build (scripts/site-content.js, not committed)
import postsEn from '../generated/blog.en.json' with { type: 'json' };
import postsNl from '../generated/blog.nl.json' with { type: 'json' };

export type { BlogPost };

type BlogLocale = 'en' | 'nl';

/** In the site's order; the fetch script checks slugs and dates, the rest follows the API's shapes. */
export const blogPosts = postsEn as BlogPost[];

/** Dutch translations, in the same order as `blogPosts`. */
export const blogPostsNl = postsNl as BlogPost[];

export const blogPostsFor = (locale: BlogLocale): BlogPost[] => (locale === 'nl' ? blogPostsNl : blogPosts);

export const blogSeoTitle = (post: BlogPost): string => post.seoTitle ?? `${post.title} | PT7`;

export const getBlogPostBySlug = (slug: string, locale: BlogLocale = 'en'): BlogPost | undefined => {
  return blogPostsFor(locale).find(post => post.slug === slug);
};

export const getRecentPosts = (limit: number = 3, locale: BlogLocale = 'en'): BlogPost[] => {
  return [...blogPostsFor(locale)]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
