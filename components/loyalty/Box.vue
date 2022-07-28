<script setup lang="ts">
interface LoyaltyBoxProps {
  loyalty: object;
  royalty?: object;
}

const LoyaltyBoxP = defineProps<LoyaltyBoxProps>();
</script>

<template>
  <div class="col-6 col-sm-4 col-md-2">
    <div
      :class="royalty._id === loyalty._id ? 'active' : ''"
      class="card shadow bg-dark p-3"
    >
      <h2>{{ loyalty.name }}</h2>
      <p class="fs-4">{{ loyalty.discount }}%</p>
      <p>{{ loyalty.when }}</p>
    </div>
  </div>
</template>

<style scoped>
.bg-dark {
  background: #161616 !important;
}
.active {
  background: #0d6efd !important;
}
.card {
  transition: 10ms ease-in-out;
}
.card:hover {
  transform: scale(1.05);
}
</style>
