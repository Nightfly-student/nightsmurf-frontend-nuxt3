<script setup lang="ts">
import gsap from "gsap";
import { useMainStore } from "@/stores";
import apiFetch from "~~/composables/useInterceptorFetch";

const config = useRuntimeConfig();
const route = useRoute();

useHead({
  title: "Free League of Legends Account",
  link: [
    {
      rel: "canonical",
      href: `${config.URL + route.fullPath}`,
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Looking to get a free League of Legends Account? Try your luck at our free League Of Legends Lootbox, free to open every 24 hours!",
    },
    {
      property: "og:title",
      content: "Free League of Legends Account - Nightsmurf",
    },
    {
      property: "og:description",
      content:
        "Looking to get a free League of Legends Account? Try your luck at our free League Of Legends Lootbox, free to open every 24 hours!",
    },
    {
      property: "og:image",
      content:
        "https://res.cloudinary.com/droomsocial/image/upload/v1647780317/yi_header_vradr7.png",
    },
    { property: "og:type", content: "website" },
  ],
});

const config = useRuntimeConfig();

const opened = ref(4);
const isAllowed = ref(false);
const mounted = ref(false);
const winningItem = ref("");
const items = ref([]);
const timerStarted = ref(false);
const isLoading = ref(true);
const time = ref(0);
const code = ref("");

const store = useMainStore();

async function gsapRotation() {
  gsap.fromTo(
    "#lootbox",
    {
      y: "-=15",
      ease: "sine",
    },
    {
      y: "+=15",
      ease: "sine",
      repeat: -1,
      yoyo: true,
      duration: 0.8,
    }
  );
}

const { data: loot } = await useFetch(`${config.DOMAIN}/api/loot/loot`);

const getOpened = async () => {
  type openDataObject = {
    played: number;
  };

  const { data: openedData } = await useFetch<openDataObject>(
    `${config.DOMAIN}/api/winnings/opened`
  );
  if (openedData) {
    const data = openedData.value;
    opened.value = data.played;
  }
};

const allowedToP = async () => {
  type winDataObject = {
    allowedToPlay: boolean;
    reason: string;
    lastPlay: string;
  };

  if (store.getIsLogged) {
    const winData = await apiFetch<winDataObject>(
      `${config.DOMAIN}/api/winnings/played`
    );
    if (winData) {
      const data = winData;
      if (data.allowedToPlay) {
        isAllowed.value = true;
      } else {
        if (data.reason.includes("VPN")) {
          alert("Please turn off your vpn");
        } else {
          countdown(data.lastPlay);
          isAllowed.value = false;
        }
      }
    }
    isLoading.value = false;
  } else {
    isLoading.value = false;
  }
};

const countdown = (t) => {
  var today = new Date();
  var end = new Date(t);
  end.setHours(end.getHours() + 24);
  time.value = end.getTime() - today.getTime();
  timerStarted.value = true;
};

const openBox = async () => {
  const openData = await apiFetch(`${config.DOMAIN}/api/loot/slot`);
  if (openData) {
    const data: any = openData;
    winningItem.value = data.winner;
    items.value = data.items;
    code.value = data.code;
    gsap.to("#overlay", { opacity: 0, duration: 0.75 });
    setTimeout(() => {
      mounted.value = true;
    }, 750);
  }
};

await getOpened();
await allowedToP();

onMounted(() => {
  gsapRotation();
});
</script>

