<script setup lang="ts">
import {
  BIconFacebook,
  BIconTwitter,
  BIconInstagram,
  BIconYoutube,
} from "bootstrap-icons-vue";
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

const { data: blogs } = useFetch(`${blogConfig.DOMAIN}/api/blogs/?limit=2`);
const head = async () => {
  useHead({
    title: `${blog.value.front.metaTitle}`,
    link: [
      {
        rel: "canonical",
        href: `${blogConfig.URL + route.fullPath}`,
      },
    ],
    meta: [
      {
        name: "description",
        content: `${blog.value.front.metaDesc}`,
      },
      {
        property: "og:title",
        content: `${blog.value.front.metaTitle} - Nightsmurf`,
      },
      {
        property: "og:description",
        content: `${blog.value.front.metaDesc}`,
      },
      {
        property: "og:image",
        content: `${blog.value.front.socialImage}`,
      },
      { property: "og:type", content: "article" },
    ],
  });
};
await head();
</script>

<template>
  <div class="container-xl pt-5">
    <div class="row no-gutter pt-5">
      <div class="col-12 col-md-8">
        <div class="text-light w-100 h-100 card m-auto shadow px-3">
          <img
            class="img-size pt-3 pb-3 m-auto"
            :src="`${blog.front.socialImage}`"
          />
          <h1 class="text-center">{{ blog.front.title }}</h1>
          <div id="blogPost" class="pb-4">
            <div v-html="blog.content" />
            <hr />
            <div class="row">
              <div>
                <p class="m-0">Author: {{ blog.front.author }}</p>
                <p class="m-0">Posted At {{ blog.front.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card text-light text-center p-3 shadow mb-4">
          <img
            src="https://res.cloudinary.com/droomsocial/image/upload/v1659094304/free-lootbox_gm8h7u.png"
            alt="content writer logo"
            title="writer logo"
            class="w-50 m-auto"
          />
          <h4>Get a Free LoL Account</h4>
          <p>
            Open our daily lootbox to win a free League of Legends account, or
            an coupon!
          </p>
          <NuxtLink
            type="button"
            to="/free-lol-account"
            class="btn btn-primary w-75 m-auto border-rounded"
            >Open Now!</NuxtLink
          >
        </div>
        <div class="card text-light p-3 mb-4 shadow">
          <div>
            <h4 class="text-center">Recent Articles</h4>
            <hr />
            <div class="d-flex flex-column">
              <div
                v-for="blog in blogs"
                :key="blog.slug"
                class="mb-3 card shadow bg-dark"
              >
                <div class="row align-items-center">
                  <div class="col-4 col-md-4">
                    <img
                      :src="`${blog.frontmatter.socialImage}`"
                      class="img-recent"
                      alt=""
                    />
                  </div>
                  <div class="col-6 col-md-8 align-middle">
                    <NuxtLink
                      :to="'/blog/' + blog.slug"
                      class="text-light text-decoration-none t-hover"
                      >{{ blog.frontmatter.title }}</NuxtLink
                    >
                    <p class="m-0 small-size">{{ blog.frontmatter.date }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
</template>

<style scoped>
.card {
  border: none;
  background: #161616;
}
.img-size {
  width: 90%;
  border-radius: 50px;
}
#blogPost :deep() img {
  max-width: 100% !important;
}
#blogPost :deep() p {
  font-size: 18px;
}
#blogPost :deep() h2 {
  padding-top: 40px;
}
#blogPost :deep() h3 {
  padding-top: 40px;
}
#blogPost :deep() a {
  text-decoration: none;
}
.icon-size {
  height: 30px;
  width: 30px;
}
.img-recent {
  height: 75px;
  width: auto;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.small-size {
  font-size: 12px;
}
.t-hover:hover {
  color: rgb(184, 184, 184) !important;
}
.bg-dark {
  background: #1e1e1e !important;
}
</style>
