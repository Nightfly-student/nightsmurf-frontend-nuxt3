<script setup lang="ts">
import apiFetch from "@/composables/useInterceptorFetch";
import { useMainStore } from "@/stores";

interface ShoppingProps {
  products: any;
  stock: object;
  home: boolean;
}
const newProps = defineProps<ShoppingProps>();

</script>

<template>
  <div class="container-xl">
    <div class="row justify-content-center p-3">
      <ShopItemCard
        v-for="product in products"
        :key="product.slug"
        :product="product"
        :stock="stock[product.licenceType]"
        :home="home"
      />
    </div>
  </div>
</template>

<style scoped></style>
