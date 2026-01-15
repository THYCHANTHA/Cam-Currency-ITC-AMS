import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.JPG"],
  server: {
    host: true, // Needed for Docker
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
