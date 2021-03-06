<template>
  <div :class="['v-tree__container',{'v-tree--grabbable':zoomable}]">
    <svg :ref="svgRef" width="100%" height="100%">
      <transition>
        <g :ref="gRef"
           :transform="`translate(${translate.x},${translate.y}) scale(${scale})`"
        >

          <Link v-for="(link,index) in tree.links" :key="index"
                :pathFunc="pathFunc"
                :orientation="orientation"
                :linkData="link"
                :nodeSize="link.data.data.length>1?{x:250,y:70+(link.data.data.length-1)*50}:nodeSize"
                :transitionDuration="transitionDuration"
                :deepFactor="deepFactor"
          />

          <Node v-for="node in tree.nodes" :key="node.data.id"
                :nodeData="node"
                :nodeSize="node.data.data.length>1?{x:250,y:70+(node.data.data.length-1)*50}:nodeSize"

                :transitionDuration="transitionDuration"
                :orientation="orientation"
                :nodeSvgShape="nodeSvgShape"
                :nodeSvgShapeAttr="nodeSvgShapeAttr"
                :allowForeignObjects="allowForeignObjects"
                :renderForeignObjects="renderForeignObjects"
                @handleNodeToggle="handleNodeToggle"
          />
        </g>
      </transition>
      <!--:nodeSize="node.data.attributes.expansionSize?node.data.attributes.expansionSize:nodeSize"-->
    </svg>
  </div>
</template>

<script>
  import {tree, hierarchy, select, event, zoom} from "d3";
  import {uniqueId} from "../utils/assist";
  import {assignProperties} from "../utils/dataHelper";
  import * as props from "../utils/propsValidate";
  import Link from "./Link.vue";
  import Node from "./Node.vue";
  import '@/style/tree.scss'

  export default {
    name: "Tree",
    provide() {
      return {
        $$tree: this
      };
    },
    components: {
      Link,
      Node
    },
    props: props.treeProps,
    data() {
      return {
        svgRef: uniqueId(),
        gRef: uniqueId(),
        data: assignProperties(this.initData),
        nodes: [],
        links: []
      };
    },
    computed: {
      treemap() {
        // tree layout
        const {x, y} = {x:250,y:100};
        const treemap = tree()
        // .size([this.viewPort.width, this.viewPort.height])
          .nodeSize(this.orientation === "horizontal" ? [y, x] : [x, y])
          .separation(
            (a, b) =>
              a.parent.data.id == b.parent.data.id
                ? this.separation.siblings
                : this.separation.nonSiblings
          );
        return treemap;
      },
      root() {
        const root = hierarchy(
          this.data[0],
          d => (d._collapsed ? null : d._children)
        );
        return root;
      },
      tree() {
        const treeData = this.treemap(this.root);
        const nodes = treeData.descendants();
        nodes.forEach(function (d) {
          d.y = d.depth * 180;
        });
        const links = treeData.descendants().slice(1);
        nodes.forEach(node => {
          this.orientation === "horizontal" ?
            node.y = node.y * (1 / this.deepFactor) :
            node.y = node.y * this.deepFactor
        });
        return {nodes, links};
      }
    },
    watch: {
      initData(val) {
        this.data = assignProperties(val);
      }
    },
    methods: {
      bindZoomListener() {
        const svg = select(this.$refs[this.svgRef]);
        const g = select(this.$refs[this.gRef]);

        if (this.zoomable) {
          svg.call(
            zoom()
              .scaleExtent([this.scaleExtent.min, this.scaleExtent.max])
              .on("zoom", () => {
                // TODO: 当scale !== 1 时，首次触发zoom会有bug
                const [lastX, lastY] = [this.translate.x, this.translate.y];
                const {x, y, k} = event.transform;
                g.attr(
                  "transform",
                  `translate(${lastX + x},${lastY + y}) scale(${k})`
                );
              })
          );
        }
      },
      setInitialTreeDepth(nodeSet, initialDepth) {
        nodeSet.forEach(n => {
          n._collapsed = n.depth >= initialDepth;
        });
      },
      handleNodeToggle(node, client) {
        this.$emit("handleNodeToggle", client);
        const data = [...this.data];
        const targetNode = this.findNodeById(node.data.id, data)[0];
        if (this.collapsible) {
          targetNode._collapsed
            ? this.expandNode(targetNode)
            : this.collapseNode(targetNode);
          this.data = data;
        }
        // if (this.props.collapsible && !this.state.isTransitioning) {

        // this.setState({ data, isTransitioning: true }, () => this.handleOnClickCb(targetNode, evt));
        // Await transitionDuration + 10 ms before unlocking node toggling again
        // setTimeout(
        //   () => this.setState({ isTransitioning: false }),
        //   this.props.transitionDuration + 10,
        // );
        // this.internalState.targetNode = targetNode;
        // }
        // else {
        //   this.handleOnClickCb(targetNode, evt);
        // }
      },
      expandNode(node) {
        node._collapsed = false;
        // if (node._children && node._children.length > 0) {
        //   node._children.forEach(child => {
        //     this.expandNode(child);
        //   });
        // }
      },
      collapseNode(node) {
        node._collapsed = true;
        if (node._children && node._children.length > 0) {
          node._children.forEach(child => {
            this.collapseNode(child);
          });
        }
      },
      findNodeById(nodeId, nodeSet, hits = []) {
        if (hits.length > 0) {
          return hits;
        }
        hits = hits.concat(nodeSet.filter(node => node.id === nodeId));

        nodeSet.forEach(node => {
          if (node._children && node._children.length > 0) {
            hits = this.findNodeById(nodeId, node._children, hits);
            return hits;
          }
          return hits;
        });

        return hits;
      },

      nodeCollapse(nodes) {
        nodes.map((node) => {
          if (node.data.expanded==false || node.data.expanded==null) {
            const data = [...this.data];
            const targetNode = this.findNodeById(node.data.id, data)[0];
            this.collapseNode(targetNode);

            this.data = data;
          }
        })
      },
      update() {
      }
    },
    mounted() {
      this.bindZoomListener();

      const {width, height} = this.$refs[this.svgRef].getBoundingClientRect();
      this.viewPort = {
        width,
        height
      };


      this.nodeCollapse(this.tree.nodes);
      //console.log(this.tree.nodes);
      // console.log(this.nodeSize);
      // console.log(this.tree.links);
      // console.log(this.tree.links[2].data.attributes.expansionSize);
    }
  };
</script>
