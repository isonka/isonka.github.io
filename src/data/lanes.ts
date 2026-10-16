export const LANE_KEYS = [
  'reformer',
  'strength',
  'yoga',
  'mat',
  'trx',
  'prenatal',
  'private',
] as const;

export type LaneKey = (typeof LANE_KEYS)[number];

export type LaneDiscipline = 'Pilates' | 'Strength' | 'Yoga' | 'Private';

export const LANE_META: Record<
  LaneKey,
  { n: number; discipline: LaneDiscipline; href: string }
> = {
  reformer: { n: 1, discipline: 'Pilates', href: '/reformer-pilates-amsterdam/' },
  strength: { n: 2, discipline: 'Strength', href: '/strength-training-amsterdam/' },
  yoga: { n: 3, discipline: 'Yoga', href: '/schedule/' },
  mat: { n: 4, discipline: 'Pilates', href: '/schedule/' },
  trx: { n: 5, discipline: 'Strength', href: '/trx-training-amsterdam/' },
  prenatal: { n: 6, discipline: 'Private', href: '/prenatal-pilates-amsterdam/' },
  private: { n: 7, discipline: 'Private', href: '/private-pilates-amsterdam/' },
};

export const DISCIPLINE_COLOR: Record<LaneDiscipline, string> = {
  Pilates: 'var(--gold)',
  Strength: 'var(--strength)',
  Yoga: 'var(--yoga)',
  Private: 'var(--ink)',
};
