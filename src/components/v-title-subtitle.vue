<template>
  <div class="top content">
    <h2 class="top__title">{{ title }}</h2>
    <p class="top__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "v-title-subtitle",
  props: ["title", "subtitle"],
};
</script>

<style lang="scss" scoped>
.top {
  margin-bottom: 25px;
  text-align: left;

  &__title {
    margin: 0;
    font-weight: 600;
    font-size: 15px;
    line-height: 120%;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $dark-color;
  }

  &__subtitle {
    margin: 0;
    margin-top: 10px;
    font-weight: 400;
    font-size: 12px;
    line-height: 145%;
    font-feature-settings: "pnum" on, "lnum" on;
    color: $silver-chalice-color;
  }
}
</style>
