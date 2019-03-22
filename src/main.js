import 'babel-polyfill'
import Vue from "vue";
// function switchTheme(themeName) {
//   import(`@/assets/css/theme/${themeName}/index.css`)
// }
// switchTheme('aaa');
import frame from "./frame.vue";
import router from "./router";
import store from "./store";
import axios from "./common/axios";
import filters from "./filters";
import VueProgressBar from "vue-progressbar";
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import ImpPanel from "./components/panel.vue";
import '@/assets/css/theme.css';
import i18n from './i18n';
import {setCookie, getCookie, delCookie} from 'common/utils';
import(`@/assets/css/theme/${window.localStorage.getItem('state.themecolor') ? window.localStorage.getItem('state.themecolor') : '#fff'}/index.css`);
// import '@/assets/css/theme/bbb/index.css';


Vue.prototype.$http = axios
Vue.axios = axios
Vue.http = axios;
Vue.use(axios);
Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}

Vue.use(Element);

Vue.component(ImpPanel.name, ImpPanel);

Vue.use(VueProgressBar, {
  color: '#eeeeee',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})




new Vue({
  store,
  router,
  el: "#root",
  i18n,
  render: h => h(frame)
})
