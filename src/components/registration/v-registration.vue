<template>
  <div class="registration">
    <div class="registration__container">
      <v-title-subtitle :title="title" :subtitle="subtitle" />
      <form class="form content" @submit.prevent="sendingData">
        <input
          class="input-reset input"
          type="text"
          id="last_name"
          v-model="formData.last_name"
          placeholder="Введите Фамилию"
        />
        <input
          class="input-reset input"
          type="text"
          id="name"
          v-model="formData.name"
          placeholder="Введите Имя"
        />
        <input
          class="input-reset input"
          type="text"
          id="surname"
          v-model="formData.surname"
          placeholder="Введите Отчество"
        />
        <input
          class="input-reset input"
          type="tel"
          id="phone"
          v-model="formData.phone"
          placeholder="Введите Телефон"
        />
        <input
          class="input-reset input"
          type="password"
          id="password"
          v-model="formData.password"
          placeholder="Введите Пароль"
        />
        <input
          class="input-reset input"
          type="password"
          id="password2"
          v-model="formData.password2"
          placeholder="Повторите Пароль"
        />
        <button class="btn-reset btn form__btn" type="submit">
          Продолжить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vTitleSubtitle from "@/components/v-title-subtitle";

export default {
  name: "v-registration",
  data() {
    return {
      title: "Регистрация",
      subtitle: "Все поля должны быть заполнены.",
      formData: {
        phone: "",
        name: "",
        surname: "",
        last_name: "",
        password: "",
        password2: "",
      },
    };
  },
  components: {
    vTitleSubtitle,
  },
  computed: {
    ...mapGetters(["GET_TOKEN"]),
  },
  methods: {
    ...mapActions(["POST_DATA_FOR_REGISTRATION", "SAVE_TOKEN"]),
    async sendingData(event) {
      event.preventDefault();
      await this.POST_DATA_FOR_REGISTRATION(this.formData); // вызываем действие для отправки формы

      this.$router.push("/confirmation");
    },
  },
};
</script>

<style lang="scss" scoped></style>
