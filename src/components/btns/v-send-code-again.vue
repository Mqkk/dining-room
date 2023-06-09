<template>
  <div v-show="!showButton" class="timer">
    Повторная отправка доступна через
    <span class="timer__span">2 минуты</span>
  </div>
  <button
    v-show="showButton"
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
          if (error.response) {
            if (error.response.status === 400) {
              this.$notify({
                title: "Вы пока не можете запросить код повторно",
                type: "error",
              });
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

<style lang="scss" scoped>
.timer {
  display: flex;
  font-weight: 500;
  font-size: 13px;
  line-height: 135%;
  text-align: left;
  font-feature-settings: "pnum" on, "lnum" on;
  color: $silver-color;

  &__span {
    display: block;
    margin-left: 3px;
    width: 50px;
    white-space: nowrap;
  }
}
</style>
