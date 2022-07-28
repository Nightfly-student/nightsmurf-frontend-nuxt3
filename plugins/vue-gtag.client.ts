import { defineNuxtPlugin } from "#app";
import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'UA-197110880-2'
    },
    appName: 'Nightsmurf',
    pageTrackerScreenviewEnabled: true
  }, nuxtApp.$router);
});
