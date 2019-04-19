<template>
  <div class="tree-progress" style="height: 100vh;background: #fff">
      <Tree 
        ref="treeContainer"
        :nodeSize="{x:240,y:160}"
        :initData="data"
        :translate="translate"
        pathFunc="straight"
        transitionDuration=300
      >
      <template slot-scope="scope">
        <template v-if="scope.depth === 0">
            <div class="base-node salad-root">
              <p>{{scope.data.name}}</p>
            </div>
        </template>
        <template v-else>
          <div class="base-node salad" @click="handleClick(scope)">
            <p>{{scope.data.name}}</p>
            <div class="illustration"><img :src="scope.data.attributes.cover" /></div>
          </div>
        </template>

      </template>
      </Tree>
  </div>
</template>

<script>
import treeData from "../mock/salad";
import Tree from "../components/Tree";
export default {
  name:'horizontal',
  data() {
    return {
      data: treeData,
      translate: {
        x: 0,
        y: 0
      }
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
    handleClick(scope) {
      console.log(scope);
    },
    pathFunc(linkData, start, end) {
      return "M" + end.x + "," + end.y + " " + start.x + "," + start.y;
    }
  },
  mounted(){
    this.setTreeCenter();
  }
};
</script>
