import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default (mode: string) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    base: "/geo-control-center/",
    server: {
      port: 4567,
      proxy: {
        "/api": {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
      },
    },
  });
};
