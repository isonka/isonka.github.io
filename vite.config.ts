import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Root domain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Performance optimizations
    minify: 'esbuild', // Use esbuild for faster builds
    rollupOptions: {
      output: {
        // Better file naming with content hash for optimal caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          // Split vendor code for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Improve source map quality
    sourcemap: false, // Disable in production for smaller files
    // Asset inlining threshold (inline small files as base64)
    assetsInlineLimit: 4096, // 4kb - inline smaller assets
  },
  // Server configuration for development
  server: {
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
})
