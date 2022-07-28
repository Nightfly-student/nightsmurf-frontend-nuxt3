import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    VueGtag,
    {
      includes: [{ id: "AW-10906096717" }, { id: "AW-363008517" }],
      config: {
        id: "UA-197110880-2",
      },
    },
    nuxtApp.$router
  );
});
