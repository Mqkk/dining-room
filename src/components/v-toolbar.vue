<template>
  <div class="toolbar">
    <ul class="list-reset toolbar__list">
      <li
        class="toolbar__item"
        v-for="item in items"
        :key="item.id"
        @click="handeItemClick(item)"
      >
        <div class="toolbar__img">
          <img :src="item.image" alt="" />
          <div v-if="item.id === 2 && CART.length > 0">
            <span class="toolbar__value">{{ CART.length }}</span>
          </div>
          <div v-if="item.id === 3 && ORDER.length > 0">
            <span class="toolbar__value">{{ ORDER.length }}</span>
          </div>
        </div>
        <span class="toolbar__name">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router/router";
import iconMenu from "@/assets/images/icons/toolbar/icon-menu.svg";
import iconCart from "@/assets/images/icons/toolbar/icon-cart.svg";
import iconOrders from "@/assets/images/icons/toolbar/icon-order.svg";
import iconPa from "@/assets/images/icons/toolbar/icon-pa.svg";

export default {
  name: "v-toolbar",
  data() {
    return {
      items: [
        { id: 1, label: "Меню", image: iconMenu, route: "/catalog" },
        {
          id: 2,
          label: "Корзина",
          image: iconCart,
          route: "/cart",
        },
        { id: 3, label: "Заказы", image: iconOrders, route: "/order-nav" },
        { id: 4, label: "ЛК", image: iconPa, route: "/personal-area" },
      ],
    };
  },
  computed: {
    ...mapGetters(["CART", "ORDER"]),
  },
  methods: {
    handeItemClick(item) {
      router.push(item.route);
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 3px 3px 0px 0px;
  padding: 3px 5px;
  width: 100%;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.04);
  background-color: $light-color;

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 2px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: $bg-green-color;

      .toolbar__name {
        color: $silver-chalice-color;
      }
    }
  }

  &__img {
    position: relative;
    img {
      width: 26px;
      height: 26px;
    }
  }

  &__name {
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: $silver-color;
    transition: color 0.1s ease-in-out;
  }

  &__value {
    position: absolute;
    top: 0;
    right: -8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $br;
    padding: 2px 5px;
    width: auto;
    height: 17px;
    min-width: 17px;
    font-weight: 600;
    font-size: 11px;
    color: $light-color;
    font-feature-settings: "pnum" on, "lnum" on;
    background-color: #ff2d2d;
  }
}
</style>
