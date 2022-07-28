<script lang="ts" setup>
import apiFetch from "~~/composables/useInterceptorFetch";
interface ModalCreateUrlProps {
  affiliate: any;
}
const ModalCreateUrlP = defineProps<ModalCreateUrlProps>();

const url = ref("");

const config = useRuntimeConfig();

async function addUrl() {
  await apiFetch(`${config.DOMAIN}/api/affiliates/url`, {
    method: "PUT",
    body: {
      url: url.value.toLowerCase(),
      user: ModalCreateUrlP.affiliate.user,
    },
  }).then((res) => {
    ModalCreateUrlP.affiliate.url = res;
  });
}
</script>

<template>
  <div class="text-light">
    <div class="modal fade" :id="'CreateUrl'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Create Url</h5>
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
                placeholder="Url Name"
                type="text"
                class="form-control mb-2"
              />
              <p>url will be https://nightsmurf.com/r/{{ url }}</p>
              <button
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="addUrl"
                class="btn btn-primary"
              >
                Create Url
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
