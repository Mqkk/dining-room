<template>
  <div class="registration">
    <div class="registration__container">
      <v-title-subtitle :title="title" :subtitle="subtitle" />
      <form class="form content" @submit.prevent="sendingData">
        <div class="form__item form__item--left">
          <input
            class="input-reset input"
            type="text"
            id="last_name"
            v-model="formData.last_name"
            placeholder="Введите Фамилию"
            autocomplete="family-name"
          />
          <span class="error-message" v-if="errors.lastName">{{
            errors.lastName
          }}</span>
        </div>

        <div class="form__item form__item--left">
          <input
            class="input-reset input"
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="Введите Имя"
            autocomplete="name"
          />
          <span class="error-message" v-if="errors.name">{{
            errors.name
          }}</span>
        </div>

        <div class="form__item form__item--left">
          <input
            class="input-reset input"
            type="text"
            id="surname"
            v-model="formData.surname"
            placeholder="Введите Отчество"
            autocomplete="given-name"
          />
          <span class="error-message" v-if="errors.surname">{{
            errors.surname
          }}</span>
        </div>

        <div class="form__item form__item--left">
          <input
            class="input-reset input"
            type="tel"
            id="phone"
            v-model="formData.phone"
            placeholder="Введите номер телефона"
            autocomplete="tel"
            v-mask="'+7 (###) ###-##-##'"
          />
          <span class="error-message" v-if="errors.phone">{{
            errors.phone
          }}</span>
        </div>

        <div class="form__item form__item--left">
          <input
            class="input-reset input"
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Введите Пароль"
          />
          <span class="error-message" v-if="errors.password">{{
            errors.password
          }}</span>
        </div>

        <div class="form__item form__item--left">
          <input
            class="input-reset input"
            type="password"
            id="password2"
            v-model="formData.password2"
            placeholder="Повторите Пароль"
          />
          <span class="error-message" v-if="errors.password2">{{
            errors.password2
          }}</span>
        </div>

        <button class="btn-reset btn form__btn" type="submit">
          Продолжить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vTitleSubtitle from "@/components/v-title-subtitle";

export default {
  name: "v-registration",
  data() {
    return {
      title: "Регистрация",
      subtitle: "Все поля должны быть заполнены.",
      formData: {
        phone: "",
        name: "",
        surname: "",
        last_name: "",
        password: "",
        password2: "",
      },
      errors: {
        lastName: "",
        name: "",
        surname: "",
        phone: "",
        password: "",
        password2: "",
      },
    };
  },
  components: {
    vTitleSubtitle,
  },
  computed: {
    ...mapGetters(["GET_TOKEN"]),
  },
  methods: {
    ...mapActions(["POST_DATA_FOR_REGISTRATION", "SAVE_TOKEN"]),
    async sendingData(event) {
      event.preventDefault();

      // Сбросьте предыдущие ошибки перед каждой валидацией
      this.errors = {
        lastName: "",
        name: "",
        surname: "",
        phone: "",
        password: "",
        password2: "",
      };

      // Валидация Фамилии
      if (!this.formData.last_name) {
        this.errors.lastName = "Поле Фамилия обязательно для заполнения";
      }

      // Валидация Имени
      if (!this.formData.name) {
        this.errors.name = "Поле Имя обязательно для заполнения";
      }

      // Валидация Отчества
      if (!this.formData.surname) {
        this.errors.surname = "Поле Отчество обязательно для заполнения";
      }

      // Валидация Телефона
      if (!this.formData.phone) {
        this.errors.phone = "Поле Телефон обязательно для заполнения";
      } else if (!this.isValidPhoneNumber(this.formData.phone)) {
        this.errors.phone = "Некорректный номер телефона";
      }

      // Валидация Пароля
      if (!this.formData.password) {
        this.errors.password = "Поле Пароль обязательно для заполнения";
      } else if (this.formData.password.length < 8) {
        this.errors.password = "Пароль должен сожержать минимум 8 символов";
      }

      // Валидация Повторного пароля
      if (!this.formData.password2) {
        this.errors.password2 =
          "Поле Повторите Пароль обязательно для заполнения";
      } else if (this.formData.password !== this.formData.password2) {
        this.errors.password2 = "Пароли не совпадают";
      }

      // Если есть ошибки валидации, не отправляем данные
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      if (hasErrors) {
        return;
      } else {
        try {
          await this.POST_DATA_FOR_REGISTRATION(this.formData);

          this.$router.push("/registration/confirmation");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400) {
              this.errors.phone = "Номер уже существует";
            }
          } else {
            this.$notify({
              title: error,
              type: "error",
            });
          }
        }
      }
    },
    isValidPhoneNumber(phone) {
      const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
      return phoneRegex.test(phone);
    },
  },
};
</script>

<style lang="scss" scoped></style>
