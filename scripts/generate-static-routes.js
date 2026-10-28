import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const manifestPath = path.join(projectRoot, '.routes-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('✗ .routes-manifest.json not found — run `npm run routes:manifest` first.');
  process.exit(1);
}

const { baseUrl, shellPaths, canonicalOverrides, shellMeta } = JSON.parse(
  fs.readFileSync(manifestPath, 'utf-8'),
);

const fixedPageMeta = {
  '/nl/': {
    title: 'PT7 Pilates Amsterdam | Reformer lessen bij Museumplein',
    description: 'PT7 is een boutique pilatesstudio aan het Museumplein (Amsterdam Zuid): Reformer pilates, kleine groepen (max. 5) en private sessies. Pilateslessen bij jou in de buurt in Oud-Zuid — online boeken.',
  },
  '/classpass-offer/': {
    title: 'ClassPass Members: Exclusive Offer | PT7 Pilates Amsterdam',
    description: 'Special offer for ClassPass members. Save money and get priority booking when you join PT7 directly. Same great Pilates classes, better value.',
  },
  '/pricing/': {
    title: 'Pilates Prices Amsterdam Oud-Zuid | From €50 Intro | PT7',
    description: 'Pilates prices at Museumplein (Amsterdam Zuid): intro pack 3 group classes for €50, then from €28/class (max 5). Memberships, privates, Reformer, TRX & strength. Book online.',
  },
  '/pricing/nl/': {
    title: 'Hoeveel kost pilates Amsterdam Oud-Zuid | PT7',
    description: 'Pilates prijzen aan het Museumplein (Amsterdam Zuid): introductiepakket 3 groepslessen voor €50, daarna vanaf €28/les (max. 5). Abonnementen, privé, Reformer, TRX & kracht. Online boeken.',
  },
  '/intro/': {
    title: 'Intro pack: 3 group classes for €50 | PT7 Pilates Amsterdam',
    description: 'New clients at PT7 Museumplein: 3 small-group classes for €50. Max 5 people, 45 minutes. Valid 3 weeks. Buy online.',
  },
  '/intro/nl/': {
    title: 'Introductiepakket: 3 groepslessen voor €50 | PT7 Pilates Amsterdam',
    description: 'Nieuwe klanten bij PT7 Museumplein: 3 groepslessen voor €50. Maximaal 5 personen, 45 minuten. Geldig 3 weken. Online kopen.',
  },
  '/academy/': {
    title: 'Reformer Pilates Instructor Course Amsterdam | PT7 Academy',
    description: 'Reformer Pilates instructor course and teacher training in Amsterdam. 300-hour Reformer Pilates instructor course (PMA ITTAP approved), Mat Pilates track, weekend schedule for career changers. Course fee from €2,000 + VAT.',
  },
  '/academy/nl/': {
    title: 'Pilates Docentenopleiding Amsterdam | Reformer | PT7 Academy',
    description: 'Reformer pilates opleiding Amsterdam en pilates docentenopleiding bij Museumplein. 300 uur Reformer instructeurscursus (PMA ITTAP goedgekeurd) plus Mat & Trapeze Table. Weekendrooster. Lessen in het Engels. Vanaf €2.000 + BTW.',
  },
  '/healthcare-providers/': {
    title: 'Pilates for Rehabilitation Amsterdam | For Healthcare Providers | PT7 Pilates',
    description: 'Physiotherapists and healthcare providers: refer your clients to PT7 for post-rehab Pilates and functional training. Small groups, expert instructors.',
  },
  '/corporate/': {
    title: 'Corporate Pilates Amsterdam | Bedrijfsfitness | PT7 Pilates',
    description: 'Corporate Pilates and bedrijfsfitness Amsterdam for teams. Boutique Reformer at Museumplein or on-site mat sessions. Tax-friendly WKR options.',
  },
  '/privacy/': {
    title: 'Privacy Policy | PT7 Pilates Amsterdam',
    description: 'How PT7 Amsterdam uses cookies, analytics, advertising, booking widgets, and contact data.',
  },
  '/prenatal-pilates-amsterdam/': {
    title: 'Prenatal & Pregnancy Pilates Amsterdam | Private Reformer | PT7 Pilates',
    description: 'Private prenatal Reformer Pilates at Museumplein (Oud-Zuid). 45-minute 1:1 sessions, trimester adaptations, pelvic floor focus. Train with Elif or Göknur through pregnancy.',
  },
  '/pregnancy-pilates-amsterdam/': {
    title: 'Pregnancy Pilates Amsterdam | PT7 Pilates',
    description: 'Pregnancy-safe Reformer Pilates in Amsterdam Museumplein. Redirects to our prenatal private sessions page.',
  },
  '/reformer-pilates-amsterdam/': {
    title: 'Reformer Pilates Amsterdam Museumplein | PT7 Pilates',
    description: 'Reformer Pilates at Museumplein Amsterdam. Small groups max 5, private sessions, full apparatus studio in Oud-Zuid. First visit coaching for beginners and expats.',
  },
  '/private-pilates-amsterdam/': {
    title: 'Private Reformer Pilates Sessions Amsterdam | PT7 Pilates',
    description: 'One-on-one private Reformer Pilates at Museumplein. Personalised training with certified instructors. Duo & trio options.',
  },
  '/trx-training-amsterdam/': {
    title: 'TRX Training Amsterdam Museumplein | PT7 Pilates',
    description: 'Professional TRX suspension training at Museumplein. Functional strength, core stability, small groups & private sessions.',
  },
  '/strength-training-amsterdam/': {
    title: 'Strength Training Amsterdam | PT7 Pilates Museumplein',
    description: 'Personal strength training at Museumplein. Small groups (max 5) and private sessions with expert trainers.',
  },
  '/schedule/': {
    title: 'Pilates Classes Near Me Amsterdam | Book Today | PT7 Pilates',
    description: 'Book Pilates classes near you at Museumplein (Amsterdam Zuid). Live schedule for Reformer, TRX & strength — small groups (max 5) and privates at Van Baerlestraat 76C. Reserve online today.',
  },
  '/schedule/nl/': {
    title: 'Pilateslessen bij jou in de buurt Amsterdam | Boek vandaag | PT7 Pilates',
    description: 'Boek pilateslessen bij jou in de buurt aan het Museumplein (Amsterdam Zuid). Live rooster voor Reformer, TRX & kracht — kleine groepen (max. 5) en privé aan de Van Baerlestraat 76C. Reserveer vandaag online.',
  },
  '/instructors/': {
    title: 'Our Instructors | PT7 Pilates Amsterdam',
    description: 'Meet our expert certified Pilates instructors. 10+ years experience, specialized in Reformer Pilates, pregnancy Pilates, and strength training.',
  },
  '/equipment/': {
    title: 'Buy Pilates Equipment Amsterdam | Reformers & More | PT7 Pilates',
    description: 'Buy Pilates equipment in Amsterdam: Reformer, Tower Reformer, Cadillac, Wunda Chair, and Ladder Barrel with specs and ordering support.',
  },
  '/blog/': {
    title: 'Blog | PT7 Pilates Amsterdam',
    description: 'Pilates tips, fitness advice, and wellness insights from Amsterdam\'s boutique Pilates studio at Museumplein.',
  },
  '/workouts/reformer-pilates/': {
    title: 'Reformer Pilates Amsterdam | Classes Near Museumplein | PT7 Pilates',
    description: 'Reformer Pilates classes in Amsterdam Zuid at Museumplein: small groups (max 5) and private sessions. Core strength, flexibility, and posture — book online at PT7.',
  },
  '/workouts/trx/': {
    title: 'TRX Training | PT7 Pilates Amsterdam',
    description: 'TRX suspension training at Museumplein. Build strength and stability with expert coaching in small groups.',
  },
  '/workouts/functional-training/': {
    title: 'Nike Strength Training | PT7 Pilates Amsterdam',
    description: 'Nike Strength Training at Museumplein. Half rack, Olympic barbell, premium dumbbells. Expert one-on-one training.',
  },
  '/workouts/cardio/': {
    title: 'Cardio Training | PT7 Pilates Amsterdam',
    description: 'Cardio training at Museumplein. Concept2 rower and more. Build endurance with expert coaching.',
  },
  '/equipment/reformer/': {
    title: 'Buy Pilates Reformer Amsterdam | Studio-Quality for Sale | PT7 Pilates',
    description: 'Buy a professional Pilates Reformer in Amsterdam — equipment for sale, not class bookings. Beech wood frame, smooth carriage, accessories included. Studio-quality with delivery in the Netherlands.',
  },
  '/equipment/tower-reformer/': {
    title: 'Tower Reformer | PT7 Pilates Amsterdam',
    description: 'Tower Reformer Pilates at PT7 Museumplein. Versatile equipment for full-body training. Expert instructors, small groups.',
  },
  '/equipment/cadillac/': {
    title: 'Cadillac Pilates | PT7 Pilates Amsterdam',
    description: 'Pilates Cadillac at PT7 Museumplein. Classic apparatus for deep core work and rehabilitation. Certified instructors.',
  },
  '/equipment/wunda-chair/': {
    title: 'Wunda Chair | PT7 Pilates Amsterdam',
    description: 'Wunda Chair Pilates at PT7 Museumplein. Challenging balance and strength apparatus with expert guidance.',
  },
  '/equipment/ladder-barrel/': {
    title: 'Ladder Barrel for Sale | PT7 Pilates Amsterdam',
    description: 'Professional Pilates Ladder Barrel for sale. Specs and ordering for home or studio use. Sold by PT7; not used in our client training sessions.',
  },
  '/trainer/elif/': {
    title: 'Elif Arzu Ogan | Owner & Head Instructor | PT7 Pilates',
    description: 'Elif Arzu Ogan, owner and head instructor at PT7 Amsterdam. 15+ years of Pilates expertise at Museumplein. Book a session with Elif.',
  },
  '/trainer/gokben/': {
    title: 'Gökben Öztekin | Pilates Instructor | PT7 Pilates Amsterdam',
    description: 'Gökben Öztekin, certified Pilates instructor at PT7 Museumplein Amsterdam. Expert in Reformer Pilates and small group classes.',
  },
  '/trainer/goknur/': {
    title: 'Göknur Dipli | Pilates Instructor | PT7 Pilates Amsterdam',
    description: 'Göknur Dipli, certified Pilates instructor at PT7 Museumplein Amsterdam. Specialist in Reformer Pilates and one-on-one training.',
  },
  '/trainer/gulce/': {
    title: 'Gülce Koç | Pilates Instructor | PT7 Pilates Amsterdam',
    description: 'Gülce Koç, certified Pilates instructor at PT7 Museumplein Amsterdam. Expert guidance in Reformer Pilates and functional training.',
  },
  '/trainer/lal/': {
    title: 'Lal Avgen | Pilates Instructor | PT7 Pilates Amsterdam',
    description: 'Lal Avgen, certified Pilates instructor at PT7 Museumplein Amsterdam. Specialised in Reformer Pilates and strength training.',
  },
  '/trainer/nisan/': {
    title: 'Nisan Atalay | Pilates Instructor | PT7 Pilates Amsterdam',
    description: 'Nisan Atalay, certified Pilates instructor at PT7 Museumplein Amsterdam. Expert in Reformer Pilates, TRX, and small group classes.',
  },
  '/trainer/kelly/': {
    title: 'Kelly Tin | Pilates Instructor | PT7 Pilates Amsterdam',
    description: 'Kelly Tin, certified Reformer Pilates instructor at PT7 Museumplein Amsterdam. English- and Dutch-speaking coach with a strength and HIIT background.',
  },
  '/trainer/gamze/': {
    title: 'E. Gamze Karadağ | Pilates Instructor | PT7 Pilates Amsterdam',
    description: 'E. Gamze Karadağ, certified Reformer Pilates instructor at PT7 Museumplein Amsterdam. Yoga background and PT7 Academy graduate.',
  },
};

