<script lang="ts" setup>
import apiFetch from "@/composables/useInterceptorFetch";
import { useMainStore } from "~~/stores";

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

const route = useRoute();
const slug = ref(route.params.slug);
const {
  data: product,
  pending,
  refresh,
} = await useAsyncData(
  "product",
  async () => {
    let product;
    const config = useRuntimeConfig();
    const region = route.params.slug.toString().split("-")[4];
    try {
      product = await apiFetch(
        `${config.DOMAIN}/api/products/product/${slug.value}?region=${region}`
      );
      return product;
    } catch (e) {
      console.log(e);
    }
  },
  {
    watch: [slug],
  }
);
await refresh();

const head = async () => {
  useHead({
    title: `${product.value.product.title}`,
    link: [
      {
        rel: "canonical",
        href: `${config.URL + route.fullPath}`,
      },
    ],
    meta: [
      {
        name: "description",
        content: `${product.value.product.body.substring(0, 150)}`,
      },
      {
        property: "og:title",
        content: `${product.value.product.title} - Nightsmurf`,
      },
      {
        property: "og:description",
        content: `${product.value.product.body.substring(0, 150)}`,
      },
      {
        property: "og:image",
        content: `https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png`,
      },
      { property: "og:type", content: "website" },
    ],
  });
};
await head();
</script>

<template>
  <div>
    <div v-if="product">
      <header class="text-light">
        <div class="container-xl">
          <div class="row">
            <div class="col-xl-12 col-sm-12 col-12">
              <h1 class="pt-3 text-center">{{ product.product.title }}</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="container-xl">
        <NuxtLink
          class="btn btn-primary mt-3"
          :to="`/category/league-of-legends-${product.product.region}-accounts`"
        >
          Back To {{ product.product.region.toUpperCase() }} Accounts
        </NuxtLink>
        <div class="row pt-5 pb-5 text-light">
          <div class="col-lg-6 col-md-12">
            <img
              class="m-2 img-size d-md-block d-none"
              src="/assets/images/Yone_1_splash.jpg"
              title="Yone Product Image"
              alt="Nightsmurf Product Image of Yone"
            />
          </div>
          <div class="col-lg-6 col-md-12 pt-5 mt-5">
            <h4>{{ product.product.title }}</h4>
            <div class="row pt-4">
              <div class="col-md-4 col-12">
                <p class="mb-0">Price per account</p>
                <p>
                  <strong
                    >&euro;{{ product.product.price.toFixed(2) }} euro</strong
                  >
                </p>
              </div>
              <div class="col-md-4 col-12">
                <p class="mb-0">Blue Essence</p>
                <p>
                  <strong
                    >{{ product.product.blueEssence }}+ Blue Essence</strong
                  >
                </p>
              </div>
              <div class="col-md-4 col-12">
                <p class="mb-0">Region</p>
                <p>
                  <strong>{{ product.product.region.toUpperCase() }}</strong>
                </p>
              </div>
            </div>
            <div class="text-center">
              <button
                v-if="product.stock != 0"
                :data-bs-target="'#CheckoutModal' + product.product._id"
                data-bs-toggle="modal"
                class="btn btn-primary fs-5"
              >
                Buy Now
              </button>
              <button v-else class="btn btn-primary fs-5 disabled">
                Out of Stock
              </button>
            </div>
            <hr />
            <h4>Description</h4>
            <p>{{ product.product.body }}</p>
          </div>
        </div>
      </div>
      <ModalCheckout :product="product.product" :stock="product.stock" />
    </div>
    <div v-if="!product && mounted">
      <Error404Main />
    </div>
  </div>
</template>

<style scoped>
.img-size {
  height: 820px;
  width: 100%;
  object-fit: cover;
}
.margin-spinner {
  margin-top: 300px;
}
</style>
