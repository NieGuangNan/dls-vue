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
import resource from "pages/sys/resource.vue";
import login from "pages/login.vue";
import app from "../App.vue";
import sysUser from "pages/sys/user.vue";
import userAdd from "pages/sys/userAdd.vue";
import resetPwd from "pages/resetPwd.vue";
import bar from "pages/charts/bar.vue";
import tableShow from "pages/table/tableShow"
import treeTable from "pages/table/treeTable";
import mixedChart from "pages/charts/mixedChart.vue"


//加载路由中间件
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: [
    {path: '/login', component: login},
    {
      path: '/test', component: app, children: [
        {path: '/test/1/1/1', component: tableShow},
        {path: '/test/1/1/2', component: treeTable},
        {path: '/test/2/1', component: bar},
        {path: '/test/2/2', component: mixedChart},
        {path: '*', component: NotFoundView}
      ]
    },
    {
      path: '', component: app, children: [
        {path: '/resetPwd', component: resetPwd},
        {path: '/index', component: dashboard},
        {path: '/sys/menuList', component: menuList},
        {path: '/sys/roleList', component: role},
        {path: '/sys/userList', component: sysUser},
        {path: '/sys/userAdd', component: userAdd},
        {path: '/sys/resource', component: resource}
      ]
    },
    {path: '*', component: NotFoundView}
  ],
  mode: 'history'
})

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
