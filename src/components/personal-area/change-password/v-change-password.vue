<template>
  <div class="change-password">
    <div class="change-password__container">
      <v-title-subtitle :title="title" />
    </div>
    <div class="change-password__content content">
      <form class="form change-password__form">
        <label class="form__label">
          <input
            type="text"
            class="input-reset input form__input"
            v-model="formData.password"
            placeholder="Введите старый пароль"
          />
        </label>
        <label class="form__label">
          <input
            type="text"
            class="input-reset input form__input"
            v-model="formData.password_new"
            placeholder="Введите новый пароль"
          />
        </label>
        <label class="form__label">
          <input
            type="text"
            class="input-reset input form__input"
            v-model="formData.confirmNewPassword"
            placeholder="Подтвердите новый пароль"
          />
        </label>
        <button class="btn-reset btn form__btn" @click="submitChangePassword">
          Сменить пароль
        </button>
      </form>
    </div>
  </div>
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
      },
    };
  },
  methods: {
    ...mapActions(["POST_DATA_FOR_CHANGE_PASSWORD"]),
    async submitChangePassword(event) {
      // проверка нового пароля и подтверждения пароля

      event.preventDefault();
      await this.POST_DATA_FOR_CHANGE_PASSWORD(this.formData); // вызываем действие для отправки формы

      // Переход на страницу успешного восстановления пароля
      this.$router.push("/settings");
    },
  },
  computed: {
    ...mapGetters(["GET_TOKEN"]),
  },
};
</script>

<style lang="scss" scoped></style>
