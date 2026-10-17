import type { DeepStringify } from '../../locale';
import type { EnHome } from '../en/home';

export const nlHome: DeepStringify<EnHome> = {
  banner: {
    strong: 'Word pilatesinstructeur',
    full: ' · Pilates docentenopleiding · PMA ITTAP Approved · Volgende: nov 2026',
    short: ' · Docentenopleiding · Volgende: nov 2026',
    cta: 'Bekijk de opleiding →',
  },
  openingBanner: {
    label: 'Studio',
    text: 'PT 7 traint op Olympisch Stadion 15, Amsterdam.',
    cta: 'Vind ons',
  },
  seo: {
    title: 'PT 7 (PT Studio 7) | Pilates & Krachttraining Amsterdam',
    description:
      'PT 7 (voorheen PT Studio 7): boutique pilates & kracht op Olympisch Stadion 15, Amsterdam. Max. 10 per les. Intro: 3 lessen €50.',
    keywords:
      'PT 7, PT 7 Pilates, pilates Amsterdam, Reformer pilates Amsterdam, Olympisch Stadion pilates, TRX Amsterdam, private pilates Amsterdam',
    ogTitle: 'PT 7 | Vind je baan · Olympisch Stadion',
    ogDescription:
      'Reformer pilates, yoga, kracht, TRX en privé op Olympisch Stadion 15. Kleine groepen, een coach op de vloer.',
    analyticsTitle: 'Home - PT 7 Pilates Amsterdam',
  },
  hero: {
    eyebrow: 'Pilates · Yoga · Strength studio · Amsterdam',
    titleLine1: 'Vind je',
    titleAccent: 'baan.',
    lead:
      'Zeven manieren om te trainen, één coach naast je bij elke herhaling. Reformer en mat pilates, yoga, strength, TRX en privé — in het Olympisch Stadion.',
    ctaPrimary: 'Kies je baan',
    ctaSecondary: 'Eerste keer',
  },
  scoreboard: {
    aria: 'Hoe het werkt',
    lanes: 'Banen',
    perClass: 'Per les',
    minutes: 'Minuten',
    coach: 'Coach op de vloer',
  },
  lanes: {
    titleLine1: 'Zeven banen.',
    titleAccent: 'finish.',
    titleMid: 'Eén',
    lead:
      'Pilates is waar we begonnen. Niet waar we stoppen. Mix banen in één week — je coach plant hoe ze passen.',
    format: 'Format',
    kit: 'Kit',
    start: 'Start baan {{n}}',
    items: {
      reformer: {
        name: 'Reformer',
        tag: 'Pilates',
        eyebrow: 'Baan 1 · Pilates',
        body: 'Veren, straps en een coach die je heupen corrigeert voor je het merkt. Waar PT7 begon.',
        format: 'Groep · 45 min',
        kit: 'Reformer, trapeze table',
        accent: 'gold',
      },
      barbell: {
        name: 'Strength',
        tag: 'Strength',
        eyebrow: 'Baan 2 · Strength',
        body: 'Squat, hinge, press en pull, zorgvuldig gecoacht. Zwaar genoeg om te tellen, schoon genoeg om te blijven.',
        format: 'Kleine groep',
        kit: 'Rack, barbell, dumbbells',
        accent: 'strength',
      },
      yoga: {
        name: 'Yoga',
        tag: 'Yoga',
        eyebrow: 'Baan 3 · Yoga',
        body: 'Flow, houden en ademen. De baan die elke andere baan makkelijker maakt.',
        format: 'Groep · max 8',
        kit: 'Mat, blocks, straps',
        accent: 'yoga',
      },
      mat: {
        name: 'Mat Pilates',
        tag: 'Pilates',
        eyebrow: 'Baan 4 · Pilates',
        body: 'Klassieke pilates op de vloer. Geen machine om op te leunen — jij en je centrum.',
        format: 'Groep · max 8',
        kit: 'Mat, small props',
        accent: 'gold',
      },
      trx: {
        name: 'TRX & cardio',
        tag: 'Strength',
        eyebrow: 'Baan 5 · Strength',
        body: 'Suspension en rower-intervallen voor uithoudingsvermogen dat bij je core past.',
        format: 'Kleine groep',
        kit: 'TRX, Concept2',
        accent: 'strength',
      },
      bump: {
        name: 'Pre- & postnataal',
        tag: 'Private',
        eyebrow: 'Baan 6 · Private',
        body: 'One-on-one door elk trimester en de maanden erna.',
        format: '1:1',
        kit: 'Reformer + mat',
        accent: 'cream',
      },
      private: {
        name: 'Privé',
        tag: 'Private',
        eyebrow: 'Baan 7 · Private',
        body: 'Eén coach, elke discipline. Een plan rond jouw doel, blessure of volgende race.',
        format: '1:1 · 55 min',
        kit: 'Wat nodig is',
        accent: 'cream',
      },
    },
  },
  coaches: {
    titleLine1: 'Ontmoet je',
    titleAccent: 'coaches.',
    lead: 'Pilatesdocenten, yogadocenten en strength coaches — op de vloer bij elke les.',
    roles: {
      elif: 'Head coach. Strength, prenataal, comeback.',
      goknur: 'Strength en prenataal',
      gokben: 'Comprehensive Pilates',
      gulce: 'Reformer',
      lal: 'Reformer',
      nisan: 'Reformer',
      kelly: 'Reformer',
      gamze: 'Reformer',
    },
    eyebrows: {
      elif: 'Pilates · Strength',
      goknur: 'Pilates · Strength',
      gokben: 'Pilates',
      gulce: 'Pilates',
      lal: 'Pilates',
      nisan: 'Pilates',
      kelly: 'Pilates',
      gamze: 'Pilates',
    },
  },
  ticket: {
    titleLine1: 'Eerste keer?',
    titleAccent: 'Je hoort erbij.',
    lead: 'Eén entry-ticket, drie groepsessies. Elke baan — reformer maandag, yoga woensdag, of drie keer dezelfde.',
    admit: 'Admit one',
    place: 'Olympisch Stadion 15',
    big: '3 sessies',
    sub: 'Elke baan · groep · nieuwe leden',
    stubLabel: 'Entry',
    cta: 'Claim het',
  },
  academy: {
    approved: 'PMA ITTAP approved',
    titleLine1: 'Van de tribune',
    titleLine2: 'naar het veld.',
    body: 'Docentenopleiding die je op de vloer zet, niet in een collegezaal. Volgende cohort in het Olympisch Stadion.',
    next: 'Volgende cohort',
    date: 'Nov 2026',
    seats: '3 plaatsen vrij',
    cta: 'Solliciteer',
  },
  reviews: {
    items: {
      flaminia: {
        pull: '“Professioneel, doordacht. Precies de Reformer-studio waar ik twee jaar naar zocht.”',
        author: 'Flaminia',
        meta: 'Google review',
      },
    },
  },
  results: {
    title: 'Resultaten.',
    ratings: '4.8 Google · 33 reviews',
    items: {
      fatih: {
        quote: 'Elif, Göknur en Gökben — topcoaches. Probeer het zeker',
        by: 'Fatih · Google review',
      },
      irmina: {
        quote: 'Steunende sfeer, attente coaches — de beste reformer-studio in Amsterdam',
        by: 'Irmina · Google review',
      },
      gizem: {
        quote: 'Elke les met Göknur is gestructureerd, uitdagend en leuk',
        by: 'Gizem · Google review',
      },
      flaminia: {
        quote: 'Twee jaar gezocht — eindelijk de juiste studio',
        by: 'Flaminia · Google review',
      },
      lot: {
        quote: 'Getraind door de zwangerschap en sterker terug',
        by: 'Lot · Google review',
      },
      maya: {
        quote: 'Sterker, meer in balans, nog steeds lachen',
        by: 'Maya · Google review',
      },
      ayse: {
        quote: 'Rustige studio — coaches die elke beweging met zorg begeleiden',
        by: 'Ayşe · Google review',
      },
    },
  },
  venue: {
    titleLine1: 'Waar de',
    titleLine2: 'eerste',
    titleAccent: 'vlam',
    titleLine3: 'brandde.',
    body: '1928: Amsterdam organiseert de Spelen en voor het eerst brandt een olympische vlam — in een schaal op de Marathon Tower. Het stadion was voor olympiërs. Bijna een eeuw later traint PT7 in hetzelfde stadion — unit 15, linkerbovenhoek.',
    address: 'Olympisch Stadion 15',
    city: '1076 DE Amsterdam',
    transit: 'Tram 24 · Fietsenrekken bij de deur',
    mapAria: 'Kaart van het stadion met PT7 gemarkeerd',
  },
  faq: {
    where: {
      q: 'Waar is PT 7?',
      a: 'Olympisch Stadion 15, 1076 DE Amsterdam — unit 15 in de linkerbovenhoek van het stadion.',
    },
    groupSize: {
      q: 'Hoe groot zijn de lessen?',
      a: 'Groepslessen max. {{groupMax}} zodat je coach elke herhaling kan coachen.',
    },
    booking: {
      q: 'Hoe boek ik?',
      a: 'Koop het intro-ticket of een plan online, boek daarna lessen in het rooster.',
    },
    training: {
      q: 'Wat kan ik trainen?',
      a: 'Zeven banen: Reformer, Strength, Yoga, Mat Pilates, TRX & cardio, Pre- & postnataal, en Privé.',
    },
    location: {
      q: 'Is er parkeren?',
      a: 'Fietsenrekken bij de deur; tram 24 in de buurt. Betaald parkeren rond het stadion.',
    },
  },
};
