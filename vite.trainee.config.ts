import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// The trainee area (academy/trainee/index.html): its own page with no third-party scripts (owner, 2026-11-18), built
// in a separate step after the main site (`npm run build`), so the main site's output stays exactly as before (one
// shared build split the shared stylesheet out of the home page and cost Lighthouse time, 2026-11-18).
// The build gives the page a strict Content-Security-Policy: only this site's own scripts, styles, fonts, images and
// /api (`npm run dev` leaves it out: Vite's dev server needs inline scripts). frame-ancestors can't be set in a meta
// tag; it goes into the hosting headers (`frame-ancestors 'none'`) with the move to Firebase.
const PAGE = 'academy/trainee/index.html'

const TRAINEE_CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
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
        if (!ctx.path.endsWith(`/${PAGE}`)) throw new Error(`trainee-csp: unexpected page ${ctx.path}`)
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

export default defineConfig({
  plugins: [react(), traineeCsp()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: false, // the main site's build is already there
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
      input: fileURLToPath(new URL(`./${PAGE}`, import.meta.url)),
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
