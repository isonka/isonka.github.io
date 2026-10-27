import { workoutDetails, type WorkoutDetailData } from './workoutDetails.ts';

/** Dutch copy for the workout guides. Links stay as English paths; the page localises them. */
const en = (slug: string): WorkoutDetailData => {
  const workout = workoutDetails.find((w) => w.slug === slug);
  if (!workout) throw new Error(`Unknown workout "${slug}"`);
  return workout;
};

const reformer = en('reformer-pilates');
const trx = en('trx');
const functional = en('functional-training');
const cardio = en('cardio');

const reformerNl: WorkoutDetailData = {
  ...reformer,
  seo: {
    ...reformer.seo,
    title: 'Wat is Reformer pilates? Gids met voordelen | PT 7',
    description:
      'Gids over Reformer pilates: hoe de slede werkt, de voordelen en voor wie het geschikt is. Boek lessen via de pagina Reformer pilates Amsterdam van PT 7.',
    keywords:
      'wat is reformer pilates, voordelen reformer pilates, reformer vs matpilates, pilates reformer workout, core kracht pilates, flexibiliteit, houding verbeteren pilates',
    canonical: 'https://www.pt7.nl/reformer-pilates-amsterdam/nl/',
    ogTitle: 'Wat is Reformer pilates? | Gids van PT 7',
    ogDescription:
      'Hoe Reformer pilates werkt, voor wie het geschikt is en hoe het verschilt van matpilates. Boek lessen via de pagina Reformer pilates Amsterdam.',
  },
  announcementBanner: {
    label: 'Lessen boeken',
    text: 'Op zoek naar Reformer pilateslessen in Amsterdam?',
    ctaHref: '/reformer-pilates-amsterdam/',
    ctaLabel: 'Reformer pilates Amsterdam →',
  },
  breadcrumbName: 'Gids Reformer pilates',
  hero: {
    ...reformer.hero,
    title: 'Wat is Reformer pilates?',
    tagline: 'Weerstandstraining voor je hele lichaam op de Reformer: voordelen, voor wie het is en hoe je begint',
    ctaLabel: 'Boek Reformer-lessen in Amsterdam',
  },
  intro: {
    title: 'Transformeer je lichaam met Reformer pilates',
    lead: 'Reformer pilates is een dynamische workout voor je hele lichaam waarbij speciale apparatuur zorgt voor weerstand en ondersteuning. Bij PT 7 begeleiden onze ervaren instructeurs je door gecontroleerde, precieze bewegingen die je core versterken, je flexibiliteit verbeteren en je lichaamsbewustzijn vergroten. Wil je een les boeken in onze studio aan het Museumplein? Ga dan naar onze pagina Reformer pilates Amsterdam.',
  },
  benefits: {
    title: 'Waarom kiezen voor Reformer pilates?',
    cards: [
      { title: 'Kracht in je core', description: 'Bouw diepe stabiliteit en kracht in je core op die je hele lichaam ondersteunt, je balans verbetert en blessures helpt voorkomen.' },
      { title: 'Flexibiliteit', description: 'Vergroot je bewegingsbereik en flexibiliteit met gecontroleerde rek- en strekbewegingen.' },
      { title: 'Betere houding', description: 'Corrigeer disbalans en verbeter je uitlijning voor een betere houding in het dagelijks leven en minder rugpijn.' },
      { title: 'Strak van top tot teen', description: 'Train elke spiergroep heel gericht voor een evenwichtig, strak lichaam zonder massa.' },
      { title: 'Verbinding tussen lichaam en geest', description: 'Ontwikkel lichaamsbewustzijn en bewust bewegen met gerichte, doelbewuste oefeningen.' },
      { title: 'Weinig belastend', description: 'Veilig voor elk niveau en elke leeftijd, met minimale belasting van je gewrichten terwijl je kracht opbouwt.' },
    ],
  },
  forWhom: {
    title: 'Perfect voor',
    cards: [
      { heading: 'Beginners', description: 'Nieuw met pilates? Onze instructeurs bieden aanpassingen en begeleiding zodat je de basis veilig onder de knie krijgt.' },
      { heading: 'Sporters', description: 'Verbeter je prestaties met meer kracht in je core, meer flexibiliteit en minder kans op blessures.' },
      { heading: 'Zwangere vrouwen', description: 'Veilige prenatale training in privésessies om sterk te blijven en je voor te bereiden op de bevalling.' },
      { heading: 'Herstel van blessures', description: 'Weinig belastende revalidatie die kracht en mobiliteit opbouwt onder deskundige begeleiding.' },
      { heading: 'Actief ouder worden', description: 'Voorkom spierverlies en behoud kracht, mobiliteit, balans en zelfstandigheid met zachte maar effectieve oefeningen.' },
      { heading: 'Kantoorwerkers', description: 'Ga klachten van veel zitten tegen met houdingscorrectie en oefeningen die je rug versterken.' },
    ],
  },
  classOptions: {
    title: 'Lesvormen',
    cards: [
      {
        ...reformer.classOptions.cards[0],
        title: 'Kleine groepslessen',
        subtitle: 'Maximaal 5 personen',
        description: 'Ervaar Reformer pilates in een kleine groep met persoonlijke aandacht. Perfect als je houdt van de energie van samen trainen.',
        features: ['Lessen van 45 minuten', 'Vanaf €28 per les', 'Alle niveaus welkom', 'Energieke groepssfeer'],
        linkLabel: 'Bekijk groepsprijzen',
      },
      {
        ...reformer.classOptions.cards[1],
        title: 'Privélessen',
        subtitle: 'Eén-op-één',
        description: 'Krijg 100% van de aandacht van je instructeur met volledig persoonlijke workouts, afgestemd op je doelen, blessures of specifieke wensen.',
        features: ['Persoonlijke sessies van 45 minuten', 'Vanaf €70 per les', 'Volledig programma op maat', 'Flexibel inplannen'],
        linkLabel: 'Bekijk privéprijzen',
        featuredBadge: 'Meest persoonlijk',
      },
      {
        ...reformer.classOptions.cards[2],
        title: 'Word instructeur',
        subtitle: 'PT7 Academy',
        description: 'Leer Reformer pilates geven met onze instructeurscursus van 300 uur, ITTAP-goedgekeurd door de Pilates Method Alliance (PMA). Colleges in het weekend aan het Museumplein.',
        features: ['300 uur in totaal', 'Volgende lichting mrt–mei 2027', 'Weekendrooster', 'PMA ITTAP-goedgekeurd programma'],
        linkLabel: 'Ontdek de Academy',
      },
    ],
  },
  equipmentShowcase: {
    title: 'Onze Reformer-apparatuur',
    subtitle: 'We gebruiken professionele Reformer-apparatuur met soepele, verstelbare weerstand voor het beste resultaat.',
    heading: 'Hoogwaardige Reformer-machines',
    description: 'Onze studio heeft moderne Reformer-machines met:',
    features: [
      '✓ Verstelbare veerweerstand voor elk niveau',
      '✓ Soepel glijdende slede voor precieze bewegingen',
      '✓ Comfortabele vulling en ergonomisch ontwerp',
      '✓ Meerdere banden en stangen voor afwisselende oefeningen',
      '✓ Regelmatig onderhouden voor veiligheid en prestaties',
    ],
    linkTo: '/equipment/reformer/',
    linkLabel: 'De Reformer in onze studio in Amsterdam →',
  },
  trainers: {
    title: 'Maak kennis met je ervaren instructeurs',
    cards: [
      { ...reformer.trainers.cards[0], cert: 'Senior Polestar Pilates-instructeur', description: 'Meer dan 15 jaar ervaring, gespecialiseerd in herstel van blessures en een gezonde wervelkolom', imageAlt: 'Elif Arzu Ogan - Reformer pilatesinstructeur' },
      { ...reformer.trainers.cards[1], cert: 'Senior Polestar Pilates-instructeur', description: 'Meer dan 12 jaar ervaring in Reformer pilates en krachttraining', imageAlt: 'Göknur Dipli - Reformer pilatesinstructeur' },
      { ...reformer.trainers.cards[2], cert: 'BASI Pilates-instructeur', description: 'Pilatesinstructeur', imageAlt: 'Gökben Öztekin - BASI Pilates-instructeur' },
    ],
  },
  faq: [
    { question: 'Heb ik pilateservaring nodig?', answer: 'Nee! Complete beginners zijn welkom. Onze instructeurs bieden aanpassingen en begeleiding voor elk niveau.' },
    { question: 'Wat moet ik aantrekken?', answer: 'Draag comfortabele, aansluitende sportkleding waarin je vrij kunt bewegen. Vermijd losse kleding die tussen de apparatuur kan komen. Antislipsokken worden aanbevolen (te koop in onze studio).' },
    { question: 'Hoe vaak moet ik Reformer pilates doen?', answer: 'Voor het beste resultaat raden we 2 à 3 sessies per week aan. Regelmaat is de sleutel tot vooruitgang in kracht, flexibiliteit en houding.' },
    { question: 'Kan ik Reformer pilates doen als ik een blessure heb?', answer: 'Ja! Reformer pilates is uitstekend voor revalidatie. Vertel je instructeur vóór de les over eventuele blessures, zodat die passende aanpassingen kan bieden.' },
    { question: 'Wat is het verschil tussen Reformer pilates en matpilates?', answer: 'Bij Reformer pilates gebruik je speciale apparatuur met veren voor weerstand. Dat geeft meer variatie, ondersteuning en uitdaging. Het is uitstekend voor zowel beginners als gevorderden.' },
    { question: 'Kan ik hier een opleiding tot Reformer-instructeur volgen?', answer: 'Ja. PT7 Academy biedt een Reformer Pilates-instructeurscursus van 300 uur (ITTAP-goedgekeurd door de Pilates Method Alliance). September–november 2026 en november 2026–januari 2027 zijn volgeboekt. De volgende lichting loopt van maart tot mei 2027. Meer informatie op /academy/nl/.' },
  ],
  finalCta: {
    ...reformer.finalCta,
    title: 'Klaar om je lichaam te transformeren?',
    subtitle: 'Boek Reformer pilateslessen in onze studio aan het Museumplein in Amsterdam Oud-Zuid',
    primaryLabel: 'Reformer pilates Amsterdam',
    secondaryLabel: 'Bekijk prijzen',
  },
};

