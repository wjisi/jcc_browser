import Vue from 'vue'
import Router from 'vue-router'
const _import = file => () => import('@/components/' + file + '.vue');
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: _import('home/index')
  }, {
    path: '/blockchain',
    name: 'blockchain',
    component: _import('blockchain/index')
  }, {
    path: '/tokens',
    name: 'tokens',
    component: _import('tokens/index')
  }, {
    path: '/moreInfo',
    name: 'moreInfo',
    component: _import('moreInfo/index')
  }]
})
