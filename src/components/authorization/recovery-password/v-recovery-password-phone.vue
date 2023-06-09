<template>
  <div class="recovery-password">
    <div class="recovery-password__container">
      <v-title-subtitle :title="title" :subtitle="subtitle" />
    </div>
    <form class="form recover-password__form content">
      <div class="form__item form__item--left">
        <label class="form__label">
          <input
            type="tel"
            class="input-reset input form__input"
            id="phone"
            v-model="recoveryPasswordData.phone"
            v-mask="'+7 (###) ###-##-##'"
            placeholder="Введите номер телефона"
            autocomplete="tel"
          />
        </label>
        <span class="error-message" v-if="errors.phone">{{
          errors.phone
        }}</span>
      </div>
      <button class="btn-reset btn form__btn" @click="submitPhoneNumber">
        Получить код
      </button>
    </form>
  </div>
</template>

<script>
import vTitleSubtitle from "@/components/v-title-subtitle.vue";
import { mapActions } from "vuex";

export default {
  name: "v-recovery-password-phone",
  components: {
    vTitleSubtitle,
  },
  data() {
    return {
      title: "Восстановление пароля",
      subtitle:
        "Введите ваш номер телефона. На него будет оправлен код для восстановления пароля.",
      recoveryPasswordData: {
        phone: "",
      },
      errors: {
        phone: "",
      },
    };
  },
  methods: {
    ...mapActions(["POST_PHONE_FOR_RECOVERY_PASSWORD"]),
    async submitPhoneNumber(event) {
      event.preventDefault();

      this.errors = {
        phone: "",
      };

      // Валидация Телефона
      if (!this.recoveryPasswordData.phone) {
        this.errors.phone = "Поле обязательно для заполнения";
      } else if (!this.isValidPhoneNumber(this.recoveryPasswordData.phone)) {
        this.errors.phone = "Некорректный номер телефона";
      }

      // Если есть ошибки валидации, не отправляем данные
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      if (hasErrors) {
        return;
      } else {
        try {
          await this.POST_PHONE_FOR_RECOVERY_PASSWORD(
            this.recoveryPasswordData
          );

          // переход к следущему этапу
          this.$router.push("/verification-code");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400) {
              this.errors.phone = "Данного номера телефона нет в базе";
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
