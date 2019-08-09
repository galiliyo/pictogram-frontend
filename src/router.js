import Vue from "vue";
import Router from "vue-router";
import Feed from "./views/Feed.vue";
import PostEdit from "./views/PostEdit.vue";
import Camera from "./views/Camera.vue";
import Signup from "./views/Signup.vue";
import UserProfile from "./views/UserProfile.vue";

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
      path: "/PostEdit/:id?",
      name: "PostEdit",
      component: PostEdit,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/UserProfile/:id",
      name: "UserProfile",
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/Signup",
      name: "Signup",
      component: Signup,
      meta: {
        requiresAuth: false
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

// router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem("jwt") == null) {
//       next({
//         path: "/Login",
//         params: { nextUrl: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });


export default router;