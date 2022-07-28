<script setup lang="ts">
useHead({
  title: "Admin Dashboard"
});
</script>


<template>
  <div class="row">
    <div class="col-1 col-sm-3 col-md-2">
      <LayoutNavAdmin />
    </div>
    <div class="col-11 col-sm-9 col-md-10">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.row {
  max-width: 100% !important;
  margin-top: 100px;
}
</style>
