<template>
  <div class="order">
    <div class="order__container">
      <v-title-subtitle :title="title" />
      <p v-if="!ORDER.length">Заказ отсутствует</p>
      <v-order-main />
    </div>
  </div>
  <!-- нижняя панель -->
  <div class="bottom" v-if="ORDER.length">
    <div class="total">
      <span class="total__name">Итого:</span>
      <span class="total__value">{{ ORDER_TOTAL_COST }} ₽</span>
    </div>
    <div class="bottom__btns">
      <button class="btn-reset btn btn--medium" >Сохранить</button>
      <button class="btn-reset btn btn--light btn--medium">Отменить</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vTitleSubtitle from "@/components/v-title-subtitle";
import vOrderMain from "@/components/order/order-now/v-order-main";

export default {
  name: "v-order-wrapper",
  data() {
    return {
      title: "Заказ на сегодня",
    };
  },
  components: {
    vTitleSubtitle,
    vOrderMain,
  },
  computed: {
    ...mapGetters(["ORDER", "ORDER_TOTAL_COST"]),
  },
};
</script>

<style lang="scss" scoped></style>
