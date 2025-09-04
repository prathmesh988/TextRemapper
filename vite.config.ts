import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import hotReloadExtension from "hot-reload-extension-vite";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: ".",
        },
      ],
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: "src/background.ts", // e.g. src/background/index.ts
    }),
  ],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: "./index.html",
        background: "./src/background.ts",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === "background"
            ? "background.js"
            : "assets/[name]-[hash].js";
        },
      },
    },
  },
});