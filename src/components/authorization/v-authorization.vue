<template>
  <div class="login">
    <div class="login__container">
      <div class="login__logo">
        <img :src="logo" />
      </div>
      <h1 class="login__title">Вход в Личный кабинет</h1>
      <form class="login__form form" @submit.prevent="sendingData">
        <div class="form__item form__item--left">
          <input
            class="input-reset input"
            type="tel"
            id="phone"
            v-model="formData.phone"
            placeholder="Введите номер телефона"
            :maxlength="11"
            @input="formatPhoneNumber"
          />
          <div v-if="phoneInvalid" class="error-message">
            Неправильный формат номера телефона
          </div>
        </div>
        <div class="form__item">
          <input
            class="input-reset input"
            type="password"
            id="name"
            v-model="formData.password"
            placeholder="Введите пароль"
          />
          <router-link class="link form__link" to="/recovery-password">
            Забыли пароль?
          </router-link>
        </div>
        <button class="btn-reset btn form__btn" type="submit">Войти</button>
      </form>
      <router-link class="btn btn--gray" to="/registration">
        Зарегистрироваться
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import logo from "@/assets/images/logo.svg";

export default {
  name: "v-authorization",
  data() {
    return {
      logo,
      formData: {
        phone: "",
        password: "",
      },
      phoneInvalid: false,
    };
  },
  methods: {
    ...mapActions(["POST_DATA_FOR_AUTHORIZATION"]),
    async sendingData(event) {
      event.preventDefault();

      // Проверка номера телефона перед отправкой
      if (!this.isValidPhoneNumber(this.formData.phone)) {
        this.phoneInvalid = true; // Устанавливаем флаг ошибки номера телефона
        return;
      }

      await this.POST_DATA_FOR_AUTHORIZATION(this.formData); // вызываем действие для отправки формы
      this.reloadPage();
      // this.$router.push("/catalog");
    },
    isValidPhoneNumber(phone) {
      // Проверка формата номера телефона
      const phoneRegex = /^[0-9]{11}$/;
      return phoneRegex.test(phone);
    },
    formatPhoneNumber() {
      // Форматирование номера телефона (удаление лишних символов)
      this.formData.phone = this.formData.phone.replace(/\D/g, "");
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  height: 100%;

  &__container {
    width: 100%;
    max-width: 250px;
  }

  &__logo {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  }

  &__title {
    margin: 0;
    margin-bottom: 35px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
}

.error-message {
  color: red;
  font-size: 12px;
  text-align: left;
}
</style>
