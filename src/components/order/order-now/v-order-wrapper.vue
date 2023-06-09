<template>
  <div class="order">
    <div class="order__container">
      <v-title-subtitle :title="title" />
      <p v-if="!ORDER.length" class="message content">Заказ отсутствует</p>
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
      <button class="btn-reset btn btn--medium" @click="updateOrderFromApi">
        Сохранить
      </button>
      <button
        class="btn-reset btn btn--light btn--medium"
        @click="deleteOrderFromApi"
      >
        Отменить
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    ...mapGetters(["ORDER", "ORDER_TOTAL_COST", "ORDER_TO_SERVER", "MENU_ID"]),
  },
  methods: {
    ...mapActions([
      "DELETE_ORDER_FROM_API",
      "CLEAR_ORDER",
      "SEND_CART_TO_SERVER",
    ]),

    async deleteOrderFromApi(event) {
      event.preventDefault();

      try {
        this.CLEAR_ORDER();
        this.DELETE_ORDER_FROM_API();
      } catch {
        this.$notify({
          title: "Произошла ошибка сервера",
          text: "Попробуйте удалить заказ немного позже",
          type: "error",
        });
      }
    },

    async updateOrderFromApi(event) {
      event.preventDefault();

      try {
        const orderData = {
          cart: this.ORDER_TO_SERVER,
          menu_id: this.MENU_ID,
          total: this.ORDER_TOTAL_COST,
        };
        this.SEND_CART_TO_SERVER(orderData);

        this.$notify({
          title: "Заказ успешно обновлен",
          type: "success",
        });
      } catch (error) {
        this.$notify({
          title: error,
          text: "Попробуйте обновить заказ немного позже",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
