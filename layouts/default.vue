<script setup lang="ts">
import { useI18n } from 'vue-i18n'
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nightsmurf` : "Nightsmurf";
  },
  htmlAttrs: {
    lang: "en",
  },
});

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

onMounted(() => {
  const t = useI18n();
  t.locale.value = navigator.language.split('-')[0];
});
</script>

<template>
  <div>
    <client-only>
      <notifications />
    </client-only>

    <LayoutNav />
    <transition name="page">
      <slot />
    </transition>
    <LayoutFooter />
    <!-- <LayoutTopBar /> -->
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Merriweather+Sans:wght@800&display=swap");

body {
  font-family: "Fredoka", sans-serif !important;
  background: #111111 !important;
}
h1,
h2,
h3,
h4 {
  font-family: "Merriweather Sans", sans-serif !important;
}
.wrapper {
  background: #121212;
  min-height: 100vh;
}
.vue-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 16px !important;
  color: #ffffff;
  text-align: center !important;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
