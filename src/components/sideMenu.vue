<template>
  <aside class="main-sidebar animated"
         :class="{ showSlide: sidebar.show, hideSlide: !sidebar.show, expandSide:(!sidebar.collapsed||device.isMobile)}">
    <el-scrollbar tag="div" wrapClass="vue-scrollbar" v-if="(!sidebar.collapsed||device.isMobile)">
      <div class="sidebar">
        <el-menu :default-active="onRoutes"
                 :default-openeds="onRouteKeys"
                 class="el-menu-style"
                 :unique-opened="true"
                 theme="light" router :collapse="sidebar.collapsed&&!device.isMobile" @select="handleSelect">
          <template v-for="item in menuList">
            <sub-menu :param="item"></sub-menu>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>
    <div class="sidebar" v-else>
      <el-menu :default-active="onRoutes"
               class="el-menu-style"
               theme="light" router :collapse="sidebar.collapsed&&!device.isMobile" @select="handleSelect">
        <template v-for="item in menuList">
          <sub-menu :param="item"></sub-menu>
        </template>
      </el-menu>
    </div>
  </aside>
</template>
<script>
  import subMenu from "./subMenu.vue"
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from "../store/mutation-types"

  export default {
    props: {
      show: Boolean,
    },
    data() {
      return {}
    },
    components: {
      subMenu,
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',
      }),
      onRoutes() {
        return this.$route.path;
      },
      onRouteKeys() {
        const getParentArray = (path, ms, kas = []) => {
          if (ms && ms.length > 0) {
            for (let k = 0, length = ms.length; k < length; k++) {
              if (path == ms[k].href) {
                kas.push(ms[k].href);
                break;
              }
              let i = kas.length;
              if (ms[k].children && ms[k].children.length > 0) {
                getParentArray(path, ms[k].children, kas);
              }
              if (i < kas.length) {
                kas.push(ms[k].href);
              }
            }
          }
          return kas.reverse();
        }
        return getParentArray(this.$route.path, this.menuList);
      },
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'menuList'
      ])
    },
    mounted() {
      let route = this.$route
//      console.log(route)
//      if (route.name) {
//        this.shouldExpandMatchItem(route)
//      }
    },
    created: function () {
      this.load();
    },
    methods: {
      handleSelect() {
        if (this.device.isMobile) {
          this.toggleSidebarShow(false);
        }
      },
      //mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用
      //将this.toggleSidebarShow() 映射为this.#store.commit(types.TOGGLE_SIDEBAR_SHOW)
      ...mapMutations({
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
      }),
      ...mapActions({
        load: 'loadMenuList' // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
      })
    }
  }
</script>
<style>

  .showSlide {
    animation-duration: .2s;
    animation-name: slideInLeft;
  }

  .hideSlide {
    animation-duration: .2s;
    animation-name: slideOutLeft;
  }

  .main-sidebar {
    position: fixed;
    top: 41px;
    left: 0;
    bottom: 0;
    height: calc(100vh - 40px);
    width: 44px;
    z-index: 9999;
    -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }

  .expandSide {
    width: 230px;
  }


  .el-menu-style .el-submenu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }

  .el-menu-style .el-menu-item,
  .el-menu-style .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }

  .main-sidebar .el-menu--collapse {
    width: 44px;
  }

  .main-sidebar .el-menu--collapse > .el-menu-item,
  .main-sidebar .el-menu--collapse > .el-submenu > .el-submenu__title {
    padding-left: 13px !important;
  }

  .vue-scrollbar {
    height: calc(100vh - 50px)!important;
  }
  .vue-scrollbar .el-scrollbar__view{
    overflow-x: hidden;
  }
  .main-sidebar .el-scrollbar__bar.is-vertical {
    display: none;
  }

  .sidebar {
    min-height: 450px;
  }

</style>
