// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from 'store';
import VueI18n from 'vue-i18n';
import VueClipboard from 'vue-clipboard2';
import {
  browser
} from "./js/utils";
import "./icon/iconfont.js";
Vue.config.productionTip = false;
Vue.use(VueClipboard)
Vue.use(VueI18n)
Vue.use(ElementUI)

var messages = {
  en: {
    message: require('./i18n/en-GB')
  },
  zh: {
    message: require('./i18n/zh-CN')
  }
}
// language init for localStorage
var local = localStorage.getItem('languageType');
if (!local || local === "") {
  local = browser.language.substr(0, 2);
  localStorage.setItem('languageType', local);
}
const i18n = new VueI18n({
  locale: local, // set locale
  messages
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
