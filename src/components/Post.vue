<template>
  <div v-if="owner" class="post card mb-3">
    <div class="post-header pa-2 flex space-between">
      <div class="top-row flex">
        <div class="flex">
          <v-avatar class="avatar mr-3" :size="48">
            <img v-if="owner" :src="owner.imgUrl" alt="avatar" />
          </v-avatar>
          <div class="header-txt">
            <h6>{{owner.firstName}} {{owner.lastName}}</h6>
            <span>
              <i class="icon icon-pin-location-1"></i>
            </span>
            <span class="text-grey">image location</span>
          </div>
        </div>

        <drop-menu :items="items" @select="select"></drop-menu>
      </div>
    </div>

    <v-img :src="post.mediaUrl" aspect-ratio="1.6"></v-img>

    <div class="post-info">
      <div class="controls flex space-between px-3 pt-2">
        <div class="user-actions">
          <i
            class="icon icon-love-it-circle btn-icon"
            :class="{'liked': isPostLikedByUser }"
            @click="likePostToggle(post._id)"
          ></i>
          <i class="icon icon-megaphone btn-icon"></i>
        </div>
      </div>
      <h6
        class="text-dark heavy px-3"
        v-show="post.likedBy.length>0"
      >Liked by {{post.likedBy.length}}</h6>
      <div class="px-3 pt-3">
        <span class="text-dark heavy text-body" v-if="owner">{{owner.firstName}} {{owner.lastName}}</span>
        <p v-html="highlight(post.txt ,keyword)"></p>
        <span
          class="text-dark heavy"
          v-for="(tag,i) in post.tags"
          :key="i"
          v-html="highlight(tag ,keyword)"
        ></span>
      </div>
      <h6 v-if="post.comments.length>0" class="px-3">{{post.comments.length}} comments</h6>
      <div class="px-3" v-for="(comment,i) in post.comments" :key="i">
        <span class="text-dark heavy text-body">{{comment.ownerFullName}}&nbsp;</span>
        <span v-html="highlight(comment.txt ,keyword)">&nbsp;</span>
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
        console.log("could not get owener", err);
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

    highlight(txt, keyword) {
      if (keyword.length < 2) return txt;
      var iQuery = new RegExp(keyword, "ig");
      return txt.toString().replace(iQuery, function(matchedTxt) {
        return `<span style="background: yellow">${matchedTxt}</span>`;
      });
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

