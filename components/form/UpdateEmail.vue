<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import { notify } from "@kyvg/vue3-notification";
import { useMainStore } from "~~/stores";
const config = useRuntimeConfig();
const store = useMainStore();

const onUpdateEmailSubmit = async (values) => {
  await apiFetch(`${config.DOMAIN}/api/users/${store.getId}/email`, {
    method: "PUT",
    body: {
      email: values.email,
    },
  })
    .then((res) => {
      notify({
        text: res.message,
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
  <div class="text-light card-white">
    <FormKit
      type="form"
      submit-label="Update Email"
      @submit="onUpdateEmailSubmit"
    >
      <h2 class="text-center">Change Email</h2>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <FormKit
          name="email"
          label="Email address"
          validation="required|email"
          placeholder="New Email Address"
        />
      </div>
    </FormKit>
  </div>
</template>

<style scoped>
.card-white {
  padding: 30px;
  background: #161616;
  border-radius: 5px;
}
</style>
