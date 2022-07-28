<script setup lang="ts">
import apiFetch from "~~/composables/useInterceptorFetch";

const blogConfig = useRuntimeConfig();
const route = useRoute();

const selectedRoute = ref(route.params.slug);

const { data: blog, refresh } = await useAsyncData(
  "blog",
  async () => {
    let data;
    try {
      data = await apiFetch(
        `${blogConfig.DOMAIN}/api/blogs/${route.params.slug}`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  {
    watch: [selectedRoute],
  }
);
await refresh();

const head = async() => {
  useHead({
    title: `${blog.value.front.metaTitle}`,
    meta: [
      {
        name: "description",
        content: `${blog.value.front.metaDesc}`,
      },
      { property: "og:title", content: `${blog.value.front.metaTitle} - Nightsmurf` },
      {
        property: "og:description",
        content: `${blog.value.front.metaDesc}`,
      },
      {
        property: "og:image",
        content: `https://nightsmurf.com/assets/${blog.value.front.socialImage}`,
      },
      { property: "og:type", content: "article" },
    ],
  });
};
await head();
</script>

<template>
  <div class="container-xl pt-5">
    <div class="pt-5 text-light">
      <h1 class="text-center">{{ blog.front.title }}</h1>
      <img
        class="img-size pt-3 pb-3"
        :src="`/assets/${blog.front.socialImage}`"
      />
      <button class="btn btn-primary m-4" @click="$router.push('/blog')">
        Return to Blog
      </button>
      <div id="blogPost" class="pb-5">
        <div v-html="blog.content" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-size {
  width: 100%;
}
#blogPost :deep() img {
  max-width: 100% !important;
}
</style>
