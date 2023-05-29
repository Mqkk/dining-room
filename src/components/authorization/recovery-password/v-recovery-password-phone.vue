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
            v-model="phoneNumber"
            v-mask="'+7(###)-###-##-##'"
            placeholder="Введите номер телефона"
          />
        </label>
        <span class="error-message" v-if="errors.phoneNumber">{{
          errors.phoneNumber
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
      phoneNumber: "",
      errors: {
        phoneNumber: "",
      },
    };
  },
  methods: {
    ...mapActions(["POST_PHONE_FOR_RECOVERY_PASSWORD"]),
    async submitPhoneNumber(event) {
      event.preventDefault();

      this.errors = {
        phoneNumber: "",
      };

      // Валидация Телефона
      if (!this.phoneNumber) {
        this.errors.phoneNumber = "Поле обязательно для заполнения";
      } else if (!this.isValidPhoneNumber(this.phoneNumber)) {
        this.errors.phoneNumber = "Некорректный номер телефона";
      }

      // Если есть ошибки валидации, не отправляем данные
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      if (hasErrors) {
        return;
      }

      this.POST_PHONE_FOR_RECOVERY_PASSWORD(this.phoneNumber);

      // переход к следущему этапу
      this.$router.push("/verification-code");
    },

    isValidPhoneNumber(phoneNumber) {
      const phoneRegex = /^[0-9]{11}$/;
      return phoneRegex.test(phoneNumber);
    },
  },
};
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 12px;
  text-align: left;
}
</style>
