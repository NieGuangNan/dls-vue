<template>

  <div ref='eChart' :style="{width: '100%',height: height+'px'}" :height="height" :option="option"
       :alterOp="alterOption"></div>

</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "echartTemplate",
    data() {
      return {}
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
      height: function () {
        this.resize();
      },
      option: function () {
        this.drawLine()
      }
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.eChart);
        // 绘制图表
        myChart.setOption(this.option);
        this.alterOption ? myChart.setOption(this.alterOption) : '';
      },
      resize() {
        let myChart = echarts.init(this.$refs.eChart);
        myChart.resize();
      }
    }

  }

</script>

<style scoped>


</style>
