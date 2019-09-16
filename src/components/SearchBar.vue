<template>
  <div class="search-field mt-3">
    <v-text-field
      placeholder="Search"
      v-model="value"
      height="24"
      clearable
      flat
      solo
      prepend-inner-icon="search"
      single-line
      @keyup="onChange()"
      @change="onChange()"
      @click:clear="clickClear()"
    ></v-text-field>
  </div>
</template>


<script>
export default {
  name: "SearchBar",
  data() {
    return {
      value:""
    };
  },
  props: {},
  created() {},
  mounted() {},
  computed: {},
  methods: {
   onChange() {
      this.$emit('onValueChange',this.value);
    },
    clickClear(){
      this.$emit('onValueChange','');
    }
  },
  components: {}
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_DropMenu.scss";
</style>