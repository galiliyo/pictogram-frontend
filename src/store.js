import Vue from 'vue'
import Vuex from 'vuex'
import PostStore from './modules/PostStore.js'
import UserStore from './modules/UserStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    PostStore,
    UserStore
  }
})
