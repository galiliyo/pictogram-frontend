<template>
  <v-app>
    <v-content>
      <notifications position="bottom center" classes="notifications" />
      <router-view></router-view>
    </v-content>
    <Bottom-Nav v-if="this.loggedInUser"></Bottom-Nav>
  </v-app>
</template>

<script>
import BottomNav from "./components/BottomNav";
export default {
  name: "App",
  data() {
    return {};
  },
  created() {},
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {},
  components: {
    BottomNav
  }
};
</script>

