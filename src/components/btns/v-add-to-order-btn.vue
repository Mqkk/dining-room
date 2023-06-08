<template>
  <button class="btn-reset btn btn--medium" @click.prevent="addToOrder">
    {{ product.isInOrder ? "Заказано" : "Купить" }}
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "v-add-to-order-btn",
  computed: {
    ...mapGetters(["ORDER"]),
    isInOrder() {
      return this.ORDER.some((p) => p.id === this.product.id);
    },
  },
  methods: {
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
