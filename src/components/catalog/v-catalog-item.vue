<template>
  <router-link class="catalog-item" :to="`/product/${product_data.good_id}`">
    <div class="catalog-item__top">
      <!-- подстановка данных в компонент -->
      <div class="catalog-item__img">
        <img
          class="img"
          :alt="product_data.good__name"
          :src="`http://v-brn-StolTest:8000${product_data.good__image}`"
        />
      </div>
      <div class="catalog-item__name">{{ product_data.good__name }}</div>
      <div class="catalog-item__output">{{ product_data.output }} гр</div>
      <div class="catalog-item__price">{{ product_data.price }} ₽</div>
    </div>
    <div class="catalog-item__bottom">
      <!-- счетчик -->
      <v-counter
        :quantity="product_data.good__quantity"
        :product="product_data"
        :index="index"
        @incrementItem="incrementItem(index)"
        @decrementItem="decrementItem(index)"
        @inputProductQuantity="inputProductQuantity(index)"
      />
      <!-- кнопка добавления товара -->
      <v-add-to-order-btn
        :product="product_data"
        @addToOrder="addToOrder"
        v-if="this.ORDER.length"
      />
      <v-add-to-cart-btn
        :isInCart="isProductInCart(product_data)"
        :product="product_data"
        @addToCart="addToCart"
        v-else
      />
    </div>
  </router-link>
</template>

<script>
import iconMinus from "@/assets/images/icons/icon-minus.svg";
import iconPlus from "@/assets/images/icons/icon-plus.svg";
import vAddToCartBtn from "@/components/btns/v-add-to-cart-btn.vue";
import vAddToOrderBtn from "@/components/btns/v-add-to-order-btn.vue";
import vCounter from "../v-counter.vue";
import { mapGetters } from "vuex";

export default {
  name: "v-catalog-item",
  data() {
    return {
      iconMinus,
      iconPlus,
    };
  },
  components: {
    vAddToCartBtn,
    vAddToOrderBtn,
    vCounter,
  },
  computed: {
    ...mapGetters(["ORDER", "CART"]),
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  methods: {
    // метод для добавления товара в корзину (поднимаем родителю)
    addToCart() {
      this.$emit("addToCart", this.product_data);
    },
    addToOrder() {
      this.$emit("addToOrder", this.product_data);
    },
    decrementItem() {
      this.$emit("decrementItem");
    },
    incrementItem() {
      this.$emit("incrementItem");
    },
    inputProductQuantity() {
      this.$emit("inputProductQuantity");
    },
    isProductInCart(productId) {
      return this.CART.some((item) => item.id === productId);
    },
  },
};
</script>

<style lang="scss" scoped>
.catalog-item {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  border: 1px solid $wild-sand-color;
  border-radius: $accent-br;
  padding: 5px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  text-align: left;
  background-color: $light-color;

  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    border-radius: $accent-br;
    overflow: hidden;
    width: auto;
    height: 185px;

    img {
      border-radius: $accent-br;
      width: 100%;
      height: fit-content;
    }

    @media (max-width: 424px) {
      height: 150px;
    }

    @media (max-width: 375px) {
      height: 130px;
    }
  }

  &__name {
    margin-bottom: 2px;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: $dark-color;
  }

  &__output {
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 12px;
    line-height: 145%;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-gray-color;
  }

  &__price {
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 145%;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  .btn {
    margin-top: 8px;
    padding: 9px;
    width: 100%;
    font-size: 12px;
    line-height: 100%;
  }
}
</style>
