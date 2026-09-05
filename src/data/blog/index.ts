import type { BlogPost } from './types.ts';
import { post as careerChangeBankerToPilatesInstructor } from './posts/career-change-banker-to-pilates-instructor.ts';
import { post as pmaIttapAccreditationReformerCourseAmsterdam } from './posts/pma-ittap-accreditation-reformer-course-amsterdam.ts';
import { post as pilatesPricesAmsterdam2026CompleteGuide } from './posts/pilates-prices-amsterdam-2026-complete-guide.ts';
import { post as prenatalPilatesSupportingBodyThroughEveryTrimester } from './posts/prenatal-pilates-supporting-body-through-every-trimester.ts';
import { post as pilatesForMenStrengthFlexibilityAthleticPerformance } from './posts/pilates-for-men-strength-flexibility-athletic-performance.ts';

export type { BlogPost };

export const blogPosts: BlogPost[] = [
  careerChangeBankerToPilatesInstructor,
  pmaIttapAccreditationReformerCourseAmsterdam,
  pilatesPricesAmsterdam2026CompleteGuide,
  prenatalPilatesSupportingBodyThroughEveryTrimester,
  pilatesForMenStrengthFlexibilityAthleticPerformance,
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
