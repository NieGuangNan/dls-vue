<template>
  <div id="wrap">
    <e-template :id="id" :option="option" :style="style"></e-template>
  </div>

</template>

<script>
  import eTemplate from '@/components/echartTemplate'
  const option={
    title: { text: '在Vue中使用echarts' },
    tooltip: {},
    xAxis: {
      data: ["数据1","数据2","数据3","数据4","数据5","数据6"]
    },
    yAxis: {},
    legend:{
      show:true
    },
    series: [{
      name: '销量',
      color:'pink',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    },{
      name: '好评数',
      type: 'line',
      color:'orange',
      data: [8, 20, 39, 14, 20, 25]
    }]
  }
  export default {
    name: "mixedChart",
    components:{eTemplate},
    data(){
      return{
        id:"myChart",
        option:option,
        style:{width: '100%', height: '600px'}
      }
    },


  }
</script>

<style scoped>
 #wrap{
   background: #fff;
   padding: 10px;
 }


</style>
