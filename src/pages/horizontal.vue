<template>
  <div class="ibox">
    <div class="tree-progress" style="height: 100vh;">
      <Tree
        ref="treeContainer"
        :nodeSize="{x:240,y:70}"
        :initData="data"
        :translate="translate"
        pathFunc="straight"
        :deepFactor=0.5
        @handleNodeToggle="handleNodeToggle"
        :transitionDuration=0
      >
        <template slot-scope="scope">
          <!--<template v-if="scope.depth === 0">-->
            <!--<div class="base-node salad-root">-->
              <!--<p>{{scope.data.name}}</p>-->
            <!--</div>-->
          <!--</template>-->
          <template>
            <div class="base-node salad" @click="handleClick(scope)">
              <template v-if="scope.depth === 0">
                <div class="treeBox" :class="{'border-red':scope.data.attributes.attributes.borderColor==='1','border-green':scope.data.attributes.attributes.borderColor==='2'}">
                  <el-row>
                    <el-col :span="10">
                      <span :class="{'text-red':scope.data.attributes.attributes.borderColor!=='2','text-green':scope.data.attributes.attributes.borderColor==='2'}">{{scope.data.attributes.attributes.leftTop}}</span>
                      <p>{{scope.data.attributes.attributes.leftBottom}}</p>
                    </el-col>
                    <el-col :span="14" style="text-align: right">
                      <p >{{scope.data.attributes.attributes.rightTop}}</p>
                      <span v-if="scope.data.attributes.attributes.rightBottom1">FY Var:</span>
                      <span>{{scope.data.attributes.attributes.rightBottom1}}</span>
                      <span>{{scope.data.attributes.attributes.rightBottom2}}</span>

                    </el-col>
                  </el-row>
                </div>
              </template>
              <template v-else>
                <div class="treeBox" :class="{'border-red':scope.data.attributes.borderColor==='1','border-green':scope.data.attributes.borderColor==='2'}">
                  <el-row>
                    <el-col :span="10">
                      <span :class="{'text-red':scope.data.attributes.borderColor!=='2','text-green':scope.data.attributes.borderColor==='2'}">{{scope.data.attributes.leftTop}}</span>
                      <p>{{scope.data.attributes.leftBottom}}</p>
                    </el-col>
                    <el-col :span="14" style="text-align: right">
                      <p >{{scope.data.attributes.rightTop}}</p>
                      <span v-if="scope.data.attributes.rightBottom1">FY Var:</span>
                      <span>{{scope.data.attributes.rightBottom1}}</span>
                      <span>{{scope.data.attributes.rightBottom2}}</span>

                    </el-col>
                  </el-row>
                </div>

              </template>

            </div>
          </template>

        </template>
      </Tree>
    </div>
  </div>

</template>

