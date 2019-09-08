<template>
  <section class="nav" :class="{ colorBg: colorBg }">
    <div class="navbar flex">
      <div > <img class="logo" src="../assets/img/logo/Pictogram-white.svg" alt=""></div>

      <div v-if="loggedInUser" class="search-field mt-3">
        <v-text-field
          placeholder="Search"
          height="24"
          clearable
          flat
          solo
          prepend-inner-icon="search"
          single-line
          @keyup="setFilter($event)"
          @click:clear="setFilter($event)"
        ></v-text-field>
      </div>
      <div class="nav-links">
        <router-link to="/">
          <span class="nav-link">Home</span>
        </router-link>

        <button v-if="loggedInUser" class="btn-link" @click="logout">Logout</button>

        <button class="btn-link" v-else @click="showLoginModal">Login</button>

        <img v-if="loggedInUser" @click="goUserProfile" class="user-img" :src="loggedInUser.imgUrl" />
      </div>
    </div>
    <Login v-if="!loggedInUser" />
  </section>
</template>


<script>
import Login from "../components/Login";
export default {
  name: "Header",
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
    },
    setFilter(e) {
      this.$store.commit({
        type: "setKeyword",
        keyword: e.target.value
      });
      this.loadPosts(e.target.value);
    },
    async loadPosts(keyword = {}) {
      console.log("load posts", keyword);

      let params = { keyword };
      try {
        let postsRes = await this.$store.dispatch({
          type: "loadPosts",
          params
        });
        // console.log("postsRes", postsRes);
      } catch (err) {
        // console.log(err);
      }
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
