import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // ルート相対パス（/img, /css, /js）を維持。Vercel rewrite に依存しない実体HTML出力。
  base: "/",
  build: {
    rollupOptions: {
      // 指定したHTMLをすべて dist 直下に物理ファイルとして出力する
      input: {
        main: resolve(__dirname, "index.html"),
        service: resolve(__dirname, "service.html"),
        sns: resolve(__dirname, "sns.html"),
        blog: resolve(__dirname, "blog.html"),
        works: resolve(__dirname, "works.html"),
        contact: resolve(__dirname, "contact.html"),
        privacy: resolve(__dirname, "privacy.html"),
        film: resolve(__dirname, "film.html"),
        photo: resolve(__dirname, "photo.html"),
        company: resolve(__dirname, "company.html")
      },
    },
  },
});
