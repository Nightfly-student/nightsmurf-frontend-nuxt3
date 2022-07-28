<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";

const info = ref("");
const name = ref("");

const config = useRuntimeConfig();

async function addRole() {
  await apiFetch(`${config.DOMAIN}/api/roles/add`, {
    method: "POST",
    body: {
      info: info.value,
      name: name.value,
    },
  }).then((res) => {
    console.log(res);
  });
}

</script>

<template>
  <div>
    <NuxtLayout name="admin">
    <h1 class="text-center text-light">Roles</h1>

    <div class="card text-light">
      <h2>Add Role</h2>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Role Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Info</label>
        <input
          type="text"
          v-model="info"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button @click="addRole" class="btn btn-primary">Add Role</button>
    </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.card {
  background: #161616;
}
</style>
