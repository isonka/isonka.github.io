import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { studioAddressLine, studioStreet } from '../data/business';
import { localeFromPath } from './locale';
import { enCommon } from './locales/en/common';
import { enHome } from './locales/en/home';
import { nlCommon } from './locales/nl/common';
import { nlHome } from './locales/nl/home';

export type PageNamespace =
  | 'pricing'
  | 'academy'
  | 'schedule'
  | 'intro'
  | 'openingOffer'
  | 'reformer'
  | 'privatePilates'
  | 'strength'
  | 'trx'
  | 'workout'
  | 'instructors'
  | 'equipment'
  | 'blog'
  | 'notFound'
  | 'congrats'
  | 'privacy'
  | 'corporate'
  | 'healthcare'
  | 'classpass'
  | 'prenatal';

type Bundle = object;

const bundles: Record<'en' | 'nl', Record<PageNamespace, () => Promise<Bundle>>> = {
  en: {
    pricing: () => import('./locales/en/pricing').then((m) => m.enPricing),
    academy: () => import('./locales/en/academy').then((m) => m.enAcademy),
    schedule: () => import('./locales/en/schedule').then((m) => m.enSchedule),
    intro: () => import('./locales/en/intro').then((m) => m.enIntro),
    openingOffer: () => import('./locales/en/openingOffer').then((m) => m.enOpeningOffer),
    reformer: () => import('./locales/en/reformer').then((m) => m.enReformer),
    privatePilates: () => import('./locales/en/privatePilates').then((m) => m.enPrivatePilates),
    strength: () => import('./locales/en/strength').then((m) => m.enStrength),
    trx: () => import('./locales/en/trx').then((m) => m.enTrx),
    workout: () => import('./locales/en/workout').then((m) => m.enWorkout),
    instructors: () => import('./locales/en/instructors').then((m) => m.enInstructors),
    equipment: () => import('./locales/en/equipment').then((m) => m.enEquipment),
    blog: () => import('./locales/en/blog').then((m) => m.enBlog),
    notFound: () => import('./locales/en/notFound').then((m) => m.enNotFound),
    congrats: () => import('./locales/en/congrats').then((m) => m.enCongrats),
    privacy: () => import('./locales/en/privacy').then((m) => m.enPrivacy),
    corporate: () => import('./locales/en/corporate').then((m) => m.enCorporate),
    healthcare: () => import('./locales/en/healthcare').then((m) => m.enHealthcare),
    classpass: () => import('./locales/en/classpass').then((m) => m.enClasspass),
    prenatal: () => import('./locales/en/prenatal').then((m) => m.enPrenatal),
  },
  nl: {
    pricing: () => import('./locales/nl/pricing').then((m) => m.nlPricing),
    academy: () => import('./locales/nl/academy').then((m) => m.nlAcademy),
    schedule: () => import('./locales/nl/schedule').then((m) => m.nlSchedule),
    intro: () => import('./locales/nl/intro').then((m) => m.nlIntro),
    openingOffer: () => import('./locales/nl/openingOffer').then((m) => m.nlOpeningOffer),
    reformer: () => import('./locales/nl/reformer').then((m) => m.nlReformer),
    privatePilates: () => import('./locales/nl/privatePilates').then((m) => m.nlPrivatePilates),
    strength: () => import('./locales/nl/strength').then((m) => m.nlStrength),
    trx: () => import('./locales/nl/trx').then((m) => m.nlTrx),
    workout: () => import('./locales/nl/workout').then((m) => m.nlWorkout),
    instructors: () => import('./locales/nl/instructors').then((m) => m.nlInstructors),
    equipment: () => import('./locales/nl/equipment').then((m) => m.nlEquipment),
    blog: () => import('./locales/nl/blog').then((m) => m.nlBlog),
    notFound: () => import('./locales/nl/notFound').then((m) => m.nlNotFound),
    congrats: () => import('./locales/nl/congrats').then((m) => m.nlCongrats),
    privacy: () => import('./locales/nl/privacy').then((m) => m.nlPrivacy),
    corporate: () => import('./locales/nl/corporate').then((m) => m.nlCorporate),
    healthcare: () => import('./locales/nl/healthcare').then((m) => m.nlHealthcare),
    classpass: () => import('./locales/nl/classpass').then((m) => m.nlClasspass),
    prenatal: () => import('./locales/nl/prenatal').then((m) => m.nlPrenatal),
  },
};

const pending = new Map<string, Promise<void>>();

export function loadNamespaces(namespaces: readonly PageNamespace[]): Promise<void> {
  if (namespaces.length === 0) return Promise.resolve();

  const langs: Array<'en' | 'nl'> = ['en', 'nl'];

  const jobs = langs.flatMap((lang) =>
    namespaces.map((ns) => {
      if (i18n.hasResourceBundle(lang, ns)) return Promise.resolve();
      const key = `${lang}:${ns}`;
      const existing = pending.get(key);
      if (existing) return existing;
      const job = bundles[lang][ns]().then((data) => {
        i18n.addResourceBundle(lang, ns, data, true, true);
      });
      pending.set(key, job);
      return job;
    }),
  );

  return Promise.all(jobs).then(() => undefined);
}

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
      },
      nl: {
        common: nlCommon,
        home: nlHome,
      },
    },
    lng: detectLng(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'nl'],
    ns: ['common', 'home'],
    defaultNS: 'common',
    partialBundledLanguages: true,
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
