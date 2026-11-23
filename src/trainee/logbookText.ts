import { ApiError, handleSessionError, type SessionHandlers } from './api';
import { s } from './strings';

// Small helpers shared by the logbook screens.

export const hoursText = (n: number) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100));

/** The day on this device, as the API expects it. The API checks it against the academy's own day. */
export function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Entry dates are plain days stored at midnight UTC: shown in UTC, so they never move a day. */
export const dayText = (day: string) =>
  new Date(`${day}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** The API's own message when it refused the save; otherwise the outcome is unknown. */
export function saveErrorText(err: unknown, handlers: SessionHandlers): string {
  if (handleSessionError(err, handlers)) return '';
  if (err instanceof ApiError && err.status >= 400 && err.status < 500 && err.status !== 429) return err.code;
  return s.logbook.saveFailed;
}
