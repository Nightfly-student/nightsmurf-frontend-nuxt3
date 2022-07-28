<script setup lang="ts">
import apiFetch from "~~/composables/useInterceptorFetch";

const config = useRuntimeConfig();
const orders = await apiFetch(`${config.DOMAIN}/api/orders/history`);
orders.sort((a,b) => a.createdAt < b.createdAt);

useHead({
  title: "Order History",
});

</script>

<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12">
            <h1 class="pt-3 text-center">Order History</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container-xl">
      <div v-if="orders.length != 0" class="divider-top">
        <p class="text-light">Your Order History</p>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Order Number</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Order Date</th>
              <th scope="col">Check Order</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <th scope="row" class="align-middle">{{ order._id }}</th>
              <td class="align-middle">&euro;{{ order.total.toFixed(2) }}</td>
              <td class="align-middle">{{ order.paymentStatus }}</td>
              <td class="align-middle">
                {{ new Date(order.createdAt).toDateString() }}
              </td>
              <td class="align-middle">
                <NuxtLink class="btn btn-primary" :to="`/order/${order._id}`">
                  Order
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="divider-top">
        <h1 class="text-center">No Orders Found</h1>
      </div>
    </div>
  </div>
</template>

<style></style>
