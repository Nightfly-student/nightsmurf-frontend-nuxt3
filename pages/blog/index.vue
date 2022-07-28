<script setup lang="ts">

const config = useRuntimeConfig();
const {data: blogs} = useFetch(`${config.DOMAIN}/api/blogs`);

useHead({
  title: "Our Blog",
  meta: [
    {
      name: "description",
      content:
        "Nightsmurf Blog posts, these posts are about League Of Legends Smurfing and League Of Legends Related Content. Please Check it Out!",
    },
    { property: "og:title", content: "Our Blog" },
    {
      property: "og:description",
      content:
        "Nightsmurf Blog posts, these posts are about League Of Legends Smurfing and League Of Legends Related Content. Please Check it Out!",
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
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">Blog Posts</h1>
            <p class="">Written with love</p>
          </div>
          <div class="col-xl-5 col-sm-12 col-12"></div>
        </div>
      </div>
    </header>

    <div class="container-xl divider-top pb-4">
      <div
        v-for="blog in blogs"
        :key="blog.slug"
        @click="$router.push(`/blog/${blog.slug}`)"
        class="card mb-4 text-light"
      >
        <div class="row no-gutters">
          <div class="col-lg-5 col-sm-12 col-12">
            <img
              :src="`/assets/${blog.frontmatter.socialImage}`"
              class="img-fluid img-size"
              alt=""
            />
          </div>
          <div class="col-lg-6 col-sm-12 col-12">
            <div class="card-block px-2 pt-4">
              <h4 class="card-title">{{ blog.frontmatter.title }}</h4>
              <p
                class="card-text pb-4 mb-5"
                v-html="blog.frontmatter.metaDesc"
              ></p>
              <div class="position-absolute bottom-0 mb-3">
                <NuxtLink :to="'/blog/' + blog.slug" class="btn btn-primary"
                  >Read More</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none;
  background: #161616;
}
.img-size {
  max-width: 100%;
}
.card-title:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
