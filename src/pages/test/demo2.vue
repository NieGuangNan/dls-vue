<template>
  <div id="demo2Wrap">
    <el-row class="topBar">
      <el-form :inline="true" :model="toolbar" ref="ruleForm">
        <div style="float: left">
          <el-select v-model="toolbar.select.value" placeholder="请选择">
            <el-option
              v-for="option in toolbar.select.options"
              :key="option.value"
              :label="option.label"
              :value="option.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="toolbar.datePicker.value"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <select-one-button :data="toolbar.selectOneButton"></select-one-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </div>
        <div style="float: right">
          <el-button @click="openDialog1('form1')"><i :class="changeStar"></i></el-button>
          <el-dialog title="修改书签" width="30%" top="0" :visible.sync="dialogFormVisible"
                     :close-on-click-modal="false" :close-on-press-escape="false"
                     @closed="dialogClosed('form1')">
            <el-form :model="form" ref="form1">
              <el-form-item label="系统" :label-width="formLabelWidth" prop="checkbox" v-show="select2.value===''">
                <el-checkbox v-model="form.checkbox"></el-checkbox>
              </el-form-item>
              <el-form-item label="编号" :label-width="formLabelWidth" prop="id">
                <el-input v-model="form.id"></el-input>
              </el-form-item>
              <el-form-item label="中文" :label-width="formLabelWidth" prop="zh">
                <el-input v-model="form.zh"></el-input>
              </el-form-item>
              <el-form-item label="英文" :label-width="formLabelWidth" prop="en">
                <el-input v-model="form.en"></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth" prop="mark">
                <el-input v-model="form.mark" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-row type="flex" justify="space-between">
                <el-col :span="4">
                  <el-button @click="deleteDialog1()" type="danger" v-if="select2.value!==''"><i
                    class="el-icon-delete"></i>&nbsp;删除
                  </el-button>
                </el-col>
                <el-col :span="20">
                  <el-button @click="cancelDialog1"><i class="el-icon-close"></i>&nbsp;取消</el-button>
                  <el-button type="primary" @click="submitDialog1(form)"><i class="el-icon-printer"></i>&nbsp;确定
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
          <el-select v-model="select2.value">
            <el-option
              v-for="item in select2.options"
              :key="item.id"
              :label="item.id"
              :value="item.id">
              <span style="float: left">{{ item.id }}</span>
              <el-tag type="warning" v-if="item.checkbox" style="float: right;">系统</el-tag>
              <el-tag type="success" v-else style="float: right;">用户</el-tag>
            </el-option>
          </el-select>
          <el-button type="primary" @click="dialogFormVisible1 = true"><i class="el-icon-bell"></i>&nbsp;&nbsp;KPI
          </el-button>
          <el-dialog title="KPI" width="65%" top="0" :visible.sync="dialogFormVisible1"
                     :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="content1">
              <h3>已选择KPI</h3>
              <template v-for="item of dataKpi">
                <span class="dialog-box bg-blue">{{item}}</span>
              </template>
            </div>
            <div class="content2">
              <h3>KPI树</h3>
              <el-input v-model="select2.value" style="width: 50%;"></el-input>
              <el-button type="success"><i class="el-icon-refresh"></i>&nbsp;刷新</el-button>
              <el-scrollbar tag="div" wrap-class="scrollbar-tree" :native="true">
                <el-tree :data="data" :props="defaultProps" node-key="id" ref="tree" @check="handleNodeClick"
                         show-checkbox></el-tree>

              </el-scrollbar>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1= false"><i class="el-icon-close"></i>&nbsp;取消</el-button>
              <el-button type="primary" @click="dialogFormVisible1 = false"><i class="el-icon-check"></i>&nbsp;完成
              </el-button>
            </div>
          </el-dialog>
        </div>
      </el-form>
    </el-row>
    <el-row >
      <el-col :span="6" v-for="item in items" :key="item.value">
        <div class=" ibox ibox-margin">
          <div>
            <div class="ibox-title">1
              <el-select v-model="item.value" placeholder="请选择" @change="select(item.id,item.value)">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value">
                </el-option>
            </el-select>
            </div>
          </div>
          <div class="ibox-content">
            <doughnut-chart :data="item.data" :height="$root.bodyHeight/3"/>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DoughnutChart from "@/components/doughnutChart";
  import SelectOneButton from "@/components/selectOneButton";
  import {deepClone} from 'common/utils';

  export default {
    name: "demo2",
    components: {SelectOneButton, DoughnutChart},
    data() {
      return {
        //KPI
        dataKpi: ['名辰库区-钢铁料单耗', '名辰库区-溶剂单耗'
          , '名辰库区-合金单耗', '名辰库区-产量单耗', '名辰库区-周期时间单耗',
          '名辰库区-转炉炉数', '名辰库区-一次性通过率'],
        //tree
        data: [{
          label: '',
          children: [{
            label: '成本',
            children: [{
              label: '钢铁料单耗'
            }, {
              label: '溶剂单耗'
            }, {
              label: '合金单耗'
            }, {
              label: '石灰石单耗'
            }],
            disabled: true
          }, {
            label: '产量',
            children: [{
              label: '产量'
            }, {
              label: '周期时间'
            }, {
              label: '转炉炉数'
            }, {
              label: '小时产量'
            }],
            disabled: true
          }, {
            label: '质量',
            children: [{
              label: '一次通过率'
            }, {
              label: '一倒T命中率'
            }, {
              label: '一倒C命中率'
            }, {
              label: '一倒P命中率'
            }],
            disabled: true
          }, {
            label: '设备',
            children: [{
              label: '煤气回收时间'
            }, {
              label: '氩站进站温度'
            }, {
              label: '氩站出站温度'
            }, {
              label: '转炉炉况评分'
            }],
            disabled: true
          }],
          disabled: true
        }, {
          label: '',
          children: [{
            label: '产量',
            children: [{
              label: 'OEE'
            }, {
              label: '计划检修时间'
            }, {
              label: '计划检修延时时间'
            }, {
              label: '非计划停机时间'
            }],
            disabled: true
          }, {
            label: '质量',
            children: [{
              label: '一次合格支数（率）'
            }, {
              label: '一次合格重量（率）'
            }, {
              label: '大包平台温度'
            }, {
              label: '中包温度'
            }],
            disabled: true
          },],
          disabled: true
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // 弹窗
        dialogFormVisible: false,
        dialogFormVisible1: false,

        form: {
          checkbox: false,
          id: '',
          zh: '',
          en: '',
          mark: '',
        },
        formLabelWidth: '100px',
        //select
        select2: {
          options: [],
          value: '',
        },

        toolbar: {
          select: {
            id: '0',
            value: '1',
            options: [{
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
          datePicker: {
            value: new Date('2019-03-26'),
          },
          selectOneButton: {
            options: [{value: 'yue', label: '月'}, {value: 'zhou', label: '周'}, {
              value: 'ri',
              label: '日'
            }], value:
              'yue'
          }

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
        }, {
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
          value: '2',
          id: '0',
          data: {
            'color': 'red',
            'scale': '0.7',
            'val': {'top': '60', 'bottom': '60'},
            'label': {'left': '100', 'right': '120', 'top': '', 'bottom': '130'}
          },
        }, {
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
          value: '3',
          id: '0',
          data: {
            'color': 'yellow',
            'scale': '0.4',
            'val': {'top': '60', 'bottom': '60'},
            'label': {'left': '100', 'right': '120', 'top': '', 'bottom': '130'}
          },
        }],

      }
    },
    methods: {
      dialogClosed(formName) {
        this.$refs[formName].resetFields()
      },
      openDialog1() {
        this.dialogFormVisible = true;
        this.select2.value !== '' ? this.form = deepClone(this.select2.options).filter((item) => item.id === this.select2.value)[0] : '';
      },
      cancelDialog1() {
        this.select2.value = '';
        this.dialogFormVisible = false;
      },
      deleteDialog1() {
        this.$confirm('此操作将永久删除该书签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.select2.options = this.select2.options.filter((item) => item.id !== this.select2.value);
          this.select2.value = '';
          this.dialogFormVisible = false;
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.select2.value = '';
          this.dialogFormVisible = false;
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submitDialog1(form) {
        this.select2.value !== '' ? this.updateOptions(form) : this.createOptions(form);
        this.select2.value = '';
        this.dialogFormVisible = false;
      },
      updateOptions(form) {
        const _form = deepClone(form);
        this.select2.options = this.select2.options.map((item) => item.id === this.select2.value ? _form : item);
      },
      createOptions(form) {
        const _form = deepClone(form);
        this.select2.options.push(_form);
      },
      handleNodeClick() {
        let checkedNodes = this.$refs.tree.getCheckedNodes().filter((item) => !item.disabled);
        this.dataKpi = checkedNodes.map((item) => item.label);
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
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
      select() {
        this.items = [{
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
        }, {
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
          value: '3',
          id: '0',
          data: {
            'color': 'green',
            'scale': '0.8',
            'val': {'top': '60', 'bottom': '60'},
            'label': {'left': '100', 'right': '120', 'top': '', 'bottom': '130'}
          },
        }, {
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
          value: '2',
          id: '0',
          data: {
            'color': 'yellow',
            'scale': '0.4',
            'val': {'top': '60', 'bottom': '60'},
            'label': {'left': '100', 'right': '120', 'top': '', 'bottom': '130'}
          },
        }]
      }
    },
    computed: {
      changeStar() { //星星图标
        return this.select2.options.length > 0 ? 'el-icon-star-on' : 'el-icon-star-off'
      }
    },

  }
</script>

<style scoped>

  .el-col {
    /*margin-bottom: 10px;*/
    padding: 5px;
  }


  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .content1 h3, .content2 h3 {
    border-left: 2px solid #67C23A;
    padding-left: 10px;
    margin: 10px -5px;
  }

  .dialog-box {
    display: inline-block;
    text-align: center;
    width: 20%;
    margin: 5px 20px;
  }



</style>
