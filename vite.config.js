import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // bind ke semua network interfaces
    port: 5173, // port yang digunakan
    strictPort: true, // error jika port sudah dipakai
    allowedHosts: [".ngrok-free.dev", ".ngrok.io", "localhost"],
    hmr: {
      clientPort: 5173, // port untuk hot module replacement
    },
    open: true, // otomatis buka browser
    preview: {
      // ini yang bikin full screen saat preview
      open: true,
    },
  },
});
