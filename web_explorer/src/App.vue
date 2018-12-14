<template>
  <div id="app">
    <HeaderNav></HeaderNav>
    <BodyContainer></BodyContainer>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
import HeaderNav from "./components/common/HeaderNav";
import BodyContainer from "./components/common/BodyContainer";
import FooterNav from "./components/common/FooterNav";

export default {
  name: "App",
  components: {
    HeaderNav,
    BodyContainer,
    FooterNav
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
