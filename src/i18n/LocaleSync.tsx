import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from './useLocale';

export function LocaleSync() {
  const locale = useLocale();
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (i18n.resolvedLanguage !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [i18n, locale]);

  return null;
}
