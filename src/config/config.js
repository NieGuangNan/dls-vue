let config={
  //请求授权地址
  userAuthorizationUri:"https://github.com/login/oauth/authorize",
  //accessToken请求地址
  accessTokenUri : "https://github.com/login/oauth/access_token",
  //用户信息请求地址
  userInfoUri:"https://api.github.com/user",
  //登出请求地址
  logoutUri:"https://github.com/logout",
  //项目地址
  localuri :"http://localhost:9001",
  //回调地址
  redirect_uri : "http://localhost:9001/login",
  //案例资源服务器地址
  resUri:"http://localhost:8080",
  //客户端相关标识，请从认证服务器申请
  clientId: "94a2430ee6dff24f4134",
  client_secret:"2003f80ebf53e062c6d9ab6ea1dc1d9a440e1be4",
  //申请的权限范围
  scope:"user",
  //可选参数，客户端的当前状态，可以指定任意值，用于校验，此次案例不做相关认证
  state:"",
  //一些固定的请求参数
  response_type:"token",
  grant_type : "authorization_code",
  code:"",
}

export default config;
