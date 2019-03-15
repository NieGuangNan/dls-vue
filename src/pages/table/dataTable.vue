<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="data"
      border
      @selection-change="handleSelectionChange"
      size="medium">
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
        currentPage4: 8,
        total: 0,
        multipleSelection: [],
        selectionList: []
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
        this.selectionList = val.map((i) => {
          return i.id
        });
        this.$emit("selection-change", this.selectionList)
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
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
  }


</style>