const trxNl: WorkoutDetailData = {
  ...trx,
  seo: {
    ...trx.seo,
    title: 'Wat is TRX suspension training? Gids | PT 7',
    description:
      'Gids over TRX suspension training: hoe het werkt, de voordelen en voor wie het geschikt is. Boek lessen in Amsterdam via de pagina TRX training Amsterdam van PT 7.',
    keywords:
      'TRX training Amsterdam, suspension training Amsterdam, TRX Museumplein, functionele fitness Amsterdam, krachttraining, balanstraining, TRX lessen',
    canonical: 'https://www.pt7.nl/trx-training-amsterdam/nl/',
    ogTitle: 'Wat is TRX suspension training? | Gids van PT 7',
    ogDescription: 'Hoe TRX suspension training werkt en voor wie het geschikt is. Boek lessen via de pagina TRX training Amsterdam.',
  },
  breadcrumbName: 'TRX-training',
  hero: {
    ...trx.hero,
    title: 'TRX suspension training',
    tagline: 'Suspension training voor kracht, balans en functionele fitheid',
    ctaLabel: 'Boek een les',
  },
  intro: {
    title: 'Beheers je eigen lichaamsgewicht met TRX',
    lead: 'TRX suspension training gebruikt de zwaartekracht en je eigen lichaamsgewicht om tegelijk kracht, balans, flexibiliteit en core-stabiliteit op te bouwen. TRX wordt gebruikt door topsporters en militairen en levert een uitdagende, schaalbare workout op die geschikt is voor iedereen, van beginner tot gevorderde sporter.',
  },
  benefits: {
    title: 'Voordelen van TRX-training',
    cards: [
      { title: 'Workout voor je hele lichaam', description: 'Train meerdere spiergroepen tegelijk voor een efficiënte, effectieve conditietraining van top tot teen.' },
      { title: 'Core aan het werk', description: 'Elke oefening activeert je core en bouwt diepe stabiliserende kracht en balans op.' },
      { title: 'Schaalbare intensiteit', description: 'Pas de moeilijkheid eenvoudig aan door je lichaamshoek te veranderen. Perfect voor elk niveau.' },
      { title: 'Functionele kracht', description: 'Bouw praktische kracht op die je merkt in dagelijkse bewegingen en in je sport.' },
      { title: 'Flexibiliteit & mobiliteit', description: 'Verbeter je bewegingsbereik en de stabiliteit van je gewrichten met dynamische bewegingen.' },
      { title: 'Vetverbranding', description: 'Intensieve workouts verbranden veel calorieën en houden je stofwisseling nog uren na de training hoog.' },
    ],
  },
  forWhom: {
    title: 'Perfect voor',
    cards: [
      { heading: 'Wie sterker wil worden', description: 'Bouw slanke spieren en functionele kracht op zonder zware gewichten of machines.' },
      { heading: 'Sporters', description: 'Verbeter je sportprestaties met explosieve kracht, balans en blessurepreventie.' },
      { heading: 'Wie weinig tijd heeft', description: 'Een complete workout in 45 minuten, zonder tijd te verliezen met wisselen van apparaat.' },
      { heading: 'Beginners', description: 'Begin op je eigen niveau en bouw veilig op met eenvoudig aan te passen intensiteit.' },
      { heading: 'Doelgericht trainen', description: 'Of je nu wilt afvallen, spieren wilt opbouwen of beter wilt presteren: TRX levert resultaat.' },
      { heading: 'Liefhebbers van body & mind', description: 'Combineer kracht met bewust bewegen en lichaamsbewustzijn.' },
    ],
  },
  classOptions: {
    title: 'Trainingsvormen',
    cards: [
      {
        ...trx.classOptions.cards[0],
        title: 'TRX-training met z’n tweeën',
        subtitle: 'Train samen met je partner',
        description: 'Train samen met je partner in een motiverende omgeving, met persoonlijke coaching voor jullie allebei.',
        features: ['Sessies van 45 minuten', 'Vanaf €40-50 per persoon', 'Deel de ervaring', 'Motiveer elkaar'],
        linkLabel: 'Bekijk duoprijzen',
      },
      {
        ...trx.classOptions.cards[1],
        title: 'Privé TRX-training',
        subtitle: 'Eén-op-één',
        description: 'Krijg een persoonlijk programma, afgestemd op je doelen, je niveau en eventuele beperkingen.',
        features: ['Privésessies van 45 minuten', 'Vanaf €70 per les', 'Workout op maat', 'Flexibel inplannen'],
        linkLabel: 'Bekijk privéprijzen',
        featuredBadge: 'Meest persoonlijk',
      },
    ],
  },
  trainers: {
    title: 'Ervaren TRX-instructeurs',
    cards: [
      { ...trx.trainers.cards[0], cert: 'Gecertificeerd TRX-instructeur', description: 'Meer dan 15 jaar ervaring in functionele training, gecertificeerd TRX-expert', imageAlt: 'Elif Arzu Ogan - TRX-instructeur' },
      { ...trx.trainers.cards[1], cert: 'TRX- en krachttrainingsinstructeur', description: 'Meer dan 12 jaar ervaring in suspension training en functionele fitness', imageAlt: 'Göknur Dipli - TRX-instructeur' },
    ],
  },
  faq: [
    { question: 'Is TRX geschikt voor beginners?', answer: 'Zeker! TRX is enorm schaalbaar. Door alleen je lichaamshoek aan te passen, maken we oefeningen lichter of zwaarder. Onze instructeurs helpen je de juiste intensiteit te vinden.' },
    { question: 'Bouw ik spieren op met TRX?', answer: 'Ja! TRX bouwt slanke, functionele spieren op met je eigen lichaamsgewicht als weerstand. Je ontwikkelt kracht, definitie en meer spieruithoudingsvermogen.' },
    { question: 'Welk niveau heb ik nodig voor TRX?', answer: 'TRX is heel goed aan te passen aan elk niveau. Door je lichaamshoek te veranderen, maken we oefeningen makkelijker of uitdagender, passend bij jouw sportieve mogelijkheden.' },
    { question: 'Wat moet ik aantrekken?', answer: 'Draag comfortabele sportkleding waarin je volledig vrij kunt bewegen. Sportschoenen zijn verplicht bij TRX-training.' },
    { question: 'Hoe vaak per week moet ik TRX doen?', answer: '2 à 3 keer per week is ideaal om kracht op te bouwen en resultaat te zien, met rustdagen ertussen om te herstellen.' },
  ],
  finalCta: {
    ...trx.finalCta,
    title: 'Klaar om TRX te ervaren?',
    subtitle: 'Ontdek de kracht van suspension training bij PT 7',
    primaryLabel: 'Boek je sessie',
    secondaryLabel: 'Bekijk prijzen',
  },
};

