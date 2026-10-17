import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { studioAddressLine, studioStreet } from '../data/business';
import { localeFromPath } from './locale';
import { enAcademy } from './locales/en/academy';
import { enBlog } from './locales/en/blog';
import { enClasspass } from './locales/en/classpass';
import { enCommon } from './locales/en/common';
import { enCongrats } from './locales/en/congrats';
import { enCorporate } from './locales/en/corporate';
import { enEquipment } from './locales/en/equipment';
import { enHealthcare } from './locales/en/healthcare';
import { enHome } from './locales/en/home';
import { enInstructors } from './locales/en/instructors';
import { enIntro } from './locales/en/intro';
import { enNotFound } from './locales/en/notFound';
import { enOpeningOffer } from './locales/en/openingOffer';
import { enPrenatal } from './locales/en/prenatal';
import { enPricing } from './locales/en/pricing';
import { enPrivacy } from './locales/en/privacy';
import { enPrivatePilates } from './locales/en/privatePilates';
import { enReformer } from './locales/en/reformer';
import { enSchedule } from './locales/en/schedule';
import { enStrength } from './locales/en/strength';
import { enTrx } from './locales/en/trx';
import { enWorkout } from './locales/en/workout';
import { nlAcademy } from './locales/nl/academy';
import { nlBlog } from './locales/nl/blog';
import { nlClasspass } from './locales/nl/classpass';
import { nlCommon } from './locales/nl/common';
import { nlCongrats } from './locales/nl/congrats';
import { nlCorporate } from './locales/nl/corporate';
import { nlEquipment } from './locales/nl/equipment';
import { nlHealthcare } from './locales/nl/healthcare';
import { nlHome } from './locales/nl/home';
import { nlInstructors } from './locales/nl/instructors';
import { nlIntro } from './locales/nl/intro';
import { nlNotFound } from './locales/nl/notFound';
import { nlOpeningOffer } from './locales/nl/openingOffer';
import { nlPrenatal } from './locales/nl/prenatal';
import { nlPricing } from './locales/nl/pricing';
import { nlPrivacy } from './locales/nl/privacy';
import { nlPrivatePilates } from './locales/nl/privatePilates';
import { nlReformer } from './locales/nl/reformer';
import { nlSchedule } from './locales/nl/schedule';
import { nlStrength } from './locales/nl/strength';
import { nlTrx } from './locales/nl/trx';
import { nlWorkout } from './locales/nl/workout';

function detectLng(): 'en' | 'nl' {
  if (typeof window === 'undefined') return 'en';
  return localeFromPath(window.location.pathname);
}

let started = false;

export function initI18n() {
  if (started) return i18n;
  started = true;

  void i18n.use(initReactI18next).init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        pricing: enPricing,
        academy: enAcademy,
        schedule: enSchedule,
        intro: enIntro,
        openingOffer: enOpeningOffer,
        reformer: enReformer,
        privatePilates: enPrivatePilates,
        strength: enStrength,
        trx: enTrx,
        workout: enWorkout,
        instructors: enInstructors,
        equipment: enEquipment,
        blog: enBlog,
        notFound: enNotFound,
        congrats: enCongrats,
        privacy: enPrivacy,
        corporate: enCorporate,
        healthcare: enHealthcare,
        classpass: enClasspass,
        prenatal: enPrenatal,
      },
      nl: {
        common: nlCommon,
        home: nlHome,
        pricing: nlPricing,
        academy: nlAcademy,
        schedule: nlSchedule,
        intro: nlIntro,
        openingOffer: nlOpeningOffer,
        reformer: nlReformer,
        privatePilates: nlPrivatePilates,
        strength: nlStrength,
        trx: nlTrx,
        workout: nlWorkout,
        instructors: nlInstructors,
        equipment: nlEquipment,
        blog: nlBlog,
        notFound: nlNotFound,
        congrats: nlCongrats,
        privacy: nlPrivacy,
        corporate: nlCorporate,
        healthcare: nlHealthcare,
        classpass: nlClasspass,
        prenatal: nlPrenatal,
      },
    },
    lng: detectLng(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'nl'],
    ns: ['common', 'home', 'pricing', 'academy', 'schedule', 'intro', 'openingOffer', 'reformer', 'privatePilates', 'strength', 'trx', 'workout', 'instructors', 'equipment', 'blog', 'notFound', 'congrats', 'privacy', 'corporate', 'healthcare', 'classpass', 'prenatal'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
      defaultVariables: { studioStreet, studioAddress: studioAddressLine },
    },
    react: { useSuspense: false },
    load: 'languageOnly',
  });

  return i18n;
}

export { i18n };
