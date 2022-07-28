<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
interface ModalWinItemProps {
  loot: string;
  ip: string;
  code: string;
}
const ModalWinItemP = defineProps<ModalWinItemProps>();
const config = useRuntimeConfig();
const lootItem = ref({});
const mounted = ref(false);

const winnerLoot = async () => {
  mounted.value = false;
  const win = await apiFetch(`${config.DOMAIN}/api/loot/${ModalWinItemP.loot}`);
  if (win) {
    lootItem.value = win;
    mounted.value = true;
  }
};

const onClickClose = () => {
  var myModal = document.getElementById("WinItem");
  myModal.classList.remove("show");
  myModal.style.display = "none";
};

onMounted(() => {
  winnerLoot();
});
</script>

<template>
  <div class="text-light">
    <div class="modal fade" :id="'WinItem'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Congrationlations</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="onClickClose"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-4 mx-3">
            <div>
              <p class="text-center fs-6 m-0 p-0">
                You Won {{ lootItem.name }}
              </p>
              <p
                v-if="lootItem.priceItem != 'free'"
                class="text-center m-0 p-0"
              >
                Your Coupon:
                <strong class="fs-4 text-primary">{{ code }}</strong>
                <br />Coupons expire in 24 hours
              </p>
              <p v-else class="text-center m-0 p-0">
                Open a ticket in our Discord Server and claim your price!
              </p>
              <p class="text-center mt-4">You may try again in 24 hours...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  background: #16161642;
}
.modal-content {
  background: #161616;
}
</style>
