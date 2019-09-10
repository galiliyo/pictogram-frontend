import Vue from "vue";
import Router from "vue-router";
import Feed from "./views/Feed.vue";
import PostEdit from "./views/PostEdit.vue";
import Camera from "./views/Camera.vue";

Vue.use(Router);

let router= new Router({
  routes: [
    {
      path: "/",
      name: "Feed",
      component: Feed,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/PostEdit/:id",
      name: "PostEdit",
      component: PostEdit,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/Camera",
      name: "Camera",
      component: Camera,
      meta: {
        requiresAuth: true
      }
    }
  ]
});


export default router;