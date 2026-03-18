#!/usr/bin/env node
/**
 * Converts all JPG/JPEG/PNG images in public/assets/images/ to WebP.
 * Keeps originals intact (needed for og:image). Quality: 82 for photos, 90 for PNGs.
 */

import sharp from 'sharp';
import { readdirSync, existsSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const IMAGES_DIR = new URL('../public/assets/images', import.meta.url).pathname;
const QUALITY_PHOTO = 82;
const QUALITY_PNG = 90;

async function convertDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      await convertDir(fullPath);
      continue;
    }
    const ext = extname(entry).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const outPath = join(dir, basename(entry, extname(entry)) + '.webp');
    if (existsSync(outPath)) {
      console.log(`  skip (exists): ${outPath.replace(IMAGES_DIR, '')}`);
      continue;
    }

    const quality = ext === '.png' ? QUALITY_PNG : QUALITY_PHOTO;
    try {
      const info = await sharp(fullPath).webp({ quality }).toFile(outPath);
      const origSize = statSync(fullPath).size;
      const saving = Math.round((1 - info.size / origSize) * 100);
      console.log(`  ✓ ${entry.replace(extname(entry), '')} → .webp  (${Math.round(origSize/1024)}KB → ${Math.round(info.size/1024)}KB, -${saving}%)`);
    } catch (err) {
      console.error(`  ✗ ${entry}: ${err.message}`);
    }
  }
}

console.log('Converting images to WebP...\n');
convertDir(IMAGES_DIR).then(() => console.log('\nDone.'));
