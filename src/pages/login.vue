<template>
  <div id="loginWrap">
    <el-row>
      <div class="login">
        <el-form :model="form" ref="ruleForm">
          <el-form-item label="" prop="username">
            <el-input v-model="form.username" placeholder="用户名" class="inputList"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="form.password" placeholder="密码" class="inputList"></el-input>
          </el-form-item>
          <span v-if="tip" class='tip'>{{tip}}</span>
          <el-form-item>
            <el-button type="primary" class="btn btn-primary " @click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <p>Copyright &copy; 2019</p>
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
        tip: '',
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
        loadMenuList: 'loadMenuList',// 映射 this.load() 为 this.$store.dispatch('loadMenuList')
        loadRouteList: 'loadRouteList'
      }),
      login() {

        var redirectUrl = '/';
        if (!(this.form.username && this.form.password)) {
          this.tip = '用户名、密码均不能为空';
        } else {
          sysApi.login(this.form).then(res => {
            this.loginJudge({...res, redirectUrl})
          })
        }

      },
      loginJudge({sid, user, redirectUrl}) {

        if (sid && user) {
          auth.login(sid);
          this.$cookies.set("user-info", user);
          this.$cookies.set("user-access", user.access);
          // sessionStorage.setItem("user-info", JSON.stringify(user));
          this.setUserInfo(user);
          this.$http.defaults.headers.common['authSid'] = sid;
          this.loadMenuList();
          this.loadRouteList();
          redirectUrl && this.$router.push({path: redirectUrl});
        } else {
          this.tip = '用户名或密码错'
        }

      }
    }
  }
</script>

<style>


  #loginWrap {
    height: 100%;
    background: url("/static/img/login-bg-mck-yf.png") center center no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #loginWrap .login .el-input__inner {
    display: inline-block;
    -webkit-appearance: none;
    background-image: none;
    border-radius: 4px;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #949ba2;
    font-size: inherit;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    height: 34px;
    background: #494b54;
  }

  #loginWrap .el-input__inner::-webkit-input-placeholder{
    color:#c0c4cc;
  }
  #loginWrap .el-input__inner::-ms-input-placeholder{
    color:#c0c4cc;
  }
  #loginWrap .el-input__inner::placeholder{
    color:#c0c4cc;
  }

  #loginWrap .login p {
    padding-bottom: 10px;
    color: #949ba2;
    text-align: center;
    margin-top: -5px;
  }

  #loginWrap .el-form {
    position: relative;
  }

  #loginWrap .tip {
    position: absolute;
    top: 93px;
    left: 5px;
    color: #db524b;
    font-size: 12px;
    z-index: 99999;

  }

  #loginWrap .login .el-form-item {
    margin-bottom: 15px;
  }

  #loginWrap.login .login-form .card-block {
    padding: 35px;
  }

  #loginWrap .btn.focus, .btn:focus, .btn:hover {
    text-decoration: none;
  }

  #loginWrap .login .el-button.forgot, .login .el-button.forgot:hover {
    color: #000;
  }

  #loginWrap .login .login-form {
    background-color: #FFFFFF;
  }

  #loginWrap .btn-link:focus, #loginWrap .btn-link:hover {
    color: #167495;
    background-color: transparent;
  }

  #loginWrap .btn-link, #loginWrap .btn-link:active, #loginWrap .btn-link:focus, #loginWrap .btn-link:hover {
    border-color: transparent;
  }

  #loginWrap .input-group-addon {

    color: #607d8b;
    background-color: #cfd8dc;
    border: 1px solid rgba(0, 0, 0, .15);
  }

  #loginWrap .form-control {

    color: #607d8b;
    background: #fff none;
    border: 1px solid rgba(0, 0, 0, .15);

  }

  #loginWrap .login .login-register {

    background-color: #20a8d8;
    color: #fff;
  }

  #loginWrap .login {
    color: white;
    background: rgba(68, 70, 79, 0.6);
    border-color: #484c5a;
    width: 360px;
    padding: 30px 15px 15px;
    border-radius: 5px;
  }

  #loginWrap .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
  }

  #loginWrap .el-input{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }
  #loginWrap .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: 0 0;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 8px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 100%;
    color: #fff;
    height: 30px;
  }
  /* 黑色主题 */
  /*#loginWrap .login .el-input__inner {
    height: 30px !important;
    color: #fff !important;
  }
  #loginWrap .el-button{
    border: 1px solid #f6a821 !important;
  }
  #loginWrap .el-button:focus, #loginWrap .el-button:hover {
    border-color: #dd971e !important;
    background-color: rgba(246, 168, 33, 0.1) !important;
  }

  #loginWrap .el-button:active {
    border-color: #dd971e !important;
    outline: 0 !important;
  }*/
  /* 白色主题 */
  #loginWrap .login{
    background-color: #fff !important;
  }
  #loginWrap .login .el-input__inner {
    background: rgb(232, 240, 254) !important;
    border: 1px solid #dddddd !important;
    height: 30px !important;
    color: black !important;
  }
  #loginWrap .login .el-input__inner:hover,#loginWrap .login .el-input__inner:focus{
    outline: 0 !important;
    border-color: #1ab394 !important;
  }
  #loginWrap .el-button {
    color: #fff !important;
    background-color: #1ab394 !important;
    border: 1px solid #1ab394 !important;
  }
  #loginWrap .el-button:hover {
    background: #48c2a9 !important;
    border-color: #48c2a9 !important;
  }
  #loginWrap .el-button:active {
    background: #17a185 !important;
    border-color: #17a185 !important;
  }
</style>
