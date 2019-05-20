<template>
  <header class="main-header animated" :class="{closeLogo:sidebar.collapsed,mobileLogo:device.isMobile}">
    <a href="#" class="logo">
      <span class="logo-lg"><i class="fa fa-gem"></i>&nbsp;
        <b>Vue-Admin</b>
      </span>
    </a>
    <nav class="navbar">
      <div class="navber-left">
        <a href="#" class="sidebar-toggle" v-if="onOffMenu" data-toggle="offcanvas" role="button"
           @click.stop.prevent="toggleMenu(!sidebar.collapsed,device.isMobile)">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <el-breadcrumb separator="/" style="margin-bottom: 20px;">
          <template v-if="!onOffMenu">
            <el-breadcrumb-item>{{$t('message.menu.home')}}</el-breadcrumb-item>
          </template>
          <template v-for="child in currentMenus" v-else>
            <el-breadcrumb-item >{{$t(child.name)}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div class="navber-right">
        <div class="navbar-custom-menu">
          <template>
            <span>{{userInfo.name}}</span>
          </template>
          <el-dropdown trigger="click" class="navbar-dropdown">
            <span class="el-dropdown-link">
              <i class="fal fa-user" style="font-size: 18px;"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="$t('message.lang') != 'language:English'">
                <el-button type="text" @click="toogleLanguage = true">切换{{$t('message.lang')}}</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="$t('message.lang') != 'language:English'">
                <el-button type="text" @click="toogleTheme = true" v-if="themeColor == 'white'">切换主题：天青</el-button>
                <el-button type="text" @click="toogleTheme = true" v-if="themeColor == 'dark'">切换主题：暗月</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="$t('message.lang') == 'language:English'">
                <el-button type="text" @click="toogleLanguage = true">Change {{$t('message.lang')}}</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-if="$t('message.lang') == 'language:English'">
                <el-button type="text" @click="toogleTheme = true" v-if="themeColor == 'white'">Change Theme:Light Green</el-button>
                <el-button type="text" @click="toogleTheme = true" v-if="themeColor == 'dark'">Change Theme:Dark Orange</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="logout">{{$t('message.header.btn2')}}</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown class="navbar-dropdown" trigger="click">
            <div class="el-dropdown-link" style="height: auto;line-height: inherit">
              <el-badge :value="count" class="item">
                <i class="fal fa-envelope" style="font-size: 18px;"></i>
              </el-badge>
            </div>
            <el-dropdown-menu slot="dropdown">
              <ul class="message-list">
                <li v-for="(item,index) in list">
                  <router-link :to="{path:'/sys/',query:{id:item.id}}">
                    <p>{{index + 1}}. {{item.title}}</p>
                  </router-link>
                </li>
              </ul>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown class="navbar-dropdown"><span class="el-dropdown-link"><i class="fal fa-home" style="font-size: 18px;"></i></span></el-dropdown>
        </div>
      </div>

    </nav>
    <el-dialog title="语言" :visible.sync="toogleLanguage" width="30%" top="0" append-to-body=true :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form>
        <el-form-item>
          <el-dropdown-item @click.native="toggleLang('zh')" :disabled="$i18n.locale == 'zh'">中文</el-dropdown-item>
        </el-form-item>
        <el-form-item>
          <el-dropdown-item @click.native="toggleLang('en')" :disabled="$i18n.locale == 'en'">English</el-dropdown-item>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="主题" :visible.sync="toogleTheme" width="30%" top="0" append-to-body=true :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form>
        <el-form-item>
          <el-radio-group v-model="themeColor">
            <el-radio label="dark">暗月</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="themeColor">
            <el-radio label="white">天青</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-dialog>
  </header>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from "store/mutation-types"
  import * as api from "../../api"
  import auth from 'common/auth'
  import * as sysApi from '../../services/sys'
  import {toggleClass} from 'common/utils'

  export default {
    inject: ['reload'],
    data() {
      return {
        showMessageBox: false,
        showProfileBox: false,
        list: [],
        count: 4,
        show: true,
        breadcrumb: [],
        toogleLanguage: false,
        toogleTheme: false
      }
    },
    props:{
      onOffMenu: {
        type: Boolean,
        default: true
      },
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        userInfo: 'userInfo',
        device: 'device',
        currentMenus: 'currentMenus',
      }),
      themeColor: {
        get() {
          return this.$store.state.themeColor;
        },
        set(val) {
          this.$store.commit('setThemeColor', val);
          location.reload();
        }
      }
    },

    methods: {
      ...mapActions({
        changeCurrentMenu: 'changeCurrentMenu' // 映射 this.changeCurrentMenu() 为 this.$store.dispatch('changeCurrentMenu')
      }),
      toggleLang(lang) {
        if (lang == 'zh') {
          this.$cookies.set('locale', 'zh');
          this.$i18n.locale = this.$cookies.get('locale');
        } else if (lang == 'en') {
          this.$cookies.set('locale', 'en');
          this.$i18n.locale = this.$cookies.get('locale');
        }
        console.log(this.$i18n.locale);
        this.reload();
        this.toogleLanguage=false;
      },
      toggleMenu(collapsed, isMobile) {
        if (isMobile) {
          this.toggleSidebarShow();
        } else {
          this.toggleSidebar();
        }
      },
      logout() {
        this.$http.get(api.LOGOUT)
          .then(res => {
            auth.logout();
            this.$http.defaults.headers.common['authSid'] = '';
            this.$router.push({path: '/login'});
          }).catch(error => {
          auth.logout();
          this.$http.defaults.headers.common['authSid'] = '';
          this.$router.push({path: '/login'});
        })
      },
      ...mapMutations({
        toggleSidebar: types.TOGGLE_SIDEBAR,
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
        setUserInfo: types.SET_USER_INFO,
      }),
      toggleMessage() {
        this.showMessageBox = !this.showMessageBox;
      },
      toggleProfile() {
        this.showProfileBox = !this.showProfileBox;
      },
      autoHide(evt) {
        if (!this.$el.querySelector('li.messages-menu').contains(evt.target)) {
          this.showMessageBox = false
        }
        if (!this.$el.querySelector('li.user-menu').contains(evt.target)) {
          this.showProfileBox = false
        }
      }
    },
    created() {
      let item = window.sessionStorage.getItem("user-info");
      if (!!item) {
        this.setUserInfo(JSON.parse(item));
      }
      this.count = 0;
      this.list = [];
      sysApi.msgList()
        .then(res => {
          if (res && res.length > 0) {
            this.count = res.length;
            this.list = res;
          }
        })
    },
    mounted() {
      this.$cookies.set('menu', JSON.stringify(this.currentMenus));
    },
    destroyed() {
      // document.removeEventListener('click', this.autoHide, false)
    },
    watch: {
      currentMenus() {

        this.$cookies.set('menu', JSON.stringify(this.currentMenus));
        // console.log(this.$cookies.get('menu'))
      }
    }
  }
