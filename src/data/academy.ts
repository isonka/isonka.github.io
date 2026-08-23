export const ACADEMY_ENROLL_WIDGET =
  '<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100058" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Enroll"></healcode-widget>';

export const ACADEMY_INSTALLMENTS_WIDGET =
  '<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="123605" data-mb-site-id="5741736" data-service-id="100065" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Enroll with 3 Installments"></healcode-widget>';

export const ACADEMY_INQUIRY_WIDGET =
  '<healcode-widget data-type="registrations" data-widget-partner="object" data-widget-id="2b154644c036" data-widget-version="0"></healcode-widget>';

export const ACADEMY_URL_EN = 'https://www.pt7.nl/academy/';
export const ACADEMY_URL_NL = 'https://www.pt7.nl/academy/nl/';

export const COURSE_TITLE = 'Reformer Pilates Instructor Course';
export const MAT_COURSE_TITLE = 'Mat & Trapeze Table Instructor Course';
export const COURSE_TITLE_NL = 'Reformer Pilates Instructeurscursus';
export const MAT_COURSE_TITLE_NL = 'Mat & Trapeze Table Instructeurscursus';

export const ITTAP_LOGO = '/assets/images/pma-ittap-reformer-approved-2026.png';
export const PMA_LOGO = '/assets/images/pma-logo-black.png';
export const ITTAP_LOGO_ALT =
  'ITTAP Approved Reformer Pilates Instructor Course 2026, Pilates Method Alliance (PMA)';
export const PMA_LOGO_ALT = 'Pilates Method Alliance (PMA)';
export const PMA_URL = 'https://www.pilatesmethodalliance.org/';
export const PMA_ITTAP_URL =
  'https://www.pilatesmethodalliance.org/pma-international-teacher-trainer-accreditation-for-pilates-ittap-reformer-program';
export const PMA_NAME = 'Pilates Method Alliance (PMA)';

export const lectureHours = '12:00 to 18:00';
export const lectureHoursNl = '12:00 tot 18:00';
export const ANATOMY_COURSE_FEE = '€500';
export const MAT_COURSE_TOTAL_HOURS = 125;

export const termSchedule2026 = [
  { dates: '12–13 September 2026', datesNl: '12–13 september 2026', module: 'Pilates Introduction & Anatomy', moduleNl: 'Pilates Introductie & Anatomie' },
  { dates: '26–27 September 2026', datesNl: '26–27 september 2026', module: 'Reformer 1', moduleNl: 'Reformer 1' },
  { dates: '17–18 October 2026', datesNl: '17–18 oktober 2026', module: 'Reformer 2', moduleNl: 'Reformer 2' },
  { dates: '7–8 November 2026', datesNl: '7–8 november 2026', module: 'Reformer 3', moduleNl: 'Reformer 3' },
];

export const termSchedule2027 = [
  { dates: '13–14 March 2027', datesNl: '13–14 maart 2027', module: 'Pilates Introduction & Anatomy', moduleNl: 'Pilates Introductie & Anatomie' },
  { dates: '3–4 April 2027', datesNl: '3–4 april 2027', module: 'Reformer 1', moduleNl: 'Reformer 1' },
  { dates: '24–25 April 2027', datesNl: '24–25 april 2027', module: 'Reformer 2', moduleNl: 'Reformer 2' },
  { dates: '15–16 May 2027', datesNl: '15–16 mei 2027', module: 'Reformer 3', moduleNl: 'Reformer 3' },
];

export const matTrapezeSchedule = [
  { dates: '21–22 November 2026', datesNl: '21–22 november 2026', module: 'Mat 1', moduleNl: 'Mat 1' },
  { dates: '12–13 December 2026', datesNl: '12–13 december 2026', module: 'Trapeze Table 1', moduleNl: 'Trapeze Table 1' },
  { dates: '9–10 January 2027', datesNl: '9–10 januari 2027', module: 'Mat 2 & Trapeze Table 2', moduleNl: 'Mat 2 & Trapeze Table 2' },
  { dates: '30–31 January 2027', datesNl: '30–31 januari 2027', module: 'Mat 3 & Trapeze Table 3', moduleNl: 'Mat 3 & Trapeze Table 3' },
];

export type AcademyScheduleItem = {
  dates: string;
  datesNl: string;
  module: string;
  moduleNl: string;
};

export const formatTermSchedule = (schedule: AcademyScheduleItem[], useNl = false) =>
  schedule.map((item) => `${useNl ? item.datesNl : item.dates} (${useNl ? item.moduleNl : item.module})`).join('; ');

export const curriculumTopics = [
  'History of Pilates',
  'Functional Anatomy',
  'Movement Principles',
  'Postural Patterns',
  'Breathing Anatomy',
  'Code of Ethics',
  'Class Planning & Preparation',
  'Contraindications',
  'Reformer Level 1 Exercises',
  'Reformer Level 2 Exercises',
  'Reformer Level 3 Exercises',
  'Regressions, Progressions, Modifications, and Contraindications for all exercises',
];

