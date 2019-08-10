<template>
  <section class="section-signup">
    <div>
      <Header class="colorBg"></Header>
    </div>
    <div class="signup-container">
      <div class="signup-form">
        <h2>Signup</h2>
        <form class="flex column" @submit.prevent="signup">
          <label>
            Email
            <div>
              <input type="email" placeholder="Email" v-model="newUser.email" autofocus required />
            </div>
          </label>
          <label>
            Password
            <div>
              <input type="password" placeholder="Password" v-model="newUser.pass" required />
            </div>
          </label>
          <label>
            First Name
            <div>
              <input type="text" placeholder="First Name" v-model="newUser.firstName" required />
            </div>
          </label>
          <label>
            Last Name
            <div>
              <input type="text" placeholder="Last Name" v-model="newUser.lastName" required />
            </div>
          </label>
        

          <div>
            <label>
              Upload Image
              <input type="file" class="short-input" ref="upload" />
            </label>
          </div>
          <button class="btn-signup">Signup</button>
        </form>
      </div>
    </div>
  </section>
</template>


<script>
import Header from "../components/Header";
export default {
  data() {
    return {
      newUser: {
        email: "",
        pass: "",
        firstName: "",
        lastName: "",
        imgUrl:
          "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg",
          likedPosts: [],
      }
    };
  },

  methods: {
    async signup() {
      const file = this.$refs.upload.files[0];
      if (file) {
        const url = await this.$store.dispatch({ type: "uploadImg", file });
        this.newUser.imgUrl = url;
      }
      try {
        await this.$store.dispatch({
          type: "signup",
          userCredential: this.newUser
        });
        this.$router.push("/");
        //todo notification success
      } catch (err) {
      
        this.$router.push("/");
      }
    }
  },
  components: {
    Header
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_Signup.scss";
</style>
