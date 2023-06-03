<template>
  <div class="order-history">
    <div class="order-history__container">
      <div class="order-history__top">
        <v-title-subtitle :title="title" />
      </div>
      <div class="order-filter">
        <h3 class="order-filter__title">Выбрать диапозон дат</h3>
        <form class="order-filter__form" @submit.prevent="applyFilter">
          <label>
            <input
              v-model="startDate"
              type="text"
              class="input-reset input order-filter__input"
              placeholder="От"
            />
          </label>
          <label>
            <input
              v-model="endDate"
              type="text"
              class="input-reset input order-filter__input"
              placeholder="До"
            />
          </label>
          <button class="btn-reset order-filter__btn link" type="submit">
            Применить
          </button>
        </form>
      </div>
      <ul class="list-reset order-history__list">
        <router-link
          class="order-history__item"
          v-for="order in ORDERS_HISTORY"
          :key="order.id"
          :to="{ path: `/order/${order.id}/`, query: { date: order.date } }"
        >
          <span class="order-history__item-name">{{ order.date }}</span>
          <span class="order-history__item-total"
            >{{ order.total_cost }} ₽</span
          >
        </router-link>
      </ul>
    </div>
  </div>
  <!-- нижняя панель -->
  <div class="bottom">
    <div class="total">
      <span class="total__name">Итого:</span>
      <span class="total__value">{{ ORDERS_HISTORY_TOTAL_COST }} ₽</span>
    </div>
  </div>
</template>

<script>
import vTitleSubtitle from "@/components/v-title-subtitle.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-order-history-wrapper",
  components: {
    vTitleSubtitle,
  },
  data() {
    return {
      title: "История заказов",
      startDate: null,
      endDate: null,
    };
  },
  computed: {
    ...mapGetters(["ORDERS_HISTORY", "ORDERS_HISTORY_TOTAL_COST"]),
  },
  methods: {
    ...mapActions(["GET_ORDERS_HISTORY_FROM_API"]),
    applyFilter() {
      this.GET_ORDERS_HISTORY_FROM_API({
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
  },
  mounted() {
    this.GET_ORDERS_HISTORY_FROM_API();
  },
};
</script>

<style lang="scss" scoped>
.order-history {
  &__list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $wild-sand-color;
    padding: 0 $container-offset;
    height: 57px;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-gray-color;

    &:hover {
      background-color: $alabaster-color;
    }

    &-name {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }

    &-total {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: $accent-br;
      padding: 2px 10px;
      min-width: 53px;
      font-weight: 700;
      font-size: 14px;
      line-height: 145%;
      color: $accent-color;
      background-color: $bg-green-color;
    }
  }
}

.order-filter {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 15px $container-offset;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);

  &__title {
    margin: 0;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    color: $dark-color;
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    row-gap: 15px;
  }

  &__btn {
    font-family: inherit;
    text-align: left;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
  }
}
</style>
