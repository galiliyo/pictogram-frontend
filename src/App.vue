<template>
  <v-app>
    <v-content>
      <notifications group="foo" />
      <router-view></router-view>
    </v-content>   
  </v-app>
</template>



<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  async created() {
    // const user = await AuthService.getLoggedInUser()
    // console.log('user?', user)
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

