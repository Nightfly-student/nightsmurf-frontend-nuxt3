<script setup lang="ts">
useHead({
  title: "Page not Found",
  meta: [
    {
      name: "description",
      content:
        "We could not find the page you have been looking for",
    },
    { property: "og:title", content: "Page not Found" },
    {
      property: "og:description",
      content:
        "We could not find the page you have been looking for",
    },
    {
      property: "og:image",
      content:
        "https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png",
    },
    { property: "og:type", content: "website" },
  ],
});

</script>

<template>
  <div class="pt-5 text-light">
    <div class="div-top text-center">
      <h1 class="fs-huge">404</h1>
      <h3>RIP... Page not Found</h3>
      <p>Maybe this page ragequitted</p>
      <NuxtLink class="btn btn-primary" to="/">Go To Home</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.div-top {
  padding-top: 200px;
}
.fs-huge {
    font-size: 160px;
}
</style>