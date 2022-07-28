<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import { useMainStore } from "~~/stores";

const affiliate = ref(<any>{});
const mounted = ref(false);
const ordersMounted = ref(false);
const orders = ref([]);
const sold = ref(0);
const earned = ref(0);
const limit = ref(5);
const page = ref(0);
const pages = ref(0);
const total = ref(0);
const completedOrders = ref(0);
const completedMounted = ref(false);
const widget = ref("");
const widgetMounted = ref(false);

const config = useRuntimeConfig();
const store = useMainStore();

async function getAffiliate() {
  await apiFetch(`${config.DOMAIN}/api/affiliates/${store.getId}`).then(
    (res) => {
      affiliate.value = res;
      mounted.value = true;
    }
  );
}
async function getProductsSold() {
  await apiFetch(
    `${config.DOMAIN}/api/affiliates/products/${affiliate.value._id}`
  )
    .then((res) => {
      completedOrders.value = res.completedOrders;
      earned.value = res.earnings;
      completedMounted.value = true;
    })
    .catch(() => {
      completedMounted.value = true;
    });
}
async function getAffiliateOrders() {
  page.value++;
  await apiFetch(
    `${config.DOMAIN}/api/affiliates/orders/${affiliate.value._id}?limit=${limit.value}&page=${page.value}`
  )
    .then((res) => {
      pages.value = res.pages;
      total.value = res.orders;
      res.affiliateOrders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      res.affiliateOrders.map((order) => {
        orders.value.push(order);
      });
      ordersMounted.value = true;
    })
    .catch(() => {
      ordersMounted.value = true;
    });
}

async function getWidget() {
  await apiFetch(
    `${config.DOMAIN}/api/affiliates/widget/${affiliate.value._id}`
  )
    .then((res) => {
      widget.value = res;
      widgetMounted.value = true;
    })
    .catch(() => {
      widgetMounted.value = true;
    });
}
await getAffiliate();
await getAffiliateOrders();
await getProductsSold();
await getWidget();

useHead({
  title: "Affiliate Dashboard",
  meta: [{ affiliateAuth: true }],
});
</script>

<template>
  <div class="mt-5 pt-5 container-xl">
    <h2 class="text-light">Affiliate Dashboard</h2>
    <div v-if="mounted" class="row text-light g-4">
      <div class="col-12 col-md-4">
        <div class="card p-3">
          <p>Your Coupon</p>
          <h2 v-if="affiliate.coupon">{{ affiliate.coupon }}</h2>
          <div v-else>
            <button
              :data-bs-target="'#CreateCoupon'"
              data-bs-toggle="modal"
              class="btn btn-primary mt-1 mb-1"
            >
              Create Coupon
            </button>
            <ModalCreateCoupon :affiliate="affiliate" />
          </div>
          <p class="pt-2">15% off on all accounts</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card p-3">
          <p>Products Sold</p>
          <div v-if="completedMounted">
            <h2>{{ completedOrders }}</h2>
            <p class="pt-2">&euro;{{ earned.toFixed(2) }} earned</p>
          </div>
          <div v-else>
            <h2>0</h2>
            <p class="pt-2">&euro;0.00 earned</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card p-3">
          <p>Available Payout</p>
          <h2>&euro;{{ affiliate.available.toFixed(2) }}</h2>
          <p class="pt-2">Payouts go through Discord</p>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="card p-3">
          <p v-if="ordersMounted">Orders ({{ total }})</p>
          <p v-else>Orders (0)</p>
          <div v-if="ordersMounted && orders != 0">
            <div class="overflow-auto w-100">
              <table class="table text-light">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Earned</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order._id">
                    <th scope="row" class="align-middle">
                      <img
                        src="https://res.cloudinary.com/droomsocial/image/upload/v1647779609/logowithout_luxbdf.png"
                        height="75"
                        width="75"
                      />
                    </th>
                    <td class="align-middle">{{ order.product.title }}</td>
                    <td class="align-middle">
                      {{ new Date(order.createdAt).toDateString() }}
                    </td>
                    <td
                      class="align-middle"
                      v-if="order.paymentStatus === 'completed'"
                    >
                      &euro;{{
                        (
                          ((order.total - ((order.total / 100) * 21 + 1)) /
                            100) *
                          affiliate.percentage
                        ).toFixed(2)
                      }}
                    </td>
                    <td class="align-middle" v-else>&euro;0.00</td>
                    <td class="align-middle">{{ order.paymentStatus }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              class="btn btn-primary"
              @click="getAffiliateOrders"
              v-if="page < pages"
            >
              Load More
            </button>
          </div>
          <div v-if="!ordersMounted" class="text-center">
            <div class="spinner-border text-primary mt-4" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-if="ordersMounted && orders === 0">
            <p>No Orders Found :(</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card p-3">
          <p>Your Url</p>
          <code v-if="affiliate.url"
            >https://nightsmurf.com/r/{{ affiliate.url }}</code
          >
          <div v-else>
            <button
              :data-bs-target="'#CreateUrl'"
              data-bs-toggle="modal"
              class="btn btn-primary mt-1 mb-1"
            >
              Create redirect url
            </button>
            <ModalCreateUrl :affiliate="affiliate" />
          </div>
          <p class="pt-2">Send this url to your crowd</p>
        </div>
        <div class="card p-3 mt-4">
          <p>Your Widget</p>
          <div v-if="widgetMounted && widget">
            <div>
              <img
                :src="widget.widget"
                alt="widget promotion"
                class="img-fluid"
                title="widget"
              />
            </div>
            <code>{{ widget.widget }}</code>
            <p class="pt-2">Use this widget for promotions.</p>
          </div>
          <div v-if="widgetMounted && !widget">
            <p>Please wait your widget will be made soon</p>
          </div>
          <div v-if="!widgetMounted">
            <div class="spinner-border text-primary mt-4" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="pt-5 mt-5 text-center">
      <div class="spinner-border text-primary mt-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-light">Loading Dashboard...</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #161616;
}
</style>
