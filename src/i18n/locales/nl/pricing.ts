import type { DeepStringify } from '../../locale';
import type { EnPricing } from '../en/pricing';

export const nlPricing: DeepStringify<EnPricing> = {
  seo: {
    title: 'Pilates prijzen Amsterdam | Vanaf €50 intro | PT 7',
    description:
      'Pilates prijzen op Olympisch Stadion 15: intro van 3 groepslessen €50, daarna vanaf {{groupPrice}}/les (max {{groupMax}}). Abonnementen en privé.',
    keywords:
      'pilates prijzen amsterdam, Pilates prijzen Amsterdam, Pilates abonnement Amsterdam, strippenkaart Pilates',
    ogTitle: 'Kies je plan. Vind je baan. | PT 7',
    ogDescription:
      'Intro 3 lessen €50. Kleine groepen (max {{groupMax}}) vanaf {{groupPrice}}/les in het Olympisch Stadion.',
    analyticsTitle: 'Pilates prijzen Amsterdam | PT 7 Pilates',
  },
  breadcrumbName: 'Prijzen',
  hero: {
    eyebrow: 'Prijzen · Entry · Abonnementen',
    title: 'Kies je plan.',
    titleAccent: 'Vind je baan.',
    lead:
      'Elke les is 45 minuten met een coach op de vloer. Begin met het intro-ticket, kies daarna hoe vaak je traint.',
  },
  facts: {
    aria: 'Elke les',
    minutes: 'Minuten',
    perClass: 'Per les',
    lanes: 'Banen',
    coach: 'Coach op de vloer',
  },
  ticket: {
    title: 'Eerste keer?',
    titleAccent: 'Je hoort erbij.',
    lead:
      'Drie groepslessen, elke baan. Reformer maandag, yoga woensdag, barbell vrijdag — of drie keer dezelfde.',
    admit: 'Admit one',
    badge: 'Nieuwe leden',
    big: '3 groepslessen',
    sub: 'Elke baan · eerste keer',
    stubLabel: 'Entry',
    cta: 'Claim het',
  },
  plans: {
    title: 'Kies hoe je',
    titleAccent: 'traint.',
    tabsAria: 'Prijscategorieën',
    memberships: 'Abonnementen',
    packs: 'Strippenkaarten',
    private: 'Privé',
    couples: 'Duo',
    membershipLead:
      'Voor wekelijks trainen. Groepslessen, elke dag, max. één les per dag. Abonnementen verlengen automatisch; opzeggen na de minimale periode.',
    packsLead:
      'Betaal per les. Kaarten zijn geldig zoveel weken als er lessen op staan, vanaf aankoopdatum.',
    privateLead:
      'One-on-one met een coach. Kies niveau — master (Elif), senior of coach.',
    couplesLead: 'Twee personen, één coach. Prijs per persoon.',
  },
  labels: {
    perClass: 'per les',
    perMonth: '/ maand',
    mostPopular: 'Meest gekozen',
    bestValue: 'Beste deal',
    buyNow: 'Kopen',
    startMembership: 'Start abonnement',
    buyPack: 'Koop kaart',
    bookPrivate: 'Boek privé',
    bookCouple: 'Boek duo',
    unlimitedClasses: 'Onbeperkt lessen',
    yearTotal: '{{amount}} per jaar',
    tierMaster: 'Master coach',
    tierSenior: 'Senior coach',
    tierJunior: 'Coach',
  },
  membership: {
    four: '4 lessen per maand',
    eight: '8 lessen per maand',
    unlimited: 'Onbeperkt',
    annual: 'Onbeperkt jaar',
    fourB1: 'Maandelijks, verlengt automatisch',
    fourB2: 'Opzeggen na de eerste maand',
    eightB1: 'Maandelijks, verlengt automatisch',
    eightB2: 'Opzeggen na de eerste maand',
    unlimitedB1: '3 maanden commitment',
    unlimitedB2: 'Daarna maandelijks',
    annualB1: '12 maanden commitment',
    annualB2: 'Inclusief 4 weken freeze',
  },
  group: {
    single: 'Losse les',
    pack5: '5-rittenkaart',
    pack10: '10-rittenkaart',
    pack20: '20-rittenkaart',
    valid: 'Geldig {{weeks}} weken',
  },
  private: {
    single: 'Losse sessie',
    pack5: '5-sessie pack',
    pack10: '10-sessie pack',
    pack20: '20-sessie pack',
  },
  couple: {
    single: 'Los (per persoon)',
    pack5: '5-rittenkaart',
    pack10: '10-rittenkaart',
    pack20: '20-rittenkaart',
  },
  faq: {
    title: 'Goed om',
    titleAccent: 'te weten.',
    lead: 'Twijfel je welk plan past? App ons — een coach helpt je kiezen.',
    whatsapp: 'WhatsApp ons',
    items: {
      validity: {
        q: 'Hoe werkt de geldigheid van een kaart?',
        a: 'Een kaart is geldig zoveel weken als er lessen op staan, vanaf aankoop. 5 lessen = 5 weken; 20 lessen = 20 weken.',
      },
      cancel: {
        q: 'Hoe zeg ik een abonnement op?',
        a: 'Abonnementen verlengen automatisch. Zeg op voor de verlengdatum via info@pt7.nl of +31 685 162693, na de minimale periode.',
      },
      freeze: {
        q: 'Kan ik mijn abonnement bevriezen?',
        a: 'Het jaarlijkse onbeperkte abonnement heeft 4 weken freeze. Vraag ons naar andere plannen.',
      },
      pregnant: {
        q: 'Ik ben zwanger. Mag ik groepsles?',
        a: 'Tijdens zwangerschap trainen we alleen one-on-one, zodat je coach alles veilig kan aanpassen. Zie tab Privé.',
      },
      injury: {
        q: 'Ik heb een blessure. Is dat een probleem?',
        a: 'Vertel het voor je boekt. Onze coaches passen oefeningen aan; privé is een goede start terug.',
      },
      levels: {
        q: 'Wat is het verschil tussen coach-niveaus?',
        a: 'Privé is geprijsd op ervaring: master coach (Elif), senior coaches en coaches. Iedereen is gecertificeerd in de PT7-methode.',
      },
    },
  },
};
