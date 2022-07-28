<script setup lang="ts">
import apiFetch from "~~/composables/useInterceptorFetch";
import { useMainStore } from "~~/stores";

interface ChampSkinsProps {
  champion: any;
  skins: any;
  region: string;
}

const ChampSkinsP = defineProps<ChampSkinsProps>();

const {
  data: champSkins,
  pending,
  refresh,
} = await useLazyAsyncData(
  "champSkins",
  async () => {
    let data;
    try {
      const {data: info} = await useFetch(
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`
      );
      data = info.value;
      var found = [];
      var championSkins = [];
      var champKey = ChampSkinsP.champion.key;

      type skinObject = {
        isBase: boolean;
        isLegacy: boolean;
        loadScreenPath: string;
      };

      if (champKey.length === 2) {
        champKey = ChampSkinsP.champion.key + "0";
      }
      found = Object.values(data).filter(
        <skinObject>(skin) =>
          skin.isBase === false &&
          skin.isLegacy === false &&
          skin.loadScreenPath.includes(ChampSkinsP.champion.id)
      );
      found.forEach((options) => {
        if (ChampSkinsP.skins.some((skin) => skin === options.id)) {
          options.available = true;
          options.region = ChampSkinsP.region;
        } else {
          options.available = false;
          options.region = ChampSkinsP.region;
        }
      });
      championSkins = found;

      return championSkins;
    } catch (e) {
      console.log(e);
    }
  },
  {
    watch: [ChampSkinsP],
    server: false,
  }
);
await refresh();
</script>

<template>
  <div v-if="champSkins" class="row justify-content-center">
    <SkinChampSkinItem
      v-for="championSkin in champSkins"
      :key="championSkin.id"
      :championSkin="championSkin"
      :champion="champion"
    />
  </div>
</template>

<style scoped></style>
