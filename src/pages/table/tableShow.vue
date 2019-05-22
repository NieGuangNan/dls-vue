<template>
  <div id="tableShowWrap">
    <div class="topBar"></div>
    <div class="ibox">
      <data-table :data="tableData" :paginator="true" :row="row" :height="$root.bodyHeight-200">
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
              size="small" type="danger">
              移除
            </el-button>
            <el-button type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </data-table>
    </div>
  </div>

</template>

<script>
  import dataTable from '@/components/dataTable';
  import tableData from '@/services/tableList';

  export default {
    name: "tableShow",
    data() {
      return {
        tableData: tableData.tableList,
        row: 15,
        total: 0
      }
    },
    components: {
      dataTable
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    },
    mounted() {
      this.total = tableData.tableList.length;
      // console.log();
    }
  }
</script>

<style scoped>

</style>
