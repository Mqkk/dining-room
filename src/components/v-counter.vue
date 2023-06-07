<template>
  <div class="counter">
    <button class="btn-reset counter__btn" @click.prevent="decrementItem">
      <img :src="iconMinus" />
    </button>
    <input
      class="input-reset counter__value"
      name="input_value"
      v-model="localQuantity"
      @input="validateQuantity"
      @keypress="handleKeyPress"
      @click.prevent
    />
    <button class="btn-reset counter__btn" @click.prevent="incrementItem">
      <img :src="iconPlus" />
    </button>
  </div>
</template>

<script>
import iconMinus from "@/assets/images/icons/icon-minus.svg";
import iconPlus from "@/assets/images/icons/icon-plus.svg";
import { mapActions } from "vuex";

export default {
  name: "v-counter",
  data() {
    return {
      iconMinus,
      iconPlus,
      localQuantity: this.quantity,
    };
  },
  watch: {
    quantity(newQuantity) {
      this.localQuantity = newQuantity;
    },
  },
  methods: {
    ...mapActions([
      "INPUT_QUANTITY_PRODUCT_ITEM",
      "INPUT_QUANTITY_CART_ITEM",
      "INPUT_QUANTITY_CART_ITEM",
    ]),
    decrementItem() {
      this.$emit("decrementItem");
      // для работы инпута
      if (this.localQuantity > 1) {
        this.localQuantity--;
      }
    },
    incrementItem() {
      this.$emit("incrementItem");
      // // Для работы инпута
      this.localQuantity++;
    },

    inputProductQuantity() {
      this.INPUT_QUANTITY_PRODUCT_ITEM({
        product: this.product,
        quantity: this.localQuantity,
        index: this.index,
      });
    },
    validateQuantity() {
      const regex = /^(?!0$)(?!0\.$)(?!100(?:\.0)?$)(\d{1,2}(?:\.([05])?)?)?$/;
      const match = this.localQuantity.match(regex);

      if (match) {
        // Если введенное значение соответствует шаблону
        if (!match[2]) {
          // Если после точки не указано 0 или 5, заменяем на 1
          this.localQuantity = match[1] ? match[1] + "" : "0.5";
        }
      } else {
        // Если введенное значение не соответствует шаблону
        this.localQuantity = this.quantity; // Восстанавливаем предыдущее значение
      }

      this.inputProductQuantity();
    },

    handleKeyPress(event) {
      const char = String.fromCharCode(event.which);
      const regex = /^[0-9.]$/;
      if (!regex.test(char)) {
        // Если введенный символ не является цифрой
        event.preventDefault();
      }
    },
  },
  props: {
    quantity: {
      type: [Number, String],
      default() {
        return;
      },
    },
    product: {
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
};
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 45px;
  padding: 3px;
  width: 100%;
  background-color: $alabaster-color;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $bg-green-color;
    border-radius: $br;
    width: 30px;
    height: 30px;
    background-color: $bg-green-color;

    &:hover {
      border: 1px solid $accent-color;
    }
  }

  &__value {
    text-align: center;
    width: 46px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: $dark-gray-color;
    font-feature-settings: "pnum" on, "lnum" on;
    background-color: $alabaster-color;

    &:focus {
      outline: none;
      font-weight: 600;
      background-color: $alabaster-color;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
