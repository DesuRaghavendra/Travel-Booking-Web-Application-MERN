/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Treat both .js and .jsx files as JSX
    loader: 'jsx',
    include: /src\/.*\.(js|jsx)$/, 
    exclude: [],
  },
});
