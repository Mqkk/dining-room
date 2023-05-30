<template>
  <button class="btn-reset btn btn--medium" @click.prevent="addToCart">
    Купить
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "v-add-to-cart-btn",
  methods: {
    ...mapActions(["ADD_TO_CART"]),
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
  },
};
</script>

<style lang="scss" scoped></style>
