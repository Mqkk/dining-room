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
      commit("SET_PRODUCTS_TO_STATE", products.data);
      return products;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async GET_ORDER_FROM_API({ commit }) {
    try {
      const order = await axios("http://localhost:3000/items", {
        methods: "GET",
      });
      commit("SET_ORDER_TO_STATE", order.data);
      return order;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
