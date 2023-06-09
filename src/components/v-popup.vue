<template>
  <div :class="['popup', { open: isOpen }]">
    <div class="popup__container">
      <div class="popup__content content">
        <h2 class="popup__title">Вы действительно хотите выйти?</h2>
        <button class="btn-reset btn popup__btn" @click="logout">Выйти</button>
        <button class="btn-reset btn btn--gray popup__btn" @click="closePopup">
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  left: 0;
  bottom: -100%;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: bottom 0.2s ease-in-out;

  &.open {
    bottom: 0;
  }

  &__container {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 20px 20px 0 0;
    width: 100%;
    height: 95%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.04);
    background-color: $light-color;
  }

  &__content {
    margin-top: 50px;
  }

  &__title {
    margin: 0;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
  }

  &__btn {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
