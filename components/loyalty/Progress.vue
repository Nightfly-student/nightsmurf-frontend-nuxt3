<script setup lang="ts">
import apiFetch from "~~/composables/useInterceptorFetch";
import { useMainStore } from "@/stores";

const config = useRuntimeConfig();
const store = useMainStore();
const { data: loyalties } = await useFetch(`${config.DOMAIN}/api/loyalty`);

const royalty = ref({});

async function getRoyalty() {
  const r = await apiFetch(`${config.DOMAIN}/api/royalty/${store.getId}`);
  if (r) {
    royalty.value = r;
  }
}

onMounted(() => {
  if (store.getIsLogged) {
    getRoyalty();
  }
});
</script>

<template>
  <div class="container-xl">
    <div class="row justify-content-center text-light text-center g-4">
      <LoyaltyBox
        :royalty="royalty"
        :loyalty="loyalty"
        v-for="loyalty in loyalties"
        :key="loyalty._id"
      />
    </div>
  </div>
</template>

<style></style>
