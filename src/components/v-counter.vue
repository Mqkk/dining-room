<template>
  <div class="counter">
    <button class="btn-reset counter__btn" @click.prevent="decrementItem">
      <img :src="iconMinus" />
    </button>
    <input
      class="input-reset counter__value"
      type="number"
      step="0.5"
      min="0.5"
      max="100"
      v-model.number="inputQuantity"
      @change="updateQuantity"
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

export default {
  name: "v-counter",
  data() {
    return {
      iconMinus,
      iconPlus,
      inputQuantity: null,
      internalQuantity: this.quantity,
    };
  },
  methods: {
    decrementItem() {
      this.$emit("decrementItem");
      if (this.internalQuantity > 1) {
        this.internalQuantity -= 0.5;
      }
      this.inputQuantity = this.internalQuantity;
    },
    incrementItem() {
      this.$emit("incrementItem");
      this.internalQuantity += 0.5;
      this.inputQuantity = this.internalQuantity;
    },

    updateQuantity() {
      if (this.inputQuantity >= 0.5) {
        const roundedQuantity = Math.round(this.inputQuantity * 2) / 2;
        const diff = roundedQuantity - this.internalQuantity;
        if (diff > 0) {
          this.emulateButtonClick(this.incrementItem, diff / 0.5);
        } else if (diff < 0) {
          this.emulateButtonClick(this.decrementItem, -diff / 0.5);
        }
        this.internalQuantity = roundedQuantity;
        this.inputQuantity = this.internalQuantity;
      } else {
        this.inputQuantity = this.internalQuantity;
      }
    },

    emulateButtonClick(callback, times) {
      for (let i = 0; i < times; i++) {
        callback.call(this);
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
  },
  watch: {
    quantity(newQuantity) {
      this.internalQuantity = parseFloat(newQuantity);
      this.inputQuantity = this.internalQuantity;
    },
  },
  created() {
    this.internalQuantity = parseFloat(this.quantity);
    this.inputQuantity = this.internalQuantity;
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
