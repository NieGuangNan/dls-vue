import '@/assets/css/public.css';  //公共样式
import(`@/assets/css/theme/${VueCookies.isKey('themeColor') ? VueCookies.get('themeColor') : api.DEFAULT_THEME}/index.css`);//主题样式
import 'babel-polyfill'
import Vue from "vue";
import frame from "./frame.vue";
import router from "./router";
import store from "./store";
import axios from "./common/axios";
import filters from "./filters";
import VueProgressBar from "vue-progressbar";
import Element from "element-ui";
import ImpPanel from "./components/panel.vue";
// import '@/assets/css/theme.css';

import i18n from './i18n';
import VueCookies from 'vue-cookies'
import * as api from "./api";
import querystring from 'querystring'
import {setCookie, getCookie, delCookie, permission} from 'common/utils';

Vue.use(VueCookies);
// import '@/assets/css/theme/bbb/index.css';

import vueScroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';

Vue.use(vueScroll);
import "@fortawesome/fontawesome-pro/css/all.css"
 import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠过渡动画
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition);


Vue.prototype.$http = axios;
Vue.axios = axios;
Vue.http = axios;
Vue.use(axios);

Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
};

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

Vue.directive('permission', {
  inserted: function (el, binding) {
    (binding.value && !permission(binding.value)) ? el.remove() : ''
  }
});
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


new Vue({
  store,
  router,
  el: "#root",
  i18n,
  data() {
    return {
      bodyHeight: ''
    };
  },
  methods: {
    getHeight() {
      this.bodyHeight = document.documentElement.clientHeight
    }
  },
  beforeMount() {
    const resize = () => {
      this.getHeight()
    };
    window.addEventListener('resize', resize);
  },
  created() {
    this.getHeight()
  },
  render: h => h(frame)
})
