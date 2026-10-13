import type { DeepStringify } from '../../locale';
import type { EnOpeningOffer } from '../en/openingOffer';

export const nlOpeningOffer: DeepStringify<EnOpeningOffer> = {
  seo: {
    title: 'Verhuizing uitgesteld | Olympisch Stadion | PT 7 Amsterdam',
    description:
      'De verhuizing van PT 7 naar Olympisch Stadion 15 is uitgesteld na een brand in het stadion. Lessen gaan door op Van Baerlestraat 76C. Een nieuwe datum volgt.',
    keywords:
      'PT 7 Olympisch Stadion, pilates olympisch stadion, PT 7 verhuizing uitgesteld, Van Baerlestraat pilates',
    ogTitle: 'Verhuizing uitgesteld · Olympisch Stadion | PT 7',
    ogDescription:
      'Een brand in het Olympisch Stadion stelt de verhuizing uit. Lessen gaan door op de Van Baerlestraat. Nieuwe datum volgt.',
    analyticsTitle: 'Verhuizing uitgesteld | PT 7 Pilates Amsterdam',
  },
  breadcrumb: 'Verhuisupdate',
  hero: {
    brand: 'PT 7',
    kicker: 'Studioupdate · Amsterdam Zuid',
    title: 'Verhuizing uitgesteld',
    lead: 'Een brand in het Olympisch Stadion stelt onze verhuizing naar Olympisch Stadion 15 uit. Lessen gaan door op Van Baerlestraat 76C. Een nieuwe datum volgt.',
    primaryCta: 'Boek een les',
    secondaryCta: 'Lees de aankondiging',
  },
  countdown: {
    label: 'Opening over',
    days: 'Dagen',
    hours: 'Uren',
    minutes: 'Minuten',
    seconds: 'Seconden',
    aria: 'Nog {{days}} dagen, {{hours}} uur, {{minutes}} minuten en {{seconds}} seconden tot de opening',
  },
  imageAlt: 'Olympisch Stadion — de nieuwe studio van PT 7 in Amsterdam Zuid',
  limited: 'Beperkt · eenmalig',
  packages: {
    kicker: 'Pakketten',
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
    kicker: 'Status',
    title: 'Waar je naartoe komt',
    items: {
      lastDay: {
        label: 'Lessen nu',
        value: 'Van Baerlestraat 76C',
      },
      closed: {
        label: 'Geplande studio',
        value: 'Olympisch Stadion 15',
      },
      firstClass: {
        label: 'Eerste les daar',
        value: 'Datum volgt',
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
        text: 'Kies een membership, groepspakket of privé/duo-pakket op de prijzenpagina.',
      },
      book: {
        title: 'Boek je lessen',
        text: 'Gebruik het online rooster — Reformer, yoga, TRX, strength en privelessen blijven via dezelfde flow.',
      },
      arrive: {
        title: 'Train op de Van Baerlestraat',
        text: 'Lessen gaan door op Van Baerlestraat 76C tot de nieuwe verhuisdatum.',
      },
    },
  },
  faq: {
    title: 'Vragen',
    items: {
      when: {
        question: 'Waarom is de verhuizing uitgesteld?',
        answer:
          'Een brand in het Olympisch Stadion stelt de verhuizing uit. Het geplande adres blijft Olympisch Stadion 15, 1076 DE Amsterdam. Een nieuwe datum voor de eerste les volgt.',
      },
      how: {
        question: 'Gaan de lessen door op de Van Baerlestraat?',
        answer:
          'Ja. Lessen gaan door op Van Baerlestraat 76C, ook op 30 oktober, 31 oktober en 1 november 2026.',
      },
      intro: {
        question: 'Geldt de introductie voor nieuwe klanten nog?',
        answer: 'Ja. Nieuwe klanten kunnen nog steeds starten met 3 groepslessen voor €50.',
      },
      book: {
        question: 'Boek ik anders?',
        answer:
          'Nee. Boek via dezelfde roosterpagina. De lessen blijven op Van Baerlestraat 76C tot de nieuwe verhuisdatum.',
      },
    },
  },
  close: {
    title: 'Lessen gaan door aan het Museumplein',
    text: 'Boek zoals gebruikelijk op Van Baerlestraat 76C. We maken de nieuwe datum voor het Olympisch Stadion bekend zodra die vaststaat.',
    primaryCta: 'Boek een les',
    secondaryCta: 'Bekijk pakketten',
    moveLink: 'Lees het volledige verhuisbericht',
  },
};
