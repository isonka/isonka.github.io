import type {} from 'i18next';
import type { EnAcademy } from './locales/en/academy';
import type { EnBlog } from './locales/en/blog';
import type { EnClasspass } from './locales/en/classpass';
import type { EnCommon } from './locales/en/common';
import type { EnCongrats } from './locales/en/congrats';
import type { EnCorporate } from './locales/en/corporate';
import type { EnEquipment } from './locales/en/equipment';
import type { EnHealthcare } from './locales/en/healthcare';
import type { EnHome } from './locales/en/home';
import type { EnInstructors } from './locales/en/instructors';
import type { EnIntro } from './locales/en/intro';
import type { EnNotFound } from './locales/en/notFound';
import type { EnOpeningOffer } from './locales/en/openingOffer';
import type { EnPrenatal } from './locales/en/prenatal';
import type { EnPricing } from './locales/en/pricing';
import type { EnPrivacy } from './locales/en/privacy';
import type { EnPrivatePilates } from './locales/en/privatePilates';
import type { EnReformer } from './locales/en/reformer';
import type { EnSchedule } from './locales/en/schedule';
import type { EnStrength } from './locales/en/strength';
import type { EnTrx } from './locales/en/trx';
import type { EnWorkout } from './locales/en/workout';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: EnCommon;
      home: EnHome;
      pricing: EnPricing;
      academy: EnAcademy;
      schedule: EnSchedule;
      intro: EnIntro;
      openingOffer: EnOpeningOffer;
      reformer: EnReformer;
      privatePilates: EnPrivatePilates;
      strength: EnStrength;
      trx: EnTrx;
      workout: EnWorkout;
      instructors: EnInstructors;
      equipment: EnEquipment;
      blog: EnBlog;
      notFound: EnNotFound;
      congrats: EnCongrats;
      privacy: EnPrivacy;
      corporate: EnCorporate;
      healthcare: EnHealthcare;
      classpass: EnClasspass;
      prenatal: EnPrenatal;
    };
  }
}
