<script setup lang="ts">
import { useMainStore } from "@/stores";
import { notify } from "@kyvg/vue3-notification";
import apiFetch from "~~/composables/useInterceptorFetch";
interface ModalSkinCheckoutProps {
  champion: object;
  skin: any;
  price: number;
}
const ModalSkinCheckoutP = defineProps<ModalSkinCheckoutProps>();

const quantityValue = ref(1);
const email = ref("");
const startPay = ref(false);
const emailErr = ref("");
const coupon = ref("");
const priceHolder = ref(ModalSkinCheckoutP.price);
const pricy = ref(ModalSkinCheckoutP.price);
const currentCoupon = ref("");
const royalty = ref({});

const store = useMainStore();
const config = useRuntimeConfig();

const onChange = (value) => {
  if (/^\d+$/.test(value.toString())) {
    if (value <= 1) {
      quantityValue.value = value;
    } else {
      quantityValue.value = 1;
    }
  } else {
    quantityValue.value = 1;
  }
};

async function getLoyalityDiscount() {
  await apiFetch(`${config.DOMAIN}/api/royalty/${store.getId}`).then((res) => {
    pricy.value =
      priceHolder.value -
      (priceHolder.value / 100) * res.discount;
  });
}

const onChangeMail = (value) => {
  email.value = value;
};

const startPayment = (paymentMethod) => {
  if (email.value === "") {
    return;
  }
  startPay.value = true;
  var userId = "Guest";
  if (store.getIsLogged) {
    userId = store.getId;
  }
  useFetch(`${config.DOMAIN}/api/orders/start`, {
    method: "post",
    body: {
      title: `${ModalSkinCheckoutP.skin.name} - ${ModalSkinCheckoutP.skin.region}`,
      total: (quantityValue.value * pricy.value).toFixed(2),
      quantity: quantityValue.value,
      email: email.value,
      region: ModalSkinCheckoutP.skin.region,
      skin_id: ModalSkinCheckoutP.skin.id,
      skin_name: ModalSkinCheckoutP.skin.name,
      user: userId,
      coupon: currentCoupon.value,
      paymentMethod: paymentMethod,
      affiliate: useCookie<any>("affiliate").value,
    },
  }).then((res) => {
    const data = res.data.value;
    window.open(data.toString(), "_self");
  });
};

const checkCoupon = () => {
  type dataObject = {
    discount: string;
    portion: number;
    coupon: string;
  };

  useFetch<dataObject>(`${config.DOMAIN}/api/coupons/${coupon.value}`)
    .then((res) => {
      const data = res.data.value;
      if (data.discount === "%") {
        var discount = (priceHolder.value / 100) * data.portion;
        pricy.value = priceHolder.value - discount;
      }
      if (data.discount === "A") {
        pricy.value = priceHolder.value - data.portion;
      }
      currentCoupon.value = data.coupon;

      store.affiliateCoupon(coupon.value);
      notify({
        text: "Successfully Applied Coupon",
        type: "success",
      });
    })
    .catch((err) => {
      notify({
        text: err.response.data.message,
        type: "error",
      });
    });
};
</script>

<template>
  <div class="text-light">
    <div class="modal fade" :id="'CheckoutModal' + skin.id">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body py-4 mx-3">
            <button
              type="button"
              class="btn-close float-end btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <h3>Apply Coupon</h3>
            <p>Enter your coupon code here below.</p>
            <input
              v-model="coupon"
              placeholder="Coupon"
              class="p-1 coupon-size"
              type="text"
            />
            <button @click="checkCoupon" class="btn btn-primary ms-2">
              Apply Coupon
            </button>
            <button
              v-if="store.getIsLogged"
              @click="getLoyalityDiscount"
              class="btn btn-primary ms-1"
            >
              Loyalty
            </button>
            <hr />
            <h4 class="pb-3">{{ skin.name }} - {{ skin.region }}</h4>
            <p class="fs-5">
              Blue Essence:
              <span class="float-end fw-bold">50.000+ BE</span>
            </p>
            <p class="fs-5">
              Price:
              <span class="float-end fw-bold"
                >&euro;{{ pricy.toFixed(2) }}</span
              >
            </p>
            <p class="fs-5">
              Region/Server:
              <span class="float-end fw-bold">{{
                skin.region.toUpperCase()
              }}</span>
            </p>
            <p class="fs-5">
              Warranty:
              <span class="float-end fw-bold">Lifetime</span>
            </p>
            <hr />
            <input
              type="number"
              class="w-100 fs-5 text-center"
              :value="quantityValue"
              @change="onChange($event.target.value)"
              min="1"
              @blur="onChange($event.target.value)"
              max="1"
            />
          </div>
          <div class="m-2">
            <button
              type="button"
              :data-bs-target="'#CheckoutModalStep' + skin.id"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              class="btn btn-primary w-100"
            >
              Continue (&euro;{{ (pricy * quantityValue).toFixed(2) }})
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :id="'CheckoutModalStep' + skin.id"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel2"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body py-4 mx-3">
            <button
              type="button"
              class="btn-close float-end btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <p class="mb-1 fs-5">Delivery Email</p>
            <input
              required
              placeholder="Email Address"
              pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
              class="p-1 fs-6 input-text w-75"
              :value="email"
              @change="onChangeMail($event.target.value)"
              type="email"
            />
            <p class="m-0 text-danger">{{ emailErr }}</p>
            <hr />
            <h3>Payment Methods</h3>
            <div v-if="!startPay">
              <p>click on payment method to start payment process</p>
              <button class="btn btn-dark" @click="startPayment('stripe')">
                <img
                  class="img-size"
                  src="/assets/images/stripe.png"
                  alt="Stripe Payment Gateway"
                  title="Stripe"
                />
              </button>
              <!-- <button class="btn btn-dark mt-2" @click="startPayment('payop')">
                <img class="img-size" src="/images/payop.png" />
              </button> -->
              <p class="m-0 tiny-text">
                Klarna/Sofort payments can take up to 3 days to be processed.
              </p>
            </div>
            <div v-else class="text-center mt-5">
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
              <p>please wait</p>
            </div>
          </div>
          <div class="m-2">
            <button
              class="btn btn-primary float-end m-2"
              :data-bs-target="'#CheckoutModal' + skin.id"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Go back
            </button>
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
.tiny-text {
  font-size: 11px;
  text-align: center;
  color: #4a90f8;
}
@media (max-width: 800px) {
  .img-size {
    width: 90%;
  }
  .coupon-size {
    width: 30%;
  }
}
</style>
