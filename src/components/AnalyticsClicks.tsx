import { useEffect } from 'react';
import { isPrerender } from '../utils/prerender';
import { trackAnchorClick } from '../utils/gtmTracking';

/** One listener for every anchor the page does not already track itself. */
export function AnalyticsClicks() {
  useEffect(() => {
    if (isPrerender()) return;

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.closest('[data-analytics="skip"]')) return;
      trackAnchorClick(anchor);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
