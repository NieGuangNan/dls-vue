import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types";
import defaultValue from "../services/default";
import * as api from "../api";
import {getCurrentMenu, getSessionKey, getLocalKey, addTheme, getCookie} from '../common/utils'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)


const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',  //直接修改state 抛出异常

  // getter可认为是store中的计算属性一样，返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
  //state做为第一个参数 getter可以作为第二个参数
  getters: {
    loading: state => state.loading,
    menuList: state => state.menuList,
    routeList: state => state.routeList,
    sidebar: state => state.sidebar,
    userInfo: state => state.userInfo,
    device: state => state.device,
    // themecolor: state => state.themecolor,
    currentMenus: state => state.currentMenus,
  },
  state: {
    loading: false,
    menuList: {},
    routeList: {},
    themeColor: VueCookies.get("themeColor") ? VueCookies.get("themeColor") : api.DEFAULT_THEME,
    sidebar: {
      collapsed: getSessionKey('state.sidebar.collapsed', 'false') === 'true',
      show: getSessionKey('state.sidebar.show', 'true') === 'true',
    },
    device: {
      isMobile: false
    },
    userInfo: VueCookies.get("user-info"),
    currentMenus: JSON.parse(VueCookies.get("menu")),
  },
  // 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
  // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
  mutations: {
    //更新主题颜色
    setThemeColor(state, curColor) {
      VueCookies.set("themeColor", curColor);
      state.themeColor = VueCookies.get('themeColor');
    },
    //只能同步的函数
    // 使用常量替代 Mutation 事件类型
    [types.TOGGLE_DEVICE](state, isMobile) {
      state.device.isMobile = isMobile
    },
    [types.TOGGLE_LOADING](state) {
      state.loading = !state.loading
    },
    [types.LOAD_MENU](state, menu) {
      state.menuList = menu;
    },
    [types.LOAD_ROUTE](state, route) {
      state.RouteList = route;
    },
    [types.LOAD_CURRENT_MENU](state, menu) {
      state.currentMenus = menu;
    },
    [types.SET_USER_INFO](state, info) {
      state.userInfo = info;
    },
    [types.TOGGLE_SIDEBAR](state, collapsed) {
      if (collapsed == null) collapsed = !state.sidebar.collapsed;
      state.sidebar.collapsed = collapsed;
      window.sessionStorage.setItem("state.sidebar.collapsed", collapsed)
    },
    [types.TOGGLE_SIDEBAR_SHOW](state, show) {
      if (show == null) state.sidebar.show = !state.sidebar.show;
      else {
        state.sidebar.show = show;
      }
      window.sessionStorage.setItem("state.sidebar.show", state.sidebar.show)
    },
  }, actions: {
    //异步的函数
    //提交 mutation 的另一种方式是直接使用包含 type 属性的对象
    //es6参数解构简化代码  等价于function({context}){context.commit('types.TOGGLE_LOADING')}
    // 等价于 function({commit:context.commit}){context.commit('types.TOGGLE_LOADING')}
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    toggleLoading: ({commit}) => commit(types.TOGGLE_LOADING),
    loadMenuList: ({commit}) => {
      Vue.axios.get(api.SYS_MENU_LIST).then(res => {
        commit(types.LOAD_MENU, res.data);
      }).catch(exp => commit(types.LOAD_MENU, defaultValue.menuList));
    },
    loadRouteList: ({commit}) => {
      Vue.axios.get(api.SYS_ROUTE_LIST).then(res => {
        commit(types.LOAD_ROUTE, res.data);
      }).catch(exp => commit(types.LOAD_ROUTE, defaultValue.menuList));
    },

    changeCurrentMenu: ({state, commit}, {path, matched, fullPath}) => {

      const a = getCurrentMenu(fullPath, state.menuList);
      commit(types.LOAD_CURRENT_MENU, a.reverse());
    }
  },
})
// Action 通过 store.dispatch 方法触发：
// store.dispatch('toggleLoading')
export default store

// store.commit(types.LOAD_MENU,参数)
