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
    }, {
      path: '/hash',
      name: 'hash',
      component: _import('hash/index')
    }, {
      path: '/moreInfo',
      name: 'moreInfo',
      component: _import('moreInfo/index')
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login')
    }, {
      path: '/viewall',
      name: 'viewall',
      component: _import('block/index')
    }
  ]
})