<script>
  // import treeData from "../mock/salad";
  import Tree from "../components/Tree";

  export default {
    name: 'horizontal',
    data() {
      let treeData = [{
        name: '0',
        attributes: {
          attributes: {
            leftTop:'',
            leftBottom:'Balance Sheet',
            rightTop:' ',
            rightBottom1:'',
            rightBottom2:'',
            borderColor:'0'
          }
        },
        children: [{
          name: '1、',
          collapse: true,
          attributes: {
            leftTop:'2% worse',
            leftBottom:'Assets',
            rightTop:'2,381,0',
            rightBottom1:'75%',
            rightBottom2:'(6,883.6)',
            borderColor:'1'
          },
          children: [{
            name: '1、',
            attributes: {
              leftTop:'7% worse',
              leftBottom:'Current Assets',
              rightTop:'664.3',
              rightBottom1:'91%',
              rightBottom2:'(6,897.3)',
              borderColor:'1'
            },
            children:[{
              name: '1、',
              attributes: {
                leftTop:'19% worse',
                leftBottom:'Cash',
                rightTop:'220.0',
                rightBottom1:'19%',
                rightBottom2:'(50.1)',
                borderColor:'1'
              }},{
              name: '2、',
              attributes: {
                leftTop:' ',
                leftBottom:'Net Receivables',
                rightTop:'225.3',
                rightBottom1:'16%',
                rightBottom2:'30.2',
                borderColor:'2'
              }},{
              name: '3、',
              attributes: {
                leftTop:' ',
                leftBottom:'Inventory',
                rightTop:'182.5',
                rightBottom1:'3%',
                rightBottom2:'4.5',
                borderColor:'2'
              }},{
              name: '4、',
              attributes: {
                leftTop:' ',
                leftBottom:'Other Current Assets',
                rightTop:'36.5',
                rightBottom1:'99%',
                rightBottom2:'(6,882.3)',
                borderColor:'1'
              }},

            ]
          },{
            name: '2、',
            attributes: {
              leftTop:' ',
              leftBottom:'long term Assets',
              rightTop:'1,716.7',
              rightBottom1:'1%',
              rightBottom2:'13.7',
              borderColor:'0'
            }
          },]
        },
          {
            name: '2、',
            attributes: {
              leftTop:'2% better',
              leftBottom:'Liabilities and SE',
              rightTop:'2,381.0',
              rightBottom1:'49%',
              rightBottom2:'(2,247.2)',
              borderColor:'2'
            }
          },
          {
            name: '3、',
            attributes: {
              leftTop:' ',
              leftBottom:'Financial Ratios',
              rightTop:'',
              rightBottom1:'',
              rightBottom2:'',
              borderColor:'0'},
            children:[{
              name: '1、',
              attributes: {
                leftTop:'7% worse',
                leftBottom:'Current Ratio',
                rightTop:'1.25',
                rightBottom1:'92%',
                rightBottom2:'(14.47)',
                borderColor:'0'
              }},{
              name: '2、',
              attributes: {
                leftTop:'9% worse',
                leftBottom:'Quick Ratio',
                rightTop:'0.90',
                rightBottom1:'94%',
                rightBottom2:'(14.44)',
                borderColor:'0'
              }},{
              name: '3、',
              attributes: {
                leftTop:'19% worse',
                leftBottom:'Cash Ratio',
                rightTop:'0.41',
                rightBottom1:'27%',
                rightBottom2:'(0.15)',
                borderColor:'0'
              }},{
              name: '4、',
              attributes: {
                leftTop:'28% worse',
                leftBottom:'Working Capital',
                rightTop:'130.9',
                rightBottom1:'98%',
                rightBottom2:'(6,949.5)',
                borderColor:'0'
              }},{
              name: '5、',
              attributes: {
                leftTop:'15% worse',
                leftBottom:'Debt to Equlity Ratio',
                rightTop:'1.93',
                rightBottom1:'>99%',
                rightBottom2:'1.41',
                borderColor:'0'
              }}]
          }],
      },];
      return {
        data: treeData,
        translate: {
          x: 0,
          y: 0
        },
      };
    },
    components: {
      Tree
    },
    methods: {
      setTreeCenter() {
        const dimensions = this.$refs.treeContainer.$el.getBoundingClientRect();
        this.translate = {
          x: 200,
          y: dimensions.height / 2
        };
      },
      handleNodeToggle(val) {
        console.log(val)
      },
      handleClick(scope) {
        this.data = [{
          name: '0',
          attributes: {
            attributes: {
              leftTop:'',
              leftBottom:'Balance Sheet',
              rightTop:' ',
              rightBottom1:'',
              rightBottom2:'',
              borderColor:'0'
            }
          },
          children: [{
            name: '1、',
            collapse: false,
            attributes: {
              leftTop:'2% worse',
              leftBottom:'Assets',
              rightTop:'2,381,0',
              rightBottom1:'75%',
              rightBottom2:'(6,883.6)',
              borderColor:'1'
            },
            children: [{
              name: '1、',
              attributes: {
                leftTop:'7% worse',
                leftBottom:'Current Assets',
                rightTop:'664.3',
                rightBottom1:'91%',
                rightBottom2:'(6,897.3)',
                borderColor:'1'
              },
              children:[{
                name: '1、',
                attributes: {
                  leftTop:'19% worse',
                  leftBottom:'Cash',
                  rightTop:'220.0',
                  rightBottom1:'19%',
                  rightBottom2:'(50.1)',
                  borderColor:'1'
                }},{
                name: '2、',
                attributes: {
                  leftTop:' ',
                  leftBottom:'Net Receivables',
                  rightTop:'225.3',
                  rightBottom1:'16%',
                  rightBottom2:'30.2',
                  borderColor:'2'
                }},{
                name: '3、',
                attributes: {
                  leftTop:' ',
                  leftBottom:'Inventory',
                  rightTop:'182.5',
                  rightBottom1:'3%',
                  rightBottom2:'4.5',
                  borderColor:'2'
                }},{
                name: '4、',
                attributes: {
                  leftTop:' ',
                  leftBottom:'Other Current Assets',
                  rightTop:'36.5',
                  rightBottom1:'99%',
                  rightBottom2:'(6,882.3)',
                  borderColor:'1'
                }},

              ]
            },{
              name: '2、',
              attributes: {
                leftTop:' ',
                leftBottom:'long term Assets',
                rightTop:'1,716.7',
                rightBottom1:'1%',
                rightBottom2:'13.7',
                borderColor:'0'
              }
            },]
          },
            {
              name: '2、',
              attributes: {
                leftTop:'2% better',
                leftBottom:'Liabilities and SE',
                rightTop:'2,381.0',
                rightBottom1:'49%',
                rightBottom2:'(2,247.2)',
                borderColor:'2'
              }
            },
            {
              name: '3、',
              attributes: {
                leftTop:' ',
                leftBottom:'Financial Ratios',
                rightTop:'',
                rightBottom1:'',
                rightBottom2:'',
                borderColor:'0'},
              children:[{
                name: '1、',
                attributes: {
                  leftTop:'7% worse',
                  leftBottom:'Current Ratio',
                  rightTop:'1.25',
                  rightBottom1:'92%',
                  rightBottom2:'(14.47)',
                  borderColor:'0'
                }},{
                name: '2、',
                attributes: {
                  leftTop:'9% worse',
                  leftBottom:'Quick Ratio',
                  rightTop:'0.90',
                  rightBottom1:'94%',
                  rightBottom2:'(14.44)',
                  borderColor:'0'
                }},{
                name: '3、',
                attributes: {
                  leftTop:'19% worse',
                  leftBottom:'Cash Ratio',
                  rightTop:'0.41',
                  rightBottom1:'27%',
                  rightBottom2:'(0.15)',
                  borderColor:'0'
                }},{
                name: '4、',
                attributes: {
                  leftTop:'28% worse',
                  leftBottom:'Working Capital',
                  rightTop:'130.9',
                  rightBottom1:'98%',
                  rightBottom2:'(6,949.5)',
                  borderColor:'0'
                }},{
                name: '5、',
                attributes: {
                  leftTop:'15% worse',
                  leftBottom:'Debt to Equlity Ratio',
                  rightTop:'1.93',
                  rightBottom1:'>99%',
                  rightBottom2:'1.41',
                  borderColor:'0'
                }}]
            }],
        },];
        // console.log(scope);
      },
      pathFunc(linkData, start, end) {
        return "M" + end.x + "," + end.y + " " + start.x + "," + start.y;
      }
    },
    mounted() {
      this.setTreeCenter();
    }
  };
</script>

<style scoped>

  .treeBox{
    border-radius: 5px;
    width: 230px;
    height:70px;
    padding: 0 5px;
    font-size: 10px;
    display: flex;
    align-items: center;
  }
  .border-green{
    border-left:5px solid #557e3b;
  }
  .border-red{
    border-left:5px solid #e02837 ;
  }
  .treeBox .el-row{
    width: 100%;
  }
  .treeBox .el-col-10>p,.treeBox .el-col-10>span,.treeBox .el-col-14>span{
    font-size: 12px;
  }
  .treeBox .el-col-14>p{
    font-size: 16px;
  }
</style>
