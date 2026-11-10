export type Lane = 'pilates' | 'yoga' | 'strength';

/** Lane from the first specialty, same rule as the app. */
export function laneFromText(text: string): Lane {
  const first = (text.split('·')[0] ?? text).toLowerCase();
  if (first.includes('yoga')) return 'yoga';
  if (/strength|kracht|trx|cardio/.test(first)) return 'strength';
  return 'pilates';
}
