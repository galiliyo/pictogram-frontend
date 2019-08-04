<template>
  <section class="nav" app :class="{ colorBg: colorBg }">
    <div class="navbar">
      <div class="logo">
        <!-- <img src="../assets/img/logo/logo-dark.png" /> -->
      </div>
      {{loggedInUser}}
      <!-- <v-btn @click="showNotif('main', 'success')"></v-btn> -->
      <div class="nav-links">
        <button class="btn-link dark" v-if="loggedInUser" @click="logout">Logout</button>
        <router-link v-if="!loggedInUser" to="/Signup">
          <span class="dark">Signup</span>
        </router-link>
       
       
        <router-link to="/">
          <span class="dark">Feed</span>
        </router-link>
        <img v-if="loggedInUser" @click="goUserProfile" class="user-img" :src="loggedInUser.imgUrl" />
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {};
  },
  created() {
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
    },
    goUserProfile() {
      this.$router.push(`/UserProfile/${this.loggedInUser._id}`);
    },
    toggleLogin() {
      this.$store.commit("toggleLogin");
    }
  },
  props: {
    colorBg: {
      type: Boolean,
      default: false
    }
  }
};
</script>



<style lang="scss" scoped>
@import "../styles/components/_Header.scss";
</style>
