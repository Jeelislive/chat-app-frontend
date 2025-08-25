import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'mui-core': ['@mui/material', '@mui/system'],
          'mui-icons': ['@mui/icons-material'],
          'router': ['react-router-dom'],
          'redux': ['@reduxjs/toolkit', 'react-redux'],
          'socket': ['socket.io-client'],
          'utils': ['axios', 'moment']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 800,
    minify: 'esbuild', // Faster than terser while still effective
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux'
    ]
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})