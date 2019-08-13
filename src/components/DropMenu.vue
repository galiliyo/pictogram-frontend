<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </template>

    <div class="drop-menu">
      <p
        class="list-item"
        v-for="(item, i) in items"
        :key="i"
        @click="select(item.title  ) "
      >{{ item.title }}</p>
    </div>
  </v-menu>
</template>


<script>
export default {
  name: "DropMenu",
  data() {
    return {};
  },
  props: {
    items: Array
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    select(e) {
      this.$emit('select',e)
    }
  },
  components: {}
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_DropMenu.scss";
</style>