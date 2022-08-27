<script setup lang="ts">
import {
  BIconFacebook,
  BIconTwitter,
  BIconInstagram,
  BIconYoutube,
} from "bootstrap-icons-vue";
import apiFetch from "~~/composables/useInterceptorFetch";

const config = useRuntimeConfig();
const route = useRoute();
const blogs = await apiFetch(`${config.DOMAIN}/api/blogs/?page=1&limit=6`);

useHead({
  title: "Our Blog",
  link: [
    {
      rel: "canonical",
      href: `${config.URL + route.fullPath}`,
    },
  ],
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
    <!-- <header class="text-light">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">Blog Posts</h1>
            <p class="">Written with love</p>
          </div>
          <div class="col-xl-5 col-sm-12 col-12"></div>
        </div>
      </div>
    </header> -->
    <div class="container-xl divider-top pb-4">
      <div class="row gx-5">
        <div class="col-12 col-md-8">
          <NuxtLink
            v-for="blog in blogs.docs"
            type="div"
            :key="blog.slug"
            :to="'/blog/' + blog.slug"
            class="card mb-4 text-light shadow text-decoration-none"
          >
            <img
              :src="`${blog.head}`"
              class="img-fluid img-size"
              alt=""
            />
            <div class="card-block px-2 pt-4">
              <h4 class="card-title">{{ blog.title }}</h4>
              <p
                class="card-text pb-4 mb-5"
                v-html="blog.metaDesc"
              ></p>
              <div class="position-absolute bottom-0 mb-3">
                <NuxtLink :to="'/blog/' + blog.slug" class="btn btn-outline-primary"
                  >Continue Reading</NuxtLink
                >
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="col-12 col-md-4">
          <div class="card text-light text-center p-3 shadow mb-4">
            <img
              src="https://res.cloudinary.com/droomsocial/image/upload/v1660981332/kisspng-league-of-legends-riot-games-video-game-electronic-5b21cc6d6ba390.7943858115289416774409_kqk6yb.png"
              alt="content writer logo"
              title="writer logo"
              class="w-75 m-auto"
            />
            <h4>Content Writer</h4>
            <p>
              Tony is our pro LoL player from the Netherlands. Challenger past
              seasons and smurfing daily.
            </p>
          </div>
          <div class="card text-light text-center p-3 shadow">
            <div class="w-75 m-auto">
              <h4>Follow Us</h4>
              <hr />
              <div class="mb-3">
                <NuxtLink to="https://twitter.com/Nightsmurf_com"
                  ><BIconTwitter class="icon-size me-4"
                /></NuxtLink>
                <NuxtLink to="https://www.instagram.com/nightsmurf_com/?hl=en"
                  ><BIconInstagram class="icon-size me-4"
                /></NuxtLink>
                <NuxtLink
                  to="https://www.youtube.com/channel/UCHxqE196yW9jixWDc3LsKXQ"
                  ><BIconYoutube class="icon-size me-4"
                /></NuxtLink>
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
.icon-size {
  height: 30px;
  width: 30px;
}
</style>
