export const LOCALES = ['en', 'nl'] as const;
export type Locale = (typeof LOCALES)[number];

export function localeFromPath(pathname: string): Locale {
  return /(^|\/)nl(\/|$)/.test(pathname) ? 'nl' : 'en';
}

export function isHomePath(pathname: string): boolean {
  return pathname === '/' || pathname === '/nl' || pathname === '/nl/';
}

export function homePath(locale: Locale): string {
  return locale === 'nl' ? '/nl/' : '/';
}

const LOCALIZED_PATHS = ['/academy', '/pricing'];

export function localizedPath(pathname: string, locale: Locale): string {
  const base = pathname.replace(/\/nl\/?$/, '').replace(/\/$/, '') || '/';

  if (!LOCALIZED_PATHS.includes(base)) {
    return homePath(locale);
  }

  return locale === 'nl' ? `${base}/nl/` : `${base}/`;
}

export type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};
