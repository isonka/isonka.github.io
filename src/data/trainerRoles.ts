import type { Locale } from '../i18n/locale';

// The title under each instructor's name on the home page and /instructors/ (owner, 2026-11-23); everyone not named
// here is a junior instructor
const ROLES: Record<Locale, { named: Record<string, string>; junior: string }> = {
  en: {
    named: {
      elif: 'Owner & Master Instructor',
      goknur: 'Senior Instructor & Mentor',
      gokben: 'Senior Instructor',
    },
    junior: 'Junior Instructor',
  },
  nl: {
    named: {
      elif: 'Eigenaar & master-instructeur',
      goknur: 'Senior instructeur & mentor',
      gokben: 'Senior instructeur',
    },
    junior: 'Junior instructeur',
  },
};

export const trainerRole = (slug: string, locale: Locale) => ROLES[locale].named[slug] ?? ROLES[locale].junior;
