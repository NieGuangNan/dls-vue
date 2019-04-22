import Vue from "vue";
import VueRouter from "vue-router";

import {sync} from "vuex-router-sync";
import store from "store";
import types from "store/mutation-types";
import auth from "common/auth";
import dashboard from "pages/dashboard.vue";
import NotFoundView from "components/404.vue";
import menuList from "pages/sys/menu.vue";
import role from "pages/sys/role.vue";
import vertical from "pages/vertical.vue";
import horizontal from "pages/horizontal.vue";
import login from "pages/login.vue";
import register from "pages/register.vue";
import app from "../App.vue";
import sysUser from "pages/sys/user.vue";
import userAdd from "pages/sys/userAdd.vue";
import resetPwd from "pages/resetPwd.vue";
import bar from "pages/charts/bar.vue";
import tableShow from "pages/table/tableShow"
import treeTable from "pages/table/treeTable";
import mixedChart from "pages/charts/mixedChart.vue"
import demo1 from "pages/test/demo1.vue"
import demo2 from "pages/test/demo2.vue"
import home from "pages/home.vue"
import barCharts from "pages/charts/barCharts"


import {setCookie, getCookie, delCookie} from '@/common/utils';
import VueCookies from 'vue-cookies'




//加载路由中间件
Vue.use(VueRouter)

const routes =[
  {path: '/login', component: login,permission:['admin','developer']},
  {path: '/register', component: register,permission:['admin','developer']},
  {
    path: '/test/1', component: app,permission:['admin','developer'], children: [
      {path: '/test/1/1/1', component: tableShow,permission:['admin','developer']},
      {path: '/test/1/1/2', component: treeTable,permission:['admin','developer']},
      {path: '/test/1/2', component: demo1,permission:['admin','developer']},
      {path: '/test/1/3', component: vertical,permission:['admin','developer']},
      {path: '/test/1/4', component: horizontal,permission:['admin','developer']},
      {path: '*', component: NotFoundView,permission:['admin','developer']}
    ]
  },
  {
    path: '/test/2', component: app,permission:['admin','developer'], children: [
      {path: '/test/2/1', component: bar,permission:['admin','developer']},
      {path: '/test/2/2', component: mixedChart,permission:['admin','developer']},
      {
        path: '/test/2/3',
        component: demo2,
        permission: ['admin', 'developer']
      },{
        path: '/test/2/4',
        component: barCharts,
        permission: ['admin', 'developer']
      },
      {path: '*', component: NotFoundView,permission:['admin','developer']}
    ]
  },
  {
    path: '', component: app,permission:['admin','developer'], children: [
      {path: '/', component: home,permission:['admin','developer']},
      {path: '/resetPwd', component: resetPwd,permission:['admin','developer']},
      {path: '/dashboard', component: dashboard,permission:['admin','developer']},
      {path: '/sys/menuList', component: menuList,permission:['admin']},
      {path: '/sys/roleList', component: role,permission:['admin']},
      {path: '/sys/userList', component: sysUser,permission:['admin']},
      {path: '/sys/userAdd', component: userAdd,permission:['admin']},
    ]
  },
  {path: '*', component: NotFoundView,permission:['admin','developer']}
];

// 权限路由设置
let userInfo = VueCookies.get('user-info');
if (userInfo) {
  for (let index in routes){
    if (routes[index].permission.indexOf(userInfo.access)){
      routes.splice(index,1);
    }
    for(let index2 in routes[index].children){
      if (routes[index].children[index2].permission.indexOf(userInfo.access)){
        routes[index].children.splice(index2,1);
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
  if (!auth.loggedIn() && route.path !== '/login' && route.path !=='/register') {
   next({
     path: '/login',
     query: {redirect: route.fullPath}
   })
 } else {
    next()
  }
})

export default router
