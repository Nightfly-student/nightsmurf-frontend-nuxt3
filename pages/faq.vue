<script setup lang="ts">

useHead({
  title: "Frequently Asked Questions",
  meta: [
    {
      name: "description",
      content:
        "Get your answers here. Nightsmurf Frequently asked questions on a single page",
    },
    {
      property: "og:title",
      content: "Frequently Asked Questions - Nightsmurf",
    },
    {
      property: "og:description",
      content:
        "Get your answers here. Nightsmurf Frequently asked questions on a single page",
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
          <div class="col-xl-12 col-sm-12 col-12">
            <h1 class="pt-3 text-center">FAQ</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container-xl mt-5 pb-5">
      <div>
        <h2 class="text-white">Accounts</h2>
        <FaqAccount />
      </div>
      <div class="mt-5">
        <h2 class="text-white">Payment</h2>
        <FaqPayment/>
      </div>
    </div>
  </div>
</template>

<style></style>
