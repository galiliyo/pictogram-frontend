<template>
  <section class="feed">
    <div class="header">
      <Navbar class="colorBg" searchBar @alertLoginFail="alertLoginFail()" />
    </div>
    <div class="main-container" :class="{background: !loggedInUser}">
      <div v-if="loggedInUser" class="posts-column">
        <post
          v-for="(post,i) in posts"
          :post="post"
          :loggedInUser="loggedInUser"
          :key="i"
          :index="i"
          :keyword="keyword"
        ></post>
      </div>
      <button v-if="loggedInUser" class="btn-add" @click="goEdit">
        <span>+</span>
      </button>
    </div>
  </section>
</template>


<script>
import Navbar from "../components/Navbar";
import Post from "../components/Post";

export default {
  data() {
    return {};
  },
  created() {
    this.loadPosts();
  },
  mounted() {},
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    keyword() {
      return this.$store.getters.keyword;
    }
  },
  methods: {
    async loadPosts(filter = {}) {
      try {
        await this.$store.dispatch({
          type: "loadPosts",
          filter
        });
      } catch (err) {
        console.log(err);
      }
    },

    goEdit() {
      this.$router.push("/Camera");
    },
    alertLoginFail() {
      this.alert = true;
    }
  },
  components: {
    Navbar,
    Post
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_Feed.scss";
</style>