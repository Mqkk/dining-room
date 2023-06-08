export default {
  SAVE_TOKEN({ commit }, token) {
    // Действие для сохраниения токена
    commit("SET_TOKEN", token); // вызываем мутация для установки значения
  },

  LOGOUT({ commit }) {
    commit("RESET_STATE");
    commit("SET_AUTH", false);
  },

  ADD_TO_CART({ commit }, product) {
    commit("SET_CART", product);
  },
  ADD_TO_ORDER({ commit }, product) {
    commit("SET_ORDER", product);
  },
  // экшн для добавления quantity элементу корзины
  INCREMENT_CART_ITEM({ commit }, index) {
    commit("INCREMENT", index);
  },
  // экшн для удаления quantity элементу корзины
  DECREMENT_CART_ITEM({ commit }, index) {
    commit("DECREMENT", index);
  },
  // экшн удаления товара из корзниы, передается мутация и индекс
  DELETE_FROM_CART({ commit }, index) {
    commit("REMOVE_FROM_CART", index);
  },

  CLEAR_CART({ commit }) {
    commit("CLEAR_FROM_CART", []);
  },

  CLEAR_ORDER({ commit }) {
    commit("CLEAR_FROM_ORDER", []);
  },

  // экшн для добавления quantity элементу заказа
  INCREMENT_ORDER_ITEM({ commit }, index) {
    commit("INCREMENT_ORDER", index);
  },
  // экшн для удаления quantity элементу заказа
  DECREMENT_ORDER_ITEM({ commit }, index) {
    commit("DECREMENT_ORDER", index);
  },
  // экшн удаления товара из заказа, передается мутация и индекс
  DELETE_FROM_ORDER({ commit }, index) {
    commit("REMOVE_FROM_ORDER", index);
  },

  // экшн для добавления quantity элементу каталога
  INCREMENT_PRODUCT_ITEM({ commit }, product) {
    commit("INCREMENT_PRODUCT", product);
  },
  // экшн для удаления quantity элементу каталога
  DECREMENT_PRODUCT_ITEM({ commit }, product) {
    commit("DECREMENT_PRODUCT", product);
  },

  INPUT_QUANTITY_PRODUCT_ITEM({ commit }, payload) {
    commit("INPUT_PRODUCT_QUANTITY", payload);
  },
};
