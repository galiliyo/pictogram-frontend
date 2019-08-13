import AuthService from "../services/AuthService.js";
import UserService from "../services/UserService.js";
// import store from "../store.js";

export default {
  state: {
    users: [],
    loggedInUser: AuthService.getLoggedInUser()
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user;
    },

    setUsers(state, { users }) {
      state.users = users;
    },
    updateUser(state, { user }) {
      const idx = state.users.findIndex(currUser => currUser._id === user._id);
      state.users.splice(idx, 1, user);
      if (state.loggedInUser && state.loggedInUser._id === user._id)
        state.loggedInUser = user;
    },
  },
  getters: {
    loggedInUser(state) {
      return state.loggedInUser;
    }
  },
  actions: {
    async login(context, { user }) {
      try {
        const loggedInUser = await AuthService.login(user);
        context.commit({ type: "setLoggedInUser", user: loggedInUser });
      } catch (err) {
        throw err;
      }
    },
    async signup(context, { userCredential }) {
      try {
        const loggedInUser = await AuthService.signup(userCredential);
        context.commit({ type: "setLoggedInUser", user: loggedInUser });
      } catch (err) {
        throw err;
      }
    },
    async logout(context) {
      await AuthService.logout();
      context.commit({ type: "setLoggedInUser", user: null });
    },
    async getUserById(context, { id }) {
      try {
        return await UserService.getById(id);
      } catch (err) {
        throw err;
      }
    },
    async updateUser(context, { user }) {
      try {
        const updatedUser = await UserService.save(user);
        context.commit({ type: "updateUser", user: updatedUser });
        return updatedUser;
      } catch (err) {
        throw err;
      }
    },
    async toggleLikes(context,   {postId} ) {
      let updatedUser = await UserService.toggleLike(postId)
      console.log('updated user', updatedUser)
     sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
      context.commit('setLoggedInUser', {user: updatedUser})
      return updatedUser
    },

    async getUsers(context, { postId = 'allPosts' }) {
      const users = await UserService.query(postId);
      context.commit({ type: "setUsers", users });
    }
  }
};
