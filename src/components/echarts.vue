<template>
  <div ref='eChart' :style="{width: '100%',height: height+'px'}" :height="height" :option="option"
       :alterOp="alterOption"></div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts/theme/dark.js'
  import {getLocalKey} from "common/utils";
  window.localStorage.getItem('state.themecolor') && window.localStorage.getItem('state.themecolor') !== '#fff' ? import(`@/assets/eCharts/theme/${window.localStorage.getItem('state.themecolor')}/index.js`) : '';

  export default {
    name: "echartTemplate",
    data() {
      return {
        theme: window.localStorage.getItem('state.themecolor') && window.localStorage.getItem('state.themecolor') !== '#fff' ? 'index' : ''
      }
    },
    props: {
      height: {
        type: Number,
        default: 500
      },
      id: {
        type: String
      },
      option: {
        type: Object
      },
      alterOption: {
        type: Object,
        default: null
      }
    },
    mounted() {
      this.drawLine()
    },

    watch: {
      option: function () {
        this.drawLine()
      },
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.eChart, this.theme);
        // 绘制图表
        myChart.setOption(this.option);
        this.alterOption ? myChart.setOption(this.alterOption) : '';
      },
    }
  }

</script>

<style scoped>


</style>
