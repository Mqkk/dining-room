<template>
  <div class="change-password">
    <div class="change-password__container">
      <v-title-subtitle :title="title" />
    </div>
    <div class="change-password__content content">
      <form class="form change-password__form">
        <div class="form__item form__item--left">
          <label class="form__label">
            <div class="input-password">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="input-reset input form__input"
                id="password"
                v-model="formData.password"
                placeholder="Введите старый пароль"
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
          </label>
          <span class="error-message" v-if="errors.password">
            {{ errors.password }}
          </span>
        </div>
        <div class="form__item form__item--left">
          <label class="form__label">
            <div class="input-password">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="input-reset input form__input"
                id="password_new"
                v-model="formData.password_new"
                placeholder="Введите новый пароль"
              />
            </div>
          </label>
          <span class="error-message" v-if="errors.password_new">
            {{ errors.password_new }}
          </span>
        </div>
        <div class="form__item form__item--left">
          <label class="form__label">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="input-reset input form__input"
              id="confrirm_password"
              v-model="formData.confirmNewPassword"
              placeholder="Подтвердите новый пароль"
            />
          </label>
          <span class="error-message" v-if="errors.confirmNewPassword">
            {{ errors.confirmNewPassword }}
          </span>
        </div>
        <button class="btn-reset btn form__btn" @click="submitChangePassword">
          Сменить пароль
        </button>
      </form>
    </div>
  </div>
  <notifications />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vTitleSubtitle from "@/components/v-title-subtitle";

export default {
  name: "v-change-password",
  components: {
    vTitleSubtitle,
  },
  data() {
    return {
      title: "Смена пароля",
      formData: {
        password: "",
        password_new: "",
        confirmNewPassword: "",
      },
      errors: {
        password: "",
        password_new: "",
        confirmNewPassword: "",
      },
      showPassword: false,
    };
  },
  methods: {
    ...mapActions(["POST_DATA_FOR_CHANGE_PASSWORD"]),
    async submitChangePassword(event) {
      event.preventDefault();

      // Сбросьте предыдущие ошибки перед каждой валидацией
      this.errors = {
        password: "",
        password_new: "",
        confirmNewPassword: "",
      };

      // Валидация Старого Пароля
      if (!this.formData.password) {
        this.errors.password = "Поле Пароль обязательно для заполнения";
      } else if (this.formData.password.length < 8) {
        this.errors.password = "Пароль должен сожержать минимум 8 символов";
      }

      // Валидация Нового Пароля
      if (!this.formData.password_new) {
        this.errors.password_new = "Поле Пароль обязательно для заполнения";
      } else if (this.formData.password_new.length < 8) {
        this.errors.password_new = "Пароль должен сожержать минимум 8 символов";
      }

      // Валидация Повторного пароля
      if (!this.formData.confirmNewPassword) {
        this.errors.confirmNewPassword =
          "Поле 'Повторите Пароль' обязательно для заполнения";
      } else if (
        this.formData.password_new !== this.formData.confirmNewPassword
      ) {
        this.errors.confirmNewPassword = "Пароли не совпадают";
      }

      // Если есть ошибки валидации, не отправляем данные
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      if (hasErrors) {
        return;
      } else {
        try {
          await this.POST_DATA_FOR_CHANGE_PASSWORD(this.formData); // вызываем действие для отправки формы
          this.$notify({
            title: "Пароль успешно изменен",
            type: "success",
          });
          // Переход на страницу успешного восстановления пароля
          this.$router.push("/settings");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400) {
              this.errors.password = error;
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
  },
  computed: {
    ...mapGetters(["GET_TOKEN"]),
  },
};
</script>

<style lang="scss" scoped></style>
