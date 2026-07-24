/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom gives us a browser-like DOM (document, window) in Node.
    environment: 'jsdom',
    // Use describe/test/expect without importing them in every file.
    globals: true,
    // Runs once before the test files (registers the jest-dom matchers).
    setupFiles: './src/test/setup.js',
  },
})
