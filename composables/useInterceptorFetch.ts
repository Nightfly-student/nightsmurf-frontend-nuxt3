import { $fetch } from "ohmyfetch";
import { useMainStore } from "~~/stores";
type tokenObject = {
  refresh_token: string;
  access_token: string;
};

const apiFetch = $fetch.create({
  retry: 1,
  keepalive: true,
  async onRequest({ request, options }) {
    var token = useCookie<tokenObject>("token").value;
    if (token && token.access_token) {
      options.headers = { Authorization: "Bearer " + token.access_token };
    }
  },
  async onResponseError({ request, response, options }) {
    if (response.status === 403) {
      const config = useRuntimeConfig();
      const store = useMainStore();

      store.logout('/login');


      // const check = new Promise((resolve, reject) => {
      //   try {
      //     apiFetch(`${config.DOMAIN}/api/refresh`, {
      //       method: "POST",
      //       body: {
      //         refreshToken: useCookie<tokenObject>("token").value.refresh_token,
      //       },
      //     }).then((res) => {
      //       const token = res;
      //       useCookie<tokenObject>("token").value = token;
      //       options.retry = 1;
      //       resolve(true);
      //     });
      //   } catch (err) {
      //     reject();
      //   }
      // });
      // return apiFetch(request, options);
    }
  },
});

export default apiFetch;
