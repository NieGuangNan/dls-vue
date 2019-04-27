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
                       :class='scope.data.statusBorderStyleClass?scope.data.statusBorderStyleClass:""'>
                    <div class="tree-row">
                      <div class="tree-col-11">
                      <span
                        :class='scope.data.impactRateTextStyleClass?scope.data.impactRateTextStyleClass:""'>{{scope.data.impactRateNumberString}}{{scope.data.impactRateLabel}}</span>
                        <p>{{scope.data.name}}</p>
                      </div>
                      <div class="tree-col-13">
                        <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>影响: </b><span><b>{{scope.data.impactNumberString}}</b><sub
                          v-if="scope.data.impactNumberString!=='0'">{{scope.data.impactUnitCodeString}}</sub></span>
                        </p>
                        <template v-for="item in scope.data.data">
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>基准: </b><span><b>{{item.benchmarkNumberString}}</b><sub
                            v-if="item.benchmarkNumberString!=='0'">{{scope.data.impactUnitCodeString}}</sub></span></p>
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>实际: </b><span
                            :class='item.textStyleClass?item.textStyleClass:""'><b>{{item.actualNumberString}}</b><sub
                            v-if="item.actualNumberString!=='0'">{{scope.data.impactUnitCodeString}}</sub></span></p>

                        </template>

                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="treeBox"
                       :class='scope.data.statusBorderStyleClass?scope.data.statusBorderStyleClass:""'>
                    <div class="tree-row">
                      <div class="tree-col-11">
                      <span
                        :class='scope.data.impactRateTextStyleClass?scope.data.impactRateTextStyleClass:""'>{{scope.data.impactRateNumberString}}{{scope.data.impactRateLabel}}</span>
                        <p>{{scope.data.name}}</p>
                      </div>
                      <div class="tree-col-13">
                        <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>影响: </b><span><b>{{scope.data.impactNumberString}}</b><sub
                          v-if="scope.data.impactNumberString!=='0'">{{scope.data.impactUnitCodeString}}</sub></span>
                        </p>
                        <template v-for="item in scope.data.data">
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>基准: </b><span><b>{{item.benchmarkNumberString}}</b><sub
                            v-if="item.benchmarkNumberString!=='0'">{{scope.data.impactUnitCodeString}}</sub></span></p>
                          <p :class="{myFont1:fontOnOff,myFont2:!fontOnOff}"><b>实际: </b><span
                            :class='item.textStyleClass?item.textStyleClass:""'><b>{{item.actualNumberString}}</b><sub
                            v-if="item.actualNumberString!=='0'">{{scope.data.impactUnitCodeString}}</sub></span></p>

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
    "name": "钢坯产量",
    "statusBorderStyleClass": "border-kpi-normal",
    "impactNumberString": "1,111",
    "impactUnitCodeString": "元/吨",
    "impactTextStyleClass": "",
    "impactRateNumberString": "3.4%",
    "impactRateLabel": "优",
    "impactRateTextStyleClass": "text-kpi-normal",
    "data": [
      {
        "benchmarkNumberString": "10,000",
        "actualNumberString": "11,111",
        "textStyleClass": "text-kpi-danger"
      }
    ],
    "children": [
      {
        "name": "1#钢坯产量",
        "statusBorderStyleClass": "border-kpi-normal",
        "impactNumberString": "1,111",
        "impactUnitCodeString": "元/吨",
        "impactTextStyleClass": "",
        "impactRateNumberString": "3.4%",
        "impactRateLabel": "优",
        "impactRateTextStyleClass": "text-kpi-normal",
        "data": [
          {
            "benchmarkNumberString": "10,000",
            "actualNumberString": "11,111",
            "textStyleClass": "text-kpi-danger"
          }
        ],
        "children": [
          {
            "name": "时间损失",
            "statusBorderStyleClass": "border-kpi-normal",
            "impactNumberString": "1,111",
            "impactUnitCodeString": "元/吨",
            "impactTextStyleClass": "",
            "impactRateNumberString": "3.4%",
            "impactRateLabel": "优",
            "impactRateTextStyleClass": "text-kpi-normal",
            "data": [
              {
                "benchmarkNumberString": "10,000",
                "actualNumberString": "11,111",
                "textStyleClass": "text-kpi-danger"
              }
            ],
            "children": [
              {
                "name": "计划停机",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "计划检修",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换浇次",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "年度检修",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换出钢口",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换结晶器",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "热换",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "限产占时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "计划停机延时",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "计划检修延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其他工序",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换浇次延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其他工序",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "年度检修延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换出钢口延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换结晶器延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "热换延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "非计划停机",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "钢水C成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水Si成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水Mn成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水P成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水S成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "温度低",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "温度高",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "设备",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "备件",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "机修",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "电气",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "钢包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "中包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "水口",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "铁包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "转炉",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "铁水",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "合金",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "溶剂",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "废钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "铁块",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "二次开浇",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "钢水C成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水Si成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水Mn成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水P成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水S成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "温度低",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "温度高",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "设备",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "备件",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "机修",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "电气",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "钢包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "中包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "水口",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "铁包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "转炉",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "铁水",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "合金",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "溶剂",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "废钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "铁块",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "其它",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "等铁",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              }
            ],
            "level": 3,
            "collapse": false
          },
          {
            "name": "速度损失",
            "statusBorderStyleClass": "border-kpi-normal",
            "impactNumberString": "1,111",
            "impactUnitCodeString": "元/吨",
            "impactTextStyleClass": "",
            "impactRateNumberString": "3.4%",
            "impactRateLabel": "优",
            "impactRateTextStyleClass": "text-kpi-normal",
            "data": [
              {
                "benchmarkNumberString": "10,000",
                "actualNumberString": "11,111",
                "textStyleClass": "text-kpi-danger"
              }
            ],
            "children": [
              {
                "name": "堵流",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "设备问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "等铁",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "漏钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "顶坯",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "冒钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "挂钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "套管断",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "散流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "缩流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "射源故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "翻钢机故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "跳电",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "截流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "自动打",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "节奏影响",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "电气问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "等铁",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "漏钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "顶坯",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "冒钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "挂钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "套管断",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "散流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "缩流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "射源故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "翻钢机故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "跳电",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "截流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "自动打",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "节奏影响",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "等铁",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "漏钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "顶坯",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "冒钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "挂钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "套管断",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "散流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "缩流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "射源故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "翻钢机故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "跳电",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "截流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "自动打",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "节奏影响",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "等铁",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "漏钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "顶坯",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "冒钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "挂钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "套管断",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "散流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "缩流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "射源故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "翻钢机故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "跳电",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "截流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "自动打",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "节奏影响",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "降拉速",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "成分问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "温度问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "生产节奏",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "人员操作",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "备件",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "机修",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "电气",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              }
            ],
            "level": 3,
            "collapse": false
          },
          {
            "name": "质量损失",
            "statusBorderStyleClass": "border-kpi-normal",
            "impactNumberString": "1,111",
            "impactUnitCodeString": "元/吨",
            "impactTextStyleClass": "",
            "impactRateNumberString": "3.4%",
            "impactRateLabel": "优",
            "impactRateTextStyleClass": "text-kpi-normal",
            "data": [
              {
                "benchmarkNumberString": "10,000",
                "actualNumberString": "11,111",
                "textStyleClass": "text-kpi-danger"
              }
            ],
            "children": [
              {
                "name": "工艺甩废",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "连铸甩坯损失",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "耐材",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "中包铸余",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "耐材",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "大包剩钢",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "耐材",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "异常甩废",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "设备",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "质量判废",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "设备",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "回炉",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "低温回炉",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "成份质量",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "生产事故",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "待判",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": null,
                "level": 4,
                "collapse": false
              },
              {
                "name": "补入",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": null,
                "level": 4,
                "collapse": false
              }
            ],
            "level": 3,
            "collapse": false
          }
        ],
        "level": 2,
        "collapse": true
      },
      {
        "name": "2#钢坯产量",
        "statusBorderStyleClass": "border-kpi-normal",
        "impactNumberString": "1,111",
        "impactUnitCodeString": "元/吨",
        "impactTextStyleClass": "",
        "impactRateNumberString": "3.4%",
        "impactRateLabel": "优",
        "impactRateTextStyleClass": "text-kpi-normal",
        "data": [
          {
            "benchmarkNumberString": "10,000",
            "actualNumberString": "11,111",
            "textStyleClass": "text-kpi-danger"
          }
        ],
        "children": [
          {
            "name": "时间损失",
            "statusBorderStyleClass": "border-kpi-normal",
            "impactNumberString": "1,111",
            "impactUnitCodeString": "元/吨",
            "impactTextStyleClass": "",
            "impactRateNumberString": "3.4%",
            "impactRateLabel": "优",
            "impactRateTextStyleClass": "text-kpi-normal",
            "data": [
              {
                "benchmarkNumberString": "10,000",
                "actualNumberString": "11,111",
                "textStyleClass": "text-kpi-danger"
              }
            ],
            "children": [
              {
                "name": "计划停机",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "计划检修",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换浇次",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "年度检修",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换出钢口",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换结晶器",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "热换",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "限产占时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "计划停机延时",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "计划检修延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其他工序",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换浇次延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其他工序",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "年度检修延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换出钢口延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "计划换结晶器延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "热换延时",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "非计划停机",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "钢水C成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水Si成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水Mn成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水P成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水S成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "温度低",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "温度高",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "设备",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "备件",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "机修",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "电气",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "钢包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "中包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "水口",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "铁包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "转炉",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "铁水",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "合金",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "溶剂",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "废钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "铁块",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "二次开浇",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "钢水C成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水Si成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水Mn成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水P成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "钢水S成分",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "温度低",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "温度高",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "设备",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "备件",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "机修",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "电气",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "钢包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "中包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "水口",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "铁包",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "转炉",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "铁水",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "合金",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "溶剂",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "废钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "铁块",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "其它",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "等铁",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              }
            ],
            "level": 3,
            "collapse": false
          },
          {
            "name": "速度损失",
            "statusBorderStyleClass": "border-kpi-normal",
            "impactNumberString": "1,111",
            "impactUnitCodeString": "元/吨",
            "impactTextStyleClass": "",
            "impactRateNumberString": "3.4%",
            "impactRateLabel": "优",
            "impactRateTextStyleClass": "text-kpi-normal",
            "data": [
              {
                "benchmarkNumberString": "10,000",
                "actualNumberString": "11,111",
                "textStyleClass": "text-kpi-danger"
              }
            ],
            "children": [
              {
                "name": "堵流",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "设备问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "等铁",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "漏钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "顶坯",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "冒钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "挂钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "套管断",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "散流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "缩流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "射源故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "翻钢机故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "跳电",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "截流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "自动打",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "节奏影响",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "电气问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "等铁",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "漏钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "顶坯",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "冒钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "挂钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "套管断",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "散流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "缩流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "射源故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "翻钢机故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "跳电",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "截流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "自动打",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "节奏影响",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "等铁",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "漏钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "顶坯",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "冒钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "挂钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "套管断",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "散流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "缩流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "射源故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "翻钢机故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "跳电",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "截流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "自动打",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "节奏影响",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "等铁",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "漏钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "顶坯",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "冒钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "挂钢",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "套管断",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "散流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "缩流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "射源故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "翻钢机故障",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "跳电",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "截流",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "自动打",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "节奏影响",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "降拉速",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "成分问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "温度问题",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "生产节奏",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "人员操作",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "备件",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "机修",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "电气",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              }
            ],
            "level": 3,
            "collapse": false
          },
          {
            "name": "质量损失",
            "statusBorderStyleClass": "border-kpi-normal",
            "impactNumberString": "1,111",
            "impactUnitCodeString": "元/吨",
            "impactTextStyleClass": "",
            "impactRateNumberString": "3.4%",
            "impactRateLabel": "优",
            "impactRateTextStyleClass": "text-kpi-normal",
            "data": [
              {
                "benchmarkNumberString": "10,000",
                "actualNumberString": "11,111",
                "textStyleClass": "text-kpi-danger"
              }
            ],
            "children": [
              {
                "name": "工艺甩废",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "连铸甩坯损失",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "耐材",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "中包铸余",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "耐材",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "大包剩钢",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": [
                      {
                        "name": "生产工艺",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "设备",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "耐材",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "原材料",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      },
                      {
                        "name": "其它",
                        "statusBorderStyleClass": "border-kpi-normal",
                        "impactNumberString": "1,111",
                        "impactUnitCodeString": "元/吨",
                        "impactTextStyleClass": "",
                        "impactRateNumberString": "3.4%",
                        "impactRateLabel": "优",
                        "impactRateTextStyleClass": "text-kpi-normal",
                        "data": [
                          {
                            "benchmarkNumberString": "10,000",
                            "actualNumberString": "11,111",
                            "textStyleClass": "text-kpi-danger"
                          }
                        ],
                        "children": null,
                        "level": 6,
                        "collapse": true
                      }
                    ],
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "异常甩废",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "设备",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "质量判废",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "生产工艺",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "设备",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "耐材",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "原材料",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "回炉",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": [
                  {
                    "name": "低温回炉",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "成份质量",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "生产事故",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  },
                  {
                    "name": "其它",
                    "statusBorderStyleClass": "border-kpi-normal",
                    "impactNumberString": "1,111",
                    "impactUnitCodeString": "元/吨",
                    "impactTextStyleClass": "",
                    "impactRateNumberString": "3.4%",
                    "impactRateLabel": "优",
                    "impactRateTextStyleClass": "text-kpi-normal",
                    "data": [
                      {
                        "benchmarkNumberString": "10,000",
                        "actualNumberString": "11,111",
                        "textStyleClass": "text-kpi-danger"
                      }
                    ],
                    "children": null,
                    "level": 5,
                    "collapse": true
                  }
                ],
                "level": 4,
                "collapse": false
              },
              {
                "name": "待判",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": null,
                "level": 4,
                "collapse": false
              },
              {
                "name": "补入",
                "statusBorderStyleClass": "border-kpi-normal",
                "impactNumberString": "1,111",
                "impactUnitCodeString": "元/吨",
                "impactTextStyleClass": "",
                "impactRateNumberString": "3.4%",
                "impactRateLabel": "优",
                "impactRateTextStyleClass": "text-kpi-normal",
                "data": [
                  {
                    "benchmarkNumberString": "10,000",
                    "actualNumberString": "11,111",
                    "textStyleClass": "text-kpi-danger"
                  }
                ],
                "children": null,
                "level": 4,
                "collapse": false
              }
            ],
            "level": 3,
            "collapse": false
          }
        ],
        "level": 2,
        "collapse": true
      },
    ],
    "level": 1,
    "collapse": true,
  }];

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
          // console.log(_this.data)
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
         console.log(scope);
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
