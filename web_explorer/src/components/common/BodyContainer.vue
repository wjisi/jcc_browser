<template>
<div id="container">
  <div v-show="getTitle!=='close'&&getTitle!==''" class="contentTitle">{{getTitle}}</div>
  <div class="contentWrap">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getTitle() {
      return this.$store.getters.contentTitle;
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  min-height: 510px;
  .contentTitle {
    width: 100%;
    height: 50px;
    color: blue;
    background-color: #f8f8f8;
  }
  // .contentWrap {
  //   width: 96%;
  //   height: 100%;
  //   margin: 0 2%;
  //   background-color: #f8f8f8;
  // }
}
</style>