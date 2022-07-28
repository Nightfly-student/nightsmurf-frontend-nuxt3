<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import { notify } from "@kyvg/vue3-notification";

const router = useRouter();
const conifg = useRuntimeConfig();

const onSubmit = async (values) => {
  useAsyncData("register", async () => {
    let data;
    try {
      data = await apiFetch(`${conifg.DOMAIN}/api/users/register`, {
        method: "POST",
        body: {
          name: values.username,
          email: values.email,
          password: values.password,
        },
      });
      if (data) {
        notify({
          text: "Successfully Registered",
          type: "success",
        });
        router.push("/login");
      }
    } catch (err) {
      notify({
        text: "Failed To Register, try again...",
        type: "error",
      });
    }
  });
};
</script>

<template>
  <div class="card-white text-white">
    <div class="w-75 m-auto">
      <FormKit
        type="form"
        submit-label="Register"
        @submit="onSubmit"
        method="post"
      >
        <h2 class="text-center">Register</h2>
        <FormKit
          name="username"
          label="Username"
          validation="required|length:6"
        />
        <FormKit
          name="email"
          label="Email address"
          validation="required|email"
        />
        <FormKit
          type="password"
          name="password"
          :help-class="{
            'text-light': true,
          }"
          label="Password"
          help="Enter a new password"
          validation="required"
          validation-visibility="live"
        />
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
      </FormKit>
    </div>
    <div class="d-flex justify-content-around align-items-center p-4">
      <NuxtLink to="/login">Already have an account?</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.formkit-input {
  color: white !important;
}
[data-type="submit"] .formkit-input {
  width: 100%;
}

.card-white {
  padding: 30px;
  background: #161616;
  border-radius: 5px;
}
</style>
