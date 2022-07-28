<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import { notify } from "@kyvg/vue3-notification";
import { useMainStore } from "~~/stores";
const config = useRuntimeConfig();
const store = useMainStore();

const onUpdatePasswordSubmit = async (values) => {
  await apiFetch(`${config.DOMAIN}/api/users/${store.getId}/password`, {
    method: "PUT",
    body: {
      oldPass: values.oldPassword,
      newPass: values.password,
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
      submit-label="Update Password"
      @submit="onUpdatePasswordSubmit"
    >
      <h2 class="text-center">Change Password</h2>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <FormKit
          type="password"
          name="oldPassword"
          label="Old Password"
          validation="required"
          placeholder="Old Password"
        />
      </div>
      <div class="form-outline mb-4">
        <FormKit
          type="password"
          name="password"
          :help-class="{
            'text-light': true,
          }"
          label="Password"
          help="Enter a new password"
          validation="required|length:8"
          validation-visibility="live"
        />
      </div>
      <div class="form-outline mb-4">
        <FormKit
          type="password"
          :help-class="{
            'text-light': true,
          }"
          name="password_confirm"
          label="Confirm password"
          help="Confirm your new password"
          validation="required|confirm"
          validation-visibility="live"
          validation-label="Password confirmation"
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
