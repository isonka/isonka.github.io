import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// The trainee area (academy/trainee/index.html, published at academy.pt7.nl): its own page with no third-party scripts
// (owner, 2026-11-18), built after the main site (`npm run build`) into its own folder, dist-academy/. That folder holds
// only the trainee files, so a Hosting site published from it can't serve Tag Manager or Mindbody pages on the trainee
// address (owner, 2026-11-21). The main site's output in dist/ no longer contains this page.
// The build gives the page a strict Content-Security-Policy: only this site's own scripts, styles, fonts, images and
// /api, and one frame: Google Drive's video player for observations (owner, 2026-11-24) (`npm run dev` leaves it out: Vite's dev server needs inline scripts). frame-ancestors can't be set in a meta
// tag; it goes into the trainee site's hosting headers (`frame-ancestors 'none'`).
const here = (file: string) => fileURLToPath(new URL(file, import.meta.url))
const ROOT = here('./academy/trainee')
const OUT = here('./dist-academy')
const PAGE = 'index.html'

const TRAINEE_CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' blob:", // library photos need the login's proof header, so they are fetched and shown from a blob:
  "font-src 'self'",
  "connect-src 'self'",
  'frame-src https://drive.google.com', // observation videos play in Drive's own player
  "base-uri 'none'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

// Never ship the trainee page without its policy: the build fails if the page or its anchor line isn't found
const traineeCsp = (): Plugin => {
  let applied = false
  return {
    name: 'trainee-csp',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (ctx.path !== `/${PAGE}`) throw new Error(`trainee-csp: unexpected page ${ctx.path}`)
        const anchor = '<meta charset="UTF-8" />'
        if (!html.includes(anchor)) throw new Error(`trainee-csp: ${anchor} not found in ${PAGE}`)
        applied = true
        return html.replace(anchor, `${anchor}\n    <meta http-equiv="Content-Security-Policy" content="${TRAINEE_CSP}" />`)
      },
    },
    closeBundle() {
      if (!applied) throw new Error(`trainee-csp: the policy was not added to ${PAGE}`)
    },
  }
}

// Everything the trainee site may publish. The build fails on any other file.
const ALLOWED = /^(index\.html|favicon-32x32\.png|assets\/trainee-[\w-]+\.(js|css)|fonts\/[\w-]+\.(woff2|ttf))$/

// Copies the few public files the page uses (no publicDir: that would publish all of the main site's), then checks
// the folder
const onlyTraineeFiles = (): Plugin => ({
  name: 'trainee-files',
  apply: 'build',
  closeBundle() {
    cpSync(here('./public/favicon-32x32.png'), path.join(OUT, 'favicon-32x32.png'))
    cpSync(here('./public/fonts'), path.join(OUT, 'fonts'), {
      recursive: true,
      filter: (source) => path.basename(source) !== '.gitkeep',
    })
    const files = readdirSync(OUT, { recursive: true, encoding: 'utf8' })
      .filter((file) => statSync(path.join(OUT, file)).isFile())
      .map((file) => file.split(path.sep).join('/'))
    const stray = files.filter((file) => !ALLOWED.test(file))
    if (stray.length) throw new Error(`trainee-files: not a trainee file: ${stray.join(', ')}`)
    if (!files.includes(PAGE)) throw new Error(`trainee-files: ${PAGE} is missing`)
  },
})

export default defineConfig({
  plugins: [react(), traineeCsp(), onlyTraineeFiles()],
  root: ROOT,
  base: '/',
  publicDir: false,
  build: {
    outDir: OUT,
    emptyOutDir: true,
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
      input: path.join(ROOT, PAGE),
      output: {
        assetFileNames: 'assets/trainee-[name]-[hash][extname]',
        chunkFileNames: 'assets/trainee-[name]-[hash].js',
        entryFileNames: 'assets/trainee-[name]-[hash].js',
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 0, // no inline data: URLs (the policy allows only 'self')
  },
})
