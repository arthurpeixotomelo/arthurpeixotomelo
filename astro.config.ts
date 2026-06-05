import react from "@astrojs/react";
import deno from "@deno/astro-adapter";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import { defineConfig, memoryCache, svgoOptimizer, logHandlers } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: deno(),
  compressHTML: "jsx",
  experimental: {
    cache: { provider: memoryCache() },
    clientPrerender: true,
    contentIntellisense: true,
    logger: logHandlers.compose(
      logHandlers.console({ level: "info" }),
      logHandlers.json({ level: "info", pretty: true }),
      logHandlers.node({ level: "info" }),
    ),
    queuedRendering: {
      enabled: true,
    },
    rustCompiler: true,
    svgOptimizer: svgoOptimizer(),
  },
  output: "server",
  prefetch: {
    prefetchAll: true,
  },
  integrations: [react()],
  vite: {
    build: {
      cssMinify: "lightningcss",
      sourcemap: true,
    },
    css: {
      lightningcss: {
        targets: browserslistToTargets(browserslist(">= 1.5%")),
      },
      transformer: "lightningcss",
    },
    ssr: {
      noExternal: ["@astrojs/react", "remark-pdf"],
    },
  },
});
