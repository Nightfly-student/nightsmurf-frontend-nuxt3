<script setup lang="ts">
import apiFetch from '~~/composables/useInterceptorFetch';

const limit = ref(10);
const page = ref(0);
const winners = ref([]);
const count = ref(0);
const pages = ref(1);

const config = useRuntimeConfig();

async function loadItems() {
    page.value++;
    await apiFetch(`${config.DOMAIN}/api/winnings/?limit=${limit.value}&page=${page.value}`).then((res) => {     
        res.docs.forEach((doc) => {
            winners.value.push(doc);
        })
        count.value = res.total;
        pages.value = res.pages;
    })
}

onMounted(() => {
    loadItems();
})
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <h1 class="text-center text-light">Lootbox</h1>
      <p class="text-light fs-6">Total: {{ count }}</p>
      <div class="overflow-auto w-100">
        <table class="table table-dark">
          <thead>
            <tr class="text-center">
              <th scope="col">Icon</th>
              <th scope="col">User</th>
              <th scope="col">Item</th>
              <th scope="col">Type</th>
              <th scope="col">Rarity</th>
              <th scope="col">Won At</th>
              <th scope="col">IP</th>
              <th scope="col">Claimed</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="winner in winners" :key="winner._id">
              <th class="align-middle" scope="row">
                <img
                  class="img-fluid img-size"
                  :src="JSON.parse(winner.loot).image"
                />
              </th>
              <td class="align-middle">{{ JSON.parse(winner.user).email }}</td>
              <td class="align-middle">{{ JSON.parse(winner.loot).name }}</td>
              <td class="align-middle">{{ winner.lootType }}</td>
              <td class="align-middle">{{ JSON.parse(winner.loot).rarity }}</td>
              <td class="align-middle">
                {{ new Date(winner.createdAt).toDateString() }}
              </td>
              <td class="align-middle">{{ winner.ip }}</td>
              <td class="align-middle">{{ winner.claimed }}</td>
              <td class="align-middle">
                <button
                  class="btn btn-primary"
                  :data-bs-target="'#LicenceModal' + winner._id"
                  data-bs-toggle="modal"
                >
                  Edit
                </button>
                <ModalAdminLicence :winning="winner" />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          v-if="!(page >= pages)"
          @click="loadItems"
          class="btn btn-primary"
        >
          Load More
        </button>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.img-size {
  height: 75px;
}
</style>
