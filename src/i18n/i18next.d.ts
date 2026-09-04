import type {} from 'i18next';
import type { EnCommon } from './locales/en/common';
import type { EnHome } from './locales/en/home';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: EnCommon;
      home: EnHome;
    };
  }
}
