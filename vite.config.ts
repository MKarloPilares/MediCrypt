import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    inject({
      Buffer: ['buffer', 'Buffer'], // Polyfill Buffer for browser
      process: 'process/browser', // Inject the process polyfill for browser
    }),
  ],
  define: {
    global: 'window', // Polyfill for global object in browsers
    'process.env': {}, // Define process.env to avoid undefined errors
  },
});
