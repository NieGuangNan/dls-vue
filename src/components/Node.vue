<template>
  <g
    :ref="nodeData.data.id"
    :transform="transform"
    :style="initStyle"
    class="v-tree__node-base"
  >
    <g :transform="collapseIcon" v-if="nodeData.data._children" class="v-tree__collapse-icon">
      <circle r="10" class="v-tree__collapse-icon-stroke"></circle>
    </g>
    <foreignObject
      :x="-nodeSize.x/2" :y="-nodeSize.y/2"
      :width="nodeSize.x" :height="nodeSize.y"
    >
      <ForeignObjectElement/>
    </foreignObject>
    <g :transform="collapseIcon" v-if="nodeData.data._children" @click="handleClick" class="v-tree__collapse-icon"
       ref="circle">
      <circle r="8"></circle>
      <polyline points="-4,0 4,0 0,0 0,4 0,-4" stroke-width="2" stroke="white" fill="none"
                v-if="nodeData.data._collapsed"/>
      <line x1="-4" y1="0" x2="4" y2="0" stroke-width="2" stroke="white" v-else/>
    </g>
  </g>
</template>

<script>
  import {select, drag, event,behavior} from "d3";
  import ForeignObjectElement from "./ForeignObjectElement";

  export default {
    name: "Node",
    components: {
      ForeignObjectElement
    },
    props: [
      "nodeData",
      "nodeSize",
      "nodeSvgShape",
      "nodeSvgShapeAttr",
      "transitionDuration",
      "orientation",
      "allowForeignObjects",
      "renderForeignObjects",
    ],
    watch: {
      nodeData: {
        handler() {
          this.setTransform(this.nodeData);
        }
      }
    },
    data() {
      return {
        transform: "",
        initStyle: {
          opacity: 0
        }
      };
    },
    computed: {
      collapseIcon() {
        return this.orientation === "horizontal"
          ? `translate(${this.nodeSize.x / 2},0)`
          : `translate(0,${this.nodeSize.y / 2})`;
      }
    },
    methods: {
      // renderNodeElement() {
      //   const nodeEl = select(this.$refs[this.nodeData.data.id]).append(
      //     this.nodeSvgShape
      //   );

      //   Object.entries(this.nodeSvgShapeAttr).forEach(item => {
      //     nodeEl.attr(item[0], item[1]);
      //   });
      // },
      setTransform(data) {
        const {x, y} = data;
        const transform =
          this.orientation === "horizontal"
            ? `translate(${y},${x})`
            : `translate(${x},${y})`;
        this.applyTransform(transform);
      },
      applyTransform(transform, opacity = 1, done = () => {
      }) {
        const node = select(this.$refs[this.nodeData.data.id]);
        if (this.transitionDuration) {
          node
          .attr('transform',parentTransform)
            .transition()
            .duration(this.transitionDuration)
            .attr("transform", transform)
            .attr("style", `opacity: ${opacity}`);
          done();
        } else {
          node.attr("transform", transform).attr("style", `opacity: ${opacity}`);
          done();
        }

        node
          .call(
            drag().on("drag", function (d) {
              // const {k} = event.transform;
              // console.log(this)
              let ret = select("svg g").attr('transform').match(/(\d+(\.\d+)?)/g);

              // console.log(dy)
              // console.log(event)
              const x=Number(ret[0]) + (event.dx);
              const y=Number(ret[1]) + (event.dy);
              // var ret = s.replace(/[0-9]*(\.[0-9]*)?/g,function(e){
              //   // console.log(e)
              // });
              // select("svg g").attr("transform", "translate(" + x + "," + y + ") scale(" + ret[2] + ")");
            })
          )
          .on("click", d => {
            if (event.defaultPrevented) return;
          });
      },
      handleClick(e) {
        this.$emit("handleNodeToggle", this.nodeData, this.$refs.circle.getBoundingClientRect(), e);
      }
    },
    mounted() {
      this.setTransform(this.nodeData);
    },
    beforeDestroy() {
      const data = this.nodeData.parent ? this.nodeData.parent : {x: 0, y: 0};
      const transform = this.setTransform(data);
      this.applyTransform(transform);
    }
  };
</script>
