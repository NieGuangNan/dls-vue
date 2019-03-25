<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div>1</div>
        <!--<doughnut-chart :data="" :height="this.$bodyHeight/2"/>-->
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple" :style="{height:$root.bodyHeight/2+'px'}"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
  import DoughnutChart from "@/components/doughnutChart";

  export default {
    name: "demo2",
    // props: {
    //   bodyHeight: {type: Number}
    // },
    components: {DoughnutChart},
    data() {
      return {
        data: '',
      }
    }
  }
</script>

<style scoped>
  .el-col {
    /*margin-bottom: 10px;*/
    padding: 5px;
  }

  .el-col {
    /*border-radius: 4px;*/
  }

  .bg-purple-dark {
    background: #fff;
  }

  .bg-purple {
    background: #fff;
  }

  .bg-purple-light {
    background: #fff;
  }

  .grid-content {
    /*border-radius: 4px;*/
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
