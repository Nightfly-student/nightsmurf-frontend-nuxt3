<script setup lang="ts">
import apiFetch from "@/composables/useInterceptorFetch";

interface WidgetProps {
  regionI: string;
  home: boolean;
}

type productObject = {
  products: object;
};
const props = defineProps<WidgetProps>();
const config = useRuntimeConfig();

const selectedRegion = ref(props.regionI);

const { data, pending, refresh } = await useAsyncData(
  "data",
  async () => {
    let data;
    try {
      data = await apiFetch(
        `${config.DOMAIN}/api/products/productStock?region=${selectedRegion.value}`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  {
    watch: [selectedRegion],
  }
);
const check = async function (region) {
  selectedRegion.value = region;
};
await refresh();
</script>

<template>
  <div id="shop ">
    <div class="text-center info-box-shop">
      <h2 class="text-light">{{$t('Cheap League of Legends smurfs')}}</h2>
      <div class="w-25 m-auto width-mobile-small">
        <p class="text-center text-light">
          {{$t('OAAOFTH')}}
        </p>
      </div>
    </div>
    <div>
      <ShopWidgetRegion @selectedRegion="check" />
    </div>
    <div id="shop_widget">
      <ShopWidgetContent
        v-if="data"
        :products="data.products"
        :stock="data.stock"
        :home="home"
      />
    </div>
  </div>
</template>

<style scoped>
#shop_widget {
  min-height: 600px;
}
.info-box-shop p {
  color: gainsboro;
}
@media (max-width: 1199px) {
  .width-mobile-small {
    width: 90% !important;
  }
}
</style>
