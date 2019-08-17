<template>
  <section class="post-edit">
    <AppHeader class="colorBg" />
    <div class="main-container">
   
      <Post v-if="post" :post="post" :loggedInUser="loggedInUser"></Post>
    </div>
  </section>
</template>

<script>
import AppHeader from "../components/Header";
import Post from "../components/Post";
export default {
  data() {
    return {
      post: {}
    };
  },

  async created() {
    const postId = this.$route.params.id;

    this.post = await this.$store.dispatch({ type: "getById", postId });
    
    
  },
  mounted() {},
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  methods: {
    async save() {
      if (!this.post._id) {
        try {
          const newPost = await this.$store.dispatch({
            type: "save",
            post: this.post
          });
          console.log(newPost);
        } catch (err) {
          console.log(err);
        }
        try {
          await this.$store.dispatch({
            type: "updateUser",
            user: this.loggedInUser
          });
        } catch (err) {
          console.log(err);
        }
      }
      this.$router.push("/");
    }
  },
  components: {
    AppHeader,
    Post
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_PostEdit.scss";
</style>