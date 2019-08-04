<template>
  <div>
   <span v-if="iconOnly" > <i class="icon text-grey icon-lg " :class="classObj"></i> </span>

    <v-chip v-else class="chip" small color="rgb(89, 159, 250)">
      <i class="icon white--text" :class="classObj"></i>
      <span class="white--text ml-2">{{locaTripType}}</span>
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    tripType: String,
    iconOnly: Boolean
  },
  data() {
    return {
      locaTripType: "",
      classObj: {
        "icon-day-sunrise-2": this.tripType === "Day Post",
        "icon-religion-islam-pray": this.tripType === "Spiritual",
        "icon-color-painting-palette": this.tripType === "Art",
        "icon-history-vase": this.tripType === "Historical",
        "icon-bicycle": this.tripType === "Cycling",
        "icon-camping-tent-2": this.tripType === "Camping",
        "icon-trekking-person": this.tripType === "Hiking",
        "icon-beach-parasol-water": this.tripType === "Beach",
        "icon-asian-food-rice": this.tripType === "Culinary",
        "icon-megaphone": this.tripType === "Guided Tour"
      }
    };
  },
  created() {
    this.locaTripType = this.tripType;
  },
  components: {}
};
</script>

<style lang="scss" scoped>
// @import "../styles/components/_TripList.scss";
</style>