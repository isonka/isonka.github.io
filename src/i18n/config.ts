import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { studioAddressLine, studioStreet } from '../data/business';
import { localeFromPath } from './locale';
import { enAcademy } from './locales/en/academy';
import { enCommon } from './locales/en/common';
import { enHome } from './locales/en/home';
import { enIntro } from './locales/en/intro';
import { enOpeningOffer } from './locales/en/openingOffer';
import { enPricing } from './locales/en/pricing';
import { enPrivatePilates } from './locales/en/privatePilates';
import { enReformer } from './locales/en/reformer';
import { enStrength } from './locales/en/strength';
import { enTrx } from './locales/en/trx';
import { enSchedule } from './locales/en/schedule';
import { nlAcademy } from './locales/nl/academy';
import { nlCommon } from './locales/nl/common';
import { nlHome } from './locales/nl/home';
import { nlIntro } from './locales/nl/intro';
import { nlOpeningOffer } from './locales/nl/openingOffer';
import { nlPricing } from './locales/nl/pricing';
import { nlPrivatePilates } from './locales/nl/privatePilates';
import { nlReformer } from './locales/nl/reformer';
import { nlStrength } from './locales/nl/strength';
import { nlTrx } from './locales/nl/trx';
import { nlSchedule } from './locales/nl/schedule';

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
      },
    },
    lng: detectLng(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'nl'],
    ns: ['common', 'home', 'pricing', 'academy', 'schedule', 'intro', 'openingOffer', 'reformer', 'privatePilates', 'strength', 'trx'],
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
