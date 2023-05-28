<template>
  <div class="restricted">
    <div class="restricted__container">
      <div class="restricted__content">
        <div class="restricted__img">
          <img :src="timer" alt="Ожидание" />
        </div>
        <h3 class="restricted__title">
          Прием заявок ограничен <br />
          с <span>11:00</span> по <span>08:10</span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import timer from "@/assets/images/timer.svg";

export default {
  name: "v-restricted",
  data() {
    return {
      timer,
    };
  },
};
</script>

<style lang="scss" scoped>
.restricted {
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 150px;
    height: 100%;
  }

  &__img {
    margin-bottom: 20px;

    img {
      width: 120px;
    }
  }

  &__title {
    margin: 0;
    max-width: 260px;
    font-weight: 600;
    font-size: 16px;
    line-height: 135%;
    text-align: center;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;

    span {
      font-weight: 700;
    }
  }

  .btn {
    margin-bottom: 20px;
  }
}
</style>
