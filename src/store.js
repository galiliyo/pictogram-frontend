import Vue from 'vue'
import Vuex from 'vuex'
import PostStore from './modules/PostStore.js'
import UserStore from './modules/UserStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isMobile: undefined
  },
  mutations: {
    setDisplayMode(state){
      state.isMobile = !!navigator.userAgent.match(
        /(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i
      )
    }

  },
  getters: {
    isMobile(state) {
      return state.isMobile
    }
  },
  actions: {},
  modules: {
    PostStore,
    UserStore
  }
})
