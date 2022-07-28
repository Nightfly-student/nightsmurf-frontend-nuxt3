<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import { notify } from "@kyvg/vue3-notification";

const revenueMonth = ref([]);
const mounted = ref(false);
const affiliates = ref([]);
const availableAffiliate = ref(false);

const config = useRuntimeConfig();

async function getRevenue() {
  await apiFetch(`${config.DOMAIN}/api/orders/revenue`).then((res) => {
    var date = new Date();
    if (res[date.getMonth()+1]) {
      revenueMonth.value = res[date.getMonth()+1];
    }
    mounted.value = true;
  });
}

function calculateRevenue() {
  var revenue = 0;
  if (revenueMonth.value != null) {
    revenueMonth.value.forEach((order) => {
      revenue += order.total;
    });
    return revenue.toFixed(2);
  }
}

async function getAffiliateRequests() {
  await apiFetch(`${config.DOMAIN}/api/submissions`)
    .then((res) => {
      affiliates.value = res;
      availableAffiliate.value = true;
    })
    .catch(() => {
      availableAffiliate.value = false;
    });
}

async function declineAffiliate(id) {
  await apiFetch(`${config.DOMAIN}/api/submissions/${id}`, {
    method: "DELETE",
  }).then((res) => {
    notify({
      text: res.message,
      type: "success",
    });
    var findIndex = affiliates.value.findIndex(
      (affiliates) => affiliates._id === id
    );
    affiliates.value.splice(findIndex, 1);
  });
}

async function acceptAffiliate(id) {
  await apiFetch(`${config.DOMAIN}/api/submissions/${id}`, {
    body: {
        accepted: true
    },
    method: "PUT",
  }).then((res) => {
    notify({
      text: res.message,
      type: "success",
    });
    var findIndex = affiliates.value.findIndex(
      (affiliates) => affiliates._id === id
    );
    affiliates.value.splice(findIndex, 1);
  });
}

onMounted(() => {
  getRevenue();
  getAffiliateRequests();
});
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <div class="text-light">
        <h1 class="text-center">Admin Dashboard</h1>
        <div class="row g-4">
          <div class="col-12 col-md-3">
            <div class="card p-3">
              <h2 class="text-center">This Month</h2>
              <p v-if="mounted" class="text-center fs-2">
                &euro;{{ calculateRevenue() }}
              </p>
            </div>
          </div>
          <div class="col-12" v-if="availableAffiliate">
            <div class="card p-3">
              <h2 class="text-center">Affiliate Requests</h2>
              <div class="overflow-auto w-100">
                <table class="table text-light">
                  <thead>
                    <tr>
                      <th scope="col">Email</th>
                      <th scope="col">Name</th>
                      <th scope="col">Platform</th>
                      <th scope="col">Traffic</th>
                      <th scope="col">Discord</th>
                      <th scope="col">Accept</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="a in affiliates" :key="a._id">
                      <th scope="row">{{ a.email }}</th>
                      <td>{{ a.name }}</td>
                      <td>{{ a.platform }}</td>
                      <td>{{ a.traffic }}</td>
                      <td>{{ a.discord }}</td>
                      <td>
                        <button
                          @click="acceptAffiliate(a._id)"
                          class="btn btn-primary me-2"
                        >
                          Accept
                        </button>
                        <button
                          @click="declineAffiliate(a._id)"
                          class="btn btn-danger"
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
</style>
