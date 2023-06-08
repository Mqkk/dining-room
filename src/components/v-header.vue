<template>
  <header class="header">
    <div class="header__container">
      <div v-if="$route.path === '/catalog'">
        <h2 class="header__title">Меню</h2>
      </div>
      <div v-else-if="$route.path === '/cart'">
        <h2 class="header__title">Корзина</h2>
      </div>
      <div v-else-if="$route.path === '/order-nav'">
        <h2 class="header__title">Заказы</h2>
      </div>
      <div v-else-if="$route.path === '/personal-area'">
        <h2 class="header__title">Личный кабинет</h2>
      </div>
      <div v-else-if="$route.path === '/authorization'">
        <h2 class="header__title"></h2>
      </div>
      <div v-else-if="$route.path === '/verification-code'">
        <button class="btn-reset header__btn" @click="backHome">
          <img :src="iconArrow" alt="Назад" />
        </button>
      </div>
      <div v-else>
        <button class="btn-reset header__btn" @click="back">
          <img :src="iconArrow" alt="Назад" />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import iconArrow from "@/assets/images/icons/icon-left-arrow.svg";

export default {
  name: "v-header",
  data() {
    return {
      iconArrow,
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    backHome() {
      window.history.go("/authorization");
    },
  },
  props: ["headerTitle"],
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 10px;

  &__container {
    display: flex;
    padding: 11px $container-offset;
  }

  &__title {
    margin: 0;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $bg-green-color;
    border-radius: $br;
    padding: 2px 7px;
    background: $bg-green-color;

    &:hover {
      border: 1px solid $accent-color;
    }
  }
}
</style>
