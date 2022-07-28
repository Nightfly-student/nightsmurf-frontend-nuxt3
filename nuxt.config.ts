import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ["@pinia/nuxt"],
  modules: ["@formkit/nuxt"],
  publicRuntimeConfig: {
    DOMAIN: process.env.DOMAIN,
    URL: process.env.URL,
  },
  meta: {
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      },
      { rel: "icon", type: "image/x-icon", href: "~/static/favicon.ico" },
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
});
