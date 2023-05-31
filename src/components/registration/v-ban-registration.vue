<template>
  <v-info :alt="alt" :title="title" :image="image" />
</template>

<script>
import vInfo from "../v-info.vue";
import image from "@/assets/images/ban-registration.svg";

export default {
  name: "v-ban-registration",
  components: {
    vInfo,
  },
  data() {
    return {
      alt: "Запрещено",
      title: "Вам было отказано в регистрации",
      image: image,
    };
  },
};
</script>

<style lang="scss" scoped></style>
