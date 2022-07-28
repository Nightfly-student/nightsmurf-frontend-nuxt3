<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import { notify } from "@kyvg/vue3-notification";
const name = ref("");
const when = ref("");
const whenReached = ref(0);
const discount = ref(0);
const loyalties = ref([]);

const config = useRuntimeConfig();

async function addLoyalty() {
  if (
    name.value != "" &&
    when.value != "" &&
    discount.value >= 0 &&
    whenReached.value >= 0
  ) {
    await apiFetch(`${config.DOMAIN}/api/loyalty/`, {
      method: "POST",
      body: {
        name: name.value,
        when: when.value,
        discount: discount.value,
        whenReached: whenReached.value,
      },
    }).then((res) => {
      loyalties.value.push(res);
      notify({
        text: "Successfully Added Loyalty",
        type: "success",
      });
    });
  }
}
async function getLoyalties() {
  await apiFetch(`${config.DOMAIN}/api/loyalty`).then((res) => {
    loyalties.value = res;
  });
}

onMounted(() => {
  getLoyalties();
});
</script>

<template>
  <div>
    <NuxtLayout name="admin">
      <h1 class="text-center text-light">Loyalty Program</h1>
      <table class="table table-dark" v-if="loyalties.length != 0">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">When</th>
            <th scope="col">When Reached</th>
            <th scope="col">Discount Amount</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loyal in loyalties" :key="loyal._id">
            <th scope="row" class="align-middle">{{ loyal.name }}</th>
            <td class="align-middle">{{ loyal.when }}</td>
            <td class="align-middle">{{ loyal.whenReached }} &euro;</td>
            <td class="align-middle">{{ loyal.discount }}%</td>
            <td class="align-middle">
              <button class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="">
        <div class="text-light">
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">Loyalty Name</label
              ><br />
              <input
                v-model="name"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
                placeholder="Loyalty Name"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label">When Loyalty</label
              ><br />
              <input
                v-model="when"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
                placeholder="When Description"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label"
                >Discount Reached When</label
              ><br />
              <input
                v-model="whenReached"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check ps-0">
              <label for="disabledSelect" class="form-label"
                >Discount Amount</label
              ><br />
              <input
                v-model="discount"
                class="form-input"
                type="text"
                id="disabledFieldsetCheck"
              />
            </div>
          </div>
          <button @click="addLoyalty" class="btn btn-primary">
            Add Loyalty
          </button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
