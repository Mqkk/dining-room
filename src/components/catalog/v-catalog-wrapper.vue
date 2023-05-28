<template>
  <div class="catalog">
    <div class="catalog__container">
      <div v-if="!isPageAvailable">
        <v-restricted />
      </div>
      <div v-else class="catalog__content">
        <v-catalog-main v-if="!isCatalogLoading" />
        <div class="catalog__loading" v-else>Идет загрузка</div>
      </div>
    </div>
  </div>
</template>

<script>
import vCatalogMain from "@/components/catalog/v-catalog-main";
import vRestricted from "@/components/v-restricted";

export default {
  name: "v-catalog-wrapper",
  data() {
    return {
      isCatalogLoading: false,
      headerTitle: "Меню",
    };
  },
  components: {
    vCatalogMain,
    vRestricted,
  },
  computed: {
    // Определение текущего времени
    currentTime() {
      return new Date();
    },

    // Определение, должна ли страница быть доступна в текущее време
    isPageAvailable() {
      const startHour = 6;
      const endHour = 18;
      const currentHour = this.currentTime.getHours();
      return currentHour >= startHour && currentHour < endHour;
    },
  },
};
</script>

<style lang="scss" scoped></style>