const functionalNl: WorkoutDetailData = {
  ...functional,
  seo: {
    ...functional.seo,
    title: 'Nike krachttraining Amsterdam | PT 7 Pilates Museumplein',
    description:
      'Nike-krachttraining aan het Museumplein in Amsterdam: Olympische halterstang, half rack en dumbbells. Eén-op-één of in kleine groepen (max. 5).',
    keywords:
      'Nike krachttraining Amsterdam, olympisch gewichtheffen Amsterdam, personal training Museumplein, training met halterstang Amsterdam, functionele fitness Amsterdam, Nike sportapparatuur',
    canonical: 'https://www.pt7.nl/workouts/functional-training/nl/',
    ogTitle: 'Nike krachttraining Amsterdam | PT 7 Pilates',
    ogDescription:
      'Hoogwaardige Nike Strength-apparatuur. Training met de Olympische halterstang onder begeleiding van ervaren coaches in onze boutique studio aan het Museumplein.',
  },
  breadcrumbName: 'Nike krachttraining',
  hero: {
    ...functional.hero,
    title: 'Nike krachttraining',
    tagline: 'Topapparatuur. Deskundige coaching. Echt resultaat.',
    ctaLabel: 'Boek een sessie',
  },
  intro: {
    title: 'Hoogwaardige Nike Strength-apparatuur',
    lead: 'Ervaar krachttraining met professionele Nike-apparatuur, waaronder ons Nike Strength Half Rack, een Olympische halterstang, gerecyclede Nike Grind-halterschijven en hoogwaardige hex-dumbbells. Samen met deskundige coaching bouw je echte kracht, stabiliteit en mobiliteit op die je direct merkt in je dagelijks leven.',
  },
  equipmentGallery: {
    title: 'Onze Nike Strength-apparatuur',
    items: [
      { ...functional.equipmentGallery!.items[0], imageAlt: 'Nike Strength Half Rack met Olympische halterstang', description: 'Professioneel half rack voor squats, bankdrukken en Olympisch gewichtheffen' },
      { ...functional.equipmentGallery!.items[1], imageAlt: 'Gerecyclede Nike Grind-halterschijven', title: 'Nike Grind-halterschijven', description: 'Duurzame schijven gemaakt van gerecycled Nike-materiaal' },
      { ...functional.equipmentGallery!.items[2], imageAlt: 'Nike hex-dumbbells', title: 'Nike hex-dumbbells', description: 'Een complete reeks hoogwaardige dumbbells voor elk krachtniveau' },
    ],
  },
  benefits: {
    title: 'Waarom krachttraining?',
    cards: [
      { title: 'Kracht voor het echte leven', description: 'Bouw praktische kracht op die je helpt bij tillen, dragen, duwen en trekken in het dagelijks leven.' },
      { title: 'Blessurepreventie', description: 'Versterk stabiliserende spieren en verbeter je bewegingspatronen om de kans op blessures te verkleinen.' },
      { title: 'Betere balans', description: 'Bewegingen in meerdere richtingen verbeteren je balans, coördinatie en lichaamsbeheersing.' },
      { title: 'Spieropbouw', description: 'Ontwikkel slanke, functionele spiermassa die je stofwisseling en lichaam verbetert.' },
      { title: 'Stabiele core', description: 'Elke oefening activeert je core voor een betere houding en een gezonde wervelkolom.' },
      { title: 'Meetbare vooruitgang', description: 'Volg je voortgang met meetbare verbeteringen in kracht en prestaties.' },
    ],
  },
  forWhom: {
    title: 'Perfect voor',
    cards: [
      { heading: 'Krachtdoelen', description: 'Bouw spieren op, vergroot je kracht en word op een functionele, praktische manier sterker.' },
      { heading: 'Sportprestaties', description: 'Verbeter je sportieve vermogen met bewegingen die direct bijdragen aan jouw sport.' },
      { heading: 'Actieve levensstijl', description: 'Bereid je lichaam voor op wandelen, hardlopen, sporten en avonturen buiten.' },
      { heading: 'Gezond ouder worden', description: 'Voorkom spierverlies en behoud kracht, zelfstandigheid en levenskwaliteit met functionele training.' },
      { heading: 'Minder rugpijn', description: 'Versterk je achterste spierketen en je core om chronische rugpijn te verlichten.' },
      { heading: 'Afvallen', description: 'Verbrand efficiënt calorieën en bouw spieren op die je stofwisseling een boost geven.' },
    ],
  },
  classOptions: {
    title: 'Trainingsvormen',
    cards: [
      {
        ...functional.classOptions.cards[0],
        title: 'Training met z’n tweeën',
        subtitle: 'Train samen met je partner',
        description: 'Train samen met je partner, met persoonlijke coaching en techniekcorrecties voor jullie allebei.',
        features: ['Sessies van 45 minuten', 'Vanaf €40-50 per persoon', 'Deel de reis', 'Motiveer elkaar'],
        linkLabel: 'Bekijk duoprijzen',
      },
      {
        ...functional.classOptions.cards[1],
        title: 'Eén-op-één training',
        subtitle: 'Eén-op-één',
        description: 'Krijg een volledig persoonlijk programma, opgebouwd rond je doelen, blessures en niveau.',
        features: ['Privésessies van 45 minuten', 'Vanaf €70 per les', 'Programma op maat', 'Volle aandacht'],
        linkLabel: 'Bekijk privéprijzen',
        featuredBadge: 'Volledig op maat',
      },
    ],
  },
  trainers: {
    title: 'Je instructeurs krachttraining',
    cards: [
      { ...functional.trainers.cards[0], cert: 'Krachttrainingsinstructeur', description: 'Meer dan 15 jaar ervaring in krachttraining en functioneel bewegen', imageAlt: 'Elif Arzu Ogan - krachttrainingsinstructeur' },
      { ...functional.trainers.cards[1], cert: 'Krachttrainingsinstructeur', description: 'Gecertificeerd coach met meer dan 12 jaar ervaring in fitness en krachttraining', imageAlt: 'Göknur Dipli - instructeur Comprehensive Pilates, krachttraining en prenatale pilates' },
    ],
  },
  faq: [
    { question: 'Wat is het verschil tussen krachttraining en een gewone sportschoolworkout?', answer: 'Onze krachttraining richt zich op samengestelde bewegingen over meerdere gewrichten die lijken op bewegingen uit het echte leven, in plaats van losse spieren te isoleren op machines. Zo bouw je praktische, bruikbare kracht op.' },
    { question: 'Heb ik ervaring met gewichtstraining nodig?', answer: 'Nee! We leren je de juiste techniek vanaf het begin en starten met gewichten die passen bij je niveau. In duo- of privésessies krijg je persoonlijke aandacht om elke beweging veilig onder de knie te krijgen.' },
    { question: 'Word ik er erg gespierd van?', answer: 'Nee. Functionele training bouwt slanke, atletische spieren op. Het type training dat wij doen zorgt voor kracht en definitie zonder overmatige massa.' },
    { question: 'Helpt krachttraining bij afvallen?', answer: 'Zeker! Meer spiermassa verhoogt je verbranding in rust, en krachttraining verbrandt flink wat calorieën tijdens en na de training.' },
    { question: 'Is dit geschikt voor ouderen?', answer: 'Ja! Krachttraining is een van de beste manieren om zelfstandig te blijven naarmate je ouder wordt. We passen oefeningen aan je mogelijkheden aan en bouwen je kracht geleidelijk en veilig op.' },
  ],
  finalCta: {
    ...functional.finalCta,
    title: 'Begin met kracht voor het echte leven',
    subtitle: 'Ervaar krachttraining bij PT 7 Museumplein',
    primaryLabel: 'Boek je sessie',
    secondaryLabel: 'Bekijk prijzen',
  },
};

