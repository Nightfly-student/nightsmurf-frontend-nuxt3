<script lang="ts" setup>
import apiFetch from '~~/composables/useInterceptorFetch';

interface AdminLicenceModalProps {
    winning: any,
}

const AdminLicenceModalP = defineProps<AdminLicenceModalProps>();
const config = useRuntimeConfig();
const region = ref("info");

async function getLicence() {
    if(region.value != "info") {
        await apiFetch(`${config.DOMAIN}/api/winnings/licence/?win=${AdminLicenceModalP.winning._id}&region=${region.value}`).then((res) => {
           console.log(res); 
        })
    } 
}
</script>


<template>
  <div class="text-light">
    <div class="modal fade" :id="'LicenceModal' + winning._id">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Lootbox Item</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div v-if="!winning.claimed && winning.lootType === 'account'">
            <select
              class="form-select mt-4"
              aria-label="Default select example"
              v-model="region"
            >
              <option value="info">Select A Region</option>
              <option value="euw">EUW</option>
              <option value="eune">EUNE</option>
              <option value="na">NA</option>
              <option value="tr">TR</option>
              <option value="oce">OCE</option>
              <option value="br">BR</option>
              <option value="las">LAS</option>
              <option value="lan">LAN</option>
              <option value="ru">RU</option>
            </select>
            <button class="btn btn-primary mt-4" @click="getLicence">Give Licence</button>
          </div>
          <div v-if="winning.claimed && winning.lootType === 'account'">
              <p>Username: {{JSON.parse(winning.lootItem).username}}</p>
              <p>Password: {{JSON.parse(winning.lootItem).password}}</p>
               <p>Blue Essense: {{JSON.parse(winning.lootItem).licenceType}}k+</p>
              <p>Region: {{JSON.parse(winning.lootItem).region}}</p>
          </div>
          <div v-if="winning.claimed && winning.lootType === 'coupon'">
            <p>Coupon Code: {{JSON.parse(winning.lootItem).coupon}}</p>
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
