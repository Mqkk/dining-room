<template>
  <div class="cart-main content">
    <ul class="list-reset cart-main__list">
      <v-cart-item
        v-for="(item, index) in cart_data"
        :key="item.good_id"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"
        @incrementItem="incrementItem(index)"
        @decrementItem="decrementItem(index)"
      />
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import vCartItem from "@/components/cart/v-cart-item";

export default {
  name: "v-cart-main",
  components: {
    vCartItem,
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM",
    ]),
    decrementItem(index) {
      this.DECREMENT_CART_ITEM(index);
    },
    incrementItem(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-main {
  &__list {
    margin-bottom: 155px;
  }
}
</style>
