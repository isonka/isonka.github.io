import type { DeepStringify } from '../../locale';
import type { EnHome } from '../en/home';

export const nlHome: DeepStringify<EnHome> = {
  seo: {
    title: 'PT 7 (PT Studio 7) | Pilates, yoga & kracht Amsterdam',
    description:
      'PT 7 (voorheen PT Studio 7): pilates, yoga en kracht op Olympisch Stadion 15, Amsterdam. Kleine lessen tot 10. Intro: 3 lessen €50.',
    keywords:
      'PT 7, PT 7 Pilates, pilates Amsterdam, Reformer pilates Amsterdam, yoga Amsterdam, krachttraining Amsterdam, Olympisch Stadion pilates, private pilates Amsterdam, prenatale pilates Amsterdam, TRX Amsterdam',
    ogTitle: 'PT 7 (PT Studio 7) | Find your lane · Olympisch Stadion',
    ogDescription:
      'Zeven manieren om te trainen op het Olympisch Stadion: Reformer, yoga, kracht, mat, TRX, prenataal en privé. Online boeken.',
    analyticsTitle: 'Home - PT 7 Pilates Amsterdam',
  },
  banner: {
    strong: 'Word pilatesinstructeur',
    full: ' · Pilates docentenopleiding · PMA ITTAP Approved · Volgende: nov 2026',
    short: ' · Docentenopleiding · Volgende: nov 2026',
    cta: 'Bekijk de opleiding',
  },
  openingBanner: {
    label: 'Studio',
    text: 'PT 7 traint op Olympisch Stadion 15, Amsterdam.',
    cta: 'Bezoek',
  },
  hero: {
    eyebrow: 'Pilates · Yoga · Kracht — Olympisch Stadion, Amsterdam',
    titleBefore: 'Find your',
    titleAccent: 'lane.',
    lead:
      'Zeven manieren om te trainen, één coach naast je. Reformer- en matpilates, yoga, kracht en privé — in kleine lessen tot tien.',
    bookFirst: 'Boek je eerste les',
    explore: 'Bekijk lessen',
  },
  facts: {
    aria: 'In één oogopslag',
    items: {
      ways: { value: '7', label: 'manieren om te trainen' },
      size: { value: '≤10', label: 'mensen per les' },
      minutes: { value: '45', label: 'minuten per les' },
      coach: { value: '1', label: 'coach op de vloer' },
    },
  },
  lanes: {
    titleBefore: 'Zeven lanes,',
    titleAccent: 'één plan.',
    sub: 'Pilates is waar we begonnen. Mix lanes door de week — je coach zorgt dat ze bij elkaar passen.',
    seeTimes: 'Bekijk tijden',
    laneLabel: 'Lane {{n}}',
    formatLabel: 'Format',
    kitLabel: 'Apparatuur',
    items: {
      reformer: {
        name: 'Reformer',
        tag: 'Pilates',
        pitch:
          'Veren, straps en een coach die je houding corrigeert voordat die verschuift. Waar PT7 begon.',
        format: 'Groep · 45 min',
        kit: 'Reformer, trapeze table',
      },
      strength: {
        name: 'Kracht',
        tag: 'Strength',
        pitch:
          'Squat, hinge, press en pull, zorgvuldig gecoacht. Zwaar genoeg om te tellen, schoon genoeg om te blijven.',
        format: 'Small group',
        kit: 'Rack, barbell, dumbbells',
      },
      yoga: {
        name: 'Yoga',
        tag: 'Yoga',
        pitch: 'Flow, houding en adem. De lane die elke andere lane makkelijker maakt.',
        format: 'Groep · max 8',
        kit: 'Mat, blokken, straps',
      },
      mat: {
        name: 'Matpilates',
        tag: 'Pilates',
        pitch: 'Klassieke pilates op de vloer. Geen machine om op te leunen — jij en je centrum.',
        format: 'Groep · max 8',
        kit: 'Mat, kleine props',
      },
      trx: {
        name: 'TRX & cardio',
        tag: 'Strength',
        pitch: 'Suspension en rower-intervallen voor het uithoudingsvermogen dat bij je core past.',
        format: 'Small group',
        kit: 'TRX, Concept2',
      },
      prenatal: {
        name: 'Pre- & postnataal',
        tag: 'Private',
        pitch: 'Één-op-één training door elk trimester en de maanden erna.',
        format: '1:1',
        kit: 'Reformer + mat',
      },
      private: {
        name: 'Privé',
        tag: 'Private',
        pitch:
          'Één coach, elke discipline. Een plan rond jouw doel, blessure of volgende race.',
        format: '1:1 · 55 min',
        kit: 'Wat nodig is',
      },
    },
  },
  coaches: {
    titleBefore: 'Ontmoet je',
    titleAccent: 'coaches.',
    sub: 'Pilatesdocenten, yogadocenten en krachtcoaches. Zij zetten het tempo, tellen de herhalingen en vangen degene die je oversloeg.',
    tags: {
      pilates: 'Pilates',
      pilatesStrength: 'Pilates · Kracht',
    },
    roles: {
      elif: 'Hoofdcoach, kracht, prenataal, comeback',
      gokben: 'Comprehensive pilates',
      goknur: 'Kracht en prenataal',
      gulce: 'Reformer',
      lal: 'Reformer',
      nisan: 'Reformer',
      kelly: 'Reformer',
      gamze: 'Reformer',
    },
    alt: {
      elif: 'Elif Arzu Ogan — coach bij PT 7',
      gokben: 'Gökben Öztekin — coach bij PT 7',
      goknur: 'Göknur Dipli — coach bij PT 7',
      gulce: 'Gülce Koç — coach bij PT 7',
      lal: 'Lal Avgen — coach bij PT 7',
      nisan: 'Nisan Atalay — coach bij PT 7',
      kelly: 'Kelly Tin — coach bij PT 7',
      gamze: 'E. Gamze Karadağ — coach bij PT 7',
    },
  },
  offer: {
    titleBefore: 'Nieuw hier?',
    titleAccent: 'Begin met drie.',
    lead: 'Drie groepslessen om lanes te proberen — Reformer, yoga, kracht — of dezelfde drie keer.',
    label: 'Intro-aanbieding',
    product: '3 groepslessen',
    detail: 'Elke lane · voor nieuwe leden',
    price: '€50',
    cta: 'Claim aanbieding',
  },
  academy: {
    titleBefore: 'Word',
    titleAccent: 'pilatesdocent.',
    lead: 'Een PMA ITTAP-goedgekeurd instructeursprogramma, gegeven in de studio door de coaches met wie je traint.',
    nextLabel: 'Volgende cohort',
    nextDate: 'November 2026',
    seats: '3 plekken open',
    cta: 'Solliciteer voor een plek',
  },
  reviews: {
    titleBefore: 'In hun',
    titleAccent: 'woorden.',
    ratings: '4,9 op ClassPass · 4,8 op Google',
    items: {
      lot: {
        quote: 'Elif trainde me tot 38,5 weken. Comfortabele zwangerschap en soepele bevalling.',
        name: 'Lot',
        source: 'Google',
      },
      flaminia: {
        quote:
          'Professioneel, doordacht — precies de Reformer-studio waar ik twee jaar naar zocht.',
        name: 'Flaminia',
        source: 'Google',
      },
      yesim: {
        quote: 'Zes maanden verder. Indrukwekkende resultaten en een motiverende sfeer.',
        name: 'Yeşim',
        source: 'ClassPass',
      },
    },
  },
  visit: {
    eyebrow: 'De locatie',
    titleBefore: 'Waar de eerste',
    titleAccent: 'vlam',
    titleAfter: 'brandde.',
    story:
      'In 1928 organiseerde Amsterdam de Spelen, en voor het eerst brandde een olympische vlam — in een schaal bovenop de Marathontoren. Het stadion werd gebouwd voor olympiërs. PT7 traint nu in unit 15, in de linker bovenhoek.',
    address: 'Olympisch Stadion 15, 1076 DE Amsterdam',
    transit: 'Tram 24 · fietsenrekken bij de deur',
    mapAria: 'Lijnkaart van het stadion: PT7 in de linker bovenhoek, de Marathontoren bovenaan',
  },
  faqs: {
    where: {
      question: 'Waar kan ik pilateslessen volgen in Amsterdam?',
      answer:
        'PT 7 biedt Reformer pilates, yoga, kracht, TRX en privé op Olympisch Stadion 15, 1076 DE Amsterdam. Boek groepsles (tot 10) of privé online via pt7.nl/schedule/.',
    },
    groupSize: {
      question: 'Hoeveel mensen zitten er in een pilates groepsles?',
      answer:
        'Groepslessen hebben tot 10 deelnemers (yoga en matpilates max. 8), zodat instructeurs techniek persoonlijk kunnen begeleiden.',
    },
    booking: {
      question: 'Hoe boek ik een les bij PT 7?',
      answer:
        'Gebruik het online rooster voor een groepsles of private afspraak. Nieuwe klanten starten met 3 groepslessen voor €50. Pakketten staan op de prijzenpagina.',
    },
    training: {
      question: 'Welke training biedt PT 7?',
      answer:
        'Zeven lanes: Reformer, kracht, yoga, matpilates, TRX & cardio, pre- & postnataal, en privé. Instructeursopleiding via PT7 Academy.',
    },
    location: {
      question: 'Waar zit PT 7?',
      answer:
        'Olympisch Stadion 15, 1076 DE Amsterdam — unit 15 in de linker bovenhoek van het stadion. Tram 24; fietsenrekken bij de deur.',
    },
  },
};
