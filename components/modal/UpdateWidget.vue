<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
import { notify } from "@kyvg/vue3-notification";
interface UpdateWidgetModalProps {
  affiliate: any;
}
const UpdateWidgetModalP = defineProps<UpdateWidgetModalProps>();

const url = ref("");

const config = useRuntimeConfig();

async function addUrl() {
  await apiFetch(`${config.DOMAIN}/api/affiliates/widget`, {
    method: "POST",
    body: {
      affiliate: UpdateWidgetModalP.affiliate._id,
      widget: url.value,
    },
  }).then((res) => {
    notify({
      text: res.data.message,
      type: "success",
    });
  });
}
</script>

<template>
  <div class="text-light">
    <div class="modal fade" :id="'WidgetUrl' + affiliate._id">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Widget Url</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-4 mx-3">
            <div>
              <input
                v-model="url"
                placeholder="Widget Url Link"
                type="text"
                class="form-control mb-2"
              />
              <button
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="addUrl"
                class="btn btn-primary"
              >
                Create Widget
              </button>
            </div>
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
</style>
