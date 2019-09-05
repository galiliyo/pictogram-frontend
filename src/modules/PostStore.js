import PostService from '../services/PostService.js'
import Vue from 'vue'

export default {
  strict: true,
  state: {
    posts: [],
    keyword: ''
  },
  mutations: {
    setPosts(state, { posts }) {
      state.posts = posts
    },
    setloggedInUser(state, { posts }) {
      state.posts = posts
    },
    remove(state, { id }) {
      const idx = state.posts.findIndex(currPost => currPost._id === id)
      state.posts.splice(idx, 1)
    },
    update(state, { post }) {
      var idx = state.posts.findIndex(currPost => currPost._id === post._id)
      state.posts.splice(idx, 1, post)
    },
    save(state, { post }) {
      state.posts.push(post)
    },
    addComment(state, { index, post }) {
      Vue.set(state.posts, index, post)
    },
    setKeyword(state, { keyword }) {
      console.log('keyword',keyword);
      
      state.keyword = keyword
    }
  },
  getters: {
    posts(state) {
      return state.posts
    },
    keyword (state){
      return state.keyword
    }
  },
  actions: {
    async loadPosts(context, { params }) {
      try {
        const posts = await PostService.query(params)
        context.commit({ type: 'setPosts', posts })
        // if (context.getters.loggedInUser) {
        //   var ownerPosts = posts.filter(
        //     post => post.owner._id === context.getters.loggedInUser._id
        //   );
        // context.commit({ type: "setOwnerPosts", ownerPosts });
        // }
        return posts
      } catch (err) {
        throw err
      }
    },
    async getById(context, { postId }) {
      try {
        const post = await PostService.getById(postId)
        return post
      } catch (err) {
        throw err
      }
    },
    async remove(context, { post }) {
      try {
        await PostService.remove(post)
        context.commit({ type: 'remove', id: post._id })
      } catch (err) {
        throw err
      }
    },
    async save(context, { post }) {
      
      if (post._id) {
        try {
          const updatedPost = await PostService.save(post)
          context.commit({ type: 'update', post: updatedPost })
          return updatedPost
        } catch (err) {
          throw err
        }
      } else {
        try {
          console.log('saving post',post);
          
          const newPost = await PostService.save(post)
          context.commit({ type: 'save', post: newPost })
          return newPost
        } catch (err) {
          throw err
        }
      }
    },
    async uploadImg(context, { file }) {
      try {
        const url = await PostService.handleUploadImage(file)
        return url
      } catch (err) {
        throw err
      }
    }
  }
}
