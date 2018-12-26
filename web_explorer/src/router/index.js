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
      path: '/hash',
      name: 'hash',
      component: _import('hash/index')
    }, {
      path: '/walletInfo',
      name: 'walletInfo',
      component: _import('walletInfo/index')
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login')
    }
  ]
})
