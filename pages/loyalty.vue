<script setup lang="ts">
import { BIconArrowThroughHeart } from "bootstrap-icons-vue";
import {useMainStore} from "@/stores";

const store = useMainStore();

useHead({
  title: "Get Discounts With Our Loyalty Program",
  meta: [
    {
      name: "description",
      content:
        "Nightsmurf's loyalty system is here, and it is ready to award our loyal customers. You will get rewarded discounted prices and more",
    },
    {
      property: "og:title",
      content: "Get Discounts With Our Loyalty Program - Nightsmurf",
    },
    {
      property: "og:description",
      content:
        "Nightsmurf's loyalty system is here, and it is ready to award our loyal customers. You will get rewarded discounted prices and more",
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
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12 text-center">
            <h1 class="pt-3">
              <BIconArrowThroughHeart class="text-primary pe-2" />Loyalty
              Program
            </h1>
            <router-link
              v-if="!store.getIsLogged"
              to="/login"
              class="btn btn-primary mt-3"
              >Login to see your progress</router-link
            >
          </div>
        </div>
      </div>
    </header>
    <div class="mt-5 mb-5">
      <LoyaltyProgress />
    </div>
    <div class="container">
      <div class="row align-items-center justify-content-md-center text-light">
        <div class="text-light pt-5 mt-5 col-12 col-md-8 col-lg-7 mb-5">
          <h2 class="text-center fs-1">How Does it work?</h2>
          <p class="fs-5">
            Nightsmurf's loyalty system is here, and it is ready to award our
            loyal customers. Currently the program consists of different tiers,
            offering various discounts. By reaching each threshold your account
            automatically adds the discount on to your next purchase. We made it
            possible for you to combine the tier based discount with our already
            existing coupons! By using them at the same time, we provide huge
            discounts for you!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
