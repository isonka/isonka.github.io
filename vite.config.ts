import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
    // The trainee area calls the PT7 Academy API on the same address (/api). In development, forward it to a local
    // API (pt7-academy: `npm run dev -w api`, port 4000) or set PT7_API to another one. The Host header stays
    // localhost:5173, which the API accepts as the website's own origin during development.
    proxy: {
      '/api': { target: process.env.PT7_API || 'http://localhost:4000', changeOrigin: false },
    },
  },
})
