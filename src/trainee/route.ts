// Where the trainee is, kept in the address after the # (#logbook, #library/some-series), so a reload and the browser's
// back button keep it. The static page needs no server routes for this.

export type Section = 'overview' | 'logbook' | 'library';

export interface Route {
  section: Section;
  /** The part after the section, e.g. a series' slug. */
  param: string | null;
}

export const subscribeToRoute = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};

export const currentHash = () => window.location.hash;

export function routeOf(hash: string): Route {
  const [name, raw] = hash.slice(1).split('/', 2);
  const section: Section = name === 'logbook' || name === 'library' ? name : 'overview';
  if (!raw) return { section, param: null };
  try {
    return { section, param: decodeURIComponent(raw) };
  } catch {
    return { section, param: null }; // a damaged address: the section's first page
  }
}

export const seriesHref = (slug: string) => `#library/${encodeURIComponent(slug)}`;
