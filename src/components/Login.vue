<template>
  <section class="login-container">
    <div class="Login" v-if="mode==='login'">
      <h2 class="mb-4">Login</h2>
      <v-form @submit.prevent="login" class="flex column">
        <v-text-field
          label="E-mail"
          type="email"
          autofocus
            :rules="[v => !!v || 'Item is required']"
          append-icon="email"
          color="deep-orange accent-3"
          minlength="3"
          v-model="user.email"
        />
        <v-text-field
          label="Password"
          type="password"
          append-icon="lock"
            :rules="[v => !!v || 'Item is required']"
          class="input-password"
          color="deep-orange accent-3"
          minlength="2"
          v-model="user.pass"
        />
        <button class="btn-main full-width mt-4 mb-2">Login</button>
      </v-form>
      <p class="login-switch">
        Don't have an account?
        <span class="link" @click="mode='signup'">Signup</span>
      </p>
    </div>
    <div v-else class="SignUp">
      <h2 class="mb-4">Signup</h2>
      <v-form
        @submit.prevent="validate"
        class="flex column"
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
      >
        <v-text-field
          label="E-mail"
          type="email"
          autofocus
          :rules="[v => !!v || 'Item is required']"
          append-icon="email"
          color="deep-orange accent-3"
          minlength="3"
          v-model="newUser.email"
        />
        <v-text-field
          label="First Name"
          type="text"
          append-icon="user"
          :rules="[v => !!v || 'Item is required']"
          class="input-name"
          color="deep-orange accent-3"
          minlength="2"
          v-model="newUser.firstName"
        />
        <v-text-field
          label="Last Name"
          type="test"
          append-icon="user"
          :rules="[v => !!v || 'Item is required']"
          class="input-name"
          color="deep-orange accent-3"
          minlength="2"
          v-model="newUser.lastName"
        />
        <v-text-field
          label="Password"
          type="password"
          append-icon="lock"
          :rules="[v => !!v || 'Item is required']"
          class="input-password"
          color="deep-orange accent-3"
          minlength="2"
          v-model="newUser.pass"
        />
        <v-text-field
          label="Confirm Password"
          type="password"
          append-icon="lock"
          :rules="[passConfirm==newUser.pass || 'Passwords must match']"
          class="input-password"
          color="deep-orange accent-3"
          minlength="2"
          v-model="passConfirm"
        />
        <button class="btn-main full-width mt-4 mb-2">Sign Up</button>
      </v-form>
      <p id="login-switch">
        Already have an account?
        <span class="link" @click="mode='login'">Login</span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      user: { email: "", pass: "" },
      newUser: {
        email: "",
        pass: "",
        firstName: "",
        lastName: "",
        imgUrl:
          "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg",
        likedPosts: []
      },
      passConfirm: "",
      mode: "login",
      valid: true,
      lazy: true,
      name: ""
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch({ type: "login", user: this.user });
      } catch (err) {
        console.log(err);
        
        this.$notify({
          type: "error",
          title: "Login failed",
          text: "Wrong user name or password",
          duration : 4000
          
        });
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.signup();
      }
    },
    async signup() {
      try {
        await this.$store.dispatch({
          type: "signup",
          userCredential: this.newUser
        });
        this.$notify({
          title: "Success!",
          text: "User account created successfuly",
          type: "success",
          
        });
      } catch (err) {
        this.$notify({
          title: "Signup Failed",
          text: err.response.data.error,
          type: "warning",
          
        });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Login.scss";
</style>