const routeMeta = { ...fixedPageMeta, ...shellMeta };

const staleMetaKeys = Object.keys(fixedPageMeta).filter((key) => !shellPaths.includes(key));
if (staleMetaKeys.length) {
  console.warn(`⚠ Meta defined for routes that no longer exist: ${staleMetaKeys.join(', ')}`);
}

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

console.log('Generating static route files for GitHub Pages...\n');

const shellRoutes = shellPaths.filter((route) => route !== '/');

for (const route of shellRoutes) {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });

  let html = indexHtml;
  const meta = routeMeta[route];
  const canonicalUrl = canonicalOverrides[route] || `${baseUrl}${route}`;

  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*" \/>/,
    `<meta name="twitter:url" content="${canonicalUrl}" />`,
  );

  // Redirect shells: drop the homepage's hreflang and fallback body, and redirect non-JS crawlers.
  if (canonicalOverrides[route]) {
    html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '');
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      (tag) => `${tag}\n    <meta http-equiv="refresh" content="0; url=${canonicalUrl}" />`,
    );
    html = html.replace(
      /<main id="static-fallback"[\s\S]*?<\/main>/,
      `<main id="static-fallback"><p>This page has moved to <a href="${canonicalUrl}">${canonicalUrl}</a>.</p></main>`,
    );
  }

  if (meta) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
    html = html.replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${meta.description}" />`,
    );
    html = html.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${meta.title}" />`,
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${meta.description}" />`,
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${meta.title}" />`,
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${meta.description}" />`,
    );
  }

  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  console.log(`✓ ${route}${meta ? '' : ' (default meta)'}`);
}

console.log(`\n✅ Generated ${shellRoutes.length} static route files`);
