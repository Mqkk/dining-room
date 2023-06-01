<template>
  <v-title-subtitle :title="title" />
  <div class="order-main content">
    <ul class="list-reset order-main__list">
      <v-order-history-item
        v-for="order in ORDER_HISTORY_ITEM"
        :key="order.product_id"
        :order_data="order"
      />
    </ul>
  </div>
  <!-- нижняя панель -->
  <div class="bottom">
    <div class="total">
      <span class="total__name">Итого:</span>
      <span class="total__value">{{ ORDER_HISTORY_ITEM_TOTAL_COST }} ₽</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vOrderHistoryItem from "@/components/order/order-history/v-order-history-item";
import vTitleSubtitle from "@/components/v-title-subtitle.vue";

export default {
  name: "v-order-history-main",
  components: {
    vOrderHistoryItem,
    vTitleSubtitle,
  },
  data() {
    return {
      title: "data",
    };
  },
  computed: {
    ...mapGetters(["ORDER_HISTORY_ITEM", "ORDER_HISTORY_ITEM_TOTAL_COST"]),
  },
  methods: {
    ...mapActions(["GET_ORDER_HISTORY_ITEM_FROM_API"]),
  },
  mounted() {
    const id = this.$route.params.id;
    this.GET_ORDER_HISTORY_ITEM_FROM_API(id);
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
