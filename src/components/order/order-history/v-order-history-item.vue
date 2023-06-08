<template>
  <li class="order-item">
    <div class="order-item__img">
      <img
        class="img"
        :alt="order_data.good__name"
        :src="`http://v-brn-StolTest:8000${order_data.product__image}`"
      />
    </div>
    <div class="order-item__content">
      <div class="order-item__name">{{ order_data.product__name }}</div>
      <div class="order-item__info">цена {{ order_data.price }} ₽ / шт.</div>
      <div class="order-item__bottom">
        <div class="order-item__price">{{ order_data.total_price }} ₽</div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "v-order-history-item",
  props: {
    order_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.order-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  border: 1px solid $wild-sand-color;
  border-radius: $accent-br;
  padding: 4px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  background-color: $light-color;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &__img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    border-radius: $accent-br;
    max-width: 120px;
    max-height: 85px;
    overflow: hidden;

    img {
      border-radius: $accent-br;
      width: 120px;
      height: fit-content;
    }

    @media (max-width: 375px) {
      max-width: 100px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  &__name {
    margin-right: 20px;
    margin-bottom: 2px;
    font-weight: 500;
    font-size: 14px;
    line-height: 145%;
    text-align: left;
    color: $dark-color;
  }

  &__info {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 12px;
    line-height: 145%;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .counter {
    max-width: 120px;
  }

  &__price {
    font-weight: 700;
    font-size: 14px;
    line-height: 145%;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  &__btn-delete {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $br;
    width: 16px;
    height: 16px;
    background: rgba(190, 42, 42, 0.04);

    img {
      width: 10px;
      height: 10px;
    }

    &:hover {
      background: rgba(190, 42, 42, 0.08);
    }
  }
}
</style>
