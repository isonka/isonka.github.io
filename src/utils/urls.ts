/**
 * Normalize site paths/URLs to trailing-slash form.
 * GitHub Pages serves route dirs as /path/ (200); /path 301s.
 * Keep canonicals, sitemap, and links on the 200 URL.
 */
export function withTrailingSlash(pathOrUrl: string): string {
  if (!pathOrUrl || pathOrUrl === '/') return pathOrUrl;

  const match = pathOrUrl.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return pathOrUrl;

  const pathPart = match[1];
  const suffix = match[2] ?? '';

  if (pathPart.endsWith('/')) return pathOrUrl;
  // Real files (images, xml, html, md, etc.) — do not slash
  if (/\.[a-z0-9]+$/i.test(pathPart)) return pathOrUrl;

  return `${pathPart}/${suffix}`;
}
