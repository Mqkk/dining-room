<template>
  <div class="cart">
    <div class="cart__container">
      <p v-if="!CART.length">Корзина пуста</p>
      <v-cart-main v-if="CART.length" :cart_data="CART" />
    </div>
  </div>
  <!-- нижняя панель -->
  <div class="bottom" v-if="CART.length">
    <div class="total">
      <span class="total__name">Итого:</span>
      <span class="total__value">{{ CART_TOTAL_COST }} ₽</span>
    </div>
    <div class="bottom__btns">
      <button class="btn-reset btn btn--medium" @click="sendCartToServer">
        Заказать
      </button>
      <button class="btn-reset btn btn--light btn--medium" @click="CLEAR_CART">
        Очистить
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vCartMain from "@/components/cart/v-cart-main";

export default {
  name: "v-cart-wrapper",
  components: {
    vCartMain,
  },
  computed: {
    ...mapGetters([
      "CART",
      "ORDER",
      "CART_TOTAL_COST",
      "CART_TO_SERVER",
      "MENU_ID",
    ]),
  },
  methods: {
    ...mapActions(["CLEAR_CART", "SEND_CART_TO_SERVER"]),
    async sendCartToServer(event) {
      event.preventDefault();

      const cartData = {
        cart: this.CART_TO_SERVER,
        menu_id: this.MENU_ID,
      };

      this.SEND_CART_TO_SERVER(cartData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
