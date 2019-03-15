<template>
  <div >
    <data-table :data="tableData" :paginator="true" :row="row">
      <template>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          sortable
          label="日期"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>

      </template>
    </data-table>



  </div>
    
</template>

<script>
  import dataTable from './tableChild';
  import tableData from '@/services/tableList';
    export default {
        name: "tableShow",
      data(){
          return{
            tableData: tableData.tableList,
            row:15,
            total:0
          }
      },
      components:{
        dataTable
      },
      mounted() {
        this.total=tableData.tableList.length;
        // console.log();
      }
    }
</script>

<style scoped>

</style>
