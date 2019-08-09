<template>
  <section>
    <section class="about">
      <Header class="colorBg" />
    </section>

    <section class="user-profile"></section>
  </section>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "user profile",
  created :{

  },
  computed: {
  loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  components: {
    Header,
    Login
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/_About.scss";
</style>

