<template>
  <div class="post card mb-3">
    <div v-if="owner" class="post-header pa-2">
      <div class="top-row flex">
        <v-avatar class="avatar mr-3" :size="48">
          <img v-if="owner.imgUrl" :src="owner.imgUrl" alt="avatar" />
        </v-avatar>
        <div class="header-txt">
          <h6>{{owner.firstName}} {{owner.lastName}}</h6>
          <span>
            <i class="icon icon-pin-location-1"></i>
          </span>
          <span class="text-grey">image location</span>
        </div>
      </div>
    </div>

    <v-img :src="post.mediaUrl" aspect-ratio="1.6"></v-img>
    <div class="post-info">
      <div class="controls flex space-between px-3 pt-2">
        <div class="user-actions">
          <i
            class="icon icon-love-it-circle btn-icon"
            :class="{'liked': postLikedByUser }"
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
        &nbsp{{post.txt}}
        <span
          class="text-dark heavy"
          v-for="(tag,i) in post.tags"
          :key="i"
        >&nbsp#{{tag}}</span>
      </div>
      <h6 v-if="post.comments.length>0" class="px-3">{{post.comments.length}} comments</h6>
      <div class="px-3" v-for="(comment,i) in post.comments" :key="i">
        <span class="text-dark heavy text-body">{{comment.ownerFullName}}</span>
        <span>&nbsp {{comment.txt}}</span>
      </div>

      <hr />
      <input
        class="input-comment px-3 py-2"
        placeholder="Add comment"
        type="text"
        v-model="newCommentTxt"
      />
      <button
        class="btn-link"
        @click="saveComment(post._id)"
        :class="{'disabled' : commentBtnDisabled }"
      >Post</button>
    </div>
  </div>
</template>

<script>
import PostService from "../services/PostService";
export default {
  name: "post",
  props: {
    post: Object,
    loggedInUser: Object
  },
  data() {
    return {
      owner: null,
      newCommentTxt: "",
      postLikedByUser: null
    };
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
        console.log(err);
      }
    }
  },
  computed: {
    commentBtnDisabled() {
      return this.newCommentTxt === "";
    }
  },
  methods: {
    goDetails() {},
    async likePostToggle() {
      await this.$store.dispatch({
        type: "toggleLikes",
        postId: this.post._id
      });
      this.postLikedByUser = !this.postLikedByUser;
    },
    saveComment: async function(postId) {
      await PostService.saveComment(postId, this.newCommentTxt);
    }
  },
  components: {}
};
</script>



<style lang="scss" scoped>
@import "../styles/components/_Post.scss";
</style>

