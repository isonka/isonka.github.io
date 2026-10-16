import { useMemo } from 'react';
import { BASE_URL } from '../data/business';
import { localeHref } from './locale';
import { useLocale } from './useLocale';

/** URL, hreflang and link helpers for a page served at `basePath` (EN) and `${basePath}nl/` (NL). */
export function useLocalizedPage(basePath: string) {
  const locale = useLocale();
  const isNl = locale === 'nl';

  return useMemo(() => {
    const enUrl = `${BASE_URL}${basePath}`;
    const nlUrl = `${BASE_URL}${basePath}nl/`;
    return {
      locale,
      isNl,
      path: isNl ? `${basePath}nl/` : basePath,
      canonical: isNl ? nlUrl : enUrl,
      hreflang: [
        { hreflang: 'en', href: enUrl },
        { hreflang: 'nl', href: nlUrl },
        { hreflang: 'x-default', href: enUrl },
      ],
      seoLocale: {
        htmlLang: locale,
        ogLocale: isNl ? 'nl_NL' : 'en_US',
        ogLocaleAlternates: isNl ? ['en_US'] : ['nl_NL'],
      },
      href: (path: string) => localeHref(path, locale),
    };
  }, [basePath, isNl, locale]);
}
