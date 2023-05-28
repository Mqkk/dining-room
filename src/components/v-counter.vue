<template>
  <div class="counter">
    <button class="btn-reset counter__btn" @click.prevent="decrementItem">
      <img :src="iconMinus" />
    </button>
    <span class="counter__value">{{ quantity }}</span>
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
    };
  },
  methods: {
    decrementItem() {
      this.$emit("decrementItem");
    },
    incrementItem() {
      this.$emit("incrementItem");
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
  }
}
</style>
