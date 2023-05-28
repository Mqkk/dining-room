<template>
  <div class="order-main content">
    <ul class="list-reset order-main__list">
      <v-order-item
        v-for="(order, index) in ORDER"
        :key="order.good_id"
        :order_data="order"
        @deleteFromOrder="deleteFromOrder(index)"
        @incrementItem="incrementItem(index)"
        @decrementItem="decrementItem(index)"
      />
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vOrderItem from "@/components/order/order-now/v-order-item";
export default {
  name: "v-order-main",
  components: {
    vOrderItem,
  },
  computed: {
    ...mapGetters(["ORDER"]),
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_ORDER",
      "INCREMENT_ORDER_ITEM",
      "DECREMENT_ORDER_ITEM",
      "GET_ORDER_FROM_API",
    ]),
    decrementItem(index) {
      this.DECREMENT_ORDER_ITEM(index);
    },
    incrementItem(index) {
      this.INCREMENT_ORDER_ITEM(index);
    },
    deleteFromOrder(index) {
      this.DELETE_FROM_ORDER(index);
    },
  },
  mounted() {
    this.GET_ORDER_FROM_API();
  },
};
</script>

<style lang="scss" scoped>
.order-main {
  &__list {
    margin-bottom: 155px;
  }
}
</style>
