import axios from "axios";

export default {
  async POST_DATA_FOR_REGISTRATION({ commit }, formData) {
    try {
      await axios.post("http://brn-k30-047:8000/api/register/", formData, {
        headers: {},
        withCredentials: true,
      });
      const response = await axios.post(
        "http://brn-k30-047:8000/api/token/obtain/",
        formData
      );
      const token = response.data.access;
      this.GET_TOKEN = token;

      commit("SET_TOKEN", token);
      commit("UPDATE_REGISTRATION_FORM_DATA", formData);

      console.log(response.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async POST_DATA_FOR_CONFIRM_REGISTRATION({ commit }, confirmCode) {
    try {
      const token = this.state.token;
      const response = await axios.post(
        "http://brn-k30-047:8000/api/confirmation/",
        confirmCode,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("UPDATE_CONFIRM_CODE_FOR_REGISTRATION", confirmCode);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async POST_DATA_FOR_AUTHORIZATION({ commit }, loginData) {
    try {
      await axios.post("http://brn-k30-047:8000/api/login/", loginData, {
        headers: {},
      });
      const response = await axios.post(
        "http://brn-k30-047:8000/api/token/obtain/",
        loginData
      );
      const token = response.data.access;
      this.GET_TOKEN = token;

      commit("SET_TOKEN", token);
      commit("UPDATE_DATA_FOR_AUTHORIZATION", loginData);
      commit("SET_AUTH", true);
      console.log(this.state.isAuthenticated);

      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async POST_DATA_FOR_CHANGE_PASSWORD({ commit }, changePasswordData) {
    try {
      const token = this.state.token;
      const response = await axios.post(
        "http://brn-k30-047:8000/api/password/",
        changePasswordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("UPDATE_DATA_FOR_CHANGE_PASSWORD", changePasswordData);

      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async SEND_CART_TO_SERVER({ state }) {
    try {
      const token = this.state.token;
      const response = await axios.post(
        "http://brn-k30-047:8000/api/order/",
        state.cart,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async POST_PHONE_FOR_RECOVERY_PASSWORD({ commit }, recoveryPasswordData) {
    try {
      const response = await axios.post(
        "http://brn-k30-047:8000/api/password/recovery/",
        recoveryPasswordData,
        {
          headers: {},
        }
      );
      commit("UPDATE_PHONE_FOR_RECOVERY_PASSWORD", recoveryPasswordData);

      console.log(response);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
