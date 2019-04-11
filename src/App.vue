<template>
  <div class="wrapper fixed" v-if="isShow">
    <vue-progress-bar></vue-progress-bar>
    <imp-header></imp-header>
    <side-menu></side-menu>
    <div class="content-wrapper" :class="{ slideCollapse: sidebar.collapsed,mobileSide:device.isMobile}">
      <el-scrollbar tag="div" wrap-class="content-scrollbar">
        <section class="content">
          <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
            <router-view :bodyHeight="$root.bodyHeight" v-if="isRouterAlive"></router-view>
          </transition>
        </section>
      </el-scrollbar>
      <!--<imp-footer></imp-footer>-->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import sideMenu from './components/sideMenu.vue'
  import impHeader from "./pages/layout/header.vue"
  import impFooter from "./pages/layout/footer.vue"
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from "./store/mutation-types"
  import 'animate.css'
  import {setCookie, getCookie, delCookie} from 'common/utils';

  export default {
    name: 'app',
    provide() {
      return {
        reload: this.reload
      }
    },

    components: {
      sideMenu,
      impFooter,
      impHeader,
    },
    computed: {

      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',

      })

    },
    data: function () {
      return {
        active: true,
        isShow: false,
        headerFixed: true,
        breadcrumb: [],
        isRouterAlive: true,
      }
    },
    methods: {
      token() {
        this.$http.post('http://localhost:9990/oauth/token', {
          client_id: 'platform',
          client_secret: 'platform-secret',
          grant_type: 'password',
          username: 'admin',
          password: 'mckyf666'
        },).then((res) => {
          console.log(res)

        })
      },
      setLanguage() {
        let language = this.$cookies.get("user-info") && this.$cookies.get("user-info").language ? this.$cookies.get("user-info").language : 'zh';
        this.$i18n.locale = this.$cookies.get('locale') ? this.$cookies.get('locale') : language;

      },
      timer() {
        let timer = setInterval(() => {
          if (document.readyState === 'interactive' || document.readyState === 'complete') {
            this.isShow = true;
            window.clearInterval(timer)
          }
        }, 100)
      },
      ...mapMutations({
        toggleDevice: types.TOGGLE_DEVICE,
        toggleSidebar: types.TOGGLE_SIDEBAR,
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
      }),

      reload() {
        this.isRouterAlive = false;
        this.$nextTick(
          function () {
            this.isRouterAlive = true;
            console.log('我刷新了')
          }
        )
      }
    },
    watch: {
      '$route': function (to, from) {
      },

    },
    beforeMount() {
      this.$i18n.locale = this.$cookies.get('locale');
      const {body} = document
      const WIDTH = 784
      const handler = () => {
        if (!document.hidden) {
          let rect = body.getBoundingClientRect()
          let isMobile = rect.width < WIDTH
          this.toggleDevice(isMobile);
          if (isMobile) {
            this.toggleSidebarShow(false);
            this.toggleSidebar(false);
          } else {
            this.toggleSidebarShow(true);
          }
        }
      }
      const resize = () => {
        // this.reload()
      }
      document.addEventListener('visibilitychange', handler);
      window.addEventListener('DOMContentLoaded', handler);
      window.addEventListener('resize', handler);
      window.addEventListener('resize', resize);


    },

    mounted() {
      this.token();
      this.setLanguage();
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      this.$Progress.finish()
      this.$nextTick(function () {
        this.timer()
      });
      //必须先登入再访问
      if (!this.$cookieStore.getCookie('user-info')) {
        this.$router.push('/login')

      }

    },
    created() {
      // addTheme(getLocalKey('state.themecolor', '#fff'));

      //  [App.vue specific] When App.vue is first loaded start the progress bar
      this.$Progress.start()
      //  hook the progress bar to start before we move router-view
      this.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
//        if (to.meta.progress !== undefined) {
//          let meta = to.meta.progress
//          // parse meta tags
//          this.$Progress.parseMeta(meta)
//        }
        this.$store.dispatch('changeCurrentMenu', to);
        //  start the progress bar
        this.$Progress.start()
        //  continue to next page
        next()
      })
      //  hook the progress bar to finish after we've finished moving router-view
      this.$router.afterEach((to, from) => {
        //  finish the progress bar
//        console.log(JSON.stringify())
        this.$Progress.finish()
      })


//      this.$router.push('/activePublic');
    },
    destroyed() {
      // window.removeEventListener('resize', location.reload())

    }
  }

</script>

<style>
  .animated {
    animation-duration: .2s;
  }

  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }

  *, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  /*.content{*/
  /*background-color: #1c1d1e;*/
  /*}*/
  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    margin-left: 230px;
    padding-top: 40px;
  }

  .content-scrollbar {
    height: calc(100vh - 40px) !important;
  }

  .content-wrapper .el-scrollbar__bar.is-vertical {
    display: none;
  }

  .content-wrapper .content {
    /*padding: 0 1rem 1rem;*/
    margin-top: 1rem;


    /*text-align: center;*/
  }

  .content-wrapper.slideCollapse {
    margin-left: 44px;
  }


  .content-wrapper.mobileSide {
    margin-left: 0px;
  }

  .scrollbar-tree {
    height: 260px !important;
  }


</style>
