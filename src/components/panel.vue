<template>
  <div>
    <div class="topBar"></div>
    <div class="ibox">
      <div class="box">
        <div class="box-header" v-if="title || $slots.header" :class="{'with-border':widthBorder}">
          <slot name="header"><h3 class="box-title" v-text="title" v-if="title"></h3></slot>
        </div>
        <div class="box-body">
          <slot name="body" v-if="$slots.body">
            暂无内容显示
          </slot>
          <slot v-else>
          </slot>
        </div>
        <div class="box-footer" v-text="footer" v-if="footer">
        </div>
      </div>
    </div>
  </div>


</template>
<script type="text/javascript">
  export default{
    name:"ImpPanel",
    props: {
      widthBorder:{
          type:Boolean
      },
      title: {
        type: String
      },
      footer: {
        type: String
      }
    }
  }
</script>
<style scoped>
  .box {
    position: relative;
    border-radius: 5px;
    margin: 0 1rem 1rem;

  }

  .box-header:before,
  .box-body:before,
  .box-footer:before,
  .box-header:after,
  .box-body:after,
  .box-footer:after {
    content: " ";
    display: table;
  }
  .box-header:after,
  .box-body:after,
  .box-footer:after {
    clear: both;
  }
  .box-header {
    display: block;
    padding: 15px;
    position: relative;
  }

  .collapsed-box .box-header.with-border {
    border-bottom: none;
  }
  .box-header > .fa,
  .box-header > .glyphicon,
  .box-header > .ion,
  .box-header .box-title {
    display: inline-block;
    font-size: 18px;
    margin: 0;
    line-height: 1;
  }
  .box-header > .fa,
  .box-header > .glyphicon,
  .box-header > .ion {
    margin-right: 5px;
  }
  .box-header > .box-tools {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .box-header > .box-tools [data-toggle="tooltip"] {
    position: relative;
  }
  .box-header > .box-tools.pull-right .dropdown-menu {
    right: 0;
    left: auto;
  }


  .box-body {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 10px;
  }

  .box-footer {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 10px;

  }
</style>
