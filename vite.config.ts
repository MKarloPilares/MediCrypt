import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    inject({
      process: 'process/browser', // Inject the process polyfill for the browser
      Buffer: ['buffer', 'Buffer'], // Polyfill Buffer
    }),
    commonjs(), // Add CommonJS plugin to handle CommonJS modules like invariant
  ],
  define: {
    global: 'window', // Polyfill for global in browsers
    'process.env': {}, // Define process.env to avoid undefined errors
  },
});
