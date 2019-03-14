<template>
  <div class="x-bar">
    <div class="ibox float-e-margins sl-shadow-ibox">
      <div class="ibox-title sl-highcharts-legend">
        <h3>炼钢总产量（吨）</h3>
      </div>
      <div class="ibox-content">
        <div :id="id"
             :option="option"></div>
      </div>
    </div>

  </div>
    
</template>



<script>
  import HighCharts from 'highcharts';
    export default {
        name: "Chart1",
          props: {
            id: {
              type: String
            },
            option: {
              type: Object
            }
          },

      methods:{
        //highchartsLegend移动到ibox-title右测
        // highchartsLegend:function () {
        //     var $sl_highchartsLegend = $(".sl-highcharts-legend"),
        //       $legendItem = $sl_highchartsLegend.parent().find(".highcharts-container").find(".highcharts-legend-item");
        //     $sl_highchartsLegend.each(function () {
        //       var $that = $(this),
        //         $sl_addLegend = $that.children('.sl-add-legend'),
        //         arr1 = [], arr2 = [],
        //         width = $that.children('h3').innerWidth() + 30,
        //         $legend = $that.parent().find('g.highcharts-legend');
        //       if ($legend.length > 0 && $that.children(".sl-highcharts-legend-content").length === 0) {
        //         var content = "<div class='sl-highcharts-legend-content'><svg width=" + $legend.children('rect').attr('width') + " height=" + $that.innerHeight() + "></svg></div>",
        //           legend = $legend.clone().attr('transform', 'translate(0,' + $that.innerHeight() / 4 + ')');
        //         $that.append(content).children(".sl-highcharts-legend-content").children('svg').append(legend);
        //         $legend.css("visibility", "hidden");
        //         var $sl_highchartsLegendContent = $that.children('.sl-highcharts-legend-content'),
        //           $item = $that.find('.highcharts-legend-item');
        //         $sl_highchartsLegendContent.append($sl_addLegend);
        //         $sl_highchartsLegendContent.css('max-width', 'calc(100% - ' + width + 'px)');
        //         $item.each(function () {
        //           arr1.push(Number($(this).attr('transform').match(/\d+/g)[0]));
        //           arr2.push(this.getBoundingClientRect().width);
        //         });
        //         if (isRepeat(arr1)) {
        //           $item.each(function (i) {
        //             if (i !== 0) {
        //               $(this).attr('transform', 'translate(' + (arr1[i - 1] + arr2[i - 1] + 21) + ',3)')
        //             }
        //           });
        //           $sl_highchartsLegendContent.children('svg').attr('width', $that.find('.highcharts-legend').children('g').get(0).getBoundingClientRect().width + 15);
        //         }
        //         $sl_highchartsLegendContent.css('width', $sl_highchartsLegendContent.width() + 10);
        //       }
        //     });
        //     $(".sl-highcharts-legend-content").find(".highcharts-legend-item").each(function (d) {
        //       var $that = $(this),
        //         $text = $that.children('text'),
        //         $point = $that.children('.highcharts-point'),
        //         $graph = $that.children('.highcharts-graph'),
        //         pointFill = $point.css('fill'), pointStroke = $point.css('stroke'),
        //         graphFill = $graph.css('fill'), graphStroke = $graph.css('stroke'),
        //         textColor = $text.css('color'), color = $text.css('color');
        //       $that.click(function () {
        //         $legendItem.eq(d).click();
        //         if ($point.css('fill') !== pointFill || $graph.css('stroke') !== graphStroke) {
        //           $text.css('fill', textColor);
        //           $point.css({'fill': pointFill, 'stroke': pointStroke});
        //           $graph.css({'stroke': graphStroke, 'fill': graphFill});
        //           color = textColor
        //         } else {
        //           var itemHiddenColor = $legendItem.eq(d).children('text').css('color');
        //           $text.css('fill', itemHiddenColor);
        //           $point.css({'fill': itemHiddenColor, 'stroke': itemHiddenColor});
        //           $graph.css({'fill': itemHiddenColor, 'stroke': itemHiddenColor});
        //           color = itemHiddenColor
        //         }
        //       });
        //       $that.mouseenter(function () {
        //         $text.css('fill', textColor)
        //       }).mouseleave(function () {
        //         $text.css('fill', color)
        //       })
        //     });
        //
        // }
      },
      mounted() {
        HighCharts.chart(this.id,this.option);
        //highchartsLegend移动到ibox-title右测
        // this.highchartsLegend();

      }
    }
</script>

<style scoped>
  .ibox {
    clear: both;
    margin-bottom: 25px;
    margin-top: 0;
    padding: 0;
  }
  .ibox-title {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background-color: #ffffff;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 2px 0 0;
    color: inherit;
    margin-bottom: 0;
    padding: 15px 90px 8px 15px;
    min-height: 48px;
    position: relative;
    clear: both;
  }
  .ibox-content {
    margin: 0 auto;
  }

  .ibox-content {
    background-color: #ffffff;
    color: inherit;
    padding: 15px 20px 20px 20px;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 1px 0;
  }

</style>
