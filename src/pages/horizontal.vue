<template>
  <div class="ibox" style="margin-top: 0; margin-left: -0.5rem">
    <div class="tree-progress" style="height: 100vh;">
      <template v-if="data">
        <Tree
          ref="treeContainer"
          :nodeSize="{x:width,y:height}"
          :initData="data"
          :translate="translate"
          :scaleExtent="{min:0.1,max:2}"
          pathFunc="straight"
          :deepFactor=0.5
          @handleNodeToggle="handleNodeToggle"
          :transitionDuration=0
        >
          <template slot-scope="scope">
            <template>
              <div class="base-node salad" @click="handleClick(scope)">
                <template v-if="scope.depth === 0">
                  <div class="treeBox" :style="{background:scope.data.backgroundColor,borderColor:scope.data.backgroundColor}"
                       :class='scope.data.statusBorderStyleClass?scope.data.statusBorderStyleClass:""'>
                    <div class="tree-row">
                      <div class="tree-col-11">
                      <span
                        :class='scope.data.impactRateTextStyleClass?scope.data.impactRateTextStyleClass:""'>{{scope.data.impactRateNumberString}}{{scope.data.impactRateLabel}}</span>
                        <p>{{scope.data.name}}</p>
                        <i class="fal fa-hand-point-up" v-if="scope.data.manual?scope.data.manual:false"/>
                      </div>
                      <div class="tree-col-13">
                        <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>影响: </b><span><b>{{scope.data.impactNumberString}}</b><sub
                          class="unit"
                          v-if="scope.data.impactNumberString">{{scope.data.impactUnitCodeString}}</sub></span>
                        </p>
                        <template v-for="item in scope.data.data">
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>基准: </b><span><b>{{item.benchmarkNumberString}}</b><sub
                            class="unit"
                            v-if="item.benchmarkNumberString">{{item.benchmarkUnitCodeString}}</sub></span></p>
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>实际: </b><span
                            :class='item.textStyleClass?item.textStyleClass:""'><b>{{item.actualNumberString}}</b><sub
                            class="unit"
                            v-if="item.actualNumberString">{{item.actualUnitCodeString}}</sub></span></p>

                        </template>

                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="treeBox"
                       :style="{background:scope.data.backgroundColor,borderColor:scope.data.backgroundColor}"
                       :class='scope.data.statusBorderStyleClass?scope.data.statusBorderStyleClass:""'>
                    <div class="tree-row">
                      <div class="tree-col-11">
                      <span
                        :class='scope.data.impactRateTextStyleClass?scope.data.impactRateTextStyleClass:""'>{{scope.data.impactRateNumberString}}{{scope.data.impactRateLabel}}</span>
                        <p>{{scope.data.name}}</p>
                        <i class="fal fa-hand-point-up" v-if="scope.data.manual?scope.data.manual:false"/>
                      </div>
                      <div class="tree-col-13">
                        <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>影响: </b><span><b>{{scope.data.impactNumberString}}</b><sub
                          class="unit"
                          v-if="scope.data.impactNumberString">{{scope.data.impactUnitCodeString}}</sub></span>
                        </p>
                        <template v-for="item in scope.data.data">
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>基准: </b><span><b>{{item.benchmarkNumberString}}</b><sub
                            class="unit"
                            v-if="item.benchmarkNumberString">{{item.benchmarkUnitCodeString}}</sub></span></p>
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>实际: </b><span
                            :class='item.textStyleClass?item.textStyleClass:""'><b>{{item.actualNumberString}}</b><sub
                            class="unit"
                            v-if="item.actualNumberString">{{item.actualUnitCodeString}}</sub></span></p>

                        </template>
                      </div>
                    </div>
                  </div>

                </template>

              </div>
            </template>

          </template>
        </Tree>
      </template>
    </div>
  </div>

</template>

<script>
  // import treeData from "../mock/salad";
  import Tree from "../components/Tree";
  import {URLSearchChange} from "@/common/utils";


  let treeData = [];
  export default {
    name: 'horizontal',
    data() {
      return {
        search: URLSearchChange(window.location.search),
        fontOnOff: true,
        data: null,
        width: 250,
        height: 70,
        translate: {
          x: 200,
          y: this.$root.bodyHeight / 2
        },
      };
    },
    components: {
      Tree
    },
    methods: {
      getData() {
        this.$http.get('/api/v1/dpm/kpiTree', {
          params: this.search
        }).then((res) => {
          this.data = [res.data.root];
          this.setTreeCenter();
        }).catch((error) => {
          // _this.data = treeData;
          // _this.setTreeCenter();
        });
      },
      setTreeCenter() {
        if (this.data) {
          const dimensions = this.$refs.treeContainer.$el.getBoundingClientRect();
          this.translate = {
            x: 200,
            y: dimensions.height / 2
          };
        }
      },
      handleNodeToggle(val) {
        console.log(val)
      },
      handleClick(scope) {
        // this.data = treeData;
        // console.log(scope);
      },
      pathFunc(linkData, start, end) {
        return "M" + end.x + "," + end.y + " " + start.x + "," + start.y;
      },
      // 浏览器兼容性处理
      myBrowser() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf("Chrome") > -1) {
          return "Chrome";
        }
      },
      // 控制侧边菜单 home页面传值
      childMenuClick(value) {
        this.$emit('sideMenuOnOff', value);
      },
      // 控制侧边菜单 home页面传值
      childHeaderClick(value) {
        this.$emit('headerOnOff', value);
      },
    },
    mounted() {
      this.getData();
      let mb = this.myBrowser();
      if ("Chrome" == mb) {
        this.fontOnOff = true
      } else {
        this.fontOnOff = false;
      }
      this.childMenuClick(false);
      this.childHeaderClick(false);

    },
    destroyed() {
      this.childMenuClick(true);
      this.childHeaderClick(true);
    }
  };
</script>

<style scoped>

  .treeBox {
    width: 100%;
    border-radius: 5px;
    padding-left: 8px;
    font-size: 10px;
    display: flex;
    align-items: center;
  }

  .treeBox .tree-col-11 {
    position: relative;
  }

  .treeBox .tree-col-11 .fa-hand-point-up {
    position: absolute;
    bottom: 6px;
  }

  .treeBox .tree-col-11 > p {
    font-size: 14px;
  }

  .treeBox .tree-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .ibox {
    position: fixed;
    width: 100%;

  }

  .treeBox .tree-col-13 > p sub {
    display: inline-block;
    vertical-align: -9%;
  }

  .treeBox .unit {
    width: 20px;
    text-align: left;
  }

  .myFont1 {
    transform: scale(0.7);
  }

  .myFont2 {
    font-size: 8px;
  }

  .tree-col-11 {
    width: 40%;
  }

  .tree-col-13 {
    width: 60%;
  }

  .tree-col-13 p:first-child span b {
    font-size: 22px !important;
  }

  .tree-col-13 p {
    line-height: 16px;
    display: flex;
    margin: 0 -13px;
  }

  .tree-col-13 p span {
    width: 75%;
    text-align: right;
    white-space: nowrap;
  }

  .tree-col-13 p span b {
    font-size: 18px !important;
  }

  .v-tree__node-base sub {
    margin-left: 2px;
  }

</style>
