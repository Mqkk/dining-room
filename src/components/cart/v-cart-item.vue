<template>
  <li class="cart-item">
    <div class="cart-item__img">
      <!-- :src="require('@/assets/images/' + cart_item__data.image)" -->
      <img
        class="img"
        :src="require('@/assets/images/not-img.png')"
        :alt="cart_item_data.name"
      />
    </div>
    <div class="cart-item__content">
      <div class="cart-item__name">{{ cart_item_data.good__name }}</div>
      <div class="cart-item__info">{{ cart_item_data.price }} ₽ / шт.</div>
      <div class="cart-item__bottom">
        <!-- счетчик -->
        <v-counter
          :quantity="cart_item_data.good__quantity"
          @incrementItem="incrementItem(index)"
          @decrementItem="decrementItem(index)"
        />
        <div class="cart-item__price">
          {{ cart_item_data.price * cart_item_data.good__quantity }} ₽
        </div>
      </div>
    </div>
    <button class="btn-reset cart-item__btn-delete" @click="deleteFromCart">
      <img :src="iconClose" />
    </button>
  </li>
</template>

<script>
import iconClose from "@/assets/images/icons/icon-x-mark.svg";
import vCounter from "@/components/v-counter.vue";

export default {
  name: "v-cart-item",
  data() {
    return {
      iconClose,
    };
  },
  components: {
    vCounter,
  },
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    decrementItem() {
      this.$emit("decrementItem");
    },
    incrementItem() {
      this.$emit("incrementItem");
    },
    deleteFromCart() {
      this.$emit("deleteFromCart");
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-item {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid $wild-sand-color;
  border-radius: $accent-br;
  padding: 4px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  background-color: $light-color;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &__img {
    display: flex;
    max-width: 120px;
    max-height: 80px;

    img {
      width: auto;
      height: auto;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  &__name {
    margin-bottom: 2px;
    font-weight: 500;
    font-size: 14px;
    line-height: 145%;
    text-align: left;
    color: $dark-color;
  }

  &__info {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 12px;
    line-height: 145%;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .counter {
    max-width: 120px;
  }

  &__price {
    font-weight: 700;
    font-size: 14px;
    line-height: 145%;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  &__btn-delete {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $br;
    width: 16px;
    height: 16px;
    background: rgba(190, 42, 42, 0.04);

    img {
      width: 10px;
      height: 10px;
    }

    &:hover {
      background: rgba(190, 42, 42, 0.08);
    }
  }
}
</style>
