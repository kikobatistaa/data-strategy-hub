import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      // One HTML entry per language (and for the thesis) so crawlers that do not run
      // JavaScript get localised titles, descriptions and Open Graph images.
      input: {
        main: path.resolve(__dirname, "index.html"),
        pt: path.resolve(__dirname, "pt/index.html"),
        es: path.resolve(__dirname, "es/index.html"),
        thesis: path.resolve(__dirname, "thesis/index.html"),
      },
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "gsap-vendor": ["gsap"],
          "framer-vendor": ["framer-motion"],
        },
      },
    },
  },
});
