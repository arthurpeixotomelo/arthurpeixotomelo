import react from "@astrojs/react";
import deno from "@deno/astro-adapter";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import { defineConfig, memoryCache, svgoOptimizer, logHandlers } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: deno(),
  cache: { provider: memoryCache() },
  experimental: {
    clientPrerender: true,
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
  },
  integrations: [react()],
  logger: logHandlers.compose(
    logHandlers.console({ level: "info" }),
    logHandlers.json({ level: "info", pretty: true }),
    logHandlers.node({ level: "info" }),
  ),
  output: "server",
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    build: {
      cssMinify: "lightningcss"
    },
    css: {
      lightningcss: {
        targets: browserslistToTargets(browserslist(">= 1.5%")),
      },
      transformer: "lightningcss",
    },
    ssr: {
      noExternal: ["@astrojs/react"],
    },
  },
});
