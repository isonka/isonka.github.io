import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'fonts');
const VERSION = '5.2.6';
const WEIGHTS = [400, 600, 700];
const SUBSETS = ['latin', 'latin-ext'];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          reject(new Error(`${url} → ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(dest, () => reject(err));
      });
  });
}

fs.mkdirSync(outDir, { recursive: true });

const jobs = [];
for (const subset of SUBSETS) {
  for (const weight of WEIGHTS) {
    const name = `poppins-${subset}-${weight}.woff2`;
    const url = `https://cdn.jsdelivr.net/fontsource/fonts/poppins@${VERSION}/${subset}-${weight}-normal.woff2`;
    jobs.push(
      download(url, path.join(outDir, name)).then(() => console.log(`✓ ${name}`)),
    );
  }
}

Promise.all(jobs)
  .then(() => {
    console.log(`\nWrote ${jobs.length} files to public/fonts/`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
