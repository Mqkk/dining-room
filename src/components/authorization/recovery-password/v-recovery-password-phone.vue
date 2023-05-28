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
          v-model="phoneNumber"
          placeholder="Введите номер телефона"
        />
      </label>
      <button class="btn-reset btn form__btn" @click="submitPhoneNumber">
        Получить код
      </button>
    </form>
  </div>
</template>

<script>
import vTitleSubtitle from "@/components/v-title-subtitle.vue";

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
    };
  },
  methods: {
    submitPhoneNumber() {
      // проверка введенного номер

      // переход к следущему этапу
      this.$router.push("/verification-code");
    },
  },
};
</script>

<style lang="scss" scoped></style>
