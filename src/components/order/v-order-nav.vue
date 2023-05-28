<template>
  <div class="order-nav">
    <ul class="list-reset order-nav__list">
      <li
        class="order-nav__item"
        v-for="item in items"
        :key="item.id"
        @click="handeItemClick(item)"
      >
        <span class="order-nav__name">{{ item.label }}</span>
        <div class="order-nav__icon">
          <img :src="item.icon" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import router from "@/router/router";
import arrowRight from "@/assets/images/icons/icon-arrow-right.svg";

export default {
  name: "v-order-nav",
  data() {
    return {
      items: [
        {
          id: 1,
          label: "Заказ на сегодня",
          icon: arrowRight,
          route: "/order-now",
        },
        {
          id: 2,
          label: "История заказов",
          icon: arrowRight,
          route: "/order-history",
        },
      ],
    };
  },
  methods: {
    handeItemClick(item) {
      router.push(item.route);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-nav {
  &__list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $wild-sand-color;
    padding: 0 $container-offset;
    height: 52px;
    cursor: pointer;

    &:hover {
      background-color: $alabaster-color;
    }
  }

  &__name {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-gray-color;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $accent-br;
    width: 15px;
    height: 15px;
  }
}
</style>
