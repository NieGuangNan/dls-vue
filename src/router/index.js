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
  {path: '/login', component: login, permission: ['admin', 'developer'],meta: {title:'登录'}},
  {path: '/register', component: register, permission: ['admin', 'developer'],meta: {title:'注册'}},
  {
    path: '/pages', component: app, permission: ['admin', 'developer'], children: [
      {path: '/pages/table/tableShow', component: tableShow, permission: ['admin', 'developer'],meta: {title:'表格展示'}},
      {path: '/pages/table/treeTable', component: treeTable, permission: ['admin', 'developer'],meta: {title:'树形表格'}},
      {path: '/pages/demo1', component: demo1, permission: ['admin', 'developer'],meta: {title:'测试1-2'}},
      {path: '/pages/vertical', component: vertical, permission: ['admin', 'developer'],meta: {title:'vertical'}},
      {path: '/pages/horizontal', component: horizontal, permission: ['admin', 'developer'],meta: {title:'horizontal'}},
      {path: '*', component: NotFoundView, permission: ['admin', 'developer'],meta: {title:'404'}}
    ]
  },
  {
    path: '/pages', component: app, permission: ['admin', 'developer'], children: [
      {path: '/bar', component: bar, permission: ['admin', 'developer'],meta: {title:'柱状图'}},
      {path: '/mixedChart', component: mixedChart, permission: ['admin', 'developer'],meta: {title:'混合图表'}},
      {path: '/demo2',component: demo2, permission: ['admin', 'developer'], meta: {title:'甜甜圈'}},
      {path: '/barCharts', component: barCharts, permission: ['admin', 'developer'], meta: {title:'堆叠图'}},
      {path: '*', component: NotFoundView, permission: ['admin', 'developer'],meta: {title:'404'}}
    ]
  },
  {
    path: '', component: app, permission: ['admin', 'developer'], children: [
      {path: '/', component: home, permission: ['admin', 'developer'],meta: {title:'主页'}},
      {path: '/resetPwd', component: resetPwd, permission: ['admin', 'developer'],meta: {title:'重置密码'}},
      {path: '/dashboard', component: dashboard, permission: ['admin', 'developer'],meta: {title:'仪表盘'}},
      {path: '/sys/menuList', component: menuList, permission: ['admin'],meta: {title:'菜单管理'}},
      {path: '/sys/roleList', component: role, permission: ['admin'],meta: {title:'角色管理'}},
      {path: '/sys/userList', component: sysUser, permission: ['admin'],meta: {title:'用户管理'}},
      {path: '/sys/userAdd', component: userAdd, permission: ['admin'],meta: {title:'新增用户'}},
    ]
  },
  {path: '*', component: NotFoundView, permission: ['admin', 'developer'],meta: {title:'404'}}
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
  if(route.meta.title) {
    document.title = route.meta.title
  }
  if (state.device.isMobile && state.sidebar.opened) {
    store.commit(types.TOGGLE_SIDEBAR, false)
  }
  if (!auth.loggedIn() && route.path !== '/login' && route.path !== '/register' && route.path !== '/pages/horizontal') {
    next({
      path: '/login',
      query: {redirect: route.fullPath}
    })
  } else {
    next()
  }
})

export default router
