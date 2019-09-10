<template>
  <section>
    <section class="about">
      <Navbar class="colorBg" />
    </section>
    <section class="user-profile"></section>
  </section>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "user profile",
  created: {},
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped>
// @import "../styles/views/_About.scss";
</style>

