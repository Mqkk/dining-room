<template>
  <div class="recovery-password">
    <div class="recovery-password__container">
      <v-title-subtitle :title="title" :subtitle="subtitle" />
    </div>
    <form class="form recover-password__form content" @submit.prevent>
      <div class="form__item form__item--left">
        <label class="form__label">
          <input
            type="text"
            class="input-reset input form__input"
            id="code"
            v-model="recoveryPasswordData.code"
            v-mask="'####'"
            placeholder="Введите код подтверждения"
          />
        </label>
        <span class="error-message" v-if="errors.code">{{ errors.code }}</span>
      </div>
      <button
        class="btn-reset btn form__btn"
        @click="submitVerificationCode"
        type="submit"
        style="margin: 0"
      >
        Подтвердить
      </button>
      <v-send-code-again :phone="recoveryPasswordData.phone" />
    </form>
  </div>
</template>

<script>
import vTitleSubtitle from "@/components/v-title-subtitle.vue";
import vSendCodeAgain from "@/components/btns/v-send-code-again.vue";
import { mapActions } from "vuex";

export default {
  name: "v-recovery-password-verification-code",
  components: {
    vTitleSubtitle,
    vSendCodeAgain,
  },
  data() {
    return {
      title: "Восстановление пароля",
      subtitle: "На ваш телефон был отправлен код для подтверждения.",
      recoveryPasswordData: {
        code: "",
        phone: this.$store.state.recoveryPasswordData.phone,
      },
      errors: {
        code: "",
      },
    };
  },
  methods: {
    ...mapActions(["POST_СODE_FOR_RECOVERY_PASSWORD"]),
    async submitVerificationCode(event) {
      event.preventDefault();

      this.errors = {
        code: "",
      };

      // Валидация Пароля
      if (!this.recoveryPasswordData.code) {
        this.errors.code = "Поле обязательно для заполнения";
      } else if (this.recoveryPasswordData.code.length < 4) {
        this.errors.code = "Код должен содержать 4 символа";
      }

      // Если есть ошибки валидации, не отправляем данные
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      if (hasErrors) {
        return;
      } else {
        try {
          await this.POST_СODE_FOR_RECOVERY_PASSWORD(this.recoveryPasswordData);

          // переход к следующему этапу
          this.$router.push("/new-password");
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400) {
              this.errors.code = "Неверный код подтверждения";
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
};
</script>
