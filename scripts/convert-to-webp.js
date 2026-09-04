#!/usr/bin/env node
import sharp from 'sharp';
import { readdirSync, existsSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename, relative } from 'path';
import { fileURLToPath } from 'url';

const IMAGES_DIR = fileURLToPath(new URL('../public/assets/images', import.meta.url));
const QUALITY_PHOTO = 82;
const QUALITY_PNG = 90;
const CONVERTIBLE = ['.jpg', '.jpeg', '.png'];

const KEEP = new Set([
  'pt7logo.png',
  'og-share.jpg',
]);

const dryRun = process.argv.includes('--dry-run');

let converted = 0;
let deleted = 0;
let kept = 0;
let failed = 0;

async function processDir(dir) {
  for (const entry of readdirSync(dir).sort()) {
    const fullPath = join(dir, entry);

    if (statSync(fullPath).isDirectory()) {
      await processDir(fullPath);
      continue;
    }

    const ext = extname(entry).toLowerCase();
    if (!CONVERTIBLE.includes(ext)) continue;

    const label = relative(IMAGES_DIR, fullPath);

    if (KEEP.has(entry)) {
      console.log(`  keep: ${label}`);
      kept += 1;
      continue;
    }

    const webpPath = join(dir, `${basename(entry, extname(entry))}.webp`);

    if (!existsSync(webpPath)) {
      const quality = ext === '.png' ? QUALITY_PNG : QUALITY_PHOTO;
      try {
        if (dryRun) {
          console.log(`  would convert: ${label} → .webp`);
        } else {
          const origSize = statSync(fullPath).size;
          const info = await sharp(fullPath).webp({ quality }).toFile(webpPath);
          const saving = Math.round((1 - info.size / origSize) * 100);
          console.log(
            `  converted: ${label} → .webp  (${Math.round(origSize / 1024)}KB → ${Math.round(info.size / 1024)}KB, -${saving}%)`,
          );
        }
        converted += 1;
      } catch (err) {
        console.error(`  FAILED: ${label}: ${err.message}`);
        failed += 1;
        continue;
      }
    }

    if (dryRun) {
      console.log(`  would delete: ${label}`);
    } else {
      unlinkSync(fullPath);
      console.log(`  deleted: ${label}`);
    }
    deleted += 1;
  }
}

console.log(dryRun ? 'WebP check (dry run)\n' : 'Converting images to WebP\n');

processDir(IMAGES_DIR)
  .then(() => {
    console.log(
      `\n${dryRun ? 'Would convert' : 'Converted'} ${converted}, ` +
      `${dryRun ? 'would delete' : 'deleted'} ${deleted}, kept ${kept}.`,
    );
    if (failed > 0) {
      console.error(`${failed} file(s) failed to convert and were left in place.`);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
