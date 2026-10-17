import type { BlogPost } from './types.ts';
import { post as pt7MovesToOlympischStadion } from './posts/pt-7-moves-to-olympisch-stadion.ts';
import { post as switchingCareersIntoPilates7Questions } from './posts/switching-careers-into-pilates-7-questions.ts';
import { post as groupPilatesClassSizeAttentionAmsterdam } from './posts/group-pilates-class-size-attention-amsterdam.ts';
import { post as careerChangeBankerToPilatesInstructor } from './posts/career-change-banker-to-pilates-instructor.ts';
import { post as pmaIttapAccreditationReformerCourseAmsterdam } from './posts/pma-ittap-accreditation-reformer-course-amsterdam.ts';
import { post as pilatesPricesAmsterdam2026CompleteGuide } from './posts/pilates-prices-amsterdam-2026-complete-guide.ts';
import { post as prenatalPilatesSupportingBodyThroughEveryTrimester } from './posts/prenatal-pilates-supporting-body-through-every-trimester.ts';
import { post as pilatesForMenStrengthFlexibilityAthleticPerformance } from './posts/pilates-for-men-strength-flexibility-athletic-performance.ts';
import { post as pt7MovesToOlympischStadionNl } from './posts/nl/pt-7-moves-to-olympisch-stadion.ts';
import { post as switchingCareersIntoPilates7QuestionsNl } from './posts/nl/switching-careers-into-pilates-7-questions.ts';
import { post as groupPilatesClassSizeAttentionAmsterdamNl } from './posts/nl/group-pilates-class-size-attention-amsterdam.ts';
import { post as careerChangeBankerToPilatesInstructorNl } from './posts/nl/career-change-banker-to-pilates-instructor.ts';
import { post as pmaIttapAccreditationReformerCourseAmsterdamNl } from './posts/nl/pma-ittap-accreditation-reformer-course-amsterdam.ts';
import { post as pilatesPricesAmsterdam2026CompleteGuideNl } from './posts/nl/pilates-prices-amsterdam-2026-complete-guide.ts';
import { post as prenatalPilatesSupportingBodyThroughEveryTrimesterNl } from './posts/nl/prenatal-pilates-supporting-body-through-every-trimester.ts';
import { post as pilatesForMenStrengthFlexibilityAthleticPerformanceNl } from './posts/nl/pilates-for-men-strength-flexibility-athletic-performance.ts';

export type { BlogPost };

type BlogLocale = 'en' | 'nl';

export const blogPosts: BlogPost[] = [
  pt7MovesToOlympischStadion,
  switchingCareersIntoPilates7Questions,
  groupPilatesClassSizeAttentionAmsterdam,
  careerChangeBankerToPilatesInstructor,
  pmaIttapAccreditationReformerCourseAmsterdam,
  pilatesPricesAmsterdam2026CompleteGuide,
  prenatalPilatesSupportingBodyThroughEveryTrimester,
  pilatesForMenStrengthFlexibilityAthleticPerformance,
];

/** Dutch translations, in the same order as `blogPosts`. Each spreads its English post and overrides the copy. */
export const blogPostsNl: BlogPost[] = [
  pt7MovesToOlympischStadionNl,
  switchingCareersIntoPilates7QuestionsNl,
  groupPilatesClassSizeAttentionAmsterdamNl,
  careerChangeBankerToPilatesInstructorNl,
  pmaIttapAccreditationReformerCourseAmsterdamNl,
  pilatesPricesAmsterdam2026CompleteGuideNl,
  prenatalPilatesSupportingBodyThroughEveryTrimesterNl,
  pilatesForMenStrengthFlexibilityAthleticPerformanceNl,
];

export const blogPostsFor = (locale: BlogLocale): BlogPost[] => (locale === 'nl' ? blogPostsNl : blogPosts);

export const blogSeoTitle = (post: BlogPost): string => post.seoTitle ?? `${post.title} | PT 7`;

export const getBlogPostBySlug = (slug: string, locale: BlogLocale = 'en'): BlogPost | undefined => {
  return blogPostsFor(locale).find(post => post.slug === slug);
};

export const getRecentPosts = (limit: number = 3, locale: BlogLocale = 'en'): BlogPost[] => {
  return [...blogPostsFor(locale)]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
