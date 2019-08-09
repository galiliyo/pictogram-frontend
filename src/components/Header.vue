<template>
  <section class="nav" app :class="{ colorBg: colorBg }">
    <div class="navbar">
      <div class="logo">
       
      </div>
     
      <div class="nav-links">
        <router-link to="/">
          <span class="nav-link">Home</span>
        </router-link>

        <button  v-if="loggedInUser" class="btn-link "@click="logout">Logout</button>
      

        <button class="btn-link " v-else @click="showLoginModal">Login</button>
        
        <img v-if="loggedInUser" @click="goUserProfile" class="user-img" :src="loggedInUser.imgUrl" />
      </div>
    </div>
    <Login v-if="!loggedInUser" />
  </section>
</template>


<script>
import Login from "../components/Login";
export default {
  data() {
    return {
      showLogin: false,
      alert: false
    };
  },
  created() {},
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
    showLoginModal() {
      this.showLogin = true;
    }
  },
  props: {
    colorBg: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Login
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Header.scss";
</style>
