import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 文字列のショートハンド
      // オプションを使用
      "/api/cail/": {
        target: "https://api.calil.jp/",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/cail", ""),
      },
    },
  },
});
