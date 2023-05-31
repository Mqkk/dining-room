<template>
  <v-info :alt="alt" :title="title" :image="image" />
</template>

<script>
import vInfo from "../v-info.vue";
import image from "@/assets/images/waiting.svg";

export default {
  name: "v-completion-registration",
  components: {
    vInfo,
  },
  data() {
    return {
      alt: "Ожидание",
      title: "Ожидайте подтверждения учетной записи",
      image: image,
    };
  },
};
</script>

<style lang="scss" scoped></style>
