<template>
  <v-app>
    <v-content>
      <notifications position="bottom center" classes="notifications"  />
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
 
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

