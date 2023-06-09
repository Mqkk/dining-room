<template>
  <div class="recovery-password">
    <div class="recovery-password__container">
      <v-title-subtitle :title="title" />
    </div>
    <form class="form recover-password__form content">
      <div class="form__item form__item--left">
        <label class="form__label">
          <input
            type="password"
            class="input-reset input form__input"
            v-model="recoveryPasswordData.password"
            placeholder="Введите новый пароль"
          />
        </label>
        <span class="error-message" v-if="errors.password">{{
          errors.password
        }}</span>
      </div>
      <div class="form__item form__item--left">
        <label class="form__label">
          <input
            type="password"
            class="input-reset input form__input"
            v-model="recoveryPasswordData.confirmPassword"
            placeholder="Подтвердите новый пароль"
          />
        </label>
        <span class="error-message" v-if="errors.confirmPassword">{{
          errors.confirmPassword
        }}</span>
      </div>
      <button class="btn-reset btn form__btn" @click="submitNewPassword">
        Подтвердить
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import vTitleSubtitle from "@/components/v-title-subtitle.vue";

export default {
  name: "v-recovery-password-new",
  components: {
    vTitleSubtitle,
  },
  data() {
    return {
      title: "Восстановление пароля",
      recoveryPasswordData: {
        password: "",
        confirmPassword: "",
        phone: this.$store.state.recoveryPasswordData.phone,
      },
      errors: {
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    ...mapActions(["POST_PASSWORD_FOR_RECOVERY_PASSWORD"]),
    async submitNewPassword(event) {
      event.preventDefault();

      this.errors = {
        password: "",
        confirmPassword: "",
      };

      // Валидация Пароля
      if (!this.recoveryPasswordData.password) {
        this.errors.password = "Поле Пароль обязательно для заполнения";
      } else if (this.recoveryPasswordData.password.length < 8) {
        this.errors.password = "Пароль должен сожержать минимум 8 символов";
      }

      // Валидация Повторного пароля
      if (!this.recoveryPasswordData.confirmPassword) {
        this.errors.confirmPassword =
          "Поле Повторите Пароль обязательно для заполнения";
      } else if (
        this.recoveryPasswordData.password !==
        this.recoveryPasswordData.confirmPassword
      ) {
        this.errors.confirmPassword = "Пароли не совпадают";
      }

      // Если есть ошибки валидации, не отправляем данные
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      if (hasErrors) {
        return;
      } else {
        try {
          await this.POST_PASSWORD_FOR_RECOVERY_PASSWORD(
            this.recoveryPasswordData
          );

          // Переход на страницу успешного восстановления пароля
          this.$router.push("/authorization");

          this.$notify({
            title: "Пароль успешно восстановлен",
            type: "success",
          });
        } catch (error) {
          this.$notify({
            title: error,
            type: "error",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
