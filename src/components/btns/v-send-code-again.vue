<template>
  <div v-show="!showButton && remainingTime > 0" class="timer">
    Повторная отправка доступна через
    <span class="timer__span"> {{ remainingTime }}</span> с.
  </div>
  <button
    v-show="showButton || remainingTime === 0"
    class="btn-reset link form__target"
    @click="sendCodeAgain"
    type="button"
  >
    Отправить код повторно
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "v-send-code-again",
  data() {
    return {
      remainingTime: 0,
      showButton: true,
      timerInterval: null,
      lastCodeResendTime: null,
      sendPhone: {
        phone: this.phone,
      },
    };
  },
  props: {
    phone: {
      type: [Number, String],
      default() {
        return;
      },
    },
  },
  methods: {
    ...mapActions(["SEND_CODE_FOR_RECONFIRMATION"]),
    async sendCodeAgain(event) {
      event.preventDefault();

      if (!this.lastCodeResendTime || this.canResendCode()) {
        this.showButton = false;
        this.lastCodeResendTime = Date.now();
        this.startTimer();

        try {
          await this.SEND_CODE_FOR_RECONFIRMATION(this.sendPhone);
        } catch (error) {
          // Обработка ошибки повторной отправки кода
        }
      }
    },

    canResendCode() {
      const currentTime = Date.now();
      const timeDifference = currentTime - this.lastCodeResendTime;
      const secondsPassed = Math.floor(timeDifference / 1000);
      return secondsPassed < 120;
    },

    startTimer() {
      this.remainingTime = 120;
      this.timerInterval = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
          this.showButton = true;
          this.lastCodeResendTime = null;
        }
      }, 1000);
    },

    saveToLocalStorage() {
      localStorage.setItem("lastCodeResendTime", this.lastCodeResendTime);
      localStorage.setItem("showButton", this.showButton);
    },

    loadFromLocalStorage() {
      const lastCodeResendTime = localStorage.getItem("lastCodeResendTime");
      const showButton = localStorage.getItem("showButton");
      if (lastCodeResendTime && showButton !== null) {
        this.lastCodeResendTime = parseInt(lastCodeResendTime);
        this.showButton = showButton === "true";
        if (this.canResendCode()) {
          this.startTimer();
        }
      }
    },
  },
  created() {
    this.loadFromLocalStorage();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
    this.saveToLocalStorage();
  },
};
</script>

<style lang="scss" scoped></style>