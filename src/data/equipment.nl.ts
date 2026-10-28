import { studioStreet } from './business.ts';
import { equipmentProducts, type EquipmentProduct, type FAQItem } from './equipment.ts';

type EquipmentText = Pick<EquipmentProduct, 'name' | 'seo' | 'shortDesc' | 'features' | 'description' | 'specs' | 'faq'> & {
  imageAlts: string[];
};

const commonFAQ: FAQItem[] = [
  {
    question: 'Hoe kan ik deze apparatuur bestellen?',
    answer: 'Neem direct contact met ons op via e-mail of telefoon om te bestellen of meer informatie te vragen over onze pilatesapparatuur.',
  },
  {
    question: 'Wat is de levertijd en hoe wordt er geleverd?',
    answer: 'De levertijd is meestal 3 tot 8 weken, afhankelijk van voorraad en je locatie. Levering aan huis is mogelijk in heel Nederland.',
  },
  {
    question: 'Is er garantie?',
    answer: 'Op al onze apparatuur zit 2 jaar garantie op fabricagefouten en materialen.',
  },
  {
    question: 'Kan ik het na aankoop retourneren?',
    answer: 'Retourneren is na aankoop niet mogelijk, omdat elk product op bestelling wordt gemaakt.',
  },
];

const installTwoPeople: FAQItem = {
  question: 'Is montage inbegrepen?',
  answer: 'Wij verzorgen geen montage, maar de apparatuur wordt geleverd met duidelijke instructies en kan door twee personen in elkaar worden gezet.',
};

