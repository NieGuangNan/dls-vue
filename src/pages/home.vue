<template>
  <div id="home">
    <el-row class="topBar">
      <el-form :inline="true" :model="formInline" >
        <el-form-item label="">
          <el-input v-model="formInline.user" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  class="fa fa-search">搜索</el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <el-row  class="box-wrap">
      <el-row class="box-title">
        <span class=" text-primary" @click="show=!show">
          <i  :class="show?'fa fa-chevron-down':'fa fa-chevron-up'"></i>
             收藏
        </span>
      </el-row>
      <el-collapse-transition>
        <el-row class="box-content" v-if="show">
          <template v-for="item of collection" >
            <div class="app-box"  >
              <i class="fas fa-star text-primary"></i>
              <div class="app-content">
                <i :class="item.centerIcon"></i>
                <div>{{item.title}}</div>
              </div>
            </div>
          </template>
        </el-row>
      </el-collapse-transition>
    </el-row>
    <template v-for="item of appData">
        <el-row  class="box-wrap">
          <el-row class="box-title">
          <span class=" text-primary" @click="toggleOnOff(item.id)">
            <i  :class="item.show?'fa fa-chevron-down':'fa fa-chevron-up'"></i>
              {{item.title}}
          </span>
          </el-row>
          <el-collapse-transition>
              <el-row class="box-content" v-if="item.show">
              <template v-for="child of item.content">
                <div class="app-box" :class="{disabled:child.disabled}" >
                  <i :class="{'fal fa-star':!child.disabled}" @click="stars($event,item.id)"></i>
                  <div class="app-content">
                    <i :class="child.centerIcon"></i>
                    <div>{{child.title}}</div>
                  </div>
                </div>
              </template>
            </el-row>
         </el-collapse-transition>
        </el-row>
    </template>

  </div>
    
</template>

<script>

  const appData=[
    {
      id:1,
      title:'公司级DPM',
      content:[
        {
        title: '炼钢产量驾驶舱',
        centerIcon:'fal fa-chart-area',

        disabled:true
      },{
        title: '炼钢产量分析',
        centerIcon:'fal fa-chart-bar',

        disabled:false
      },{
        title: '炼钢成本驾驶舱',
        centerIcon:'fal fa-chart-area',

        disabled:false
      },{
        title: '炼钢成本分析',
        centerIcon:'fal fa-chart-bar',

        disabled:false
      },{
        title: '炼钢质量驾驶舱',
        centerIcon:'fal fa-chart-area',

        disabled:false
      },{
        title: '炼钢质量分析',
        centerIcon:'fal fa-chart-bar',

        disabled:false
      },{
        title: '重复问题发现分析',
        centerIcon:'fal fa-list-alt',

        disabled:false
      },{
        title: '问题追踪与闭环管理',
        centerIcon:'fal fa-file-spreadsheet',
        disabled:false
      }],
      show:true
  },
    {
      id:2,
      title:'炼铁智能分析',
      content:[
        {
        title: '异常炉况预警模型',
        centerIcon:'fal fa-exclamation-triangle',
        disabled:false
      },{
        title: '高炉炉温预测模型',
        centerIcon:'fal fa-exclamation-triangle',

        disabled:false
      }],
      show:true
    },
    {
      id:3,
      title:"炼钢智能分析",
      content:[
        {
        title: '转炉智能吹炼模型',
        centerIcon:'fal fa-draw-polygon',

        disabled:false
      },{
        title: '连铸质量改善',
        centerIcon:'fal fa-chart-line',

        disabled:false
      },{
        title: '转炉吹炼反向控制',
        centerIcon:'fal fa-sliders-h',

        disabled:false
      },{
        title: '连铸OEE',
        centerIcon:'fal fa-chart-bar',

        disabled:false
      },{
        title: '转炉周期时间',
        centerIcon:'fal fa-clock',

        disabled:false
      },{
        title: '转炉炉况分析',
        centerIcon:'fal fa-chart-bar',

        disabled:false
      }],
      show:true
    },
    {
      id:4,
      title:'轧钢智能分析',
      content:[
        {
        title: '智能负差优化',
        centerIcon:'fal fa-analytics',

        disabled:false
      }],
      show:true
    },
    {
      id:5,
      title:'动力',
      content:[
        {
        title: '转炉煤气数字化业绩管理',
        centerIcon:'fal fa-chart-pie',

        disabled:false
      },{
        title: '转炉煤气智能调度决策支持系统',
        centerIcon:'fal fa-cogs',

        disabled:false
      }],
      show:true
    },
    {
      id:6,
      title:'物联网管理',
      content:[
        {
        title: '物联设备管理',
        centerIcon:'fal fa-desktop-alt',

        disabled:false
      },{
        title: '数据管理',
        centerIcon:'fal fa-database',

        disabled:false
      },{
        title: '系统管理',
        centerIcon:'fal fa-cog',

        disabled:false
      },{
        title: '数据模型管理',
        centerIcon:'fal fa-dice-d8',

        disabled:false
      }],
      show:true

    }];
    export default {
      name: "home",
      data(){
          return{
            formInline: {
              user: ''
            },
            show:false,
            appData:appData,
            collection:[]

          }
        },
      methods:{
        toggleOnOff(id){
          for(let item of this.appData ){
            item.id===id?item.show=!item.show:item.show
          }
        },
        stars(ev,id) {
          let _this=this;
          if (ev.target.className==='fas fa-star text-primary'){
              ev.target.className='fal fa-star';
            for(let item of this.collection ){
              ev.target.parentNode.innerText===item.title?_this.collection.splice(_this.collection.indexOf(item),1):'';
            }

          }else{
            ev.target.className='fas fa-star text-primary';
            for(let item of this.appData ){
              for (let child of item.content){
                item.id===id && ev.target.parentNode.innerText===child.title?_this.collection.push(child):'';
              }

            }
          }

        }
      },
    }
</script>

<style scoped>
.box-wrap{
    height:30%;
  }

.box-title{
    padding: 0.5rem 1rem;
  }
.box-title>span{
    display: inline-block;
    font-size: 1.1rem;
    line-height: 25px;
    border-radius: 20px;
    padding: 0 0.5rem;
    cursor: pointer;
  }
.box-content{
    margin: 8px;
    display: flex;
  }
 .app-box{
    width: calc(12.5vw - 45px);
    height: calc(12.5vw - 45px);
    padding: 10px;
    text-align: center;
    margin-left:8px;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    transition: all .3s ease-in-out;


  }
  #home .app-box .fa-star {
    font-size: 1vw;
    margin: 5px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .app-content i {
    font-size: 3vw;
    margin:1.8vw 0 0.6vw;
  }
  .app-content>div{
    font-weight: 500;
  }

  .disabled, .disabled .app-content i {
    pointer-events: none;
  }
  .el-form-item{
    margin-bottom: 0!important;
  }

</style>
