#!/usr/bin/env node
/**
 * Generates public/assets/images/og-share.jpg — the social preview image used by
 * og:image and twitter:image on every page.
 *
 * Kept as JPG deliberately: LinkedIn documents JPG/PNG/GIF only, and the
 * Facebook/WhatsApp scraper is unreliable with WebP. 1200x630 is the size
 * declared in index.html and SEOHead.
 *
 * Source is a WebP so there is no JPG original to maintain.
 */

import sharp from 'sharp';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const SOURCE = fileURLToPath(new URL('../public/assets/images/studio.webp', import.meta.url));
const OUTPUT = fileURLToPath(new URL('../public/assets/images/og-share.jpg', import.meta.url));
const WIDTH = 1200;
const HEIGHT = 630;
const QUALITY = 82;

if (!existsSync(SOURCE)) {
  console.error(`Source image not found: ${SOURCE}`);
  process.exit(1);
}

sharp(SOURCE)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: QUALITY, mozjpeg: true })
  .toFile(OUTPUT)
  .then((info) => {
    console.log(`✓ og-share.jpg  ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`);
  })
  .catch((err) => {
    console.error(`Failed to write og-share.jpg: ${err.message}`);
    process.exit(1);
  });
