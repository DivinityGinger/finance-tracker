<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/finance-tracker/', // IMPORTANT for GitHub Pages
  plugins: [react()],
});
>>>>>>> f30f4c66275a9977e554d09302544a2ca4ba046c
