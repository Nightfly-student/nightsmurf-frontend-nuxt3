import { useMainStore } from "@/stores";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useMainStore();
  store.setStates();
  if (to.fullPath.includes("/user/") && !store.getIsLogged) {
    return navigateTo("/login");
  }
  if (
    (to.fullPath.includes("/admin") && !store.getIsLogged) ||
    (to.fullPath.includes("/admin") && !store.getIsAdmin && !store.getIsMod)
  ) {
    return navigateTo("/");
  }
  if (
    (to.fullPath.includes("/affiliate/dashboard") &&
      store.getIsLogged &&
      !store.getIsAffiliate) ||
    (to.fullPath.includes("/affiliate/dashboard") && !store.getIsLogged)
  ) {
    return navigateTo("/");
  }
  if (
    (to.fullPath.includes("/login") && store.getIsLogged) ||
    (to.fullPath.includes("/register") && store.getIsLogged)
  ) {
    return navigateTo("/");
  }
});
