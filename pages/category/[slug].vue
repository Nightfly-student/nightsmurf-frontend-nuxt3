<script setup lang="ts">
import apiFetch from "@/composables/useInterceptorFetch";
const route = useRoute();
const category = ref(route.params.slug);

const whatRegion = route.params.slug.toString().split("-")[3];
const config = useRuntimeConfig();
const { data, pending, error, refresh } = await useAsyncData(
  "data",
  async () => {
    let data;
    const region = route.params.slug.toString().split("-")[3];
    try {
      data = await apiFetch(
        `${config.DOMAIN}/api/products/productStock?region=${region}`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  {
    watch: [category],
  }
);
await refresh();

const head = async () => {
  useHead({
    title: `League of Legends ${whatRegion} accounts`,
    link: [
      {
        rel: "canonical",
        href: `${config.URL + route.fullPath}`,
      },
    ],
    meta: [
      {
        name: "description",
        content: `League Of Legends Smurf Accounts, Unranked, Fresh & Instant Delivery. We Offer 30k, 40k, 50k, 60k For EUW, EUNE, NA, TR, OCE, BR, LAS, LAN, RU`,
      },
      {
        property: "og:title",
        content: `League of Legends ${whatRegion} accounts - Nightsmurf`,
      },
      {
        property: "og:description",
        content: `League Of Legends Smurf Accounts, Unranked, Fresh & Instant Delivery. We Offer 30k, 50k, 60k For EUW, EUNE, NA, TR, OCE, BR, LAS, LAN, RU`,
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
    <div>
      <header class="text-light">
        <div class="container-xl">
          <div class="row">
            <div class="col-xl-7 col-sm-12 col-12">
              <h1 class="pt-3">League of Legends {{ whatRegion }} accounts</h1>
              <p class="">Unranked fresh League of Legends accounts</p>
            </div>
            <div class="col-xl-5 col-sm-12 col-12"></div>
          </div>
        </div>
      </header>
      <CategoryRegion />
      <div class="container-xl">
        <div class="row">
          <ShopWidgetContent
            v-if="data"
            :products="data.products"
            :stock="data.stock"
            :home="false"
          />
        </div>
      </div>
      <div class="pt-5 mt-5 pb-5 bg-dark">
        <div class="text-center">
          <div
            class="trustpilot-widget"
            data-locale="en-US"
            data-template-id="5419b6a8b0d04a076446a9ad"
            data-businessunit-id="60929b432ebaea0001d71961"
            data-style-height="24px"
            data-style-width="100%"
            data-theme="dark"
            data-min-review-count="10"
          >
            <a
              href="https://www.trustpilot.com/review/nightsmurf.com"
              alt="Trustpilot Reviews Nightsmurf"
              title="Trustpilot Nightsmurf"
              target="_blank"
              rel="noopener"
              class="text-decoration-none"
              ><img
                height="75"
                src="https://res.cloudinary.com/droomsocial/image/upload/v1661588879/Untitled_mmveru.png"
            /></a>
          </div>
        </div>
      </div>
      <div class="container-xl mt-5 text-light">
        <h2 class="text-center pb-4">
          Looking for a {{ whatRegion.toUpperCase() }} account? You are at the
          right place
        </h2>
        <BoxesHero />
        <TextHelper
          :title="`Why should you buy a ${whatRegion.toUpperCase()} smurf account?`"
          :single="'Cheap LoL Smurf'"
          :bodies="[
            `   It takes a regular League Of Legends player over 30 days to level
              up an account from level 1 to 30. Since you found out about
              Nightsmurf.com, you don't have to worry about it. You will get
              your smurf account instantly in your mail and on our dashboard.`,
            `We all love to play League Of Legends and keep getting an higher
              elo. Every day/week/month we jump into League Of Legends for a
              ranked game just to climb to that dream rank, but... we all know
              that it keeps getting harder and harder`,
            `              While grinding ${whatRegion.toUpperCase()} League of Legends on your main
              account, you could end up getting stuck in a rank. This may be the
              case of bad team mates, or you not improving fast enough. A LoL
              smurf account could save you. You may start from scratch again,
              but when you reach your own elo, your account will have a better
              MMR. This means you earn more LP and you get a Higher Rank`,
          ]"
        />

        <TextHelper
          :title="`Who are we?`"
          :single="'Who?'"
          :bodies="[
            `   We are Nightsmurf.com and are dedicated League of Legends since
              2016. We changed names, we changed platforms and ended up creating
              our own webshop.`,
            `Over the years we learned that being a LoL seller is risky. We
              dealed with scammers, we dealed with issues from payment provider
              and even dealed with issue from the goverment. We overcame these
              things to get you the best product and service we can deliver.`,
            `              Now we are here, with a brand new site, brand new community and
              some new team members. Hopefully we will end up being your
              favorite account supplier.`,
          ]"
        />
      </div>
    </div>
    <div v-if="error">
      <Error404Main />
    </div>
  </div>
</template>

<style scoped>
.bg-dark {
  background: #161616 !important;
}
</style>