</script>
<style scoped>

  *{
    list-style: none;
  }
  .animated {
    animation-duration: .2s;
  }

  .main-header a {
    text-decoration: none;
  }

  .main-header {
    position: fixed;
    min-width: 100%;
    z-index: 1999;
    animation-name: slideInDown;
    animation-fill-mode: both;
    border-bottom: 1px solid rgb(54, 56, 57) !important;
  }

  .main-header .navbar .sidebar-toggle {
    float: left;
    background-color: transparent;
    background-image: none;
    padding: 0 15px;
    font-family: fontAwesome;
    line-height: 40px;
  }

  .main-header .navbar .sidebar-toggle:before {
    content: "\f03b";
  }


  .main-header .logo {
    -webkit-transition: width 0.3s ease-in-out;
    -o-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    display: block;
    float: left;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    width: 230px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0 15px;
    font-weight: 300;
    overflow: hidden;
    text-decoration: none;
  }

  .main-header .logo .logo-lg {
    display: block;
    height: 38px;
    line-height: 38px;
    /*margin-top: 6px;*/
  }

  .main-header .navbar {
    -webkit-transition: margin-left 0.3s ease-in-out;
    -o-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
    margin-bottom: 0;
    margin-left: 230px;
    border: none;
    min-height: 40px;
    border-radius: 0;
  }

  .layout-top-nav .main-header .navbar {
    margin-left: 0;
  }


  body.hold-transition .main-header .navbar,
  body.hold-transition .main-header .logo {
    -webkit-transition: none;
    -o-transition: none;
    transition: none;
  }

  .main-header .navbar .sidebar-toggle {
    display: block;
  }


  .main-header .logo {
    border-bottom: 0 solid transparent;
  }


  @media (max-width: 800px) {

    .main-header .logo {
      display: none;
    }

    .main-header .navbar {
      margin: 0;
    }

    .main-header .logo, .main-header .navbar {
      width: 100%;
      float: none;
    }

  }

  .main-header.closeLogo .navbar {
    margin-left: 44px;
  }

  .main-header.closeLogo .logo {
    width: 44px;
    padding: 0 8px;
  }

  .main-header.closeLogo .logo .logo-lg b {
    display: none;
  }

  .main-header.closeLogo .sidebar-toggle {
    background: #f9f9f9;
  }

  .main-header.closeLogo .navbar .sidebar-toggle:before {
    content: "\f03c";
  }

  .main-header.mobileLogo .navbar .sidebar-toggle:before {
    content: "\f03a";
  }

  .navbar-custom-menu {
    float: right;
    color: #fff;
  }
  .navbar-dropdown.el-dropdown{
    height:40px;
    font-weight: 500;
  }
  .navbar-custom-menu .el-dropdown-link {
    display: inline-block;
    cursor: pointer;
    padding: 8px 5px 7px;
    min-width: 50px;
    text-align: center;

  }
  .message-list {
    list-style: none;
    padding: 0 10px;
  }

  .message-list li {
    list-style: none;
    height: 25px;
    line-height: 25px;
  }

  .message-list li a {
    text-decoration: none;
  }


  .el-dropdown-menu .header-pic {
    text-align: center;
    padding: 20px;

  }

  .el-dropdown-menu .header-pic img {
    vertical-align: middle;
    height: 90px;
    width: 90px;
    border: 3px solid;
  }

  .el-dropdown-menu .header-pic p {
    font-size: 1.5rem;
  }

  .el-dropdown-menu .pull-left {
    padding: 10px;
    display: inline-block;
    float: left;

  }

  .el-dropdown-menu .pull-right {
    padding: 10px;
    float: right;
    display: inline-block;

  }

  .el-breadcrumb {
    float: left;
    line-height: 40px;
    font-weight: bold;
    margin: 0 !important;;

  }
  .el-dialog{
    margin-top: 0!important;
  }
</style>
