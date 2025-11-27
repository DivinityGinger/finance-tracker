import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/finance-tracker/', // IMPORTANT for GitHub Pages
  plugins: [react()],
});
