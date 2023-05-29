import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store.js";
import router from "./router/router.js";
import "material-design-icons-iconfont";

const app = createApp(App);
app.use(store).use(router);

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

store.dispatch("GET_ORDER_FROM_API");

if (store.state.order.length) {
  store.dispatch("CLEAR_CART");
}

app.mount("#app");
