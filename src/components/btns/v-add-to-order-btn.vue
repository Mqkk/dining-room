<template>
  <button class="btn-reset btn btn--medium" @click.prevent="addToOrder">
    В заказ
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "v-add-to-order-btn",
  methods: {
    ...mapActions(["ADD_TO_ORDER"]),
    addToOrder() {
      this.$emit("addToOrder", this.product);
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
