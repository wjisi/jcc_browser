<template>
  <div id="app">
    <HeaderNav v-show="isIndex"></HeaderNav>
    <BodyContainer></BodyContainer>
  </div>
</template>

<script>
import HeaderNav from "./components/common/HeaderNav";
import BodyContainer from "./components/common/BodyContainer";

export default {
  name: "App",
  components: {
    HeaderNav,
    BodyContainer
  },
  computed: {
    isIndex() {
      return this.$route.name !== "home";
    }
  }
};
</script>

<style scoped type="text/css">
#app {
  display: flex;
  flex-flow: column;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #121313;
}
</style>
