<template>
  <div class="bottom-nav flex center">
    <div class="nav-item flex column mt-2 mr-3" @click="goEdit">
      <v-icon class="mx-auto" :class="{active : this.view === 'Camera'}"dark size="32" center>add_circle</v-icon>
    </div>

    <div class="nav-item flex column mt-2 mr-3">
      <v-icon class="mx-auto" dark size="32" center @click="toggleSearchBar">search</v-icon>
    </div>

    <div class="nav-item flex column mt-2 " @click="goHome">
      <v-icon class="mx-auto " :class="{active : this.view === 'Feed'}" dark size="32">home</v-icon>
    </div>
  
  </div>
</template>
<script>
export default {
  name: "BottomNav",

  data() {
    return {mode : 'home'};
  },
  props:{},
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goEdit() {
      this.$router.push("/Camera");
    },
    toggleSearchBar() {
      this.$store.commit("toggleMobileSearchBar");
    }
  },
created(){
  
  
},
computed:{
view  (){
  console.log('route',this.$router.currentRoute.name);
  return this.$router.currentRoute.name
}

},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "../styles/components/_BottomNav.scss";
</style>