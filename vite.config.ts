import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    inject({
      process: 'process/browser', // Correctly polyfill process for browser
      Buffer: ['buffer', 'Buffer'], // Polyfill Buffer
    }),
    commonjs(), // CommonJS plugin to handle legacy module formats
  ],
  define: {
    global: 'window', // Polyfill global for browser compatibility
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), // Define process.env.NODE_ENV to prevent errors
  },
});
