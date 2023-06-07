import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store.js";
import router from "./router/router.js";
import "material-design-icons-iconfont";
import VueTheMask from "vue-the-mask";
import VueBarcode from "@chenfengyuan/vue-barcode";
import VueCookies from "vue-cookies";

const app = createApp(App);
app.use(VueTheMask).use(VueCookies).use(store).use(router);
app.component(VueBarcode.name, VueBarcode);

const isAuthenticated = store.state.isAuthenticated;

router.isReady().then(() => {
  if (isAuthenticated) {
    if (store.state.order.length) {
      router.push("/order-now");
    } else {
      router.push("/catalog");
    }
  } else {
    router.push("/authorization");
  }
});

if (store.state.order.length) {
  store.dispatch("CLEAR_CART");
}

app.mount("#app");
