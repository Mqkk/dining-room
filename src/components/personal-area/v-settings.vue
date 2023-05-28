<template>
  <div class="settings">
    <div class="settings__container">
      <v-title-subtitle :title="title" />
      <div class="settings-nav">
        <ul class="list-reset settings-nav__list">
          <li
            class="settings-nav__item"
            v-for="item in items"
            :key="item.id"
            @click="handeItemClick(item)"
          >
            <span class="settings-nav__name">{{ item.label }}</span>
            <div class="settings-nav__icon">
              <img :src="item.image" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import vTitleSubtitle from "../v-title-subtitle.vue";
import arrowRight from "@/assets/images/icons/icon-arrow-right.svg";

export default {
  name: "v-settings",
  components: {
    vTitleSubtitle,
  },
  data() {
    return {
      title: "Настройки",
      items: [
        {
          id: 1,
          label: "Сменить пароль",
          image: arrowRight,
          route: "/change-password",
        },
      ],
    };
  },
  methods: {
    handeItemClick(item) {
      router.push(item.route);
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-nav {
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
