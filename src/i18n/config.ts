import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { localeFromPath } from './locale';
import { enAcademy } from './locales/en/academy';
import { enCommon } from './locales/en/common';
import { enHome } from './locales/en/home';
import { enPricing } from './locales/en/pricing';
import { nlAcademy } from './locales/nl/academy';
import { nlCommon } from './locales/nl/common';
import { nlHome } from './locales/nl/home';
import { nlPricing } from './locales/nl/pricing';

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
      en: { common: enCommon, home: enHome, pricing: enPricing, academy: enAcademy },
      nl: { common: nlCommon, home: nlHome, pricing: nlPricing, academy: nlAcademy },
    },
    lng: detectLng(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'nl'],
    ns: ['common', 'home', 'pricing', 'academy'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    load: 'languageOnly',
  });

  return i18n;
}

export { i18n };
