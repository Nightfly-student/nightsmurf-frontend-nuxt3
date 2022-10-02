<script setup lang="ts">
import {
  BIconPiggyBank,
  BIconGem,
  BIconGlobe,
  BIconEject,
} from "bootstrap-icons-vue";

interface CardProps {
  product: any;
  stock: number;
  home: boolean;
  royalty?: any;
}

const regionImage = {
  EUW: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1664699380/876868_pt7mlu.jpg",
    alt: "Nightsmurf Katarina Card Image",
    title: "Katarina Image ",
  },
  EUNE: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1659094304/Vex_0_l4inxw.jpg",
    alt: "Nightsmurf Vex Card Image",
    title: "Vex Image ",
  },

  NA: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1659094305/Yone_1_splash_ypvmhv.jpg",
    alt: "Nightsmurf Yone Card Image",
    title: "Yone Image ",
  },
  OCE: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1659094304/Taliyah_1_rrdo9t.jpg",
    alt: "Nightsmurf Taliyah Card Image",
    title: "Taliyah Image ",
  },
  TR: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1664699502/ashe-lol-project-splash-art-uhdpaper.com-hd-307_egxmvb.jpg",
    alt: "Nightsmurf Ashe Card Image",
    title: "Ashe Image ",
  },
  BR: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1664699600/edward-chee-porcelainezreal-psd_fklwvu.jpg",
    alt: "Nightsmurf Ezreal Card Image",
    title: "Ezreal Image ",
  },
  LAS: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1664699652/Porcelain-Amumu-Skin-scaled-e1642697140782_yqxjdm.jpg",
    alt: "Nightsmurf Ammumu Card Image",
    title: "Ammumu Image ",
  },
  LAN: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1664699731/wp1979842_ghip3s.jpg",
    alt: "Nightsmurf Kindred Card Image",
    title: "Kindred Image ",
  },
  RU: {
    image: "https://res.cloudinary.com/droomsocial/image/upload/v1664699768/cropped-1920-1080-1070509_i2jszc.jpg",
    alt: "Nightsmurf Sylas Card Image",
    title: "Sylas Image ",
  },
}


const props = defineProps<CardProps>();
</script>

<template>
  <div>
    <div class="card text-light shadow">
      <p class="btn btn-primary button-warranty">
        {{ $t("Lifetime Warranty") }}
      </p>
      <img
        :src="regionImage[product.region.toUpperCase()].image"
        class="card-img-top img-size-pos"
        :alt="regionImage[product.region.toUpperCase()].alt"
        :title="regionImage[product.region.toUpperCase()].title"
      />
      <button
        class="btn btn-primary button-buy-now"
        :data-bs-target="'#CheckoutModal' + product._id"
        data-bs-toggle="modal"
        v-if="stock > 0 && home"
      >
        {{ $t("Buy Now") }}
      </button>
      <button
        href="#"
        class="btn btn-primary button-buy-now disabled"
        v-else-if="home"
      >
        {{ $t("Out of Stock") }}
      </button>
      <button
        @click="$router.push(`/product/${product.slug}`)"
        class="btn btn-primary button-buy-now"
        v-else-if="!home"
      >
        Learn More
      </button>
      <div class="card-body">
        <h5 class="card-title pt-3 text-center">
          {{ product.title }}
        </h5>
        <hr />
        <div class="card-text">
          <div class="my-3">
            <div>
              <BIconPiggyBank class="fs-4 me-2 text-primary" />
              {{ $t("Price") }}:
              <strong class="float-end me-4"
                >&euro;{{ product.price.toFixed(2) }}</strong
              >
            </div>
          </div>
          <div class="my-3">
            <BIconGem class="fs-4 me-2 text-primary" /> Blue Essence:
            <strong class="float-end me-4">{{ product.blueEssence }}</strong>
          </div>
          <div class="my-3">
            <BIconGlobe class="fs-4 me-2 text-primary" /> Region:
            <strong class="float-end me-4">{{
              product.region.toUpperCase()
            }}</strong>
          </div>
          <div class="my-3">
            <BIconEject class="fs-4 me-2 text-primary" /> Rank:
            <strong class="float-end me-4">Fresh Unranked</strong>
          </div>
        </div>
      </div>
      <ModalCheckout :product="product" :stock="stock" />
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
.img-size-pos {
  height: 300px;
  width: auto;
  object-fit: cover;
  object-position: 65% 85%;
}
.button-buy-now {
  margin: auto;
  margin-top: -50px;
  margin-left: 20px;
  margin-right: 20px;
  width: auto;
}
.button-warranty {
  background: #161616 !important;
  border: none !important;
  font-size: 14px;
  margin: auto auto auto 15px;
  margin-bottom: -50px;
  padding: 7px;
  z-index: 2;
  width: auto;
}
</style>
