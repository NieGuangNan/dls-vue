<template lang="html">
  <div id="loginWrap">
    <el-row>
      <div class="login">
        <el-form :model="form"  ref="ruleForm" >
          <el-form-item label="" prop="username">
            <el-input v-model="form.username"  placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <p v-if="tip" class='tip'>{{tip}}</p>
          <el-form-item>
            <el-button type="primary" class="btn btn-primary " @click="login">登录</el-button>
            <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
          </el-form-item>
        </el-form>

        <p style="text-align: center">Copyright  &copy; 2019</p>
      </div>
    </el-row>
  </div>

</template>
<script>
  import types from '../store/mutation-types'
  import * as api from "../api"
  import auth from '../common/auth'
  import * as sysApi from '../services/sys'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        tip:'',
        form: {
          username: '',
          password: ''
        }
      }
    },
    components: {},
    methods: {
      ...mapMutations({
        setUserInfo: types.SET_USER_INFO
      }),
      ...mapActions({
        loadMenuList: 'loadMenuList' ,// 映射 this.load() 为 this.$store.dispatch('loadMenuList')
        loadRouteList:'loadRouteList'
      }),
      login() {

        var redirectUrl = '/';
        // if (this.$route.query && this.$route.query != null && this.$route.query.redirect && this.$route.query.redirect != null) {
        //   console.log(78)
        //   redirectUrl = this.$route.query.redirect;
        // }
        if (!(this.form.username && this.form.password)) {
          this.tip='用户名、密码均不能为空';
        } else {
          sysApi.login(this.form).then(res => {
            this.loginJudge({...res, redirectUrl})
          })
        }

      },
      loginJudge({sid, user, redirectUrl}) {
        // console.log('触发了没？');
        if (sid && user) {
          auth.login(sid);
          this.$cookies.set("user-info",user);
          this.$cookies.set("user-access", user.access);
          // sessionStorage.setItem("user-info", JSON.stringify(user));
          this.setUserInfo(user);
          this.$http.defaults.headers.common['authSid'] = sid;
          this.loadMenuList();
          this.loadRouteList();
          redirectUrl && this.$router.push({path: redirectUrl});
        } else {
          this.tip='用户名或密码错'
        }

      }
    }
  }
</script>

<style scoped>

  #loginWrap{
    height:100%;
    background: url("/static/img/login-bg-mck-yf.png");
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    width: 360px;
    color: white;
    background: rgba(68, 70, 79, 0.5);
    border-color: #484c5a;
    padding: 15px;

  }
  .el-form{
    position:relative;
  }
  .tip{
    position:absolute;
    top:93px;
    left:5px;
    color:#db524b;
    font-size: 12px;
    z-index: 99999;

  }

  .login .el-button {
    width: 100%;
    color:#fff;
    height:30px;
  }
  .login .el-form-item{
    margin-bottom: 15px;
  }
  .login .el-input__inner{
    height:34px;
  }

  .login .login-form .card-block {
    padding: 35px;
  }

  .btn.focus, .btn:focus, .btn:hover {
    text-decoration: none;
  }



</style>
