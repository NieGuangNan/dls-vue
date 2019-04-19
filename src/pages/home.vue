<template>

  <div id="home">
    <el-row class="topBar topBar-margin-none">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="fa fa-search">搜索</el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <el-row class="box-wrap">
      <el-row class="box-title">
          <span class=" text-primary" @click="show=!show">
            <i :class="show?'fa fa-chevron-down':'fa fa-chevron-up'"></i>
               {{$t('message.menu.collection')}}
          </span>
      </el-row>
      <el-collapse-transition>
        <el-row class="box-content" v-if="show">
          <template v-for="item of collection">
            <div class="app-box">
              <i class="fas fa-star text-primary"></i>
              <div class="app-content">
                <i :class="item.centerIcon"></i>
                <div>{{$t(item.title)}}</div>
              </div>
            </div>
          </template>
        </el-row>
      </el-collapse-transition>
    </el-row>
    <template v-for="item of appData">
      <el-row class="box-wrap">
        <el-row class="box-title">
            <span class=" text-primary" @click="toggleOnOff(item.id)">
              <i :class="item.show?'fa fa-chevron-down':'fa fa-chevron-up'"></i>
                {{$t(item.title)}}
            </span>
        </el-row>
        <el-collapse-transition>
          <el-row class="box-content" v-if="item.show">
            <template v-for="child of item.content">
              <router-link :to="child.link" :class="{disabled:child.disabled}">
                <div class="app-box">
                  <i :class="{'fal fa-star':!child.disabled}" @click="stars($event,item.id)"></i>
                  <div class="app-content">
                    <i :class="child.centerIcon"></i>
                    <div>{{$t(child.title)}}</div>
                  </div>
                </div>
              </router-link>
            </template>
          </el-row>
        </el-collapse-transition>
      </el-row>

    </template>
  </div>

</template>

<script>
  import defaultValue from "@/services/default"
  const appData = defaultValue.appList;
  export default {
    name: "home1",
    data() {
      return {
        formInline: {
          user: ''
        },
        show: false,
        appData: appData,
        collection: []

      }
    },
    methods: {
      token() {
        this.$http.post('http://localhost:8889/oauth/token', {
          client_id: 'platform',
          client_secret: 'platform-secret',
          grant_type: 'password',
          username: 'apollo',
          password: 'mckyf666',
          scope: '*',
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 控制侧边菜单 home页面传值
      childClick (value) {
        this.$emit('sideMenuOnOff', value);
      },

      toggleOnOff(id) {
        for (let item of this.appData) {
          item.id === id ? item.show = !item.show : item.show
        }
      },
      stars(ev, id) {
        let _this = this;
        if (ev.target.className === 'fas fa-star text-primary') {
          ev.target.className = 'fal fa-star';
          for (let item of this.collection) {
            ev.target.parentNode.innerText === item.title ? _this.collection.splice(_this.collection.indexOf(item), 1) : '';
          }

        } else {
          ev.target.className = 'fas fa-star text-primary';
          for (let item of this.appData) {
            for (let child of item.content) {
              item.id === id && ev.target.parentNode.innerText === child.title ? _this.collection.push(child) : '';
            }

          }
        }

      }
    },
    mounted() {
      this.token();
      this.childClick (false);
    },
    destroyed() {
      this.childClick (true);
    }
  }
</script>

<style scoped>
  .box-wrap {
    height: 30%;
    margin-left: 0.5rem
  }

  .box-title {
    padding: 0.5rem 1rem;
  }

  .box-title > span {
    display: inline-block;
    font-size: 1.1rem;
    line-height: 25px;
    border-radius: 20px;
    padding: 0 0.5rem;
    cursor: pointer;
  }

  .box-content {
    margin: 8px;
    display: flex;
  }

  .app-box {
    width: calc(12.5vw - 45px);
    height: calc(12.5vw - 45px);
    padding: 10px;
    text-align: center;
    margin-left: 8px;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    transition: all .3s ease-in-out;


  }

  .app-box .fa-star {
    font-size: 1vw;
    margin: 5px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .app-content i {
    font-size: 3vw;
    margin: 1.8vw 0 0.6vw;
  }

  .app-content > div {
    font-weight: 500;
  }

  .disabled, .disabled .app-content i {
    pointer-events: none;
  }

  .el-form-item {
    margin-bottom: 0 !important;
  }


</style>
