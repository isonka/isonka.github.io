export const CLASS_MINUTES = 45;
export const GROUP_MAX = 5;

export const INTRO = {
  classes: 3,
  price: 50,
  newClientsOnly: true,
} as const;

export const MEMBERSHIP = {
  four: { perClass: 21.5, total: 86, classes: 4 },
  eight: { perClass: 20, total: 160, classes: 8 },
  unlimited3: { perMonth: 350 },
  annual: { perMonth: 250, yearTotal: 3000 },
} as const;

export const GROUP = {
  single: 37,
  pack5: { perClass: 35, total: 175 },
  pack10: { perClass: 30, total: 300 },
  pack20: { perClass: 28, total: 560 },
} as const;

export const PRIVATE = {
  junior: { single: 70, pack5: 65, pack10: 62.5, pack20: 60 },
  senior: { single: 80, pack5: 75, pack10: 72.5, pack20: 70 },
  master: { single: 85, pack5: 80, pack10: 77.5, pack20: 75 },
} as const;

export const COUPLE = {
  single: 50,
  pack5: { perClass: 45, total: 225 },
  pack10: { perClass: 43, total: 430 },
  pack20: { perClass: 40, total: 800 },
} as const;

export const TRIO = {
  single: 45,
  pack5: { perClass: 42, total: 210 },
  pack10: { perClass: 40, total: 400 },
  pack20: { perClass: 38, total: 760 },
} as const;

export function formatEur(n: number): string {
  if (Number.isInteger(n)) return `€${n.toLocaleString('en-US')}`;
  return `€${n.toFixed(2)}`;
}

export function packTotal(perClass: number, classes: number): number {
  return perClass * classes;
}

export function privatePackLine(
  tier: keyof typeof PRIVATE,
): string {
  const p = PRIVATE[tier];
  return `• ${formatEur(p.single)} single, ${formatEur(p.pack5)}/class (5-pack), ${formatEur(p.pack10)}/class (10-pack), ${formatEur(p.pack20)}/class (20-pack)`;
}
