<template>
  <div id="home">
    HOME
    <i class="iconfont icon-property"></i>
    <i class="iconfont icon-wallet"></i>
    <div>
      {{this.$t("message.block")}}
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  }
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100%;
  margin-top: 100px;
}
</style>
