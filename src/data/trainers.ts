// Trainers come from the PT7 Academy API, written by the build (scripts/site-content.js, not committed)
import trainers from './generated/trainers.en.json' with { type: 'json' };

export interface TrainerProfile {
  slug: string;
  name: string;
  displayName: string;
  title: string;
  heroTitle: string;
  tier: 'master' | 'senior' | 'junior';
  image: string;
  languages: string[];
  specialties: string[];
  available: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  structuredData: {
    jobTitle: string;
    description: string;
  };
  bio: string[];
  qualifications: string[];
  ctaText: string;
}

// In the site's order; the fetch script checks slugs and dates, the rest follows the API's shapes
export const trainerProfiles = trainers as TrainerProfile[];
