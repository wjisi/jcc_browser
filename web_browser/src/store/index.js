import Vue from "vue";
import Vuex from "vuex";
import jUser from "./modules/user";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    jUser
  }
});

export default store;
