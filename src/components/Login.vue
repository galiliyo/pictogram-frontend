<template>
  <section v-if="!loggedInUser" class="login-container">
    <div class="Login">
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
          required
        />
        <v-text-field
          label="Password"
          type="password"
          append-icon="lock"
          class="input-password"
          color="deep-orange accent-3"
          minlength="2"
          v-model="user.pass"
          required
        />
        <button class="btn-main full-width">Login</button>
      </form>
     
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: { email: "", pass: "" }
      // loggedInUser: null

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
        this.$parent.$emit('alertLoginFail');
       
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Login.scss";
</style>
