<template>
  <div class="bottom-nav flex center">
    <div class="nav-item flex column mt-2">
      <v-icon class="mx-auto" dark size="42" center>add_circle</v-icon>
      <div class="nav-label">New Post</div>
    </div>

    <div class="nav-item flex column mt-2">
      <v-icon class="mx-auto" dark size="42" center>search</v-icon>
      <div class="nav-label">Search</div>
    </div>

    <div class="nav-item flex column mt-2">
      <v-icon class="mx-auto" dark size="42">account_circle</v-icon>
      <div class="nav-label">Profile</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BottomNav",

  data() {
    return {};
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "../styles/components/_BottomNav.scss";
</style>