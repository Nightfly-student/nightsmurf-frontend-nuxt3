<script setup lang="ts">
import {
  BIconHouseDoor,
  BIconSpeedometer2,
  BIconPersonPlus,
  BIconColumnsGap,
  BIconDiagram2,
  BIconBoxes,
} from "bootstrap-icons-vue";
import { useMainStore } from "~~/stores";

const store = useMainStore();

</script>

<template>
  <div
    class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
  >
    <NuxtLink
      to="/admin/dashboard"
      class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <span class="fs-5 d-none d-sm-inline">Dashboard</span>
    </NuxtLink>
    <ul
      class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
      id="menu"
    >
      <li class="nav-item">
        <NuxtLink to="/admin/dashboard" class="nav-link align-middle px-0">
          <BIconHouseDoor class="fs-4" />
          <span class="ms-1 d-none d-sm-inline">Home</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/orders" class="nav-link px-0 align-middle">
          <BIconSpeedometer2 class="fs-4" />
          <span class="ms-1 d-none d-sm-inline">Orders</span></NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/admin/stock" class="nav-link px-0 align-middle">
          <BIconPersonPlus class="fs-4" />
          <span class="ms-1 d-none d-sm-inline">Stock</span></NuxtLink
        >
      </li>
      <li class="nav-item">
        <NuxtLink to="/admin/lootbox" class="nav-link align-middle px-0">
          <BIconBoxes class="fs-4" />
          <span class="ms-1 d-none d-sm-inline">Lootbox</span>
        </NuxtLink>
      </li>
      <li v-if="store.getIsAdmin">
        <a
          href="#submenu3"
          data-bs-toggle="collapse"
          class="nav-link px-0 align-middle"
        >
          <BIconColumnsGap class="fs-4" />
          <span class="ms-1 d-none d-sm-inline">Edits</span>
        </a>
        <ul
          class="collapse nav flex-column ms-1"
          id="submenu3"
          data-bs-parent="#menu"
        >
          <li class="w-100">
            <NuxtLink to="/admin/edits/coupons" class="nav-link px-0">
              <span class="d-none d-sm-inline">Coupons</span> 1
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/edits/loyalty" class="nav-link px-0">
              <span class="d-none d-sm-inline">Loyalty</span> 2</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/admin/edits/loot" class="nav-link px-0">
              <span class="d-none d-sm-inline">Loot</span> 3</NuxtLink
            >
          </li>
        </ul>
      </li>
      <li v-if="store.getIsAdmin">
        <NuxtLink
          to="/admin/users"
          class="nav-link px-0 align-middle"
        >
          <BIconDiagram2 class="fs-4" />
          <span class="ms-1 d-none d-sm-inline">Users</span>
        </NuxtLink>
      </li>
      <li v-if="store.getIsAdmin">
        <NuxtLink
          to="/admin/roles"
          class="nav-link px-0 align-middle"
        >
          <BIconDiagram2 class="fs-4" />
          <span class="ms-1 d-none d-sm-inline">Roles</span>
        </NuxtLink>
      </li>
      <li v-if="store.getIsAdmin">
        <NuxtLink
          to="/admin/affiliates"
          class="nav-link px-0 align-middle"
        >
          <BIconDiagram2 class="fs-4" />
          <span class="ms-1 d-none d-sm-inline">Affiliates</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.nav-link {
  color: rgb(201, 201, 201) !important;
}
.nav-link:hover {
  color: gainsboro !important;
}
.activeLink {
  color: #599afb !important;
}
.activeLink:hover {
  color: #307cee !important;
}
.w-75 {
  width: 100% !important;
}
.mt-top {
  padding-top: 150px;
}
.router-link-active {
    color: white!important;
}

</style>
