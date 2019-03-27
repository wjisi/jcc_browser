import Vue from 'vue'
import Router from 'vue-router'
const _import = file => () => import('@/components/' + file + '.vue');
Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: _import('home')
  }, {
    path: '/block',
    name: 'block',
    component: _import('block/index')
  },
  {
    path: '/block/blockDetail',
    name: 'blockDetail',
    component: _import('block/blockDetail')
  }, {
    path: '/trade',
    name: 'trade',
    component: _import('trade/index')
  }, {
    path: '/trade/tradeDetail',
    name: 'tradeDetail',
    component: _import('trade/tradeDetail')
  }, {
    path: '/wallet',
    name: 'wallet',
    component: _import('wallet/index')
  },
  {
    path: '/wallet/transnumDetail',
    name: 'transnumDetail',
    component: _import('wallet/transnumDetail')
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login')
  }
  ]
})
