import type { DeepStringify } from '../../locale';
import type { EnPrivacy } from '../en/privacy';

export const nlPrivacy: DeepStringify<EnPrivacy> = {
  seo: {
    title: 'Privacybeleid | PT7 Pilates Amsterdam',
    description:
      'Hoe PT7 Amsterdam cookies, analytics, advertenties, boekingswidgets en contactgegevens gebruikt. AVG-informatie voor bezoekers van pt7.nl.',
    keywords: 'PT7 privacy, cookiebeleid Amsterdam, AVG, GDPR',
    ogDescription: 'Hoe we cookies, analytics, advertenties, boekingswidgets en contactgegevens gebruiken op pt7.nl.',
  },
  breadcrumb: 'Privacy',
  title: 'Privacybeleid',
  updated:
    'Laatst bijgewerkt op 27 augustus 2026. PT7 Amsterdam ({{address}}) is verwerkingsverantwoordelijke voor deze website.',
  who: {
    title: 'Wie we zijn',
    text: 'PT7 beheert <site>www.pt7.nl</site>. Contact: <email>info@pt7.nl</email> · <phone>+31 685 162693</phone>.',
  },
  what: {
    title: 'Wat deze site doet',
    text: 'Dit is een marketingsite. Lessen boeken, inloggen en betalen verloopt via MindBody (Healcode / Branded Web). We hebben op dit domein geen eigen ledendatabase.',
  },
  cookies: {
    title: 'Cookies en vergelijkbare technieken',
    intro:
      'Noodzakelijke opslag zorgt dat de site werkt (bijvoorbeeld je cookiekeuze). Andere tags laden pas nadat je ze kiest in de banner of via Cookie-instellingen.',
    statistics:
      '<strong>Statistiek</strong>: alleen Google Analytics 4. Gebruikt om te begrijpen hoe pagina’s worden gebruikt. Laadt geen Google Tag Manager, Google Ads of Meta.',
    marketing:
      '<strong>Marketing</strong>: Google Tag Manager, Google Ads en Meta Pixel. Gebruikt voor het meten van advertenties en remarketing.',
    change:
      'Je kunt dit altijd aanpassen via Cookie-instellingen in de footer. Browsers kunnen ook een Global Privacy Control-signaal sturen; we slaan op deze site toch een uitdrukkelijke keuze op.',
  },
  thirdParties: {
    title: 'Overige Google-diensten en derde partijen',
    fonts: '<strong>Lettertypen</strong> worden op deze site zelf gehost. We laden geen Google Fonts.',
    maps:
      '<strong>Google Maps</strong> op de homepage laadt alleen als je statistiek of marketing hebt toegestaan, of als je op Kaart tonen tikt. Een externe Maps-link openen is een gewone navigatie naar Google.',
    mindbody:
      '<strong>MindBody</strong>-scripts zorgen voor Inloggen | Registreren, Nu kopen, het rooster en inschrijven voor de academy. Die verzoeken gaan naar MindBody, zodat je kunt boeken en betalen. Op die verwerking zijn hun privacyvoorwaarden van toepassing.',
  },
  contact: {
    title: 'Contactgegevens',
    text: 'E-mail, telefoon en WhatsApp start je zelf. Aanvraagformulieren voor de academy zijn MindBody-widgets. We gebruiken die informatie om te antwoorden en om lessen te verzorgen, niet om lijsten te verkopen.',
  },
  legal: {
    title: 'Rechtsgronden (AVG)',
    text: 'Toestemming voor statistiek- en marketingcookies. Overeenkomst / gerechtvaardigd belang voor boekingen en het beantwoorden van vragen. Wettelijke verplichting waar fiscale of boekhoudregels vereisen dat we aankopen bewaren (verwerkt in MindBody).',
  },
  retention: {
    title: 'Bewaartermijnen en rechten',
    text: 'Je cookiekeuze blijft in je browser tot je sitegegevens wist of je keuze wijzigt. Bewaartermijnen voor analytics en advertenties volgen de instellingen in die accounts bij Google en Meta. Je kunt om inzage, correctie, verwijdering of beperking vragen via <email>info@pt7.nl</email>. Je kunt een klacht indienen bij de Autoriteit Persoonsgegevens.',
  },
  children: {
    title: 'Kinderen',
    text: 'Deze site is niet bedoeld voor kinderen jonger dan 16 jaar.',
  },
  links: {
    pricing: 'Prijzen',
    book: 'Boeken',
    cookies: 'Cookie-instellingen',
  },
};
