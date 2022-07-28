<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";

const users = ref([]);
const page = ref(0);
const limit = ref(10);
const pages = ref(1);
const total = ref(0);
const availableRoles = ref([]);

const config = useRuntimeConfig();

async function getAllUsers() {
  page.value++;
  await apiFetch(
    `${config.DOMAIN}/api/users/?limit=${limit.value}&page=${page.value}`
  ).then((res) => {
    pages.value = res.pages;
    total.value = res.total;
    res.docs.forEach((user) => {
      users.value.push(user);
    });
  });
}
async function getRoles() {
  await apiFetch(`${config.DOMAIN}/api/roles`).then((res) => {
    availableRoles.value = res;
  });
}

onMounted(() => {
  getAllUsers();
  getRoles();
});
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <h1 class="text-center text-light">Users</h1>
      <p class="text-light fs-6">Total: {{ total }}</p>
      <div class="overflow-auto w-100">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <th class="align-middle" scope="row">{{ user.name }}</th>
              <td class="align-middle">{{ user.email }}</td>
              <td class="align-middle">
                {{ new Date(user.createdAt).toDateString() }}
              </td>
              <td class="align-middle">
                <button
                  class="btn btn-primary"
                  :data-bs-target="'#UserModal' + user._id"
                  data-bs-toggle="modal"
                >
                  Edit
                </button>
                <ModalUser :availableRoles="availableRoles" :user="user" />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          v-if="!(page >= pages)"
          @click="getAllUsers"
          class="btn btn-primary"
        >
          Load More
        </button>
      </div>
    </NuxtLayout>
  </div>
</template>

<style></style>
