import type { DeepStringify } from '../../locale';
import type { EnTrainee } from '../en/trainee';

export const nlTrainee: DeepStringify<EnTrainee> = {
  seo: {
    title: 'Trainee-omgeving | PT7 Academy',
    description: 'Log in op de trainee-omgeving van de PT7 Academy.',
    keywords: 'PT7 Academy, trainee',
  },
  kicker: 'PT7 Academy',
  loading: 'Laden…',
  unavailable: 'De trainee-omgeving is nu niet beschikbaar. Probeer het later opnieuw.',
  retry: 'Opnieuw proberen',
  signIn: {
    title: 'Inloggen voor trainees',
    lead: 'Gebruik het e-mailadres en wachtwoord dat je van de academy hebt gekregen.',
    email: 'E-mail',
    password: 'Wachtwoord',
    submit: 'Inloggen',
    busy: 'Bezig met inloggen…',
    errors: {
      InvalidCredentials: 'Het e-mailadres of wachtwoord klopt niet.',
      AccountLocked: 'Te veel pogingen. Je account is een tijdje geblokkeerd; probeer het later opnieuw.',
      TooManyRequests: 'Te veel pogingen. Wacht even en probeer het opnieuw.',
      NotATrainee: 'Dit inloggen is voor trainees. Medewerkers gebruiken de academy-admin.',
      other: 'Inloggen is niet gelukt. Probeer het opnieuw.',
    },
  },
  password: {
    title: 'Kies een nieuw wachtwoord',
    lead: 'Vervang eerst het wachtwoord dat je hebt gekregen door een eigen wachtwoord.',
    current: 'Huidig wachtwoord',
    next: 'Nieuw wachtwoord',
    confirm: 'Herhaal het nieuwe wachtwoord',
    rules: 'Minstens 12 tekens, met een hoofdletter, een kleine letter en een cijfer.',
    mismatch: 'De twee nieuwe wachtwoorden zijn niet gelijk.',
    submit: 'Wachtwoord opslaan',
    busy: 'Opslaan…',
    other: 'Het wachtwoord opslaan is niet gelukt. Probeer het opnieuw.',
  },
  overview: {
    greeting: 'Hallo {{name}}',
    signOut: 'Uitloggen',
    notLinked: 'Je login is nog niet gekoppeld aan een trainee-dossier. Neem contact op met de academy.',
    certificate: {
      towards: 'Op weg naar je certificaat',
      issued: 'Je certificaat',
      awarded: 'Gefeliciteerd! Je hebt het {{credential}} behaald ({{number}}).',
      done: 'Gedaan',
      notYet: 'Nog niet',
    },
    exams: {
      title: 'Je examens',
      empty: 'Je examenresultaten verschijnen hier zodra je beoordeling klaar is.',
      attempt: 'Poging {{n}}',
      passed: 'Geslaagd',
      notPassed: 'Niet geslaagd',
      score: 'Score {{score}}',
    },
  },
};
