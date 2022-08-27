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
        `${blogConfig.DOMAIN}/api/blogs/${route.params.slug}?page=1&limit=3`
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

if (!blog.value) {
  navigateTo("/blog");
}

const head = async () => {
  useHead({
    title: `${blog.value.blog.metaTitle}`,
    link: [
      {
        rel: "canonical",
        href: `${blogConfig.URL + route.fullPath}`,
      },
    ],
    meta: [
      {
        name: "description",
        content: `${blog.value.blog.metaDesc}`,
      },
      {
        property: "og:title",
        content: `${blog.value.blog.metaTitle} - Nightsmurf`,
      },
      {
        property: "og:description",
        content: `${blog.value.blog.metaDesc}`,
      },
      {
        property: "og:image",
        content: `${blog.value.blog.head}`,
      },
      {
        property: "og:image:width",
        content: 1920,
      },
      {
        property: "og:image:height",
        content: 1080,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:label1",
        content: "Written by",
      },
      {
        name: "twitter:data1",
        content: `${blog.value.blog.author}`,
      },
      {
        name: "twitter:label2",
        content: "Est. reading time",
      },
      {
        name: "twitter:data2",
        content: `${blog.value.blog.est} minutes`,
      },
      { property: "og:type", content: "article" },
      {
        property: "article:published_time",
        content: blog.value.blog.createdAt,
      },
      { property: "article:modified_time", content: blog.value.blog.updatedAt },
    ],
  });
};
await head();
const blogs = await apiFetch(`${blogConfig.DOMAIN}/api/blogs/recent/${route.params.slug}?page=1&limit=5`);
console.log(blogs);
</script>

<template>
  <div class="container-xl pt-5" v-if="blog">
    <div class="row no-gutter gy-4 pt-5">
      <div class="col-12 col-xl-8">
        <div class="text-light w-100 h-100 card m-auto shadow px-3">
          <img
            class="img-size pt-3 pb-3 m-auto"
            :alt="blog.blog.headAlt"
            :title="blog.blog.headTitle"
            :src="`${blog.blog.head}`"
          />
          <p class="text-end text-muted pe-4 m-0 pb-2">
            {{ new Date(blog.blog.createdAt).toDateString() }}
          </p>
          <h1 class="text-center">{{ blog.blog.title }}</h1>
          <div id="blogPost" class="pb-4">
            <div v-html="blog.blog.body" />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
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

        <div class="card text-light p-3 shadow mb-4">
          <h4 class="text-center">Author</h4>
          <hr />
          <div class="m-auto">
            <img class="img-fluid img-circle" :src="blog.author.avatar" />
            <p class="fs-4 text-start mt-2">{{ blog.author.author }}</p>
          </div>
        </div>

        <div class="card text-light p-3 mb-4 shadow">
          <div>
            <h4 class="text-center">Recent Articles</h4>
            <hr />
            <div class="d-flex flex-column">
              <div
                v-for="blog in blogs.docs"
                :key="blog.slug"
                class="mb-3 card shadow bg-dark"
              >
                <div class="row align-items-center gy-2">
                  <div class="col-3 col-lg-5">
                    <img :src="`${blog.head}`" class="img-recent" alt="" />
                  </div>
                  <div class="col-7 col-lg-7 align-middle">
                    <NuxtLink
                      :to="'/blog/' + blog.slug"
                      class="text-light text-decoration-none t-hover"
                      >{{ blog.title }}</NuxtLink
                    >
                    <p class="m-0 small-size">
                      {{ new Date(blog.createdAt).toDateString() }}
                    </p>
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
.img-circle {
  border-radius: 50%;
  height: 75px;
  width: 75px;
}
</style>
