<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";

const region = ref("EUW");
const champions = ref({});
const skins = ref([]);
const championsHolder = ref({});
const version = ref("");
const selectedChampion = ref({});

const gotSelected = ref(false);

const {
  data: champion,
  pending,
  refresh,
} = await useLazyAsyncData(
  "champion",
  async () => {
    let champion;
    const config = useRuntimeConfig();
    try {
      champion = await apiFetch(`${config.DOMAIN}/api/skins/champions`);
      getSkinIds(region.value);
      champions.value = champion.champions;
      version.value = champion.version;
      championsHolder.value = champion.champions;
      return champion;
    } catch (e) {
      console.log(e);
    }
  },
  {
    server: false,
  }
);
refresh();

async function getSkinIds(reg) {
  const config = useRuntimeConfig();
  const data = await apiFetch(
    `${config.DOMAIN}/api/licences/skinstock?region=${reg}`
  );
  skins.value = data;
  region.value = reg;
}
const click = () => {
  gotSelected.value = false;
  selectedChampion.value = {};
};

const checkChampion = (champion) => {
  selectedChampion.value = champion;
  gotSelected.value = true;
};

const checkSearch = (search) => {
  if (search.length >= 1) {
    type champObject = {
      id: string;
    };
    championsHolder.value = champions.value;
    var found = Object.values(champions.value).filter(<champObject>(champ) =>
      champ.id.toLowerCase().includes(search.toLowerCase())
    );
    championsHolder.value = found;
  }
  if (search.length === 0) {
    championsHolder.value = champions.value;
  }
};

useHead({
  title: "Unranked Skin Accounts Starting at €5.49",
  meta: [
    {
      name: "description",
      content:
        "Cheap High Quality League Of Legends Smurf Skin Accounts. Instant Delivery & Life Time Warranty",
    },
    { property: "og:title", content: "Unranked Skin Accounts Starting at €5.49 - Nightsmurf" },
    {
      property: "og:description",
      content:
        "Cheap High Quality League Of Legends Smurf Skin Accounts. Instant Delivery & Life Time Warranty",
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
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">
              Start your ranked journey with your favorite skin
            </h1>
            <p>
              Unranked fresh league of legends accounts with pre-defined skins,
              you get all the benefits from our other products, including an
              amazing skin.
            </p>
          </div>
          <div class="col-xl-5 col-sm-12 col-12">
            <h2 class="pt-3 text-center">Popular Skins</h2>
            <CarouselPopular />
          </div>
        </div>
      </div>
    </header>
    <div class="divider-top container-xl" v-if="champion && !pending">
      <SkinSearch
        @searchValue="checkSearch"
        @click="click"
        :championLength="Object.keys(champions).length"
      />
      <p class="text-center alert alert-warning w-50 m-auto mt-3 mb-3">
        The account only contains the Skin Shard not the Skin itself! You need
        to use the orange essence to unlock it. It's not guaranteed that you
        will have enough, but very likely.
      </p>
      <SkinRegions @selectedRegion="getSkinIds" />
      <div class="row g-4 justify-content-center pt-3" v-if="!gotSelected">
        <SkinChampionItem
          v-for="c in championsHolder"
          :key="c.id"
          :champion="c"
          :championName="c.id"
          :version="version"
          @champion="checkChampion"
        />
      </div>
      <div v-if="gotSelected">
        <SkinChampSkins
          :champion="selectedChampion"
          :skins="skins"
          :region="region"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 540px) {
  .w-50 {
    width: 85% !important;
  }
}
</style>