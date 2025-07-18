import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react() // A lista de plugins agora só tem plugins.
  ],
  base: '/proj1---Espeto/', // <-- Certo! "base" está no mesmo nível que "plugins".
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
