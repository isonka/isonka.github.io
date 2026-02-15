/**
 * Post-build script to generate static HTML files for each route
 * This fixes GitHub Pages SPA routing issues where direct URL access returns 404
 * AND ensures proper Open Graph meta tags for social media previews
 * 
 * How it works:
 * - Copies index.html to each route path (e.g., /academy/index.html)
 * - Injects route-specific OG meta tags for social sharing
 * - GitHub Pages then serves these with 200 status instead of 404
 * - React Router takes over client-side after initial load
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

const BASE_URL = 'https://www.ptstudio7amsterdam.nl';

// Route-specific meta data for social sharing
// Routes not listed here will use default homepage meta tags
const routeMeta = {
  'classpass-offer': {
    title: 'ClassPass Members: Exclusive Offer | PT Studio 7 Amsterdam',
    description: 'Special offer for ClassPass members. Save money and get priority booking when you join PT Studio 7 directly. Same great Pilates classes, better value.',
    image: '/assets/images/about-us-web.jpg',
  },
  'pricing': {
    title: 'Pricing | PT Studio 7 Amsterdam',
    description: 'Flexible Pilates pricing at Museumplein. Memberships from €20/class, class packs, private sessions. Expert instructors, small groups (max 5).',
    image: '/assets/images/about-us-web.jpg',
  },
  'academy': {
    title: 'Pilates Instructor Training | PT 7 Academy Amsterdam',
    description: 'Become a certified Pilates instructor. 4 weeks of lessons + 8 weeks optional observation. Learn from experienced instructors at Museumplein.',
    image: '/assets/images/about-us-web.jpg',
  },
  'schedule': {
    title: 'Class Schedule | PT Studio 7 Amsterdam',
    description: 'Book your Pilates, TRX, or Strength class at PT Studio 7 Museumplein. Small group classes (max 5) and private sessions available.',
    image: '/assets/images/about-us-web.jpg',
  },
  'instructors': {
    title: 'Our Instructors | PT Studio 7 Amsterdam',
    description: 'Meet our expert certified Pilates instructors. 10+ years experience, specialized in Reformer Pilates, pregnancy Pilates, and strength training.',
    image: '/assets/images/about-us-web.jpg',
  },
};

// All routes that need static HTML files
const routes = [
  'pricing',
  'schedule',
  'equipment',
  'equipment/reformer',
  'equipment/tower-reformer',
  'equipment/cadillac',
  'equipment/wunda-chair',
  'equipment/ladder-barrel',
  'workouts/reformer-pilates',
  'workouts/trx',
  'workouts/functional-training',
  'workouts/cardio',
  'congrats',
  'instructors',
  'trainer-elif',
  'trainer-gokben',
  'trainer-goknur',
  'trainer-gulce',
  'trainer-melis',
  'trainer-lal',
  'trainer-nisan',
  'academy',
  'blog',
  'classpass-offer',
  // Blog posts
  'blog/prenatal-pilates-supporting-body-through-every-trimester',
  'blog/pilates-for-men-strength-flexibility-athletic-performance',
  'blog/pilates-prices-amsterdam-2026-complete-guide',
  'blog/career-change-banker-to-pilates-instructor',
];

// Read the main index.html
let indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

console.log('Generating static route files for GitHub Pages...\n');

routes.forEach(route => {
  const routeDir = path.join(distDir, route);
  const routeFile = path.join(routeDir, 'index.html');
  
  // Create directory if it doesn't exist
  fs.mkdirSync(routeDir, { recursive: true });
  
  let html = indexHtml;
  
  // If this route has custom meta tags, inject them
  const meta = routeMeta[route];
  if (meta) {
    const fullUrl = `${BASE_URL}/${route}`;
    const imageUrl = `${BASE_URL}${meta.image}`;
    
    // Replace OG meta tags
    html = html.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${fullUrl}" />`
    );
    html = html.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${meta.title}" />`
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${meta.description}" />`
    );
    
    // Replace Twitter meta tags
    html = html.replace(
      /<meta name="twitter:url" content="[^"]*" \/>/,
      `<meta name="twitter:url" content="${fullUrl}" />`
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${meta.title}" />`
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${meta.description}" />`
    );
    
    // Replace page title
    html = html.replace(
      /<title>[^<]*<\/title>/,
      `<title>${meta.title}</title>`
    );
    
    // Replace meta description
    html = html.replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${meta.description}" />`
    );
    
    // Replace canonical
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${fullUrl}" />`
    );
    
    console.log(`✓ Created: /${route}/index.html (with custom OG tags)`);
  } else {
    console.log(`✓ Created: /${route}/index.html`);
  }
  
  // Write the HTML file
  fs.writeFileSync(routeFile, html);
});

console.log(`\n✅ Generated ${routes.length} static route files`);
console.log('GitHub Pages will now serve these routes with 200 status code');
console.log('Social media previews will show correct meta tags');
