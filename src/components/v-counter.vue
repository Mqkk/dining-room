<template>
  <div class="counter">
    <button class="btn-reset counter__btn" @click.prevent="decrementItem">
      <img :src="iconMinus" />
    </button>
    <!-- <span class="counter__value">{{ internalQuantity }}</span> -->
    <input
      class="input-reset counter__value"
      type="number"
      min="0.5"
      v-model="inputQuantity"
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
      inputQuantity: "",
      internalQuantity: this.quantity,
    };
  },
  methods: {
    decrementItem() {
      this.$emit("decrementItem");
      // для работы инпута
      this.internalQuantity--;
      this.inputQuantity = this.internalQuantity.toString();
    },
    incrementItem() {
      this.$emit("incrementItem");
      // Для работы инпута
      this.internalQuantity++;
      this.inputQuantity = this.internalQuantity.toString();
    },

    updateQuantity() {
      // преобруем inputQuantity в числовой тип с помощью parseInt
      const newQuantity = parseInt(this.inputQuantity, 10);
      // проверяем является ли переменная числом и что она больше 1
      if (!isNaN(newQuantity) && newQuantity >= 1) {
        // вычисляем разницу diff
        const diff = newQuantity - this.internalQuantity;
        if (diff > 0) {
          // вызываем метод emulateButtonClick с передачей incrementItem и diff в качестве аргументов. Это эмулирует нажатие кнопки увеличения "diff" раз
          this.emulateButtonClick(this.incrementItem, diff);
        } else if (diff < 0) {
          this.emulateButtonClick(this.decrementItem, -diff);
        }
        // обновляем значение internalQuantity значением newQuantity, чтобы отразить изменения
        this.internalQuantity = newQuantity;
      }
    },
    // эмуляция нажатия кнопки
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
    // наблюдение за изменение значения
    quantity(newQuantity) {
      this.inputQuantity = String(newQuantity);
    },
  },
  created() {
    this.inputQuantity = this.quantity.toString();
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

    &:focus {
      outline: none;
      font-weight: 600;
      background-color: $alabaster-color;
    }
  }
}
</style>
