import axios from "axios";

export default {
  async DELETE_ORDER_FROM_API() {
    try {
      const token = this.state.token;
      const response = await axios.delete(
        "http://v-brn-stoltest:8000/api/order/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: this.state.menuId,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
