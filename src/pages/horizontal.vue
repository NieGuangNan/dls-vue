<template>
  <div class="ibox">
    <div class="tree-progress" style="height: 100vh;">
      <Tree
        ref="treeContainer"
        :nodeSize="{x:width,y:height}"
        :initData="data"
        :translate="translate"
        pathFunc="straight"
        :deepFactor=0.5
        @handleNodeToggle="handleNodeToggle"
        :transitionDuration=0
      >
        <template slot-scope="scope">
          <template>
            <div class="base-node salad" @click="handleClick(scope)">
              <template v-if="scope.depth === 0">
                <div class="treeBox" :class="{'border-red':scope.data.attributes.borderColor==='1','border-green':scope.data.attributes.borderColor==='2'}">
                  <el-row>
                    <el-col :span="11">
                      <span :class="{'text-red':scope.data.attributes.borderColor!=='2','text-green':scope.data.attributes.borderColor==='2'}">{{scope.data.attributes.quota}}</span>
                      <p>{{scope.data.attributes.name}}</p>
                    </el-col>
                    <el-col :span="13" >
                      <p >影响: <span>{{scope.data.attributes.effect}}<b v-if="scope.data.attributes.effect!=='0'">元/吨</b></span></p>
                      <template v-for="item in scope.data.attributes.data">
                        <p>基准: <span>{{item.datum}}<b v-if="item.datum!=='0'">元/吨</b></span></p>
                        <p>实际: <span class='text-blue' :class="{'text-red':scope.data.attributes.borderColor==='1','text-green':scope.data.attributes.borderColor==='2'}">{{item.fact}}<b v-if="item.fact!=='0'">元/吨</b></span></p>

                      </template>

                    </el-col>
                  </el-row>
                </div>
              </template>
              <template v-else>
                <div class="treeBox" :class="{'border-red':scope.data.attributes.borderColor==='1','border-green':scope.data.attributes.borderColor==='2'}">
                  <el-row>
                    <el-col :span="11">
                      <span :class="{'text-red':scope.data.attributes.borderColor==='1','text-green':scope.data.attributes.borderColor==='2'}">{{scope.data.attributes.quota}}</span>
                      <p>{{scope.data.attributes.name}}</p>
                    </el-col>
                    <el-col :span="13" >
                      <p >影响: <span>{{scope.data.attributes.effect}}<b v-if="scope.data.attributes.effect!=='0'">元/吨</b></span></p>
                      <template v-for="item in scope.data.attributes.data">
                        <p>基准: <span>{{item.datum}}<b v-if="item.datum!=='0'">元/吨</b></span></p>
                        <p>实际: <span class='text-blue' :class="{'text-red':scope.data.attributes.borderColor==='1','text-green':scope.data.attributes.borderColor==='2'}">{{item.fact}}<b v-if="item.fact!=='0'">元/吨</b></span></p>

                      </template>
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
  let treeData = [{
    id: '0',
    attributes: {
      quota:'',
      name:'炼钢成本',
      effect:'0 ',
      data:[
        {
          datum:'0',
          fact:'2,706.81',
        }],

      borderColor:'0'
    },
    children: [
      {
        id: '1',
        collapse: true,
        attributes: {
          quota:'',
          name:'60T炼钢成本',
          effect:'0',
          data:[
            {
              datum:'0',
              fact:'2,704.12',
            }],

          borderColor:'0'
        },
        children: [
          {
            id: '1',
            attributes: {
              quota:'7% 好',
              name:'钢铁料成本',
              effect:'0',
              data:[
                {
                  datum:'2,306.33',
                  fact:'2,295.37',
                },{
                  datum:'111',
                  fact:'2222',
                }],
              borderColor:'2'
            }},{
            id: '2',
            attributes: {
              quota:'7% 好',
              name:'合金成本',
              effect:'0',
              data:[
                {
                  datum:'225.56',
                  fact:'208.41',
                },{
                  datum:'111',
                  fact:'2222',
                }],

              borderColor:'2'
            }},{
            id: '3',
            attributes: {
              quota:'7% 差',
              name:'溶剂成本',
              effect:'16.69',
              data:[
                {
                  datum:'7.79',
                  fact:'24.48',
                },{
                  datum:'111',
                  fact:'2222',
                }],

              borderColor:'1'
            }},{
            id: '4',
            attributes: {
              quota:'7% 差',
              name:'其它',
              effect:'14.57',
              data:[
                {
                  datum:'80.29',
                  fact:'94.86',
                }],

              borderColor:'1'
            }},]

      },
      {
        id: '2',
        attributes: {
          quota:' ',
          name:'120T炼钢成本',
          effect:'0',
          data:[
            {
              datum:'0',
              fact:'2,708.06',
            }],

          borderColor:'0'},
        children:[
          {
            id: '1',
            attributes: {
              quota:'7% 好',
              name:'钢铁料成本',
              effect:'0',
              data:[
                {
                  datum:'2,331.97',
                  fact:'2,139.98',
                },{
                  datum:'111',
                  fact:'2222',
                }],

              borderColor:'2'
            }},{
            id: '2',
            attributes: {
              quota:'9% 差',
              name:'合金成本',
              effect:'101.97',
              data:[
                {
                  datum:'39.8',
                  fact:'141.77',
                }],

              borderColor:'1'
            }},{
            id: '3',
            attributes: {
              quota:'19% 差',
              name:'溶剂成本',
              effect:'23.35',
              data:[
                {
                  datum:'7.79',
                  fact:'31.14',
                }],

              borderColor:'1'
            }},{
            id: '4',
            attributes: {
              quota:'28% 好',
              name:'其它',
              data:[
                {
                  datum:'141.12',
                  fact:'129.67',
                }],
              effect:'0',

              borderColor:'2'
            }}]
      }],
  },];

  export default {
    name: 'horizontal',
    data() {
      return {
        data: treeData,
        width:240,
        height:70,
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
        this.data = treeData ;
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
    padding: 0 3px 0 5px;
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
 .treeBox .el-col-11>span,.treeBox .el-col-13>p{
    font-size: 12px;
  }
  .treeBox .el-col-11>p{
    font-size: 14px;
  }
  .treeBox .el-row{
    display: flex;
    align-items: center;
  }
  .treeBox .el-col-13>p b{
    /*font-size: 12px;*/
    display: inline-block;
    transform: scale(0.7);
    vertical-align: -9%;
  }
</style>
