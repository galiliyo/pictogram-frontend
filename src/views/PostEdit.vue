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
        <section class="stream" v-if="!captured">
          <video ref="video" id="video" width="100%" height="500px" autoplay></video>
        </section>
        <section ref="canvas" id="canvas" width="100%" height="500px" v-else></section>

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
import AppHeader from "../components/Header";
// import Login from "../components/Login";
export default {
  data() {
    return {
      video: {},
      captured:false,
      post: {
        type: "",
        mediaURL: "",
        comments: [],
        imgUrl: "",
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
  mounted() {
    this.video = this.$refs.video;

    this.canvas = this.$refs.canvas;

    console.log(this.video);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream;
        this.video.play;
      });
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
      if (mediaFile) {
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
          console.log(newPost);
          
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
        } catch (err) {
          console.log(err);
          
        }
      }
      this.$router.push("/");
    },
    capture() {
      // let context = this.canvas.getContext('2d').
    }
  },
  components: {
    AppHeader,
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_PostEdit.scss";
</style>