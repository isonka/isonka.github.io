import { trainerProfiles, type TrainerProfile } from './trainers.ts';

type TrainerText = Pick<
  TrainerProfile,
  'title' | 'heroTitle' | 'languages' | 'specialties' | 'seo' | 'structuredData' | 'bio' | 'qualifications' | 'ctaText'
>;

const nlText: Record<string, TrainerText> = {
  elif: {
    title: 'Comprehensive Pilates\nKrachttraining\nPrenatale pilates',
    heroTitle: 'Eigenaar & hoofdinstructeur',
    languages: ['Engels', 'Turks'],
    specialties: ['Reformer pilates', 'TRX', 'Krachttraining'],
    seo: {
      title: 'Elif Arzu Ogan | Pilatesinstructeur bij PT 7 Amsterdam',
      description:
        'Maak kennis met Elif Arzu Ogan, ervaren pilates- en functioneel trainingsinstructeur bij PT 7 Amsterdam. Boek vandaag je persoonlijke sessie.',
      keywords: 'Elif Arzu Ogan, pilates instructeur Amsterdam, pilates leraar Amsterdam, functionele training, PT 7',
    },
    structuredData: {
      jobTitle: 'Eigenaar & hoofdinstructeur pilates',
      description:
        'Oprichter en hoofdinstructeur van PT 7 met meer dan 15 jaar ervaring. Senior Polestar Pilates-instructeur, TRX- en krachttrainingsinstructeur.',
    },
    bio: [
      'Elif is de oprichter en hoofdinstructeur van PT 7, dat ze in 2010 opzette. Sinds de oprichting van de studio combineert ze haar werk als instructeur met het ondernemerschap. Met meer dan 15 jaar ervaring is ze Senior Polestar Pilates-instructeur, PMA-geregistreerd instructeur (Pilates Method Alliance), Miha BodyTec EMS Advance Trainer en TRX- en krachttrainingsinstructeur. Elif heeft een bachelor in bedrijfskunde van de Hacettepe Universiteit. Ze begon haar sportcarrière in de atletiek, ging verder met zwemmen en speelde basketbal bij verschillende clubs. Ze helpt cliënten graag hun doelen te bereiken met persoonlijke, aandachtige training en een holistische kijk op gezondheid en fitheid.',
    ],
    qualifications: [
      'Senior Polestar Pilates-instructeur',
      'PMA-geregistreerd pilatesdocent | Pilates Method Alliance (ITTAP-goedgekeurde Reformer Pilates-instructeurscursus)',
      'Miha BodyTec EMS Advance Trainer',
      'TRX- en krachttrainingsinstructeur',
      'Meer dan 15 jaar ervaring als pilatesinstructeur',
      'Gespecialiseerd in programma’s op maat voor alle leeftijden en niveaus',
      'Pilates bij scoliose en wervelkolomaandoeningen – Polestar Pilates, online',
      'Workshop pilates tijdens en na de zwangerschap – Polestar Pilates, online',
      'Gecertificeerd Polestar Pilates-trainer – Polestar Pilates, İstanbul',
      'De wetenschap van gezond bewegen met de wervelkolom – Polestar Pilates met Brent Anderson, İstanbul',
      'Pilates voor de onderrug – Polestar Pilates en Brent Anderson, İstanbul',
      '4dpro Bungee Fitness-trainer – 4dpro Bungee Fitness, İzmir',
      'Miha bodytec Advance EMS-trainer – Miha bodytec, İstanbul',
      'Reformer Pilates-trainer – Seam Academy, İstanbul',
      'Workshop plyometrische training en spiercontractie – Seam Academy, İstanbul',
      'Kinesis-trainer – Technogym Wellness Institute, İstanbul',
      'Workshop pilates tijdens de zwangerschap – Pilatesystem, Ankara',
      'Pilatesinstructeur – Turkse Gymnastiekfederatie, İzmir',
      'Zumba-basistrainer – Zumba, İstanbul',
      'TRX Suspension Training-trainer – TRX, İstanbul',
      'Wellnesstrainer – Turkse federatie Sport voor Iedereen, İzmir',
    ],
    ctaText: 'Boek een sessie met Elif en ervaar persoonlijke training op z’n best.',
  },
  goknur: {
    title: 'Comprehensive Pilates\nKrachttraining\nPrenatale pilates',
    heroTitle: 'Comprehensive Pilates\nKrachttraining\nPrenatale pilates',
    languages: ['Engels', 'Turks'],
    specialties: ['Reformer pilates', 'Matpilates', 'Revalidatie'],
    seo: {
      title: 'Göknur Dipli | Pilatesinstructeur bij PT 7 Amsterdam',
      description:
        'Maak kennis met Göknur Dipli, ervaren pilates- en functioneel trainingsinstructeur bij PT 7 Amsterdam. Holistische aanpak van fitheid en welzijn.',
      keywords: 'Göknur Dipli, pilates instructeur Amsterdam, pilates leraar Amsterdam, PT 7, personal trainer één-op-één',
    },
    structuredData: {
      jobTitle: 'Instructeur Comprehensive Pilates & krachttraining',
      description:
        'Ervaren pilates- en krachttrainingsinstructeur met een holistische aanpak van fitheid en welzijn bij PT 7 Amsterdam.',
    },
    bio: [
      'Göknur is Senior Polestar Pilates-instructeur en Miha BodyTec EMS Advance Trainer. Ze heeft veel ervaring met functionele training en zet zich in om cliënten met deskundige begeleiding en motivatie het beste uit zichzelf te laten halen. In 2016 studeerde ze af aan de Balıkesir Universiteit, faculteit Lichamelijke Opvoeding en Sport, met als specialisatie coaching.',
    ],
    qualifications: [
      'Senior Polestar Pilates-instructeur',
      'Miha BodyTec EMS Advance Trainer',
      'TRX- en krachttrainingsinstructeur',
      'Meer dan 12 jaar ervaring als pilatesinstructeur',
      'Gespecialiseerd in programma’s op maat voor alle leeftijden en niveaus',
      'Gecertificeerd Polestar Pilates-trainer – Polestar Pilates, İstanbul',
      'De wetenschap van gezond bewegen met de wervelkolom – Polestar Pilates met Brent Anderson, İstanbul',
      'Pilates voor de onderrug – Polestar Pilates en Brent Anderson, İstanbul',
      '4dpro Bungee Fitness-trainer – 4dpro Bungee Fitness, İzmir',
      'Miha bodytec Advance EMS-trainer – Miha bodytec, İstanbul',
      'Reformer Pilates-trainer – Seam Academy, İstanbul',
      'Workshop plyometrische training en spiercontractie – Seam Academy, İstanbul',
      'Workshop pilates tijdens de zwangerschap – Pilatesystem, Ankara',
      'Pilatesinstructeur – Turkse Gymnastiekfederatie, İzmir',
      'Zumba-basistrainer – Zumba, İstanbul',
      'Fitnesstrainer niveau 3',
    ],
    ctaText: 'Boek een sessie met Göknur voor een complete aanpak van fitheid en voeding.',
  },
  gokben: {
    title: 'Comprehensive Pilates',
    heroTitle: 'Comprehensive Pilates',
    languages: ['Engels', 'Turks'],
    specialties: ['Reformer pilates', 'Matpilates', 'Prenatale pilates'],
    seo: {
      title: 'Gökben Öztekin | Pilatesinstructeur bij PT 7 Amsterdam',
      description:
        'Maak kennis met Gökben Öztekin, ervaren Reformer pilatesinstructeur bij PT 7 Amsterdam. Gespecialiseerd in precieze techniek en bewust bewegen.',
      keywords: 'Gökben Öztekin, Reformer pilates, pilates instructeur Amsterdam, pilates leraar Amsterdam, PT 7',
    },
    structuredData: {
      jobTitle: 'BASI Pilates-instructeur',
      description:
        'Ervaren Reformer pilatesinstructeur, gespecialiseerd in precieze techniek en bewust bewegen bij PT 7 Amsterdam.',
    },
    bio: [
      'Gökben is gecertificeerd BASI Pilates-instructeur en helpt cliënten graag sterker, soepeler en fitter te worden. Ze zorgt voor een gastvrije en motiverende sfeer voor iedereen.',
    ],
    qualifications: [
      'BASI Pilates-instructeur',
      'Gespecialiseerd in pilates voor alle leeftijden en niveaus',
      'Focus op bewust bewegen en persoonlijke groei',
    ],
    ctaText: 'Boek een sessie met Gökben en ervaar de kunst van Reformer pilates.',
  },
  gulce: {
    title: 'Reformer pilates',
    heroTitle: 'Reformer pilates',
    languages: ['Engels', 'Turks'],
    specialties: ['Reformer pilates'],
    seo: {
      title: 'Gülce Koç | Pilatesinstructeur bij PT 7 Amsterdam',
      description:
        'Maak kennis met Gülce Koç, gecertificeerd Reformer pilatesinstructeur bij PT 7 Amsterdam. Deelt met passie kracht, balans en plezier via pilates.',
      keywords: 'Gülce Koç, Gülce, Reformer pilates, pilates instructeur Amsterdam, pilates leraar, PT 7',
    },
    structuredData: {
      jobTitle: 'Reformer pilatesinstructeur',
      description:
        'Gecertificeerd Reformer pilatesinstructeur die met passie kracht, balans en plezier via pilates deelt bij PT 7 Amsterdam.',
    },
    bio: [
      'Gülce doet aan pilates sinds ze begon met studeren en heeft onderweg veel verschillende lesmethodes en bewegingsbenaderingen ontdekt. Haar ervaring strekt zich uit over Turkije, Duitsland en Nederland, waar ze in uiteenlopende studio’s pilates heeft beoefend en bestudeerd.',
      'De afgelopen vier jaar was ze een blije en toegewijde leerling bij PT 7, en nu is ze nog blijer dat ze zich bij het topteam van instructeurs voegt. Gülce wil hetzelfde gevoel van kracht, balans en plezier dat pilates haar heeft gegeven graag doorgeven, en kijkt ernaar uit om dat geluk met haar leerlingen te delen.',
    ],
    qualifications: [
      'PT 7 Academy Comprehensive Reformer-instructeurscursus',
      'Internationale pilateservaring in Turkije, Duitsland en Nederland',
      'Gespecialiseerd in Reformer pilates',
      'Focus op kracht, balans en bewust bewegen',
    ],
    ctaText: 'Boek een sessie met Gülce en ervaar het plezier van Reformer pilates.',
  },
  lal: {
    title: 'Reformer pilates',
    heroTitle: 'Reformer pilates',
    languages: ['Engels', 'Turks'],
    specialties: ['Reformer pilates'],
    seo: {
      title: 'Lal Avgen | Pilatesinstructeur bij PT 7 Amsterdam',
      description:
        'Maak kennis met Lal Avgen, gecertificeerd Reformer pilatesinstructeur bij PT 7 Amsterdam. Beeldend kunstenaar en creative technologist die bewust bewegen in haar lessen brengt.',
      keywords: 'Lal Avgen, Lal, Reformer pilates, pilates instructeur Amsterdam, pilates leraar, PT 7',
    },
    structuredData: {
      jobTitle: 'Reformer pilatesinstructeur',
      description:
        'Gecertificeerd Reformer pilatesinstructeur, beeldend kunstenaar en creative technologist die bewust bewegen in haar lessen brengt bij PT 7 Amsterdam.',
    },
    bio: [
      'Lal begon in 2022 met pilates, voortbouwend op een leven lang bewegen als actief mens. Ze groeide op in Istanbul, voelde zich aangetrokken tot teamsporten als voetbal en volleybal en ontwikkelde later een sterke interesse in fitness en persoonlijke conditietraining.',
      'Naast pilates werkt Lal als beeldend kunstenaar en creative technologist, een vak met lange dagen staan en fysiek zwaar installatiewerk. Pilates hielp haar eerst om de lichamelijke belasting van dat werk op te lossen en werd daarna een vaste basis voor kracht, veerkracht en lichaamsbewustzijn. Ze koos ervoor instructeur te worden om bewust te bewegen en haar kennis met anderen te delen.',
    ],
    qualifications: [
      'PT 7 Academy Comprehensive Reformer-instructeurscursus',
      'Achtergrond in teamsporten (voetbal, volleybal)',
      'Professioneel beeldend kunstenaar en creative technologist',
      'Gespecialiseerd in Reformer pilates',
      'Focus op kracht, veerkracht en lichaamsbewustzijn',
    ],
    ctaText: 'Boek een sessie met Lal en ontdek bewust bewegen met pilates.',
  },
  nisan: {
    title: 'Reformer pilates',
    heroTitle: 'Reformer pilates',
    languages: ['Engels', 'Turks', 'Nederlands'],
    specialties: ['Reformer pilates'],
    seo: {
      title: 'Nisan Atalay | Pilatesinstructeur bij PT 7 Amsterdam',
      description:
        'Maak kennis met Nisan Atalay, gecertificeerd Reformer pilatesinstructeur bij PT 7 Amsterdam. Nederlandssprekende instructeur met passie voor bewust bewegen.',
      keywords: 'Nisan Atalay, Nisan, Reformer pilates, pilates instructeur Amsterdam, Nederlands sprekende pilates instructeur, pilates leraar, PT 7',
    },
    structuredData: {
      jobTitle: 'Reformer pilatesinstructeur',
      description:
        'Nederlandssprekende, gecertificeerde Reformer pilatesinstructeur met passie voor bewust bewegen, die mensen helpt zich goed te voelen in hun lichaam bij PT 7 Amsterdam.',
    },
    bio: [
      'Nisan is een pas gecertificeerde pilatesinstructeur met passie voor bewust bewegen en voor het helpen van mensen om zich goed te voelen in hun lichaam. Haar aanpak richt zich op het opbouwen van kracht, mobiliteit en balans, op een manier die een hoge levenskwaliteit en welzijn op de lange termijn ondersteunt.',
    ],
    qualifications: [
      'PT 7 Academy Comprehensive Reformer-instructeurscursus',
      'Gespecialiseerd in Reformer pilates',
      'Focus op bewust bewegen en welzijn',
      'Nadruk op het opbouwen van kracht, mobiliteit en balans',
    ],
    ctaText: 'Boek een sessie met Nisan en ervaar bewust bewegen op z’n best.',
  },
  kelly: {
    title: 'Reformer pilates',
    heroTitle: 'Reformer pilates',
    languages: ['Engels', 'Nederlands'],
    specialties: ['Reformer pilates'],
    seo: {
      title: 'Kelly Tin | Pilatesinstructeur bij PT 7 Amsterdam',
      description:
        'Maak kennis met Kelly Tin, gecertificeerd Reformer pilatesinstructeur bij PT 7 Amsterdam. Engels- en Nederlandssprekende coach met een achtergrond in kracht en HIIT.',
      keywords: 'Kelly Tin, Kelly, Reformer pilates, pilates instructeur Amsterdam, Nederlands sprekende pilates instructeur, pilates leraar, PT 7',
    },
    structuredData: {
      jobTitle: 'Reformer pilatesinstructeur',
      description:
        'Engels- en Nederlandssprekende, gecertificeerde Reformer pilatesinstructeur met een achtergrond in kracht en HIIT bij PT 7 Amsterdam.',
    },
    bio: [
      'Kelly doet sinds 2024 regelmatig aan pilates, naast haar ervaring met kracht- en HIIT-training. Ze merkte al snel dat pilates haar rustiger, sterker en bewuster maakte van haar lichaam, houding en hoofd.',
      'Na elke les voelde ze zich opgefrist en meer verbonden met zichzelf. Dat inspireerde haar om instructeur te worden en hetzelfde gevoel aan anderen te geven: mensen helpen meer te bewegen, kracht op te bouwen en zich goed en zelfverzekerd te voelen in hun lichaam.',
    ],
    qualifications: [
      'PT 7 Academy Comprehensive Reformer-instructeurscursus',
      'Ervaring met kracht- en HIIT-training',
      'Professionele achtergrond in marketing in de softwarebranche',
      'Gespecialiseerd in Reformer pilates',
    ],
    ctaText: 'Boek een sessie met Kelly en voel je sterker, rustiger en zelfverzekerder in je lichaam.',
  },
  gamze: {
    title: 'Reformer pilates',
    heroTitle: 'Reformer pilates',
    languages: ['Engels', 'Turks'],
    specialties: ['Reformer pilates'],
    seo: {
      title: 'E. Gamze Karadağ | Pilatesinstructeur bij PT 7 Amsterdam',
      description:
        'Maak kennis met E. Gamze Karadağ, gecertificeerd Reformer pilatesinstructeur bij PT 7 Amsterdam. Achtergrond in yoga en afgestudeerd aan PT7 Academy.',
      keywords: 'E. Gamze Karadağ, Gamze Karadağ, Gamze, Reformer pilates, pilates instructeur Amsterdam, pilates leraar, PT 7',
    },
    structuredData: {
      jobTitle: 'Reformer pilatesinstructeur',
      description:
        'Gecertificeerd Reformer pilatesinstructeur met een achtergrond in yoga, die leerlingen begeleidt naar meer mobiliteit, lichaamsbewustzijn en welzijn bij PT 7 Amsterdam.',
    },
    bio: [
      'Gamze doet al meer dan 7 jaar aan yoga en was de afgelopen twee jaar een vertrouwd gezicht in onze studiocommunity voordat ze instructeur werd.',
      'Vanuit een diep geloof in beweging als middel voor verandering begeleidt ze leerlingen met passie naar een betere levenskwaliteit via Reformer pilates.',
    ],
    qualifications: [
      'PT 7 Academy Comprehensive Reformer-instructeurscursus',
      'Achtergrond in yoga',
      'Gespecialiseerd in Reformer pilates',
      'Focus op mobiliteit, lichaamsbewustzijn, balans en algemeen welzijn',
    ],
    ctaText: 'Boek een sessie met Gamze en verbeter je mobiliteit, balans en lichaamsbewustzijn met Reformer pilates.',
  },
};

export const trainerProfilesNl: TrainerProfile[] = trainerProfiles.map((profile) => {
  const text = nlText[profile.slug];
  if (!text) throw new Error(`Missing Dutch copy for trainer "${profile.slug}"`);
  return { ...profile, ...text };
});
