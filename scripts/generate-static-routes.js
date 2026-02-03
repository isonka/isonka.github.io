/**
 * Post-build script to generate static HTML files for each route
 * This fixes GitHub Pages SPA routing issues where direct URL access returns 404
 * 
 * How it works:
 * - Copies index.html to each route path (e.g., /academy/index.html)
 * - GitHub Pages then serves these with 200 status instead of 404
 * - React Router takes over client-side after initial load
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

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
  // Blog posts
  'blog/prenatal-pilates-supporting-body-through-every-trimester',
  'blog/pilates-for-men-strength-flexibility-athletic-performance',
  'blog/pilates-prices-amsterdam-2026-complete-guide',
  'blog/career-change-banker-to-pilates-instructor',
];

// Read the main index.html
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

console.log('Generating static route files for GitHub Pages...\n');

routes.forEach(route => {
  const routeDir = path.join(distDir, route);
  const routeFile = path.join(routeDir, 'index.html');
  
  // Create directory if it doesn't exist
  fs.mkdirSync(routeDir, { recursive: true });
  
  // Copy index.html to the route directory
  fs.writeFileSync(routeFile, indexHtml);
  
  console.log(`✓ Created: /${route}/index.html`);
});

console.log(`\n✅ Generated ${routes.length} static route files`);
console.log('GitHub Pages will now serve these routes with 200 status code');
