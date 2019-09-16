<template>
  <section class="post-edit">
    <Navbar class="colorBg" />
    <div v-if="post" class="posts-column">
      <Post :post="post" :loggedInUser="loggedInUser"></Post>
    </div>
  </section>
</template>

<script>
import Navbar from "../components/Navbar";
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
    Navbar,
    Post
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_PostEdit.scss";
</style>