<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import VueGtag from "vue-gtag";

const configOrder = useRuntimeConfig();
const route = useRoute();
const session = ref(<any>{});
const order = ref(<any>{});
const orderFound = ref(false);
const mount = ref(false);
const product = ref({});
const skin = ref([]);
const watchRoute = ref(route.params.id);
const licences = ref([]);

type orderObject = {
  paymentSession: string;
  orderItems: any;
};

const { refresh } = await useAsyncData(
  "order",
  async () => {
    try {
      const o = await apiFetch<orderObject>(
        `${configOrder.DOMAIN}/api/orders/${route.params.id}`
      );
      if (o) {
        order.value = o;
        if (order.value.paymentMethod === "stripe") {
          const ses = await apiFetch(
            `${configOrder.DOMAIN}/api/orders/session?session=${order.value.paymentSession}`
          ).then((ses) => {
            session.value = ses;
            orderFound.value = true;
          });
          await getProduct();
          await getPaid();
          await getSkin();
          mount.value = true;
        } else {
          orderFound.value = false;
          mount.value = true;
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  {
    watch: [watchRoute],
  }
);

await refresh();

async function getProduct() {
  if (session.value.metadata.product_id) {
    const p = await apiFetch(
      `${configOrder.DOMAIN}/api/products/${session.value.metadata.product_id}`
    );
    if (p) {
      product.value = p;
    }
  }
}

function payStripe() {
  window.open(session.value.url, "_self");
}
function payPayop() {
  window.open(
    `https://checkout.payop.com/en/payment/${order.value.paymentSession}`,
    "_self"
  );
}

async function getPaid() {
  if (session.value.payment_status === "paid") {
    await order.value.orderItems.map((item) => {
      licences.value = [];
      apiFetch(`${configOrder.DOMAIN}/api/licences/${item}`)
        .then((res) => {
          licences.value.push(res);
        })
        .then(() => {
          useFetch(
            `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`
          ).then((repss) => {
            if (repss.data.value) {
              licences.value.forEach((licence) => {
                var holder = [];
                licence.skins.forEach((skiny) => {
                  var found = Object.values(repss.data.value).find(
                    (skin) => skin.id === parseInt(skiny)
                  );
                  holder.push(found.name);
                });
                licence.skinList = holder;
              });
            }
          });
        });
    });
  }
}
async function getSkin() {
  if (session.value.metadata.skin_id) {
    await useFetch(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`
    ).then((resp) => {
      var found = Object.values(resp.data.value).find(
        (skin) => skin.id === parseInt(session.value.metadata.skin_id)
      );
      var splitted = found.loadScreenPath.split("/");
      found.imgPath = splitted[splitted.length - 1]
        .toLowerCase()
        .replace(".jpg", "");
      skin.value = found;
    });
  }
}
async function skinParser(id) {
  var found = <any>{};
  await useFetch(
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json`
  ).then((resp) => {
    found = Object.values(resp.data.value).find(
      (skin) => skin.id === parseInt(id)
    );
  });
  return found.name;
}

useHead({
  title: `Order #${route.params.id}`,
});
</script>

<template>
  <div class="mt-5">
    <div class="text-light container-xl" v-if="mount && orderFound">
      <h1 class="pt-4 fs-4">Order #{{ order._id }}</h1>
      <p>Order Status: {{ order.paymentStatus }}</p>
      <div class="row pt-4 text-light">
        <div class="col-12 col-md-6">
          <h4 class="text-primary">Order Information</h4>
          <div class="card p-3 mb-3">
            <h4 class="text-center">Need Help?</h4>
            <p class="text-center">
              Join our
              <a
                href="https://discord.gg/yQ82SJHcU4"
                class="text-decoration-none"
                >Discord server</a
              >
              for 24/7 support
            </p>
          </div>
          <div
            v-if="session.payment_status === 'paid' || session.status === '1'"
            class="card p-3 mb-3"
          >
            <h4 class="text-center">Order Completed</h4>
            <p class="m-0 text-center">Your Account Info</p>
            <div v-for="licence in licences" :key="licence._id">
              <hr />
              <p class="fs-5">
                Username <span class="float-end">{{ licence.username }}</span>
              </p>
              <p class="fs-5">
                Password <span class="float-end">{{ licence.password }}</span>
              </p>
              <div v-if="licence.skins.length != 0" class="text-center">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  :id="'dropdownMenuButton' + licence._id"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Show Account Skins
                </button>
                <ul
                  class="dropdown-menu"
                  :aria-labelledby="'dropdownMenuButton' + licence._id"
                >
                  <li v-for="skin in licence.skinList" :key="skin">
                    <p class="dropdown-item" href="#">{{ skin }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            v-if="
              session.payment_status != 'paid' &&
              order.paymentMethod === 'stripe' &&
              order.paymentStatus != 'processing'
            "
            class="card p-3 mb-3"
          >
            <h4 class="text-center">Method: Stripe</h4>
            <p class="text-center">Please complete your payment below</p>
            <button @click="payStripe" class="btn btn-primary w-25 m-auto">
              Pay On Stripe
            </button>
            <div class="alert alert-info mt-3 text-center" role="alert">
              Note: If you paid using Sofort it can take 1-3 days for the funds
              to arrive to Nightsmurf.
            </div>
          </div>
          <div
            v-if="order.paymentStatus === 'processing'"
            class="card p-3 mb-3"
          >
            <h4 class="text-center">Payment Processing</h4>
            <div class="alert alert-info mt-3 text-center" role="alert">
              Processing... Klarna, Sofort payments can take up to 3 days to
              process. Please watch your email.
            </div>
          </div>
          <div
            v-if="session.status != '1' && order.paymentMethod === 'payop'"
            class="card p-3 mb-3"
          >
            <h4 class="text-center">Method: Payop</h4>
            <p class="text-center">Please complete your payment below</p>
            <button @click="payPayop" class="btn btn-primary w-25 m-auto">
              Pay On Payop
            </button>
            <div class="alert alert-info mt-3 text-center" role="alert">
              Note: Payop may have delays regarding your payment.
            </div>
          </div>
          <div class="card p-3 mb-3">
            <h4 class="text-center">Nightsmurf Invoice</h4>
            <p class="text-center">#{{ order._id }}</p>
            <hr />
            <div>
              <p class="fs-5">
                Status <span class="float-end">{{ order.paymentStatus }}</span>
              </p>
              <p class="fs-5">
                Email <span class="float-end">{{ order.email }}</span>
              </p>
              <p class="fs-5">
                Quantity
                <span class="float-end">{{ session.metadata.quantity }}</span>
              </p>
              <p class="fs-5">
                Total
                <span class="float-end"
                  >&euro;{{ order.total.toFixed(2) }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <h4 class="text-primary">Accounts</h4>
          <div class="card p-3">
            <p class="fs-5 m-auto" v-if="session.metadata.product_id">
              {{ session.metadata.quantity }}x
              {{ session.metadata.product_title }}
            </p>
            <p class="fs-5 m-auto" v-if="session.metadata.skin_id">
              1x {{ session.metadata.skin_name }} -
              {{ session.metadata.region }}
            </p>
            <hr />
            <div v-if="session.metadata.skin_id" class="text-center">
              <img
                :src="
                  'https://raw.communitydragon.org/latest/game/assets/characters/anivia/skins/skin02/' +
                  skin.imgPath +
                  '.png'
                "
              />
            </div>
            <div v-if="session.metadata.product_id">
              <p>{{ product.body }}</p>
            </div>
          </div>
          <div class="card p-3 mt-3">
            <h3 class="text-center">Review Us</h3>
            <p class="text-center">
              If you review us on Trustpilot, please contact us through
              <a href="https://discord.gg/yQ82SJHcU4">Discord</a>
              and recieve a 50% discount for your next order.
            </p>
            <a
              type="button"
              class="btn btn-primary"
              href="https://trustpilot.com/review/nightsmurf.com"
              target="_blank"
              >Review Us Now</a
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="!mount" class="text-center margin-div">
      <div class="spinner-border text-primary margin-spinner" role="status">
        <span class="visually-hidden"></span>
      </div>
      <p class="text-light">Loading Order...</p>
    </div>
    <div v-if="!orderFound && mount" class="text-center">
      <h1 class="pt-4">No Order Found :(</h1>
      <NuxtLink to="/" class="text-primary cursor text-decoration-none"
        >Return to home</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none !important;
  background: #161616;
  border-radius: 5px;
}
.margin-spinner {
  margin-top: 300px;
}
.margin-div {
  margin-bottom: 300px;
}
.cursor {
  cursor: pointer;
}
.cursor:hover {
  color: rgb(59, 59, 226) !important;
}
</style>
