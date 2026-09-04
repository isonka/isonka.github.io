export const LOCALES = ['en', 'nl'] as const;
export type Locale = (typeof LOCALES)[number];

export function localeFromPath(pathname: string): Locale {
  return pathname === '/nl' || pathname.startsWith('/nl/') ? 'nl' : 'en';
}

export function isHomePath(pathname: string): boolean {
  return pathname === '/' || pathname === '/nl' || pathname === '/nl/';
}

export function homePath(locale: Locale): string {
  return locale === 'nl' ? '/nl/' : '/';
}

export type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};
