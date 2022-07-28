<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import { useMainStore } from "~~/stores";

const orders = ref([]);
const holdOrders = ref([]);
const total = ref(0);
const limit = ref(20);
const page = ref(0);

const store = useMainStore();
const config = useRuntimeConfig();

async function getOrders() {
  page.value++;

  await apiFetch(
    `${config.DOMAIN}/api/orders/?limit=${limit.value}&page=${page.value}`
  )
    .then((res) => {
      res.docs.forEach((doc) => {
        holdOrders.value.push(doc);
      });
      total.value = res.total;
      orders.value = holdOrders.value.filter(
        (order) => order.paymentStatus === "completed"
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

function sort(value) {
  if (value === "1") {
    orders.value = holdOrders.value.filter(
      (order) => order.paymentStatus === "completed"
    );
  }
  if (value === "2") {
    orders.value = holdOrders.value.filter(
      (order) => order.paymentStatus === "pending"
    );
  }
  if (value === "3") {
    orders.value = holdOrders.value;
  }
}

onMounted(() => {
  getOrders();
});
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <h1 class="text-center text-light">Orders</h1>
      <div class="row">
        <div class="col">
          <p class="text-white">Total Orders: {{ total }}</p>
        </div>
        <div class="col">
          <select
            class="form-select bg-dark text-light w-25 float-end my-2"
            aria-label="Default select example"
            @change="sort($event.target.value)"
          >
            <option selected value="1">Completed</option>
            <option value="2">Processing</option>
            <option value="3">All</option>
          </select>
        </div>
      </div>
      <div class="overflow-auto w-100">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Email</th>
              <th scope="col">Total</th>
              <th scope="col">Date</th>
              <th scope="col">Method</th>
              <th scope="col">Status</th>
              <th scope="col">Check</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <th class="align-middle" scope="row">{{ order._id }}</th>
              <td class="align-middle">{{ order.email }}</td>
              <td class="align-middle">&euro;{{ order.total }}</td>
              <td class="align-middle">
                {{ new Date(order.createdAt).toDateString() }}
              </td>
              <td class="align-middle">{{ order.paymentMethod }}</td>
              <td class="align-middle">{{ order.paymentStatus }}</td>
              <td class="align-middle">
                <NuxtLink
                  v-if="store.getIsAdmin"
                  :to="`/order/${order._id}`"
                  class="btn btn-primary"
                  >Info</NuxtLink
                >
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="getOrders" class="btn btn-primary">Load More</button>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
/* @media (max-width: 540px) {
  .w-25 {
    width: 50% !important;
  }
} */
</style>
