<template>
  <div class="wrapper fixed" v-if="isShow">
    <vue-progress-bar></vue-progress-bar>
    <imp-header :onOffMenu="onOffMenu" v-if="onOffHeader"></imp-header>
    <side-menu v-if="onOffMenu"></side-menu>
    <div class="content-wrapper" :class="{ slideCollapse: sidebar.collapsed,mobileSide:device.isMobile,marginLeft:onOffMenu,paddingTop:onOffHeader}">
      <el-scrollbar tag="div" wrap-class="!onOffHeader?horizontalPadding:content-scrollbar">
        <section class="content">
          <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
            <router-view :bodyHeight="$root.bodyHeight" v-if="isRouterAlive" v-on:sideMenuOnOff="sideMenuOnOff" v-on:headerOnOff="headerOnOff"></router-view>
          </transition>
        </section>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import sideMenu from './components/sideMenu.vue'
  import impHeader from "./pages/layout/header.vue"
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from "./store/mutation-types"
  import 'animate.css'

  export default {
    name: 'app',
    provide() {
      return {
        reload: this.reload
      }
    },

    components: {
      sideMenu,
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
        onOffMenu:true,// 控制侧边菜单
        onOffHeader:true,// 控制header
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
      // 控制侧边菜单
      sideMenuOnOff(childValue) {
        this.onOffMenu= childValue;
      },
      // 控制header
      headerOnOff(childValue) {
        this.onOffHeader= childValue;
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

  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  }
  .content-scrollbar {
    height: calc(100vh - 35px) !important;
  }

  .content-wrapper .el-scrollbar__bar.is-vertical {
    display: none;
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
  .marginLeft{
    margin-left: 230px;
  }
  .paddingTop{
    padding-top:40px;
  }
  .horizontalPadding{
    padding: 0;
    margin-top: -0.5rem;
  }


</style>
