import type { DeepStringify } from '../../locale';
import type { EnIntro } from '../en/intro';

export const nlIntro: DeepStringify<EnIntro> = {
  seo: {
    title: 'Introductiepakket: {{classes}} groepslessen voor {{price}} | PT 7 Pilates Amsterdam',
    description:
      'Nieuwe klanten bij PT 7 Museumplein: {{classes}} groepslessen voor {{price}}. Maximaal {{groupMax}} personen, {{minutes}} minuten. Geldig {{weeks}} weken. Online kopen.',
    keywords:
      'introductiepakket pilates amsterdam, proefles pilates amsterdam, pilates proefpakket, nieuwe klant pilates amsterdam, reformer pilates introductie museumplein',
    ogTitle: '{{classes}} groepslessen voor {{price}} | PT 7 Pilates',
    ogDescription:
      'Alleen voor nieuwe klanten. {{classes}} groepslessen aan het Museumplein voor {{price}}, geldig {{weeks}} weken.',
    analyticsTitle: 'Introductieaanbod | PT 7 Pilates Amsterdam',
  },
  breadcrumb: 'Introductie',
  imageAlt: 'Instructeur begeleidt een Reformer-klant bij PT 7 Amsterdam',
  badges: {
    clients: 'Alleen nieuwe klanten',
    weeks: 'Geldig {{weeks}} weken',
    size: 'Max. {{groupMax}}',
    length: '{{minutes}} min',
  },
  hero: {
    kicker: 'Nieuwe klanten',
    title: '{{classes}} groepslessen voor {{price}}',
    lead: 'Een eerste pakket voor de studio aan het Museumplein. Kleine groepen, maximaal {{groupMax}}. Koop het pakket en kies daarna een les in het rooster.',
    fineprint: 'Alleen voor nieuwe klanten. Geldig {{weeks}} weken vanaf aankoop.',
  },
  buy: 'Koop het pakket',
  pricingLink: 'Alle prijzen',
  included: {
    title: 'Dit zit erin',
    classes: '{{classes}} groepslessen',
    size: 'Maximaal {{groupMax}} personen',
    length: 'Sessies van {{minutes}} minuten',
    formats: 'Reformer, TRX en kracht',
    place: '{{street}}, Museumplein',
  },
  steps: {
    title: 'Zo werkt het',
    buyTitle: 'Koop het pakket',
    buyText: 'Betaal {{price}} online. De lessen komen op het account waarmee je afrekent.',
    bookTitle: 'Kies een les',
    bookText: 'Open het rooster en reserveer een groepsles.',
    arriveTitle: 'Kom langs',
    arriveText: 'De studio zit aan de {{street}}, tegenover het Stedelijk Museum.',
  },
  scheduleCta: 'Bekijk het rooster',
  faq: {
    title: 'Vragen',
    who: {
      question: 'Wie kan dit pakket kopen?',
      answer:
        'Alleen nieuwe klanten. Train je al bij PT 7, gebruik dan de gewone lessenkaarten en abonnementen.',
    },
    valid: {
      question: 'Hoe lang is het geldig?',
      answer:
        '{{weeks}} weken vanaf de aankoopdatum. Dat is dezelfde regel als bij andere lessenkaarten: het aantal weken is gelijk aan het aantal lessen.',
    },
    which: {
      question: 'Voor welke lessen is het?',
      answer:
        'Groepslessen in het rooster: Reformer, TRX en kracht. Privé, duo en trio hebben eigen prijzen.',
    },
    size: {
      question: 'Hoe groot is de groep?',
      answer: 'Maximaal {{groupMax}} personen, zodat je tijdens de les correcties krijgt.',
    },
    after: {
      question: 'Wat doe ik na het betalen?',
      answer: 'Reserveer een groepsles in het rooster. De lessen staan op het account waarmee je hebt afgerekend.',
    },
  },
  close: {
    title: 'Begin met {{classes}} lessen',
    text: 'Alleen voor nieuwe klanten. Abonnementen en privésessies staan bij de prijzen.',
  },
};
