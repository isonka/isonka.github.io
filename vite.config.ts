import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Content images (trainers, equipment, blog) come from the PT7 Academy API: `npm run content` downloads them into
// .site-content/images/, and the build copies them into dist/assets/images/. The dev server serves them from there
// at the same addresses, for any name that isn't one of the site's own files in public/.
const CONTENT_IMAGES = path.resolve('.site-content/images')
const PUBLIC_IMAGES = path.resolve('public/assets/images')
const contentImages = (): Plugin => ({
  name: 'content-images',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/assets/images', (req, res, next) => {
      const name = decodeURIComponent((req.url || '').split('?')[0]).replace(/^\//, '')
      if (!/^[A-Za-z0-9_-][A-Za-z0-9._-]*$/.test(name)) return next()
      if (fs.existsSync(path.join(PUBLIC_IMAGES, name))) return next() // the site's own file wins, as in the build
      const file = path.join(CONTENT_IMAGES, name)
      if (!fs.existsSync(file)) return next()
      res.setHeader('Content-Type', name.endsWith('.png') ? 'image/png' : name.endsWith('.webp') ? 'image/webp' : 'image/jpeg')
      fs.createReadStream(file).pipe(res)
    })
  },
})

export default defineConfig({
  plugins: [react(), contentImages()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
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
    // The trainee area (academy/trainee/, built into dist-academy/ by vite.trainee.config.ts; the dev server serves it)
    // calls the PT7 Academy API on the same address (/api). In development, forward it to a local API (pt7-academy:
    // `npm run dev -w api`, port 4000) or set PT7_API to another one (localhost or https only). The Host header stays
    // localhost:5173, which the API accepts as the website's own origin during development.
    proxy: {
      '/api': { target: process.env.PT7_API || 'http://localhost:4000', changeOrigin: false },
    },
  },
})
