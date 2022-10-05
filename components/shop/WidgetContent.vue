<script setup lang="ts">
import apiFetch from "@/composables/useInterceptorFetch";
import { useMainStore } from "@/stores";

interface ShoppingProps {
  products: any;
  stock: object;
  home: boolean;
}

const stockAmount = ref(0)

const newProps = defineProps<ShoppingProps>();

stockAmount.value = countStock(newProps.stock)

watch(() => newProps.stock, (value) => {
  stockAmount.value = countStock(value)
})

function countStock(stock) {
  var number = 0
  Object.values(stock).forEach((s : number) => {
    number = number + s
  })
  return number
}

</script>

<template>
  <div class="container-xl">
    <div class="row justify-content-center g-4 gy-5 pt-5" v-if="countStock(stock)">
      <ShopItemCard
        v-for="product in products"
        :key="product.slug"
        :product="product"
        :stock="stock[product.licenceType]"
        :home="home"
        class="col-lg-4 col-md-6 col-12"
      />
    </div>
    <div v-else>
      <p class="text-center text-white fs-4 pt-5">No Accounts in stock...</p>
    </div>
  </div>
</template>

<style scoped></style>
