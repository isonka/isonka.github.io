export const CLASS_MINUTES = 45;
export const GROUP_MAX = 10;

export const INTRO = {
  classes: 3,
  price: 50,
  newClientsOnly: true,
  serviceId: '100066',
  widgetType: 'pricing-link' as const,
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

export type PricingTab = 'memberships' | 'packs' | 'private' | 'couples';
export type PrivateTier = keyof typeof PRIVATE;
export type HealcodeWidgetType = 'pricing-link' | 'contract-link';
export type PlanBadge = 'mostPopular' | 'bestValue' | null;

export type PlanCard = {
  id: string;
  nameKey: string;
  nameCount?: number;
  price: number;
  unitKey?: 'perMonth' | null;
  perKey: string;
  perValue?: string;
  pointsKeys: string[];
  badge: PlanBadge;
  ctaKey: string;
  serviceId: string;
  widgetType: HealcodeWidgetType;
};

export const PRICING_TABS: PricingTab[] = ['memberships', 'packs', 'private', 'couples'];

export const PRIVATE_TIERS: PrivateTier[] = ['master', 'senior', 'junior'];

export const MEMBERSHIP_PLANS: PlanCard[] = [
  {
    id: 'm4',
    nameKey: 'plans.membership.four',
    price: MEMBERSHIP.four.total,
    unitKey: 'perMonth',
    perKey: 'plans.membership.fourPer',
    pointsKeys: ['plans.membership.monthlyPoint1', 'plans.membership.monthlyPoint2'],
    badge: null,
    ctaKey: 'labels.startMembership',
    serviceId: '104',
    widgetType: 'contract-link',
  },
  {
    id: 'm8',
    nameKey: 'plans.membership.eight',
    price: MEMBERSHIP.eight.total,
    unitKey: 'perMonth',
    perKey: 'plans.membership.eightPer',
    pointsKeys: ['plans.membership.monthlyPoint1', 'plans.membership.monthlyPoint2'],
    badge: null,
    ctaKey: 'labels.startMembership',
    serviceId: '107',
    widgetType: 'contract-link',
  },
  {
    id: 'munlim',
    nameKey: 'plans.membership.unlimited',
    price: MEMBERSHIP.unlimited3.perMonth,
    unitKey: 'perMonth',
    perKey: 'plans.membership.unlimitedPer',
    pointsKeys: ['plans.membership.unlimitedPoint1', 'plans.membership.unlimitedPoint2'],
    badge: 'mostPopular',
    ctaKey: 'labels.startMembership',
    serviceId: '105',
    widgetType: 'contract-link',
  },
  {
    id: 'mannual',
    nameKey: 'plans.membership.annual',
    price: MEMBERSHIP.annual.perMonth,
    unitKey: 'perMonth',
    perKey: 'plans.membership.annualPer',
    pointsKeys: ['plans.membership.annualPoint1', 'plans.membership.annualPoint2'],
    badge: 'bestValue',
    ctaKey: 'labels.startMembership',
    serviceId: '102',
    widgetType: 'contract-link',
  },
];

export const PACK_PLANS: PlanCard[] = [
  {
    id: 'g1',
    nameKey: 'plans.pack.single',
    price: GROUP.single,
    perKey: 'plans.pack.singlePer',
    pointsKeys: ['plans.validity.weeks1'],
    badge: null,
    ctaKey: 'labels.buy',
    serviceId: '100002',
    widgetType: 'pricing-link',
  },
  {
    id: 'g5',
    nameKey: 'plans.pack.five',
    price: GROUP.pack5.total,
    perKey: 'plans.pack.fivePer',
    pointsKeys: ['plans.validity.weeks5'],
    badge: null,
    ctaKey: 'labels.buy',
    serviceId: '100003',
    widgetType: 'pricing-link',
  },
  {
    id: 'g10',
    nameKey: 'plans.pack.ten',
    price: GROUP.pack10.total,
    perKey: 'plans.pack.tenPer',
    pointsKeys: ['plans.validity.weeks10'],
    badge: 'mostPopular',
    ctaKey: 'labels.buy',
    serviceId: '100004',
    widgetType: 'pricing-link',
  },
  {
    id: 'g20',
    nameKey: 'plans.pack.twenty',
    price: GROUP.pack20.total,
    perKey: 'plans.pack.twentyPer',
    pointsKeys: ['plans.validity.weeks20'],
    badge: null,
    ctaKey: 'labels.buy',
    serviceId: '100005',
    widgetType: 'pricing-link',
  },
];

export const COUPLE_PLANS: PlanCard[] = [
  {
    id: 'c1',
    nameKey: 'plans.pack.single',
    price: COUPLE.single,
    perKey: 'plans.couple.singlePer',
    pointsKeys: ['plans.validity.weeks1'],
    badge: null,
    ctaKey: 'labels.buy',
    serviceId: '100033',
    widgetType: 'pricing-link',
  },
  {
    id: 'c5',
    nameKey: 'plans.pack.five',
    price: COUPLE.pack5.total,
    perKey: 'plans.couple.fivePer',
    pointsKeys: ['plans.validity.weeks5'],
    badge: null,
    ctaKey: 'labels.buy',
    serviceId: '100034',
    widgetType: 'pricing-link',
  },
  {
    id: 'c10',
    nameKey: 'plans.pack.ten',
    price: COUPLE.pack10.total,
    perKey: 'plans.couple.tenPer',
    pointsKeys: ['plans.validity.weeks10'],
    badge: 'bestValue',
    ctaKey: 'labels.buy',
    serviceId: '100035',
    widgetType: 'pricing-link',
  },
  {
    id: 'c20',
    nameKey: 'plans.pack.twenty',
    price: COUPLE.pack20.total,
    perKey: 'plans.couple.twentyPer',
    pointsKeys: ['plans.validity.weeks20'],
    badge: null,
    ctaKey: 'labels.buy',
    serviceId: '100036',
    widgetType: 'pricing-link',
  },
];

const PRIVATE_SERVICE: Record<PrivateTier, [string, string, string, string]> = {
  junior: ['100052', '100053', '100054', '100055'],
  senior: ['100012', '100013', '100014', '100015'],
  master: ['100048', '100049', '100050', '100051'],
};

export function privatePlans(tier: PrivateTier): PlanCard[] {
  const p = PRIVATE[tier];
  const ids = PRIVATE_SERVICE[tier];
  const totals = [
    p.single,
    packTotal(p.pack5, 5),
    packTotal(p.pack10, 10),
    packTotal(p.pack20, 20),
  ];
  const per = [p.single, p.pack5, p.pack10, p.pack20];
  const names = ['single', 'five', 'ten', 'twenty'] as const;
  const weeks = ['weeks1', 'weeks5', 'weeks10', 'weeks20'] as const;
  const popularIndex = tier === 'senior' ? 2 : -1;

  return names.map((name, i) => ({
    id: `p-${tier}-${name}`,
    nameKey: `plans.private.${name}`,
    price: totals[i],
    perKey: 'plans.private.perSession',
    perValue: formatEur(per[i]),
    pointsKeys: [`plans.validity.${weeks[i]}`, 'plans.private.oneOnOne'],
    badge: i === popularIndex ? ('mostPopular' as const) : null,
    ctaKey: 'labels.buy',
    serviceId: ids[i],
    widgetType: 'pricing-link' as const,
  }));
}

export function formatEur(n: number): string {
  if (Number.isInteger(n)) return `€${n.toLocaleString('en-US')}`;
  return `€${n.toFixed(2)}`;
}

export function packTotal(perClass: number, classes: number): number {
  return perClass * classes;
}

export function privatePackLine(tier: keyof typeof PRIVATE): string {
  const p = PRIVATE[tier];
  return `• ${formatEur(p.single)} single, ${formatEur(p.pack5)}/class (5-pack), ${formatEur(p.pack10)}/class (10-pack), ${formatEur(p.pack20)}/class (20-pack)`;
}

export function healcodeHtml(
  serviceId: string,
  widgetType: HealcodeWidgetType,
  label: string,
): string {
  const linkClass =
    widgetType === 'contract-link'
      ? 'healcode-contract-text-link'
      : 'healcode-pricing-option-text-link';
  return `<healcode-widget data-version="0.2" data-link-class="${linkClass}" data-site-id="123605" data-mb-site-id="5741736" data-service-id="${serviceId}" data-bw-identity-site="true" data-type="${widgetType}" data-inner-html="${label}"></healcode-widget>`;
}
