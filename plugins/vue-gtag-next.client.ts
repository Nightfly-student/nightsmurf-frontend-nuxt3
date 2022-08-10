import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-RPQJNZBZTK",
      params: {
        anonymize_ip: true,
      },
    },
  });
});
