<template>
  <div>
    <div v-if="!post || !post.owner">Loading...</div>
    <div v-if="post && post.owner && loggedInUser" class="post card mb-3">
      <div class="post-header pa-2 flex space-between">
        <div class="top-row flex">
          <div class="flex">
            <v-avatar class="avatar mr-3" :size="48">
              <img v-if="owner" :src="owner.imgUrl" alt="avatar" />
            </v-avatar>
            <div class="header-txt">
              <h6 v-if="post.owner">{{post.owner.firstName}} {{post.owner.lastName}}</h6>
              <span>
                <i class="icon icon-time-clock-circle-alternate text-grey"></i>
              </span>
              <span class="text-grey">{{post.createdAt | moment("dddd, MMMM Do YYYY") }}</span>
            </div>
          </div>

          <drop-menu
            v-if="post.owner && loggedInUser && loggedInUser._id === post.owner._id"
            :items="items"
            @select="select"
          ></drop-menu>
        </div>
      </div>

      <v-img :src="post.mediaUrl" aspect-ratio="1.6" @click="gotoPost"></v-img>

      <div class="post-info">
        <div class="controls flex space-between px-3 pt-2">
          <div class="user-actions">
            <i
              class="icon icon-love-it-circle-2 btn-icon"
              :class="{'liked': isPostLikedByUser }"
              @click="likePostToggle(post._id)"
            ></i>
            <i class="icon icon-share-2 btn-icon" @click="share"></i>
          </div>
        </div>

        <h6
          v-if="post"
          class="text-dark heavy px-3"
          v-show="post.likedBy.length>0"
        >Liked by {{post.likedBy.length}}</h6>

        <div class="px-3 pt-3">
          <p v-html="highlight(post.txt ,keyword)"></p>
          <span
            class="text-dark heavy tag mr-1 mb-2"
            v-for="(tag,i) in post.tags"
            :key="i"
            v-html="highlight(tag ,keyword)"
          ></span>
        </div>

        <div v-if="post">
          <p v-if="post.comments.length>1" class="px-3 mt-3">{{post.comments.length}} comments</p>
          <p v-else-if="post.comments.length===1" class="px-3 mt-3">{{post.comments.length}} comment</p>
        </div>

        <div class="px-3" v-for="(comment,i) in post.comments" :key="i">
          <span class="text-dark heavy text-body">{{comment.ownerFullName}}&nbsp;</span>
          <span v-html="highlight(comment.txt ,keyword)">&nbsp;</span>
        </div>
      </div>
      <hr />
      <input
        class="input-comment px-3 py-2"
        placeholder="Add comment"
        type="text"
        v-model="newCommentTxt"
      />
      <button
        class="btn-post"
        @click="saveComment(post._id)"
        :class="{'disabled' : isCommentBtnDisabled }"
      >Post</button>
    </div>
  </div>
</template> 

<script>
import PostService from "../services/PostService";
import DropMenu from "./DropMenu";
const moment = require("moment");

export default {
  name: "post",
  props: {
    post: Object,
    loggedInUser: Object,
    index: Number,
    keyword: String
  },
  data() {
    return {
      owner: null,
      newCommentTxt: "",
      postLikedByUser: null,
      items: [{ title: "Edit" }, { title: "Delete" }]
    };
  },
  computed: {
    isPostLikedByUser() {
      return this.loggedInUser.likedPosts.includes(this.post._id);
    },
    isCommentBtnDisabled() {
      return this.newCommentTxt === "";
    }
  },
  date() {
    return this.post.createdAt;
  },
  async created() {
    if (this.loggedInUser) {
      this.postLikedByUser = this.loggedInUser.likedPosts.includes(
        this.post._id
      );
      try {
        this.owner = await this.$store.dispatch({
          type: "getUserById",
          id: this.post.owner._id
        });
      } catch (err) {
        console.log("could not get owenr", err);
      }
    }
  },
  methods: {
    select(value) {
      if (value === "Delete") this.deletePost();
    },
    async deletePost() {
      try {
        await this.$store.dispatch({
          type: "remove",
          post: this.post
        });
      } catch (err) {
        console.log("could not delete", err);
      }
    },

    async likePostToggle() {
      await this.$store.dispatch({
        type: "toggleLikes",
        postId: this.post._id,
        isLiked: this.isPostLikedByUser
      });
      this.$store.commit("updateLikes", {
        postId: this.post._id,
        isLiked: this.isPostLikedByUser,
        loggedInUser: this.$store.getters.loggedInUser
      });
    },
    saveComment: async function(postId) {
      if (this.newCommentTxt === "") return;
      const data = await PostService.saveComment(postId, this.newCommentTxt);
      const updatedPost = {
        ...this.post,
        comments: [...this.post.comments, data]
      };
      this.$store.commit("addComment", {
        index: this.index,
        post: updatedPost
      });
      this.newCommentTxt = "";
    },
    gotoPost() {
      this.$router.push(`/PostEdit/${this.post._id}`);
    },
    highlight(txt, keyword) {
      if (!keyword || keyword.length < 2) return txt;
      var iQuery = new RegExp(keyword, "ig");
      return txt.toString().replace(iQuery, function(matchedTxt) {
        return `<span style="background: yellow">${matchedTxt}</span>`;
      });
    },
    share() {
      navigator
        .share({
          title: `Check out this Pictogram by ${this.post.owner.firstName}`,
          text: "",
          url: "https://en.wikipedia.org/wiki/Typhoon_Lekima_(2019)"
        })
        .then(() => console.log("Yay, you shared it :)"))
        .catch(error =>
          console.log("Oh noh! You couldn't share it! :'(\n", error)
        );
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    }
  },

  components: {
    DropMenu
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Post.scss";
</style>

