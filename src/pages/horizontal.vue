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
                  <div class="treeBox"
                       :class='scope.data.borderColor?scope.data.borderColor:""'>
                    <div class="tree-row">
                      <div class="tree-col-11">
                      <span
                        :class='scope.data.textColor?scope.data.textColor:""'>{{scope.data.quota}}</span>
                        <p>{{scope.data.name}}</p>
                      </div>
                      <div class="tree-col-13">
                        <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>影响: </b><span><b>{{scope.data.effect}}</b><sub
                          v-if="scope.data.effect!=='0'">{{scope.data.effectUnit}}</sub></span>
                        </p>
                        <template v-for="item in scope.data.data">
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>基准: </b><span><b>{{item.datum}}</b><sub
                            v-if="item.datum!=='0'">{{item.datumUnit}}</sub></span></p>
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>实际: </b><span
                            :class='item.textColor?item.textColor:""'><b>{{item.fact}}</b><sub
                            v-if="item.fact!=='0'">{{item.factUnit}}</sub></span></p>

                        </template>

                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="treeBox"
                       :class='scope.data.borderColor?scope.data.borderColor:""'>
                    <div class="tree-row">
                      <div class="tree-col-11">
                      <span
                        :class='scope.data.textColor?scope.data.textColor:""'>{{scope.data.quota}}</span>
                        <p>{{scope.data.name}}</p>
                    </div>
                      <div class="tree-col-13">
                        <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>影响: </b><span><b>{{scope.data.effect}}</b><sub
                          v-if="scope.data.effect!=='0'">{{scope.data.effectUnit}}</sub></span>
                        </p>
                        <template v-for="item in scope.data.data">
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>基准: </b><span><b>{{item.datum}}</b><sub
                            v-if="item.datum!=='0'">{{item.datumUnit}}</sub></span></p>
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>实际: </b><span
                            :class='item.textColor?item.textColor:""'><b>{{item.fact}}</b><sub
                            v-if="item.fact!=='0'">{{item.factUnit}}</sub></span></p>

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

  let treeData = [{
      quota: '',  //百分比（优劣）
      name: '炼钢成本',
      effect: '0 ', //影响值
      data: [
        {
          datum: '0',  //基准值
          datumUnit:'元/吨',//基准值单位
          fact: '2,706.81', //实际值
          factUnit:'元/吨',//基准值单位
          textColor: 'text-blue', //实际值字体颜色
        }],
      textColor: 'text-blue', //百分比字体颜色
      effectUnit:'元/吨',//影响值单位
      children: [
      {
        collapse: true,//默认是否展开
          quota: '',
          name: '60T炼钢成本',
          effect: '0',
          data: [
            {
              datum: '0',
              datumUnit:'元/吨',
              fact: '2,704.12',
              factUnit:'元/吨',
              textColor: 'text-blue',
              effectUnit:'元/吨',
            }, {
              datum: '0',
              datumUnit:'元/吨',
              fact: '2,706.81',
              factUnit:'元/吨',
              textColor: 'text-blue'
            }],
          textColor: 'text-blue',
        effectUnit:'元/吨',//单位
        children: [
          {
              quota: '7% 优',
              name: '钢铁料成本',
              effect: '0',
              data: [
                {
                  datum: '2,306.33',
                  datumUnit:'元/吨',
                  fact: '2,295.37',
                  factUnit:'元/吨',
                  textColor: 'text-green',
                }, {
                  datum: '111',
                  datumUnit:'元/吨',
                  fact: '2222',
                  factUnit:'元/吨',
                  textColor: 'text-green',
                }],
              borderColor: 'border-green',  //外边框颜色
              textColor: 'text-green',
              effectUnit:'元/吨',//单位
          }, {
              quota: '7% 优',
              name: '合金成本',
              effect: '0',
              data: [
                {
                  datum: '225.56',
                  datumUnit:'元/吨',
                  fact: '208.41',
                  factUnit:'元/吨',
                  textColor: 'text-green',
                }, {
                  datum: '111',
                  datumUnit:'元/吨',
                  fact: '2222',
                  factUnit:'元/吨',
                  textColor: 'text-green',
                }],

              borderColor: 'border-green',
              textColor: 'text-green',
              effectUnit:'元/吨',//单位
          }, {
              quota: '7% 劣',
              name: '溶剂成本',
              effect: '16.69',
              data: [
                {
                  datum: '7.79',
                  datumUnit:'元/吨',
                  fact: '24.48',
                  factUnit:'元/吨',
                  textColor: 'text-red',
                }, {
                  datum: '111',
                  datumUnit:'元/吨',
                  fact: '2222',
                  factUnit:'元/吨',
                  textColor: 'text-red',
                }],
              borderColor: 'border-red',
              textColor: 'text-red',
              effectUnit:'元/吨',//单位

          }, {
              quota: '7% 劣',
              name: '其它',
              effect: '14.57',
              data: [
                {
                  datum: '80.29',
                  datumUnit:'元/吨',
                  fact: '94.86',
                  factUnit:'元/吨',
                  textColor: 'text-red',
                }],
              borderColor: 'border-red',
              textColor: 'text-red',
              effectUnit:'元/吨',//单位

          },]

      },
      {
          quota: ' ',
          name: '120T炼钢成本',
          effect: '0',
          data: [
            {
              datum: '0',
              datumUnit:'元/吨',
              fact: '2,708.06',
              factUnit:'元/吨',
              textColor: 'text-blue',

            }],
          textColor: 'text-blue',
          effectUnit:'元/吨',//单位
          children: [{
              quota: '7% 优',
              name: '钢铁料成本',
              effect: '0',
              data: [
                {
                  datum: '2,331.97',
                  datumUnit:'元/吨',
                  fact: '2,139.98',
                  factUnit:'元/吨',
                  textColor: 'text-green',
                }, {
                  datum: '111',
                  datumUnit:'元/吨',
                  fact: '2222',
                  factUnit:'元/吨',
                  textColor: 'text-green',
                }],
              borderColor: 'border-green',
              textColor: 'text-green',
              effectUnit:'元/吨',//单位

          }, {
              quota: '9% 劣',
              name: '合金成本',
              effect: '101.97',
              data: [
                {
                  datum: '39.8',
                  datumUnit:'元/吨',
                  fact: '141.77',
                  factUnit:'元/吨',
                  textColor: 'text-red',
                }],

              borderColor: 'border-red',
              textColor: 'text-red',
              effectUnit:'元/吨',//单位

          }, {

              quota: '19% 劣',
              name: '溶剂成本',
              effect: '23.35',
              data: [
                {
                  datum: '7.79',
                  datumUnit:'元/吨',
                  fact: '31.14',
                  factUnit:'元/吨',
                  textColor: 'text-red',
                }],

              borderColor: 'border-red',
              textColor: 'text-red',
              effectUnit:'元/吨',//单位

          }, {
              quota: '28% 优',
              name: '其它',
              data: [
                {
                  datum: '141.12',
                  datumUnit:'元/吨',
                  fact: '129.67',
                  factUnit:'元/吨',
                  textColor: 'text-green',
                }],
              effect: '0',
              borderColor: 'border-green',
              textColor: 'text-green',
              effectUnit:'元/吨',//单位
          }]
      }],
  },];

  export default {
    name: 'horizontal',
    data() {
      return {
        url: URLSearchChange(window.location.search),
        fontOnOff: true,
        data: null,
        width: 250,
        height: 70,
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
      getData() {
        let _this = this;
        this.$http.get('http://localhost:9990/api/v1/dpm/kpiTree/1').then(function (res) {
          console.log(res.data.root)
          _this.data = treeData;
          _this.setTreeCenter();
        }).catch(function (error) {
          _this.data = treeData;
          _this.setTreeCenter();
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
        this.data = treeData;
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
      console.log(this.url.a)
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


</style>
