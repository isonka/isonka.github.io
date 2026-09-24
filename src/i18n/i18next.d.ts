import type {} from 'i18next';
import type { EnAcademy } from './locales/en/academy';
import type { EnCommon } from './locales/en/common';
import type { EnHome } from './locales/en/home';
import type { EnIntro } from './locales/en/intro';
import type { EnPricing } from './locales/en/pricing';
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
    };
  }
}
