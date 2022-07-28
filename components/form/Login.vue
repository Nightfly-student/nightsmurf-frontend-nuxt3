<script setup lang="ts">
import "@formkit/themes/genesis";
import { useMainStore } from "@/stores";
const router = useRouter();

const onSubmit = async (values) => {

  const useStore = useMainStore();
  useStore.login(values.email, values.password);
};
</script>

<template>
  <div class="card-white m-1 shadow text-white">
    <h2 class="text-center">Login</h2>
    <div class="text-white m-auto w-75">
      <FormKit
        type="form"
        submit-label="Sign In"
        @submit="onSubmit"
        method="post"
      >
        <FormKit
          name="email"
          label="Email address"
          validation="required|email"
        />
        <FormKit
          type="password"
          outer-class="text-white"
          name="password"
          label="Password"
          validation="required"
        />
      </FormKit>
    </div>
    <div class="d-flex justify-content-around align-items-center p-4">
      <NuxtLink to="/register">Don't have an account?</NuxtLink>
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
</style>
