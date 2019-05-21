<template>
  <div ref='eChart' :style="{width: '100%',height: height+'px'}"></div>
</template>

<script>
  import echarts from 'echarts'
  import * as api from "../api";

  export default {
    name: "echartTemplate",
    data() {
      const themeColor = this.$cookies.isKey('themeColor') ? this.$cookies.get('themeColor') : api.DEFAULT_THEME;
      return {
        themeColor: themeColor
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
      alterOp: function () {
        this.drawLine()
      },
    },
    beforeMount() {
      window.addEventListener('resize', () => {
        this.resize()
      });
    },
    methods: {
      drawLine() {
        import(`@/assets/theme/eCharts/${this.themeColor}/index.json`).then(res => {
          console.log(res);
          echarts.registerTheme('index', res);
          let myChart = echarts.init(this.$refs.eChart, 'index');
          // 绘制图表
          myChart.setOption(this.option);
          this.alterOption ? myChart.setOption(this.alterOption) : '';
        });
      },
      resize() {
        import(`@/assets/theme/eCharts/${this.themeColor}/index.json`).then(res => {
          echarts.registerTheme('index', res);
          let myChart = echarts.init(this.$refs.eChart, 'index');
          // 绘制图表
          myChart.setOption(this.option);
          this.alterOption ? myChart.setOption(this.alterOption) : '';
          myChart.resize();
        });

      }
    }
  }

</script>

<style scoped>


</style>
