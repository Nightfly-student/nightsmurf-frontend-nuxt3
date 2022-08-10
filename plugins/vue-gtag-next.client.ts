import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "UA-197110880-2",
      params: {
        anonymize_ip: true,
      },
    },
  });
});
