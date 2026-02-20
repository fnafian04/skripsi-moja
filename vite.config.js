import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        peta: resolve(__dirname, 'peta.html'),
        // legena: resolve(__dirname, 'legena.html') // Ini aku siapin sekalian buat nanti!
      }
    }
  }
});