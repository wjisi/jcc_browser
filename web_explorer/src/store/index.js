import Vue from "vue";
import Vuex from "vuex";
import Juser from "./modules/user";
import Jother from "./modules/other";
import Jhosts from './modules/hosts';
import Jpairs from './modules/transPairs';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    Juser,
    Jother,
    Jhosts,
    Jpairs
  }
});

export default store;