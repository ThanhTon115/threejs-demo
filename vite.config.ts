import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/threejs-demo/",
  plugins: [react()],
  server: {
    open: true,
    port: 5000,
  },
});
