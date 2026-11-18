import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// The trainee area (academy/trainee/index.html) is its own page with no third-party scripts (owner, 2026-11-18). The
// build gives it a strict Content-Security-Policy: only this site's own scripts, styles, fonts, images and /api
// (`npm run dev` leaves it out: Vite's dev server needs inline scripts). frame-ancestors can't be set in a meta tag;
// it goes into the hosting headers with the move to Firebase.
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

const traineeCsp = (): Plugin => ({
  name: 'trainee-csp',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!ctx.path.endsWith('/academy/trainee/index.html')) return html
      return html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${TRAINEE_CSP}" />`)
    },
  },
})

export default defineConfig({
  plugins: [react(), traineeCsp()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        trainee: fileURLToPath(new URL('./academy/trainee/index.html', import.meta.url)),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks(id) {
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/') ||
            id.includes('/node_modules/react-router/') ||
            id.includes('/node_modules/react-router-dom/')
          ) {
            return 'react-vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
  server: {
    headers: {
      'Cache-Control': 'no-cache',
    },
    // The trainee area calls the PT7 Academy API on the same address (/api). In development, forward it to a local
    // API (pt7-academy: `npm run dev -w api`, port 4000) or set PT7_API to another one. The Host header stays
    // localhost:5173, which the API accepts as the website's own origin during development.
    proxy: {
      '/api': { target: process.env.PT7_API || 'http://localhost:4000', changeOrigin: false },
    },
  },
})
