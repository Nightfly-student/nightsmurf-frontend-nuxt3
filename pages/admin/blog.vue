<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";

const title = ref("");
const body = ref("");

const head = ref("");
const headTitle = ref("");
const headAlt = ref("");

const author = ref("");
const est = ref(0);
const tags = ref("");
const slug = ref("");
const metaTitle = ref("");
const metaDesc = ref("");

const config = useRuntimeConfig();

async function submit() {
  await apiFetch(`${config.DOMAIN}/api/blogs/new`, {
    method: "POST",
    body: {
      title: title.value,
      body: body.value,
      head: head.value,
      headTitle: headTitle.value,
      headAlt: headAlt.value,
      author: author.value,
      est: est.value,
      tags: tags.value.split(","),
      slug: slug.value,
      metaTitle: metaTitle.value,
      metaDesc: metaDesc.value,
    },
  }).then((res) => {
    console.log(res);
  });
}
</script>

<template>
  <NuxtLayout name="admin">
    <h1 class="text-center text-light">Blogs</h1>

    <div class="card text-light">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Title</label>
        <input
          v-model="title"
          class="form-control"
          type="text"
          placeholder="title"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Body</label>
        <br />
        <textarea v-model="body" placeholder="body" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Head Image</label>
        <input
          v-model="head"
          class="form-control"
          type="text"
          placeholder="head image url"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Head Title</label>
        <input
          v-model="headTitle"
          class="form-control"
          type="text"
          placeholder="head title"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Head Alt</label>
        <input
          v-model="headAlt"
          class="form-control"
          type="text"
          placeholder="head alt"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Author ID</label>
        <input
          v-model="author"
          class="form-control"
          type="text"
          placeholder="author"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Estimate Read Time</label
        >
        <input v-model="est" class="form-control" type="number" min="0" />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Tags</label>
        <input
          class="form-control"
          type="text"
          placeholder="tags splitting with ,"
          v-model="tags"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Unique Slug</label>
        <input
          class="form-control"
          type="text"
          placeholder="slug"
          v-model="slug"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Meta Title</label>
        <input
          class="form-control"
          type="text"
          placeholder="metaTitle"
          v-model="metaTitle"
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Meta Desc</label>
        <textarea
          class="form-control"
          placeholder="metaDesc"
          v-model="metaDesc"
        />
      </div>

      <button @click="submit" class="btn btn-primary">Add Post</button>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.card {
  background: #161616 !important;
}
</style>
