<script lang="ts" setup>
import { notify } from "@kyvg/vue3-notification";
const r = ref("");
const summoner = ref("");
const results = ref({});
const mounted = ref(false);

const config = useRuntimeConfig();

const foundRegion = (region) => {
  r.value = region;
};

const onClick = async () => {
  if (r.value === "") {
    return;
  }
  if (summoner.value === "") {
    return;
  }
  if (summoner.value.length > 75 || summoner.value.length < 3) {
    return;
  }
  await useFetch(
    `${config.DOMAIN}/api/mmr/?summoner=${summoner.value}&region=${r.value}`
  ).then((res) => {
    results.value = res.data.value;
    mounted.value = true;
  }).catch(() => {
    notify({
      text: "Account Not Found :?",
      type: "error",
    });
  });
};
</script>

<template>
  <div class="pb-5 card shadow">
    <div class="row mt-5 align-items-center">
      <div class="text-center col-12 col-md-6">
        <h2 class="text-center">Check your MMR</h2>
        <MmrRegion @region="foundRegion" />
        <input
          v-model="summoner"
          type="text"
          placeholder="Summoner Name"
          class="form-text fs-4 rounded"
          max="75"
          min="3"
        />
        <br />
        <button class="btn btn-primary mt-3 fs-4" @click="onClick">
          Search
        </button>
      </div>
      <div class="col-12 col-md-6">
        <div class="center-box">
          <p class="fs-4">
            Ranked MMR: <span v-if="mounted">{{ results.ranked.avg }}</span>
            <span v-if="mounted && results.ranked.avg === null"
              >No Results</span
            >
            <span v-else></span>
          </p>
          <p class="fs-4">
            Normal MMR: <span v-if="mounted">{{ results.normal.avg }}</span>
            <span v-if="mounted && results.normal.avg === null"
              >No Results</span
            >
            <span v-else></span>
          </p>
          <p class="fs-4">
            ARAM MMR: <span v-if="mounted">{{ results.ARAM.avg }}</span>
            <span v-if="mounted && results.ARAM.avg === null">No Results</span>
            <span v-else></span>
          </p>
          <p v-if="mounted && results.ranked.avg != null" class="fs-6">
            Closest MMR Rank: {{ results.ranked.closestRank }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #161616 !important;
}
.center-box {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
  padding: 10px;
}
</style>
