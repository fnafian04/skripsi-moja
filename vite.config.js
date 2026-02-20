import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // Plugin wajib buat Tailwind v4

export default defineConfig({
  plugins: [
    tailwindcss(), // Aktifkan mesin Tailwind-nya di sini
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html", // Halaman Utama
        peta: "peta.html", // Halaman Peta Candi
      },
    },
  },
});
