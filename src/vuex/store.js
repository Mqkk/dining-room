import { createApp } from "vue";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import commonActions from "./actions/actions";
import apiRequests from "./actions/api-requests";
import getters from "./getters/getters";
import mutations from "./mutations/mutations";
import apiResponse from "./actions/api-response";
import apiDelete from "./actions/api-delete";

const actions = {
  ...commonActions,
  ...apiRequests,
  ...apiResponse,
  ...apiDelete,
};

const store = createStore({
  state: {
    registrationData: {}, // состояние для хранения данных регистрации
    loginData: {}, // состояние для хранения данных авторизации
    confirmCode: {}, // состояние для хранения данных подтверждения регистрации
    token: "", // состояние для хранения токен JWT
    products: [], // пустой массив, куда пойдут данные из API
    cart: [],
    order: [],
    ordersHistory: [],
    orderHistoryItem: [],
    changePasswordData: {},
    isAuthenticated: false,
    recoveryPasswordData: {}, // строка для номера телефона при восстановлении пароля
    profileData: {},
    menuId: "",
    cartData: {},
    orderId: {},
  },
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ["token", "isAuthenticated", "recoveryPasswordData"],
    }),
  ],
});

export default store;

const app = createApp({});
app.use(store);
