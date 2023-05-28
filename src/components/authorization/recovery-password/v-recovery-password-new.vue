<template>
  <div class="recovery-password">
    <div class="recovery-password__container">
      <v-title-subtitle :title="title" />
    </div>
    <form class="form recover-password__form content">
      <label class="form__label">
        <input
          type="text"
          class="input-reset input form__input"
          v-model="newPassword"
          placeholder="Введите новый пароль"
        />
      </label>
      <label class="form__label">
        <input
          type="text"
          class="input-reset input form__input"
          v-model="confirmPassword"
          placeholder="Подтвердите новый пароль"
        />
      </label>
      <button class="btn-reset btn form__btn" @click="submitNewPassword">
        Подтвердить
      </button>
    </form>
  </div>
</template>

<script>
import vTitleSubtitle from "@/components/v-title-subtitle.vue";

export default {
  name: "v-recovery-password-new",
  components: {
    vTitleSubtitle,
  },
  data() {
    return {
      title: "Восстановление пароля",
      newPassword: "",
      confirmPassword: "",
    };
  },
  methods: {
    submitNewPassword() {
      // проверка нового пароля и подтверждения пароля

      // Отправка нового пароля на сервер

      // Переход на страницу успешного восстановления пароля
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
