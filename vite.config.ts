import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import path from "path";
import type { ServerOptions, PluginOption } from "vite";

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
  plugins,
  server,
  root: path.join(__dirname, "src"),
  css: {
    modules: {
      generateScopedName: "[local]___[hash:base64:4]",
    },
  },
  resolve: { alias: { "@": "./" } },
  clearScreen: true,
});
