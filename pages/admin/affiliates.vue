<script setup lang="ts">
import apiFetch from "~~/composables/useInterceptorFetch";
import { notify } from "@kyvg/vue3-notification";

const count = ref(0);
const limit = ref(20);
const page = ref(0);
const pages = ref(1);
const affiliates = ref([]);

const config = useRuntimeConfig();

async function getAffiliates() {
  page.value++;
  await apiFetch(
    `${config.DOMAIN}/api/affiliates?limit=${limit.value}&page=${page.value}`
  ).then((res) => {
    res.docs.forEach((a) => {
      affiliates.value.push(a);
    });
    pages.value = res.pages;
    count.value = res.total;
  });
}
async function PostPaid(id) {
  await apiFetch(`${config.DOMAIN}/api/affiliates/${id}`)
    .then((res) => {
      notify({
        text: res.data.message,
        type: "success",
      });
    })
    .catch((err) => {
      notify({
        text: err.response.data.message,
        type: "error",
      });
    });
}

onMounted(() => {
  getAffiliates();
});
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <h1 class="text-center text-light">Affiliate</h1>
      <p class="text-light fs-6">Total: {{ count }}</p>
      <div class="overflow-auto w-100">
        <table class="table table-dark">
          <thead>
            <tr class="text-center">
              <th scope="col">Name</th>
              <th scope="col">Percentage</th>
              <th scope="col">Coupon</th>
              <th scope="col">Url</th>
              <th scope="col">Available</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="a in affiliates" :key="a._id">
              <td class="align-middle" scope="row">{{ a.user }}</td>
              <td class="align-middle">{{ a.percentage }}%</td>
              <td class="align-middle">{{ a.coupon }}</td>
              <td class="align-middle">/r/{{ a.url }}</td>
              <td class="align-middle">&euro;{{ a.available.toFixed(2) }}</td>
              <td class="align-middle">
                <button class="btn btn-success me-1" @click="PostPaid(a._id)">
                  Paid Out
                </button>
                <button
                  :data-bs-target="'#WidgetUrl' + a._id"
                  data-bs-toggle="modal"
                  class="btn btn-primary"
                >
                  Update Widget
                </button>
                <ModalUpdateWidget :affiliate="a" />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          v-if="!(page >= pages)"
          @click="getAffiliates"
          class="btn btn-primary"
        >
          Load More
        </button>
      </div>
    </NuxtLayout>
  </div>
</template>

<style></style>
