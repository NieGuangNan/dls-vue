import axios from "axios";
import qs from "qs";
import auth from "./auth";
import {getBaseUrl} from "../common/utils";
import {Loading, MessageBox} from "element-ui";

let loading;
let needLoadingRequestCount = 0;

function startLoading() {
  loading = Loading.service({background: 'transparent', lock: true});
}

function endLoading() {
  loading.close()
}

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// axios 配置
axios.defaults.timeout = 180000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://192.168.100.102:9990';
// axios.defaults.baseURL = getBaseUrl(window.location.href);
axios.defaults.headers.common['authUid'] = auth.getUid();
axios.defaults.headers.common['authSid'] = auth.getSid();

//POST传参序列化
//添加请求拦截器
axios.interceptors.request.use((config) => {
  showFullScreenLoading()
  // 在发送请求之前做些什么
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

//返回状态判断
//添加响应拦截器
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading()
    if (response.data && response.data.code) {
      if (response.data.code === '2001') {
        auth.logout()
      }
    }
    return response;
  },
  error => {
    tryHideFullScreenLoading()
    if (error.response) {
      // console.log(getBaseUrl(window.location.href))
      //全局ajax错误信息提示
      // MessageBox({type:"error",message:error.response.data,title:"温馨提示",});
    }
    //return Promise.reject(error);
  });

export function fetch(url, config = {method: 'get'}) {
  return axios.request({...config, url})
  // return new Promise((resolve, reject) => {
  //   axios.request({ ...config, url })
  //     .then(response => {
  //       resolve(response.data);
  //     }, err => {
  //       reject(err);
  //     })
  //     .catch((error) => {
  //       reject(error)
  //     })
  // })
}

export default axios
