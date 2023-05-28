<template>
  <div class="confirmation">
    <div class="confirmation__container">
      <v-title-subtitle :title="title" :subtitle="subtitle" />
      <form class="form" @submit.prevent="sendingCode">
        <input
          class="input-reset input"
          type="number"
          v-model="confirmCode"
          placeholder="Введите код подтверждения"
        />
        <button
          class="btn-reset btn form__btn"
          type="submit"
          style="margin-bottom: 0"
        >
          Зарегистрироваться
        </button>
        <span class="form__target"> Отправить код повторно </span>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import vTitleSubtitle from "@/components/v-title-subtitle";

export default {
  name: "v-confirm-registration",
  data() {
    return {
      title: "Подтверждение",
      subtitle: "На ваш телефон был отправлен код для подтверждения.",
      confirmCode: "",
    };
  },
  components: {
    vTitleSubtitle,
  },
  methods: {
    ...mapActions(["POST_DATA_FOR_CONFIRM_REGISTRATION"]),
    async sendingCode(event) {
      event.preventDefault();
      await this.POST_DATA_FOR_CONFIRM_REGISTRATION(this.confirmCode); // действие для отправки формы

      this.$router.push("/authorization");
    },
  },
};
</script>

<style lang="scss" scoped></style>
