import axios from "axios";

export default {
  async POST_DATA_FOR_REGISTRATION({ commit }, formData) {
    try {
      await axios.post("http://v-brn-stoltest:8000/api/register/", formData, {
        headers: {},
        withCredentials: true,
      });
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/token/obtain/",
        formData
      );
      const token = response.data.access;
      this.GET_TOKEN = token;

      commit("SET_TOKEN", token);
      commit("UPDATE_REGISTRATION_FORM_DATA", formData);

      return response;
    } catch (error) {
      return Promise.reject("Номер уже используется");
    }
  },

  async POST_DATA_FOR_CONFIRM_REGISTRATION({ commit }, confirmCode) {
    try {
      const token = this.state.token;
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/confirmation/",
        confirmCode,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("UPDATE_CONFIRM_CODE_FOR_REGISTRATION", confirmCode);

      return response;
    } catch (error) {
      return Promise.reject("Неправильный код подтверждения");
    }
  },

  async POST_DATA_FOR_AUTHORIZATION({ commit }, loginData) {
    try {
      await axios.post("http://v-brn-stoltest:8000/api/login/", loginData, {
        headers: {},
      });
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/token/obtain/",
        loginData
      );
      const token = response.data.access;
      this.GET_TOKEN = token;

      commit("SET_TOKEN", token);
      commit("UPDATE_DATA_FOR_AUTHORIZATION", loginData);
      commit("SET_AUTH", true);

      return response;
    } catch (error) {
      return Promise.reject("Пользователь не существует");
    }
  },

  // изменение пароля
  async POST_DATA_FOR_CHANGE_PASSWORD({ commit }, changePasswordData) {
    try {
      const token = this.state.token;
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/password/",
        changePasswordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("UPDATE_DATA_FOR_CHANGE_PASSWORD", changePasswordData);

      return response;
    } catch (error) {
      return Promise.reject("Неправильный старый пароль");
    }
  },

  async SEND_CART_TO_SERVER({ commit }, cartData) {
    try {
      const token = this.state.token;
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/order/",
        cartData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orderId = response.data.order_id;
      commit("UPDATE_ORDER_ID", orderId);
      commit("UPDATE_CART_TO_SERVER", cartData);

      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // восстановление пароля (отправка номера телефона)
  async POST_PHONE_FOR_RECOVERY_PASSWORD({ commit }, recoveryPasswordData) {
    try {
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/password/recovery/",
        recoveryPasswordData,
        {
          headers: {},
        }
      );
      commit("UPDATE_DATA_FOR_RECOVERY_PASSWORD", recoveryPasswordData);

      return response;
    } catch (error) {
      return Promise.reject("Номера телефона нет в нашей базе");
    }
  },

  // восстановление пароля (отправка кода подтверждения)
  async POST_СODE_FOR_RECOVERY_PASSWORD({ commit }, recoveryPasswordData) {
    try {
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/password/recovery/code/",
        recoveryPasswordData,
        {
          headers: {},
        }
      );
      commit("UPDATE_DATA_FOR_RECOVERY_PASSWORD", recoveryPasswordData);

      return response;
    } catch (error) {
      return Promise.reject("Неправильный код подтверждения");
    }
  },

  // восстановление пароля (отправка нового пароля)
  async POST_PASSWORD_FOR_RECOVERY_PASSWORD({ commit }, recoveryPasswordData) {
    try {
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/password/set/",
        recoveryPasswordData,
        {
          headers: {},
        }
      );
      commit("UPDATE_DATA_FOR_RECOVERY_PASSWORD", recoveryPasswordData);

      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async SEND_CODE_FOR_RECONFIRMATION({ commit }, confirmCode) {
    try {
      const response = await axios.post(
        "http://v-brn-stoltest:8000/api/reconfirmation/",
        confirmCode,
        {
          headers: {},
        }
      );
      commit("UPDATE_CODE_FOR_RECONFIRMATION", confirmCode);

      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
