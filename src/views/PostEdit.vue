<template>
  <section class="post-edit">
    <AppHeader class="colorBg" />
    <Login v-if="loginModal" />
    <div class="edit-form-title">
      <h2 v-if="post._id">Edit</h2>
      <h2 v-else>New Post</h2>
      <form @submit.prevent="save">
        <label>
          Title
          <div>
            <input type="text" v-model="post.title" placeholder="Title" required autofocus />
          </div>
        </label>
<p>Camera</p>
        <!-- <input type="file" accept="image/*" capture="camera"> -->
        <Camera :requestAccess="true">
          <div slot="capture" name="capture">snap</div>
          <div slot="download" name="download">save</div>
          <div slot="snap" name="snap">Take a pic</div>
          <div slot="record" name="record">Record video</div>
          <div name="stop">Stop recording</div>
          <div name="pause">Pause recording</div>
          <div name="resume">Resume recording</div>
          <div name="reset">Reset all data (video/picture)</div>
          <div name="close">Revoke access</div>
          <div name="fullscreen">Toggle camera in fullscreen</div>
          <div name="flip">Change camera type (front, back) if available</div>
        </Camera>

        <label>
          Upload Image
          <div>
            <input type="file" class="short-input" ref="upload" />
          </div>
        </label>

        <button>Save</button>
      </form>
    </div>
  </section>
</template>


<script>
import { Camera, Microphone } from "vue-capture";
import AppHeader from "../components/Header";
import Login from "../components/Login";
export default {
  data() {
    return {
      post: {
        type: "",
        mediaURL: "",
        comments: [],
        imgUrl:
          "https://images.unsplash.com/photo-1562386130-926081dc4fbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        likedBy: [],
        createdAt: "",
        hashTags: []
      }
    };
  },
  async created() {
    const postId = this.$route.params.id;
    if (postId) {
      this.post = await this.$store.dispatch({ type: "getById", postId });
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  methods: {
    async uploadMedia() {
      const mediaFile = this.$refs.upload.files[0];
      // loading.io
      if (file) {
        try {
          const url = await this.$store.dispatch({
            type: "uploadImg",
            mediaFile
          });
          this.post.imgUrl = url;
        } catch (err) {
          console.log(err);
        }
      }
    },
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
          // this.$swal("Edit Successfully", "", "success");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await this.$store.dispatch({
            type: "save",
            post: this.post
          });
          // this.$swal("Added Successfully", "", "success");
        } catch (err) {
          // this.$swal("Check if login", "", "error");
        }
      }
      this.$router.push("/");
    }
  },
  components: {
    AppHeader,
    Login,
    Camera
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_PostEdit.scss";
</style>