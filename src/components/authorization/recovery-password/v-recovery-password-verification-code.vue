<template>
  <div class="recovery-password">
    <div class="recovery-password__container">
      <v-title-subtitle :title="title" :subtitle="subtitle" />
    </div>
    <form class="form recover-password__form content">
      <label class="form__label">
        <input
          type="text"
          class="input-reset input form__input"
          v-model="verificationCode"
          placeholder="Введите код подтверждения"
        />
      </label>
      <button class="btn-reset btn form__btn" @click="submitVerificationCode">
        Подтвердить
      </button>
    </form>
  </div>
</template>

<script>
import vTitleSubtitle from "@/components/v-title-subtitle.vue";

export default {
  name: "v-recovery-password-verification-code",
  components: {
    vTitleSubtitle,
  },
  data() {
    return {
      title: "Восстановление пароля",
      subtitle: "На ваш телефон был отправлен код для подтверждения.",
      verificationCode: "",
    };
  },
  methods: {
    submitVerificationCode() {
      // проверка введенного кода

      // переход к следующему этапу
      this.$router.push("/new-password");
    },
  },
};
</script>

<style lang="scss" scoped></style>
