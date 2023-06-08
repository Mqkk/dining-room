<template>
  <div id="app">
    <v-header v-if="$route.name !== 'completion' && $route.name !== 'ban'" />
    <v-main-wrapper />
    <v-toolbar v-if="this.IS_AUTHENTICATED === true" />
  </div>
  <notifications width="100%" />
</template>

<script>
import vHeader from "@/components/v-header";
import vMainWrapper from "@/components/v-main-wrapper";
import vToolbar from "@/components/v-toolbar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    vHeader,
    vMainWrapper,
    vToolbar,
  },
  methods: {
    ...mapActions(["CLEAR_CART", "GET_ORDER_FROM_API"]),
  },
  computed: {
    ...mapGetters(["IS_AUTHENTICATED", "ORDER"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark-color;
}
</style>
