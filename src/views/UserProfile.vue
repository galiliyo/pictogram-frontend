<template>
  <section>

  <section class="about">
    <Login v-if="loginModal" />
    <Header class="colorBg" />
  </section>

  <section  class="about-page-wrapper" > 
    
  </section>
  </section>
</template>

<script>
import Header from "../components/Header";
import Login from "../components/Login";
export default {
  computed: {
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  components: {
    Header,
    Login,
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/_About.scss";

</style>

