<template>
<div id="container">
  <p v-show="getTitle!==''" class="contentTitle">{{getTitle}}</p>
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
      // return this.$store.getters.contentTitle;
      return "";
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
    background-color: #f8f8f8;
  }
  .contentWrap {
    width: 96%;
    height: 100%;
    margin: 0 2%;
    background-color: #f8f8f8;
  }
}
</style>
