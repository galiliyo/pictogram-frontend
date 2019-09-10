<template>
  <div class="bottom-nav flex center">
    <div class="nav-item flex column mt-2" @click="goEdit">
      <v-icon class="mx-auto" dark size="36" center>add_circle</v-icon>
    </div>

    <div class="nav-item flex column mt-2">
      <v-icon class="mx-auto" dark size="36" center @click="toggleSearchBar">search</v-icon>
    </div>

    <div class="nav-item flex column mt-2" @click="goHome">
      <v-icon class="mx-auto" dark size="36">home</v-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: "BottomNav",

  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goEdit() {
      this.$router.push("/Camera");
    },
    toggleSearchBar() {
      this.$store.commit("toggleMobileSearchBar");
    }
  },

  components: {}
};
</script>
<style lang="scss" scoped>
@import "../styles/components/_BottomNav.scss";
</style>