<template>
  <div class="wrap">
    <el-row>
      <el-col :span="24" >
        <div class="bar">工具栏</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
        <echarts :option="option" :height='$root.bodyHeight/3'></echarts>
        <div class="bottom"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" style="border-right: 1vmin solid #e4e4e4;">
        <el-row>
          <el-col :span="6" :offset="1">
            <div class="ibox" >
              <el-row >
                <el-col :span="12">
                  <div class="bg-dark text-white ibox-item">
                    <h5 >基准</h5>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="bg-blue text-white ibox-item">
                    <h5>实际</h5><span>0吨</span>
                  </div>
                </el-col>
              </el-row>
            </div>

          </el-col>
          <el-col :span="6" :offset="2">
            <div class="ibox" >
              <el-row >
                <el-col :span="12">
                  <div class="bg-dark text-white ibox-item">
                    <h5 >基准</h5><span>83%</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="bg-green text-white ibox-item">
                    <h5>实际</h5><span>97.43%</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6" :offset="2">
            <div class="ibox" >
              <el-row >
                <el-col :span="12">
                  <div class="bg-dark text-white ibox-item">
                    <h5 >基准</h5><span>135</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="bg-red text-white ibox-item">
                    <h5>实际</h5><span>0</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <echarts :option="option1" :height='$root.bodyHeight/3'></echarts>
        </el-row>
        <data-table :data="tableData">
          <el-table-column
            prop="module"
            sortable
            label="模块"
          >
          </el-table-column>
          <el-table-column
            prop="issue"
            label="主要问题"
          >
          </el-table-column>
          <el-table-column
            prop="effect"
            label="影响"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="累计（过去一个月）"
          >
          </el-table-column>
          <el-table-column
            prop="data"
            label=""
          >
          </el-table-column>
          <el-table-column
            prop="department"
            label="责任部门"
          >
          </el-table-column>
        </data-table>

      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="6" :offset="1">
            <div class="ibox" >
              <el-row >
                <el-col :span="12">
                  <div class="bg-dark text-white ibox-item">
                    <h5 >基准</h5>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="bg-blue text-white ibox-item">
                    <h5>实际</h5><span>0吨</span>
                  </div>
                </el-col>
              </el-row>
            </div>

          </el-col>
          <el-col :span="6" :offset="2">
            <div class="ibox" >
              <el-row >
                <el-col :span="12">
                  <div class="bg-dark text-white ibox-item">
                    <h5 >基准</h5><span>83%</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="bg-green text-white ibox-item">
                    <h5>实际</h5><span>97.43%</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6" :offset="2">
            <div class="ibox" >
              <el-row >
                <el-col :span="12">
                  <div class="bg-dark text-white ibox-item">
                    <h5 >基准</h5><span>135</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="bg-red text-white ibox-item">
                    <h5>实际</h5><span>0</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <echarts :option="option1" :height='$root.bodyHeight/3'></echarts>
        </el-row>
        <data-table :data="tableData" :maxHeight="200">
          <el-table-column
            prop="module"
            sortable
            label="模块"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="issue"
            label="主要问题"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="effect"
            label="影响"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="累计（过去一个月）"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="data"
            label=""
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="department"
            label="责任部门"
            width="100"
          >
          </el-table-column>
        </data-table>
      </el-col>
    </el-row>

  </div>

    
</template>

<script>
  import echarts from '@/components/echarts';
  import dataTable from '@/components/dataTable';
  import tableData from '@/services/tableList'

  const option = {
    tooltip: {},
    xAxis: {
      data: ["03-12", "03-13", "03-14", "03-15", "03-16", "03-17", "03-18", "03-19"]
    },
    yAxis: {
      name:'炼钢总产量（吨）',
      interval:'20000',
    },
    legend: {
      show: true,
      right:'1%',
      top:'1%',
      icon:"circle"

    },
    series: [{
      name: '基准',
      color: 'rgb(99,179,226)',
      type: 'bar',
      label:{
        show:true,
        color:'#000',
        position:'top',
      },
      data: [19515, 19511, 0, 0, 37675, 18562,0,0]
    }, {
      name: '实际',
      type: 'bar',
      color: 'rgb(224,40,55)',
      data: [0,0,0,0,0,0,0,0]
    }]
  };
  const option1 = {
    tooltip: {},
    xAxis: {
      data: ["总时间", "计划停机", "非计划停机", "实际作业时间", "速度损失", "质量损失", "有效作业时间"]
    },
    yAxis: {
      max:'4000',
      Interval:'1000',
      splitLine:{

      }
    },
    series: [{

      // color: 'rgb(99,179,226)',
      type: 'bar',
      label:{
        show:true,
        color:'#000',
      },
      data: [2880, 0, 0,2806, 2805, 0,0],
      itemStyle:{
        normal:{
          color:function(params){
            if(params.name =='速度损失'){
              return "#e02837";
            }else{
              return "#63b3e2";
            }
          }
        }
      }
    }]
  };
    export default {
        name: "demo1",
        components:{
          echarts,dataTable
        },
      data(){
          return{
            option:option,
            option1:option1,
            tableData:tableData.demoList
          }
      }
    }
</script>

<style scoped>
 .bar{
   background:#e4e4e4;
 }
  .wrap{
    background: #eee;
  }
  .bottom{
    border-bottom: 1vmin solid #e4e4e4;
  }
  .ibox{
    line-height: 3vmin;
    margin-top: 1vmin;
    font-weight: bold;
  }
 .ibox-item{
   height:6vmin;
   padding: 0 0.5vmin 0 ;
 }
</style>
