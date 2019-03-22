<template>

  <el-submenu :index="item.href" v-if="item && item.children && item.children.length >0" v-permission="item.access"
              class="el-menu-sub">
      <template slot="title" v-permission="item.access"><i :class="item.icon"></i><span>{{$t(item.name)}}</span></template>
    <template v-for="child in item.children">
      <sub-menu v-if="child.children && child.children.length >0"
                v-permission="child.access"
                :param="child"></sub-menu>
        <el-menu-item :index="child.href" v-else v-permission="child.access">
          <i :class="child.icon"></i><span>{{$t(child.name)}}</span>
        </el-menu-item>

    </template>
  </el-submenu>
  <el-menu-item :index="item.href" v-else v-permission="item.access" class="el-menu-each">
    <i :class="item.icon"></i><span>{{$t(item.name)}}</span>
  </el-menu-item>
</template>


<script>
  import subMenu from "./subMenu.vue"


  export default {
    name: 'subMenu',
    props: ['param'],
    data: function () {
      return {item: this.param}
    },
    methods: {
      permission(access) {
        return this.$permission(access)
      }
    },
    components: {
      subMenu
    },
    mounted() {
      // console.log(this.item.access)
    }
  }
</script>
<style>
  .el-menu .fa {
    margin-right: 10px;
  }
</style>
