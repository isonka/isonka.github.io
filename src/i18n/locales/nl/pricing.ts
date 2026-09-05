import type { DeepStringify } from '../../locale';
import type { EnPricing } from '../en/pricing';

export const nlPricing: DeepStringify<EnPricing> = {
  seo: {
    title: 'Pilates lesprijzen Amsterdam | Pakketten & abonnementen | PT Studio 7',
    description:
      'Pilates lesprijzen in Amsterdam aan het Museumplein. Kleine groepslessen (max. {{groupMax}}) vanaf {{groupPrice}}/les, abonnementen en privésessies. Reformer, TRX & krachttraining.',
    keywords:
      'pilates lesprijzen amsterdam, pilates prijzen amsterdam, Pilates prijzen Amsterdam, Pilates abonnement Amsterdam, Pilates prijzen Museumplein, reformer pilates prive amsterdam, kleine groep pilates amsterdam, private Pilates kosten, proefles Pilates Amsterdam, strippenkaart Pilates',
    ogTitle: 'Pilates lesprijzen Amsterdam | PT Studio 7 Museumplein',
    ogDescription:
      'Pilates lesprijzen in Amsterdam: kleine groepen (max. {{groupMax}}) vanaf {{groupPrice}}/les. Abonnementen en privésessies aan het Museumplein.',
    analyticsTitle: 'Pilates lesprijzen Amsterdam | PT Studio 7',
  },
  breadcrumbName: 'Pilates lesprijzen Amsterdam',
  hero: {
    kicker: 'Prijzen',
    title: 'Pilateslesprijzen & abonnementen in Amsterdam',
    lead: 'Kleine groepen (max. {{groupMax}}), abonnementen en private sessies aan het Museumplein. Klaar om te boeken? <schedule>Bekijk het lesrooster</schedule>.',
  },
  offer: {
    badge: 'Speciale aanbieding',
    title: 'Introductiepakket',
    description: 'Alleen voor nieuwe klanten: {{classes}} groepslessen voor {{price}}',
  },
  nav: {
    aria: 'Prijzensecties',
    membership: 'Abonnement',
    group: 'Groep',
    private: 'Privé',
    couple: 'Duo',
    trio: 'Trio',
  },
  labels: {
    perClass: 'per les',
    perPerson: 'per persoon',
    perMonth: 'per maand',
    inTotal: '{{amount}} in totaal',
    mostPopular: 'Meest populair',
    bestValue: 'Beste waarde',
    singleClass: 'Losse les',
    classPack: '{{count}}-lessenkaart',
    validFor_one: 'Geldig voor {{count}} week',
    validFor_other: 'Geldig voor {{count}} weken',
    allDaysOneClass: 'Alle dagen • 1 les/dag',
    buyNow: 'Nu kopen',
  },
  membership: {
    kicker: 'Abonnement',
    title: 'Abonnementen',
    subtitle: 'Geldig alle dagen • Maximaal 1 les per dag',
    classesInMonth: '{{count}} lessen in 1 maand',
    monthlyFineprint:
      '1-maands periode • Opzeggen kan na de eerste maand • Wordt maandelijks automatisch verlengd tenzij opgezegd',
    unlimited3Name: 'Onbeperkt 3 maanden',
    unlimitedClasses: 'Onbeperkt lessen',
    unlimited3Fineprint:
      '3 maanden verplichting • Opzeggen kan na 3 maanden • Wordt automatisch verlengd tenzij opgezegd',
    annualName: 'Jaarlijks onbeperkt',
    annualTotalNote: '{{yearTotal}}/jaar • Inclusief 4 weken pauzeoptie',
    annualFineprint:
      '12 maanden verplichting • Opzeggen kan na 12 maanden • Wordt automatisch verlengd tenzij opgezegd',
  },
  group: {
    kicker: 'Groep',
    title: 'Kleine groepslessen',
    subtitle:
      'Kleinschalige groepstraining met maximaal {{groupMax}} deelnemers. Deskundige begeleiding in een energieke omgeving. Sessies van {{minutes}} minuten.',
  },
  private: {
    kicker: 'Privé',
    title: 'Privélessen',
    subtitle:
      'Persoonlijke 1-op-1 training afgestemd op jouw doelen en fitnessniveau. Kies je instructeurniveau. Lessen van {{minutes}} minuten.',
    tabsAria: 'Instructeurniveau',
    master: 'Master-instructeur',
    senior: 'Senior instructeur',
    junior: 'Junior instructeur',
    juniorInfoLabel: 'Junior instructeurs:',
    seniorInfoLabel: 'Senior instructeurs:',
    masterInfoLabel: 'Master-instructeur:',
    masterRole: 'eigenaar & hoofdinstructeur met 15+ jaar ervaring',
  },
  couple: {
    kicker: 'Duo',
    title: 'Duo-lessen',
    subtitle:
      'Train samen met je partner. Deel de ervaring en motiveer elkaar. Prijs per persoon. Lessen van {{minutes}} minuten.',
  },
  trio: {
    kicker: 'Trio',
    title: 'Trio-lessen',
    subtitle:
      'Train met twee vrienden of familieleden. Perfect voor kleine groepen die persoonlijke aandacht willen. Prijs per persoon. Lessen van {{minutes}} minuten.',
  },
  info: {
    kicker: 'Studio',
    title: 'Wat neem je mee',
    clothing: {
      title: 'Comfortabele kleding',
      text: 'Draag comfortabele sportkleding waarin je vrij kunt bewegen. We raden sportkleding aan die niet te los zit.',
    },
    socks: {
      title: 'Antislipsokken',
      text: 'Antislipsokken worden aangeraden voor alle lessen. Heb je ze nog niet? Je kunt antislipsokken kopen bij onze studio.',
    },
    water: {
      title: 'Waterfles',
      text: 'Blijf gehydrateerd! Neem je waterfles mee om verfrist te blijven tijdens je les van {{minutes}} minuten.',
    },
    towel: {
      title: 'Handdoek (aanbevolen)',
      text: 'We raden aan een kleine handdoek mee te nemen voor je comfort, al is dit niet verplicht.',
    },
  },
  faq: {
    kicker: 'FAQ',
    title: 'Vragen voor je boekt',
    validity: {
      question: 'Hoe lang zijn de pakketten geldig?',
      answer:
        'Elk pakket heeft een geldigheidsperiode in weken gelijk aan het aantal lessen. Een 5-lessenpakket is bijvoorbeeld 5 weken geldig vanaf de aankoopdatum.',
    },
    pregnancy: {
      question: 'Kan ik meedoen tijdens mijn zwangerschap?',
      answer:
        'Zwangere klanten worden alleen toegelaten voor 1-op-1 lessen, zodat we persoonlijke aandacht kunnen bieden om de veiligheid te waarborgen.',
    },
    injuries: {
      question: 'Wat als ik blessures heb?',
      answer:
        'Laat het ons vóór het boeken weten als je blessures of gewrichtsklachten hebt. Onze trainers kunnen oefeningen aanpassen aan jouw behoeften.',
    },
    tryBefore: {
      question: 'Kan ik het uitproberen voordat ik een pakket koop?',
      answer:
        'Ja! We bieden losse lessen aan voor alle trainingsvormen en raden aan om te starten met een kleiner pakket om onze lessen uit te proberen.',
    },
    renewals: {
      question: 'Hoe werkt de verlenging van abonnementen?',
      answer:
        '1-maands abonnementen (4 & 8 lessen): 1 maand periode. Je kunt opzeggen na de eerste maand. Wordt maandelijks automatisch verlengd tenzij opgezegd. 3-maands abonnement: 3 maanden verplichting. Je kunt opzeggen na 3 maanden. Wordt automatisch verlengd tenzij opgezegd. Jaarabonnement: 12 maanden verplichting. Je kunt opzeggen na 12 maanden. Wordt automatisch verlengd tenzij opgezegd. Als je niet opzegt vóór de verlengingsdatum, worden betalingen automatisch verwerkt.',
    },
    cancel: {
      question: 'Kan ik mijn abonnement opzeggen?',
      answer:
        'Ja! Bij 1-maands abonnementen (4 & 8 lessen) heb je het recht om op te zeggen na de eerste maand. De 3-maands en jaarabonnementen kunnen worden opgezegd na afloop van de initiële verplichtingsperiode (3 of 12 maanden). Om op te zeggen, neem contact met ons op via info@pt7.nl of bel +31 685 162693 vóór je verlengingsdatum.',
    },
    annualUnlimited: {
      question: 'Is het jaarabonnement onbeperkt?',
      answer:
        'Ja! Het jaarabonnement voor {{perMonth}} per maand ({{yearTotal}} voor 12 maanden totaal) geeft je onbeperkt toegang tot lessen (alle dagen, 7:00-18:00), met een maximum van 1 les per dag. Dit is onze voordeligste optie en bevat een pauzeoptie van 4 weken.',
    },
    duration: {
      question: 'Hoe lang duurt een les?',
      answer:
        'Al onze lessen duren {{minutes}} minuten, voor een effectieve en efficiënte workout die past in je drukke schema.',
    },
    groupSize: {
      question: 'Hoeveel mensen zitten er in een groepsles?',
      answer:
        'Onze groepslessen hebben een maximum van {{groupMax}} deelnemers, zodat je persoonlijke aandacht krijgt terwijl je geniet van de energie van een groep.',
    },
  },
  faqSeoOnly: {
    cost: {
      question: 'Hoeveel kosten pilateslessen in Amsterdam?',
      answer:
        'Groepslessen Reformer pilates beginnen vanaf {{groupPerClass}} per les bij een 20-lessenkaart ({{groupTotal}} totaal). Losse groepslessen kosten {{groupSingle}}. Privésessies beginnen vanaf {{juniorSingle}}. Alle pakketten staan op deze pagina.',
    },
    intro: {
      question: 'Is er een introductieaanbieding voor nieuwe klanten?',
      answer:
        'Ja. Nieuwe klanten kunnen starten met ons introductiepakket: {{classes}} groepslessen voor {{price}} (alleen voor nieuwe klanten).',
    },
  },
  contact: {
    kicker: 'Contact',
    title: 'Hulp nodig?',
    text: 'Mail of bel ons voor advies over pakketten en abonnementen.',
    emailUs: 'Mail ons',
    call: 'Bel: {{phone}}',
  },
};
