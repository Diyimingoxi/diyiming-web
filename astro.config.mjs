import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://diyiming-web.diyiming.workers.dev",
  output: "server",
  adapter: cloudflare(),
  trailingSlash: "never",
  compressHTML: true
});
