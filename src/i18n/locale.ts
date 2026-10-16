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

const LOCALIZED_PATHS = [
  '/academy',
  '/intro',
  '/opening-offer',
  '/pricing',
  '/schedule',
  '/reformer-pilates-amsterdam',
  '/private-pilates-amsterdam',
  '/strength-training-amsterdam',
  '/trx-training-amsterdam',
];

export function localizedPath(pathname: string, locale: Locale): string {
  const base = pathname.replace(/\/nl\/?$/, '').replace(/\/$/, '') || '/';

  if (!LOCALIZED_PATHS.includes(base)) {
    return homePath(locale);
  }

  return locale === 'nl' ? `${base}/nl/` : `${base}/`;
}

/** Link target for `path` in `locale`: the `/nl/` mirror when one exists, else the path unchanged. */
export function localeHref(path: string, locale: Locale): string {
  const [pathname, hash] = path.split('#');
  const base = pathname.replace(/\/$/, '') || '/';
  let href = pathname;
  if (base === '/') href = homePath(locale);
  else if (locale === 'nl' && LOCALIZED_PATHS.includes(base)) href = `${base}/nl/`;
  return hash ? `${href}#${hash}` : href;
}

export type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};
