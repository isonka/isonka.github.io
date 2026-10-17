export const CLASS_MINUTES = 45;
export const GROUP_MAX = 10;

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

export type HealcodeKind = 'pricing' | 'contract';

export type HealcodeWidget = {
  serviceId: string;
  kind: HealcodeKind;
};

/** MindBody Buy widgets — do not change IDs without verifying in MindBody. */
export const HEALCODE = {
  intro: { serviceId: '100066', kind: 'pricing' },
  membership4: { serviceId: '104', kind: 'contract' },
  membership8: { serviceId: '107', kind: 'contract' },
  unlimited3: { serviceId: '105', kind: 'contract' },
  annual: { serviceId: '102', kind: 'contract' },
  groupSingle: { serviceId: '100002', kind: 'pricing' },
  group5: { serviceId: '100003', kind: 'pricing' },
  group10: { serviceId: '100004', kind: 'pricing' },
  group20: { serviceId: '100005', kind: 'pricing' },
  privateJunior: {
    single: { serviceId: '100052', kind: 'pricing' },
    pack5: { serviceId: '100053', kind: 'pricing' },
    pack10: { serviceId: '100054', kind: 'pricing' },
    pack20: { serviceId: '100055', kind: 'pricing' },
  },
  privateSenior: {
    single: { serviceId: '100012', kind: 'pricing' },
    pack5: { serviceId: '100013', kind: 'pricing' },
    pack10: { serviceId: '100014', kind: 'pricing' },
    pack20: { serviceId: '100015', kind: 'pricing' },
  },
  privateMaster: {
    single: { serviceId: '100048', kind: 'pricing' },
    pack5: { serviceId: '100049', kind: 'pricing' },
    pack10: { serviceId: '100050', kind: 'pricing' },
    pack20: { serviceId: '100051', kind: 'pricing' },
  },
  coupleSingle: { serviceId: '100033', kind: 'pricing' },
  couple5: { serviceId: '100034', kind: 'pricing' },
  couple10: { serviceId: '100035', kind: 'pricing' },
  couple20: { serviceId: '100036', kind: 'pricing' },
} as const;

export function healcodeHtml(widget: HealcodeWidget, label: string): string {
  const linkClass =
    widget.kind === 'contract'
      ? 'healcode-contract-text-link'
      : 'healcode-pricing-option-text-link';
  const type = widget.kind === 'contract' ? 'contract-link' : 'pricing-link';
  return `<healcode-widget data-version="0.2" data-link-class="${linkClass}" data-site-id="123605" data-mb-site-id="5741736" data-service-id="${widget.serviceId}" data-bw-identity-site="true" data-type="${type}" data-inner-html="${label}"></healcode-widget>`;
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
