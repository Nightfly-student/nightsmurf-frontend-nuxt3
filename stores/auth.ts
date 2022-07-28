import { defineStore } from "pinia";
import { notify } from "@kyvg/vue3-notification";
import apiFetch from "@/composables/useInterceptorFetch";

type userObject = {
  _id: string;
  isAdmin: boolean;
  isMod: boolean;
  isAffiliate: boolean;
};
type tokenObject = {
  refresh_token: string;
  access_token: string;
};
type dataObject = {
  user: userObject;
  tokens: tokenObject;
};

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      isMod: false,
      isAffiliate: false,
      isRedirected: null,
    };
  },
  getters: {
    getIsLogged: (state) => state.isAuthenticated,
    getId: (state) => state.user._id,
    getIsAdmin: (state) => state.isAdmin,
    getIsMod: (state) => state.isMod,
    getIsAffiliate: (state) => state.isAffiliate,
  },
  actions: {
    async login(email, password) {
      const config = useRuntimeConfig();

      const { data } = useAsyncData("login", async () => {
        let data;
        try {
          data = await apiFetch<dataObject>(
            `${config.DOMAIN}/api/users/login`,
            {
              body: {
                email: email,
                password: password,
              },
              method: "POST",
            }
          );
          useCookie("user").value = JSON.stringify(data.user);
          useCookie("token").value = JSON.stringify(data.tokens);
          this.user = data.user;
          this.token = data.tokens;
          this.isAuthenticated = true;
          this.isAdmin = data.user.isAdmin;
          this.isMod = data.user.isMod;
          this.isAffiliate = data.user.isAffiliate;
          notify({
            text: "Successfully Logged In",
            type: "success",
          });
          const router = useRouter();
          router.push("/");
        } catch (error) {
          notify({
            text: "Invalid Credentials",
            type: "error",
          });
          console.log(error);
        }
      });
    },
    async logout(redirect) {
      const config = useRuntimeConfig();
      await apiFetch<dataObject>(`${config.DOMAIN}/api/users/logout`, {
        retry: 3,
        method: "POST",
        body: {
          token: useCookie<tokenObject>("token").value.refresh_token,
        },
      }).then(() => {
        useCookie("user").value = undefined;
        useCookie("token").value = undefined;
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.isMod = false;
        this.isAffiliate = false;
        const router = useRouter();
        router.push(redirect);
      });
    },
    async affiliate(affiliate) {
      const config = useRuntimeConfig();
      const router = useRouter();
      await apiFetch(`${config.DOMAIN}/api/affiliates/r/${affiliate}`).then(
        (res) => {
          useCookie("affiliate").value = JSON.stringify(res);
          this.isRedirected = res;
        }
      );
      router.push("/");
    },
    async affiliateCoupon(coupon) {
      const config = useRuntimeConfig();
      await apiFetch(`${config.DOMAIN}/api/affiliates/coupon/${coupon}`).then(
        (res) => {
          useCookie("affiliate").value = JSON.stringify(res);
          this.isRedirected = res;
        }
      );
    },
    async setStates() {
      const user = useCookie<userObject>("user").value;
      const token = useCookie<tokenObject>("token").value;
      const affiliate = useCookie<any>("affiliate").value;

      this.user = user ? user : null;
      this.token = token ? token : null;
      this.isAuthenticated = user ? true : false;
      this.isAdmin = user ? user.isAdmin : false;
      this.isMod = user ? user.isMod : false;
      this.isAffiliate = user ? user.isAffiliate : false;
      this.isRedirected = affiliate ? affiliate : false;
    },
  },
});
