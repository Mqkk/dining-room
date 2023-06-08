<template>
  <button class="btn-reset btn btn--medium" @click.prevent="addToCart">
    {{ product.isInCart ? "В корзине" : "Купить" }}
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "v-add-to-cart-btn",
  computed: {
    ...mapGetters(["CART"]),
    // isInCart() {
    //   return this.CART.some((p) => p.id === this.product.id);
    // },
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product);
    },
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    isInCart: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
