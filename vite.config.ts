import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages serves project sites under /<repo>/, so the CI build needs a
  // matching base. Local dev/build stays at "/" so nothing changes day to day.
  base: process.env.GITHUB_ACTIONS ? "/psp-js/" : "/",
  build: {
    outDir: "dist-web",
    target: "esnext",
  },
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util", "libav.js"],
  },
  server: {
    // Allow Vercel preview hosts and their subdomains.
    allowedHosts: [".vercel.app", ".vercel.run","sb-6zepfy61p9ap.vercel.run"],
    hmr: false,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    // Serve the docs under /docs in dev by forwarding to the VitePress dev
    // server (run `npm run docs:dev`, which listens on 5174).
    proxy: {
      "/docs": {
        target: "http://localhost:5174",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  preview: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  test: {
    testTimeout: 30_000,
    teardownTimeout: 5_000,
    pool: "forks",
    exclude: ["**/node_modules/**", "**/.claude/**", "**/dist/**"],
  },
});