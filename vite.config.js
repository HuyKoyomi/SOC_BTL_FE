import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@layout": "/src/layout",
      "@containers": "/src/containers",
      "@assets": "/src/assets",
      "@core": "/src/core",
      "@shared": "/src/shared",
      "@common": "/src/common",
      src: "/src",
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
