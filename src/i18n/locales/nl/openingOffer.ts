import type { DeepStringify } from '../../locale';
import type { EnOpeningOffer } from '../en/openingOffer';

export const nlOpeningOffer: DeepStringify<EnOpeningOffer> = {
  seo: {
    title: 'Grote opening special | Bonuslessen | PT 7 Amsterdam',
    description:
      'PT 7 grote opening special: dezelfde pakketprijzen, extra bonuslessen. Memberships, groepspakketten en privé/duo · Olympisch Stadion 15.',
    keywords:
      'PT 7 openingaanbod, bonus pilateslessen amsterdam, pilates olympisch stadion, grote opening special amsterdam, reformer pilates bonuspakket',
    ogTitle: 'Grote opening special · Extra lessen | PT 7',
    ogDescription:
      'Meer lessen, dezelfde prijs. Bonuslessen op memberships, groepspakketten en privé/duo voor de opening op Olympisch Stadion.',
    analyticsTitle: 'Openingaanbod | PT 7 Pilates Amsterdam',
  },
  breadcrumb: 'Openingaanbod',
  hero: {
    brand: 'PT 7',
    kicker: 'Grote opening · Amsterdam Zuid',
    title: 'Meer lessen. Dezelfde prijs.',
    lead: 'Mis dit exclusieve aanbod niet — meer lessen, meer beweging, meer jij. Bonuslessen op geselecteerde pakketten voor onze verhuizing naar Olympisch Stadion 15.',
    primaryCta: 'Boek een les',
    secondaryCta: 'Alle prijzen',
  },
  imageAlt: 'Olympisch Stadion — de nieuwe studio van PT 7 in Amsterdam Zuid',
  limited: 'Beperkt · eenmalig',
  packages: {
    kicker: 'Opening special',
    title: 'Bonuslessen bij elk pakket',
    lead: 'Pakketprijzen blijven hetzelfde. Je krijgt extra lessen erbij — memberships, groepslessen en privé- of duopakketten.',
    membership: {
      title: 'Memberships',
      row: '{{paid}} lessen in 1 maand',
      bonus_one: '+{{bonus}} bonusles',
      bonus_other: '+{{bonus}} bonuslessen',
    },
    group: {
      title: 'Alle groepslessen',
      subtitle: 'Pilates · Yoga',
      row: '{{paid}} lessen',
      bonus_one: '+{{bonus}} bonusles',
      bonus_other: '+{{bonus}} bonuslessen',
    },
    privateCouple: {
      title: 'Privé / duo lessen',
      row: '{{paid}} lessen',
      bonus_one: '+{{bonus}} bonusles',
      bonus_other: '+{{bonus}} bonuslessen',
    },
  },
  dates: {
    kicker: 'Tijdlijn',
    title: 'Belangrijke data',
    items: {
      lastDay: {
        label: 'Laatste dag Van Baerlestraat',
        value: 'Donderdag 29 oktober 2026',
      },
      closed: {
        label: 'Geen lessen',
        value: '30 oktober – 1 november 2026',
      },
      firstClass: {
        label: 'Eerste les Olympisch Stadion',
        value: 'Maandag 2 november 2026',
      },
    },
  },
  studio: {
    kicker: 'De nieuwe ruimte',
    title: 'Wat erbij komt',
    lead: 'Zelfde boeken, dezelfde coaches — meer ruimte om te trainen.',
    items: {
      reformers: {
        title: '10 reformers',
        text: 'Grotere Reformer-groepslessen in de nieuwe studio.',
      },
      private: {
        title: 'Privéruimte',
        text: 'Een aparte ruimte voor een-op-een en prenatale sessies.',
      },
      yoga: {
        title: 'Yoga & matpilates',
        text: 'Nieuwe formats, maximaal 8 personen per les.',
      },
    },
  },
  steps: {
    kicker: 'Zo claim je',
    title: 'Drie stappen',
    items: {
      buy: {
        title: 'Koop een geldig pakket',
        text: 'Kies een membership, groepspakket of privé/duo-pakket op de prijzenpagina. Bonuslessen horen bij de opening special.',
      },
      book: {
        title: 'Boek je lessen',
        text: 'Gebruik het online rooster — Reformer, yoga, TRX, strength en privelessen blijven via dezelfde flow.',
      },
      arrive: {
        title: 'Train met ons',
        text: 'Tot 29 oktober: Van Baerlestraat 76C. Vanaf 2 november: Olympisch Stadion 15.',
      },
    },
  },
  faq: {
    title: 'Vragen',
    items: {
      when: {
        question: 'Is de opening special nu beschikbaar?',
        answer:
          'Ja. De grote opening special met bonuslessen is nu beschikbaar voor onze verhuizing naar Olympisch Stadion — beperkt, eenmalig.',
      },
      how: {
        question: 'Dalende prijzen?',
        answer:
          'Nee. Pakketprijzen blijven hetzelfde. Je krijgt extra bonuslessen bovenop de lessen die je betaalt — bijvoorbeeld 8 membership-lessen kopen en +4 bonuslessen krijgen.',
      },
      intro: {
        question: 'Geldt de introductie voor nieuwe klanten nog?',
        answer:
          'Ja. Nieuwe klanten kunnen nog steeds starten met 3 groepslessen voor €50. De opening special is een aparte bonus op memberships en grotere pakketten.',
      },
      book: {
        question: 'Boek ik anders na de verhuizing?',
        answer:
          'Nee. Boek via dezelfde roosterpagina. Vanaf 2 november zijn de lessen op Olympisch Stadion 15, 1076 DE Amsterdam.',
      },
    },
  },
  close: {
    title: 'Klaar voor Olympisch Stadion?',
    text: 'Kies een pakket, krijg je bonuslessen, en boek. Tot ziens in de nieuwe studio.',
    primaryCta: 'Boek een les',
    secondaryCta: 'Bekijk pakketten',
    moveLink: 'Lees het volledige verhuisbericht',
  },
};
