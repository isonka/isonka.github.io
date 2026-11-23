// Where the trainee is, kept in the address after the # (#logbook, #library/some-series, #theory/an-id), so a reload and
// the browser's back button keep it. The static page needs no server routes for this.

export type Section = 'overview' | 'logbook' | 'library' | 'observations' | 'theory' | 'exam';

const SECTIONS: readonly string[] = ['logbook', 'library', 'observations', 'theory', 'exam'];

export interface Route {
  section: Section;
  /** The part after the section, e.g. a series' slug or an exam's id. */
  param: string | null;
}

export const subscribeToRoute = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};

export const currentHash = () => window.location.hash;

export function routeOf(hash: string): Route {
  const [name, raw] = hash.slice(1).split('/', 2);
  const known = SECTIONS.includes(name) ? (name as Section) : 'overview';
  let param: string | null = null;
  if (raw) {
    try {
      param = decodeURIComponent(raw);
    } catch {
      // A damaged address: the section's first page
    }
  }
  // These two only exist for one exam
  if ((known === 'theory' || known === 'exam') && !param) return { section: 'overview', param: null };
  return { section: known, param };
}

export const seriesHref = (slug: string) => `#library/${encodeURIComponent(slug)}`;
export const theoryHref = (id: string) => `#theory/${encodeURIComponent(id)}`;
export const examHref = (id: string) => `#exam/${encodeURIComponent(id)}`;
