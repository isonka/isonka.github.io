/** Live Black Friday bonus. Charged pack price stays the same. */
export const BLACK_FRIDAY_BONUS = {
  5: 1,
  10: 2,
  20: 4,
} as const;

/** Hero runs through 20 November 2026, 23:59 Amsterdam (CET, UTC+1). */
const BLACK_FRIDAY_HERO_END = Date.parse('2026-11-21T00:00:00+01:00');

export function isBlackFridayHero(now = Date.now()): boolean {
  return now < BLACK_FRIDAY_HERO_END;
}
