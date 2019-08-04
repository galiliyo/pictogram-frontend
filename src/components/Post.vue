<template>
  <div class="post card mb-3">
    <div v-if = "owner" class="post-header pa-2">
      <div class="top-row flex">
        <v-avatar class="avatar mr-3" :size="48">
          <img v-if="owner.imgUrl" :src="owner.imgUrl" alt="avatar" />
        </v-avatar>
        <div class="header-txt">
          <h6>{{owner.firstName}} {{owner.lastName}}</h6>
          <span><i class="icon icon-pin-location-1"></i></span>
          <span class="text-grey ">image location</span>
        </div>
      </div>
    </div>

    <v-img :src="post.mediaUrl" aspect-ratio="1.6"></v-img>
    <div class="post-info p-2">
      <div class="controls flex space-between mb-2">
        <div class="user-actions">
          <i class="icon icon-love-it-circle btn-icon"></i>
          <i class="icon icon-megaphone btn-icon"></i>
        </div>
        <div class="user-actions">
          <i class="icon icon-megaphone btn-icon"></i>
        </div>
      </div>
        <h6 v-show="post.likedBy.length>0">Liked by {{post.likedBy.length}}</h6>
      <p>
        {{post.txt}}
        <span class="tags" v-for="(tag,i) in post.tags" :key="i">&nbsp #{{tag}}</span>
      </p>
    </div>
    <pre>
      {{post}}
      </pre>
  </div>
</template>

<script>
export default {
  name: "post",
  props: {
    post: Object
  },
  data() {
    return {
      owner: null
    };
  },
  async created() {
    try {
      // this.comments = await this.$store.dispatch({
      //   type: "getComments",
      //   tripId: { postId: this.post._id }
      // });
      this.owner = await this.$store.dispatch({
        type: "getUserById",
        id: this.post.owner._id
      });
    } catch (err) {
      console.log(err);
    }
  },
  computed: {},
  methods: {
    goDetails() {}
  },
  components: {}
};
</script>



<style lang="scss" scoped>
@import "../styles/components/_Post.scss";
</style>

