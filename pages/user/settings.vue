<script setup lang="ts">
const CP = ref(true);
const CE = ref(false);

const onSettingsClick = function (value) {
  CP.value = false;
  CE.value = false;
};

const onCPClick = (active) => {
  onSettingsClick(active);
  CP.value = true;
};
const onCEClick = (active) => {
  onSettingsClick(active);
  CE.value = true;
};

useHead({
  title: "Settings",
});
</script>

<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12">
            <h1 class="pt-3 text-center">Settings</h1>
          </div>
        </div>
      </div>
    </header>
    <div>
      <div class="overflow-auto background-color">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a
              class="nav-link"
              @click="onCPClick('CP')"
              :class="{ active: CP }"
              aria-current="page"
              >Change Password</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="onCEClick('CE')" :class="{ active: CE }"
              >Change Email</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="divider-top" v-if="CP">
      <div class="row justify-content-center m-0">
        <div class="col-xl-3 col-lg-4 col-md-5 col-sm-12 m-0">
          <FormUpdatePassword class="pb-5" />
        </div>
      </div>
    </div>
    <div class="divider-top" v-if="CE">
      <div class="row justify-content-center m-0">
        <div class="col-xl-3 col-lg-4 col-md-5 col-sm-12 m-0">
          <FormUpdateEmail class="pb-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-color {
  background-color: #111111;
}
.nav-link {
  color: white;
  cursor: pointer;
}
.nav-link:hover {
  color: gainsboro;
}
.active {
  color: #0d62e0;
}
.active:hover {
  color: #3d87f5;
}
</style>
