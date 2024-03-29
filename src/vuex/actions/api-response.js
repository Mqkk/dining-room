import axios from "axios";

export default {
  // регистрация
  async POST_DATA_FOR_REGISTRATION({ commit }, formData) {
    try {
      await axios.post("", formData, {
        headers: {},
        withCredentials: true,
      });
      const response = await axios.post("", formData);
      const token = response.data.access;
      this.GET_TOKEN = token;

      commit("SET_TOKEN", token);
      commit("UPDATE_REGISTRATION_FORM_DATA", formData);

      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          // Обработка ошибки 400
          return Promise.reject(error);
        } else {
          // Обработка других ошибок сервера
          return Promise.reject("Ошибка сервера");
        }
      } else if (error.request) {
        // Ошибка запроса (например, нет подключения к интернету)
        return Promise.reject("Ошибка сервера");
      } else {
        // Прочие ошибки
        return Promise.reject("Неизвестная ошибка");
      }
    }
  },

  // подтверждение регистрации
  async POST_DATA_FOR_CONFIRM_REGISTRATION({ commit }, confirmCode) {
    try {
      const token = this.state.token;
      const response = await axios.post("", confirmCode, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("UPDATE_CONFIRM_CODE_FOR_REGISTRATION", confirmCode);
      this.state.registrationData = {};
      localStorage.removeItem("vuex");

      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return Promise.reject(error);
        } else {
          // Обработка других ошибок сервера
          return Promise.reject("Ошибка сервера");
        }
      } else if (error.request) {
        // Ошибка запроса (например, нет подключения к интернету)
        return Promise.reject("Ошибка сервера");
      } else {
        // Прочие ошибки
        return Promise.reject("Неизвестная ошибка");
      }
    }
  },

  // авторизация
  async POST_DATA_FOR_AUTHORIZATION({ commit }, loginData) {
    try {
      await axios.post("", loginData, {
        headers: {},
      });
      const response = await axios.post("", loginData);
      const token = response.data.access;
      this.GET_TOKEN = token;

      commit("SET_TOKEN", token);
      commit("UPDATE_DATA_FOR_AUTHORIZATION", loginData);
      commit("SET_AUTH", true);

      return response;
    } catch (error) {
      if (error.response) {
        // Ошибка сервера (код состояния HTTP не в диапазоне 2xx)
        if (error.response.status === 401) {
          // Обработка ошибки авторизации
          return Promise.reject(error);
        } else if (error.response.status === 400) {
          return Promise.reject(error);
        } else {
          // Обработка других ошибок сервера
          return Promise.reject("Ошибка сервера");
        }
      } else if (error.request) {
        // Ошибка запроса (например, нет подключения к интернету)
        return Promise.reject("Ошибка сервера");
      } else {
        // Прочие ошибки
        return Promise.reject("Неизвестная ошибка");
      }
    }
  },

  // восстановление пароля (отправка номера телефона)
  async POST_PHONE_FOR_RECOVERY_PASSWORD({ commit }, recoveryPasswordData) {
    try {
      const response = await axios.post("", recoveryPasswordData, {
        headers: {},
      });
      commit("UPDATE_DATA_FOR_RECOVERY_PASSWORD", recoveryPasswordData);

      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return Promise.reject(error);
        } else {
          // Обработка других ошибок сервера
          return Promise.reject("Ошибка сервера");
        }
      } else if (error.request) {
        // Ошибка запроса (например, нет подключения к интернету)
        return Promise.reject("Ошибка сервера");
      } else {
        // Прочие ошибки
        return Promise.reject("Неизвестная ошибка");
      }
    }
  },

  // восстановление пароля (отправка кода подтверждения)
  async POST_СODE_FOR_RECOVERY_PASSWORD({ commit }, recoveryPasswordData) {
    try {
      const response = await axios.post("", recoveryPasswordData, {
        headers: {},
      });
      commit("UPDATE_DATA_FOR_RECOVERY_PASSWORD", recoveryPasswordData);

      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return Promise.reject(error);
        } else {
          // Обработка других ошибок сервера
          return Promise.reject("Ошибка сервера");
        }
      } else if (error.request) {
        // Ошибка запроса (например, нет подключения к интернету)
        return Promise.reject("Ошибка сервера");
      } else {
        // Прочие ошибки
        return Promise.reject("Неизвестная ошибка");
      }
    }
  },

  // восстановление пароля (отправка нового пароля)
  async POST_PASSWORD_FOR_RECOVERY_PASSWORD({ commit }, recoveryPasswordData) {
    try {
      const response = await axios.post("", recoveryPasswordData, {
        headers: {},
      });
      commit("UPDATE_DATA_FOR_RECOVERY_PASSWORD", recoveryPasswordData);

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

  // повторная отправка кода подтверждения
  async SEND_CODE_FOR_RECONFIRMATION({ commit }, confirmCode) {
    try {
      const response = await axios.post("", confirmCode, {
        headers: {},
      });
      commit("UPDATE_CODE_FOR_RECONFIRMATION", confirmCode);

      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return Promise.reject(error);
        } else {
          // Обработка других ошибок сервера
          return Promise.reject("Ошибка сервера");
        }
      } else if (error.request) {
        // Ошибка запроса (например, нет подключения к интернету)
        return Promise.reject("Ошибка сервера");
      } else {
        // Прочие ошибки
        return Promise.reject("Неизвестная ошибка");
      }
    }
  },

  // изменение пароля
  async POST_DATA_FOR_CHANGE_PASSWORD({ commit }, changePasswordData) {
    try {
      const token = this.state.token;
      const response = await axios.post("", changePasswordData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("UPDATE_DATA_FOR_CHANGE_PASSWORD", changePasswordData);

      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          return Promise.reject(error);
        } else {
          // Обработка других ошибок сервера
          return Promise.reject("Ошибка сервера");
        }
      } else if (error.request) {
        // Ошибка запроса (например, нет подключения к интернету)
        return Promise.reject("Ошибка сервера");
      } else {
        // Прочие ошибки
        return Promise.reject("Неизвестная ошибка");
      }
    }
  },

  // отправка товара из корзины серверу (и из заказа при изменении)
  async SEND_CART_TO_SERVER({ commit }, cartData) {
    try {
      const token = this.state.token;
      const response = await axios.post("", cartData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const orderId = response.data.order_id;
      commit("UPDATE_ORDER_ID", orderId);
      commit("UPDATE_CART_TO_SERVER", cartData);

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
