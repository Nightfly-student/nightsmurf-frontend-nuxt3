<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";

const stock = ref([]);
const importAccounts = ref("");

const config = useRuntimeConfig();

async function getStock() {
  await apiFetch(`${config.DOMAIN}/api/licences/allstock`)
    .then((res) => {
      stock.value = res;
    })
    .catch((err) => {
      console.warn(err);
    });
}

async function importStock() {
  await useFetch(
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`
  ).then((res) => {
    var lines = importAccounts.value.split("\n");
    var accounts = [];
    lines.forEach((lines) => {
      var stock = lines.split(":");
      var skins = [];
      if (stock[8]) {
        stock[7] = stock[7] + ":" + stock[8];
      }
      stock[7].split("_").forEach((skin) => {
        if (skin != "0") {
          var item = skin.replace(/ *\([^)]*\) */g, "");
          var found = Object.values(res.data.value).find(
            (skinObject) => skinObject.name.toLowerCase() === item.toLowerCase()
          );
          skins.push(found.id);
        }
      });
      var data = {
        region: stock[0].toLowerCase(),
        username: stock[1],
        password: stock[2],
        licenceType: parseInt(stock[4].toString().substr(0, 1) + "0"),
        skins: skins,
        status: "available",
      };
      accounts.push(data);
      apiFetch(`${config.DOMAIN}/api/licences/import`, {
        body: {
          accounts: accounts,
        },
        method: "POST",
      })
        .then((res) => {
          alert("Imported " + accounts.length + " Accounts");
        })
        .catch((err) => {
          alert("Failed");
        });
    });
    importAccounts.value = "";
  });
}

onMounted(() => {
  getStock();
});
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <h1 class="text-center text-light">Stock</h1>
      <div class="overflow-auto w-100">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Region</th>
              <th scope="col">Amount</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stok in stock" :key="stok">
              <th class="align-middle" scope="row">{{ stok.region }}</th>
              <th class="align-middle" scope="row">
                {{ Object.keys(stok).filter((stonk) => stonk != "region") }}
              </th>
              <td class="align-middle">
                {{ stok[30] ? stok[30] + " :" : "" }} {{ stok[40] }} :
                {{ stok[50] }} : {{ stok[60] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div class="text-center">
          <h2 class="text-light">Import Accounts</h2>
          <textarea
            v-model="importAccounts"
            class="w-75 height"
            placeholder="# Format: [REGION]:[USERNAME]:[PASSWORD]:[LEVEL]:[BLUEESSENCE]:[ORANGEESSENCE]:[CHAMPIONS]:[SKINSHARDS]"
          ></textarea>
          <br />
          <button @click="importStock" class="btn btn-primary mt-2">
            Import Accounts
          </button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.height {
  height: 375px;
}
</style>
