import axios from "axios";

export default {
  async DELETE_ORDER_FROM_API() {
    try {
      const token = this.state.token;
      const response = await axios.delete("", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: this.state.menuId,
      });

      return response;
    } catch (error) {
      if (error.response) {
        return Promise.reject("Ошибка сервера");
      } else if (error.request) {
        // Ошибка запроса (например, нет подключения к интернету)
        return Promise.reject("Ошибка сервера");
      } else {
        // Прочие ошибки
        return Promise.reject("Неизвестная ошибка");
      }
    }
  },
};
