import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        company: resolve(__dirname, "company.html"),
        contact: resolve(__dirname, "contact.html"),
        service: resolve(__dirname, "service.html"),
        film: resolve(__dirname, "film.html"),
        photo: resolve(__dirname, "photo.html"),
        sns: resolve(__dirname, "sns.html"),
        blog: resolve(__dirname, "blog.html"),
        works: resolve(__dirname, "works.html"),
        privacy: resolve(__dirname, "privacy.html"),
      },
    },
  },
});