export const curriculumTopicsNl = [
  'Geschiedenis van Pilates',
  'Functionele anatomie',
  'Bewegingsprincipes',
  'Houdingspatronen',
  'Ademhalingsanatomie',
  'Gedragscode',
  'Lesplanning & voorbereiding',
  'Contra-indicaties',
  'Reformer Level 1 oefeningen',
  'Reformer Level 2 oefeningen',
  'Reformer Level 3 oefeningen',
  'Regressies, progressies, modificaties en contra-indicaties voor alle oefeningen',
];

export const matTrapezeIncludes = [
  '48 hours of in-person technical training',
  'Comprehensive Mat Pilates curriculum (Mat 1–3)',
  'Trapeze Table (Cadillac) training (Trapeze Table 1–3)',
  '2 exams (theoretical & practical)',
  'One-on-one final assessment',
  'PT7 Academy completion certificate',
];

export const matTrapezeIncludesNl = [
  '48 uur technische training op locatie',
  'Uitgebreid Mat Pilates curriculum (Mat 1–3)',
  'Trapeze Table (Cadillac) training (Trapeze Table 1–3)',
  '2 examens (theorie & praktijk)',
  'Individuele eindbeoordeling',
  'PT7 Academy certificaat',
];

export const trainingBreakdown = [
  { hours: '85 hours', hoursNl: '85 uur', label: 'Lectures & Theory', labelNl: 'Colleges & theorie' },
  { hours: '60 hours', hoursNl: '60 uur', label: 'Observation', labelNl: 'Observatie' },
  { hours: '60 hours', hoursNl: '60 uur', label: 'Self Practice', labelNl: 'Zelfpraktijk' },
  { hours: '40 hours', hoursNl: '40 uur', label: 'Teaching Practice', labelNl: 'Lesgeven in de praktijk' },
  {
    hours: '40 hours',
    hoursNl: '40 uur',
    label: 'Private or Group Sessions with Master Trainer',
    labelNl: 'Private of groepssessies met master trainer',
  },
  {
    hours: '10 hours',
    hoursNl: '10 uur',
    label: 'Assisted Teaching with Master Trainer',
    labelNl: 'Begeleid lesgeven met master trainer',
  },
  {
    hours: '5 hours',
    hoursNl: '5 uur',
    label: 'QTT Observation of Student Teaching & Assessment',
    labelNl: 'QTT-observatie van studentlessen & assessment',
  },
];

export const matTrapezeBreakdown = [
  {
    hours: '48 hours',
    hoursNl: '48 uur',
    label: 'In-person technical training (lectures)',
    labelNl: 'Technische training op locatie (colleges)',
  },
  { hours: '20 hours', hoursNl: '20 uur', label: 'Observation', labelNl: 'Observatie' },
  { hours: '20 hours', hoursNl: '20 uur', label: 'Self Practice', labelNl: 'Zelfpraktijk' },
  { hours: '15 hours', hoursNl: '15 uur', label: 'Student Teaching', labelNl: 'Studentlesgeven' },
  {
    hours: '15 hours',
    hoursNl: '15 uur',
    label: 'Private or Group Sessions with QTT',
    labelNl: 'Private of groepssessies met QTT',
  },
  {
    hours: '5 hours',
    hoursNl: '5 uur',
    label: 'Assisted Teaching with QTT',
    labelNl: 'Begeleid lesgeven met QTT',
  },
  {
    hours: '2 hours',
    hoursNl: '2 uur',
    label: 'QTT Observation of Student Teaching',
    labelNl: 'QTT-observatie van studentlessen',
  },
];

export type AcademyGraduate = {
  name: string;
  image: string;
  href?: string;
  outcomeEn: string;
  outcomeNl: string;
};

export const academyGraduates: AcademyGraduate[] = [
  {
    name: 'E. Gamze Karadağ',
    image: '/assets/images/gamze.webp',
    href: '/trainer/gamze/',
    outcomeEn: 'PT7 Academy graduate · Instructor at PT Studio 7',
    outcomeNl: 'Afgestudeerd bij PT7 Academy · Instructeur bij PT Studio 7',
  },
  {
    name: 'Kelly Tin',
    image: '/assets/images/kelly.webp',
    href: '/trainer/kelly/',
    outcomeEn: 'PT7 Academy graduate · Instructor at PT Studio 7',
    outcomeNl: 'Afgestudeerd bij PT7 Academy · Instructeur bij PT Studio 7',
  },
  {
    name: 'Nisan Atalay',
    image: '/assets/images/nisan.webp',
    href: '/trainer/nisan/',
    outcomeEn: 'PT7 Academy graduate · Instructor at PT Studio 7',
    outcomeNl: 'Afgestudeerd bij PT7 Academy · Instructeur bij PT Studio 7',
  },
  {
    name: 'Lal Avgen',
    image: '/assets/images/lal.webp',
    href: '/trainer/lal/',
    outcomeEn: 'PT7 Academy graduate · Instructor at PT Studio 7',
    outcomeNl: 'Afgestudeerd bij PT7 Academy · Instructeur bij PT Studio 7',
  },
  {
    name: 'Gülce Koç',
    image: '/assets/images/gulce.webp',
    href: '/trainer/gulce/',
    outcomeEn: 'PT7 Academy graduate · Instructor at PT Studio 7',
    outcomeNl: 'Afgestudeerd bij PT7 Academy · Instructeur bij PT Studio 7',
  },
];
