<template>
  <section class="login-container">
    <div class="Login" v-if="mode==='login'">
      <h2 class="mb-4">Login</h2>
      <form @submit.prevent="login" class="flex column">
        <v-text-field
          label="E-mail"
          type="email"
          autofocus
          append-icon="email"
          color="deep-orange accent-3"
          minlength="3"
          v-model="user.email"
        />
        <v-text-field
          label="Password"
          type="password"
          append-icon="lock"
          class="input-password"
          color="deep-orange accent-3"
          minlength="2"
          v-model="user.pass"
        />
        <button class="btn-main full-width mt-4 mb-2">Login</button>
      </form>
      <p class="login-switch">
        Don't have an account?
        <span class="link" @click="mode='signup'">Signup</span>
      </p>
    </div>
    <div v-else class="SignUp">
      <h2 class="mb-4">Signup</h2>
      <form @submit.prevent="validate" class="flex column">
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
          v:rules="passwordRules"
          class="input-password"
          color="deep-orange accent-3"
          minlength="2"
          v-model="user.pass"
        />
        <v-text-field
          label="Confirm Password"
          type="password"
          append-icon="lock"
          v:rules="passwordRules"
          class="input-password"
          color="deep-orange accent-3"
          minlength="2"
          v-model="passConfirm"
        />
        <button class="btn-main full-width mt-4 mb-2">Sign Up</button>
      </form>
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
      passConfirm: "",
      mode: "login",
      valid: true,
      name: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && this.passConfirm === this.user.pass) || "Passwords must match"
      ]
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    async login() {
      // loading.io
      try {
        await this.$store.dispatch({ type: "login", user: this.user });
        this.user = { email: "", pass: "" };
      } catch (err) {
        this.$parent.$emit("alertLoginFail");
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        // this.snackbar = true;
      }
    },
    signup() {}
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Login.scss";
</style>
