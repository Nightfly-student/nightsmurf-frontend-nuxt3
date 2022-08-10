import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  nuxtApp.vueApp.use(
    VueGtag,
    {
      config: {
        id: "G-RPQJNZBZTK",
      },
    },
    router
  );
});