<template>
  <div>
    <header class="text-light">
      <div class="container-xl">
        <div class="row">
          <div class="col-xl-7 col-sm-12 col-12">
            <h1 class="pt-3">Free League of Legends Account</h1>
            <p class="">
              Try your luck with our lootbox containing League of Legends
              accounts and coupons. You may try it once every 24 hours. You may
              also join our Nightsmurf discord server where you can earn league
              of legends accounts and win them through giveaways.
            </p>
            <a
              type="button"
              href="https://discord.gg/yQ82SJHcU4"
              class="btn btn-primary"
              >Join Discord</a
            >
          </div>
          <div class="col-xl-5 col-sm-12 col-12">
            <img
              id="lootbox"
              class="img-fluid w-full"
              src="https://res.cloudinary.com/droomsocial/image/upload/v1659094304/free-lootbox_gm8h7u.png"
              alt="Free LoL Account Lootbox"
              title="Nightsmurf Lootbox"
            />
          </div>
        </div>
      </div>
    </header>
    <div class="container-xl text-light pt-5 pb-2">
      <div>
        <div v-if="mounted && store.getIsLogged && isAllowed">
          <LootboxSlider
            :items="items"
            :loot="loot"
            :winningItem="winningItem"
            :ip="ip"
            :code="code"
            class="pt-5 pb-5"
          />
        </div>
        <div
          class="row pt-5 pb-5 align-items-center"
          id="overlay"
          v-if="!mounted"
        >
          <div class="col-12 col-md-6 justify-content-center">
            <div
              class="text-center text-sm-start"
              v-if="store.getIsLogged && !isAllowed"
            >
              <h1>Played Already <strong class="text-primary">:(</strong></h1>
              <p class="fs-5">Try again tomorrow</p>
            </div>
            <div v-else class="text-center text-sm-start">
              <h1>Good Luck <strong class="text-primary">:)</strong></h1>
              <p class="fs-5">
                If you win an account you may claim it through our
                <a href="https://discord.gg/yQ82SJHcU4">discord server</a>!
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="card rounded shadow p-5">
              <div class="row">
                <div class="col-12 col-md-6 text-center">
                  <h3>Free Loot Box</h3>
                  <div class="card bg-dark p-2 mt-2 mb-2">
                    <p class="fs-6 m-1">Looted Today</p>
                    <p class="fs-6 m-0">{{ opened }}</p>
                  </div>
                  <div v-if="!isLoading">
                    <button
                      v-if="store.getIsLogged && isAllowed"
                      class="btn btn-primary mt-2"
                      @click="openBox"
                    >
                      Open Lootbox
                    </button>
                    <p v-if="store.getIsLogged && !isAllowed">
                      Next Opening:
                      <vue-countdown
                        v-if="timerStarted"
                        :time="time"
                        :interval="100"
                        v-slot="{ hours, minutes, seconds }"
                      >
                        {{ hours }}:{{ minutes }}:{{ seconds }}
                      </vue-countdown>
                    </p>
                    <router-link
                      v-if="!store.getIsLogged"
                      type="button"
                      to="/login"
                      class="btn btn-primary mt-2"
                      >Login To Open</router-link
                    >
                  </div>
                  <div v-if="isLoading" class="text-center">
                    <div
                      class="spinner-border text-primary m-0 p-0"
                      role="status"
                    >
                      <span class="sr-only m-0 p-0"></span>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <img
                    id="lootbox"
                    class="img-fluid w-full"
                    src="https://res.cloudinary.com/droomsocial/image/upload/v1659094304/free-lootbox_gm8h7u.png"
                    alt="Free LoL Account Lootbox Small"
                    title="Small Nightsmurf Lootbox"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          v-if="!isAllowed && store.getIsLogged"
          class="alert alert-info"
          role="alert"
        >
          Adblocker May Block your attempt to use the lootbox.
        </div>
        <h2>Lootbox Content</h2>
        <div class="row justif g-3">
          <LootboxContent
            class="col-6 col-md-3 col-sm-6 p-2"
            :loot="l"
            v-for="l in loot"
            :key="l._id"
          />
        </div>
      </div>
      <div class="pt-5">
        <TextHelper
          :title="'How Does it work?'"
          :single="'Lootbox'"
          :bodies="[
            `You can open our lootbox daily. This lootbox includes a coupon
                or a fresh free League Of Legends Account with 40k BE.`,
            `Once you created an account on our site, you can open the
                lootbox csgo style. You cannot use any VPN to protect from
                people doing it mulitple times a day on a single account.`,
            `We are doing this Lootbox, because we want everyone to enjoy
                owning a LoL Account, but also we want everyone to give an
                oppertunity to have some fun.`,
          ]"
        />
        <TextHelper
          :title="'Why are you giving away?'"
          :single="'Free League Of Legends Account'"
          :bodies="[
            `We think that the most important thing to a business is having a
                good community where everyone can enjoy their time in. By giving
                away we make the community more active but also more exciting to
                be around in`,
            ,
          ]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #151515;
}
</style>
