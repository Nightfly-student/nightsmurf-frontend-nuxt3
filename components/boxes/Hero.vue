<script setup lang="ts">
import {
  BIconTrophy,
  BIconClockHistory,
  BIconShieldCheck,
} from "bootstrap-icons-vue";

</script>

<template>
  <div class="container-xl">
    <div class="row text-light justify-content-center hero_container">
      <div class="col-12 col-lg-4 hero_box">
        <div class="card m-2 mt-4 p-2 Regular shadow">
          <BIconTrophy class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">{{$t('Ranked Ready')}}</h2>
          <p class="card-body text-center">
            {{$t('Our lol smurf accounts comes with enough blue essence to buy 20+ champs')}}
          </p>
        </div>
      </div>
      <div class="col-12 col-lg-4 hero_box">
        <div class="card m-2 p-2 Regular shadow">
          <BIconClockHistory class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">{{$t('Instant Delivery')}}</h2>
          <p class="card-body text-center">
            {{$t('Our lol smurf accounts are delivered instantly after the payment has been made in your mail')}}
          </p>
        </div>
      </div>
      <div class="col-12 col-lg-4 hero_box">
        <div class="card m-2 mt-4 p-2 Regular shadow">
          <BIconShieldCheck class="text-center fs-1 m-auto mt-3 mb-3" />
          <h2 class="card-title text-center">{{$t('Lifetime Warranty')}}</h2>
          <p class="card-body text-center">
            {{$t('All of our accounts come with lifetime warranty, protected against bot bans')}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 10px;
}
.card:hover {
  transform: scale(1.1);
}
</style>