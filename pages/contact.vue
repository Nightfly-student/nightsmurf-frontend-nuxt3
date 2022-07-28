<script setup lang="ts">
const discord = () => {
  window.open("https://discord.gg/yQ82SJHcU4");
};
useHead({
  title: "Contact Us",
  meta: [
    {
      name: "description",
      content:
        "Got problems with an order or have questions that need answers? ask us through our Discord server",
    },
    {
      property: "og:title",
      content: "Contact Us - Nightsmurf",
    },
    {
      property: "og:description",
      content:
        "Got problems with an order or have questions that need answers? ask us through our Discord server",
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
            <h1 class="pt-3 text-center">Contact Us</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="divider-top">
      <div class="container-xl text-light">
        <div>
          <h1>Hello, We are Nightsmurf :)</h1>
          <p class="m-0">
            We are here to help you with the questions you might have.
          </p>
          <p>We are looking forward to see your questions.</p>
        </div>
        <div class="w-50 bg-primary p-2 rounded">
          <h4 class="m-0">
            You can contact support through our
            <span @click="discord">Discord server</span>.
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider-top {
    padding-top: 100px;
    padding-bottom: 200px;
}
span {
  color: rgb(3, 3, 3);
}
span:hover {
  color: rgb(39, 39, 39);
  cursor: pointer;
}
</style>