const cardioNl: WorkoutDetailData = {
  ...cardio,
  seo: {
    ...cardio.seo,
    title: 'Cardiotraining Amsterdam | PT 7 Pilates Museumplein',
    description:
      'Intensieve cardioworkouts in Amsterdam aan het Museumplein. Meer uithoudingsvermogen, vetverbranding en een gezond hart. HIIT in kleine groepen en één-op-één training!',
    keywords:
      'cardiotraining Amsterdam, HIIT Amsterdam, vetverbrandende workout, conditietraining Museumplein, cardiolessen Amsterdam, hartgezondheid fitness',
    canonical: 'https://www.pt7.nl/workouts/cardio/nl/',
    ogTitle: 'Cardiotraining Amsterdam | PT 7 Pilates',
    ogDescription: 'Energieke cardioworkouts om calorieën te verbranden en je conditie op te bouwen. Kleine groepen (max. 5) aan het Museumplein.',
  },
  breadcrumbName: 'Cardiotraining',
  hero: {
    ...cardio.hero,
    title: 'Cardiotraining',
    tagline: 'Intensieve cardioworkouts voor meer uithoudingsvermogen en calorieverbranding',
    ctaLabel: 'Boek een sessie',
  },
  intro: {
    title: 'Transformeer je conditie',
    lead: 'Onze cardiotraining combineert high-intensity interval training (HIIT), metabole conditietraining en duurtraining om zo veel mogelijk calorieën te verbranden, je hart en bloedvaten te versterken en je algehele fitheid te verbeteren. Maak je klaar om te zweten, jezelf uit te dagen en echt resultaat te zien!',
  },
  benefits: {
    title: 'Voordelen van cardiotraining',
    cards: [
      { title: 'Vetverbranding', description: 'Verbrand calorieën tijdens en na je workout dankzij het afterburn-effect van intensieve training.' },
      { title: 'Gezond hart', description: 'Versterk je hart en bloedvaten, verlaag je bloeddruk en verklein de kans op hart- en vaatziekten.' },
      { title: 'Meer energie', description: 'Vergroot je uithoudingsvermogen en energie, zodat je dagelijkse activiteiten makkelijker gaan.' },
      { title: 'Helder hoofd', description: 'Maak endorfine aan, verminder stress en verbeter je humeur en concentratie.' },
      { title: 'Uithoudingsvermogen', description: 'Vergroot je vermogen om langer actief te blijven zonder moe te worden.' },
      { title: 'Tijdsefficiënt', description: 'HIIT-workouts leveren maximaal resultaat in minimale tijd. Perfect voor een drukke agenda.' },
    ],
  },
  forWhom: {
    title: 'Perfect voor',
    cards: [
      { heading: 'Wie wil afvallen', description: 'Haal het maximale uit calorie- en vetverbranding met intensieve metabole training.' },
      { heading: 'Duursporters', description: 'Bouw cardiovasculaire capaciteit op voor hardlopen, fietsen of andere sporten.' },
      { heading: 'Drukke professionals', description: 'Een effectieve workout van 45 minuten die in je agenda past.' },
      { heading: 'Hartgezondheid', description: 'Verbeter de gezondheid van hart en bloedvaten en verklein de kans op hartziekten.' },
      { heading: 'Energieboost', description: 'Meer energie in het dagelijks leven en minder vermoeidheid met regelmatige cardiotraining.' },
      { heading: 'Stressverlichting', description: 'Maak endorfine aan en verminder stress met energieke training.' },
    ],
  },
  classOptions: {
    title: 'Trainingsvormen',
    cards: [
      {
        ...cardio.classOptions.cards[0],
        title: 'Cardiotraining met z’n tweeën',
        subtitle: 'Train samen met je partner',
        description: 'Daag elkaar uit tot nieuwe grenzen, met persoonlijke coaching en motivatie voor jullie allebei.',
        features: ['Energieke sessies van 45 minuten', 'Vanaf €40-50 per persoon', 'Alle niveaus', 'Motiveer elkaar'],
        linkLabel: 'Bekijk duoprijzen',
      },
      {
        ...cardio.classOptions.cards[1],
        title: 'Privé cardiotraining',
        subtitle: 'Eén-op-één',
        description: 'Krijg een persoonlijk cardioprogramma, afgestemd op je niveau, je doelen en eventuele gezondheidsaandachtspunten.',
        features: ['Privésessies van 45 minuten', 'Vanaf €70 per les', 'Intensiteit op maat', 'Jouw tempo, jouw doelen'],
        linkLabel: 'Bekijk privéprijzen',
        featuredBadge: 'Intensiteit op maat',
      },
    ],
  },
  trainers: {
    title: 'Je coaches voor cardiotraining',
    cards: [
      { ...cardio.trainers.cards[0], cert: 'Cardio- en HIIT-instructeur', description: 'Meer dan 15 jaar ervaring in intensieve training en cardioconditie', imageAlt: 'Elif Arzu Ogan - cardio-instructeur' },
      { ...cardio.trainers.cards[1], cert: 'Instructeur metabole conditietraining', description: 'Meer dan 12 jaar ervaring in cardiotraining en coaching van uithoudingsvermogen', imageAlt: 'Göknur Dipli - cardiocoach' },
    ],
  },
  faq: [
    { question: 'Is cardiotraining geschikt voor beginners?', answer: 'Ja! We passen intensiteit en oefeningen aan je huidige niveau aan. Je begint waar je nu staat en bouwt op in je eigen tempo.' },
    { question: 'Hoeveel calorieën verbrand ik?', answer: 'Afhankelijk van de intensiteit en je lichaam verbrand je 300 tot 600 calorieën per sessie van 45 minuten, plus extra calorieën door het afterburn-effect.' },
    { question: 'Verlies ik spiermassa door cardiotraining?', answer: 'Nee! Onze cardioworkouts bevatten weerstandsoefeningen en zijn zo opgezet dat je spieren behoudt terwijl je vet verbrandt. Voor het beste resultaat raden we aan cardio te combineren met krachttraining.' },
    { question: 'Wat als ik gewrichtsklachten heb?', answer: 'We bieden weinig belastende varianten voor alle oefeningen. Vertel je instructeur over je klachten, dan krijg je alternatieven die je gewrichten sparen.' },
    { question: 'Hoe vaak moet ik cardio doen?', answer: 'Voor je algemene gezondheid is 2 à 3 keer per week uitstekend. Wil je afvallen, dan werken 3 tot 5 sessies per week in combinatie met goede voeding het best.' },
  ],
  finalCta: {
    ...cardio.finalCta,
    title: 'Klaar om je uithoudingsvermogen te vergroten?',
    subtitle: 'Doe mee met onze energieke cardiolessen bij PT 7',
    primaryLabel: 'Boek je sessie',
    secondaryLabel: 'Bekijk prijzen',
  },
};

export const workoutDetailsNl: WorkoutDetailData[] = [reformerNl, trxNl, functionalNl, cardioNl];
