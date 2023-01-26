<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";

const config = useRuntimeConfig();
const route = useRoute();
const blogs = await apiFetch(`${config.DOMAIN}/api/blogs/?page=1&limit=3`);
</script>

<template>
  <div class="text-white container-xl pb-5">
    <h2 class="text-center pb-2">Latest News</h2>
    <div class="row justify-content-center equal">
      <div class="col-12 col-lg-4" v-for="blog in blogs.docs" :key="blog.slug">
        <NuxtLink :to="`/blog/${blog.slug}`" class="card card-hover rounded h-100 text-decoration-none text-white rounded">
          <img
            class="img-fluid rounded"
            :alt="blog.headAlt"
            :title="blog.headTitle"
            :src="blog.head"
          />
          <h2 class="fs-4 text-center pt-2">{{ blog.title }}</h2>
          <p class="d-inline-block fs-6 p-2 text-truncate">{{ blog.metaDesc }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 10px;
  transition: 100ms ease-in-out;
  cursor: pointer;
}
.card-hover:hover {
  transform: scale(1.05);
}
</style>
