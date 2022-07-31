import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  nuxtApp.vueApp.use(
    VueGtag,
    {
      config: {
        id: "UA-197110880-2",
      },
    },
    router
  );
});