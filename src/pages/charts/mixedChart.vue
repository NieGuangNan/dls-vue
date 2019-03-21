<template>
  <div id="wrap">
    <el-button type="default" @click="a()">测试</el-button>
    <echarts :option="option" :height='bodyHeight/4'></echarts>
    <echarts :option="option1" :height='bodyHeight/4' :alterOption="alterOption"></echarts>
  </div>

</template>

<script>
  import echarts from '@/components/echarts'

  const option = {
    title: {text: '在Vue中使用echarts'},
    tooltip: {},
    xAxis: {
      data: ["数据1", "数据2", "数据3", "数据4", "数据5", "数据6"]
    },
    yAxis: {},
    legend: {
      show: true
    },
    series: [{
      name: '销量',
      color: 'pink',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }, {
      name: '好评数',
      type: 'line',
      color: 'orange',
      data: [8, 20, 39, 14, 20, 25]
    }]
  };
  const option1 = {
    title: {text: '在Vue中使用echarts'},
    tooltip: {},
    xAxis: {
      data: ["数据1", "数据2", "数据3", "数据4", "数据5", "数据6"]
    },
    yAxis: {},
    legend: {
      show: true
    },
    series: [{
      name: '销量666',
      color: 'pink',
      type: 'bar',
      data: [5, 2, 36, 10, 10, 20]
    }, {
      name: '好评数',
      type: 'line',
      color: 'orange',
      data: [8, 2, 39, 14, 20, 25]
    }]
  };

  export default {
    name: "mixedChart",
    components: {echarts},
    props: {
      bodyHeight: {type: Number}
    },
    data() {
      return {
        option: option,
        option1: option1,
        alterOption: {
          legend:{
            show:false
          }
        }
      }
    },
    methods: {
      a() {
          this.option = option1;
        console.log(this.option)
      }
    }

  }
</script>

<style scoped>
  #wrap {
    background: #fff;
    padding: 10px;
  }


</style>
