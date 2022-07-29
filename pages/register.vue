<script lang="ts" setup>
useHead({
  title: "Register",
});
</script>

<template>
  <div>
    <section class="purple-bg min-height vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://res.cloudinary.com/droomsocial/image/upload/v1659094304/yi_header_uni3wx.png"
              class="img-fluid img-login"
              alt="Master yi"
            />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-light">
            <FormRegister />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.img-login {
  max-height: 400px;
}
@media (max-width: 921px) {
  .min-height {
    height: 100% !important;
  }
}
</style>
