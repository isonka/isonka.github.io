/** Grand-opening / studio-move campaign — bonus classes at standard package prices (no price drop). */
export const OPENING_OFFER = {
  path: '/opening-offer/',
  pathNl: '/opening-offer/nl/',
  lastDayVanBaerlestraat: '2026-10-29',
  closedDays: ['2026-10-30', '2026-10-31', '2026-11-01'] as const,
  firstClassOlympisch: '2026-11-02',
  newAddress: {
    streetAddress: 'Olympisch Stadion 15',
    postalCode: '1076 DE',
    addressLocality: 'Amsterdam',
  },
  newStudio: {
    reformers: 10,
    privateRoom: true,
    yogaMatMax: 8,
  },
  /** Paid classes → bonus classes included in the opening special */
  bonuses: {
    membership: [
      { paid: 4, bonus: 2, period: 'month' as const },
      { paid: 8, bonus: 4, period: 'month' as const },
    ],
    group: [
      { paid: 5, bonus: 1 },
      { paid: 10, bonus: 2 },
      { paid: 20, bonus: 4 },
    ],
    privateCouple: [
      { paid: 5, bonus: 1 },
      { paid: 10, bonus: 2 },
      { paid: 20, bonus: 4 },
    ],
  },
} as const;
