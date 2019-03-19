<template>
  <div id="pie">
    <el-row>
      <div class="content-title">
        饼图
      </div>
      <ve-pie :data="chartData1"></ve-pie>
    </el-row>
    <el-row>
      <div class="content-title">
        折线图
      </div>
      <ve-line :data="chartData2"></ve-line>
    </el-row>


  </div>

</template>

<script>
  // 按需引入

  import vePie from 'v-charts/lib/pie.common';
  import veLine from 'v-charts/lib/line.common';

  export default {
    name: "pie",
    components:{vePie,veLine},
    data () {
        return {
          title:'折线图',
          chartData1: {
            columns: ['日期', '访问用户'],
            rows: [
              { '日期': '1/1', '访问用户': 1393 },
              { '日期': '1/2', '访问用户': 3530 },
              { '日期': '1/3', '访问用户': 2923 },
              { '日期': '1/4', '访问用户': 1723 },
              { '日期': '1/5', '访问用户': 3792 },
              { '日期': '1/6', '访问用户': 4593 }
            ]
          },
          chartData2:{
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
              { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
              { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
              { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
              { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
              { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
            ]
          }
        }
      },


  }
</script>

<style scoped>
  #pie{
    background: #fff;
    padding: 20px;
  }
  .content-title{
    clear: both;
    font-weight: 400;
    line-height: 50px;
    font-size: 22px;
    color: #1f2f3d;
  }

</style>
