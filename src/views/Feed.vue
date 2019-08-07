<template>
  <section class="feed">
    <div class="header">
      <AppHeader class="colorBg" @alertLoginFail="alertLoginFail()" />
    </div>
    <div class="main-container">
      <div v-if="loggedInUser" class="posts-column">
        <post v-for="(post,i) in posts" :post="post" :loggedInUser="loggedInUser" :key="i">{{posts}}</post>
      </div>
      <div class="users-column"></div>
      <button class="btn-add" @click="goEdit">
        <span>+</span>
      </button>
    </div>
    this.$notify({
    group: 'foo',
    title: 'Important message',
    text: 'Hello user! This is a notification!'
    });
  </section>
</template>


<script>
import AppHeader from "../components/Header";
import Post from "../components/Post";

export default {
  data() {
    return {
      alert: false
    };
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
    },
    alertLoginFail() {
      console.log("aaaaa");
      this.alert = true;
    }
  },
  components: {
    AppHeader,
    Post
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_Feed.scss";
</style>