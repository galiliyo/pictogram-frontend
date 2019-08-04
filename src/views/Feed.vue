<template>
  <section class="feed">
    <div class="header">
      <AppHeader class="colorBg" />
      <Login v-if="loginModal" @setFilter="setFilter" />
    </div>
    <div class="main-container">
     <div class="posts-column">
      <post v-for = "(post,i) in posts" :post="post" :key="i">{{posts}}</post>
      </div>
      <div class="users-column">
        
      </div>
      <button class="btn-add" @click="goEdit">
        <span>+</span>
      </button>
    </div>
  </section>
</template>


<script>
// import Feed from "../components/Feed ";
import AppHeader from "../components/Header";
import Post from "../components/Post";
import Login from "../components/Login";

export default {
  data() {
    return {};
  },
  created() {
    this.loadPosts();
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  methods: {
    async loadPosts(filter = {}) {
      try {
        let p = await this.$store.dispatch({
          type: "loadPosts",
          filter
        });
        console.log("load posts", p);
      } catch (err) {
        console.log(err);
      }
    },
    goEdit() {
      this.$router.push("/PostEdit");
    }
  },
  components: {
    AppHeader,
    Login,
    Post
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_Feed.scss";
</style>