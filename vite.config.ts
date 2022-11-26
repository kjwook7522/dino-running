import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";
import type { ServerOptions, PluginOption } from "vite";

const server: ServerOptions = {
  host: "localhost",
  port: 8080,
};

const plugins: PluginOption = [tsconfigPaths({}), svelte()];

export default defineConfig({
  plugins,
  server,
  css: {
    modules: {
      generateScopedName: "[local]___[hash:base64:4]",
    },
  },
  clearScreen: true,
});
