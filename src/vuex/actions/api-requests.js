import axios from "axios";

export default {
  // экшн, который запрашивает данные из API при помощи axios
  // http://brn-k30-047:8000/api/menu/
  async GET_PRODUCTS_FROM_API({ commit }) {
    try {
      const token = this.state.token;
      const products = await axios("http://brn-k30-047:8000/api/menu/", {
        methods: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!products.data.items) {
        commit("SET_PRODUCTS_TO_STATE", products.data);
      } else {
        commit("SET_PRODUCTS_TO_STATE", products.data.items);
        commit("SET_MENU_ID", products.data.menu_id);
      }

      return products;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async GET_ORDER_FROM_API({ commit }) {
    try {
      // const orderId = this.state.orderId;
      const token = this.state.token;
      const order = await axios("http://brn-k30-047:8000/api/order/", {
        methods: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newOrder = order.data.items.map((item) => {
        return {
          good_id: item.product_id,
          good__name: item.product__name,
          good__quantity: item.product__quantity,
          good__image: item.product__image,
          price: item.total_price,
        };
      });
      commit("SET_ORDER_TO_STATE", newOrder);
      console.log(this.state.order);
      console.log(order);
      return newOrder;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async GET_PROFILE_FROM_API({ commit }) {
    try {
      const token = this.state.token;
      const profileData = await axios("http://brn-k30-047:8000/api/profile/", {
        methods: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("SET_PROFILE_TO_STATE", profileData.data);

      return profileData;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
