<template>
  <div class="confirmation">
    <div class="confirmation__container">
      <v-title-subtitle :title="title" :subtitle="subtitle" />
      <form class="form content" @submit.prevent="sendingCode">
        <div class="form__item form__item--left">
          <input
            class="input-reset input"
            type="text"
            id="confirm_code"
            v-model="confirmCode.code"
            v-mask="'####'"
            placeholder="Введите код подтверждения"
          />
          <span class="error-message" v-if="errors.code">
            {{ errors.code }}
          </span>
        </div>
        <button
          class="btn-reset btn form__btn"
          type="submit"
          style="margin-bottom: 0"
        >
          Зарегистрироваться
        </button>
        <v-send-code-again :phone="confirmCode.phone" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import vTitleSubtitle from "@/components/v-title-subtitle";
import vSendCodeAgain from "../btns/v-send-code-again.vue";

export default {
  name: "v-confirm-registration",
  data() {
    return {
      title: "Подтверждение",
      subtitle: "На ваш телефон был отправлен код для подтверждения.",
      confirmCode: {
        code: "",
        phone: this.$store.state.registrationData.phone,
      },
      errors: {
        code: "",
      },
    };
  },
  components: {
    vTitleSubtitle,
    vSendCodeAgain,
  },
  methods: {
    ...mapActions([
      "POST_DATA_FOR_CONFIRM_REGISTRATION",
      "SEND_CODE_FOR_RECONFIRMATION",
    ]),
    async sendingCode(event) {
      event.preventDefault();

      this.errors = {
        code: "",
      };

      // Валидация Пароля
      if (!this.confirmCode.code) {
        this.errors.code = "Поле обязательно для заполнения";
      } else if (this.confirmCode.code.length < 4) {
        this.errors.code = "Код должен сожержать 4 символа";
      }

      // Если есть ошибки валидации, не отправляем данные
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== ""
      );
      if (hasErrors) {
        return;
      } else {
        try {
          await this.POST_DATA_FOR_CONFIRM_REGISTRATION(this.confirmCode); // действие для отправки формы

          this.$router.push("/registration/completion");
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

<style lang="scss" scoped></style>
