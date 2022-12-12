import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import path from "path";
import type { ServerOptions, PluginOption } from "vite";
console.log(process.env);

const isProduction = process.env.NODE_ENV === "production";

const base = isProduction ? "/dino-running/" : "";

const server: ServerOptions = {
  host: "localhost",
  port: 8080,
};

const plugins: PluginOption = [
  svelte({
    preprocess: sveltePreprocess(),
  }),
];

export default defineConfig({
  base,
  server,
  plugins,
  css: {
    modules: {
      generateScopedName: "[local]___[hash:base64:4]",
    },
  },
  resolve: { alias: { "@": path.join(__dirname, "src") } },
  clearScreen: true,
});
