import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    VueGtag,
    {
      config: {
        id: "G-YLDLC8FTSG",
      },
    },
    nuxtApp.$router
  );
});
