/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/



(function (root, factory) {if (typeof define === 'function' && define.amd) {
  // AMD. Register as an anonymous module.
  define(['exports', 'echarts'], factory);
} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
  // CommonJS
  factory(exports, require('echarts'));
} else {
  // Browser globals
  factory({}, root.echarts);
}
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }

  // var colorPalette = [
  //   '#c12e34','#e6b600','#0098d9','#2b821d',
  //   '#005eaa','#339ca8','#cda819','#32a487'
  // ];
  var colorPalette = ["#6f9637","rgb(77,105,168)","rgb(201,119,239)","rgb(102,134,140)","rgb(238,183,33)","rgb((245,121,69)",
    "rgb(164,147,91)","rgb(99,192,178)","rgb(228,90,119)","rgb(100,181,228)","rgb(205,219,183)", "rgb(195,214,255)",
    "rgb(216,187,229)","rgb(206,210,211)","rgb(237,238,114)","rgb(255,213,192)","rgb(225,208,151)","rgb(190,226,221)","rgb(245,183,218)","rgb(178.220,242)",];

  var theme = {

    color: colorPalette,

    title: {
      textStyle: {
        fontWeight: 'normal'
      }
    },

    visualMap: {
      color:['#1790cf','#a2d4e6']
    },

    toolbox: {
      iconStyle: {
        normal: {
          borderColor: '#06467c'
        }
      }
    },

    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.6)'
    },

    dataZoom: {
      dataBackgroundColor: '#dedede',
      fillerColor: 'rgba(154,217,247,0.2)',
      handleColor: '#005eaa'
    },

    timeline: {
      lineStyle: {
        color: '#005eaa'
      },
      controlStyle: {
        normal: {
          color: '#005eaa',
          borderColor: '#005eaa'
        }
      }
    },

    candlestick: {
      itemStyle: {
        normal: {
          color: '#c12e34',
          color0: '#2b821d',
          lineStyle: {
            width: 1,
            color: '#c12e34',
            color0: '#2b821d'
          }
        }
      }
    },

    graph: {
      color: colorPalette
    },

    map: {
      label: {
        normal: {
          textStyle: {
            color: '#c12e34'
          }
        },
        emphasis: {
          textStyle: {
            color: '#c12e34'
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#eee',
          areaColor: '#ddd'
        },
        emphasis: {
          areaColor: '#e6b600'
        }
      }
    },

    gauge: {
      axisLine: {
        show: true,
        lineStyle: {
          color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']],
          width: 5
        }
      },
      axisTick: {
        splitNumber: 10,
        length:8,
        lineStyle: {
          color: 'auto'
        }
      },
      axisLabel: {
        textStyle: {
          color: 'auto'
        }
      },
      splitLine: {
        length: 12,
        lineStyle: {
          color: 'auto'
        }
      },
      pointer: {
        length: '90%',
        width: 3,
        color: 'auto'
      },
      title: {
        textStyle: {
          color: '#333'
        }
      },
      detail: {
        textStyle: {
          color: 'auto'
        }
      }
    }
  };
  echarts.registerTheme('index', theme);
}));
