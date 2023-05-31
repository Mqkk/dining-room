<template>
  <div class="personal-area">
    <div class="personal-area__container">
      <div class="personal-area__top">
        <div class="personal-area__name">
          {{ PROFILE.last_name }} {{ PROFILE.name }} {{ PROFILE.surname }}
        </div>
        <div class="personal-area__number">{{ PROFILE.barcode }}</div>
        <div class="personal-area__img" v-if="PROFILE.barcode !== null">
          <vue-barcode
            :code="PROFILE.barcode"
            :value="PROFILE.barcode"
            :options="{
              background: '#f6f6f6',
              fontSize: '14px',
              displayValue: 'false',
              width: '2',
            }"
          />
        </div>
        <div v-else>
          <span class="personal-area__number">Код отсутствует</span>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-personal-area",
  data() {
    return {
      code,
      arrowRight,
    };
  },
  components: {},
  methods: {
    ...mapActions(["LOGOUT", "GET_PROFILE_FROM_API"]),
    logout() {
      this.LOGOUT("logout");

      this.$router.push("/authorization");
    },
  },
  computed: {
    ...mapGetters(["PROFILE"]),
  },
  mounted() {
    this.GET_PROFILE_FROM_API();
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
