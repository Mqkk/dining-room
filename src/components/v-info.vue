<template>
  <div class="info content">
    <div class="info__container">
      <div class="info__content">
        <div class="info__img">
          <img :src="image" :alt="alt" />
        </div>
        <h3 class="info__title">{{ title }}</h3>
      </div>
      <router-link class="btn-reset btn" to="/authorization">
        Войти
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-info",
  data() {
    return {};
  },
  props: ["title", "image", "alt"],
};
</script>

<style lang="scss" scoped>
.info {
  height: 100vh;

  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &__img {
    margin-bottom: 20px;

    img {
      width: 120px;
    }
  }

  &__title {
    margin: 0;
    max-width: 260px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: $dark-color;
  }

  .btn {
    margin-bottom: 20px;
  }
}
</style>
