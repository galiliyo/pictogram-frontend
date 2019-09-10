<template>
  <section class="appNavigation">
    <transition name="slide-fade">
      <div v-if="searchBarIsVisible" class="mobile-search-bar">
        <SearchBar class="search-bar" @onValueChange="setFilter($event)" />
      </div>
    </transition>

    <BottomNav class="bottomNav" />
    <Login v-if="!loggedInUser" />
    <div class="topNav">
      <div class="navbar flex">
        <div>
          <img class="logo" src="../assets/img/logo/Pictogram-white.svg" alt />
        </div>
        <SearchBar v-if="loggedInUser && searchBar" @onValueChange="setFilter($event)" />

        <div class="nav-links">
          <router-link to="/">
            <span class="nav-link">Home</span>
          </router-link>

          <button v-if="loggedInUser" class="btn-link" @click="logout">Logout</button>

          <button class="btn-link" v-else @click="showLoginModal">Login</button>

          <img v-if="loggedInUser" class="user-img" :src="loggedInUser.imgUrl" />
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import Login from "../components/Login";
import BottomNav from "../components/BottomNav";
import SearchBar from "../components/SearchBar";
export default {
  name: "Navbar",
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
    },
    searchBarIsVisible() {
      return this.$store.getters.mobileSearchBarVisibility;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
    },

    showLoginModal() {
      this.showLogin = true;
    },
    setFilter(txt) {
      this.$store.commit({
        type: "setKeyword",
        keyword: txt
      });
      this.loadPosts(txt);
    },
    async loadPosts(keyword = {}) {
      console.log("load posts", keyword);

      let params = { keyword };
      try {
        let postsRes = await this.$store.dispatch({
          type: "loadPosts",
          params
        });
      } catch (err) {
        console.log(err);
      }
    }
  },

  props: {
    colorBg: {
      type: Boolean,
      default: false
    },
    searchBar: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Login,
    BottomNav,
    SearchBar
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Navbar.scss";
</style>
