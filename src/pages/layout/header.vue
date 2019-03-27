<template>
  <header class="main-header animated" :class="{closeLogo:sidebar.collapsed,mobileLogo:device.isMobile}">
    <a href="#" class="logo">
      <span class="logo-lg"><i class="fa fa-diamond"></i>&nbsp;
        <b>Vue-Admin</b>
      </span>
    </a>
    <nav class="navbar">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"
         @click.stop.prevent="toggleMenu(!sidebar.collapsed,device.isMobile)">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <el-breadcrumb separator="/" style="margin-bottom: 20px;">

        <template v-if="!currentMenus||currentMenus.length===0">
          <el-breadcrumb-item >{{$t('message.menu.dashboard')}}</el-breadcrumb-item>
        </template>
        <template v-for="child in currentMenus">
          <el-breadcrumb-item >{{$t(child.name)}}</el-breadcrumb-item>
        </template>

      </el-breadcrumb>
      <div class="navbar-custom-menu">
        <template>
          <el-radio-group v-model="themecolor">
            <el-radio label="#fff">备选项1</el-radio>
            <el-radio label="409eff">备选项2</el-radio>
          </el-radio-group>
        </template>
        <el-dropdown trigger="click" class="navbar-dropdown">
          <span class="el-dropdown-link">
            {{$t('message.lang')}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toggleLang('zh')" :disabled="$i18n.locale == 'zh'">中文</el-dropdown-item>
            <el-dropdown-item @click.native="toggleLang('en')" :disabled="$i18n.locale == 'en'">English
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="navbar-dropdown" trigger="click">
          <div class="el-dropdown-link" style="height: auto;line-height: inherit">
            <el-badge :value="count" class="item">
              <i class="fa fa-envelope-o"></i>
            </el-badge>
          </div>
          <el-dropdown-menu slot="dropdown">
            <ul class="message-list">
              <li v-for="(item,index) in list"><!-- start message -->
                <router-link :to="{path:'/sys/message',query:{id:item.id}}">
                  <p>{{index + 1}}. {{item.title}}</p>
                </router-link>
              </li>
            </ul>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" class="navbar-dropdown">
          <div class="el-dropdown-link">
            <img :src='userInfo.avatar' style="width: 25px;height: 25px;border-radius: 50%; vertical-align: middle;"
                 alt="U">
            {{userInfo.name}}
          </div>
          <el-dropdown-menu style="padding: 0px" slot="dropdown">
            <div>
              <div class="header-pic">
                <img :src='userInfo.avatar' class="img-circle" alt="User Image">
                <p>{{userInfo.name}}</p>
              </div>
              <div class="pull-left">
                <router-link :to="{ path: '/resetPwd' }">
                  <el-button type="default">{{$t('message.header.btn1')}}</el-button>
                </router-link>
              </div>
              <div class="pull-right">
                <el-button type="default" @click="logout">{{$t('message.header.btn2')}}</el-button>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </nav>

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
      }
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        userInfo: 'userInfo',
        device: 'device',
        currentMenus: 'currentMenus',
      }),
      themecolor: {
        get() {
          return this.$store.state.themecolor;
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
          this.$i18n.locale =this.$cookies.get('locale');
          this.$message({
            message: '切换为中文！',
            type: 'success'
          })
          console.log(this.$i18n.locale);
        } else if (lang == 'en') {
          this.$cookies.set('locale', 'en');
          this.$i18n.locale = this.$cookies.get('locale');
          this.$message({
            message: 'Switch to English!',
            type: 'success'
          })
          console.log(this.$i18n.locale);
        }
        this.reload();
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
      console.log(this.currentMenus);
    },
    destroyed() {
      // document.removeEventListener('click', this.autoHide, false)
    },
    watch:{
      currentMenus(){

        this.$cookies.set('menu', JSON.stringify(this.currentMenus));
        // console.log(this.$cookies.get('menu'))
      }
    }
  }
</script>
<style scoped>


  .animated {
    animation-duration: .2s;
  }

  .main-header a {
    text-decoration: none;
  }

  .main-header {
    position: fixed;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    z-index: 1999;
    animation-name: slideInDown;
    animation-fill-mode: both;
  }

  .main-header .navbar .sidebar-toggle {
    float: left;
    background-color: transparent;
    background-image: none;
    padding: 16px 15px;
    font-family: fontAwesome;
    /*line-height: 20px;*/
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
    height: 50px;
    font-size: 20px;
    line-height: 50px;
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
    margin-top: 6px;
  }

  .main-header .navbar {
    -webkit-transition: margin-left 0.3s ease-in-out;
    -o-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
    margin-bottom: 0;
    margin-left: 230px;
    border: none;
    min-height: 50px;
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
  }

  .navbar-custom-menu .el-dropdown-link {
    cursor: pointer;
    height: 50px;
    padding: 15px 5px;
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
  .el-breadcrumb{

    display: inline-block;
    line-height: 50px;
    font-weight: bold;
    margin-bottom: 0!important;
  }




</style>
