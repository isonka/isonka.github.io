// Step 5: gate the agent's edits before a PR is opened.
//   - every proposed title/description is exactly what the prerendered page serves
//     (so next week's evaluation can match the change to its hypothesis)
//   - lengths stay within limits
//   - added lines don't break the brand/content rules in AGENTS.md
// Needs a full `npm run build` (prerendered dist/).

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { config, dirs, projectRoot } from './config.js';
import { parsePage } from './snapshot.js';
import { readJson, today } from './lib/util.js';

const runDate = process.env.RUN_DATE || today();
const file = path.join(dirs.proposals, `${runDate}.json`);
const proposal = readJson(file);
const errors = [];

if (!proposal) {
  console.log(`No proposal file for ${runDate}; nothing to verify.`);
  process.exit(0);
}

const report = readJson(path.join(dirs.reports, 'latest.json'), { actions: [] });
const planned = new Set(report.actions.map((a) => a.page));

for (const c of proposal.changes || []) {
  if (!planned.has(c.page)) errors.push(`${c.page}: not in this week's action plan`);
  if (config.frozenPages.includes(c.page)) errors.push(`${c.page}: frozen page`);
  if (c.kind !== 'snippet') continue;
  const html = path.join(projectRoot, 'dist', c.page, 'index.html');
  if (!fs.existsSync(html)) {
    errors.push(`${c.page}: dist/${c.page}index.html missing (run npm run build)`);
    continue;
  }
  const live = parsePage(fs.readFileSync(html, 'utf8'));
  for (const field of ['title', 'description']) {
    const want = c.after?.[field];
    if (want == null) continue;
    if (live[field] !== want) errors.push(`${c.page}: ${field} renders as “${live[field]}”, proposal says “${want}”`);
  }
  if (live.title.length > 60) errors.push(`${c.page}: title ${live.title.length} chars`);
  if (live.description && live.description.length > 160) errors.push(`${c.page}: description ${live.description.length} chars`);
  if (live.h1.length !== 1) errors.push(`${c.page}: ${live.h1.length} H1 tags after edit`);
}

// Rules from AGENTS.md / PT7_SEO_PLAN.md, checked on added lines only.
const RULES = [
  [/\b(2nd|second|tweede)\s+(floor|verdieping)\b|\bentrance\b|\bingang\b/i, 'never mention the floor or entrance'],
  [/olympisch/i, 'no Olympisch Stadion in new copy'],
  [/\b(cheap|cheapest|budget|goedkoop|goedkoopste)\b/i, 'premium tone: no cheap/budget wording'],
  [/below typical|lower than other studios|onder de gangbare/i, 'no price-undercut positioning'],
  [/pt\.?\s*studio\s*7/i, '"PT Studio 7" only in JSON-LD alternateName and the homepage title/description'],
];
const diff = execFileSync('git', ['diff', '-U0', '--', 'src', 'public', 'site', 'index.html'], { cwd: projectRoot, encoding: 'utf8' });
let current = '';
for (const line of diff.split('\n')) {
  if (line.startsWith('+++ ')) current = line.slice(6);
  else if (line.startsWith('+') && !line.startsWith('+++')) {
    for (const [re, rule] of RULES) {
      if (!re.test(line)) continue;
      if (rule.startsWith('"PT Studio 7"') && /locales\/(en|nl)\/home\.ts$/.test(current)) continue;
      errors.push(`${current}: ${rule} → ${line.slice(1).trim().slice(0, 120)}`);
    }
  }
}

if (errors.length) {
  console.error(`✗ SEO agent changes failed verification:\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(`✓ ${proposal.changes.length} proposed change(s) verified against dist/`);
