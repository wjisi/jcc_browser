import Vue from "vue";
import Vuex from "vuex";
import Juser from "./modules/user";
import Jother from "./modules/other";
import Jhosts from './modules/hosts';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    Juser,
    Jother,
    Jhosts
  }
});

export default store;