const nlText: Record<string, EquipmentText> = {
  reformer: {
    name: 'Pilates Reformer',
    seo: {
      title: 'Reformer pilatesapparatuur bij PT7 Amsterdam | In de studio',
      description: `De Reformer die we gebruiken in groeps- en privélessen bij PT7, ${studioStreet}, Museumplein. Specificaties van het apparaat in de studio en hoe je een les boekt.`,
      keywords: 'pilates reformer apparatuur, reformer pilates amsterdam, pilates apparaat museumplein, tower reformer studio',
    },
    imageAlts: [
      'Pilates Reformer - volledig zijaanzicht',
      'Pilates Reformer - andere hoek',
      'Pilates Reformer - oefening met beenveren',
      'Pilates Reformer - zijplank-oefening',
      'Pilates Reformer - detail van de banden',
      'Pilates Reformer - detail van de schouderblokken',
    ],
    shortDesc: 'De klassieke Pilates Reformer voor elk niveau. Soepel, stil en gebouwd voor een leven lang bewegen.',
    features: [
      'Frame van massief beukenhout',
      'Verstelbare voetstang en hoofdsteun',
      'Soepel glijdende slede met precisiewielen',
      'Complete set veren en banden',
      'Comfortabele, makkelijk te reinigen bekleding',
      'Inclusief jumpboard en box voor extra veelzijdigheid',
      'Afmetingen: 240 x 69 x 35 cm',
      'Gewicht: ca. 125 kg',
    ],
    description:
      'De Pilates Reformer is het populairste pilatesapparaat, ideaal voor zowel groepslessen als privésessies. Je kunt er een breed scala aan oefeningen op doen voor kracht, flexibiliteit en revalidatie. Gemaakt van hoogwaardige materialen voor duurzaamheid en comfort.',
    specs: [
      { label: 'Frame', value: 'Massief beukenhout' },
      { label: 'Slede', value: 'Hoogwaardig, soepel glijdend systeem' },
      { label: 'Voetstang', value: 'Verstelbaar, meerdere standen' },
      { label: 'Hoofdsteun', value: 'Verstelbaar, gestoffeerd' },
      { label: 'Bekleding', value: 'Comfortabel, makkelijk te reinigen' },
      { label: 'Veren', value: 'Complete set inbegrepen' },
      { label: 'Banden', value: 'Duurzaam, verstelbaar' },
      { label: 'Afmetingen', value: '240 x 69 x 35 cm' },
      { label: 'Accessoires', value: 'Box, jumpboard, banden' },
      { label: 'Garantie', value: '2 jaar op frame en bewegende delen' },
    ],
    faq: [
      commonFAQ[0],
      installTwoPeople,
      commonFAQ[1],
      {
        question: 'Kan ik de Reformer uitproberen voordat ik koop?',
        answer: 'Ja! Je bent welkom in onze studio in Amsterdam om de Reformer te proberen en deskundig advies te krijgen.',
      },
      ...commonFAQ.slice(2),
    ],
  },
  'tower-reformer': {
    name: 'Tower Reformer',
    seo: {
      title: 'Tower Reformer bij PT7 Amsterdam | Apparaat in de studio',
      description: `De Tower Reformer die we in lessen gebruiken bij PT7, ${studioStreet}, Museumplein, Amsterdam Oud-Zuid. Specificaties van het apparaat in de studio en hoe je een les boekt.`,
      keywords: 'tower reformer, tower reformer pilates, reformer met tower amsterdam, pilatesapparatuur museumplein',
    },
    imageAlts: [
      'Tower Reformer - volledig zijaanzicht',
      'Tower Reformer - rugstrekoefening',
      'Tower Reformer - zijwaartse rekoefening',
      'Tower Reformer - tower ingeklapt',
      'Tower Reformer - detail van tower en veren',
      'Tower Reformer - detail van de slede',
    ],
    shortDesc: 'Professionele reformer met geïntegreerde tower voor meer oefenmogelijkheden en veelzijdigheid.',
    features: [
      'Frame van massief beukenhout',
      'Geïntegreerde tower met bovenstangen',
      'Verstelbare voetstang en hoofdsteun',
      'Soepel glijdende slede met precisiewielen',
      'Uitgebreid verensysteem voor verticale weerstand',
      'Complete set veren, banden en kabels',
      'Comfortabele, makkelijk te reinigen bekleding',
      'Inclusief jumpboard en box',
      'Afmetingen: 240 x 69 x 200 cm (met tower)',
      'Gewicht: ca. 150 kg',
    ],
    description:
      'De Tower Reformer combineert de functies van een klassieke reformer met de veelzijdigheid van een tower, en biedt zo het grootste aantal pilatesoefeningen in één apparaat. Ideaal voor studio’s die ruimte efficiënt willen benutten en toch een compleet trainingsaanbod willen bieden.',
    specs: [
      { label: 'Frame', value: 'Massief beukenhout' },
      { label: 'Tower', value: 'Geïntegreerd verticaal frame met bovenstangen' },
      { label: 'Slede', value: 'Hoogwaardig, soepel glijdend systeem' },
      { label: 'Veren', value: 'Complete reformerset plus towerveren' },
      { label: 'Kabels', value: 'Professionele towerkabels' },
      { label: 'Afmetingen', value: '240 x 69 x 200 cm' },
      { label: 'Accessoires', value: 'Box, jumpboard, banden, push-through bar' },
      { label: 'Garantie', value: '2 jaar op frame en bewegende delen' },
    ],
    faq: [
      commonFAQ[0],
      installTwoPeople,
      commonFAQ[1],
      {
        question: 'Welke plafondhoogte is nodig?',
        answer: 'We raden een plafondhoogte van minimaal 220 cm aan om de tower comfortabel te gebruiken.',
      },
      ...commonFAQ.slice(2),
    ],
  },
  cadillac: {
    name: 'Combo Cadillac',
    seo: {
      title: 'Cadillac pilates Amsterdam | In de studio bij PT7',
      description: `De Cadillac (Trapeze Table) die we in lessen gebruiken bij PT7, ${studioStreet}, Museumplein. Specificaties van het apparaat in de studio en hoe je een les boekt.`,
      keywords: 'cadillac pilates amsterdam, trapeze table amsterdam, pilates cadillac museumplein',
    },
    imageAlts: [
      'Combo Cadillac - volledig zijaanzicht',
      'Combo Cadillac - zittende oefening',
      'Combo Cadillac - vooraanzicht',
      'Combo Cadillac - inversie-oefening',
      'Combo Cadillac - meegeleverde accessoires',
      'Combo Cadillac - oefening met beenveren',
    ],
    shortDesc: 'De ultieme pilates-Cadillac met eindeloze oefenmogelijkheden. Perfect voor gevorderde training en revalidatie.',
    features: [
      'Frame van massief beukenhout met overkapping',
      'Vier hoekpalen met veerbevestigingen',
      'Push-through bar en trapeze',
      'Roll-down bar en beenveren',
      'Complete set veren, banden en kabels',
      'Comfortabel gestoffeerd ligvlak',
      'Veiligheidsstang',
      'Afmetingen: 210 x 120 x 210 cm',
      'Gewicht: ca. 180 kg',
    ],
    description:
      'De Cadillac (ook wel Trapeze Table genoemd) is het veelzijdigste pilatesapparaat, met meer dan 100 verschillende oefeningen. Hij is ideaal voor revalidatie, gevorderde training en therapeutisch werk. Het bovenframe biedt bewegingsmogelijkheden die je op geen enkel ander apparaat vindt.',
    specs: [
      { label: 'Frame', value: 'Massief beukenhout met overkapping' },
      { label: 'Ligvlak', value: 'Comfortabel, gestoffeerd, makkelijk te reinigen' },
      { label: 'Veren', value: 'Complete set voor alle bevestigingspunten' },
      { label: 'Stangen', value: 'Push-through bar, trapezestang, roll-down bar' },
      { label: 'Accessoires', value: 'Beenveren, armveren, veiligheidsstang' },
      { label: 'Afmetingen', value: '210 x 120 x 210 cm' },
      { label: 'Garantie', value: '2 jaar op frame en bewegende delen' },
    ],
    faq: [
      commonFAQ[0],
      {
        question: 'Is montage inbegrepen?',
        answer: 'Wij verzorgen geen montage, maar de apparatuur wordt geleverd met duidelijke instructies en moet in elkaar worden gezet.',
      },
      commonFAQ[1],
      {
        question: 'Hoeveel ruimte heb je nodig voor de Cadillac?',
        answer: 'We raden minimaal 3 x 2,5 m vloeroppervlak en een plafondhoogte van minimaal 230 cm aan voor veilig gebruik.',
      },
      ...commonFAQ.slice(2),
    ],
  },
  'wunda-chair': {
    name: 'Wunda Chair',
    seo: {
      title: 'Wunda Chair bij PT7 Amsterdam | Apparaat in de studio',
      description: `De Wunda Chair die we in lessen gebruiken bij PT7, ${studioStreet}, Museumplein. Specificaties van het apparaat in de studio en hoe je een les boekt.`,
      keywords: 'wunda chair pilates, pilates chair amsterdam, pilatesapparatuur museumplein',
    },
    imageAlts: [
      'Wunda Chair - zijaanzicht',
      'Wunda Chair - vooraanzicht',
      'Wunda Chair - demonstratie van een oefening',
      'Wunda Chair - staande oefening',
    ],
    shortDesc:
      'De Wunda Chair is een klassiek pilatesapparaat voor een breed scala aan oefeningen die kracht, balans en stabiliteit verbeteren. Door het compacte ontwerp is hij ideaal voor thuis en in de studio.',
    features: [
      'Constructie van massief hout',
      'Verstelbare veerweerstand (4 veren)',
      'Comfortabel pedaal met antislipoppervlak',
      'Gesplitst pedaal voor eenzijdig werk',
      'Duurzame bekleding',
      'Compact formaat',
      'Afmetingen: 63 x 56 x 63 cm',
      'Gewicht: ca. 35 kg',
    ],
    description:
      'De Wunda Chair biedt meer dan 75 oefeningen in een compact ontwerp. Uitstekend voor het opbouwen van kracht, het verbeteren van balans en het ontwikkelen van functionele bewegingspatronen. Perfect voor studio’s met weinig ruimte of voor thuisgebruikers die een professioneel apparaat zoeken.',
    specs: [
      { label: 'Frame', value: 'Constructie van massief hout' },
      { label: 'Veren', value: '4 verstelbare veren' },
      { label: 'Pedaal', value: 'Antislipoppervlak, gesplitste optie' },
      { label: 'Bekleding', value: 'Professionele kwaliteit, makkelijk te reinigen' },
      { label: 'Afmetingen', value: '63 x 56 x 63 cm' },
      { label: 'Garantie', value: '2 jaar op frame en bewegende delen' },
    ],
    faq: [
      commonFAQ[0],
      {
        question: 'Is montage inbegrepen?',
        answer: 'De Wunda Chair wordt volledig gemonteerd en klaar voor gebruik geleverd. Montage is niet nodig.',
      },
      {
        question: 'Hoeveel ruimte heb ik nodig?',
        answer: 'De Wunda Chair neemt weinig ruimte in (63 x 56 cm). We raden minimaal 2 x 2 m ruimte aan voor comfortabel gebruik.',
      },
      commonFAQ[1],
      ...commonFAQ.slice(2),
    ],
  },
  'ladder-barrel': {
    name: 'Ladder Barrel',
    seo: {
      title: 'Ladder Barrel te koop | PT7 Pilates Amsterdam',
      description:
        'Koop een professionele pilates Ladder Barrel in Amsterdam. Specificaties en bestellen voor thuis of in de studio. Verkocht door PT7; niet gebruikt in onze lessen.',
      keywords: 'Ladder Barrel te koop, pilates barrel kopen Amsterdam, pilatesapparatuur kopen Nederland, professioneel pilatesapparaat',
    },
    imageAlts: [
      'Ladder Barrel - zijaanzicht',
      'Ladder Barrel - schuin aanzicht',
      'Ladder Barrel - vooraanzicht',
      'Ladder Barrel - demonstratie van een oefening',
      'Ladder Barrel - detailaanzicht',
      'Ladder Barrel - close-up van een detail',
    ],
    shortDesc:
      'Professionele Ladder Barrel te koop voor thuis of in de studio. Klassiek apparaat voor rekken, extensie van de wervelkolom en flexibiliteit.',
    features: [
      'Constructie van massief hout',
      'Verstelbare positie van de barrel met ladder',
      'Glad, gebogen barreloppervlak',
      'Antislipsporten',
      'Comfortabele bekleding',
      'Zware, stevige constructie',
      'Afmetingen: 90 x 75 x 90 cm',
      'Gewicht: ca. 40 kg',
    ],
    description:
      'De Ladder Barrel ondersteunt extensie van de wervelkolom, rekoefeningen en flexibiliteitswerk met een gebogen barrel en een ladder. Via PT7 te koop voor thuis of in de studio. We verkopen dit apparaat; het maakt geen deel uit van onze reguliere lessen aan het Museumplein.',
    specs: [
      { label: 'Frame', value: 'Constructie van massief hout' },
      { label: 'Barrel', value: 'Glad, gebogen oppervlak met vulling' },
      { label: 'Ladder', value: 'Verstelbare positie, antislipsporten' },
      { label: 'Bekleding', value: 'Professionele kwaliteit, makkelijk te reinigen' },
      { label: 'Afmetingen', value: '90 x 75 x 90 cm' },
      { label: 'Garantie', value: '2 jaar op frame en bewegende delen' },
    ],
    faq: [
      commonFAQ[0],
      {
        question: 'Is montage inbegrepen?',
        answer: 'De Ladder Barrel wordt gemonteerd en klaar voor gebruik geleverd. Montage is niet nodig.',
      },
      {
        question: 'Hoeveel ruimte is nodig?',
        answer: 'De Ladder Barrel heeft ongeveer 1,5 x 1,5 m vloeroppervlak nodig voor veilig gebruik.',
      },
      {
        question: 'Gebruiken jullie de Ladder Barrel in de lessen van PT7?',
        answer:
          'Nee. We verkopen de Ladder Barrel voor gebruik thuis of in een studio. In onze studio aan het Museumplein trainen cliënten op Reformers, de Tower Reformer, de Cadillac, de Wunda Chair en vergelijkbare apparaten, niet op de Ladder Barrel.',
      },
      commonFAQ[1],
      ...commonFAQ.slice(2),
    ],
  },
};

export const equipmentProductsNl: EquipmentProduct[] = equipmentProducts.map((product) => {
  const text = nlText[product.slug];
  if (!text) throw new Error(`Missing Dutch copy for equipment "${product.slug}"`);
  const { imageAlts, ...rest } = text;
  return {
    ...product,
    ...rest,
    images: product.images.map((image, i) => ({ ...image, alt: imageAlts[i] ?? image.alt })),
  };
});
