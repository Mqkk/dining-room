<template>
  <div class="product">
    <div class="product__container">
      <div class="product__img">
        <img
          class="img"
          :alt="product.good__name"
          :src="`http://v-brn-StolTest:8000${product.good__image}`"
        />
      </div>
      <div class="product__content content">
        <div class="product__info">
          <div class="product__info-left">
            <h2 class="product__name">{{ product.good__name }}</h2>
            <div class="product__output">Выход: {{ product.output }} гр</div>
          </div>
          <div class="product__info-right">
            <div class="product__price">{{ product.price }} ₽</div>
          </div>
        </div>
        <div class="product__description">{{ product.good__description }}</div>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="total">
      <span class="total__name">Итого:</span>
      <span class="total__value">
        {{ product.price * product.good__quantity }} ₽</span
      >
    </div>
    <div class="bottom__btns">
      <!-- счетчик -->
      <v-counter
        :quantity="product.good__quantity"
        :product="product"
        @incrementItem="incrementItem(index)"
        @decrementItem="decrementItem(index)"
      />
      <!-- кнопка добавления товара -->
      <v-add-to-order-btn
        :product="product"
        @addToOrder="addToOrder"
        v-if="this.ORDER.length"
      />
      <v-add-to-cart-btn :product="product" @addToCart="addToCart" v-else />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import vAddToCartBtn from "@/components/btns/v-add-to-cart-btn";
import vAddToOrderBtn from "@/components/btns/v-add-to-order-btn";
import vCounter from "@/components/v-counter.vue";

export default {
  name: "v-product",
  components: {
    vAddToCartBtn,
    vAddToOrderBtn,
    vCounter,
  },
  computed: {
    ...mapGetters(["GET_PRODUCT_BY_ID", "ORDER"]),
    product() {
      return this.GET_PRODUCT_BY_ID(this.$route.params.good_id);
    },
  },
  methods: {
    ...mapActions(["ADD_TO_CART", "ADD_TO_ORDER"]),
    ...mapMutations(["UPDATE_PRODUCT_QUANTITY"]),
    addToCart(el) {
      this.ADD_TO_CART(el);
    },
    addToOrder(el) {
      this.ADD_TO_ORDER(el);
    },
    decrementItem() {
      if (this.product.good__quantity > 1) {
        const newQuantity = this.product.good__quantity - 1;
        this.UPDATE_PRODUCT_QUANTITY({
          good_id: this.product.good_id,
          quantity: newQuantity,
        });
      }
    },
    incrementItem() {
      if (this.product.good__quantity > 0) {
        const newQuantity = this.product.good__quantity + 1;
        this.UPDATE_PRODUCT_QUANTITY({
          good_id: this.product.good_id,
          quantity: newQuantity,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  margin-bottom: 155px;
  color: $dark-color;

  &__img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    background-color: $wild-sand-color;
  }

  &__info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__name {
    margin: 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 135%;
    text-align: left;
  }

  &__output {
    font-weight: 400;
    font-size: 12px;
    line-height: 145%;
    text-align: left;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-gray-color;
  }

  &__price {
    font-weight: 700;
    font-size: 16px;
    line-height: 145%;
    font-feature-settings: "pnum" on, "lnum" on;
    white-space: nowrap;
    color: $accent-color;
  }

  &__description {
    font-weight: 400;
    font-size: 13px;
    line-height: 145%;
    text-align: left;
  }
}
</style>
