import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps in production for smaller bundles
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui/material')) {
              return 'mui-material';
            }
            if (id.includes('@mui/icons-material')) {
              return 'mui-icons';
            }
            if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router')) {
              return 'react-router';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'charts';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'redux';
            }
            if (id.includes('socket.io-client')) {
              return 'socket';
            }
            if (id.includes('moment')) {
              return 'moment';
            }
            // Catch-all for other node_modules
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        // Prevent function mangling that breaks MUI
        keep_fnames: true,
        keep_classnames: true,
      },
      mangle: {
        // Preserve function names to prevent MUI breakage
        keep_fnames: true,
        keep_classnames: true,
      },
    },
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  // Add optimization for better module resolution
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material', 'react', 'react-dom'],
  },
})