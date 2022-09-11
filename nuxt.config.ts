import { defineNuxtConfig } from "nuxt";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ["@pinia/nuxt"],
  modules: ["@formkit/nuxt"],
  publicRuntimeConfig: {
    DOMAIN:
      process.env.DOMAIN || "https://sea-turtle-app-rre5x.ondigitalocean.app",
    URL: process.env.URL || "https://nightsmurf.com",
  },
  meta: {
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
        type: "text/javascript",
      },
    ],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  plugins: [{ src: "~/plugins/notification.client.ts", ssr: false }],
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
});
