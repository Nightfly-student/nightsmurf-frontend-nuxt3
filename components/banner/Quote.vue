<script setup lang="ts">

interface QuoteProps {
    title: string,
    highlight: string
}

const QuoteProps = defineProps<QuoteProps>();

</script>

<template>
  <div class="banner">
    <h2 id="banner_text" class="text-center text-light p-5 fs-1">
      {{title}} <span>{{highlight}}</span>
    </h2>
  </div>
</template>

<style scoped>
.banner {
  background: #161616;
}
span {
  color: #0d62e0;
}
</style>