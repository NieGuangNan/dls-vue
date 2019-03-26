<template>
  <div>
    <el-form :inline="true" :model="toolbar" ref="ruleForm" class="demo-form-inline">
      <el-select v-model="toolbar.select.value" placeholder="请选择"
                 @change="select(toolbar.select.id,toolbar.select.value)">
        <el-option
          v-for="option in toolbar.select.options"
          :key="option.value"
          :label="option.label"
          :value="option.value">
        </el-option>
      </el-select>

      <select-one-button :data="toolbar.selectOneButton"></select-one-button>
      <el-button @click="submitForm('ruleForm')">提交</el-button>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="6" v-for="item in items">
        <div class="grid-content bg-purple">
          <div>1
            <el-select v-model="item.value" placeholder="请选择" @change="select(item.id,item.value)">
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
          </div>
          <doughnut-chart :data="item.data" :height="$root.bodyHeight/3"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DoughnutChart from "@/components/doughnutChart";
  import SelectOneButton from "@/components/selectOneButton";

  export default {
    name: "demo2",
    components: {SelectOneButton, DoughnutChart},
    data() {
      return {
        a: '',
        toolbar: {
          select: {
            id: '0',
            value: '1', options: [{
              value: '1',
              label: 'DCC示范工厂'
            }, {
              value: '2',
              label: 'DCC示范工厂1'
            }, {
              value: '3',
              label: 'DCC示范工厂2'
            }, {
              value: '4',
              label: 'DCC示范工厂3'
            }, {
              value: '5',
              label: 'DCC示范工厂4'
            }],
          },
          selectOneButton: {
            options: [{value: 'yue', label: '月'}, {value: 'zhou', label: '周'}, {
              value: 'ri',
              label: '日'
            }], value: 'yue'
          },
        },
        items: [{
          options: [{
            value: '1',
            label: '名辰库区'
          }, {
            value: '2',
            label: '名辰库区1'
          }, {
            value: '3',
            label: '名辰库区2'
          }, {
            value: '4',
            label: '名辰库区3'
          }, {
            value: '5',
            label: '名辰库区4'
          }],
          value: '1',
          id: '0',
          data: {
            'color': 'blue',
            'scale': '0.6',
            'val': {'top': '60', 'bottom': '60'},
            'label': {'left': '100', 'right': '120', 'top': '', 'bottom': '130'}
          },
        }],

      }
    },
    methods: {
      aa(val) {

        alert(val)

      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.toolbar)
            //如果通过验证 to do...
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      select(id, value) {
        let a = JSON.stringify({id: id, value: value});
        alert(a);
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
    height: 100%;
    /*border-radius: 4px;*/
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
