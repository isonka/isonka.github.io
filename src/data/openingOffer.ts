/**
 * Grand-opening campaign is paused. A fire at Olympisch Stadion postponed the move.
 * Planned address stays Olympisch Stadion 15. First-class date is not set.
 * Bonus figures below are the paused offer, not live pricing.
 */
export const OPENING_OFFER = {
  active: false,
  path: '/opening-offer/',
  pathNl: '/opening-offer/nl/',
  announcementPath: '/blog/pt-7-moves-to-olympisch-stadion/',
  lastDayVanBaerlestraat: '',
  closedDays: [] as const,
  firstClassOlympisch: '',
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
