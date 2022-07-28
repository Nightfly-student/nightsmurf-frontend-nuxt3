<script setup lang="ts">
interface SkinChampionItemProps {
  champion: object;
  version: string;
  championName: string;
}
const SkinItemProps = defineProps<SkinChampionItemProps>();

const emitChampion = defineEmits(["champion"]);

const getChamp = () => {
   emitChampion("champion", SkinItemProps.champion);
};
</script>

<template>
  <div @click="getChamp" class="col-12 col-md-3 col-sm-4">
    <div class="card text-light cursor py-3 shadow-sm">
        <img
          class="img-circle"
          :src="`https://ddragon.leagueoflegends.com/cdn/${SkinItemProps.version}/img/champion/${SkinItemProps.championName}.png`"
          :alt="championName + ' Rounded Image'"
          :title="championName"
        />
        <h3 class="text-center p-2">{{ championName }}</h3>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
.card:hover {
  transform: scale(1.1);
}
.img-circle {
  border-radius: 50%;
  height: 75px;
  width: 75px;
  margin: auto;
}
.cursor {
  cursor: pointer;
}
</style>
