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
            v-mask="'+7 (###) ###-##-##'"
          />
          <span class="error-message" v-if="errors.phone">
            {{ errors.phone }}
          </span>
        </div>
        <div class="form__item">
          <div class="form__item form__item--left">
            <div class="input-password">
              <input
                class="input-reset input"
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                placeholder="Введите Пароль"
              />
              <span
                class="toggle-password"
                :class="{ 'show-password': showPassword }"
                @click="showPassword = !showPassword"
              >
                <i class="material-icons">
                  {{ showPassword ? "visibility_off" : "visibility" }}
                </i>
              </span>
            </div>
            <span class="error-message" v-if="errors.password">{{
              errors.password
            }}</span>
          </div>
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
      maskedValue: "",
      errors: {
        phone: "",
        password: "",
      },
      showPassword: false,
    };
  },
  methods: {
    ...mapActions(["POST_DATA_FOR_AUTHORIZATION"]),
    async sendingData(event) {
      event.preventDefault();

      // Сбросьте предыдущие ошибки перед каждой валидацией
      this.errors = {
        phone: "",
        password: "",
      };

      // Валидация Телефона
      if (!this.formData.phone) {
        this.errors.phone = "Поле обязательно для заполнения";
      } else if (!this.isValidPhoneNumber(this.formData.phone)) {
        this.errors.phone = "Некорректный номер телефона";
      }
      // Валидация Пароля
      if (!this.formData.password) {
        this.errors.password = "Поле обязательно для заполнения";
      }

      // Если есть ошибки валидации, не отправляем данные
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      if (hasErrors) {
        return;
      } else {
        try {
          await this.POST_DATA_FOR_AUTHORIZATION(this.formData); // вызываем действие для отправки формы

          this.saveTokenToCookie();
          this.reloadPage();
        } catch (error) {
          this.errors.phone = error;
        }
      }
    },

    saveTokenToCookie(token) {
      token = this.$store.state.token;
      this.$cookies.set("jwtToken", token, "7d");
    },

    isValidPhoneNumber(phone) {
      const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
      return phoneRegex.test(phone);
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
</style>
