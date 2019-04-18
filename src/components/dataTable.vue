<template>
  <div id="dataTable">
      <el-table
        ref="multipleTable"
        :data="data"
        :row-style="rowStyle"
        @selection-change="handleSelectionChange"
        :max-height="maxHeight"
      >
        <slot></slot>
      </el-table>
      <el-pagination
        v-if="paginator"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="row"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>

  export default {
    name: "dataTable",
    data() {
      return {
        currentPage4: 1,
        total: 0,
        multipleSelection: [],
      }
    },
    props: {
      paginator: {
        default: false,
        type: Boolean
      },
      data: {
        type: Array,
        require: true
      },
      row: {
        type: Number,
        default: 30
      },
      maxHeight: {
        type: Number,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit("selection-change", val.map((i) => {
          return i.id
        }))
      },
    },
    mounted() {
      this.total = this.data.length
    }
  }
</script>

<style scoped>
  .el-pagination {
    margin: 20px auto;
    margin: 20px auto;
    white-space: nowrap;
    padding: 2px 5px;
    font-weight: 700;
    float: right;
  }
  #dataTable:after{
    content: " ";
    display: table;
    clear: both;
  }

</style>
