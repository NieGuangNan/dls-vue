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
// import resource from "pages/sys/resource.vue";
import login from "pages/login.vue";
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
import defaultValue from "@/services/default"
import {setCookie, getCookie, delCookie} from '@/common/utils';




//加载路由中间件
Vue.use(VueRouter)

const routes =[
  {path: '/login', component: login,permission:['admin','developer']},
  {
    path: '/test/1', component: app,permission:['developer'], children: [
      {path: '/test/1/1/1', component: tableShow,permission:['admin','developer']},
      {path: '/test/1/1/2', component: treeTable,permission:['admin','developer']},
      {path: '/test/1/2', component: demo1,permission:['admin','developer']},
      {path: '*', component: NotFoundView,permission:['admin','developer']}
    ]
  },
  {
    path: '/test/2', component: app,permission:['admin','developer'], children: [
      {path: '/test/2/1', component: bar,permission:['developer']},
      {path: '/test/2/2', component: mixedChart,permission:['admin','developer']},
      {
        path: '/test/2/3',
        component: demo2,
        permission: ['admin', 'developer']
      },
      {path: '*', component: NotFoundView,permission:['admin','developer']}
    ]
  },
  {
    path: '', component: app,permission:['admin','developer'], children: [
      {path: '/resetPwd', component: resetPwd,permission:['admin','developer']},
      {path: '/', component: dashboard,permission:['admin','developer']},
      {path: '/sys/menuList', component: menuList,permission:['admin']},
      {path: '/sys/roleList', component: role,permission:['admin']},
      {path: '/sys/userList', component: sysUser,permission:['admin']},
      {path: '/sys/userAdd', component: userAdd,permission:['admin']},
      // {path: '/sys/resource', component: resource}
    ]
  },
  {path: '*', component: NotFoundView,permission:['admin','developer']}
];

// 权限路由设置
let userInfo = getCookie('user-info');
let userOb=JSON.parse(userInfo);
if (userInfo) {
  for (let index in routes){
    if (routes[index].permission.indexOf(userOb.access)){
      routes.splice(index,1);
    }
    for(let index2 in routes[index].children){
      if (routes[index].children[index2].permission.indexOf(userOb.access)){
        routes[index].children.splice(index2,1);
      }
    }
  }
}




//定义路由
const router = new VueRouter({
  routes: routes,
  mode: 'history'
});



sync(store, router)

const {state} = store

router.beforeEach((route, redirect, next) => {
  if (state.device.isMobile && state.sidebar.opened) {
    store.commit(types.TOGGLE_SIDEBAR, false)
  }
  if (!auth.loggedIn() && route.path !== '/login') {
    next({
      path: '/login',
      query: {redirect: route.fullPath}
    })
  } else {
    next()
  }
})

export default router
