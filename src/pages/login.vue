<template>
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
          <span v-if="tip" class='tip'>{{tip}}</span>
          <el-form-item>
            <el-button type="primary" class="btn btn-primary " @click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <p>Copyright  &copy; 2019</p>
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
        if (!(this.form.username && this.form.password)) {
          this.tip='用户名、密码均不能为空';
        } else {
          sysApi.login(this.form).then(res => {
            this.loginJudge({...res, redirectUrl})
          })
        }

      },
      loginJudge({sid, user, redirectUrl}) {

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
    background: rgba(68, 70, 79, 0.6);
    border-color: #484c5a;
    padding: 30px 15px 15px;
    border-radius: 5px;

  }
  .login p{
    padding-bottom: 10px;
    color:#949ba2;
    text-align: center;
    margin-top: -5px;
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

  .login .login-form .card-block {
    padding: 35px;
  }

  .btn.focus, .btn:focus, .btn:hover {
    text-decoration: none;
  }



</style>
