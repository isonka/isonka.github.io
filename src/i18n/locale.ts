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

/** Paths without a Dutch mirror (redirect-only routes). Every other page is served at `${path}nl/` too. */
const UNMIRRORED_PATHS = ['/pregnancy-pilates-amsterdam'];

function basePathOf(pathname: string): string {
  return pathname.replace(/\/nl\/?$/, '').replace(/\/$/, '') || '/';
}

export function localizedPath(pathname: string, locale: Locale): string {
  const base = basePathOf(pathname);

  if (base === '/' || UNMIRRORED_PATHS.includes(base)) {
    return homePath(locale);
  }

  return locale === 'nl' ? `${base}/nl/` : `${base}/`;
}

/** Link target for `path` in `locale`: the `/nl/` mirror when one exists, else the path unchanged. */
export function localeHref(path: string, locale: Locale): string {
  const [pathname, hash] = path.split('#');
  const base = basePathOf(pathname);
  let href = pathname;
  if (base === '/') href = homePath(locale);
  else if (locale === 'nl' && !UNMIRRORED_PATHS.includes(base)) href = `${base}/nl/`;
  return hash ? `${href}#${hash}` : href;
}

/** Date format for visible dates in `locale`. */
export function dateLocale(locale: Locale): string {
  return locale === 'nl' ? 'nl-NL' : 'en-US';
}

export type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};
