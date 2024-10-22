import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Find BP",
        short_name: "FindBP",
        description: "Find nearest BP gas station",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "/bp-logo.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/bp-logo.svg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:8888", // Local Netlify function server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/.netlify\/functions/, ""),
      },
    },
  },
});
