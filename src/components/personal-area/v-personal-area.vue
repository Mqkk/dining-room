<template>
  <div class="personal-area">
    <div class="personal-area__container">
      <div class="personal-area__top">
        <div class="personal-area__name">Иванов Иван Иванович</div>
        <div class="personal-area__number">203848504058</div>
        <div class="personal-area__img">
          <vue-barcode
            :code="barcodeData"
            :value="barcodeData"
            :options="{
              background: '#f6f6f6',
              fontSize: '14px',
              displayValue: 'false',
              width: '2',
              format: 'ITF14',
            }"
          />
        </div>
      </div>
      <div class="personal-nav">
        <ul class="list-reset personal-nav__list">
          <router-link class="personal-nav__item" to="/settings">
            <span class="personal-nav__name"> Настройки </span>
            <div class="order-nav__icon">
              <img :src="arrowRight" alt="" />
            </div>
          </router-link>
          <li class="personal-nav__item" @click="logout">
            <span class="personal-nav__name">Выйти</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import code from "@/assets/images/code.png";
import arrowRight from "@/assets/images/icons/icon-arrow-right.svg";
import { mapActions } from "vuex";

export default {
  name: "v-personal-area",
  data() {
    return {
      code,
      arrowRight,
      barcodeData: "5901234123457",
    };
  },
  components: {},
  methods: {
    ...mapActions(["LOGOUT"]),
    logout() {
      this.LOGOUT("logout");

      this.$router.push("/authorization");
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-area {
  &__top {
    padding: 20px $container-offset;
    margin-bottom: 20px;
    text-align: left;
    background-color: $wild-sand-color;
  }

  &__name {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  &__number {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  &__img {
    position: relative;
    width: 100%;
    height: auto;
    max-height: 500px;

    img {
      width: auto;
      height: auto;
    }
  }
}

.personal-nav {
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
    height: 52px;
    cursor: pointer;

    &:hover {
      background-color: $alabaster-color;
    }
  }

  &__name {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-gray-color;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $accent-br;
    width: 15px;
    height: 15px;
  }
}
</style>
