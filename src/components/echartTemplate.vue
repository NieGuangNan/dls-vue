<template>

  <div :id="id" :style="style" :option="option"></div>

</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "echartTemplate",
    data(){
      return{

      }
    },
    props:{
      id:{
        type:String
      },
      option:{
        type:Object
      },
      style:{
        type:Object,
        default:{width: '100%', height: '500px'}
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart =echarts.init(document.getElementById(this.id));
        // 绘制图表
        myChart.setOption(this.option);
      }
    }

}

</script>

<style scoped>


</style>
