import type {} from 'i18next';
import type { EnAcademy } from './locales/en/academy';
import type { EnCommon } from './locales/en/common';
import type { EnHome } from './locales/en/home';
import type { EnIntro } from './locales/en/intro';
import type { EnOpeningOffer } from './locales/en/openingOffer';
import type { EnPricing } from './locales/en/pricing';
import type { EnPrivatePilates } from './locales/en/privatePilates';
import type { EnReformer } from './locales/en/reformer';
import type { EnStrength } from './locales/en/strength';
import type { EnTrx } from './locales/en/trx';
import type { EnSchedule } from './locales/en/schedule';

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
    };
  }
}
