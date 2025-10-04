import { fileURLToPath, URL } from "node:url";
import VueRouter from "unplugin-vue-router/vite";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import vueDevTools from 'vite-plugin-vue-devtools' // compatibility issue with storybook https://github.com/vuejs/devtools/issues/703, disabling for now
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [VueRouter(), vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@mocks": fileURLToPath(new URL("./mocks", import.meta.url)),
    },
  },
});
