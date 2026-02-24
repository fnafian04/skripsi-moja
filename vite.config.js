import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        beranda: "beranda.html",
        beranda_pasinaon: "beranda-pasinaon.html",
        peta: "peta.html",
        legena: "legena.html",
      },
    },
  },
});