<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";
import apiFetch from "~~/composables/useInterceptorFetch";
import { useMainStore } from "~~/stores";
type productObject = {
  _id: string;
  title: string;
  region: string;
  licenceType: string;
  blueEssence: string;
  category: string;
  body: string;
  price: number;
  slug: string;
};

interface modalProps {
  product: productObject;
  stock: number;
}
const modalProps = defineProps<modalProps>();
const modalConfig = useRuntimeConfig();

const quantityValue = ref(1);
const email = ref("");
const startPay = ref(false);
const emailErr = ref("");
const coupon = ref("");
const priceHolder = ref(modalProps.product.price);
const currentCoupon = ref("");
const store = useMainStore();

async function getLoyalityDiscount() {
  await apiFetch(`${modalConfig.DOMAIN}/api/royalty/${store.getId}`).then((res) => {
    modalProps.product.price =
      priceHolder.value -
      (priceHolder.value / 100) * res.discount;
  });
}

const onChange = (value) => {
  if (/^\d+$/.test(value.toString())) {
    if (value <= modalProps.stock) {
      quantityValue.value = value;
    } else {
      quantityValue.value = modalProps.stock;
    }
  } else {
    quantityValue.value = 1;
  }
};
const onChangeMail = (value) => {
  email.value = value;
};
const startPayment = (paymentMethod) => {
  if (email.value === "") {
    return;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    emailErr.value = "Invalid Email";
    return;
  }
  startPay.value = true;
  var userId = "Guest";
  if (store.getIsLogged) {
    userId = store.getId;
  }

  useFetch(`${modalConfig.DOMAIN}/api/orders/start`, {
    method: "post",
    body: {
      title: modalProps.product.title,
      total: (quantityValue.value * modalProps.product.price).toFixed(2),
      quantity: quantityValue.value,
      email: email.value,
      product: modalProps.product._id,
      region: modalProps.product.region,
      product_title: modalProps.product.title,
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

  useFetch<dataObject>(`${modalConfig.DOMAIN}/api/coupons/${coupon.value}`)
    .then((res) => {
      const data = res.data.value;
      if (data.discount === "%") {
        var discount = (priceHolder.value / 100) * data.portion;
        modalProps.product.price = priceHolder.value - discount;
      }
      if (data.discount === "A") {
        modalProps.product.price = priceHolder.value - data.portion;
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
    <div class="modal fade" :id="'CheckoutModal' + product._id">
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
            <button v-if="store.getIsLogged" @click="getLoyalityDiscount" class="btn btn-primary ms-1">
              Loyalty
            </button>
            <hr />
            <h4 class="pb-3">{{ product.title }}</h4>
            <p class="fs-5">
              Blue Essence:
              <span class="float-end fw-bold"
                >{{ product.blueEssence }}+ BE</span
              >
            </p>
            <p class="fs-5">
              Price Per Account:
              <span class="float-end fw-bold"
                >&euro;{{ product.price.toFixed(2) }}</span
              >
            </p>
            <p class="fs-5">
              Region/Server:
              <span class="float-end fw-bold">{{
                product.region.toUpperCase()
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
              :max="stock"
            />
          </div>
          <div class="m-2">
            <button
              type="button"
              :data-bs-target="'#CheckoutModalStep' + product._id"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              class="btn btn-primary w-100"
            >
              Continue (&euro;{{ (product.price * quantityValue).toFixed(2) }})
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :id="'CheckoutModalStep' + product._id"
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
              placeholder="Email Address"
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
                  src="https://res.cloudinary.com/droomsocial/image/upload/v1659094303/stripe_ccymuz.png"
                  alt="Stripe Payment Gateway"
                  title="Stripe"
                />
              </button>
              <!-- <button class="btn btn-dark mt-2" @click="startPayment('payop')">
                <img class="img-size" src="/assets/images/payop.png" />
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
              :data-bs-target="'#CheckoutModal' + product._id"
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
