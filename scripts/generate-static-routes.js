/**
 * Writes a static HTML file for every route so GitHub Pages answers direct
 * URL hits with 200 instead of 404, and social crawlers see real meta tags.
 *
 * Route list comes from .routes-manifest.json (generated from
 * site/routes.ts). The meta below is only a fallback: prerender-static-html.js
 * overwrites these files with real snapshots, where SEOHead has already set
 * the head. It matters when a snapshot is skipped, e.g. the legacy
 * pregnancy-pilates alias that redirects client-side.
 */

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

// Fallback meta for fixed pages. Detail pages (blog, trainers, equipment,
// workouts) inherit theirs from the manifest or from index.html defaults.
const fixedPageMeta = {
  '/nl/': {
    title: 'Pilates Amsterdam | Reformer pilates & personal training | PT Studio 7',
    description: 'Pilateslessen in Amsterdam aan het Museumplein: Reformer pilates, kleine groepen (max. 5) en private sessies met gecertificeerde instructeurs. Boutique studio in Oud-Zuid. Online boeken.',
  },
  '/classpass-offer/': {
    title: 'ClassPass Members: Exclusive Offer | PT Studio 7 Amsterdam',
    description: 'Special offer for ClassPass members. Save money and get priority booking when you join PT Studio 7 directly. Same great Pilates classes, better value.',
  },
  '/pricing/': {
    title: 'Pricing | PT Studio 7 Amsterdam',
    description: 'Flexible Pilates pricing at Museumplein. Memberships from €20/class, class packs, private sessions. Expert instructors, small groups (max 5).',
  },
  '/academy/': {
    title: 'Pilates Instructor Course Amsterdam | Teacher Training | PT7 Academy',
    description: 'Pilates instructor course and teacher training in Amsterdam. 300-hour Reformer Pilates instructor course (PMA ITTAP approved), Mat Pilates track, weekend schedule for career changers. Course fee from €2,000 + VAT.',
  },
  '/academy/nl/': {
    title: 'Pilates Opleiding Amsterdam | Docentenopleiding | PT7 Academy',
    description: 'Pilates opleiding Amsterdam en pilates docentenopleiding bij Museumplein. 300 uur Reformer instructeurscursus (PMA ITTAP goedgekeurd) plus Mat & Trapeze Table. Weekendrooster. Lessen in het Engels. Vanaf €2.000 + BTW.',
  },
  '/healthcare-providers/': {
    title: 'Pilates for Rehabilitation Amsterdam | For Healthcare Providers | PT Studio 7',
    description: 'Physiotherapists and healthcare providers: refer your clients to PT Studio 7 for post-rehab Pilates and functional training. Small groups, expert instructors.',
  },
  '/corporate/': {
    title: 'Corporate Pilates Amsterdam | Bedrijfsfitness | PT Studio 7',
    description: 'Corporate Pilates and bedrijfsfitness Amsterdam for teams. Boutique Reformer at Museumplein or on-site mat sessions. Tax-friendly WKR options.',
  },
  '/privacy/': {
    title: 'Privacy Policy | PT Studio 7 Amsterdam',
    description: 'How PT Studio 7 Amsterdam uses cookies, analytics, advertising, booking widgets, and contact data.',
  },
  '/prenatal-pilates-amsterdam/': {
    title: 'Prenatal & Pregnancy Pilates Amsterdam | Private Reformer | PT Studio 7',
    description: 'Private prenatal Reformer Pilates at Museumplein (Oud-Zuid). 45-minute 1:1 sessions, trimester adaptations, pelvic floor focus. Train with Elif or Göknur through pregnancy.',
  },
  '/pregnancy-pilates-amsterdam/': {
    title: 'Pregnancy Pilates Amsterdam | PT Studio 7',
    description: 'Pregnancy-safe Reformer Pilates in Amsterdam Museumplein. Redirects to our prenatal private sessions page.',
  },
  '/reformer-pilates-amsterdam/': {
    title: 'Reformer Pilates Amsterdam Museumplein | PT Studio 7',
    description: 'Reformer Pilates at Museumplein Amsterdam. Small groups max 5, private sessions, full apparatus studio in Oud-Zuid. First visit coaching for beginners and expats.',
  },
  '/private-pilates-amsterdam/': {
    title: 'Private Reformer Pilates Sessions Amsterdam | PT Studio 7',
    description: 'One-on-one private Reformer Pilates at Museumplein. Personalised training with certified instructors. Duo & trio options.',
  },
  '/trx-training-amsterdam/': {
    title: 'TRX Training Amsterdam Museumplein | PT Studio 7',
    description: 'Professional TRX suspension training at Museumplein. Functional strength, core stability, small groups & private sessions.',
  },
  '/strength-training-amsterdam/': {
    title: 'Strength Training Amsterdam | PT Studio 7 Museumplein',
    description: 'Personal strength training at Museumplein. Small groups (max 5) and private sessions with expert trainers.',
  },
  '/schedule/': {
    title: 'Class Schedule | PT Studio 7 Amsterdam',
    description: 'Book your Pilates, TRX, or Strength class at PT Studio 7 Museumplein. Small group classes (max 5) and private sessions available.',
  },
  '/instructors/': {
    title: 'Our Instructors | PT Studio 7 Amsterdam',
    description: 'Meet our expert certified Pilates instructors. 10+ years experience, specialized in Reformer Pilates, pregnancy Pilates, and strength training.',
  },
  '/equipment/': {
    title: 'Buy Pilates Equipment Amsterdam | Reformers & More | PT Studio 7',
    description: 'Buy Pilates equipment in Amsterdam: Reformer, Tower Reformer, Cadillac, Wunda Chair, and Ladder Barrel with specs and ordering support.',
  },
  '/blog/': {
    title: 'Blog | PT Studio 7 Amsterdam',
    description: 'Pilates tips, fitness advice, and wellness insights from Amsterdam\'s boutique Pilates studio at Museumplein.',
  },
  '/workouts/reformer-pilates/': {
    title: 'Reformer Pilates Amsterdam | PT Studio 7 Museumplein',
    description: 'Reformer Pilates classes at Museumplein. Small groups (max 5), expert instructors, premium equipment. Book your session today.',
  },
  '/workouts/trx/': {
    title: 'TRX Training | PT Studio 7 Amsterdam',
    description: 'TRX suspension training at Museumplein. Build strength and stability with expert coaching in small groups.',
  },
  '/workouts/functional-training/': {
    title: 'Nike Strength Training | PT Studio 7 Amsterdam',
    description: 'Nike Strength Training at Museumplein. Half rack, Olympic barbell, premium dumbbells. Expert personal training.',
  },
  '/workouts/cardio/': {
    title: 'Cardio Training | PT Studio 7 Amsterdam',
    description: 'Cardio training at Museumplein. Concept2 rower and more. Build endurance with expert coaching.',
  },
  '/equipment/reformer/': {
    title: 'Buy Pilates Reformer Amsterdam | PT Studio 7',
    description: 'Professional Pilates Reformer at PT Studio 7 Museumplein. Train on premium equipment with certified instructors in small groups of max 5.',
  },
  '/equipment/tower-reformer/': {
    title: 'Tower Reformer | PT Studio 7 Amsterdam',
    description: 'Tower Reformer Pilates at PT Studio 7 Museumplein. Versatile equipment for full-body training. Expert instructors, small groups.',
  },
  '/equipment/cadillac/': {
    title: 'Cadillac Pilates | PT Studio 7 Amsterdam',
    description: 'Pilates Cadillac at PT Studio 7 Museumplein. Classic apparatus for deep core work and rehabilitation. Certified instructors.',
  },
  '/equipment/wunda-chair/': {
    title: 'Wunda Chair | PT Studio 7 Amsterdam',
    description: 'Wunda Chair Pilates at PT Studio 7 Museumplein. Challenging balance and strength apparatus with expert guidance.',
  },
  '/equipment/ladder-barrel/': {
    title: 'Ladder Barrel for Sale | PT Studio 7 Amsterdam',
    description: 'Professional Pilates Ladder Barrel for sale. Specs and ordering for home or studio use. Sold by PT Studio 7; not used in our client training sessions.',
  },
  '/trainer/elif/': {
    title: 'Elif Arzu Ogan | Owner & Head Instructor | PT Studio 7',
    description: 'Elif Arzu Ogan, owner and head instructor at PT Studio 7 Amsterdam. 15+ years of Pilates expertise at Museumplein. Book a session with Elif.',
  },
  '/trainer/gokben/': {
    title: 'Gökben Öztekin | Pilates Instructor | PT Studio 7 Amsterdam',
    description: 'Gökben Öztekin, certified Pilates instructor at PT Studio 7 Museumplein Amsterdam. Expert in Reformer Pilates and small group classes.',
  },
  '/trainer/goknur/': {
    title: 'Göknur Dipli | Pilates Instructor | PT Studio 7 Amsterdam',
    description: 'Göknur Dipli, certified Pilates instructor at PT Studio 7 Museumplein Amsterdam. Specialist in Reformer Pilates and personal training.',
  },
  '/trainer/gulce/': {
    title: 'Gülce Koç | Pilates Instructor | PT Studio 7 Amsterdam',
    description: 'Gülce Koç, certified Pilates instructor at PT Studio 7 Museumplein Amsterdam. Expert guidance in Reformer Pilates and functional training.',
  },
  '/trainer/lal/': {
    title: 'Lal Avgen | Pilates Instructor | PT Studio 7 Amsterdam',
    description: 'Lal Avgen, certified Pilates instructor at PT Studio 7 Museumplein Amsterdam. Specialised in Reformer Pilates and strength training.',
  },
  '/trainer/nisan/': {
    title: 'Nisan Atalay | Pilates Instructor | PT Studio 7 Amsterdam',
    description: 'Nisan Atalay, certified Pilates instructor at PT Studio 7 Museumplein Amsterdam. Expert in Reformer Pilates, TRX, and small group classes.',
  },
  '/trainer/kelly/': {
    title: 'Kelly Tin | Pilates Instructor | PT Studio 7 Amsterdam',
    description: 'Kelly Tin, certified Reformer Pilates instructor at PT Studio 7 Museumplein Amsterdam. English- and Dutch-speaking coach with a strength and HIIT background.',
  },
  '/trainer/gamze/': {
    title: 'E. Gamze Karadağ | Pilates Instructor | PT Studio 7 Amsterdam',
    description: 'E. Gamze Karadağ, certified Reformer Pilates instructor at PT Studio 7 Museumplein Amsterdam. Yoga background and PT7 Academy graduate.',
  },
};

const routeMeta = { ...fixedPageMeta, ...shellMeta };

const staleMetaKeys = Object.keys(fixedPageMeta).filter((key) => !shellPaths.includes(key));
if (staleMetaKeys.length) {
  console.warn(`⚠ Meta defined for routes that no longer exist: ${staleMetaKeys.join(', ')}`);
}

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

console.log('Generating static route files for GitHub Pages...\n');

// '/' is already dist/index.html straight from Vite.
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
