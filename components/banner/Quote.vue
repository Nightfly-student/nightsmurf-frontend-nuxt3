<script setup lang="ts">

interface QuoteProps {
    title: string,
    highlight: string
}

const QuoteProps = defineProps<QuoteProps>();

</script>

<template>
  <div class="banner">
    <h1 id="banner_text" class="text-center text-light p-5">
      {{title}} <span>{{highlight}}</span>
    </h1>
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