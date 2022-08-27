<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";

const info = ref("");
const name = ref("");

const config = useRuntimeConfig();

async function addAuthor() {
  await apiFetch(`${config.DOMAIN}/api/author/add`, {
    method: "POST",
    body: {
      name: info.value,
      avatar: name.value,
    },
  }).then((res) => {
    console.log(res);
  });
}
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <h1 class="text-center text-light">Author</h1>

      <div class="card text-light">
        <h2>Add Author</h2>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Author Name</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Author Logo</label
          >
          <input
            type="text"
            v-model="info"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button @click="addAuthor" class="btn btn-primary">Add Author</button>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.card {
  background: #161616;
}
</style>
