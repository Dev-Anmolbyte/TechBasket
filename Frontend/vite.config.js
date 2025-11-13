import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 10, // super fast checks
    },
    host: true,
    port: 5173,
    strictPort: true,
  },
});
