<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();

useHead({
  title: "Cheapest Smurf Accounts Only €3.99",
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
        "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
    },
    {
      property: "og:title",
      content: "Cheapest Smurf Accounts Only €3.99 - Nightsmurf",
    },
    {
      property: "og:description",
      content:
        "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
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
    <HeaderMain
      :title="'Buy League Of Legends Unranked Accounts'"
      :body="'LTB'"
      :button="true"
      :trustpilot="true"
      :imageTitle="'Nightsmurf Cosmic Yi'"
      :imageAlt="'Cosmic Master Yi Header Image'"
    />
    <div class="divider-top" id="shop">
      <ShopWidgetBody :regionI="'EUW'" :home="true" />
    </div>
    <div class="divider-top">
      <BannerQuote
        :title="'Make your dream rank become reality'"
      />
    </div>
    <div class="divider-top">
      <BoxesHero />
    </div>
    <div class="divider-top">
      <TextHelper
        :title="$t('Why should you buy a smurf account?')"
        :single="$t('Fast')"
        :bodies="[
          $t('1'),
        ]"
      />
      <TextHelper
        :title="$t('Why would you want a smurf account?')"
        :single="$t('Cheap Smurf')"
        :bodies="[
          $t('2'),
          ,
          $t('3'),
          $t('4'),
        ]"
      />
      <TextHelper
        :title="$t('Get your account')"
        :single="$t('Now')"
        :bodies="[
          $t('5'),
          $t('6'),
        ]"
      />
      <div>
        <BoxesSteps />
      </div>
      <div class="divider-top">
        <TextHelper
          :title="$t('Why should you buy from us?')"
          :single="$t('Our League of legends Smurf Accounts')"
          :bodies="[
            $t(`You have decided that it is time to buy a league of legends smurf account, you get the urge to destroy some kids in lower ranks and you want to start doing it now on a fresh level 30 league of legends unranked account. but... where should you buy it?`),
            $t(`It is important to buy it from a source that offers you protection if something goes wrong, nightsmurf offers this protection. Our brand has been in the smurfing space for a long time, this means you get your league of legends account from a reputable source.`),
            $t(`We also got the cheapest prices in the league of legends space, our competitors are asking triple the amount without any warranty. You would not wan't to end in that hellhole. Thats why you should consider us for buying a cheap league of legends smurf account with lifetime warranty.`),
          ]"
        />
      </div>
      <div v-if="$i18n.locale === 'en'">
        <BoxesBlogCard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider-top {
  margin-top: 100px;
}
</style>
