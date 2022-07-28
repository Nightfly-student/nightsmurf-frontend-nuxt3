<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
interface ModalCreateCouponProps {
  affiliate: any;
}
const ModalCreateCouponP = defineProps<ModalCreateCouponProps>();

const coupon = ref("");
const config = useRuntimeConfig();

async function addCoupon() {
  await apiFetch(`${config.DOMAIN}/api/affiliates/coupon`, {
    method: "PUT",
    body: {
      name: coupon.value,
      user: ModalCreateCouponP.affiliate.user,
    },
  }).then((res) => {
    ModalCreateCouponP.affiliate.coupon = res.coupon;
  });
}
</script>

<template>
  <div class="text-light">
    <div class="modal fade" :id="'CreateCoupon'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Create Coupon</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-4 mx-3">
            <div>
              <input
                v-model="coupon"
                placeholder="Coupon name"
                type="text"
                class="form-control mb-2"
              />
              <button
                data-mdb-dismiss="modal"
                aria-label="Close"
                @click="addCoupon"
                class="btn btn-primary"
              >
                Create Coupon
              </button>
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
