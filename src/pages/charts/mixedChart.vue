<template>
  <div id="mixedChartWrap">
    <el-button type="default" @click="a()" v-permission="['admin']" class="fal fa-acorn">测试</el-button>
    <echarts :option="option" :height='$root.bodyHeight/3'></echarts>
    <echarts :option="option1" :height='$root.bodyHeight/3' :alterOption="alterOption"></echarts>
  </div>

</template>

<script>
  import echarts from '@/components/echarts'

  const option = {
    title: {text: '在Vue中使用echarts',textStyle: {color:'#fff'}},
    tooltip: {},
    xAxis: {
      data: ["数据1", "数据2", "数据3", "数据4", "数据5", "数据6"],
      axisLine:{
        lineStyle:{
          color:'#fff',
        }
      }
    },
    yAxis: {
      axisLine:{
        lineStyle:{
          color:'#fff',
        }
      },
      splitLine:{
        lineStyle:{
          type:'dashed'
        }
      }
    },
    legend: {
      show: true,
      right:'1%',
      top:'1%',
      textStyle:{
        color:'#fff'
      }
    },
    series: [{
      name: '销量',
      color: 'pink',
      type: 'bar',
      label:{
        show:true,
        color:'#fff',
        position:'top',
      },
      data: [5, 20, 36, 10, 10, 20]
    }, {
      name: '好评数',
      type: 'line',
      color: 'orange',
      label:{
        show:true,
        color:'#fff',
        position:'top',
      },
      data: [8, 20, 39, 14, 20, 25]
    }]
  };
  const option1 = {
    title: {text: '在Vue中使用echarts',textStyle: {color:'#fff'}},
    tooltip: {},
    xAxis: {
      data: ["数据1", "数据2", "数据3", "数据4", "数据5", "数据6"],
      axisLine:{
        lineStyle:{
          color:'#fff',
        }
      }
    },
    yAxis: {
      axisLine:{
        lineStyle:{
          color:'#fff',
        }
      },
      splitLine:{
        lineStyle:{
          type:'dashed'
        }
      }
    },
    legend: {
      show: true
    },
    series: [{
      name: '销量666',
      color: 'pink',
      type: 'bar',
      label:{
        show:true,
        color:'#fff',
        position:'top',
      },
      data: [5, 2, 36, 10, 10, 20]
    }, {
      name: '好评数',
      type: 'line',
      color: 'orange',
      label:{
        show:true,
        color:'#fff',
        position:'top',
      },
      data: [8, 2, 39, 14, 20, 25]
    }]
  };

  export default {
    name: "mixedChart",
    components: {echarts},
    data() {
      return {
        option: option,
        option1: option1,
        alterOption: {
          legend: {
            show: false
          },
          // tooltip: {
          //   formatter: function (params, ticket, callback) {
          //     return '1';
          //   }
          // },
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
  #mixedChartWrap {
    padding: 0 1rem 1rem;

  }


</style>
