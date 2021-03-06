// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
Vue.use(Vant);
// ajax请求: axios库
import axios from "axios";
// 引入输入框功能
// import { Field } from 'vant';
// Vue.use(Field);
// 引入弹出框功能
// import { Dialog } from 'vant';
// Vue.use(Dialog);
//引入提示框
import {Toast} from 'vant';
Vue.use(Toast)
// 上拉框组件内
// import { ActionSheet } from 'vant';
// Vue.use(ActionSheet);
// import { Uploader } from 'vant'
// Vue.use(Uploader);
// Vue.config.productionTip = false

// 绑定到原型上,所以vue实例都可以调用axios
Vue.prototype.$axios = axios;
// 基准路径
axios.defaults.baseURL = "http://127.0.0.1:3000"

// 请求拦截器
axios.interceptors.request.use(config=>{
  // 没有带token,且能在本地存储找到就带上
  if(!config.headers.Authorization && localStorage.getItem('token')){
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config;
})

/* eslint-disable no-new */
// axios 拦截器
axios.interceptors.response.use((res)=>{
  const {message,statusCode} = res.data;
  if(message && statusCode === 401) {
    Toast.fail(message)
  }
  return(res)
})

//注册Vant库

//引入组件样式文件
import 'vant/lib/index.css';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
