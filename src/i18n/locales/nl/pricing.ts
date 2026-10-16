import type { DeepStringify } from '../../locale';
import type { EnPricing } from '../en/pricing';

export const nlPricing: DeepStringify<EnPricing> = {
  seo: {
    title: 'Pilates prijzen Amsterdam | Vanaf €50 intro | PT 7',
    description:
      'PT 7 prijzen op Olympisch Stadion: intro 3 groepslessen voor €50, daarna vanaf {{groupPrice}}/les (tot {{groupMax}}). Abonnementen, strippenkaarten en privé.',
    keywords:
      'pilates lesprijzen amsterdam, pilates prijzen amsterdam, Pilates prijzen Amsterdam, Pilates abonnement Amsterdam, Olympisch Stadion pilates, reformer pilates prive amsterdam, private Pilates kosten, proefles Pilates Amsterdam, strippenkaart Pilates',
    ogTitle: 'Pilates prijzen Amsterdam | PT 7 Olympisch Stadion',
    ogDescription:
      'Intro 3 lessen voor €50. Kleine groepen (tot {{groupMax}}) vanaf {{groupPrice}}/les op Olympisch Stadion. Abonnementen en privé — online boeken.',
    analyticsTitle: 'Pilates prijzen Amsterdam | PT 7 Pilates',
  },
  breadcrumbName: 'Prijzen',
  hero: {
    kicker: 'Prijzen',
    titleBefore: 'Eenvoudige prijzen,',
    titleAccent: 'coached lessen.',
    lead: 'Elke les duurt {{minutes}} minuten, met een coach op de vloer. Begin met de intro-aanbieding, kies daarna hoe je wilt trainen.',
  },
  offer: {
    label: 'Nieuw hier',
    title: '{{classes}} groepslessen voor',
    detail: 'Elke lane — Reformer, yoga, kracht. Voor nieuwe klanten.',
    cta: 'Claim intro-aanbieding',
  },
  plans: {
    titleBefore: 'Kies hoe je',
    titleAccent: 'traint.',
    tabsAria: 'Prijscategorieën',
    tabs: {
      memberships: 'Abonnementen',
      packs: 'Strippenkaarten',
      private: 'Privé',
      couples: 'Duo',
    },
    intros: {
      memberships:
        'Voor wekelijks trainen. Groepslessen, elke dag, maximaal één les per dag. Abonnementen verlengen automatisch en kun je na de minimale periode opzeggen.',
      packs:
        'Geen verplichting. Een strippenkaart is evenveel weken geldig als lessen — een 10-lessenkaart loopt 10 weken.',
      private:
        'Één-op-één, 45 minuten, volledig om jou heen gebouwd. Ook hoe we trainen tijdens zwangerschap.',
      couples: 'Train met een partner of vriend, één coach voor jullie twee. Prijzen per persoon.',
    },
    levelsAria: 'Coachniveau',
    levels: {
      master: 'Master coach',
      senior: 'Senior coach',
      junior: 'Coach',
    },
    levelNotes: {
      master: 'Elif Arzu Ogan — eigenaar en hoofdcoach, 15+ jaar.',
      senior: 'Gökben Öztekin, Göknur Dipli.',
      junior: 'Gülce Koç, Lal Avgen, Nisan Atalay, Kelly Tin, E. Gamze Karadağ.',
    },
    membership: {
      four: '4 lessen per maand',
      eight: '8 lessen per maand',
      unlimited: 'Onbeperkt',
      annual: 'Onbeperkt jaar',
      fourPer: '€21,50 per les',
      eightPer: '€20 per les',
      unlimitedPer: 'Onbeperkt lessen',
      annualPer: '€3.000 per jaar',
      monthlyPoint1: 'Maandelijks, verlengt automatisch',
      monthlyPoint2: 'Opzeggen na de eerste maand',
      unlimitedPoint1: '3 maanden verplichting',
      unlimitedPoint2: 'Daarna maandelijks verlengd',
      annualPoint1: '12 maanden verplichting',
      annualPoint2: 'Inclusief 4 weken pauze',
    },
    pack: {
      single: 'Losse les',
      five: '5 lessen',
      ten: '10 lessen',
      twenty: '20 lessen',
      singlePer: '€37 per les',
      fivePer: '€35 per les',
      tenPer: '€30 per les',
      twentyPer: '€28 per les',
    },
    couple: {
      singlePer: 'per persoon',
      fivePer: '€45 per persoon, per les',
      tenPer: '€43 per persoon, per les',
      twentyPer: '€40 per persoon, per les',
    },
    private: {
      single: 'Losse sessie',
      five: '5 sessies',
      ten: '10 sessies',
      twenty: '20 sessies',
      perSession: '{{amount}} per sessie',
      oneOnOne: '45 min, één-op-één',
    },
    validity: {
      weeks1: 'Geldig 1 week',
      weeks5: 'Geldig 5 weken',
      weeks10: 'Geldig 10 weken',
      weeks20: 'Geldig 20 weken',
    },
  },
  labels: {
    mostPopular: 'Meest populair',
    bestValue: 'Beste waarde',
    buy: 'Kopen',
    startMembership: 'Start abonnement',
    perMonth: ' / maand',
  },
  facts: {
    minutes: { title: '45 minuten', body: 'Elke les, elke lane.' },
    size: { title: 'Tot 10 mensen', body: 'Kleine groepen zodat je coach elke herhaling ziet.' },
    lanes: {
      title: 'Alle zeven lanes',
      body: 'Abonnementen en strippenkaarten gelden voor Reformer, yoga, mat en kracht.',
    },
    coach: {
      title: 'Een coach op de vloer',
      body: 'Correcties, progressies en een plan — in elke les.',
    },
  },
  faq: {
    titleBefore: 'Goed om',
    titleAccent: 'te weten.',
    lead: 'Nog niet zeker welke optie past? App ons en een coach helpt je kiezen.',
    whatsapp: 'WhatsApp ons',
    vat: 'Alle prijzen inclusief btw.',
    items: {
      validity: {
        question: 'Hoe werkt de geldigheid van strippenkaarten?',
        answer:
          'Een strippenkaart is evenveel weken geldig als lessen, vanaf de aankoopdag. Een 5-lessenkaart loopt 5 weken; een 20-lessenkaart 20 weken.',
      },
      cancel: {
        question: 'Hoe zeg ik een abonnement op?',
        answer:
          'Abonnementen verlengen automatisch. Zeg op vóór de verlengingsdatum via info@pt7.nl of +31 685 162693, na de minimale periode van je plan.',
      },
      freeze: {
        question: 'Kan ik mijn abonnement pauzeren?',
        answer:
          'Het jaarlijkse onbeperkte abonnement bevat 4 weken pauze. Vraag ons naar andere plannen.',
      },
      pregnancy: {
        question: 'Ik ben zwanger. Mag ik groepslessen?',
        answer:
          'Tijdens zwangerschap trainen we alleen één-op-één, zodat je coach elke oefening veilig kan aanpassen. Zie het tabblad Privé.',
      },
      injuries: {
        question: 'Ik heb een blessure. Is dat een probleem?',
        answer:
          'Laat het ons vóór het boeken weten. Onze coaches passen oefeningen aan; privésessies zijn een goede manier om terug te komen.',
      },
      levels: {
        question: 'Wat is het verschil tussen coachniveaus?',
        answer:
          'Privésessies zijn geprijsd op ervaring: master coach (Elif), senior coaches en coaches. Elke coach is gecertificeerd en getraind in de PT7-methode.',
      },
    },
  },
  faqSeoOnly: {
    cost: {
      question: 'Hoeveel kosten pilateslessen in Amsterdam?',
      answer:
        'Groepslessen beginnen vanaf {{groupPerClass}} per les bij een 20-lessenkaart ({{groupTotal}} totaal). Losse groepslessen kosten {{groupSingle}}. Privésessies beginnen vanaf {{juniorSingle}}. Alle pakketten staan op deze pagina.',
    },
    intro: {
      question: 'Is er een introductieaanbieding voor nieuwe klanten?',
      answer:
        'Ja. Nieuwe klanten kunnen starten met ons introductiepakket: {{classes}} groepslessen voor {{price}} (alleen voor nieuwe klanten).',
    },
  },
};
