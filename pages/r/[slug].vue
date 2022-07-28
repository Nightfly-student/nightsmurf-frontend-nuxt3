<script setup lang="ts">
import { useMainStore } from "~~/stores";

const store = useMainStore();
const route = useRoute();

store.affiliate(route.params.slug);

useHead({
  title: "Cheapest Smurf Accounts Only €3.99",
  meta: [
    {
      name: "description",
      content:
        "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
    },
    {
      property: "og:title",
      content: "Cheapest Smurf Accounts Only €3.99 - Nightsmurf",
    },
    {
      property: "og:description",
      content:
        "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
    },
    {
      property: "og:image",
      content:
        "https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>

<template>
  <h2 class="mt-5 pt-5 text-center text-light">Redirecting To Home...</h2>
</template>

<style></style>
