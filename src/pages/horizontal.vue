<template>
  <div class="tree-progress" style="height: 100vh;background: #fff">
    <Tree
      ref="treeContainer"
      :nodeSize="{x:240,y:160}"
      :initData="data"
      :translate="translate"
      pathFunc="straight"
      :deepFactor=0.5
      @handleNodeToggle="handleNodeToggle"
      :transitionDuration=0
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
            <div class="illustration"><img :src="scope.data.attributes.cover"/></div>
          </div>
        </template>

      </template>
    </Tree>
  </div>
</template>

<script>
  // import treeData from "../mock/salad";
  import Tree from "../components/Tree";

  export default {
    name: 'horizontal',
    data() {
      let treeData = [{
        name: '0',
        attributes: {
          attributes: {
            cover: 'null'
          }
        },
        children: [{
          name: '1、',
          attributes: {
            cover: 'https://upload-images.jianshu.io/upload_images/3152596-a8eb82245a12503b?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
          },
          children: [{
            name: '1、',
            collapse: true,
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-a8eb82245a12503b?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },]
        },
          {
            name: '2、',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-0f96dafcd0cbde1e?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },
          {
            name: '3、',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-25dd4113ab92c981?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },
          {
            name: '4、',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-c3290bce7c70ecdb?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },
          {
            name: '5、',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-a05c1841c94f5edb?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },
          {
            name: '6、',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-a44774d2d6402754?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },
          {
            name: '7、',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-1656d328eb626525?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },
          {
            name: '8、',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-c47b676f516f88e5?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },
          {
            name: '9、',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-394c287ba6f5a578?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            }
          },
        ],
      },];
      return {
        data: treeData,
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
        this.data = [{
          name: '完美沙拉公式',
          attributes: {
            attributes: {
              cover: 'null'
            }
          },
          children: [{
            name: '1、有叶蔬菜打底',
            attributes: {
              cover: 'https://upload-images.jianshu.io/upload_images/3152596-a8eb82245a12503b?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
            },
          },
            {
              name: '2、加一份额外的绿色',
              attributes: {
                cover: 'https://upload-images.jianshu.io/upload_images/3152596-0f96dafcd0cbde1e?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
              }
            },
            {
              name: '3、各种色彩缤纷的食材点缀',
              attributes: {
                cover: 'https://upload-images.jianshu.io/upload_images/3152596-25dd4113ab92c981?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
              }
            },
            {
              name: '4、增加有饱足感的食物',
              attributes: {
                cover: 'https://upload-images.jianshu.io/upload_images/3152596-c3290bce7c70ecdb?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
              }
            },
            {
              name: '5、加入一些脆片以及坚果',
              attributes: {
                cover: 'https://upload-images.jianshu.io/upload_images/3152596-a05c1841c94f5edb?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
              }
            },
            {
              name: '6、必不可少蛋白质',
              attributes: {
                cover: 'https://upload-images.jianshu.io/upload_images/3152596-a44774d2d6402754?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
              }
            },
            {
              name: '7、添加更多营养价值元素',
              attributes: {
                cover: 'https://upload-images.jianshu.io/upload_images/3152596-1656d328eb626525?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
              }
            },
            {
              name: '8、沙拉酱汁',
              attributes: {
                cover: 'https://upload-images.jianshu.io/upload_images/3152596-c47b676f516f88e5?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
              }
            },
            {
              name: '9、完美摆盘',
              attributes: {
                cover: 'https://upload-images.jianshu.io/upload_images/3152596-394c287ba6f5a578?imageMogr2/auto-orient/strip%7CimageView2/2/w/640'
              }
            },
          ],
        },]
        console.log(scope);
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
