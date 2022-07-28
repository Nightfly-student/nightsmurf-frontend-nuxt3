<script lang="ts" setup>
useHead({
  title: "Cheapest Smurf Accounts Only €3.99",
  meta: [
    {
      name: "description",
      content:
        "We offer the cheapest league of legends smurfs on the market. Buy your lol smurf account for EUW, NA, EUNE, TR, OCE, RU, LAN, and more",
    },
    { property: "og:title", content: "Cheapest Smurf Accounts Only €3.99 - Nightsmurf" },
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
      :body="`Looking to buy a lol smurf account? We got unranked account in stock
            for EUW, EUNE, NA, TR and OCE.`"
      :button="true"
      :trustpilot="true"
      :imageUrl="'assets/images/yi_header.png'"
      :imageTitle="'Nightsmurf Cosmic Yi'"
      :imageAlt="'Cosmic Master Yi Header Image'"
    />
    <div class="divider-top" id="shop">
      <ShopWidgetBody :regionI="'EUW'" :home="true" />
    </div>
    <div class="divider-top">
      <BannerQuote
        :title="'      Make your dream rank become'"
        :highlight="'reality'"
      />
    </div>
    <div class="divider-top">
      <BoxesHero />
    </div>
    <div class="divider-top">
      <TextHelper
        :title="'Why should you buy a smurf account?'"
        :single="'fast'"
        :bodies="[
          `It takes a regular League Of Legends player over 30 days to level
              up an account from level 1 to 30. Since you found out about
              Nightsmurf.com, you don't have to worry about it. You will get
              your smurf account instantly in your mail and on our dashboard.`,
        ]"
      />
      <TextHelper
        :title="'Why would you want a smurf account?'"
        :single="'Cheap Smurf'"
        :bodies="[
          `If it is unclear whether you should buy a smurf account or not, 
          this post should hopefully provide clarity on your decision.`,
          ,
          `   There are many cases where you would like to get a smurf account.
              This could be for the sole reason to learn a champion while
              playing ranked without dropping your rank that you worked hard on.
              Most professional players or streamers own smurf accounts where
              they play on if they do not want to play their best; the main
              reason is to keep the process you have made on your main account.
              Smurf accounts provide a new start where you could catch up to
              what you have achieved or just simply enjoy the game for what it
              is.`,
          `   A smurf account is not only meant to start a fresh start entering
              a different rank. League of Legends can be a difficult game,
              however, if you start over, you can achieve more than you reached
              before. There are cases where people are stuck on a rank where
              they cannot get out of. A fresh new start could spark a new
              experience, getting you further and helping you improve in the
              game.`,
        ]"
      />
      <TextHelper
        :title="'Get your account'"
        :single="'Now'"
        :bodies="[
          `To buy a smurf account, you simply click “Buy Now” on any product we offer. After that, you follow the payment process. The moment you have completed the process, you will shortly after receive a mail including your new account credentials. Ready to play the game. `,
          `You are just a few minutes away from starting your ranked game climb on your fresh, unranked smurf account from nightsmurf.com. `,
        ]"
      />
      <div>
        <BoxesSteps />
      </div>
      <div class="divider-top">
        <TextHelper
          :title="'Why should you buy from us?'"
          :single="'Our League of legends Smurf Accounts'"
          :bodies="[
            `You have decided that it is time to buy a league of legends smurf account, you get the urge to destroy some kids in lower ranks and you want to start doing it now on a fresh level 30 league of legends unranked account. but... where should you buy it?`,
            `It is important to buy it from a source that offers you protection if something goes wrong, nightsmurf offers this protection. Our brand has been in the smurfing space for a long time, this means you get your league of legends account from a reputable source. `,
            `We also got the cheapest prices in the league of legends space, our competitors are asking triple the amount without any warranty. You would not wan't to end in that hellhole. Thats why you should consider us for buying a cheap league of legends smurf account with lifetime warranty. `,
          ]"
        />
      </div>
      <div>
        <!-- blog posts -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider-top {
  margin-top: 100px;
}
</style>
