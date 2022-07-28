<script lang="ts" setup>
interface TextProps {
  single: string;
  title: string;
  bodies: string[];
}

const TextProp = defineProps<TextProps>();
</script>

<template>
  <div class="container p-5">
    <div class="row align-items-center justify-content-md-center text-light">
      <div class="col-12 col-md-8 col-lg-7 mb-5 text_box">
        <h6 class="text-primary">{{ single }}</h6>
        <h2>{{ title }}</h2>
        <p class="fs-5" v-for="body in bodies" :key="body">
          {{ body }}
        </p>
      </div>
    </div>
  </div>
</template>
