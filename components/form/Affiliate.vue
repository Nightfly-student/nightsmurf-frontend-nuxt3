<script lang="ts" setup>
import apiFetch from "@/composables/useInterceptorFetch";
import { notify } from "@kyvg/vue3-notification";

const config = useRuntimeConfig();

const onSubmit = async (values) => {
  type dataObject = {
    message: string;
  };
  await apiFetch<dataObject>(`${config.DOMAIN}/api/submissions`, {
    body: {
      email: values.email,
      name: values.name,
      discord: values.discord,
      description: values.description,
      traffic: parseInt(values.traffic),
      url: values.url,
      platform: values.platform,
    },
    method: "POST",
  })
    .then((res) => {
      notify({
        text: res.message,
        type: "success",
      });
    })
    .catch(() => {
      notify({
        text: "Failed To Send Application",
        type: "error",
      });
    });
};
</script>

<template>
  <div class="text-white">
    <FormKit
      type="form"
      id="applyForm"
      submit-label="Send Application"
      @submit="onSubmit"
    >
      <div class="row gy-3">
        <div class="col-12 col-md-6">
          <FormKit
            name="email"
            label="Email address"
            validation="required|email"
            placeholder="email@domain.com"
          />
        </div>
        <div class="col-12 col-md-6">
          <FormKit
            name="name"
            label="Your Name or Existing Account Name"
            validation="required"
            placeholder="John Doe"
          />
        </div>
        <div class="col-12 col-md-6">
          <FormKit
            type="select"
            label="Select Platform"
            name="platform"
            placeholder="Select a platform"
            :options="[
              'Twitch',
              'Twitter',
              'Facebook',
              'YouTube',
              'Instagram',
              'Website',
              'TikTok',
              'Other',
            ]"
          />
        </div>
        <div class="col-12 col-md-6">
          <FormKit
            type="number"
            name="traffic"
            placeholder="200"
            label="Average Traffic/Viewers"
            validation="required"
          />
        </div>
        <div class="col-12 col-md-6">
          <FormKit
            type="text"
            name="url"
            id="url"
            label="Url to platform"
            placeholder="Full Url"
          />
        </div>
        <div class="col-12 col-md-6">
          <FormKit
            type="text"
            name="discord"
            id="discord"
            label="Your Discord"
            placeholder="Discord#0000"
          />
        </div>
        <div class="col-12">
          <FormKit
            type="textarea"
            name="description"
            label="Why should we accept you?"
            placeholder="Tell us more about you!"
            validation="length:0,120"
            validation-visibility="live"
          />
        </div>
      </div>
    </FormKit>
  </div>
</template>

<style>
.formkit-input {
  color: white !important;
}
[data-type="submit"] .formkit-input {
  width: 100%;
}
.formkit-inner {
  color: white !important;
}
.formkit-wrapper,
.formkit-fieldset {
  max-width: unset !important;
}
[data-type="submit"] .formkit-input {
  min-width: 100% !important;
  width: auto !important;
}
select {
  background: #161616 !important;
  color: white !important;
}
.formkit-option {
  color: white !important;
  cursor: pointer;
}
</style>
