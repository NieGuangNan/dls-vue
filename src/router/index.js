import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'
import {sync} from "vuex-router-sync";
import store from "store";
import types from "store/mutation-types";
import auth from "common/auth";

const dashboard = () => import(/* webpackChunkName: 'dashboard' */  `pages/dashboard.vue`);
const NotFoundView = () => import(/* webpackChunkName: 'NotFoundView' */  `components/404.vue`);
const menuList = () => import(/* webpackChunkName: 'menuList' */  `pages/sys/menu.vue`);
const role = () => import(/* webpackChunkName: 'role' */  `pages/sys/role.vue`);
const vertical = () => import(/* webpackChunkName: 'vertical' */  `pages/vertical.vue`);
const horizontal = () => import(/* webpackChunkName: 'horizontal' */  `pages/horizontal.vue`);
const login = () => import(/* webpackChunkName: 'login' */  `pages/login.vue`);
const register = () => import(/* webpackChunkName: 'register' */  `pages/register.vue`);
const app = () => import(/* webpackChunkName: 'app' */  `../App.vue`);
const sysUser = () => import(/* webpackChunkName: 'sysUser' */  `pages/sys/user.vue`);
const userAdd = () => import(/* webpackChunkName: 'userAdd' */  `pages/sys/userAdd.vue`);
const resetPwd = () => import(/* webpackChunkName: 'resetPwd' */  `pages/resetPwd.vue`);
const bar = () => import(/* webpackChunkName: 'bar' */  `pages/charts/bar.vue`);
const tableShow = () => import(/* webpackChunkName: 'tableShow' */  `pages/table/tableShow.vue`);
const treeTable = () => import(/* webpackChunkName: 'treeTable' */  `pages/table/treeTable.vue`);
const mixedChart = () => import(/* webpackChunkName: 'mixedChart' */  `pages/charts/mixedChart.vue`);
const demo1 = () => import(/* webpackChunkName: 'demo1' */  `pages/test/demo1.vue`);
const demo2 = () => import(/* webpackChunkName: 'demo2' */  `pages/test/demo2.vue`);
const home = () => import(/* webpackChunkName: 'home' */  `pages/home.vue`);
const barCharts = () => import(/* webpackChunkName: 'barCharts' */  `pages/charts/barCharts.vue`);


import {setCookie, getCookie, delCookie} from '@/common/utils';


//加载路由中间件
Vue.use(VueRouter)

const routes = [
  {path: '/login', component: login, permission: ['admin', 'developer']},
  {path: '/register', component: register, permission: ['admin', 'developer']},
  {
    path: '/test/1', component: app, permission: ['admin', 'developer'], children: [
      {path: '/test/1/1/1', component: tableShow, permission: ['admin', 'developer']},
      {path: '/test/1/1/2', component: treeTable, permission: ['admin', 'developer']},
      {path: '/test/1/2', component: demo1, permission: ['admin', 'developer']},
      {path: '/test/1/3', component: vertical, permission: ['admin', 'developer']},
      {path: '/test/1/4', component: horizontal, permission: ['admin', 'developer']},
      {path: '*', component: NotFoundView, permission: ['admin', 'developer']}
    ]
  },
  {
    path: '/test/2', component: app, permission: ['admin', 'developer'], children: [
      {path: '/test/2/1', component: bar, permission: ['admin', 'developer']},
      {path: '/test/2/2', component: mixedChart, permission: ['admin', 'developer']},
      {
        path: '/test/2/3',
        component: demo2,
        permission: ['admin', 'developer']
      }, {
        path: '/test/2/4',
        component: barCharts,
        permission: ['admin', 'developer']
      },
      {path: '*', component: NotFoundView, permission: ['admin', 'developer']}
    ]
  },
  {
    path: '', component: app, permission: ['admin', 'developer'], children: [
      {path: '/', component: home, permission: ['admin', 'developer']},
      {path: '/resetPwd', component: resetPwd, permission: ['admin', 'developer']},
      {path: '/dashboard', component: dashboard, permission: ['admin', 'developer']},
      {path: '/sys/menuList', component: menuList, permission: ['admin']},
      {path: '/sys/roleList', component: role, permission: ['admin']},
      {path: '/sys/userList', component: sysUser, permission: ['admin']},
      {path: '/sys/userAdd', component: userAdd, permission: ['admin']},
    ]
  },
  {path: '*', component: NotFoundView, permission: ['admin', 'developer']}
];

// 权限路由设置
let userInfo = VueCookies.get('user-info');
if (userInfo) {
  for (let index in routes) {
    if (routes[index].permission.indexOf(userInfo.access)) {
      routes.splice(index, 1);
    }
    for (let index2 in routes[index].children) {
      if (routes[index].children[index2].permission.indexOf(userInfo.access)) {
        routes[index].children.splice(index2, 1);
      }
    }
  }
}


//定义路由
const router = new VueRouter({
  routes: routes,
  mode: 'history'
  //利用 history.pushState API 来完成 URL 跳转而无须重新加载页面
});


sync(store, router)

const {state} = store

//全局前置导航守卫
router.beforeEach((route, redirect, next) => {
  if (state.device.isMobile && state.sidebar.opened) {
    store.commit(types.TOGGLE_SIDEBAR, false)
  }
  if (!auth.loggedIn() && route.path !== '/login' && route.path !== '/register' && route.path !== '/test/1/4') {
    next({
      path: '/login',
      query: {redirect: route.fullPath}
    })
  } else {
    next()
  }
})

export default router
