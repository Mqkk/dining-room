<template>
  <div class="catalog-main content">
    <div v-if="PRODUCTS.length > 1">
      <div v-for="(good__category__name, index) in categories" :key="index">
        <h2 class="catalog-main__title">{{ good__category__name }}</h2>
        <ul class="list-reset catalog-main__list">
          <v-catalog-item
            v-for="(product, productIndex) in filteredProducts(
              good__category__name
            )"
            :key="productIndex"
            :product_data="product"
            @addToCart="addToCart"
            @addToOrder="addToOrder"
            @incrementItem="incrementItem(product)"
            @decrementItem="decrementItem(product)"
          />
        </ul>
      </div>
    </div>
    <div v-if="PRODUCTS.length === 1">
      <v-restricted />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vCatalogItem from "@/components/catalog/v-catalog-item";
import vRestricted from "../v-restricted.vue";

export default {
  name: "v-catalog-main",
  components: {
    vCatalogItem,
    vRestricted,
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
      "ADD_TO_CART",
      "ADD_TO_ORDER",
      "DECREMENT_PRODUCT_ITEM",
      "INCREMENT_PRODUCT_ITEM",
    ]),
    addToCart(el) {
      this.ADD_TO_CART(el);
    },
    addToOrder(el) {
      this.ADD_TO_ORDER(el);
    },
    decrementItem(product) {
      this.DECREMENT_PRODUCT_ITEM(product);
    },
    incrementItem(product) {
      this.INCREMENT_PRODUCT_ITEM(product);
    },
    filteredProducts(good__category__name) {
      return this.PRODUCTS.filter(
        (product) => product.good__category__name === good__category__name
      );
    },
  },
  computed: {
    ...mapGetters(["PRODUCTS", "CART"]),
    categories() {
      const uniqueCategories = [
        ...new Set(
          this.PRODUCTS.map((product) => product.good__category__name)
        ),
      ];
      return uniqueCategories;
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
  },
};
</script>

<style lang="scss" scoped>
.catalog-main {
  margin-bottom: 55px;

  &__title {
    margin: 0;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    text-align: left;
    color: $dark-color;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 30px;
  }
}
</style>
