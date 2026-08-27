export function withTrailingSlash(pathOrUrl: string): string {
  if (!pathOrUrl || pathOrUrl === '/') return pathOrUrl;

  const match = pathOrUrl.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return pathOrUrl;

  const pathPart = match[1];
  const suffix = match[2] ?? '';

  if (pathPart.endsWith('/')) return pathOrUrl;
  if (/\.[a-z0-9]+$/i.test(pathPart)) return pathOrUrl;

  return `${pathPart}/${suffix}`;
}

/** Same-origin SPA path from GH Pages 404.html. Reject protocol-relative and off-site values. */
export function safeInternalRedirect(raw: string): { path: string; rest: string } | null {
  let value = raw;
  try {
    value = decodeURIComponent(raw);
  } catch {
    return null;
  }

  if (!value || value === '/') return null;
  if (/[\\]/.test(value) || value.includes('://') || /%2f/i.test(value)) return null;

  const qIndex = value.indexOf('?');
  const hIndex = value.indexOf('#');
  let pathEnd = value.length;
  if (qIndex !== -1) pathEnd = Math.min(pathEnd, qIndex);
  if (hIndex !== -1) pathEnd = Math.min(pathEnd, hIndex);

  const pathPart = value.slice(0, pathEnd) || '/';
  if (!pathPart.startsWith('/') || pathPart.startsWith('//')) return null;

  return {
    path: withTrailingSlash(pathPart),
    rest: value.slice(pathEnd),
  };
}
