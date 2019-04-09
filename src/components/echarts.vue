<template>
  <div ref='eChart' :style="{width: '100%',height: height+'px'}"></div>
</template>

<script>
  VueCookies.get('themeColor') ? import(`@/assets/eCharts/theme/${VueCookies.get('themeColor')}/index.js`) : '';
  import echarts from 'echarts'
  import 'echarts/theme/dark.js'
  import {getLocalKey} from "common/utils";
  import VueCookies from "vue-cookies/vue-cookies"

  export default {
    name: "echartTemplate",
    data() {
      return {
        theme:this.$cookies.get('themeColor') ? 'index' : '',
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
      alterOp:function () {
        this.drawLine()
      }
    },
    beforeMount() {
      window.addEventListener('resize', ()=>{this.resize()});
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.eChart, this.theme);
        // 绘制图表
        myChart.setOption(this.option);
        this.alterOption ? myChart.setOption(this.alterOption) : '';
      },
      resize(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.eChart, this.theme);
        // 绘制图表
        myChart.setOption(this.option);
        this.alterOption ? myChart.setOption(this.alterOption) : '';
        myChart.resize();
      }
    }
  }

</script>

<style scoped>


</style>
