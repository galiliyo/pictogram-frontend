<template>
  <section class="camera">
    <Navbar />
    <div ref="camera" class="main-container" :class="{'hide':hideCamera}"></div>
    <div v-if="hideCamera">
      <div class="image-container mb-4">
        <v-img :src="post.mediaUrl" contain />
      </div>
      <v-text-field
        label="Caption"
        type="img"
        class="med-input"
        autofocus
        color="deep-orange accent-3"
        minlength="3"
        v-model="post.txt"
        required
      />
      <v-text-field
        label="Tags"
        type="img"
        class="med-input"
        placeholder="Enter tags, seperated by comma"
        color="deep-orange accent-3"
        minlength="3"
        v-model="tagsStr"
        required
      />

      <button @click="save" class="btn-main">Save</button>
    </div>
  </section>
</template>


<script>
import Navbar from "../components/Navbar";
export default {
  name: "Camera",
  data() {
    return {
      post: {
        type: "img",
        txt: "",
        mediaUrl: "",
        comments: [],
        likedBy: [],
        createdAt: ""
      },
      tagsStr: ""
    };
  },
  async created() {},
  mounted() {
    var myWidget = cloudinary.createUploadWidget(
      {
        cloudName: "pictogramcloud",
        uploadPreset: "ykdg8tdo",
        sources: ["local", "camera"],
        showAdvancedOptions: false,
        multiple: false,
        defaultSource: "camera",
        inlineContainer: this.$refs.camera,
        showCompletedButton: true,
        styles: {
          palette: {
            window: "#10173a",
            sourceBg: "#000011",
            windowBorder: "#fff",
            tabIcon: "#79F7FF",
            inactiveTabIcon: "#8E9FBF",
            menuIcons: "#CCE8FF",
            link: "#72F1FF",
            action: "#FFFFFF",
            inProgress: "#00ffcc",
            complete: "#33ff00",
            error: "#cc3333",
            textDark: "#000000",
            textLight: "#ffffff"
          },
          fonts: {
            default: null,
            "'IBM Plex Sans', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          this.post.mediaUrl = result.info.secure_url;
          myWidget.hide();
        }
      }
    );
    myWidget.open();
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    loginModal() {
      return this.$store.getters.loginModal;
    },
    hideCamera() {
      return this.post.mediaUrl != "";
    },
    tags() {
      return this.tagsStr.split(",");
    }
  },
  methods: {
    showUploadWidget() {
      cloudinary.openUploadWidget(
        {
          cloudName: "pictogramcloud",
          sources: ["local", "camera"],
          showAdvancedOptions: true,
          cropping: true,
          multiple: false,
          defaultSource: "camera",
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#0078FF",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#0078FF",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#E4EBF1"
            },
            fonts: {
              default: null,
              "Roboto, sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Roboto",
                active: true
              }
            }
          }
        },
        (err, info) => {
          if (!err) {
            console.log("Upload Widget event - ", info);
          }
        }
      );
    },

    async save() {
      let tags = Array.from(new Set(this.tagsStr.split(",")));
      tags.forEach((currTag, i, tags) => {
        currTag.trim();
        if (currTag === "") tags.splice(i, 1);
      });

      this.post.tags = tags;
      this.post.createdAt = new Date().getTime();
      try {
        await this.$store.dispatch({
          type: "save",
          post: this.post
        });
      } catch (err) {
        console.log(err);
      }
      this.$router.push("/");
    }
  },

  components: {
    Navbar
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_Camera.scss";
</style>