export default {
  UPDATE_REGISTRATION_FORM_DATA(state, payload) {
    state.registrationData = payload; // Мутация для обновления данных формы
  },

  UPDATE_CONFIRM_CODE_FOR_REGISTRATION(state, payload) {
    state.confirmCode = payload; // Мутация для обновления данных
  },

  UPDATE_DATA_FOR_AUTHORIZATION(state, payload) {
    state.loginData = payload; // Мутация для обновления данных
  },

  UPDATE_DATA_FOR_CHANGE_PASSWORD(state, payload) {
    state.loginData = payload; // Мутация для обновления данных
  },

  SET_TOKEN(state, token) {
    state.token = token; // мутация для установки значения
  },

  RESET_STATE(state) {
    state.token = null;
    state.loginData = null;
    state.cart = [];
    state.products = [];
    state.order = [];
    state.phoneForRecoveryPassword = {};
  },

  SET_AUTH(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },

  // reconfirmation
  UPDATE_CODE_FOR_RECONFIRMATION(state, confirmCode) {
    state.confirmCode = confirmCode;
  },

  // recovery password
  UPDATE_DATA_FOR_RECOVERY_PASSWORD(state, payload) {
    state.recoveryPasswordData = payload;
  },

  // мутация, которая добавляет данные из API в массив
  SET_PRODUCTS_TO_STATE: (state, products) => {
    state.products = products;

    if (state.cart.length) {
      for (const item of state.cart) {
        const product = state.products.find((p) => p.good_id === item.good_id);
        if (product) {
          product.good__quantity = item.good__quantity;
        }
      }
    }

    if (state.order.length) {
      for (const item of state.order) {
        const product = state.products.find((p) => p.good_id === item.good_id);
        if (product) {
          product.good__quantity = item.good__quantity;
        }
      }
    }
  },

  SET_ORDERS_HISTORY_TO_STATE: (state, ordersHistory) => {
    state.ordersHistory = ordersHistory;
  },

  SET_ORDER_HISTORY_ITEM_TO_STATE: (state, orderHistoryItem) => {
    state.orderHistoryItem = orderHistoryItem;
  },

  SET_CART: (state, product) => {
    // логическое выражение, которое проверяет количество товара, и добавляет quantity, а не новый товар
    if (state.cart.length) {
      let isProductExists = false;
      state.cart.map(function (item) {
        if (item.good_id === product.good_id) {
          isProductExists = true;
          item.good__quantity++;
          item.good__quantity = product.good__quantity;
        }
      });
      if (!isProductExists) {
        state.cart.push(product);
      }
    } else {
      state.cart.push(product);
    }
  },

  SET_ORDER: (state, product) => {
    // логическое выражение, которое проверяет количество товара, и добавляет quantity, а не новый товар
    if (state.order.length) {
      let isProductExists = false;
      state.order.map(function (item) {
        if (item.good_id === product.good_id) {
          isProductExists = true;
          item.good__quantity++;
          item.good__quantity = product.good__quantity;
        }
      });
      if (!isProductExists) {
        state.order.push(product);
      }
    } else {
      state.order.push(product);
    }
  },
  // мутация, которая будет удалять 1 товар из корзниы
  REMOVE_FROM_CART: (state, index) => {
    state.cart.splice(index, 1);
  },
  // мутация для добавления quantity товару в cart
  INCREMENT: (state, index) => {
    state.cart[index].good__quantity++;
  },
  // мутация для удаления quantity товару в cart с проверкой, что quantity не равно 1
  DECREMENT: (state, index) => {
    if (state.cart[index].good__quantity > 1) {
      state.cart[index].good__quantity--;
    }
  },

  CLEAR_FROM_CART(state, cart) {
    state.cart = cart;
  },

  CLEAR_FROM_ORDER(state, order) {
    state.order = order;
  },

  // обновление данных, которые отправляются из корзины
  UPDATE_CART_TO_SERVER: (state, cartData) => {
    state.cartData = cartData;
  },

  // мутация, которая добавляет данные из API в массив
  SET_ORDER_TO_STATE: (state, order) => {
    for (const item of order) {
      const existingItem = state.order.find((i) => i.good_id === item.good_id);
      if (!existingItem) {
        state.order.push(item);
      }
    }

    // Обновляем продукты только для новых элементов заказа
    for (const item of order) {
      const product = state.products.find((p) => p.good_id === item.good_id);
      if (product && !product.good__quantity) {
        Object.assign(product, item);
      }
    }
  },

  // мутация, которая будет удалять 1 товар из корзниы
  REMOVE_FROM_ORDER: (state, index) => {
    state.order.splice(index, 1);
  },
  // мутация для добавления quantity товару в order
  INCREMENT_ORDER: (state, index) => {
    state.order[index].good__quantity++;
  },
  // мутация для удаления quantity товару в order с проверкой, что quantity не равно 1
  DECREMENT_ORDER: (state, index) => {
    if (state.order[index].good__quantity > 1) {
      state.order[index].good__quantity--;
    }
  },

  // мутация для добавления quantity товару в catalog
  INCREMENT_PRODUCT: (state, product) => {
    product.good__quantity++;
  },
  // мутация для удаления quantity товару в catalog с проверкой, что quantity не равно 1
  DECREMENT_PRODUCT: (state, product) => {
    if (product.good__quantity > 1) {
      product.good__quantity--;
    }
  },

  UPDATE_PRODUCT_QUANTITY: (state, payload) => {
    const { good_id, quantity } = payload;
    const product = state.products.find((p) => p.good_id === good_id);
    if (product) {
      product.good__quantity = quantity;
    }
  },

  // profile
  SET_PROFILE_TO_STATE: (state, profileData) => {
    state.profileData = profileData;
  },

  // дата на сегодняшнее меню
  SET_MENU_ID(state, menuId) {
    state.menuId = menuId;
  },

  // id заказа
  UPDATE_ORDER_ID(state, orderId) {
    state.orderId = orderId;
  },
};
