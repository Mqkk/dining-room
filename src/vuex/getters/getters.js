export default {
  GET_TOKEN(state) {
    return state.token;
  },

  // геттер, который возвращает данные из массива products
  PRODUCTS(state) {
    return state.products;
  },

  CART(state) {
    return state.cart;
  },

  ORDER(state) {
    return state.order;
  },

  IS_AUTHENTICATED(state) {
    return state.isAuthenticated;
  },

  // тотал корзины
  CART_TOTAL_COST: (state) => {
    return state.cart.reduce(
      (sum, item) => sum + item.price * item.good__quantity,
      0
    );
  },

  // тотал заказа
  ORDER_TOTAL_COST: (state) => {
    return state.order.reduce(
      (sum, item) => sum + item.price * item.good__quantity,
      0
    );
  },

  GET_PRODUCT_BY_ID: (state) => (good_id) => {
    const stringId = good_id.toString();
    return state.products.find(
      (product) => product.good_id.toString() === stringId
    );
  },

  CART_TO_SERVER: (state) => {
    return state.cart.map((item) => {
      return {
        good_id: item.good_id,
        good__quantity: item.good__quantity,
        price: item.price * item.good__quantity,
      };
    });
  },

  ORDER_FROM_SERVER: (state) => {
    return state.order.map((item) => {
      return {
        good_id: item.product_id,
        good__name: item.product__name,
        good__quantity: item.product__quantity,
      };
    });
  },

  PROFILE(state) {
    return state.profileData;
  },

  MENU_ID(state) {
    return state.menuId;
  },

  ORDER_ID(state) {
    return state.orderId;
  },
};
