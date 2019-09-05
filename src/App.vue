<template>
  <v-app>
    <v-content>
      <notifications position="bottom center" classes="notifications" />
      <router-view></router-view>
    </v-content>
    <Bottom-Nav v-if="isMobile"></Bottom-Nav>
  </v-app>
</template>



<script>
import BottomNav from "./components/BottomNav";
export default {
  name: "App",
  data() {
    return {};
  },
  created() {

  },
  computed: {
    isMobile() {
     let is= this.$store.getters.isMobile;
      console.log('isMobile',is);
      return is
    }
  },
  methods: {},
  components: {
    BottomNav
  }
};
</script>

