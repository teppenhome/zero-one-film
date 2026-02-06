import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        company: resolve(__dirname, "company.html"),
        service: resolve(__dirname, "service.html"),
        film: resolve(__dirname, "film.html"),
        photo: resolve(__dirname, "photo.html"),
      },
    },
  },
});
